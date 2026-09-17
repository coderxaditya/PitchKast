import { Container } from "@/components/monad/Container";
import { SectionHeading } from "@/components/monad/SectionHeading";
import { faqSelection } from "@/content/faq-selection";

/**
 * FAQ, on monad.com's: full-width rows with a hairline underneath and none on
 * top, the question in the serif at 32px, a chevron on the right, and no
 * background change on hover. Native <details>, so it opens with a keyboard
 * and a screen reader with no script; the height animates where the browser
 * supports `::details-content` (see "FAQ" in `globals.css`).
 */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-[var(--header-h)] py-16 lg:py-[120px]">
      <Container>
        <SectionHeading id="faq-title" title="Frequently Asked Questions" />
        <div className="mt-8 lg:mt-12">
          {faqSelection.map((item) => (
            <details key={item.question} className="faq border-b border-ash">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 lg:py-10">
                <h3 className="font-serif text-subheading font-normal text-off-black/85 lg:text-heading-sm">
                  {item.question}
                </h3>
                <svg viewBox="0 0 20 20" aria-hidden="true" className="faq-chevron size-5 shrink-0 transition-transform duration-300">
                  <path d="M10 3v13M4 10.5l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </summary>
              <div className="max-w-[72ch] pb-8 font-sans text-body-lg leading-[1.5] whitespace-pre-line text-off-black/80 lg:pb-10">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
