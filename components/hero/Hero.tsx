"use client";

import type { ReactNode } from "react";

import { BlurText } from "@/components/motion/BlurText";
import { Navbar } from "./Navbar";
import { Rise } from "@/components/motion/Rise";
import { CheckIcon, GlobeIcon } from "@/components/icons";

function StatCard({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="liquid-glass flex min-w-0 flex-1 flex-col justify-between rounded-[1.25rem] p-4 sm:w-[220px] sm:flex-none sm:p-5">
      <div>{icon}</div>
      <div className="mt-6 sm:mt-8">
        <div className="font-heading text-3xl leading-none tracking-[-1px] text-white italic sm:text-4xl">
          {value}
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
            text="Strategic Growth Partners"
            className="font-heading max-w-2xl justify-center text-5xl leading-[0.8] tracking-[-3px] text-white italic min-[400px]:text-6xl min-[400px]:tracking-[-4px] md:text-7xl lg:text-[5.5rem] [@media(max-height:720px)]:text-5xl"
          />
        </div>

        {/* Cards are fixed-width by design; below sm they share the row instead
            so the pair never runs past the viewport edges. */}
        <Rise
          delay={1.1}
          play={play}
          className="mt-10 flex w-full max-w-[456px] items-stretch justify-center gap-4 sm:w-auto sm:max-w-none [@media(max-height:720px)]:mt-5 [@media(max-height:560px)]:hidden"
        >
          <StatCard
            icon={<GlobeIcon />}
            value="25+"
            label="Global Clients"
          />
          <StatCard
            icon={<CheckIcon />}
            value="90+"
            label="Projects delivered"
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
