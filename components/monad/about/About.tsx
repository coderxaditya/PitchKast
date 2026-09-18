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
 * in a hairline table, serif numerals over mono labels, each cell with a
 * blurred wash in its corner. The stages are three
 * hairline cards with blurred washes, like Monad's feature cards. The
 * principles sit on their own Lake Blue band (see `Principles`).
 */
/* Monad's four card gradients: coral into sky, sky into mint, gold into
   crimson, and mint into gold. The stages take the first three; the figures
   cycle through all four. */
const WASHES = [
  "linear-gradient(rgba(255,148,115,0.8), rgba(160,181,235,0.8))",
  "linear-gradient(rgb(160,181,235), rgb(167,252,205))",
  "linear-gradient(270deg, rgba(226,193,97,0.8), rgba(243,122,10,0.7))",
  "radial-gradient(60% 60% at 30% 40%, rgb(167,252,205), rgb(226,193,97))",
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-[var(--header-h)] pt-16 lg:pt-[120px]">
      <Container>
        {/* ── Intro ── */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <p className="text-label tracking-[0.05em] text-off-black uppercase sm:text-subheading">{ABOUT_INTRO.eyebrow}</p>
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
          {ABOUT_STATS.map((stat, i) => (
            <div key={stat.label} className="relative flex flex-col-reverse overflow-hidden border-r border-b border-ash p-6 sm:p-10">
              <div
                aria-hidden="true"
                className="wash right-[-25%] bottom-[-40%] h-[95%] w-[80%] opacity-85"
                style={{ background: WASHES[i % WASHES.length] }}
              />
              <dt className="relative mt-3 min-h-[2.7em] text-body-sm tracking-[0.03em] text-graphite uppercase">{stat.label}</dt>
              <dd className="relative font-serif text-heading-lg text-ink">{stat.value}</dd>
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
                  style={{ background: WASHES[i] }}
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

      </Container>

      {/* ── Principles ── */}
      <Principles />
    </section>
  );
}

/**
 * The principles, on a Sky Blue band inset like the reach band, a shade
 * deeper than its Periwinkle, so the section reads as a pause rather than
 * another ruled list. Mint and coral washes drift in from the corners, and
 * the six principles sit on near-solid parchment cards, so the text reads
 * against the colour: a Lake mono number, a serif title in ink, a sans
 * paragraph in Off-Black. On hover a card brightens and
 * a Lake rule draws across its top.
 */
function Principles() {
  return (
    <div className="mt-24 px-1 pb-6 lg:mt-[120px] lg:pb-10">
      <div className="relative overflow-hidden rounded-band bg-sky">
        <div
          aria-hidden="true"
          className="wash top-[-20%] left-[-10%] h-[60%] w-[45%] opacity-70"
          style={{ background: "radial-gradient(rgb(167,252,205), rgba(160,181,235,0))", filter: "blur(90px)" }}
        />
        <div
          aria-hidden="true"
          className="wash right-[-12%] bottom-[-25%] h-[70%] w-[45%] opacity-45"
          style={{ background: "linear-gradient(270deg, rgba(160,181,235,0.6) 16%, rgba(255,148,115,0.9) 93%)", filter: "blur(90px)" }}
        />

        <Container className="relative py-16 lg:py-[120px]">
          <p className="text-label tracking-[0.05em] text-off-black uppercase sm:text-subheading">Our principles</p>
          <h2 id="about-principles-title" className="mt-4 font-serif text-heading-lg font-normal text-ink">
            How we work with founders
          </h2>

          <ol className="mt-10 grid gap-3 sm:gap-4 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {ABOUT_PRINCIPLES.map((principle) => (
              <li
                key={principle.title}
                className="group relative overflow-hidden rounded-card border border-parchment bg-parchment/90 p-6 shadow-[0_8px_30px_rgba(43,89,209,0.10)] transition-colors duration-300 hover:bg-parchment sm:p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-lake transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
                <p className="flex size-10 items-center justify-center rounded-pill border border-lake/50 bg-periwinkle/50 text-body-sm text-lake">
                  {principle.index}
                </p>
                <h3 className="mt-6 font-serif text-subheading font-normal text-ink">{principle.title}</h3>
                <p className="mt-3 font-sans text-body leading-[1.5] text-off-black">{principle.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </div>
    </div>
  );
}
