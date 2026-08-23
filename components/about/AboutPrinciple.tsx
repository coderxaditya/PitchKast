"use client";

import { motion } from "framer-motion";

import { BlurText } from "@/components/motion/BlurText";
import { Rise } from "@/components/motion/Rise";
import { Chapter } from "./Chapter";
import { useInView } from "./useInView";

/**
 * Rules that draw themselves in from the left, on the same easing curve the
 * reveal figures wipe with — so the divider system reads as motion belonging to
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
 * The brand principle — one of the two chapters that runs full width.
 *
 * Built as a divider system rather than a stack of paragraphs: each claim gets
 * its own ruled band, which gives the three statements the weight of clauses in
 * a charter. The headline is the largest type in the section until the closing
 * payoff, and everything under it is deliberately quiet.
 */
export function AboutPrinciple() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <div ref={ref}>
      <Chapter
        id="about-05"
        index="05"
        title="Advisors, Not Vendors"
        inView={inView}
        full
      >
        {/* Split across two lines on purpose: the turn from "Advisors," to
            "not vendors." is the whole statement, so it gets a line break. */}
        {/* Both lines render as spans: a heading's content model is phrasing
            content, so the default <p> would be invalid nested here. */}
        <h3 className="block">
          <BlurText
            play={inView}
            align="left"
            as="span"
            text="Advisors,"
            className="font-heading text-display-xl block leading-[0.9] tracking-[-0.04em] text-white italic"
          />
          <BlurText
            play={inView}
            align="left"
            as="span"
            text="not vendors."
            className="font-heading text-display-xl text-ink-faint block leading-[0.9] tracking-[-0.04em] italic"
          />
        </h3>

        <div className="mt-16 grid gap-x-16 lg:grid-cols-12 lg:mt-20">
          <div className="lg:col-span-7 lg:col-start-6">
            <Divider play={inView} delay={0.9} />

            <Rise delay={1.1} play={inView}>
              <p className="font-body text-lead text-ink-muted py-7 leading-[1.6] text-pretty">
                We sit on the founder&rsquo;s side of the table.
              </p>
            </Rise>

            <Divider play={inView} delay={1.15} />

            <Rise delay={1.3} play={inView}>
              <p className="font-body text-body text-ink-muted max-w-[58ch] py-7 leading-[1.85] text-pretty">
                That means we are willing to tell you when something should be
                built, when something should be changed, and when something
                simply should not be bought.
              </p>
            </Rise>

            <Divider play={inView} delay={1.4} />

            <Rise delay={1.6} play={inView}>
              <p className="font-body text-body text-ink-muted max-w-[58ch] py-7 leading-[1.85] text-pretty">
                We measure ourselves by the outcome, not by how many
                deliverables we can put on an invoice.
              </p>
            </Rise>

            <Divider play={inView} delay={1.65} />
          </div>
        </div>
      </Chapter>
    </div>
  );
}
