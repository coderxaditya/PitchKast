"use client";

import { useEffect, useRef } from "react";

import { Rise } from "@/components/motion/Rise";
import { AboutHero } from "./AboutHero";
import { AboutDifference } from "./AboutDifference";
import { AboutOwnership } from "./AboutOwnership";
import { AboutPrinciple } from "./AboutPrinciple";
import { AboutStats } from "./AboutStats";
import { AboutStory } from "./AboutStory";
import { AboutSystem } from "./AboutSystem";
import { useInView } from "./useInView";

/**
 * The scattered reveal grid, ported from the StringTune tutorial.
 *
 * Upstream ships a CDN library whose only job here is to toggle a class as
 * each figure crosses the viewport. That is one IntersectionObserver, so the
 * library isn't pulled in — this page already runs GSAP/ScrollTrigger and a
 * marquee rAF loop, and a fourth scroll engine would be the thing that finally
 * makes them fight.
 *
 * The scatter is held at `lg` and above. Below that every cell goes full
 * width, since fixed placements that assume a wide canvas collapse into
 * overlap on a phone.
 */

/**
 * Every cell is the same size — 6 of the 14 columns at a 454:481 aspect. The
 * tutorial's varied spans are gone by request, so the scatter now comes from
 * column offset and row straddling alone.
 */
const RATIO = "454 / 481";
const [RATIO_W, RATIO_H] = [454, 481];

type Figure = {
  /** Tailwind placement — full width on mobile, scattered at lg. */
  className: string;
  seed: string;
};

/**
 * The first cell is no longer an image — it holds the section's copy. It keeps
 * the exact footprint a photo would have (6 columns, row 2) so the scatter is
 * unchanged, but paints nothing: no rim, no fill, no clip. The panel is meant
 * to be felt as absent, with only the words arriving.
 *
 * Below lg it takes its height from the content rather than the aspect ratio,
 * which the copy would overflow.
 */
const HERO_CELL = "col-span-full lg:col-start-2 lg:col-end-8 lg:row-start-2";

/**
 * Story panel, taking the slot the second photo held — same footprint, same
 * position in the reveal order, and painting nothing, exactly like the copy
 * panel beside it. Its own founder portrait keeps imagery in the row.
 */
const STORY_CELL = "col-span-full lg:col-start-9 lg:col-end-15 lg:row-start-2";

/**
 * Six columns of fourteen. Widening from the original five would have made
 * figures 3 and 4 collide in the row they share, and 5 and 6 collide in row 6,
 * so the starts are re-cut to hold a clear gutter between every pair.
 */
/** Stats panel, in the slot the third photo held. */
const STATS_CELL =
  "col-span-full lg:col-start-3 lg:col-end-9 lg:row-start-3 lg:row-end-4";

/** Growth system panel, in the slot the fourth photo held. */
const SYSTEM_CELL =
  "col-span-full lg:col-start-9 lg:col-end-15 lg:row-start-4 lg:row-end-5";

/** Brand-principle panel, in the slot the fifth photo held. */
const PRINCIPLE_CELL =
  "col-span-full lg:col-start-1 lg:col-end-7 lg:row-start-6";

/** Principles panel, in the slot the sixth photo held. */
const DIFFERENCE_CELL =
  "col-span-full lg:col-start-8 lg:col-end-14 lg:row-start-6";

/**
 * Empty: all six slots now hold copy. The machinery is kept rather than deleted
 * so a photo can be dropped back into any free slot by adding one entry — the
 * reveal-on-scroll wiring and `.reveal-figure` styles still work as they did.
 */
const FIGURES: Figure[] = [];

/** Section eyebrow, lifted out of the copy panel to head the whole section. */
function SectionLabel() {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);

  return (
    <div ref={ref} className="col-span-full flex justify-center pb-16 lg:pb-24">
      <Rise delay={0} play={inView}>
        <span className="font-body text-gold/80 text-[0.7rem] tracking-[0.3em] uppercase">
          About PitchKast
        </span>
      </Rise>
    </div>
  );
}

export function About() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const figures = rootRef.current?.querySelectorAll(".reveal-figure");
    if (!figures?.length) return;

    /* Reveal once and stay revealed. The tutorial's `string-repeat` replayed
       the wipe on every re-entry; here each figure keeps its class and is
       unobserved, so scrolling back over the section leaves it settled. */
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-inview");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.2 },
    );

    figures.forEach((figure) => io.observe(figure));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative z-10 grid grid-cols-6 items-start gap-x-[0.4rem] gap-y-6 bg-black px-[0.8rem] pt-24 pb-24 sm:gap-y-10 lg:grid-cols-14 lg:gap-y-0 lg:px-[1.6rem] lg:pt-32 lg:pb-32"
    >
      <SectionLabel />

      {/* Both content cells carry the figures' aspect themselves. Row 2 has no
          photo left in it, so without this the row would collapse to whichever
          panel's copy is taller and break the grid's rhythm. */}
      <div className={`${HERO_CELL} lg:aspect-[454/481]`}>
        <AboutHero />
      </div>

      {/* Kept directly after the copy panel so the reveal order down the page
          matches the original run of photos. */}
      <div className={`${STORY_CELL} lg:aspect-[454/481]`}>
        <AboutStory />
      </div>

      <div className={`${STATS_CELL} lg:aspect-[454/481]`}>
        <AboutStats />
      </div>

      <div className={`${SYSTEM_CELL} lg:aspect-[454/481]`}>
        <AboutSystem />
      </div>

      <div className={`${PRINCIPLE_CELL} lg:aspect-[454/481]`}>
        <AboutPrinciple />
      </div>

      <div className={`${DIFFERENCE_CELL} lg:aspect-[454/481]`}>
        <AboutDifference />
      </div>

      {/* Owns its own row and its own width, so it sits outside the aspect-
          locked scatter above without disturbing it. */}
      <AboutOwnership />

      {FIGURES.map((figure, i) => (
        <figure
          key={figure.seed}
          className={`reveal-figure ${figure.className}`}
          style={{ aspectRatio: RATIO }}
        >
          <img
            /* Requested at the figure's own ratio so `cover` has nothing left
               to crop — the six boxes are identical, so the sources are too. */
            src={`https://picsum.photos/seed/${figure.seed}/${RATIO_W}/${RATIO_H}`}
            alt=""
            loading="lazy"
            decoding="async"
            width={RATIO_W}
            height={RATIO_H}
            aria-hidden="true"
            data-index={i}
          />
        </figure>
      ))}
    </section>
  );
}
