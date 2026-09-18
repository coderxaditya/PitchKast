import { ArrowRight, X } from "lucide-react";

import { Button } from "@/components/monad/Button";
import { Container } from "@/components/monad/Container";
import { SectionHeading } from "@/components/monad/SectionHeading";
import { CASE_STUDIES, type CaseStudy } from "@/content/studies";
import { BOOKING_URL } from "@/lib/site";

/**
 * Case studies, on monad.com's "Why Teams Choose Monad" cards.
 *
 * Three columns of cards (two on a tablet, one on a phone) with a solid
 * Off-Black hairline and a 16px radius.
 * Each card is dark, with the study's rendered dashboard picture behind it and
 * the text set in white: where and for whom, the goal as a serif title, the
 * opening paragraph, and the results as hairline pills. The whole card opens the full study, word for word, in an
 * overlay: the Popover API, so light dismiss and Escape come free.
 */

function StudyCard({ study }: { study: CaseStudy }) {
  const id = `story-${study.id}`;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card border border-off-black bg-[#0c0e13] text-white">
      {/* The picture: rendered by `scripts/build-case-study-art.mjs` from the
          study's own results, with its dashboard against the right edge. It
          runs across the top of the card and fades into the card's dark
          ground, and the text starts over the fade. The band keeps the
          picture's own 2:1 shape, so the whole dashboard shows however wide
          the card is, and never sits under a line of text. */}
      <div aria-hidden="true" className="relative aspect-[2/1] overflow-hidden">
        <img
          src={`/case-studies/study-${study.id}-wide.webp`}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          className="size-full object-cover object-right transition-transform duration-700 ease-out select-none group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e13] from-5% via-[#0c0e13]/30 via-45% to-transparent" />
      </div>

      <div className="relative -mt-4 flex flex-1 flex-col px-6 pb-6 sm:-mt-8 sm:px-8 sm:pb-8">
        <p className="text-caption tracking-[0.05em] text-white/60 uppercase sm:text-body-sm">
          {String(study.id).padStart(2, "0")} · {study.category}
        </p>
        <h3 className="mt-5 font-serif text-subheading font-normal text-white">
          {study.goal}
        </h3>
        <p className="mt-2 text-body-sm text-white/50">{study.location}</p>
        <p className="mt-5 line-clamp-3 font-sans text-body leading-[1.35] text-white/75">
          {study.paragraphs[0]}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {study.metrics.map((metric) => (
            <li
              key={metric}
              className="rounded-pill border border-white/20 bg-white/[0.06] px-3 py-1.5 text-caption tracking-[0.03em] text-white uppercase backdrop-blur-sm sm:text-body-sm"
            >
              {metric}
            </li>
          ))}
        </ul>

        <p className="mt-auto flex items-center gap-2 pt-8 text-body-sm tracking-[0.05em] text-white uppercase">
          Read the story
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
        </p>
      </div>

      {/* The whole card is the button. */}
      <button
        type="button"
        popoverTarget={id}
        aria-label={`Read the story: ${study.goal}`}
        className="absolute inset-0 cursor-pointer rounded-card"
      />
    </article>
  );
}

function Story({ study }: { study: CaseStudy }) {
  const id = `story-${study.id}`;
  return (
    <div
      id={id}
      popover="auto"
      aria-labelledby={`${id}-title`}
      className="m-auto max-h-[88svh] w-[min(760px,calc(100vw-24px))] overflow-y-auto rounded-card border border-ash bg-parchment p-7 text-off-black shadow-md backdrop:bg-off-black/40 sm:p-12"
    >
      <div className="flex items-start justify-between gap-6">
        <p className="text-caption tracking-[0.05em] text-graphite uppercase sm:text-body-sm">
          Case study {String(study.id).padStart(2, "0")} · {study.category} · {study.location}
        </p>
        <button
          type="button"
          popoverTarget={id}
          popoverTargetAction="hide"
          aria-label="Close"
          className="-mt-2 -mr-2 flex size-10 shrink-0 items-center justify-center rounded-pill border border-ash hover:bg-periwinkle/60"
        >
          <X className="size-4" strokeWidth={1.5} />
        </button>
      </div>

      <h3 id={`${id}-title`} className="mt-5 font-serif text-heading font-normal text-ink">
        {study.goal}
      </h3>

      <ul className="mt-6 flex flex-wrap gap-2">
        {study.metrics.map((metric) => (
          <li key={metric} className="rounded-pill border border-ash px-3 py-1.5 text-body-sm uppercase">
            {metric}
          </li>
        ))}
      </ul>

      <div className="mt-8 space-y-4 font-sans text-body-lg leading-[1.45] text-off-black/85">
        {study.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {study.note ? <p className="mt-6 text-body-sm text-smoke">{study.note}</p> : null}

      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild variant="dark">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Book a discovery call
          </a>
        </Button>
        <Button variant="ghost" popoverTarget={id} popoverTargetAction="hide">
          Close
        </Button>
      </div>
    </div>
  );
}

export function CaseStudies() {
  return (
    <section id="case-studies" aria-labelledby="case-studies-title" className="scroll-mt-[var(--header-h)] py-16 lg:py-[120px]">
      <Container>
        <SectionHeading
          id="case-studies-title"
          title="Results that speak for themselves"
          lead="See how we help founders turn ideas into credibility. We don't just build profiles, we build positioning that scales."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {CASE_STUDIES.map((study) => (
            <StudyCard key={study.id} study={study} />
          ))}
        </div>
      </Container>
      {CASE_STUDIES.map((study) => (
        <Story key={study.id} study={study} />
      ))}
    </section>
  );
}
