import { ArrowRight, X } from "lucide-react";

import { Button } from "@/components/steep/Button";
import { Carousel } from "@/components/steep/Carousel";
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
 * tinted, its closing sentence faded in. On their page a click opens it; here
 * it is hover, and only ever one card across the whole section. The geometry
 * is theirs,
 * measured off the live page at 1440px: open 422×528, closed 346×432, 32px
 * apart, bottom edges aligned, 24px radius, 32px padding, a 0.5s
 * cubic-bezier(0,0,0.2,1) on the change and a 0.1s delay on the text.
 *
 * Two things differ, both because of what is being shown:
 *
 *  · Six studies, not three. They sit as two rows of the reference's row, and
 *    one card opens at a time across both.
 *
 *  · The reference's cards carry one sentence. A study carries up to five
 *    paragraphs, which no card of this size can hold. So a card shows the
 *    goal, where it happened, the results and the opening paragraph, and
 *    "Read the story" opens the whole thing — every paragraph, every metric,
 *    the revenue note — in an overlay. Nothing has been cut; it has moved one
 *    click further in.
 *
 * No JavaScript. Opening is `:hover` and `:focus-within`, and the rules that
 * keep it to one card and stop the rows jumping are in `globals.css` under
 * "Case study cards". The story overlay is the Popover API — light dismiss
 * and Escape for free.
 *
 * Below `lg` it is the reference's phone carousel (`Carousel`): one card at
 * a time with its neighbours peeking in, only the card in view tinted, and
 * previous/next buttons underneath.
 */

/* ── Tones ─────────────────────────────────────────────────────
   One per column, in the reference's order. Each sets a tint and
   its ink as custom properties; the card rules in `globals.css`
   decide when they show. */
const TONES = ["tone-peach", "tone-sky", "tone-sage"] as const;

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
   The slot is the flex item and the hover target; it carries the
   gutter as padding, so there is no dead gap between cards for the
   cursor to fall into. `tabIndex={-1}` makes the card focusable by a
   tap without adding it to the tab order — which is how a touch
   screen at desktop width, with no hover, opens one. */
function StudyCard({
  study,
  tone,
  position,
}: {
  study: CaseStudy;
  tone: (typeof TONES)[number];
  /** Where the card sits in the phone carousel, for its snap alignment. */
  position: "first" | "middle" | "last";
}) {
  /* The reference's snapping: the first card rests against the left gutter,
     the last against the right, and every card between centres with both
     neighbours peeking in. */
  const snap =
    position === "first" ? "snap-start" : position === "last" ? "snap-end" : "snap-center";

  return (
    <div
      /* Marked current before the carousel's script runs, so the first paint
         already shows the first card tinted rather than a row of grey. */
      data-active={position === "first" ? "" : undefined}
      className={`cs-slot w-[84%] shrink-0 sm:w-[60%] lg:w-auto lg:shrink ${snap}`}
    >
      <article
        tabIndex={-1}
        className={`cs-card ${tone} flex h-full flex-col rounded-[var(--radius-card)] p-8 outline-none`}
      >
        <div className="cs-ink">
          <p className="text-[14px] font-[430] opacity-70">
            {study.category} · {study.location}
          </p>

          <h3 className="mt-2.5 text-heading-sm font-[450]">{study.goal}</h3>

          <div className="mt-6">
            <Results study={study} />
          </div>
        </div>

        {/* The part that fades in. Kept in layout rather than removed, so the
            card does not jump when it opens — the reference does the same. */}
        <div className="cs-ink cs-reveal mt-auto pt-6">
          <p className="text-body leading-[1.35]">{study.paragraphs[0]}</p>

          <button
            type="button"
            popoverTarget={`story-${study.id}`}
            /* Transparent while the card is closed but still in the tab
               order: tabbing to it is what opens the card for a keyboard. */
            className="mt-3 inline-flex items-center gap-1.5 rounded-full py-1 text-[16px] font-[450] underline-offset-4 hover:underline"
          >
            Read the story
            <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </article>
    </div>
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
  const rows = [CASE_STUDIES.slice(0, 3), CASE_STUDIES.slice(3, 6)];

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

        {/* Below `lg`, the reference's phone carousel: the rows dissolve with
            `display: contents`, so all six cards become slides of one row,
            with the previous/next buttons underneath. From `lg`, two rows of
            the reference's desktop row, and the buttons are hidden. The row
            bleeds to the screen edges and keeps its snap points inside the
            gutter. */}
        <Carousel
          label="Case studies"
          slideSelector=".cs-slot"
          className="cs-rows -mx-6 mt-16 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:mt-20 lg:block lg:overflow-visible lg:px-0"
          controlsClassName="mt-6 flex gap-4 lg:hidden"
        >
          {rows.map((row, r) => (
            <div key={r} className="cs-row contents">
              {row.map((study, i) => {
                const n = r * 3 + i;
                return (
                  <StudyCard
                    key={study.id}
                    study={study}
                    tone={TONES[i]}
                    position={n === 0 ? "first" : n === CASE_STUDIES.length - 1 ? "last" : "middle"}
                  />
                );
              })}
            </div>
          ))}
        </Carousel>
      </Container>

      {CASE_STUDIES.map((study) => (
        <Story key={study.id} study={study} />
      ))}
    </section>
  );
}
