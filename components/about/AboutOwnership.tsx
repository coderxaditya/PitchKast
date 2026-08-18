"use client";

import { motion } from "framer-motion";

import { BlurText } from "@/components/motion/BlurText";
import { Rise } from "@/components/motion/Rise";
import { useInView } from "./useInView";

/**
 * Ownership philosophy — the section's closing statement.
 *
 * The only full-bleed panel in the About grid. Every other cell is six of
 * fourteen columns; this one spans all fourteen on its own row beneath the
 * scatter, which is what makes it register as an ending rather than another
 * tile. Nothing above it moves, so 01–06 keep their order and geometry.
 *
 * The hierarchy is deliberately top-heavy in reverse: a modest headline and
 * quiet body, then the largest type anywhere on the page for the payoff.
 */
export function AboutOwnership() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <div
      ref={ref}
      className="col-span-full py-24 text-left lg:col-start-1 lg:col-end-15 lg:row-start-7 lg:py-32"
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <Rise delay={0} play={inView}>
            <span className="font-body text-gold/80 text-[0.62rem] tracking-[0.28em] uppercase">
              07 &mdash; Ownership Philosophy
            </span>
          </Rise>

          <BlurText
            play={inView}
            align="left"
            text="You own everything."
            className="font-heading mt-4 text-[2.2rem] leading-[1.02] tracking-[-1px] text-white italic lg:text-[2.6rem]"
          />
        </div>

        <div className="lg:pt-2">
          <Rise delay={0.7} play={inView}>
            <p className="font-body max-w-[54ch] text-[0.85rem] leading-[1.75] text-white/60 lg:text-[0.9rem]">
              From code and infrastructure to identity, content, credentials,
              and documentation, everything we create is registered in your name
              from day one.
            </p>
          </Rise>

          <Rise delay={0.9} play={inView}>
            <p className="font-body mt-4 max-w-[54ch] text-[0.85rem] leading-[1.75] text-white/60 lg:text-[0.9rem]">
              Because the goal isn&rsquo;t to make you dependent on PitchKast.
            </p>
          </Rise>
        </div>
      </div>

      {/* Draws in from the left on the reveal curve used across the section. */}
      <motion.span
        aria-hidden="true"
        className="mt-14 block h-px w-full origin-left bg-white/12 lg:mt-16"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: inView ? 1 : 0 }}
        transition={{ duration: 1.1, ease: [0.86, 0, 0.31, 1], delay: 1.05 }}
      />

      {/* The payoff. Largest type on the page, and the only place the accent
          carries a whole line rather than a detail. */}
      <div className="mt-10 lg:mt-12">
        <BlurText
          play={inView}
          align="left"
          text="The goal is to make"
          className="font-heading text-[1.6rem] leading-[1.05] tracking-[-1px] text-white/40 italic sm:text-[2.2rem] lg:text-[3rem]"
        />
        <BlurText
          play={inView}
          align="left"
          text="your company stronger."
          /* 2.3rem keeps the line inside a 320px viewport; at 2.6rem it filled
             93% of a 375px screen and wrapped on anything narrower. */
          className="font-heading text-gold mt-1 text-[2.3rem] leading-[0.95] tracking-[-2px] italic sm:text-[4rem] lg:text-[6rem] lg:tracking-[-4px]"
        />
      </div>
    </div>
  );
}
