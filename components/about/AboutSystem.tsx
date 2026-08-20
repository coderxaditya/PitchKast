"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { BlurText } from "@/components/motion/BlurText";
import { Rise } from "@/components/motion/Rise";
import { cn } from "@/lib/utils";
import { Chapter } from "./Chapter";
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
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  /* One stage is always open — an all-collapsed state would leave the chapter
     looking empty, and it has to explain itself without a click. */
  const [active, setActive] = useState(0);

  return (
    <div ref={ref}>
      <Chapter
        id="about-04"
        index="04"
        title="The Growth System"
        inView={inView}
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <BlurText
                play={inView}
                align="left"
                as="h3"
                text="One team. Three stages. Seven disciplines."
                className="font-heading text-display-sm max-w-[15ch] leading-[1.0] tracking-[-0.02em] text-white italic"
              />
              <Rise delay={0.95} play={inView}>
                <p className="font-body text-body text-ink-muted mt-7 max-w-[42ch] leading-[1.85] text-pretty">
                  We believe building a company should not mean managing seven
                  different vendors.
                </p>
              </Rise>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Rise delay={1.1} play={inView}>
              <ul className="border-t border-white/10">
                {STAGES.map((stage, i) => {
                  const isActive = i === active;

                  return (
                    <li key={stage.label} className="border-b border-white/10">
                      <button
                        type="button"
                        /* Pointer and keyboard both drive it, so the reveal
                           responds to a hover on desktop and a tap or Tab
                           anywhere else. */
                        onClick={() => setActive(i)}
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        aria-expanded={isActive}
                        aria-controls={`stage-${stage.index}`}
                        className="group flex w-full cursor-pointer items-center gap-5 py-6 text-left"
                      >
                        <span
                          className={cn(
                            "font-body text-eyebrow shrink-0 tracking-[0.2em] transition-colors duration-500",
                            isActive ? "text-gold" : "text-white/25",
                          )}
                        >
                          {stage.index}
                        </span>
                        <h4
                          className={cn(
                            "font-display text-display-xs leading-none font-extrabold tracking-[0.02em] uppercase transition-colors duration-500",
                            isActive
                              ? "text-white"
                              : "text-white/35 group-hover:text-white/70",
                          )}
                        >
                          {stage.label}
                        </h4>
                        <span
                          aria-hidden="true"
                          className={cn(
                            "h-px flex-1 transition-colors duration-500",
                            isActive ? "bg-gold/35" : "bg-white/10",
                          )}
                        />
                        <span
                          className={cn(
                            "font-body text-eyebrow tabular-nums transition-colors duration-500",
                            isActive ? "text-ink-muted" : "text-white/25",
                          )}
                        >
                          {stage.services.length}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            id={`stage-${stage.index}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.38,
                              ease: [0.4, 0, 0.2, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="pb-7 lg:pl-12">
                              <p className="font-body text-body text-ink-muted max-w-[56ch] leading-[1.85] text-pretty">
                                {stage.body}
                              </p>
                              <ul className="mt-5 flex flex-wrap gap-2">
                                {stage.services.map((service) => (
                                  <li
                                    key={service}
                                    className="font-body text-micro text-ink-soft hover:border-gold/40 hover:text-ink rounded-full border border-white/15 px-3.5 py-1.5 transition-colors duration-300"
                                  >
                                    {service}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </Rise>
          </div>
        </div>
      </Chapter>
    </div>
  );
}
