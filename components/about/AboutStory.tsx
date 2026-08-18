"use client";

import { Fragment } from "react";

import { BlurText } from "@/components/motion/BlurText";
import { Rise } from "@/components/motion/Rise";
import { FounderPortrait } from "./FounderPortrait";
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
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <div
      ref={ref}
      className="flex h-full flex-col justify-center px-1 py-6 text-left lg:px-5 lg:py-0"
    >
      <Rise delay={0} play={inView}>
        <span className="font-body text-gold/80 text-[0.62rem] tracking-[0.28em] uppercase">
          02 &mdash; Our Story
        </span>
      </Rise>

      <Rise delay={0.15} play={inView} className="mt-3">
        <span className="block h-px w-full bg-white/12" />
      </Rise>

      <BlurText
        play={inView}
        align="left"
        text="Built for founders who need more than a vendor."
        className="font-heading mt-5 max-w-[22ch] text-[1.9rem] leading-[1.02] tracking-[-1px] text-white italic lg:text-[2.05rem]"
      />

      {/* Portrait sits inset beside the opening paragraph — the editorial move
          that keeps this from reading as a stacked two-column block. */}
      <Rise delay={1.0} play={inView} className="mt-6">
        <div className="flex items-start gap-4">
          <FounderPortrait className="h-[104px] w-[84px] shrink-0" />
          <p className="font-body text-[0.8rem] leading-[1.7] text-white/70">
            Early-stage companies rarely need another disconnected service
            provider. They need people who understand the bigger picture.
          </p>
        </div>
      </Rise>

      <Rise delay={1.15} play={inView}>
        <p className="font-body mt-5 text-[0.8rem] leading-[1.7] text-white/55">
          That is why PitchKast works alongside founders across the journey,
          combining{" "}
          {SERVICES.map((service, i) => (
            <Fragment key={service}>
              <span className="text-white/90">{service}</span>
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

      <Rise delay={1.3} play={inView}>
        <p className="font-body mt-4 text-[0.8rem] leading-[1.7] text-white/55">
          Every engagement has named people, transparent progress, and work
          delivered in your name.
        </p>
      </Rise>

      <Rise delay={1.45} play={inView}>
        <ul className="mt-6 space-y-1.5">
          {REFUSALS.map((refusal) => (
            <li
              key={refusal}
              className="font-body flex items-baseline gap-2.5 text-[0.78rem] leading-snug text-white/65"
            >
              <span className="text-gold/70" aria-hidden="true">
                &mdash;
              </span>
              <span>{refusal}</span>
            </li>
          ))}
        </ul>
      </Rise>
    </div>
  );
}
