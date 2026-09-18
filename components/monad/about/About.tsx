import { ArrowRight, FolderKanban, Globe2, Sparkles, TrendingUp } from "lucide-react";

import { Container } from "@/components/monad/Container";
import { CountUp } from "@/components/monad/CountUp";
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
 * The intro is a two-column spread: a Lake pill eyebrow, the serif title with
 * "build to raise" in a Lake-to-Coral italic, and the body set off by a
 * gradient rule. The figures are four solid pastel cards, one per Monad
 * accent (Coral, Sky, Gold, Mint), each with a small icon, lifting on hover.
 * The stages read as a sequence: each card carries its own tint, a colour bar
 * along its top, a solid numbered badge and matching chips, with an arrow
 * between one stage and the next on wider screens. The principles sit on
 * their own Sky band (see `Principles`).
 */
const STAT_STYLE = [
  { bg: "bg-coral", Icon: FolderKanban },
  { bg: "bg-sky", Icon: TrendingUp },
  { bg: "bg-gold", Icon: Globe2 },
  { bg: "bg-mint", Icon: Sparkles },
];

/* Build, Grow, Raise: tint, top bar, badge and chip colours. */
const STAGE_STYLE = [
  { tint: "bg-[#fff1ea]", bar: "bg-coral", badge: "bg-coral text-ink", chip: "border-coral/50 bg-coral/15" },
  { tint: "bg-[#ecfdf3]", bar: "bg-mint", badge: "bg-mint text-ink", chip: "border-[#5bd99a]/50 bg-mint/30" },
  { tint: "bg-[#fbf5e0]", bar: "bg-gold", badge: "bg-gold text-ink", chip: "border-[#d9bf5c]/60 bg-gold/35" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-[var(--header-h)] pt-16 lg:pt-[120px]">
      <Container>
        {/* ── Intro ── */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-pill bg-lake/10 px-4 py-1.5 text-body-sm tracking-[0.08em] text-lake uppercase">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-lake" />
              {ABOUT_INTRO.eyebrow}
            </p>
            <h2 id="about-title" className="mt-5 font-serif text-heading-lg font-normal text-ink">
              {ABOUT_INTRO.titleLead}{" "}
              <em className="bg-gradient-to-r from-lake to-coral bg-clip-text pr-1 text-transparent italic">
                {ABOUT_INTRO.titleAccent}
              </em>
            </h2>
            <p className="mt-6 font-serif text-subheading text-graphite">{ABOUT_INTRO.lead}</p>
          </div>
          <div data-reveal className="relative space-y-5 pl-6 text-body-lg text-off-black/80 lg:mt-10">
            <span aria-hidden="true" className="absolute inset-y-1 left-0 w-[3px] rounded-full bg-gradient-to-b from-lake via-sky to-coral" />
            {ABOUT_INTRO.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        {/* ── Figures ── */}
        <dl className="mt-16 grid grid-cols-2 gap-3 lg:mt-24 lg:grid-cols-4">
          {ABOUT_STATS.map((stat, i) => {
            const { bg, Icon } = STAT_STYLE[i % STAT_STYLE.length];
            return (
              <div
                key={stat.label}
                data-reveal
                data-spotlight
                className={`group flex flex-col-reverse justify-end rounded-card p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-8 ${bg}`}
              >
                <dt className="mt-2 min-h-[2.7em] text-caption tracking-[0.03em] text-ink/75 uppercase sm:text-body-sm">
                  {stat.label}
                </dt>
                <dd className="font-serif text-heading-lg text-ink">
                  <CountUp value={stat.value} />
                </dd>
                <span
                  aria-hidden="true"
                  className="mb-6 flex size-10 items-center justify-center rounded-pill bg-white/55 text-ink transition-transform duration-300 group-hover:rotate-[-8deg] sm:mb-10"
                >
                  <Icon className="size-[18px]" strokeWidth={1.6} />
                </span>
              </div>
            );
          })}
        </dl>

        {/* ── Stages ── */}
        <div className="mt-24 lg:mt-[120px]">
          <SectionHeading id="about-system-title" title={ABOUT_SYSTEM.title} lead={ABOUT_SYSTEM.lead} />
          <ol className="mt-12 grid gap-3 md:grid-cols-3 md:gap-6">
            {ABOUT_SYSTEM.stages.map((stage, i) => {
              const st = STAGE_STYLE[i % STAGE_STYLE.length];
              const last = i === ABOUT_SYSTEM.stages.length - 1;
              return (
                <li key={stage.label} data-reveal className="relative">
                  <div
                    data-spotlight
                    className={`relative h-full overflow-hidden rounded-card border border-off-black/10 p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-10 ${st.tint}`}
                  >
                    <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1.5 ${st.bar}`} />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-2 -bottom-10 font-serif text-[160px] leading-none text-ink/[0.05] select-none"
                    >
                      {stage.index}
                    </span>
                    <div className="relative">
                      <p className={`inline-flex size-11 items-center justify-center rounded-pill text-body-sm font-medium ${st.badge}`}>
                        {stage.index}
                      </p>
                      <h3 className="mt-6 font-serif text-heading font-normal text-ink">{stage.label}</h3>
                      <p className="mt-4 font-sans text-body leading-[1.45] text-off-black/85">{stage.body}</p>
                      <ul className="mt-8 flex flex-wrap gap-2">
                        {stage.services.map((service) => (
                          <li
                            key={service}
                            className={`rounded-pill border px-3 py-1.5 text-caption tracking-[0.05em] text-ink uppercase sm:text-body-sm ${st.chip}`}
                          >
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {!last ? (
                    <span
                      aria-hidden="true"
                      className="absolute top-1/2 -right-[22px] z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-pill border border-off-black/10 bg-parchment text-ink shadow-sm md:flex"
                    >
                      <ArrowRight className="size-4" strokeWidth={1.6} />
                    </span>
                  ) : null}
                </li>
              );
            })}
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
                data-reveal
                data-spotlight
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
