"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { peekScroll } from "@/lib/returnScroll";

import {
  BG_FADE_OUT,
  FOLLOWER_LAMBDA,
  FOLLOWER_LAMBDA_LENIS,
  FOLLOWER_MAX_DT,
  FRAME_COUNT,
  HERO_FADE_IN,
  HERO_FADE_OUT,
  OPEN_FADE,
  RENDERER,
  SNAP_EPSILON,
  USE_LENIS,
} from "@/lib/scrub/config";
import { lenisOptions, setLenis } from "@/lib/smoothScroll";
import { clamp, easeInOut, norm } from "@/lib/scrub/math";
import { FrameSequenceRenderer } from "@/lib/scrub/renderers/frame-sequence";
import { VideoRenderer } from "@/lib/scrub/renderers/video";
import type { StageRenderer } from "@/lib/scrub/renderers/types";

interface Options {
  trackRef: RefObject<HTMLDivElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
}

/**
 * Owns the whole scroll-linked handshake.
 *
 * ScrollTrigger is the scroll observer — it reports raw, unsmoothed
 * progress. The smoothing that gives the scrub its weight is a damped
 * follower running on `gsap.ticker`, deliberately kept rather than
 * handed to ScrollTrigger's own `scrub`, because this is the exact
 * response curve the original page shipped with. (If you would rather
 * have GSAP's easing, drop `scrub: 0.35` onto the ScrollTrigger below
 * and set `head = target` in the tick.)
 *
 * Nothing here flows through React state per frame: progress is written
 * straight to CSS custom properties and the canvas, so a scrub costs no
 * re-renders at all.
 */
