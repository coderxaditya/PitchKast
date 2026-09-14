import { ArrowRight } from "lucide-react";

import { Button } from "@/components/steep/Button";
import { Container } from "@/components/steep/Container";
import { ARCS, COUNTRIES } from "@/components/reach/countries";
import { ARC_POINTS } from "@/components/reach/projected";
import WorldMap from "@/components/ui/world-map";
import { BOOKING_URL } from "@/lib/site";
import {
  ABOUT_CLOSING,
  ABOUT_INTRO,
  ABOUT_PRINCIPLES,
  ABOUT_STATS,
  ABOUT_SYSTEM,
} from "./content";

/**
 * About.
 *
 * Four bands, each borrowing a band from the lower half of steep.app, because
 * About has four different jobs and the reference already has a well-made
 * shape for each:
 *
 *  1. Who we are, laid out like the reference's customer-story band (a 44px
 *     serif statement, a black-and-white photograph beside it, and a bottom
 *     row of numbers where the reference lists logos), on Paper White,
 *     because the real customer-story band now sits directly above it.
 *  2. How we work and where, on the reference's dark band: the three stages
 *     as its closing column row, then the world map and the countries.
 *  3. What we hold to, on the reference's three-column feature row.
 *  4. The closing line, on the reference's final call to action.
 *
 * Every word is from `content.ts` and unchanged.
 */

/* The map's geometry is generated, so it can go stale. Comparing the counts
   turns a forgotten `node scripts/build-world-map.mjs` into a build failure
   naming the fix, rather than a map quietly missing a country. */
if (ARC_POINTS.length !== ARCS.length) {
  throw new Error(
    `World map is stale: ${ARC_POINTS.length} generated arcs vs ${ARCS.length} in countries.ts. Run: node scripts/build-world-map.mjs`,
  );
}

