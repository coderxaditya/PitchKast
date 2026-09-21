import { Button, Caret } from "@/components/monad/Button";
import { Container } from "@/components/monad/Container";
import { BOOKING_URL } from "@/lib/site";

/**
 * The closing call, on monad.com's last card: a 40px-radius card with a solid
 * Off-Black hairline, the serif centred, a mono line, and two pills, with a
 * gold wash rising from the top edge and a crimson one from the bottom, both
 * heavily blurred. The Lake Blue pill here is the screen's one primary action.
 *
 * The line under the heading is the FAQ's own description of how starting
 * works.
 */
export function Closing() {
  return (
    <section id="lets-talk" aria-labelledby="closing-title" className="scroll-mt-[var(--header-h)] py-16 lg:py-[120px]">
      <Container>
        <div data-reveal className="relative overflow-hidden rounded-band border border-off-black px-5 py-16 text-center sm:px-10 lg:py-20">
          <div
            aria-hidden="true"
            className="wash top-[-70%] left-[-5%] h-full w-[110%] opacity-60"
            style={{ background: "linear-gradient(rgba(167,252,205,0), rgb(226,193,97) 54%)", filter: "blur(75px)" }}
          />
          <div
            aria-hidden="true"
            className="wash bottom-[-80%] left-[-5%] h-full w-[110%] opacity-60"
            style={{ background: "linear-gradient(rgba(243,122,10,0.7) 25%, rgba(167,252,205,0))", filter: "blur(75px)" }}
          />
          <div className="relative">
            <h2 id="closing-title" className="mx-auto max-w-[18ch] font-serif text-heading-lg font-normal text-ink">
              One team from build to raise.
            </h2>
            <p className="mx-auto mt-6 max-w-[56ch] text-body-lg text-off-black/80">
              Book a strategy call with Soham, our Founder. We understand your
              goals, put together a clear plan, and typically get started
              within a week.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild variant="lake">
                <a data-magnetic href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  Book a discovery call
                  <Caret />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