export function useHandshakeStage({
  trackRef,
  canvasRef,
  videoRef,
}: Options) {
  const [loadPct, setLoadPct] = useState(0);
  const [ready, setReady] = useState(false);
  const rendererRef = useRef<StageRenderer | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const surface =
      RENDERER === "video" ? videoRef.current : canvasRef.current;
    if (!surface || !trackRef.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const renderer: StageRenderer =
      RENDERER === "video"
        ? new VideoRenderer(surface as HTMLVideoElement)
        : new FrameSequenceRenderer(surface as HTMLCanvasElement);
    rendererRef.current = renderer;

    const root = document.documentElement;

    // ── State ────────────────────────────────────────────────
    let head = 0; // smoothed frame position
    let target = 0; // scroll-derived frame position
    let progress = 0; // 0 → 1
    let running = false;
    let cancelled = false;

    const openFade = () => norm(progress, 0, OPEN_FADE);

    // ── Layout ───────────────────────────────────────────────
    const layout = () => {
      renderer.layout(
        window.innerWidth,
        window.innerHeight,
        Math.min(window.devicePixelRatio || 1, 2),
      );
      renderer.render(Math.round(head), openFade());
    };

    // ── Hero clears out to let the footage through ────────────
    const updateChrome = () => {
      const fade = easeInOut(norm(progress, HERO_FADE_IN, HERO_FADE_OUT));

      root.style.setProperty("--heroFade", (1 - fade).toFixed(4));
      // Ambient background dissolves away on top of the scrubbed footage.
      root.style.setProperty(
        "--bgFade",
        (1 - norm(progress, 0, BG_FADE_OUT)).toFixed(4),
      );
      root.style.setProperty("--heroY", `${(-72 * fade).toFixed(2)}px`);

      // Below half a pixel the blur is invisible, so drop the filter entirely
      // rather than emit blur(0px) — a filter of any length would make the hero
      // a backdrop root and flatten the glass chrome inside it.
      const blur = reduceMotion ? 0 : 7 * fade;
      root.style.setProperty(
        "--heroFilter",
        blur < 0.5 ? "none" : `blur(${blur.toFixed(2)}px)`,
      );
    };

    /* One stage of smoothing at a time: when Lenis is driving the page it
       already eases the scroll position, so the follower is loosened to
       near-tracking. Without this the two lags compound and the footage
       drifts behind the scroll. */
    const lambda = USE_LENIS ? FOLLOWER_LAMBDA_LENIS : FOLLOWER_LAMBDA;

    // ── Follower loop ────────────────────────────────────────
    /* gsap.ticker hands the callback (time, deltaTime, frame); deltaTime is
       the milliseconds since the previous tick. Using it is the whole point:
       the fraction of the remaining distance covered per tick is now derived
       from elapsed time rather than assumed to be one 60Hz frame, so a 120Hz
       phone, a 60Hz laptop and a device dropping frames all settle over the
       same wall-clock interval. */
    const tick = (_time: number, deltaMs: number) => {
      const delta = target - head;

      if (Math.abs(delta) < SNAP_EPSILON) {
        head = target;
        renderer.render(Math.round(head), openFade());
        gsap.ticker.remove(tick);
        running = false; // idle until the next scroll event
        return;
      }

      const dt = Math.min(deltaMs / 1000, FOLLOWER_MAX_DT);
      const k = reduceMotion ? 1 : 1 - Math.exp(-lambda * dt);
      head += delta * k;
      renderer.render(Math.round(head), openFade());
    };

    const start = () => {
      if (running || cancelled) return;
      running = true;
      gsap.ticker.add(tick);
    };

    // ── Optional Lenis ───────────────────────────────────────
    let lenis: import("lenis").default | null = null;
    let lenisRaf: ((time: number) => void) | null = null;

    const setupLenis = async () => {
      const Lenis = (await import("lenis")).default;
      if (cancelled) return;
      lenis = new Lenis(lenisOptions());
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      lenisRaf = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(lenisRaf);
      /* Lenis is stepped from gsap.ticker rather than its own rAF so the
         smoothed scroll position and the scrub advance on the same frame.
         lagSmoothing(0) stops GSAP quietly skipping time after a stall,
         which would otherwise teleport the scroll on a slow first paint. */
      gsap.ticker.lagSmoothing(0);

      /* Dev-only handle, alongside __stagePreview. Smooth scroll is felt
         rather than seen in a DOM dump, so this is the way to confirm the
         instance is live and carrying the intended options. */
      if (process.env.NODE_ENV === "development") {
        (window as unknown as Record<string, unknown>).__lenis = lenis;
      }
    };

    // ── Boot ─────────────────────────────────────────────────
    // A fresh visit opens on the first (black) frame — no restored scroll
    // offset, no autoplay, nothing but the navbar and the headline. A return
    // from a sub-route is not a fresh visit: the reader was somewhere further
    // down the page and expects to land back there, so the pin to the top is
    // skipped and the offset restored once the frames are ready.
    const returning = peekScroll() !== null;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (!returning) window.scrollTo(0, 0);

    layout();

    const trigger = ScrollTrigger.create({
      trigger: trackRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        progress = clamp(self.progress, 0, 1);
        target = progress * (FRAME_COUNT - 1);
        updateChrome();
        start();
      },
    });

    /* ── Resize ────────────────────────────────────────────────
       On a touch device the browser fires `resize` continuously while the
       address bar retracts and returns — many times per scroll gesture, and
       always mid-gesture. The old handler answered each one by re-allocating
       the canvas backing store and running ScrollTrigger.refresh(), which
       re-measures every trigger on the page. That is the most expensive thing
       the site can do, done at the worst possible moment, and it is why the
       scrub stuttered on a phone while scrolling perfectly on a desktop.

       Two changes. Everything is debounced to the trailing edge, so a burst
       costs one pass instead of thirty. And a height-only change on a coarse
       pointer is treated as address-bar drift: the canvas is re-laid out so
       the footage still fills the viewport, but the triggers are left alone,
       because the track's height is in `vh` and has not actually moved. A
       width change is a real resize — a rotation, a desktop drag — and gets
       the full refresh. */
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    let lastWidth = window.innerWidth;
    let resizeTimer = 0;

    const onResize = () => {
      const width = window.innerWidth;
      const widthChanged = width !== lastWidth;
      lastWidth = width;

      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        layout();
        if (widthChanged || !coarsePointer) ScrollTrigger.refresh();
      }, 150);
    };
    window.addEventListener("resize", onResize);

    renderer
      .load((fraction) => {
        if (!cancelled) setLoadPct(Math.round(fraction * 100));
      })
      .then(() => {
        if (cancelled) return;
        if (!returning) {
          window.scrollTo(0, 0);
          head = 0;
          target = 0;
          progress = 0;
        }
        ScrollTrigger.refresh();
        updateChrome();
        layout();
        setReady(true);
        if (USE_LENIS) void setupLenis();
      });

    /* Dev-only: paint an arbitrary progress without scrolling, so the
       sequence can be inspected frame by frame. Stripped from prod. */
    if (process.env.NODE_ENV === "development") {
      (window as unknown as Record<string, unknown>).__stagePreview = (
        p: number,
      ) => {
        progress = clamp(p, 0, 1);
        head = progress * (FRAME_COUNT - 1);
        target = head;
        updateChrome();
        renderer.render(Math.round(head), openFade());
        return progress;
      };
    }

    return () => {
      cancelled = true;
      window.clearTimeout(resizeTimer);
      gsap.ticker.remove(tick);
      if (lenisRaf) gsap.ticker.remove(lenisRaf);
      setLenis(null);
      lenis?.destroy();
      window.removeEventListener("resize", onResize);
      trigger.kill();
      renderer.dispose();
      rendererRef.current = null;
    };
    // Refs are stable for the life of the component.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loadPct, ready };
}
