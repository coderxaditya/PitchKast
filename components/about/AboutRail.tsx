"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export type Chapter = { id: string; index: string; label: string };

/**
 * Chapter rail — the section's progress indicator and jump navigation.
 *
 * Seven panels of dense copy with no wayfinding is where this section was
 * weakest: you could not tell how far in you were or how much was left. The
 * rail answers both, and doubles as navigation.
 *
 * Active chapter is resolved with a centre band (`rootMargin` collapses the
 * viewport to its middle 10%), so exactly one panel qualifies at a time and the
 * marker never flickers between two.
 *
 * Desktop only. Below `xl` it would cost more width than the copy can spare,
 * and the panels are already a single readable column there.
 */
export function AboutRail({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = els.indexOf(entry.target as HTMLElement);
          if (i >= 0) setActive(i);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [chapters]);

  const jumpTo = (id: string) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "center",
    });
  };

  return (
    <nav aria-label="About chapters">
      <ol className="flex flex-col">
        {chapters.map((chapter, i) => {
          const isActive = i === active;
          const isPassed = i < active;

          return (
            <li key={chapter.id}>
              <button
                type="button"
                onClick={() => jumpTo(chapter.id)}
                aria-current={isActive ? "step" : undefined}
                /* 44px tall to stay a legitimate target on hybrid laptops and
                   iPads, which report a fine pointer but are still touched. */
                className="group flex h-11 w-full cursor-pointer items-center gap-2.5"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-px transition-all duration-500 ease-out",
                    isActive
                      ? "bg-gold w-6"
                      : isPassed
                        ? "w-3.5 bg-white/30 group-hover:bg-white/60"
                        : "w-2.5 bg-white/15 group-hover:bg-white/40",
                  )}
                />
                <span
                  className={cn(
                    "font-body text-[0.6rem] tracking-[0.18em] tabular-nums transition-colors duration-500",
                    isActive
                      ? "text-gold"
                      : "text-white/50 group-hover:text-white/80",
                  )}
                >
                  {chapter.index}
                </span>
                {/* The visible label is a number; screen readers get the name. */}
                <span className="sr-only">{chapter.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
