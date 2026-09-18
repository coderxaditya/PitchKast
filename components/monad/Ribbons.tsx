"use client";

import { Fragment } from "react";

import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";
import { COUNTRIES } from "@/content/countries";
import { SERVICES } from "@/content/services";

/**
 * Two crossing ribbons between the services and the reach band, after
 * campus-connect.co.in's college strip.
 *
 * A 200vw Off-Black ribbon tilted -4deg lies over a white one tilted +4deg,
 * each a line of small uppercase mono words divided by four-point stars. The
 * dark one names what PitchKast does, the white one the countries its
 * clients are in, which leads straight into the reach band below.
 *
 * They run on Magic UI's Scroll Based Velocity: each drifts on its own and
 * speeds up while the page scrolls, reversing when the reader scrolls back
 * up. The two go opposite ways. The component pauses off screen and keeps a
 * steady pace under reduced motion.
 */
const WHAT_WE_DO = [
  ...SERVICES.map((s) => s.menuName),
  "Pitch decks",
  "Positioning",
  "Personal branding",
];
const WHERE = COUNTRIES.map((c) => c.name);

function Line({ words, star }: { words: string[]; star: string }) {
  return (
    <>
      {words.map((word) => (
        <Fragment key={word}>
          <span className="mx-6 text-body-sm font-medium tracking-[0.2em] uppercase sm:mx-8">{word}</span>
          <span aria-hidden="true" className={`text-[26px] leading-none ${star}`}>
            ✦
          </span>
        </Fragment>
      ))}
    </>
  );
}

export function Ribbons() {
  return (
    <section aria-label="What we do and where" className="relative h-[150px] overflow-hidden sm:h-[190px]">
      <ScrollVelocityContainer className="absolute inset-0">
        {/* The white ribbon, underneath. */}
        <div className="absolute top-[78px] left-[-50vw] w-[200vw] rotate-[3deg] border-y border-ash bg-white text-off-black shadow-[0_2px_10px_rgba(36,36,36,0.08)] sm:top-[100px] sm:rotate-[4deg]">
          <ScrollVelocityRow baseVelocity={3} direction={-1} className="py-3 sm:py-3.5">
            <Line words={WHERE} star="text-ash" />
          </ScrollVelocityRow>
        </div>

        {/* The dark ribbon, on top. */}
        <div className="absolute top-[34px] left-[-50vw] z-10 w-[200vw] rotate-[-3deg] border-y border-off-black bg-off-black text-parchment sm:top-[46px] sm:rotate-[-4deg]">
          <ScrollVelocityRow baseVelocity={3} direction={1} className="py-3 sm:py-3.5">
            <Line words={WHAT_WE_DO} star="text-smoke" />
          </ScrollVelocityRow>
        </div>
      </ScrollVelocityContainer>
    </section>
  );
}
