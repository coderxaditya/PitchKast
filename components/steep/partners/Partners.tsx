import { Container } from "@/components/steep/Container";
import { LogoMarquee } from "./LogoMarquee";
import { partnerLogos } from "./logos";

/**
 * The client strip.
 *
 * The marquee is untouched — same speed, same gap, same seamless two-copy
 * track, same seventeen marks. Only the band around it is new.
 *
 * That band is deliberately the quietest thing on the page. The reference
 * puts one short line over its logo row and nothing else, and it is right to:
 * the section's job is to be scanned on the way past, and it follows a hero
 * that is already shouting. So the two lines this carried as an eyebrow and a
 * 64px headline are one 20px sentence now. Every word survives; only the
 * volume changed.
 *
 * The ground is Paper White and has to be. The marks in `public/logos` are
 * processed to black on a white field rather than filtered at paint time, so
 * on Fog White — or on any other surface — each one would show its own faint
 * rectangle.
 */
export function Partners() {
  return (
    <section
      /* No aria-label: the marquee inside already announces itself as a
         region with that name, and labelling both makes a screen reader say
         "Clients and partners" twice in a row. */
      /* Cleared for the sticky header, so an in-page link does not land with
         the line tucked behind the bar. */
      className="scroll-mt-24 bg-paper py-20 sm:py-24"
    >
      <Container>
        <p className="text-center text-body-lg font-[450] tracking-[-0.009em] text-slate">
          Trusted by experts. Used by the leaders.
        </p>
      </Container>

      {/* Outside the container: the strip runs edge to edge, and its own
          edge fades do the visual containment. */}
      <div className="mt-12 sm:mt-14">
        <LogoMarquee logos={partnerLogos} ariaLabel="Clients and partners" />
      </div>
    </section>
  );
}