/* ── 1 · Who we are ─────────────────────────────────────────── */
function Intro() {
  return (
    /* Paper, not sky. This band took the reference's customer-story ground
       while there was no customer-story section; now there is one directly
       above it, and two sky bands in a row read as one long band. */
    <div className="bg-paper py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_380px] lg:gap-20">
          <div className="max-w-[640px]">
            <h2
              id="about-title"
              className="font-display text-heading font-normal text-balance text-ink"
            >
              {ABOUT_INTRO.titleLead}{" "}
              <em className="italic">{ABOUT_INTRO.titleAccent}</em>
            </h2>

            <p className="mt-4 text-body-lg font-normal text-ink/60">
              {ABOUT_INTRO.lead}
            </p>

            <div className="mt-6 space-y-4">
              {ABOUT_INTRO.body.map((paragraph) => (
                <p key={paragraph} className="text-body leading-[1.55] text-ink/60">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Button asChild size="md">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  Book a discovery call
                  <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
                </a>
              </Button>
              <a
                href="#team"
                className="py-1 text-[17px] font-[430] text-ink underline-offset-4 hover:underline"
              >
                Meet the team
              </a>
            </div>
          </div>

          {/* Black and white, as the reference sets its customer photograph —
              and it keeps a warm indoor shot from fighting the sky ground.
              Cropped low: the top third of the frame is ceiling. */}
          <img
            draggable={false}
            src="/gallery/gallery-05.jpeg"
            alt="Four members of the PitchKast team standing together"
            width={1200}
            height={1600}
            loading="lazy"
            decoding="async"
            className="select-none [-webkit-user-drag:none] aspect-[4/5] w-full max-w-[380px] rounded-[var(--radius-small)] object-cover object-[center_78%] grayscale"
          />
        </div>

        {/* Where the reference lines up its customers' logos, the numbers. */}
        <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-ink/10 pt-10 lg:mt-20 lg:grid-cols-4">
          {ABOUT_STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-heading leading-none text-ink tabular-nums">
                  {stat.value}
                </span>
                <span className="mt-2.5 block text-[15px] font-[430] text-ink/60">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </div>
  );
}

/* ── 2 · How we work, and where ─────────────────────────────── */
function SystemAndReach() {
  return (
    <div className="bg-ink py-24 text-paper lg:py-32">
      <Container>
        {/* The reference sets its dark-band heading in white at 80% and the
            subhead at 60%, rather than pure white: on near-black, full white at
            64px glares. */}
        <div className="max-w-[760px]">
          <h3 className="font-display text-heading-lg font-normal text-balance text-paper/80">
            {ABOUT_SYSTEM.title}
          </h3>
          <p className="mt-4 text-subheading font-normal text-paper/60">
            {ABOUT_SYSTEM.lead}
          </p>
        </div>

        <ol className="mt-14 grid gap-10 sm:grid-cols-3 lg:mt-20 lg:gap-12">
          {ABOUT_SYSTEM.stages.map((stage) => (
            <li key={stage.label} className="border-t border-paper/15 pt-6">
              <p className="text-[14px] text-paper/40 tabular-nums">{stage.index}</p>
              <p className="mt-2 text-body-lg font-medium text-paper">{stage.label}</p>
              <p className="mt-3 text-[16px] leading-[1.55] text-paper/60">{stage.body}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {stage.services.map((service) => (
                  <li
                    key={service}
                    className="rounded-full bg-paper/[0.07] px-3 py-1 text-[14px] text-paper/80"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        {/* ── Reach ── */}
        <div className="mt-20 lg:mt-24">
          <h3 className="max-w-[760px] font-display text-heading font-normal text-balance text-paper/80">
            Founders in {COUNTRIES.length} countries chose us.{" "}
            <em className="italic">Yours could be next.</em>
          </h3>

          {/* A 2:1 world map inside a phone's width renders about 327x164,
              where the arcs and markers are too small to read. Below sm it
              keeps a legible minimum width and scrolls sideways inside its own
              box; the page itself never scrolls horizontally. */}
          <div className="mt-10 overflow-x-auto sm:overflow-x-visible lg:mt-14">
            <div className="min-w-[32rem] sm:min-w-0">
              {/* Peach arcs: the system's one warm accent, and on near-black
                  it reads as light rather than as a colour. */}
              <WorldMap lineColor="#fbe1d1" />
            </div>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-12 lg:grid-cols-4 xl:grid-cols-6">
            {COUNTRIES.map((country) => (
              <li
                key={country.code}
                className="rounded-[var(--radius-small)] bg-paper/[0.06] p-5 transition-colors duration-200 hover:bg-paper/[0.1]"
              >
                <img
                  draggable={false}
                  src={`/flags/${country.code.toLowerCase()}.png`}
                  alt={country.name}
                  width={120}
                  height={80}
                  loading="lazy"
                  decoding="async"
                  /* A fixed box: flags run from 1:1 to 2:1, and letting each
                     keep its own ratio left the row visibly ragged. */
                  className="select-none [-webkit-user-drag:none] h-6 w-9 rounded-[3px] object-cover"
                />
                <p className="mt-3.5 text-[16px] font-[450] text-paper">{country.short}</p>
                <p className="mt-1 text-[14px] text-paper/60">
                  {country.clients} {country.clients === 1 ? "client" : "clients"}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}

/* ── 3 · What we hold to ────────────────────────────────────── */
function Principles() {
  return (
    <div className="bg-paper py-24 lg:py-32">
      <Container>
        <h3 className="max-w-[760px] font-display text-heading-lg font-normal text-balance text-ink">
          What makes PitchKast different
        </h3>

        {/* The reference's closing feature row: a 20px title, an 18px body at
            60%, columns about 40px apart. Six principles make it two rows. */}
        <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {ABOUT_PRINCIPLES.map((principle) => (
            <li key={principle.index} className="border-t border-hairline pt-6">
              <p className="text-[14px] text-ash tabular-nums">{principle.index}</p>
              <p className="mt-2 text-body-lg font-medium text-ink">{principle.title}</p>
              <p className="mt-2.5 text-[18px] leading-[1.45] text-ink/60">{principle.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

/* ── 4 · The closing line ───────────────────────────────────── */
function Closing() {
  return (
    <div className="bg-fog py-24 lg:py-32">
      <Container>
        <p className="max-w-[820px] font-display text-heading-lg font-normal text-balance text-ink">
          {ABOUT_CLOSING.loud}
        </p>

        {/* The reference's final pairing: the filled pill and a text link
            with its arrow, on one baseline. */}
        <div className="mt-9 flex flex-wrap items-center gap-6">
          <Button asChild size="md">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book a discovery call
            </a>
          </Button>
          <a
            href="#case-studies"
            className="inline-flex items-center gap-1.5 py-1 text-[17px] font-[430] text-ink underline-offset-4 hover:underline"
          >
            View case studies
            <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
      </Container>
    </div>
  );
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-24">
      <Intro />
      <SystemAndReach />
      <Principles />
      <Closing />
    </section>
  );
}
