import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/flat/Button";
import { Container } from "@/components/flat/Container";
import { BOOKING_URL } from "@/lib/site";

/**
 * The stats that used to sit in two glass cards beside the headline.
 *
 * They are inline under the buttons now, divided by hairlines. The band that
 * would otherwise hold them further down the page belongs to the client logo
 * strip, and a hero that ends on proof reads stronger than one that ends on a
 * button.
 *
 * The count-up is gone with the rest of the motion layer. A number that
 * animates on arrival is a number nobody on a slow connection ever sees
 * finish, and the page is deliberately static now.
 */
const STATS = [
  /* Amber and emerald rather than one colour for both: the system asks for
     stat figures to carry different accents, and at this size the 3:1 large
     text threshold is the bar — amber-300 measures 3.58:1 on this ground and
     emerald-300 3.39:1. */
  { value: "25+", label: "Global Clients", tone: "text-amber-300" },
  { value: "90+", label: "Projects delivered", tone: "text-emerald-300" },
];

/**
 * The landing block.
 *
 * Full-bleed colour, centred, and entirely static — no scrub, no pinning, no
 * reveal. Hierarchy is carried by scale and weight alone, which is the whole
 * argument of the system.
 *
 * The ground is Blue 600, not the Blue 500 the palette nominates. That is a
 * contrast decision and it is measured: white on Blue 500 is 3.68:1, which
 * fails AA for anything at body size, and the accent word drops to 2.55:1.
 * One step down the ramp puts white at 5.17:1 and the accent at 3.58:1, so
 * both clear their thresholds. Blue 500 remains the action colour everywhere
 * it belongs — buttons on light grounds — and this is the only place that
 * needs the deeper value.
 */
export function Hero() {
  return (
    <section
      id="home"
      aria-label="PitchKast"
      /* `on-dark` flips the global focus ring to white; a blue ring on a blue
         block is invisible. */
      className="on-dark relative isolate overflow-hidden bg-action-strong"
    >
      {/* ── Decoration ──────────────────────────────────────────
          Flat poster geometry: solid shapes at low opacity, no gradient and
          no blur. Purely ornamental, so it is hidden from assistive tech and
          takes no pointer events. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <span className="absolute -top-40 -right-32 size-[34rem] rounded-full bg-white/10" />
        <span className="absolute top-1/3 -left-40 size-[26rem] rotate-45 rounded-flat bg-white/5" />
        <span className="absolute -bottom-32 right-1/4 size-72 rounded-full bg-amber-400/15" />
        <span className="absolute bottom-10 left-[12%] hidden size-40 rounded-full bg-emerald-400/15 lg:block" />
      </div>

      <Container className="py-16 text-center sm:py-24 lg:py-36">
        {/* ── Eyebrow ── */}
        <p className="inline-flex rounded-full bg-amber-400 px-4 py-2 text-[0.6875rem] font-bold tracking-[0.12em] text-ink uppercase sm:px-5 sm:text-[0.8125rem]">
          We Don&rsquo;t Chase Growth. We Create It.
        </p>

        {/* The page's one h1. */}
        <h1 className="mx-auto mt-7 max-w-[20ch] sm:mt-8 text-display-xl leading-[0.95] font-extrabold tracking-[-0.03em] text-balance text-white">
          We Build Brands That{" "}
          {/* One coloured word, on the verb the promise turns on. */}
          <span className="text-amber-300">Move</span> Businesses Forward.
        </h1>

        {/* ── Actions ── */}
        <div className="mt-9 flex flex-wrap sm:mt-11 items-center justify-center gap-4">
          <Button asChild variant="onColor" size="md">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book a Discovery Call
              <ArrowRight className="size-5" strokeWidth={2.5} />
            </a>
          </Button>

          <Button asChild variant="onColorOutline" size="md">
            <a href="#case-studies">
              View Case Studies
              <ArrowUpRight className="size-5" strokeWidth={2.5} />
            </a>
          </Button>
        </div>

        {/* ── Proof ──────────────────────────────────────────────
            `divide-x` rather than a border on each item, so the rule falls
            between them and never on the outside edge. It is dropped below
            sm, where the pair stacks. */}
        <dl className="mx-auto mt-12 flex max-w-xl sm:mt-16 flex-col items-stretch gap-8 sm:flex-row sm:justify-center sm:gap-0 sm:divide-x sm:divide-white/25">
          {STATS.map((stat) => (
            <div key={stat.label} className="sm:px-12">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span
                  className={`block text-display-md leading-none font-extrabold tracking-[-0.02em] tabular-nums ${stat.tone}`}
                >
                  {stat.value}
                </span>
                <span className="mt-2 block text-[0.9375rem] font-medium text-white">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
