"use client";

import { useEffect, useState } from "react";

import LogoLoop from "@/components/ui/LogoLoop";
import { partnerLogos } from "./logos";

/**
 * True only where a real pointer can hover.
 *
 * LogoLoop pauses on hover by default and drives it purely from
 * mouseenter/mouseleave, with no touch handling. Touch browsers synthesise a
 * mouseenter on tap and frequently never deliver the matching mouseleave, which
 * latches the marquee to speed 0 — it stops and never starts again. Pausing is
 * a pointer affordance, so it is only switched on where a pointer exists.
 *
 * Starts false so the server render and a touch device agree, and so the
 * failure mode of a wrong guess is "keeps scrolling" rather than "frozen".
 */
function useCanHover() {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(mq.matches);

    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return canHover;
}

/**
 * The white beat between the scrubbed hero and the About stack.
 *
 * Deliberately the one light surface on the page: after ~8 viewport heights of
 * black the cut to white reads as a chapter break, which is exactly what it is.
 */
export function Partners() {
  const canHover = useCanHover();

  return (
    <section className="relative z-10 bg-white py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <p className="font-body text-center text-sm font-medium text-neutral-500">
          Trusted by experts.
        </p>
        {/* Instrument Serif rather than the reference's bold sans — it keeps
            this band in the same voice as the hero headline. */}
        <h2 className="font-heading mt-3 text-center text-4xl leading-[0.95] tracking-[-0.02em] text-neutral-950 italic sm:text-5xl lg:text-6xl">
          Used by the leaders.
        </h2>
      </div>

      <div className="mt-14 sm:mt-20">
        <LogoLoop
          logos={partnerLogos}
          speed={70}
          direction="left"
          logoHeight={28}
          gap={72}
          pauseOnHover={canHover}
          scaleOnHover
          fadeOut
          /* Must be explicit: <html> carries `dark`, so LogoLoop's automatic
             fade colour would resolve to #0b0b0b and smear black over white. */
          fadeOutColor="#ffffff"
          ariaLabel="Clients and partners"
          className="text-neutral-400"
        />
      </div>
    </section>
  );
}
