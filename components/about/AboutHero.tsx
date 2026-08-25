"use client";

import { Fragment, useEffect, useState } from "react";

import { BlurText } from "@/components/motion/BlurText";
import { Rise } from "@/components/motion/Rise";
import { Chapter } from "./Chapter";
import { useInView } from "./useInView";

/**
 * The three beats the section has to land immediately. Each one is a clause
 * lifted straight out of the body copy — the paragraph says "idea to a built
 * product, product to traction, traction to their next funding round", so the
 * rail shows that arc rather than repeating it in prose.
 */
const STAGES = [
  { index: "01", label: "Build", from: "Idea", to: "Built product" },
  { index: "02", label: "Grow", from: "Product", to: "Traction" },
  { index: "03", label: "Raise", from: "Traction", to: "Next round" },
] as const;

/** BlurText staggers per word but has no start offset, so gate the second line. */
function useDelayed(active: boolean, ms: number) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setOn(true), ms);
    return () => clearTimeout(t);
  }, [active, ms]);
  return on;
}

function Connector({ position }: { position: number }) {
  return (
    <li
      aria-hidden="true"
      className="relative flex h-6 w-px shrink-0 items-center justify-center self-center md:h-px md:w-10 lg:w-16"
    >
      <span className="absolute h-full w-px bg-white/12 md:h-px md:w-full" />
      <span
        className="stage-pulse"
        style={{ animationDelay: `${position * 0.55}s` }}
      />
    </li>
  );
}

function StageCard({ stage }: { stage: (typeof STAGES)[number] }) {
  return (
    <li className="liquid-glass glass-on-black spotlight group w-full flex-1 rounded-[1.5rem] p-6 text-left lg:p-8 hover:-translate-y-1.5">
      <div className="flex items-center gap-3">
        <span className="font-body text-eyebrow text-gold tracking-[0.22em]">
          {stage.index}
        </span>
        <span
          aria-hidden="true"
          className="h-px flex-1 bg-white/10 transition-colors duration-500 group-hover:bg-white/20"
        />
      </div>

      <h4 className="font-display text-display-xs mt-5 leading-none font-extrabold tracking-[0.02em] text-white uppercase">
        {stage.label}
      </h4>

      <div className="font-body text-micro text-ink-muted mt-4 flex items-center gap-2">
        <span>{stage.from}</span>
        <span className="text-gold" aria-hidden="true">
          &rarr;
        </span>
        <span className="text-ink-soft">{stage.to}</span>
      </div>
    </li>
  );
}

export function AboutHero() {
  const { ref, inView } = useInView<HTMLDivElement>(0.04);
  const secondLine = useDelayed(inView, 420);

  return (
    <div ref={ref}>
      <Chapter id="about-01" index="01" title="Who We Are" inView={inView}>
        <div className="mx-auto max-w-4xl text-center">
          {/* Lead-in sits back so the promise below carries the weight. */}
          <BlurText
            play={inView}
            text="More than a company."
            className="font-heading text-display-xs text-ink-faint leading-[1.05] tracking-[-0.5px] italic"
          />
          <BlurText
            play={secondLine}
            as="h3"
            text="One team from build to raise."
            className="font-heading text-display-lg mx-auto mt-2 max-w-[16ch] leading-[0.92] tracking-[-0.03em] text-white italic"
          />

          <Rise delay={0.367} play={inView}>
            <p className="font-body text-lead text-ink-soft mx-auto mt-8 max-w-[46ch] leading-relaxed text-balance">
              PitchKast is an end-to-end growth partner for early-stage
              founders.
            </p>
          </Rise>
        </div>

        {/* The arc, at full width — three stages reading left to right with a
            pulse travelling the rail between them. */}
        <Rise delay={0.438} play={inView} className="mt-16 lg:mt-20">
          <ol className="mx-auto flex max-w-6xl flex-col items-stretch md:flex-row md:items-center">
            {STAGES.map((stage, i) => (
              <Fragment key={stage.label}>
                {i > 0 && <Connector position={i - 1} />}
                <StageCard stage={stage} />
              </Fragment>
            ))}
          </ol>
        </Rise>

        <Rise delay={0.525} play={inView}>
          <p className="font-body text-body text-ink-muted mx-auto mt-16 max-w-[62ch] text-center leading-[1.85] text-pretty lg:mt-20">
            We bring product, design, growth, and fundraising expertise together
            under one accountable team, helping founders move from an idea to a
            built product, from product to traction, and from traction to their
            next funding round.
          </p>
        </Rise>
      </Chapter>
    </div>
  );
}
