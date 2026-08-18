"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { BlurText } from "@/components/motion/BlurText";
import { Rise } from "@/components/motion/Rise";
import { cn } from "@/lib/utils";
import { useInView } from "./useInView";

/**
 * The three stages, and the seven disciplines they hold between them —
 * 2 + 3 + 2, which is where the headline's "seven" comes from.
 */
const STAGES = [
  {
    index: "01",
    label: "Build",
    body: "We turn ideas into products people can use and investors can understand, combining engineering, product design, branding, and investor-ready collateral.",
    services: ["IT Solutions", "Design"],
  },
  {
    index: "02",
    label: "Grow",
    body: "We turn the product into measurable attention through search, digital marketing, content, and founder-led LinkedIn growth.",
    services: ["Search", "Digital Marketing", "LinkedIn Growth"],
  },
  {
    index: "03",
    label: "Raise",
    body: "We help founders open the right doors through targeted outreach, investor strategy, financial modelling, storytelling, and fundraising preparation.",
    services: ["Outreach", "Business Consultancy"],
  },
] as const;

export function AboutSystem() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  /* One stage is always open — an all-collapsed state would leave the panel
     looking empty, and the section has to explain itself without a click. */
  const [active, setActive] = useState(0);

  return (
    <div
      ref={ref}
      className="flex h-full flex-col justify-center px-1 py-6 text-left lg:px-5 lg:py-0"
    >
      <Rise delay={0} play={inView}>
        <span className="font-body text-gold/80 text-[0.62rem] tracking-[0.28em] uppercase">
          04 &mdash; The Growth System
        </span>
      </Rise>

      <Rise delay={0.15} play={inView} className="mt-3">
        <span className="block h-px w-full bg-white/12" />
      </Rise>

      <BlurText
        play={inView}
        align="left"
        text="One team. Three stages. Seven disciplines."
        className="font-heading mt-5 max-w-[22ch] text-[1.75rem] leading-[1.02] tracking-[-1px] text-white italic lg:text-[1.95rem]"
      />

      <Rise delay={1.0} play={inView}>
        <p className="font-body mt-4 max-w-[46ch] text-[0.8rem] leading-[1.7] text-white/55">
          We believe building a company should not mean managing seven different
          vendors.
        </p>
      </Rise>

      <Rise delay={1.2} play={inView} className="mt-6">
        <ul className="border-t border-white/10">
          {STAGES.map((stage, i) => {
            const isActive = i === active;

            return (
              <li key={stage.label} className="border-b border-white/10">
                <button
                  type="button"
                  /* Pointer and keyboard both drive it, so the reveal responds
                     to a hover on desktop and a tap or Tab anywhere else. */
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-expanded={isActive}
                  className="group flex w-full items-center gap-3 py-3 text-left"
                >
                  <span
                    className={cn(
                      "font-body text-[0.58rem] tracking-[0.2em] transition-colors duration-300",
                      isActive ? "text-gold/90" : "text-white/25",
                    )}
                  >
                    {stage.index}
                  </span>
                  <span
                    className={cn(
                      "font-display text-xl leading-none font-extrabold tracking-[0.02em] uppercase transition-colors duration-300",
                      isActive
                        ? "text-white"
                        : "text-white/40 group-hover:text-white/70",
                    )}
                  >
                    {stage.label}
                  </span>
                  {/* Rule fills the gap to the count — grows on the open row,
                      which is the only movement the interaction makes. */}
                  <span
                    className={cn(
                      "h-px flex-1 transition-colors duration-300",
                      isActive ? "bg-gold/30" : "bg-white/10",
                    )}
                  />
                  <span
                    className={cn(
                      "font-body text-[0.6rem] tabular-nums transition-colors duration-300",
                      isActive ? "text-white/55" : "text-white/25",
                    )}
                  >
                    {stage.services.length}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="font-body pb-3 text-[0.76rem] leading-[1.65] text-white/55">
                        {stage.body}
                      </p>
                      <ul className="flex flex-wrap gap-1.5 pb-4">
                        {stage.services.map((service) => (
                          <li
                            key={service}
                            className="font-body rounded-full border border-white/15 px-2.5 py-1 text-[0.66rem] text-white/75"
                          >
                            {service}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </Rise>
    </div>
  );
}
