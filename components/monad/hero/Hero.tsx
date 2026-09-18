import { Button, Caret, HYPER } from "@/components/monad/Button";
import { HyperText } from "@/components/ui/hyper-text";
import { Container } from "@/components/monad/Container";
import { BOOKING_URL } from "@/lib/site";
import { HeroHeadline } from "./HeroHeadline";
import { Pipeline } from "./Pipeline";

/**
 * The first screen, on monad.com's: a purely typographic hero. The serif at
 * 80px weight 400, centred; the mono subhead at 20px in Graphite; a dark pill
 * and a ghost pill; and under them the pipeline diagram, which is the page's
 * only picture above the fold.
 *
 * The copy is the site's own, carried over word for word.
 */
const HEADLINE = "We build brands that move businesses forward";

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="scroll-mt-[var(--header-h)] overflow-hidden pt-14 pb-16 sm:pt-[72px] lg:pb-24">
      <Container className="text-center">
        <HeroHeadline text={HEADLINE} />
        <p className="mx-auto mt-6 max-w-[58ch] text-body-lg text-off-black/80">
          PitchKast is an end-to-end growth partner for early-stage founders:
          founder branding, product build, LinkedIn lead generation, and the
          deck that raises the round.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {/* Hyper Text labels and Monad's mint hover glow, as on the
              header's two buttons. */}
          <Button asChild variant="dark" className="btn-glow">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" aria-label="Book a discovery call">
              <HyperText as="span" aria-hidden="true" className={HYPER}>
                Book a discovery call
              </HyperText>
            </a>
          </Button>
          <Button asChild variant="ghost" className="btn-glow">
            <a href="#case-studies" aria-label="View case studies">
              <HyperText as="span" aria-hidden="true" className={HYPER}>
                View case studies
              </HyperText>
            </a>
          </Button>
        </div>
      </Container>

      <Container className="mt-14 lg:mt-20">
        <Pipeline />
      </Container>
    </section>
  );
}
