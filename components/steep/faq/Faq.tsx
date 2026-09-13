import { Plus } from "lucide-react";

import { Button } from "@/components/steep/Button";
import { Container } from "@/components/steep/Container";
import { BOOKING_URL } from "@/lib/site";
import { faqSelection } from "./selection";

/**
 * Frequently asked questions.
 *
 * The reference has no FAQ, so this is built from the system's own parts
 * rather than copied from a section: the heading in a left column, as every
 * other section here sets it, and the questions in a hairline list beside it.
 * Hairlines rather than cards, because the system keeps borders to a single
 * #ececec weight and a stack of six cards would be heavier than the six
 * questions deserve.
 *
 * Kept from the previous build, because they were decisions: six questions,
 * no grouping, and native `<details>`. That opens and closes with no script,
 * is keyboard operable and announced correctly for free, and still works if
 * JavaScript never loads, which an accordion holding "how much does this
 * cost" should. The height animation is CSS, in `globals.css`.
 *
 * Six of forty-five, chosen in `selection.ts`, which the FAQ structured data
 * also reads, so the markup never claims a question the page does not show.
 */
export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="scroll-mt-24 bg-paper py-24 lg:py-32"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)] lg:gap-20">
          {/* The heading column stays put while the answers open beside it. */}
          <div className="lg:sticky lg:top-[calc(var(--header-h)+48px)] lg:self-start">
            <h2
              id="faq-title"
              className="font-display text-heading-lg font-normal text-balance text-ink"
            >
              Frequently asked questions
            </h2>

            <Button asChild size="md" className="mt-8">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Book a discovery call
              </a>
            </Button>
          </div>

          <div className="border-t border-hairline">
            {faqSelection.map((entry) => (
              <details key={entry.question} className="faq-item group border-b border-hairline">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-body-lg font-[450] text-ink [&::-webkit-details-marker]:hidden">
                  {entry.question}
                  <span
                    aria-hidden="true"
                    className="grid size-9 shrink-0 place-items-center rounded-full bg-mist transition-colors duration-200 group-hover:bg-hairline"
                  >
                    <Plus
                      className="size-4 transition-transform duration-300 ease-[cubic-bezier(0,0,0.2,1)] group-open:rotate-45"
                      strokeWidth={1.75}
                    />
                  </span>
                </summary>

                <div className="max-w-[62ch] pb-7">
                  {/* Blank lines separate paragraphs and single newlines sit
                      inside them: the "how to get started" answer is a
                      numbered list built that way. Splitting on the blank line
                      and keeping the single ones with `whitespace-pre-line`
                      preserves both without touching the source text. */}
                  {entry.answer.split("\n\n").map((block) => (
                    <p
                      key={block}
                      className="mt-4 text-body leading-[1.6] whitespace-pre-line text-ink/60 first:mt-0"
                    >
                      {block}
                    </p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
