import { ArrowRight, X } from "lucide-react";

import { Button } from "@/components/monad/Button";
import { Container } from "@/components/monad/Container";
import { SectionHeading } from "@/components/monad/SectionHeading";
import { CASE_STUDIES, type CaseStudy } from "@/content/studies";
import { BOOKING_URL } from "@/lib/site";

/**
 * Case studies, on monad.com's "Why Teams Choose Monad" cards.
 *
 * Two columns of cards with a solid Off-Black hairline and a 16px radius, each
 * with a blurred pastel wash bleeding in from its top-left corner (the four
 * gradients are Monad's, read off their cards). A card shows where and for
 * whom, the goal as a serif title, the opening paragraph, and the results as
 * hairline pills. The whole card opens the full study, word for word, in an
 * overlay: the Popover API, so light dismiss and Escape come free.
 */

const WASHES = [
  "linear-gradient(rgba(167,252,205,0), rgb(160,181,235) 54%)",
  "radial-gradient(60% 60% at 20% 40%, rgb(167,252,205), rgb(226,193,97))",
  "linear-gradient(270deg, rgb(160,181,235) 16%, rgb(255,148,115) 93%)",
  "linear-gradient(rgb(226,193,97) 24%, rgb(243,122,10) 76%)",
];

function StudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const id = `story-${study.id}`;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card border border-off-black p-6 sm:p-10">
      <div
        aria-hidden="true"
        className="wash top-[-30%] left-[-20%] h-[75%] w-[55%] opacity-60 transition-opacity duration-500 group-hover:opacity-90"
        style={{ background: WASHES[index % WASHES.length], filter: "blur(60px)" }}
      />

      <div className="relative flex flex-1 flex-col">
        <p className="text-caption tracking-[0.05em] text-graphite uppercase sm:text-body-sm">
          {String(study.id).padStart(2, "0")} · {study.category}
        </p>
        <h3 className="mt-5 font-serif text-subheading font-normal text-ink sm:text-heading-sm">
          {study.goal}
        </h3>
        <p className="mt-2 text-body-sm text-smoke">{study.location}</p>
        <p className="mt-5 line-clamp-3 font-sans text-body leading-[1.35] text-off-black/80">
          {study.paragraphs[0]}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {study.metrics.map((metric) => (
            <li
              key={metric}
              className="rounded-pill border border-ash bg-parchment/70 px-3 py-1.5 text-caption tracking-[0.03em] text-off-black uppercase sm:text-body-sm"
            >
              {metric}
            </li>
          ))}
        </ul>

        <p className="mt-auto flex items-center gap-2 pt-8 text-body-sm tracking-[0.05em] text-off-black uppercase">
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
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16">
          {CASE_STUDIES.map((study, i) => (
            <StudyCard key={study.id} study={study} index={i} />
          ))}
        </div>
      </Container>
      {CASE_STUDIES.map((study) => (
        <Story key={study.id} study={study} />
      ))}
    </section>
  );
}
