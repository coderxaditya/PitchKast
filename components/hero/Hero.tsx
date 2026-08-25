"use client";

import { useEffect, useState, type ReactNode } from "react";

import { BlurText } from "@/components/motion/BlurText";
import { Navbar } from "./Navbar";
import { Rise } from "@/components/motion/Rise";
import StatsCounter from "@/components/ui/stats-counter";
import { CheckIcon, GlobeIcon } from "@/components/icons";

/** Matches the `Rise` delay on the card row, so the count starts as it fades in. */
const STATS_DELAY = 1.1;

function StatCard({
  icon,
  value,
  suffix,
  label,
  play,
}: {
  icon: ReactNode;
  value: number;
  suffix: string;
  label: string;
  play: boolean;
}) {
  /* StatsCounter starts on its own in-view check, and in the hero it is in
     view from the first frame — so left alone it would run its whole count
     while the card is still at opacity 0 behind the intro, and land on the
     final number before anyone sees it. Mounting it on the same beat as the
     card's reveal is what makes the count visible; the component itself is
     untouched. */
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!play) return;
    const id = setTimeout(() => setArmed(true), STATS_DELAY * 1000);
    return () => clearTimeout(id);
  }, [play]);

  return (
    <div className="liquid-glass flex min-w-0 flex-1 flex-col justify-between rounded-[1.25rem] p-4 sm:w-[220px] sm:flex-none sm:p-5">
      <div>{icon}</div>
      <div className="mt-6 sm:mt-8">
        <div className="font-heading text-3xl leading-none tracking-[-1px] text-white italic sm:text-4xl">
          {armed ? (
            <StatsCounter value={value} suffix={suffix} duration={2} />
          ) : (
            /* Same glyph count and tabular figures as the live counter, so
               arming it cannot shift the card's layout. Invisible in practice:
               the row is still at opacity 0 until this flips. */
            <span className="tabular-nums">0{suffix}</span>
          )}
        </div>
        <div className="font-body mt-2 text-xs font-light text-white">
          {label}
        </div>
      </div>
    </div>
  );
}

export function Hero({ play }: { play: boolean }) {
  return (
    <div
      /* pointer-events-none so drags land on the globe behind rather than on
         this full-screen box. The navbar re-enables them for itself. */
      className="hero-driven pointer-events-none absolute inset-0 z-10 flex h-full flex-col"
    >
      <Navbar />

      <div
        className="my-auto flex flex-col items-center justify-center px-4 pt-32 text-center [@media(max-height:720px)]:pt-20"
      >
        {/* Heading leads the stack now, so no top margin. */}
        <div>
          <BlurText
            play={play}
            /* The homepage's one and only h1.
               It rendered as a <p> (BlurText's default tag), which left the
               page with no h1 in the content at all — the only one in the
               document was the decorative wordmark at the very bottom of the
               footer. A crawler therefore read "PitchKast" as the page's
               subject and this headline as body copy, which is backwards. */
            as="h1"
            text="Strategic Growth Partners"
            className="font-heading max-w-2xl justify-center text-5xl leading-[0.8] tracking-[-3px] text-white italic min-[400px]:text-6xl min-[400px]:tracking-[-4px] md:text-7xl lg:text-[5.5rem] [@media(max-height:720px)]:text-5xl"
          />
        </div>

        {/* Cards are fixed-width by design; below sm they share the row instead
            so the pair never runs past the viewport edges. */}
        <Rise
          delay={STATS_DELAY}
          play={play}
          className="mt-10 flex w-full max-w-[456px] items-stretch justify-center gap-4 sm:w-auto sm:max-w-none [@media(max-height:720px)]:mt-5 [@media(max-height:560px)]:hidden"
        >
          <StatCard
            icon={<GlobeIcon />}
            value={25}
            suffix="+"
            label="Global Clients"
            play={play}
          />
          <StatCard
            icon={<CheckIcon />}
            value={90}
            suffix="+"
            label="Projects delivered"
            play={play}
          />
        </Rise>

        <Rise
          delay={1.25}
          play={play}
          className="mt-8 flex flex-col items-center gap-4 [@media(max-height:720px)]:mt-4"
        >
          <div className="liquid-glass font-body rounded-full px-3.5 py-1 text-center text-xs font-medium text-white">
            We Don&rsquo;t Chase Growth. We Create It.
          </div>
        </Rise>
      </div>
    </div>
  );
}
