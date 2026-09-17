"use client";

import { useEffect, useRef } from "react";

import { COUNTRIES } from "@/content/countries";

/**
 * The moving list on the right of the reach band, after monad.com's
 * integrations marquee: large serif names with a round badge, drifting slowly
 * upward along a "<" shaped path, fading as they near the top and bottom.
 *
 * One rAF loop writes a transform and an opacity per row; nothing re-renders.
 * The loop pauses while the band is off screen, and under
 * `prefers-reduced-motion` the rows are laid out once and left still.
 */
const GAP = 88; // px between rows
const SPEED = 22; // px per second
const SLANT = 0.42; // how far a row moves right per px from the middle

export function ArcList() {
  const root = useRef<HTMLDivElement>(null);
  const rows = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const n = COUNTRIES.length;
    const span = n * GAP;
    let frame = 0;
    let visible = false;
    let last = performance.now();
    let offset = 0;

    const place = () => {
      const h = el.clientHeight;
      rows.current.forEach((row, i) => {
        if (!row) return;
        /* Position on a loop of `span`, centred on the middle of the box. */
        let y = (((i * GAP - offset) % span) + span) % span;
        y -= span / 2;
        const x = Math.abs(y) * SLANT;
        const fade = Math.max(0, 1 - Math.abs(y) / (h / 2));
        row.style.transform = `translate(${x}px, ${y + h / 2 - 32}px)`;
        row.style.opacity = String(Math.pow(fade, 1.4));
      });
    };

    const tick = (now: number) => {
      offset += ((now - last) / 1000) * SPEED;
      last = now;
      place();
      frame = requestAnimationFrame(tick);
    };

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    place();
    if (still) return;

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={root} aria-hidden="true" className="relative h-[420px] overflow-hidden md:h-[520px]">
      {/* The chevron lines behind the list, in Sky Blue. */}
      <svg viewBox="0 0 400 520" preserveAspectRatio="none" className="absolute inset-y-0 left-0 h-full w-[60%] opacity-70">
        {[0, 1, 2, 3].map((k) => (
          <path
            key={k}
            d={`M${400 - k * 26} 0 L${120 - k * 26} 260 L${400 - k * 26} 520`}
            fill="none"
            stroke="#a0b5eb"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <ul>
        {COUNTRIES.map((c, i) => (
          <li
            key={c.code}
            ref={(node) => {
              rows.current[i] = node;
            }}
            className="absolute top-0 left-[18%] flex items-center gap-4 whitespace-nowrap will-change-transform md:left-[22%]"
          >
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-parchment/80 md:size-16">
              <img
                src={`/flags/${c.code.toLowerCase()}.png`}
                alt=""
                width={120}
                height={80}
                draggable={false}
                className="size-7 rounded-full object-cover select-none md:size-8"
              />
            </span>
            <span className="font-serif text-heading font-normal text-off-black/85">{c.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
