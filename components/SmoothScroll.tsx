"use client";

import { useEffect } from "react";

import { lenisOptions, setLenis } from "@/lib/smoothScroll";

/**
 * Smooth scroll for routes that have no handshake stage.
 *
 * On the home page Lenis is owned by `useHandshakeStage`, because there it has
 * to be stepped from the same `gsap.ticker` as the scrub — the smoothed scroll
 * position and the frame the canvas paints must be decided on one tick, or the
 * footage trails the page. `/gallery` has no scrub and no GSAP, so it runs a
 * plain rAF loop instead and shares the option set so the two cannot drift.
 *
 * Mount this only on routes without the stage. Two Lenis instances on one
 * document both bind wheel and touch listeners and both write `scrollTop`, so
 * they would fight over every gesture.
 */
export function SmoothScroll({
  /**
   * CSS selector for the element that actually scrolls, when it is not the
   * window.
   *
   * `/gallery` is exactly that case and it is easy to get wrong: its document
   * is precisely one viewport tall — scrollHeight 837 against innerHeight 837
   * — because every photograph lives inside ParallaxScroll's own
   * `overflow-y-auto` box, 3,067px of content in a 629px window. A Lenis bound
   * to the window there reports `limit: 0` and smooths a scroll that never
   * happens. Pointing it at the real scroller is what makes the route behave
   * like the rest of the site.
   */
  wrapperSelector,
}: { wrapperSelector?: string } = {}) {
  useEffect(() => {
    let raf = 0;
    let cancelled = false;
    let lenis: import("lenis").default | null = null;

    void (async () => {
      const Lenis = (await import("lenis")).default;
      if (cancelled) return;

      const wrapper = wrapperSelector
        ? document.querySelector<HTMLElement>(wrapperSelector)
        : null;

      /* Falling back to the window rather than bailing out: a selector that
         stops matching should degrade to the old behaviour, not to no smooth
         scroll and no error. */
      const target =
        wrapper && wrapper.firstElementChild
          ? {
              wrapper,
              content: wrapper.firstElementChild as HTMLElement,
            }
          : {};

      lenis = new Lenis({ ...lenisOptions(), ...target });
      setLenis(lenis);

      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      if (process.env.NODE_ENV === "development") {
        (window as unknown as Record<string, unknown>).__lenis = lenis;
      }
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      setLenis(null);
      lenis?.destroy();
    };
  }, [wrapperSelector]);

  return null;
}
