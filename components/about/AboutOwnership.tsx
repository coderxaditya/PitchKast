"use client";

import { motion } from "framer-motion";

import { BlurText } from "@/components/motion/BlurText";
import { Rise } from "@/components/motion/Rise";
import { Chapter } from "./Chapter";
import { useInView } from "./useInView";

/**
 * Ownership philosophy — the section's closing statement.
 *
 * The hierarchy is deliberately inverted: a modest headline and quiet body up
 * top, then the largest type anywhere on the page for the payoff. It is the
 * last of the two full-width chapters, so the section ends wide.
 */
export function AboutOwnership() {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);

  return (
    <div ref={ref}>
      <Chapter
        id="about-07"
        index="07"
        title="Ownership Philosophy"
        inView={inView}
        full
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <BlurText
              play={inView}
              align="left"
              as="h3"
              text="You own everything."
              className="font-heading text-display-sm max-w-[12ch] leading-[1.0] tracking-[-0.02em] text-white italic"
            />
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-3">
            <Rise delay={0.7} play={inView}>
              <p className="font-body text-body text-ink-muted max-w-[58ch] leading-[1.85] text-pretty">
                From code and infrastructure to identity, content, credentials,
                and documentation, everything we create is registered in your
                name from day one.
              </p>
            </Rise>

            <Rise delay={0.9} play={inView}>
              <p className="font-body text-body text-ink-muted mt-5 max-w-[58ch] leading-[1.85] text-pretty">
                Because the goal isn&rsquo;t to make you dependent on PitchKast.
              </p>
            </Rise>
          </div>
        </div>

        {/* Draws in from the left on the reveal curve used across the section. */}
        <motion.span
          aria-hidden="true"
          className="mt-16 block h-px w-full origin-left bg-white/12 lg:mt-20"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: inView ? 1 : 0 }}
          transition={{ duration: 1.1, ease: [0.86, 0, 0.31, 1], delay: 1.05 }}
        />

        {/* The payoff. Largest type on the page, and the only place the accent
            carries a whole line rather than a detail. */}
        <div className="mt-12 lg:mt-16">
          <BlurText
            play={inView}
            align="left"
            text="The goal is to make"
            className="font-heading text-display-sm text-ink-faint leading-[1.05] tracking-[-0.02em] italic"
          />
          <BlurText
            play={inView}
            align="left"
            text="your company stronger."
            className="font-heading text-display-xl text-gold mt-1 leading-[0.9] tracking-[-0.045em] italic"
          />
        </div>
      </Chapter>
    </div>
  );
}
