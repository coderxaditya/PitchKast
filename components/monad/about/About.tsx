import { Container } from "@/components/monad/Container";
import { SectionHeading } from "@/components/monad/SectionHeading";
import {
  ABOUT_INTRO,
  ABOUT_PRINCIPLES,
  ABOUT_STATS,
  ABOUT_SYSTEM,
} from "@/content/about";

/**
 * About: who PitchKast is, the numbers, the three stages, and the principles.
 *
 * Set in the system's editorial register rather than as marketing blocks. The
 * intro is a two-column spread, serif title against mono body. The figures sit
 * in a hairline table, serif numerals over mono labels. The stages are three
 * hairline cards with blurred washes, like Monad's feature cards. The
 * principles run as a ruled list, a number in mono, a serif title, a sans
 * paragraph, the way a journal sets a numbered essay.
 */
const STAGE_WASHES = [
  "linear-gradient(rgba(255,148,115,0.8), rgba(160,181,235,0.8))",
  "linear-gradient(rgb(160,181,235), rgb(167,252,205))",
  "linear-gradient(270deg, rgba(226,193,97,0.8), rgba(243,122,10,0.7))",
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-[var(--header-h)] py-16 lg:py-[120px]">
      <Container>
        {/* ── Intro ── */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <p className="text-body-sm tracking-[0.05em] text-smoke uppercase">{ABOUT_INTRO.eyebrow}</p>
            <h2 id="about-title" className="mt-4 font-serif text-heading-lg font-normal text-ink">
              {ABOUT_INTRO.titleLead} {ABOUT_INTRO.titleAccent}
            </h2>
            <p className="mt-6 font-serif text-subheading text-graphite">{ABOUT_INTRO.lead}</p>
          </div>
          <div className="space-y-5 text-body-lg text-off-black/80 lg:pt-10">
            {ABOUT_INTRO.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        {/* ── Figures ── */}
        <dl className="mt-16 grid grid-cols-2 border-t border-l border-ash lg:mt-24 lg:grid-cols-4">
          {ABOUT_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse border-r border-b border-ash p-6 sm:p-10">
              <dt className="mt-3 min-h-[2.7em] text-body-sm tracking-[0.03em] text-graphite uppercase">{stat.label}</dt>
              <dd className="font-serif text-heading-lg text-ink">{stat.value}</dd>
            </div>
          ))}
        </dl>

        {/* ── Stages ── */}
        <div className="mt-24 lg:mt-[120px]">
          <SectionHeading id="about-system-title" title={ABOUT_SYSTEM.title} lead={ABOUT_SYSTEM.lead} />
          <ol className="mt-12 grid gap-3 md:grid-cols-3">
            {ABOUT_SYSTEM.stages.map((stage, i) => (
              <li key={stage.label} className="relative overflow-hidden rounded-card border border-off-black/20 p-6 sm:p-10">
                <div
                  aria-hidden="true"
                  className="wash right-[-25%] bottom-[-35%] h-[70%] w-[70%] opacity-70"
                  style={{ background: STAGE_WASHES[i] }}
                />
                <div className="relative">
                  <p className="text-body-sm text-smoke">{stage.index}</p>
                  <h3 className="mt-6 font-serif text-heading font-normal text-ink">{stage.label}</h3>
                  <p className="mt-4 font-sans text-body leading-[1.4] text-off-black/80">{stage.body}</p>
                  <ul className="mt-8 flex flex-wrap gap-2">
                    {stage.services.map((service) => (
                      <li key={service} className="rounded-pill border border-ash bg-parchment/80 px-3 py-1.5 text-caption tracking-[0.05em] uppercase sm:text-body-sm">
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* ── Principles ── */}
        <div className="mt-24 lg:mt-[120px]">
          <SectionHeading id="about-principles-title" title="How we work with founders" />
          <ol className="mt-10 grid border-t border-ash md:grid-cols-2 lg:grid-cols-3">
            {ABOUT_PRINCIPLES.map((principle) => (
              <li key={principle.title} className="border-b border-ash py-8 md:pr-10 lg:py-10">
                <p className="text-body-sm text-smoke">{principle.index}</p>
                <h3 className="mt-4 font-serif text-subheading font-normal text-ink">{principle.title}</h3>
                <p className="mt-3 font-sans text-body leading-[1.45] text-off-black/80">{principle.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
