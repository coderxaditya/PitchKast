import { ArrowUpRight, ChartNoAxesColumnIncreasing, X } from "lucide-react";

import { Button } from "@/components/steep/Button";
import { Container } from "@/components/steep/Container";
import { BOOKING_URL } from "@/lib/site";
import { MoreStudies } from "./MoreStudies";
import { CASE_STUDIES, CASE_STUDIES_INTRO, type CaseStudy } from "./studies";
import { StudyVisual } from "./StudyVisual";

/**
 * Case studies, on the reference's (iniziomedia.com) bento.
 *
 * A pill eyebrow, the heading on the left and a "View all" pill on the right,
 * then one tall featured card beside two stacked ones. Measured off their
 * page: 568px tall, 24px between cards, a 24px radius, 32px padding, the
 * picture fading to black toward the bottom, a "Read Full Story" pill pinned
 * top right, and on hover the picture scales to 1.05 over 0.5s and the pill
 * to 1.03.
 *
 * Their cards carry photographs. Here the picture is drawn in code from each
 * study's own result (`StudyVisual`), so nothing on a card is a stock image
 * standing in for a client.
 *
 * Three studies show; "View all case studies" reveals the other three as a
 * second bento, mirrored. Every card opens the full study in an overlay.
 */

/** The bento order: which study sits where. */
const FIRST = [1, 2, 5];
const MORE = [3, 4, 6];
const byId = (ids: number[]) =>
  ids.map((id) => CASE_STUDIES.find((s) => s.id === id)!);

/* ── One card ──────────────────────────────────────────────── */
function StudyCard({ study, featured }: { study: CaseStudy; featured?: boolean }) {
  const id = `story-${study.id}`;
  return (
    <article
      className={`group relative flex flex-col justify-end overflow-hidden rounded-[24px] border border-ink/10 bg-[#0d0e10] ${
        featured ? "min-h-[560px] sm:min-h-[480px] lg:h-full" : "min-h-[300px] lg:min-h-0"
      }`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
      >
        <StudyVisual study={study} featured={featured} />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-transparent from-35% via-black/80 via-70% to-black"
      />

      <span
        aria-hidden="true"
        className="absolute top-5 right-5 z-20 flex items-center gap-1 rounded-full bg-paper px-5 py-2.5 text-[14px] font-semibold text-ink transition-transform duration-300 group-hover:scale-[1.03] sm:top-8 sm:right-8"
      >
        Read Full Story
        <ArrowUpRight className="size-3.5" strokeWidth={2} />
      </span>

      <div className="relative z-10 flex flex-col gap-6 p-8">
        <div className="flex flex-col gap-3">
          {featured ? (
            <span className="w-fit rounded-full border border-peach/25 bg-peach/12 px-3 py-[5px] text-[12px] font-semibold tracking-[0.6px] text-peach uppercase backdrop-blur-md sm:text-[14px]">
              Featured
            </span>
          ) : null}
          <div className="flex flex-col gap-0.5">
            <h3
              className={`font-semibold text-paper ${
                featured ? "text-[24px] leading-[1.5] sm:text-[28px]" : "text-[20px] leading-[1.33] sm:text-[24px]"
              }`}
            >
              {/* The whole card is the button: its box stretches over the
                  card, so the title is what a screen reader announces. */}
              <button
                type="button"
                popoverTarget={id}
                className="text-left after:absolute after:inset-0 after:z-30 after:rounded-[24px] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-[-4px] focus-visible:after:outline-peach"
              >
                {study.goal}
              </button>
            </h3>
            <p className="text-[14px] text-white/70">
              {study.category}, {study.location}
            </p>
          </div>
        </div>

        {featured ? (
          <ul className="flex flex-wrap gap-4">
            {study.metrics.map((metric) => (
              <li
                key={metric}
                className="rounded-xl border border-peach/20 bg-peach/12 px-3 py-2.5 text-[14px] font-semibold text-peach"
              >
                {metric}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

/* ── The bento ─────────────────────────────────────────────── */
export function Bento({ studies, mirrored }: { studies: CaseStudy[]; mirrored?: boolean }) {
  const [featured, ...rest] = studies;
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className={`lg:h-[568px] ${mirrored ? "lg:order-2" : ""}`}>
        <StudyCard study={featured} featured />
      </div>
      <div className="grid gap-6 lg:h-[568px] lg:grid-rows-2">
        {rest.map((study) => (
          <StudyCard key={study.id} study={study} />
        ))}
      </div>
    </div>
  );
}

/* ── The overlay ───────────────────────────────────────────────
   The full study, word for word. */
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
          <li key={metric} className="rounded-full bg-mist px-3.5 py-1.5 text-[15px] font-[450]">
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
  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-title"
      className="scroll-mt-24 bg-paper py-24 lg:py-32"
    >
      <Container>
        <div className="flex flex-col gap-4">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-sienna/20 bg-peach px-[15px] py-[7.5px]">
            <ChartNoAxesColumnIncreasing className="size-3.5 text-sienna" strokeWidth={2} aria-hidden="true" />
            <span className="text-[12px] font-semibold text-sienna uppercase sm:text-[14px]">
              {CASE_STUDIES_INTRO.eyebrow}
            </span>
          </span>

          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <h2
              id="case-studies-title"
              className="font-display text-heading-lg font-normal text-ink"
            >
              {CASE_STUDIES_INTRO.titleLead}{" "}
              <em className="italic">{CASE_STUDIES_INTRO.titleAccent}</em>
            </h2>
            <MoreStudies />
          </div>
        </div>

        <div className="mt-12">
          <Bento studies={byId(FIRST)} />
        </div>

        {/* Revealed by "View all case studies". */}
        <div id="more-studies" hidden className="mt-6">
          <Bento studies={byId(MORE)} mirrored />
        </div>
      </Container>

      {CASE_STUDIES.map((study) => (
        <Story key={study.id} study={study} />
      ))}
    </section>
  );
}
