import { ArrowUpRight, Check } from "lucide-react";

import { Button } from "@/components/flat/Button";
import { Container } from "@/components/flat/Container";
import { Reach } from "@/components/reach/Reach";
import { BOOKING_URL } from "@/lib/site";
import {
  ABOUT_CLOSING,
  ABOUT_INTRO,
  ABOUT_PRINCIPLES,
  ABOUT_STATS,
  ABOUT_SYSTEM,
} from "./content";

/** Stat numerals, each on its own accent. Whole class strings, never built. */
const STAT_TONES = [
  "text-action-strong",
  "text-emerald-600",
  "text-amber-600",
  "text-action-strong",
];

/* ── 01 · Who we are ────────────────────────────────────────── */
function Intro() {
  return (
    <div className="bg-surface py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-eyebrow font-bold tracking-[0.12em] text-action-strong uppercase">
              {ABOUT_INTRO.eyebrow}
            </p>
            <h2
              id="about-title"
              className="mt-5 text-display-lg leading-[0.95] font-extrabold tracking-[-0.03em] text-balance text-ink"
            >
              {ABOUT_INTRO.titleLead}{" "}
              <span className="text-action-strong">
                {ABOUT_INTRO.titleAccent}
              </span>
              .
            </h2>
          </div>

          <div className="mt-8 lg:col-span-7 lg:mt-0">
            <p className="text-xl leading-relaxed font-semibold text-pretty text-ink">
              {ABOUT_INTRO.lead}
            </p>
            {ABOUT_INTRO.body.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-5 leading-relaxed text-pretty text-ink-soft"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

/* ── 02 · Track record ──────────────────────────────────────── */
function Stats() {
  return (
    <div className="bg-surface pb-20 sm:pb-24 lg:pb-28">
      <Container>
        <dl className="grid grid-cols-2 gap-y-12 border-t border-hairline pt-14 lg:grid-cols-4">
          {ABOUT_STATS.map((stat, i) => (
            <div key={stat.label}>
              <dd
                className={`text-display-md leading-none font-extrabold tracking-[-0.03em] tabular-nums ${STAT_TONES[i]}`}
              >
                {stat.value}
              </dd>
              <dt className="mt-3 max-w-[18ch] leading-snug font-medium text-ink-soft">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </Container>
    </div>
  );
}

/* ── 03 · The growth system ─────────────────────────────────── */
function System() {
  return (
    /* The dark band. One per page, and this is it — the section that explains
       how the company is put together is the one worth interrupting for. */
    <div className="on-dark bg-ink py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-display-md leading-[1.0] font-extrabold tracking-[-0.03em] text-balance text-white">
            {ABOUT_SYSTEM.title}
          </h3>
          <p className="mt-5 text-lg leading-relaxed text-pretty text-white/70">
            {ABOUT_SYSTEM.lead}
          </p>
        </div>

        {/* All three open at once. The old version was an accordion where two
            of the three were always hidden, which asked the reader to click to
            find out what the company does. */}
        <ol className="mt-14 grid gap-10 sm:mt-16 lg:grid-cols-3 lg:gap-12">
          {ABOUT_SYSTEM.stages.map((stage) => (
            <li key={stage.label} className="text-center">
              <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-action text-xl font-extrabold text-white">
                {stage.index}
              </span>
              <h4 className="mt-6 text-2xl font-extrabold tracking-[-0.02em] text-white">
                {stage.label}
              </h4>
              <p className="mt-4 leading-relaxed text-pretty text-white/70">
                {stage.body}
              </p>
              <ul className="mt-6 flex flex-wrap justify-center gap-2">
                {stage.services.map((service) => (
                  <li
                    key={service}
                    className="rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-white"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Container>
    </div>
  );
}

/* ── 04 · What we stand for ─────────────────────────────────── */
function Principles() {
  return (
    <div className="bg-canvas py-20 sm:py-24 lg:py-28">
      <Container>
        <h3 className="mx-auto max-w-3xl text-center text-display-md leading-[1.0] font-extrabold tracking-[-0.03em] text-balance text-ink">
          What makes PitchKast different
        </h3>

        <div className="mt-14 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {ABOUT_PRINCIPLES.map((principle) => (
            <article
              key={principle.index}
              className="group h-full rounded-flat bg-surface p-7 transition-transform duration-200 hover:scale-[1.02] sm:p-8"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-canvas text-action-strong transition-transform duration-200 group-hover:scale-110">
                <Check className="size-5" strokeWidth={3} aria-hidden="true" />
              </span>
              <h4 className="mt-6 text-display-sm leading-[1.1] font-extrabold tracking-[-0.02em] text-balance text-ink">
                {principle.title}
              </h4>
              <p className="mt-3 leading-relaxed text-pretty text-ink-soft">
                {principle.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </div>
  );
}

/* ── 05 · The closing statement ─────────────────────────────── */
function Closing() {
  return (
    /* Amber, full bleed, one line and nothing else. Ink on amber rather than
       white — white on Amber 500 measures 2.15:1 and is unreadable. */
    <div className="bg-highlight py-20 sm:py-24 lg:py-28">
      <Container>
        <p className="mx-auto max-w-4xl text-center text-display-lg leading-[0.95] font-extrabold tracking-[-0.03em] text-balance text-ink">
          {ABOUT_CLOSING.loud}
        </p>

        {/* Ink, not blue or white. Blue on amber clashes and measures badly,
            and a white button on this ground reads as a second background
            rather than as a control. */}
        <div className="mt-10 flex justify-center">
          <Button asChild variant="ink" size="lg">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book a Discovery Call
              <ArrowUpRight className="size-5" strokeWidth={2.5} />
            </a>
          </Button>
        </div>
      </Container>
    </div>
  );
}

/**
 * About.
 *
 * Five bands in normal flow, each on its own ground: grey for the opening and
 * the numbers, dark for the system, white for the principles, amber for the
 * payoff. No sticky rail, no scroll reveals, no accordion — the colour changes
 * do the chaptering that the rail used to do, and everything is readable the
 * moment it is on screen.
 */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20">
      <Intro />
      <Stats />
      <System />
      <Principles />
      {/* Reach closes the section's argument: who, and where. */}
      <Reach />
      <Closing />
    </section>
  );
}
