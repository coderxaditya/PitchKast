"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { peekScroll } from "@/lib/returnScroll";

import {
  BG_FADE_OUT,
  DAMPING,
  FRAME_COUNT,
  HERO_FADE_IN,
  HERO_FADE_OUT,
  OPEN_FADE,
  RENDERER,
  SNAP_EPSILON,
  USE_LENIS,
  LENIS_LERP,
  LENIS_WHEEL_MULTIPLIER,
  LENIS_SYNC_TOUCH,
  LENIS_SYNC_TOUCH_LERP,
  LENIS_TOUCH_INERTIA_EXPONENT,
  LENIS_TOUCH_MULTIPLIER,
  LENIS_RESPECT_REDUCED_MOTION,
  DAMPING_LENIS,
} from "@/lib/scrub/config";
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
    const FOLLOWER_DAMPING = USE_LENIS ? DAMPING_LENIS : DAMPING;

    // ── Follower loop ────────────────────────────────────────
    const tick = () => {
      const delta = target - head;

      if (Math.abs(delta) < SNAP_EPSILON) {
        head = target;
        renderer.render(Math.round(head), openFade());
        gsap.ticker.remove(tick);
        running = false; // idle until the next scroll event
        return;
      }

      head += delta * (reduceMotion ? 1 : FOLLOWER_DAMPING);
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
      lenis = new Lenis({
        lerp: LENIS_LERP,
        wheelMultiplier: LENIS_WHEEL_MULTIPLIER,
        syncTouch: LENIS_SYNC_TOUCH,
        syncTouchLerp: LENIS_SYNC_TOUCH_LERP,
        touchInertiaExponent: LENIS_TOUCH_INERTIA_EXPONENT,
        touchMultiplier: LENIS_TOUCH_MULTIPLIER,
        respectReducedMotion: LENIS_RESPECT_REDUCED_MOTION,
      });
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

    const onResize = () => {
      layout();
      ScrollTrigger.refresh();
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
      gsap.ticker.remove(tick);
      if (lenisRaf) gsap.ticker.remove(lenisRaf);
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
