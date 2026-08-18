"use client";

import { motion } from "framer-motion";

import { BlurText } from "@/components/motion/BlurText";
import { Rise } from "@/components/motion/Rise";
import { useInView } from "./useInView";

/**
 * Rules that draw themselves in from the left, on the same easing curve the
 * photo figures wipe with — so the divider system reads as motion belonging to
 * this section rather than a generic fade.
 */
function Divider({ play, delay }: { play: boolean; delay: number }) {
  return (
    <motion.span
      aria-hidden="true"
      className="block h-px w-full origin-left bg-white/12"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: play ? 1 : 0 }}
      transition={{ duration: 0.9, ease: [0.86, 0, 0.31, 1], delay }}
    />
  );
}

/**
 * The brand principle.
 *
 * Built as a divider system rather than a stack of paragraphs: each claim gets
 * its own ruled band, which gives the three statements the weight of clauses in
 * a charter. The oversized headline carries the section; everything under it is
 * deliberately quiet so the type is the only loud thing.
 */
export function AboutPrinciple() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <div
      ref={ref}
      className="flex h-full flex-col justify-center px-1 py-6 text-left lg:px-5 lg:py-0"
    >
      <Rise delay={0} play={inView}>
        <span className="font-body text-gold/80 text-[0.62rem] tracking-[0.28em] uppercase">
          05 &mdash; Advisors, Not Vendors
        </span>
      </Rise>

      <div className="mt-3">
        <Divider play={inView} delay={0.15} />
      </div>

      {/* Split across two lines on purpose: the turn from "Advisors," to
          "not vendors." is the whole statement, so it gets a line break. */}
      <BlurText
        play={inView}
        align="left"
        text="Advisors,"
        className="font-heading mt-7 text-[3.1rem] leading-[0.92] tracking-[-2px] text-white italic sm:text-[3.8rem] lg:text-[4.6rem]"
      />
      <BlurText
        play={inView}
        align="left"
        text="not vendors."
        className="font-heading text-[3.1rem] leading-[0.92] tracking-[-2px] text-white/45 italic sm:text-[3.8rem] lg:text-[4.6rem]"
      />

      <div className="mt-9">
        <Divider play={inView} delay={0.9} />

        <Rise delay={1.1} play={inView}>
          <p className="font-body py-5 text-[0.95rem] leading-[1.6] text-white/85 lg:text-[1.05rem]">
            We sit on the founder&rsquo;s side of the table.
          </p>
        </Rise>

        <Divider play={inView} delay={1.15} />

        <Rise delay={1.35} play={inView}>
          <p className="font-body py-5 text-[0.8rem] leading-[1.7] text-white/50">
            That means we are willing to tell you when something should be
            built, when something should be changed, and when something simply
            should not be bought.
          </p>
        </Rise>

        <Divider play={inView} delay={1.4} />

        <Rise delay={1.6} play={inView}>
          <p className="font-body py-5 text-[0.8rem] leading-[1.7] text-white/50">
            We measure ourselves by the outcome, not by how many deliverables we
            can put on an invoice.
          </p>
        </Rise>

        <Divider play={inView} delay={1.65} />
      </div>
    </div>
  );
}
