import { faqData } from "./faq";

/**
 * The six questions the section shows.
 *
 * `faqData` still holds all forty-five, unedited — this only chooses which
 * appear. Swapping one is a single line here, and because the structured data
 * reads the same list, the markup can never claim a question the page does
 * not show.
 *
 * These six were picked to answer, in order: what the company does, whether
 * you have to buy all of it, whether it works where you are, how starting
 * actually goes, what it costs, and who owns the result. Between them they
 * cover the objections a first-time reader brings.
 */
const SELECTED = [
  "What services does PitchKast offer?",
  "Do I need to use all of PitchKast's services?",
  "Do you work with clients outside India?",
  "What is the process to get started with PitchKast?",
  "How much does PitchKast charge?",
  "Will I own the work delivered by PitchKast?",
] as const;

export type FaqEntry = { question: string; answer: string };

const ALL: FaqEntry[] = faqData.flatMap((section) => section.questions);

/**
 * Resolved in the order of `SELECTED`, not of `faqData`, so reordering the
 * list above reorders the section. A question that no longer exists in
 * `faqData` is dropped rather than rendered empty — and the count check below
 * turns that silent drop into a build failure.
 */
export const faqSelection: FaqEntry[] = SELECTED.map((q) =>
  ALL.find((entry) => entry.question === q),
).filter((entry): entry is FaqEntry => Boolean(entry));

if (faqSelection.length !== SELECTED.length) {
  throw new Error(
    `FAQ selection: ${SELECTED.length - faqSelection.length} of the chosen questions no longer exist in faqData. Fix the wording in selection.ts.`,
  );
}
