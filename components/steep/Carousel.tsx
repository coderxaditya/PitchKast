"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * The reference's phone carousel.
 *
 * steep.app turns its card rows and its product tabs into one swipeable row
 * on a phone: one slide at a time with its neighbours peeking in, the slide in
 * view marked as current, and two round previous/next buttons underneath that
 * fade out at either end. This is that, shared by every section that needs it.
 *
 * Swiping is native scrolling with CSS scroll-snap, so it has the platform's
 * momentum and needs nothing from this component. What this adds is:
 *
 *  · which slide is current — the one nearest the middle of the row, or the
 *    first or last when the row is scrolled hard against an end — written to
 *    the slides as a `data-active` attribute, so sections style it in CSS;
 *  · the buttons, which scroll to the neighbouring slide and disable at the
 *    ends.
 *
 * Slides are found with `slideSelector` rather than taken as direct children,
 * because the case studies' rows dissolve with `display: contents` below
 * desktop and their slides sit one level down.
 *
 * On desktop the sections lay their slides out as grids or tabs instead; the
 * attribute is still written, and nothing there reads it.
 */
export function Carousel({
  children,
  label,
  slideSelector,
  className = "",
  controlsClassName = "",
}: {
  children: React.ReactNode;
  label: string;
  slideSelector: string;
  className?: string;
  controlsClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [count, setCount] = useState(0);

  const slides = useCallback(
    () => [...(ref.current?.querySelectorAll<HTMLElement>(slideSelector) ?? [])],
    [slideSelector],
  );

  useEffect(() => {
    const row = ref.current;
    if (!row) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const all = slides();
      setCount(all.length);
      if (!all.length) return;

      let current = 0;
      const atStart = row.scrollLeft <= 2;
      const atEnd = row.scrollLeft + row.clientWidth >= row.scrollWidth - 2;
      if (atEnd && !atStart) {
        current = all.length - 1;
      } else if (!atStart) {
        const box = row.getBoundingClientRect();
        const middle = box.left + box.width / 2;
        let nearest = Infinity;
        all.forEach((slide, i) => {
          const r = slide.getBoundingClientRect();
          const distance = Math.abs(r.left + r.width / 2 - middle);
          if (distance < nearest) {
            nearest = distance;
            current = i;
          }
        });
      }

      all.forEach((slide, i) => slide.toggleAttribute("data-active", i === current));
      setActive(current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    row.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      row.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [slides]);

  const go = (index: number) => {
    const row = ref.current;
    const slide = slides()[index];
    if (!row || !slide) return;
    /* Centre the slide, clamped to the row, and let scroll-snap settle it.
       `scrollIntoView` would also scroll the page vertically to reveal it. */
    const target = slide.offsetLeft - (row.clientWidth - slide.offsetWidth) / 2;
    const max = row.scrollWidth - row.clientWidth;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    row.scrollTo({
      left: Math.max(0, Math.min(target, max)),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const BUTTON =
    "grid size-12 place-items-center rounded-full bg-[rgba(4,23,43,0.05)] text-ink transition-opacity duration-200 disabled:cursor-default disabled:opacity-40";

  return (
    <>
      <div
        ref={ref}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        /* `relative` makes the row the slides' offset parent, which the
           button maths above measures against. The scrollbar is hidden, as in
           the reference: the peeking slide and the buttons carry the cue. */
        className={`relative [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
      >
        {children}
      </div>

      <div className={controlsClassName}>
        <button
          type="button"
          aria-label="Previous"
          disabled={active <= 0}
          onClick={() => go(active - 1)}
          className={BUTTON}
        >
          <ChevronLeft className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Next"
          disabled={count === 0 || active >= count - 1}
          onClick={() => go(active + 1)}
          className={BUTTON}
        >
          <ChevronRight className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
