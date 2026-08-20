"use client";

import { Rise } from "@/components/motion/Rise";
import { Chapter } from "./Chapter";
import { useInView } from "./useInView";

const PRINCIPLES = [
  {
    index: "01",
    title: "Advisors, not vendors",
    body: "We sit on your side of the table and stay invested in the outcome, not the invoice.",
  },
  {
    index: "02",
    title: "One accountable team",
    body: "Every service is delivered by one coordinated team, eliminating gaps between agencies and handoffs.",
  },
  {
    index: "03",
    title: "You own everything",
    body: "Code, infrastructure, identity files, content, lead data, credentials, and documentation remain in your name from day one.",
  },
  {
    index: "04",
    title: "Honest reporting",
    body: "Every report starts with what failed before what worked. We report what actually happened, not what sounds good.",
  },
] as const;

/**
 * Four principles, running the full width as a single row at desktop.
 *
 * Reuses the glass treatment from the stage cards in 01 so the two card systems
 * read as the same material. Hover stays restrained: the card lifts, its
 * surface brightens, the index turns gold, and the cursor spotlight tracks —
 * small changes on one easing curve, no scaling or colour washes.
 */
export function AboutDifference() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <div ref={ref}>
      <Chapter
        id="about-06"
        index="06"
        title="What Makes PitchKast Different"
        inView={inView}
      >
        <h3 className="sr-only">What makes PitchKast different</h3>

        {/* Four-up only at xl. At lg the cards fall to ~217px, which wraps the
            titles to three lines and reads cramped rather than considered. */}
        <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {PRINCIPLES.map((principle, i) => (
            <Rise key={principle.index} delay={0.3 + i * 0.12} play={inView}>
              <article className="liquid-glass glass-on-black spotlight group flex h-full flex-col rounded-[1.5rem] p-7 lg:p-8 hover:-translate-y-1.5">
                <div className="flex items-center gap-3">
                  <span className="font-body text-eyebrow text-gold/60 group-hover:text-gold tracking-[0.22em] transition-colors duration-500">
                    {principle.index}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-white/10 transition-colors duration-500 group-hover:bg-white/20"
                  />
                </div>

                <h4 className="font-body text-title mt-6 leading-tight font-medium text-balance text-white">
                  {principle.title}
                </h4>

                <p className="font-body text-micro text-ink-muted group-hover:text-ink-soft mt-4 leading-[1.75] text-pretty transition-colors duration-500">
                  {principle.body}
                </p>
              </article>
            </Rise>
          ))}
        </div>
      </Chapter>
    </div>
  );
}
