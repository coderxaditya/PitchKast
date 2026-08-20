"use client";

import { useEffect, useRef } from "react";

import { BlurText } from "@/components/motion/BlurText";
import { Rise } from "@/components/motion/Rise";
import { AboutDifference } from "./AboutDifference";
import { AboutHero } from "./AboutHero";
import { AboutOwnership } from "./AboutOwnership";
import { AboutPrinciple } from "./AboutPrinciple";
import { AboutRail, type Chapter } from "./AboutRail";
import { AboutStats } from "./AboutStats";
import { AboutStory } from "./AboutStory";
import { AboutSystem } from "./AboutSystem";
import { useInView } from "./useInView";

/**
 * The About section.
 *
 * Structured as a narrative rather than a grid. The previous build laid the
 * copy into a scatter of identically sized tiles inherited from an image
 * gallery — which gave seven very different chapters the same visual weight,
 * and made the reading order zig-zag. Here each chapter takes the width and
 * rhythm its content actually needs: two run full-bleed as interruptions, the
 * rest sit inside a reading shell, and a sticky rail tracks progress through
 * all seven.
 */
const CHAPTERS: Chapter[] = [
  { id: "about-01", index: "01", label: "Who We Are" },
  { id: "about-02", index: "02", label: "Our Story" },
  { id: "about-03", index: "03", label: "Track Record" },
  { id: "about-04", index: "04", label: "The Growth System" },
  { id: "about-05", index: "05", label: "Advisors, Not Vendors" },
  { id: "about-06", index: "06", label: "What Makes PitchKast Different" },
  { id: "about-07", index: "07", label: "Ownership Philosophy" },
];

/** The section's opening — and the only h2 the About section owns. */
function SectionOpener() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  return (
    <div ref={ref} className="pb-[var(--chapter-gap)]">
      <Rise delay={0} play={inView}>
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="bg-gold/70 h-px w-8 shrink-0 lg:w-14"
          />
          <span className="font-body text-eyebrow text-gold tracking-[0.32em] uppercase">
            About PitchKast
          </span>
        </div>
      </Rise>

      <BlurText
        play={inView}
        align="left"
        as="h2"
        text="Strategic growth, end to end."
        className="font-heading text-display-md mt-7 max-w-[18ch] leading-[0.95] tracking-[-0.03em] text-white italic"
      />
    </div>
  );
}

export function About() {
  const rootRef = useRef<HTMLElement>(null);

  /* Cursor spotlight. One delegated listener for every card in the section
     rather than a listener each, writing custom properties straight to the
     node — hovering a card costs no React render. Pointer-gated: a touch
     device has no cursor to follow and would just leave a highlight stuck. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (event: PointerEvent) => {
      const card = (event.target as HTMLElement).closest?.(".spotlight");
      if (!(card instanceof HTMLElement)) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    };

    root.addEventListener("pointermove", onMove, { passive: true });
    return () => root.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section
      ref={rootRef}
      aria-label="About PitchKast"
      className="relative z-10 bg-black py-28 lg:py-40"
    >
      {/* Depth layer. Kept first in DOM and at z-0 so the statically
          positioned content paints over it, and wrapped in its own clipper —
          `overflow-hidden` on the section itself would break sticky. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <span
          className="about-bloom"
          style={{ top: "2%", left: "-14%", width: "62%", height: "30%" }}
        />
        <span
          className="about-bloom"
          style={{ top: "34%", right: "-16%", width: "58%", height: "28%" }}
        />
        <span
          className="about-bloom"
          style={{ bottom: "-6%", left: "12%", width: "66%", height: "26%" }}
        />
        <span className="about-grain" />
      </div>

      <div className="relative mx-auto w-full max-w-[var(--shell)] px-6 sm:px-8 lg:px-12">
        <SectionOpener />

        {/* Rail is a real grid column rather than an absolute overlay: the
            column is as tall as the whole narrative, which is exactly what
            `sticky` needs to travel the full section. */}
        <div className="grid xl:grid-cols-[3.5rem_1fr] xl:gap-10">
          <div className="hidden xl:block">
            <div className="sticky top-1/2 -translate-y-1/2">
              <AboutRail chapters={CHAPTERS} />
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-[var(--chapter-gap)]">
            <AboutHero />
            <AboutStory />
            <AboutStats />
            <AboutSystem />
            <AboutPrinciple />
            <AboutDifference />
            <AboutOwnership />
          </div>
        </div>
      </div>
    </section>
  );
}
