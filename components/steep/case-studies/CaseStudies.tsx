import { ArrowRight, X } from "lucide-react";

import { Button } from "@/components/steep/Button";
import { Container } from "@/components/steep/Container";
import { BOOKING_URL } from "@/lib/site";
import {
  CASE_STUDIES,
  CASE_STUDIES_INTRO,
  type CaseStudy,
} from "./studies";

/**
 * Case studies, as the reference's feature row.
 *
 * steep.app sets three cards side by side. One is open — wider, taller,
 * tinted, its closing sentence faded in — and clicking another opens that one
 * instead. Hover does nothing; it is a click. The geometry here is theirs,
 * measured off the live page at 1440px: open 422×528, closed 346×432, 32px
 * apart, bottom edges aligned, 24px radius, 32px padding, a 0.5s
 * cubic-bezier(0,0,0.2,1) on the change and a 0.1s delay on the text.
 *
 * Two things differ, both because of what is being shown:
 *
 *  · Six studies, not three. They sit as two rows of the reference's row, and
 *    each row keeps its own open card.
 *
 *  · The reference's cards carry one sentence. A study carries up to five
 *    paragraphs, which no card of this size can hold. So a card shows the
 *    goal, where it happened, the results and the opening paragraph, and
 *    "Read the story" opens the whole thing — every paragraph, every metric,
 *    the revenue note — in an overlay. Nothing has been cut; it has moved one
 *    click further in.
 *
 * No JavaScript. Which card is open is a native radio per row, styled through
 * `:has(:checked)`, so the choice survives without state, arrow keys move
 * between cards the way they move between any radios, and the component
 * stays a server component. The story overlay is the Popover API — light
 * dismiss and Escape for free.
 *
 * Below `lg` it is one horizontal row you swipe, every card open, which is
 * what the reference does on a phone.
 */

/* ── Tones ─────────────────────────────────────────────────────
   One per column, in the reference's order. Whole class strings,
   because Tailwind scans source text: a class assembled from a
   tone name is never generated and ships as no style at all.

   Below `lg` every card wears its tint. From `lg` a card is neutral
   until its radio is checked. */
const TONES = [
  {
    card: "bg-peach lg:bg-card lg:has-[:checked]:bg-peach",
    ink: "text-sienna lg:text-card-ink lg:group-has-[:checked]:text-sienna",
  },
  {
    card: "bg-sky lg:bg-card lg:has-[:checked]:bg-sky",
    ink: "text-sky-ink lg:text-card-ink lg:group-has-[:checked]:text-sky-ink",
  },
  {
    card: "bg-sage lg:bg-card lg:has-[:checked]:bg-sage",
    ink: "text-sage-ink lg:text-card-ink lg:group-has-[:checked]:text-sage-ink",
  },
] as const;

/** Split "6,300+ Organic Followers" into its figure and what it counts. */
function figure(metric: string) {
  const match = /^([\d$][^\s]*)\s+(.+)$/.exec(metric);
  return match ? { value: match[1], label: match[2] } : null;
}

/* ── The results ───────────────────────────────────────────────
   Where the reference has a line illustration, a study has its
   numbers — which are the more persuasive picture anyway. A study
   that leads with a figure shows it large; one whose results are
   the work itself lists them. */
