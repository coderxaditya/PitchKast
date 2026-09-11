import { Container } from "@/components/flat/Container";
import {
  CASE_STUDIES,
  CASE_STUDIES_INTRO,
  type CaseStudy,
} from "./studies";

/**
 * Three accents, cycled by position.
 *
 * Written out as whole class strings rather than assembled from the tone name.
 * Tailwind scans source text statically, so `text-${tone}-800` is never seen by
 * the compiler and never generated — a class built that way ships as no style
 * at all, which is exactly how a link in the old gallery shipped invisible.
 *
 * Chip text sits two steps darker than its own tint: measured at 7.15:1,
 * 6.78:1 and 6.37:1, so every chip clears AA for small text rather than
 * relying on the tint being "light enough".
 */
const TONES = [
  { label: "text-action-strong", chip: "bg-blue-100 text-blue-800" },
  { label: "text-emerald-700", chip: "bg-emerald-100 text-emerald-800" },
  { label: "text-amber-700", chip: "bg-amber-100 text-amber-800" },
] as const;

function Card({ study, tone }: { study: CaseStudy; tone: (typeof TONES)[number] }) {
  return (
    <article
      /* White card on the grey ground — the system's "colour block" with the
         page, not the card, carrying the tint. No border and no shadow; the
         value step between #ffffff and #f3f4f6 is what defines the edge.
         `group` so the chips can respond to a hover anywhere on the card. */
      className="group flex h-full flex-col rounded-flat bg-canvas p-7 transition-transform duration-200 hover:scale-[1.02] sm:p-9"
    >
      {/* ── Index and place ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p
          className={`text-eyebrow font-bold tracking-[0.12em] uppercase ${tone.label}`}
        >
          Case Study {String(study.id).padStart(2, "0")}
        </p>
        <p className="rounded-full bg-surface px-3.5 py-1.5 text-xs font-semibold tracking-[0.06em] text-ink-soft uppercase">
          {study.location}
        </p>
      </div>

      {/* ── What it was ── */}
      <h3 className="mt-6 text-display-sm leading-[1.05] font-extrabold tracking-[-0.02em] text-balance text-ink">
        {study.category}
      </h3>
      <p className="mt-3 text-lg font-semibold text-ink-soft">{study.goal}</p>

      {/* ── What we did ──────────────────────────────────────────
          `flex-1` so the chip row is pushed to the bottom edge of the card
          regardless of how much copy sits above it — study 05 runs five
          paragraphs and study 04 runs three. */}
      <div className="mt-6 flex-1 space-y-4">
        {study.paragraphs.map((paragraph) => (
          <p key={paragraph} className="leading-relaxed text-ink-soft">
            {paragraph}
          </p>
        ))}
      </div>

      {/* ── What came of it ── */}
      <ul className="mt-8 flex flex-wrap gap-2">
        {study.metrics.map((metric) => (
          <li
            key={metric}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${tone.chip}`}
          >
            {metric}
          </li>
        ))}
      </ul>

      {/* Only study 02 has one. It was mapped through the old component and
          never rendered, so the revenue figure has been sitting on the page
          unqualified since it shipped. */}
      {study.note ? (
        <p className="mt-4 text-xs leading-relaxed text-ink-soft">
          {study.note}
        </p>
      ) : null}
    </article>
  );
}

/**
 * Case studies.
 *
 * Two columns of independently sized cards. A grid rather than CSS columns:
 * multi-column flow fills the left column top to bottom before starting the
 * right, which would put studies one to three down one side and four to six
 * down the other. These are numbered and meant to be read across.
 *
 * Cards stretch to their row's height rather than each taking its own, so the
 * two columns line up. The chip row is pushed to the bottom edge by `flex-1`
 * on the copy above it, which means the metrics sit on the same line across a
 * row even though study 05 runs five paragraphs and study 04 runs three.
 */
export function CaseStudies() {
  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-title"
      className="scroll-mt-20 bg-surface py-20 sm:py-24 lg:py-32"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-eyebrow font-bold tracking-[0.12em] text-action-strong uppercase">
            {CASE_STUDIES_INTRO.eyebrow}
          </p>
          <h2
            id="case-studies-title"
            className="mt-4 text-display-lg leading-[0.95] font-extrabold tracking-[-0.03em] text-balance text-ink"
          >
            {CASE_STUDIES_INTRO.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-pretty text-ink-soft">
            {CASE_STUDIES_INTRO.description}
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:mt-16 lg:grid-cols-2">
          {CASE_STUDIES.map((study, i) => (
            <Card key={study.id} study={study} tone={TONES[i % TONES.length]} />
          ))}
        </div>
      </Container>
    </section>
  );
}
