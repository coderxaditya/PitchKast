import { faqSelection } from "@/content/faq-selection";
import { SITE_URL } from "@/lib/seo";

/**
 * FAQPage structured data, built from the same array the visible accordion
 * renders.
 *
 * Read from the same module the section renders, rather than restated here.
 * Structured data that disagrees with the page it sits on is treated as
 * deception, not as a mistake, and the usual way that happens is a second copy
 * of the content drifting out of step with the first. There is no second copy.
 *
 * It reads `faqSelection`, not the full `faqData`: the section now shows six
 * of the forty-five. Marking up the other thirty-nine would describe a page
 * that does not exist, which is the exact mismatch this markup is penalised
 * for. The unused answers stay in the data file for whenever they get a page
 * of their own.
 *
 * A realistic note on what this earns: Google restricted FAQ *rich results*
 * to government and health sites in 2023, so the expanded accordion in the
 * blue links is unlikely. The markup still pays, in two places that matter
 * more now — it is a primary source for AI answer engines quoting a business,
 * and it states plainly what the page answers rather than leaving that to be
 * inferred from prose inside a collapsed accordion.
 */
export function FaqJsonLd() {
  const questions = faqSelection.map((entry) => ({
    "@type": "Question",
    name: entry.question,
    acceptedAnswer: {
      "@type": "Answer",
      /* The visible answers use blank lines for paragraphing. Collapsed to
         single spaces so the JSON carries the same words without the
         formatting characters, which schema consumers render inconsistently
         and some reject outright. */
      text: entry.answer.replace(/\s+/g, " ").trim(),
    },
  }));

  const graph = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    /* Ties the FAQ to the site entity declared in the root JsonLd, so the two
       blocks describe one thing rather than two unrelated ones. */
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: questions,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
