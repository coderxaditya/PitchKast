"use client";

import { Rise } from "@/components/motion/Rise";
import { cn } from "@/lib/utils";
import { useInView } from "./useInView";

const STATS = [
  { value: "250+", label: "Projects delivered" },
  { value: "$40M+", label: "Raised by founders we've backed" },
  { value: "5", label: "Continents served" },
  { value: "12+", label: "Years of combined craft" },
] as const;

/**
 * Track record.
 *
 * No glass, no cards, no icons — the brief was not to overdecorate, so the only
 * structure is a hairline cross between the four quadrants. Everything the
 * section has to spend, it spends on the numerals: Instrument Serif italic at
 * roughly four times the label size, matching the stat cards in the main hero
 * so the two read as the same voice.
 */
export function AboutStats() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <div
      ref={ref}
      className="flex h-full flex-col justify-center px-1 py-6 text-left lg:px-5 lg:py-0"
    >
      <Rise delay={0} play={inView}>
        <span className="font-body text-gold/80 text-[0.62rem] tracking-[0.28em] uppercase">
          03 &mdash; Track Record
        </span>
      </Rise>

      <Rise delay={0.15} play={inView} className="mt-3">
        <span className="block h-px w-full bg-white/12" />
      </Rise>

      <div className="mt-2 grid grid-cols-2">
        {STATS.map((stat, i) => (
          <Rise
            key={stat.value}
            delay={0.35 + i * 0.15}
            play={inView}
            className={cn(
              /* Generous at lg so the hairline cross spans the cell rather than
                 huddling in the middle of it. */
              "py-7 lg:py-[4.9rem]",
              /* Hairline cross: right edge on the left column, bottom edge on
                 the top row. Nothing on the outer boundary. */
              i % 2 === 0 && "border-r border-white/10 pr-4 lg:pr-6",
              i % 2 === 1 && "pl-4 lg:pl-6",
              i < 2 && "border-b border-white/10",
            )}
          >
            {/* Sized off the widest value: "$40M+" is the constraint, and at
                5.5rem it takes ~205 of the 251px column, leaving margin so a
                longer figure later doesn't immediately wrap. */}
            <div className="font-heading text-[3.4rem] leading-[0.85] tracking-[-2px] text-white italic sm:text-[4.2rem] lg:text-[5.5rem]">
              {stat.value}
            </div>
            <div className="font-body mt-3 text-[0.75rem] leading-snug text-white/50 lg:text-[0.8rem]">
              {stat.label}
            </div>
          </Rise>
        ))}
      </div>
    </div>
  );
}
