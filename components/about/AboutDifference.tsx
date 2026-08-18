"use client";

import { Rise } from "@/components/motion/Rise";
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
 * Four principles as a 2×2 grid.
 *
 * Reuses the glass treatment from the stage cards in 01 so the two card systems
 * in this section read as the same material. Hover stays restrained: the card
 * lifts a little, its surface brightens, and the index turns gold — three small
 * changes on one easing curve, no scaling or colour washes.
 */
export function AboutDifference() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <div
      ref={ref}
      className="flex h-full flex-col justify-center px-1 py-6 text-left lg:px-5 lg:py-0"
    >
      <Rise delay={0} play={inView}>
        <span className="font-body text-gold/80 text-[0.62rem] tracking-[0.28em] uppercase">
          06 &mdash; What Makes PitchKast Different
        </span>
      </Rise>

      <Rise delay={0.15} play={inView} className="mt-3">
        <span className="block h-px w-full bg-white/12" />
      </Rise>

      {/* auto-rows-fr keeps both rows the same height whatever the copy does,
          so the four cards stay a grid rather than a ragged pair of columns. */}
      <div className="mt-5 grid auto-rows-fr grid-cols-2 gap-2.5 lg:gap-4">
        {PRINCIPLES.map((principle, i) => (
          <Rise key={principle.index} delay={0.35 + i * 0.12} play={inView}>
            <article className="liquid-glass glass-on-black group h-full rounded-[1.15rem] p-4 lg:p-7 hover:-translate-y-1">
              <span className="font-body text-gold/55 text-[0.58rem] tracking-[0.2em] transition-colors duration-500 group-hover:text-gold">
                {principle.index}
              </span>
              <h3 className="font-body mt-2 text-[0.95rem] leading-tight font-medium text-white lg:text-[1rem]">
                {principle.title}
              </h3>
              <p className="font-body mt-2.5 text-[0.72rem] leading-[1.6] text-white/50 transition-colors duration-500 group-hover:text-white/65 lg:text-[0.75rem]">
                {principle.body}
              </p>
            </article>
          </Rise>
        ))}
      </div>
    </div>
  );
}
