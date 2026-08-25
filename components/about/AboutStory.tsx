"use client";

import { Fragment } from "react";

import { BlurText } from "@/components/motion/BlurText";
import { Rise } from "@/components/motion/Rise";
import { Chapter } from "./Chapter";
import { useInView } from "./useInView";

/**
 * Named individually rather than left inside the sentence so each one reads as
 * a capability, not prose — the paragraph is the one place the whole offer is
 * enumerated, so it should be scannable.
 */
const SERVICES = [
  "IT Solutions",
  "Design",
  "Search",
  "Digital Marketing",
  "LinkedIn Growth",
  "Outreach",
  "Business Consultancy",
] as const;

/** The three refusals land harder as a marked list than as a run-on sentence. */
const REFUSALS = [
  "No black boxes.",
  "No unnecessary handoffs.",
  "No dependency on us to keep your business running.",
] as const;

export function AboutStory() {
  const { ref, inView } = useInView<HTMLDivElement>(0.04);

  return (
    <div ref={ref}>
      <Chapter id="about-02" index="02" title="Our Story" inView={inView}>
        {/* Asymmetric split: the headline holds the left rail and stays put
            while the prose scrolls past it, which is what makes this read as
            an essay rather than a two-column marketing block. */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <BlurText
                play={inView}
                align="left"
                as="h3"
                text="Built for founders who need more than a vendor."
                className="font-heading text-display-sm max-w-[16ch] leading-[1.0] tracking-[-0.02em] text-white italic"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <Rise delay={0.315} play={inView}>
              <p className="font-body text-lead text-ink-soft max-w-[58ch] leading-[1.75] text-pretty">
                Early-stage companies rarely need another disconnected service
                provider. They need people who understand the bigger picture.
              </p>
            </Rise>

            <Rise delay={0.367} play={inView}>
              <p className="font-body text-body text-ink-muted mt-8 max-w-[62ch] leading-[1.85] text-pretty">
                That is why PitchKast works alongside founders across the
                journey, combining{" "}
                {SERVICES.map((service, i) => (
                  <Fragment key={service}>
                    <span className="text-ink">{service}</span>
                    {i < SERVICES.length - 2
                      ? ", "
                      : i === SERVICES.length - 2
                        ? ", and "
                        : ""}
                  </Fragment>
                ))}{" "}
                into one connected growth system.
              </p>
            </Rise>

            <Rise delay={0.42} play={inView}>
              <p className="font-body text-body text-ink-muted mt-6 max-w-[62ch] leading-[1.85] text-pretty">
                Every engagement has named people, transparent progress, and
                work delivered in your name.
              </p>
            </Rise>

            <Rise delay={0.472} play={inView}>
              <ul className="mt-12 border-t border-white/10">
                {REFUSALS.map((refusal) => (
                  <li
                    key={refusal}
                    className="group flex items-baseline gap-4 border-b border-white/10 py-4"
                  >
                    <span
                      aria-hidden="true"
                      className="bg-gold/60 group-hover:bg-gold h-px w-5 shrink-0 translate-y-[-0.35em] transition-all duration-500 group-hover:w-8"
                    />
                    <span className="font-body text-body text-ink-soft leading-snug">
                      {refusal}
                    </span>
                  </li>
                ))}
              </ul>
            </Rise>
          </div>
        </div>
      </Chapter>
    </div>
  );
}
