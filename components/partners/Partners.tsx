"use client";

import { Container } from "@/components/flat/Container";
import { LogoMarquee } from "./LogoMarquee";
import { partnerLogos } from "./logos";

/**
 * The client strip.
 *
 * The marquee itself is untouched from the previous build — same speed, same
 * gap, same seamless two-copy track, same seventeen marks. Only the band
 * around it is restyled: the heading was set in a display serif that no longer
 * exists on the site, so it is Outfit now at the weight the flat system uses
 * for section headings.
 *
 * White ground, immediately after the blue hero. The cut from a saturated
 * block to plain white is how this aesthetic separates sections, and it also
 * suits the marks themselves, which are already processed to black on white.
 */
export function Partners() {
  return (
    <section
      /* No aria-label: the marquee inside already announces itself as a
         region with that name, and labelling both makes a screen reader read
         "Clients and partners" twice in a row. The h2 names this band. */
      /* Cleared for the sticky header, so an in-page link does not land with
         the heading tucked behind the bar. */
      className="scroll-mt-20 bg-canvas py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <p className="text-center text-eyebrow font-bold tracking-[0.12em] text-action-strong uppercase">
          Trusted by experts.
        </p>
        <h2 className="mt-4 text-center text-display-lg leading-[0.95] font-extrabold tracking-[-0.03em] text-balance text-ink">
          Used by the leaders.
        </h2>
      </Container>

      {/* Outside the container: the strip runs edge to edge, and its own
          gradient masks do the visual containment. */}
      <div className="mt-14 sm:mt-16">
        <LogoMarquee logos={partnerLogos} ariaLabel="Clients and partners" />
      </div>
    </section>
  );
}
