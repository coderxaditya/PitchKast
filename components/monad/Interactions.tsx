"use client";

import { useEffect, useState } from "react";

/**
 * The page's small interactions, wired by data attributes so the sections
 * stay server components and only mark what should respond:
 *
 *  - `data-reveal`: rises and fades in the first time it scrolls into view.
 *    Elements that arrive together are staggered, so a grid fills in card by
 *    card. Nothing is hidden until this script has run, so without it (or
 *    before hydration) everything is simply there.
 *  - `data-spotlight`: a soft light follows the pointer across the card (the
 *    `--mx`/`--my` custom properties feed a gradient in `globals.css`).
 *  - `data-tilt`: the card leans a few degrees toward the pointer.
 *  - `data-magnetic`: the element drifts a little toward the pointer while
 *    it is near, and settles back when it leaves.
 *
 * Reveal uses the `translate` property and tilt uses `transform`, so a card
 * can do both without one undoing the other. Under `prefers-reduced-motion`
 * none of this is armed: content shows at once and nothing moves.
 */
export function Interactions() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    const cleanups: (() => void)[] = [];

    /* ── Reveal ── */
    const pending = [...document.querySelectorAll<HTMLElement>("[data-reveal]")].filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight * 0.9,
    );
    /* Only what is still below the fold waits; what the reader already sees
       on load stays put rather than blinking out and back. */
    pending.forEach((el) => el.classList.add("reveal-wait"));
    const io = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
          .forEach((e, i) => {
            const el = e.target as HTMLElement;
            el.style.transitionDelay = `${Math.min(i, 6) * 70}ms`;
            el.classList.add("reveal-in");
            io.unobserve(el);
            /* Hand the element back its own transitions once it has landed. */
            window.setTimeout(() => {
              el.classList.remove("reveal-wait", "reveal-in");
              el.style.transitionDelay = "";
            }, 1200);
          });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    pending.forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    /* ── Spotlight, tilt, magnetic: one pointer listener for the page ── */
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (fine) {
      let tilted: HTMLElement | null = null;
      let pulled: HTMLElement | null = null;

      const release = (el: HTMLElement | null) => {
        if (el) el.style.transform = "";
      };

      const onMove = (ev: PointerEvent) => {
        const target = ev.target as Element | null;

        const spot = target?.closest<HTMLElement>("[data-spotlight]");
        if (spot) {
          const r = spot.getBoundingClientRect();
          spot.style.setProperty("--mx", `${ev.clientX - r.left}px`);
          spot.style.setProperty("--my", `${ev.clientY - r.top}px`);
        }

        const tilt = target?.closest<HTMLElement>("[data-tilt]") ?? null;
        if (tilt !== tilted) {
          release(tilted);
          tilted = tilt;
        }
        if (tilt) {
          const r = tilt.getBoundingClientRect();
          const x = (ev.clientX - r.left) / r.width - 0.5;
          const y = (ev.clientY - r.top) / r.height - 0.5;
          tilt.style.transform = `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
        }

        const mag = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
        if (mag !== pulled) {
          release(pulled);
          pulled = mag;
        }
        if (mag) {
          const r = mag.getBoundingClientRect();
          const x = ev.clientX - (r.left + r.width / 2);
          const y = ev.clientY - (r.top + r.height / 2);
          mag.style.transform = `translate(${(x * 0.25).toFixed(1)}px, ${(y * 0.35).toFixed(1)}px)`;
        }
      };
      const onLeave = () => {
        release(tilted);
        release(pulled);
        tilted = pulled = null;
      };

      document.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        document.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("pointerleave", onLeave);
      });
    }

    root.classList.add("interactive");
    return () => {
      cleanups.forEach((fn) => fn());
      root.classList.remove("interactive");
    };
  }, []);

  return <ScrollUi />;
}

/**
 * How far down the page the reader is: a thin Lake-to-Mint bar across the
 * very top of the window, and, once the first screen is behind them, a round
 * "back to top" button whose ring fills with the same progress.
 */
function ScrollUi() {
  const [progress, setProgress] = useState(0);
  const [away, setAway] = useState(false);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      setAway(window.scrollY > window.innerHeight);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const R = 21;
  const C = 2 * Math.PI * R;

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-lake via-sky to-mint"
        style={{ transform: `scaleX(${progress})` }}
        data-scroll-bar
      />

      <a
        href="#home"
        aria-label="Back to top"
        tabIndex={away ? 0 : -1}
        aria-hidden={away ? undefined : "true"}
        className={`group fixed right-4 bottom-4 z-40 flex size-12 items-center justify-center rounded-pill bg-parchment/90 text-off-black shadow-[0_6px_24px_rgba(36,36,36,0.14)] backdrop-blur transition-all duration-300 hover:bg-off-black hover:text-parchment sm:right-6 sm:bottom-6 ${
          away ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <svg viewBox="0 0 48 48" aria-hidden="true" className="absolute inset-0 size-full -rotate-90">
          <circle cx="24" cy="24" r={R} fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="2" />
          <circle
            cx="24"
            cy="24"
            r={R}
            fill="none"
            stroke="var(--color-lake)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - progress)}
          />
        </svg>
        <svg viewBox="0 0 16 16" aria-hidden="true" className="relative size-4 transition-transform duration-300 group-hover:-translate-y-0.5">
          <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </a>
    </>
  );
}
