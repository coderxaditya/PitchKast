import { Plus } from "lucide-react";

import { Container } from "@/components/flat/Container";
import { faqSelection } from "./selection";

/**
 * Frequently asked questions.
 *
 * Native `<details>` rather than a JavaScript accordion. It opens and closes
 * with no script at all, it is keyboard operable and announced correctly for
 * free, and it works on a page where JavaScript failed to load — which an
 * accordion holding the answer to "how much does this cost" should.
 *
 * Six of the forty-five, chosen in `selection.ts`. The other thirty-nine are
 * still in the data file; they are simply not on the page.
 */
export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="scroll-mt-20 bg-canvas py-20 sm:py-24 lg:py-32"
    >
      <Container>
        <h2
          id="faq-title"
          className="mx-auto max-w-3xl text-center text-display-lg leading-[0.95] font-extrabold tracking-[-0.03em] text-balance text-ink"
        >
          Frequently asked questions
        </h2>

        {/* Thick rules between items, which is the one place the system asks
            for a border — a stack of questions needs the structure, and there
            is no shadow available to give it. */}
        <div className="mx-auto mt-12 max-w-3xl border-t-2 border-ink sm:mt-14">
          {faqSelection.map((entry) => (
            <details
              key={entry.question}
              className="group border-b-2 border-ink"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-bold text-pretty text-ink transition-colors duration-200 hover:text-action-strong [&::-webkit-details-marker]:hidden">
                {entry.question}
                <Plus
                  className="size-6 shrink-0 transition-transform duration-200 group-open:rotate-45"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </summary>

              <div className="pb-7">
                {/* Answers use blank lines between paragraphs and single
                    newlines inside them — the "how to get started" answer is a
                    numbered list built that way. Splitting on the blank line
                    and keeping the single ones with `whitespace-pre-line`
                    preserves both without touching the source text. */}
                {entry.answer.split("\n\n").map((block) => (
                  <p
                    key={block}
                    className="mt-4 leading-relaxed whitespace-pre-line text-pretty text-ink-soft first:mt-0"
                  >
                    {block}
                  </p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
