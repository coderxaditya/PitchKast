"use client";

import { Rise } from "@/components/motion/Rise";
import { cn } from "@/lib/utils";
import { Chapter } from "./Chapter";
import { useInView } from "./useInView";

const STATS = [
  { value: "90+", label: "Projects delivered" },
  { value: "$40M+", label: "Raised by founders we've backed" },
  { value: "5", label: "Continents served" },
  { value: "12+", label: "Years of combined craft" },
] as const;

/**
 * Track record.
 *
 * No glass, no cards, no icons — the brief was not to overdecorate, so the only
 * structure is a hairline between quadrants. Everything the chapter has to
 * spend goes into the numerals, which now run four-across at the section's full
 * width rather than boxed two-up, so they can carry real scale.
 */
export function AboutStats() {
  const { ref, inView } = useInView<HTMLDivElement>(0.04);

  return (
    <div ref={ref}>
      <Chapter id="about-03" index="03" title="Track Record" inView={inView}>
        <h3 className="sr-only">Track record</h3>

        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Rise
              key={stat.value}
              delay={0.1 + i * 0.05}
              play={inView}
              className={cn(
                "group py-10 lg:py-6",
                /* Hairlines between columns, never on the outer edge. The 2-up
                   and 4-up arrangements need different rules, so each states
                   its own rather than inheriting the other's. */
                i % 2 === 0 ? "pr-5 lg:pr-8" : "pl-5 lg:pl-8",
                i % 2 === 0 && "border-r border-white/10",
                i < 2 && "border-b border-white/10 lg:border-b-0",
                i !== 3 && "lg:border-r lg:border-white/10",
                i === 1 && "lg:pl-8",
                i === 2 && "lg:pl-8",
                i === 3 && "lg:border-r-0",
              )}
            >
              <dd className="font-heading text-display-md leading-[0.82] tracking-[-0.04em] text-white italic">
                {stat.value}
              </dd>
              <dt className="font-body text-micro text-ink-muted group-hover:text-ink-soft mt-5 leading-snug transition-colors duration-500">
                {stat.label}
              </dt>
            </Rise>
          ))}
        </dl>
      </Chapter>
    </div>
  );
}
