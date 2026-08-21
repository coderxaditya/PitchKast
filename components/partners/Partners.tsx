"use client";

import { LogoMarquee } from "./LogoMarquee";
import { partnerLogos } from "./logos";

/**
 * The white beat between the scrubbed hero and the About stack.
 *
 * Deliberately the one light surface on the page: after ~8 viewport heights of
 * black the cut to white reads as a chapter break, which is exactly what it is.
 */
export function Partners() {
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
        <LogoMarquee
          logos={partnerLogos}
          ariaLabel="Clients and partners"
          className="text-neutral-400"
        />
      </div>
    </section>
  );
}
