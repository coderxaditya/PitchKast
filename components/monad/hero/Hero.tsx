import { Button, Caret } from "@/components/monad/Button";
import { Container } from "@/components/monad/Container";
import { BOOKING_URL } from "@/lib/site";
import { Pipeline } from "./Pipeline";

/**
 * The first screen, on monad.com's: a purely typographic hero. The serif at
 * 80px weight 400, centred; the mono subhead at 20px in Graphite; a dark pill
 * and a ghost pill; and under them the pipeline diagram, which is the page's
 * only picture above the fold.
 *
 * The copy is the site's own, carried over word for word.
 */
export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="scroll-mt-[var(--header-h)] overflow-hidden pt-14 pb-16 sm:pt-[72px] lg:pb-24">
      <Container className="text-center">
        <h1 id="hero-title" className="mx-auto max-w-[21ch] font-serif text-display font-normal text-ink">
          We build brands that move businesses forward
        </h1>
        <p className="mx-auto mt-6 max-w-[58ch] text-body-lg text-off-black/80">
          PitchKast is an end-to-end growth partner for early-stage founders:
          founder branding, product build, LinkedIn lead generation, and the
          deck that raises the round.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild variant="dark">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book a discovery call
            </a>
          </Button>
          <Button asChild variant="ghost">
            <a href="#case-studies">View case studies</a>
          </Button>
        </div>
      </Container>

      <Container className="mt-14 lg:mt-20">
        <Pipeline />
      </Container>
    </section>
  );
}
