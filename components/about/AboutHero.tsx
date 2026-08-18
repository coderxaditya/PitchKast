"use client";

import { Fragment, useEffect, useState } from "react";

import { BlurText } from "@/components/motion/BlurText";
import { Rise } from "@/components/motion/Rise";
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

/**
 * BlurText staggers per word but has no start offset, so gate the second line.
 * The reset on `active` dropping is defensive — the reveal latches once now, so
 * it should not fire, but it keeps the helper correct if that ever changes.
 */
function useDelayed(active: boolean, ms: number) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!active) {
      setOn(false);
      return;
    }
    const t = setTimeout(() => setOn(true), ms);
    return () => clearTimeout(t);
  }, [active, ms]);
  return on;
}

function Connector({ position }: { position: number }) {
  return (
    <li
      aria-hidden="true"
      className="relative flex h-5 w-px items-center justify-center self-center sm:h-px sm:w-7 lg:w-[34px]"
    >
      <span className="absolute h-full w-px bg-white/15 sm:h-px sm:w-full" />
      {/* Staggered so the three pulses read as one signal moving down the rail. */}
      <span
        className="stage-pulse"
        style={{ animationDelay: `${position * 0.55}s` }}
      />
    </li>
  );
}

function StageCard({ stage }: { stage: (typeof STAGES)[number] }) {
  return (
    <li className="liquid-glass glass-on-black w-full rounded-[1.15rem] p-4 text-left sm:w-[142px] lg:w-[155px] lg:p-[1.15rem] hover:-translate-y-1">
      <span className="font-body text-gold/70 text-[0.6rem] tracking-[0.22em]">
        {stage.index}
      </span>
      <div className="font-display mt-2 text-2xl leading-none font-extrabold tracking-[0.02em] text-white uppercase">
        {stage.label}
      </div>
      <div className="font-body mt-2.5 flex flex-wrap items-center gap-x-1 text-[0.68rem] leading-tight text-white/45">
        <span>{stage.from}</span>
        <span className="text-gold/60" aria-hidden="true">
          &rarr;
        </span>
        <span className="text-white/70">{stage.to}</span>
      </div>
    </li>
  );
}

export function AboutHero() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const secondLine = useDelayed(inView, 420);

  return (
    <div
      ref={ref}
      className="mx-auto flex h-full max-w-xl flex-col items-center justify-center px-2 py-6 text-center lg:max-w-none lg:px-5 lg:py-0"
    >
      {/* Lead-in sits back so the promise below carries the weight. */}
      <BlurText
        play={inView}
        text="More than an agency."
        className="font-heading text-xl leading-[1.05] tracking-[-0.5px] text-white/45 italic sm:text-2xl"
      />
      <BlurText
        play={secondLine}
        text="One team from build to raise."
        className="font-heading mt-1.5 max-w-[15ch] text-[2.1rem] leading-[0.95] tracking-[-1px] text-white italic sm:text-[2.6rem] lg:text-[2.9rem]"
      />

      <Rise delay={1.05} play={inView}>
        <p className="font-body mt-5 max-w-[34ch] text-[0.9rem] leading-relaxed text-white/75 sm:text-base">
          PitchKast is an end-to-end growth partner for early-stage founders.
        </p>
      </Rise>

      <Rise delay={1.25} play={inView} className="mt-7 w-full">
        <ol className="flex flex-col items-center justify-center sm:flex-row sm:items-stretch">
          {STAGES.map((stage, i) => (
            <Fragment key={stage.label}>
              {i > 0 && <Connector position={i - 1} />}
              <StageCard stage={stage} />
            </Fragment>
          ))}
        </ol>
      </Rise>

      <Rise delay={1.5} play={inView}>
        <p className="font-body mt-7 max-w-[48ch] text-[0.85rem] leading-[1.75] text-white/50">
          We bring product, design, growth, and fundraising expertise together
          under one accountable team, helping founders move from an idea to a
          built product, from product to traction, and from traction to their
          next funding round.
        </p>
      </Rise>
    </div>
  );
}
