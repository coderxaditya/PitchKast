"use client";

import { useRef, type ReactNode } from "react";

import { BlurText } from "@/components/motion/BlurText";
import { GiantWord } from "./GiantWord";
import { Navbar } from "./Navbar";
import { Rise } from "@/components/motion/Rise";
import { ArrowUpRight, ClockIcon, GlobeIcon, Play } from "@/components/icons";

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={sectionRef}
      className="hero-driven absolute inset-0 z-10 flex h-full flex-col"
    >
      <Navbar />

      <div
        ref={contentRef}
        className="my-auto flex flex-col items-center justify-center px-4 pt-24 text-center [@media(max-height:720px)]:pt-16"
      >
        <Rise delay={0.4} play={play}>
          <div className="liquid-glass flex items-center gap-2 rounded-full p-1 sm:gap-3">
            <span className="font-body rounded-full bg-white px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-black sm:px-3">
              New
            </span>
            <span className="font-body pr-3 text-xs text-white/90 sm:text-sm">
              Maiden Crewed Voyage to Mars Arrives 2026
            </span>
          </div>
        </Rise>

        <div className="mt-6 [@media(max-height:720px)]:mt-3">
          <BlurText
            play={play}
            text="Strategic Growth Partners"
            className="font-heading max-w-2xl justify-center text-5xl leading-[0.8] tracking-[-3px] text-white italic min-[400px]:text-6xl min-[400px]:tracking-[-4px] md:text-7xl lg:text-[5.5rem] [@media(max-height:720px)]:text-5xl"
          />
        </div>

        <Rise
          delay={1.1}
          play={play}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 [@media(max-height:720px)]:mt-3"
        >
          <button className="liquid-glass-strong font-body flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white">
            Start Your Voyage
            <ArrowUpRight className="h-5 w-5" />
          </button>
          <button className="font-body flex items-center gap-2 text-sm font-medium text-white">
            View Liftoff
            <Play className="h-4 w-4" />
          </button>
        </Rise>

        {/* Cards are fixed-width by design; below sm they share the row instead
            so the pair never runs past the viewport edges. */}
        <Rise
          delay={1.3}
          play={play}
          className="mt-8 flex w-full max-w-[456px] items-stretch justify-center gap-4 sm:w-auto sm:max-w-none [@media(max-height:720px)]:mt-4 [@media(max-height:560px)]:hidden"
        >
          <StatCard
            icon={<ClockIcon />}
            value="34.5 Min"
            label="Average Videos Watch Time"
          />
          <StatCard
            icon={<GlobeIcon />}
            value="2.8B+"
            label="Users Across the Globe"
          />
        </Rise>

        <Rise
          delay={1.4}
          play={play}
          className="mt-8 flex flex-col items-center gap-4 [@media(max-height:720px)]:mt-4"
        >
          <div className="liquid-glass font-body rounded-full px-3.5 py-1 text-center text-xs font-medium text-white">
            Collaborating with top aerospace pioneers globally
          </div>
        </Rise>
      </div>

      <Rise
        delay={1.6}
        play={play}
        className="pointer-events-none flex w-full justify-center overflow-hidden [@media(max-height:560px)]:hidden"
      >
        <GiantWord
          word="Growth"
          sectionRef={sectionRef}
          contentRef={contentRef}
        />
      </Rise>
    </div>
  );
}