function Results({ study }: { study: CaseStudy }) {
  const lead = figure(study.metrics[0]);
  const rest = lead ? study.metrics.slice(1) : study.metrics;

  return (
    <div>
      {lead ? (
        <p className="mb-2.5">
          <span className="block font-display text-[44px] leading-none tracking-[-0.015em] tabular-nums">
            {lead.value}
          </span>
          <span className="mt-1.5 block text-[15px] font-[450]">{lead.label}</span>
        </p>
      ) : null}

      <ul className="space-y-1">
        {rest.map((metric) => (
          <li key={metric} className="flex items-center gap-2 text-[15px] font-[430] opacity-80">
            <span aria-hidden="true" className="size-1 shrink-0 rounded-full bg-current" />
            {metric}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── One card ──────────────────────────────────────────────────
   The whole card is the label for its radio: the heading's label
   is stretched over it with `::after`, so a click anywhere opens
   the card, while the story button sits above that layer and
   stays a button of its own. A label that *wrapped* the button
   would be invalid markup, and a click on the button would be
   read as a click on the label. */
function StudyCard({
  study,
  tone,
  group,
  defaultOpen,
}: {
  study: CaseStudy;
  tone: (typeof TONES)[number];
  group: string;
  defaultOpen: boolean;
}) {
  const inputId = `study-${study.id}`;

  return (
    <article
      className={`group relative flex w-[84%] shrink-0 snap-start flex-col rounded-[var(--radius-card)] p-8 transition-[flex-grow,background-color] duration-500 ease-[cubic-bezier(0,0,0.2,1)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-ink sm:w-[46%] lg:aspect-[4/5] lg:w-auto lg:shrink lg:basis-0 lg:grow-[346] lg:overflow-hidden lg:has-[:checked]:grow-[422] ${tone.card}`}
    >
      <input
        type="radio"
        name={group}
        id={inputId}
        defaultChecked={defaultOpen}
        className="sr-only"
      />

      <div
        className={`transition-colors duration-500 ease-[cubic-bezier(0,0,0.2,1)] ${tone.ink}`}
      >
        <p className="text-[14px] font-[430] opacity-70">
          {study.category} · {study.location}
        </p>

        <h3 className="mt-2.5 text-heading-sm font-[450]">
          <label
            htmlFor={inputId}
            className="cursor-pointer after:absolute after:inset-0 after:content-['']"
          >
            {study.goal}
          </label>
        </h3>

        <div className="mt-6">
          <Results study={study} />
        </div>
      </div>

      {/* The part that fades in. Kept in layout rather than removed, so the
          card does not jump when it opens — the reference does the same. */}
      <div
        className={`mt-auto pt-6 transition-opacity delay-100 duration-500 ease-[cubic-bezier(0,0,0.2,1)] lg:opacity-0 lg:group-has-[:checked]:opacity-100 ${tone.ink}`}
      >
        <p className="text-body leading-[1.35]">{study.paragraphs[0]}</p>

        <button
          type="button"
          popoverTarget={`story-${study.id}`}
          /* Above the stretched label, so it is its own target. Hidden from
             pointer and tab order while the card is closed on desktop —
             `invisible`, not `hidden`, so it can fade with the text. */
          className="relative z-10 mt-4 inline-flex items-center gap-1.5 text-[16px] font-[450] underline-offset-4 hover:underline lg:invisible lg:group-has-[:checked]:visible"
        >
          Read the story
          <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

/* ── The overlay ───────────────────────────────────────────────
   The full study, word for word. Declared once per study outside
   the rows, so the markup the rows toggle stays small. */
function Story({ study }: { study: CaseStudy }) {
  const id = `story-${study.id}`;
  return (
    <div
      id={id}
      popover="auto"
      aria-labelledby={`${id}-title`}
      className="m-auto max-h-[88svh] w-[min(720px,calc(100vw-32px))] overflow-y-auto rounded-[var(--radius-card)] bg-paper p-8 text-ink shadow-overlay backdrop:bg-ink/40 sm:p-12"
    >
      <div className="flex items-start justify-between gap-6">
        <p className="text-[14px] font-[430] text-ash">
          Case study {String(study.id).padStart(2, "0")} · {study.category} ·{" "}
          {study.location}
        </p>
        <button
          type="button"
          popoverTarget={id}
          popoverTargetAction="hide"
          aria-label="Close"
          className="-mt-2 -mr-2 flex size-10 shrink-0 items-center justify-center rounded-full transition-colors duration-200 hover:bg-mist"
        >
          <X className="size-5" strokeWidth={1.75} />
        </button>
      </div>

      <h3 id={`${id}-title`} className="mt-4 font-display text-heading font-normal">
        {study.goal}
      </h3>

      <ul className="mt-6 flex flex-wrap gap-2">
        {study.metrics.map((metric) => (
          <li
            key={metric}
            className="rounded-full bg-mist px-3.5 py-1.5 text-[15px] font-[450]"
          >
            {metric}
          </li>
        ))}
      </ul>

      <div className="mt-8 space-y-4">
        {study.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-body leading-[1.55]">
            {paragraph}
          </p>
        ))}
      </div>

      {study.note ? (
        <p className="mt-6 text-[14px] leading-snug text-slate">{study.note}</p>
      ) : null}

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Button asChild size="md">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Book a discovery call
          </a>
        </Button>
        <Button variant="ghost" size="md" popoverTarget={id} popoverTargetAction="hide">
          Close
        </Button>
      </div>
    </div>
  );
}

export function CaseStudies() {
  /* Two rows of three. Each row opens a different column by default, so the
     section shows two tints rather than the same one twice. */
  const rows = [
    { studies: CASE_STUDIES.slice(0, 3), open: 0 },
    { studies: CASE_STUDIES.slice(3, 6), open: 1 },
  ];

  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-title"
      className="scroll-mt-24 bg-paper py-24 lg:py-32"
    >
      <Container>
        <div className="mx-auto max-w-[760px] text-center">
          <h2
            id="case-studies-title"
            className="font-display text-heading-lg font-normal text-ink"
          >
            {CASE_STUDIES_INTRO.title}
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-[18px] font-[430] leading-[1.45] text-slate">
            {CASE_STUDIES_INTRO.description}
          </p>
        </div>

        {/* Below `lg`, one swipeable row: the rows dissolve with
            `display: contents`, so all six cards become children of the
            scroller. From `lg`, two rows of the reference's row. The scroller
            bleeds to the screen edges and keeps its snap points inside the
            gutter. */}
        <div className="-mx-6 mt-16 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-4 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:mt-20 lg:block lg:space-y-8 lg:overflow-visible lg:px-0 lg:pb-0">
          {rows.map((row, r) => (
            <div key={r} className="contents lg:flex lg:items-end lg:gap-8">
              {row.studies.map((study, i) => (
                <StudyCard
                  key={study.id}
                  study={study}
                  tone={TONES[i]}
                  group={`case-studies-row-${r}`}
                  defaultOpen={i === row.open}
                />
              ))}
            </div>
          ))}
        </div>
      </Container>

      {CASE_STUDIES.map((study) => (
        <Story key={study.id} study={study} />
      ))}
    </section>
  );
}
