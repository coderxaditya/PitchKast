import { ArrowUpRight } from "lucide-react";

import { BOOKING_URL, NAV_LINKS } from "@/lib/site";

/**
 * The fragments.
 *
 * Six product surfaces that start scattered around the headline and end up
 * inside the dashboard. They are one set of components used in both states —
 * "assembled" is not a second copy of the layout, it is these same elements
 * with their displacement animated away — so the two can never drift apart.
 *
 * Every figure on them is real: the stats come from the About section's
 * numbers, the logos are the client marks the site already ships, the service
 * names are the five offerings, and the sidebar is the site's own navigation.
 * Nothing here invents a metric to fill a chart, which is why there are no
 * line graphs — the system's "gestural chart" would have had to plot numbers
 * this company has not published.
 *
 * ⚠️ `public/portal-images/` is still empty. Once the real portal screenshots
 * land, any card below can be replaced by an <img> of one without touching the
 * assembly: the animation reads only the wrapper's class and its three custom
 * properties.
 */

/** Shared surface for a floating artifact — white, 20px, the one shadow. */
const CARD =
  "rounded-[var(--radius-elevated)] bg-paper shadow-artifact";

/** Tertiary label: typographic, never a badge. */
const LABEL = "text-[14px] font-[430] text-ash";

/* ── Track record ──────────────────────────────────────────────
   The Region-table equivalent: a label/value list with hairline
   rows and no chrome. Figures are the About section's. */
const RECORD = [
  { label: "Projects delivered", value: "90+" },
  { label: "Global clients", value: "25+" },
  { label: "Raised by founders", value: "$40M+" },
  { label: "Continents served", value: "5" },
] as const;

export function TrackRecordCard() {
  return (
    <div className={`${CARD} p-5`}>
      <p className={LABEL}>Track record</p>
      <dl className="mt-3">
        {RECORD.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-4 border-b border-hairline py-2.5 last:border-b-0 last:pb-0"
          >
            <dt className="text-[15px] font-[430] text-slate">{row.label}</dt>
            <dd className="text-[15px] font-[480] tabular-nums text-ink">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ── Clients ───────────────────────────────────────────────────
   Six of the seventeen marks the site already carries. Height is
   fixed and the intrinsic size is declared, so the card cannot
   reflow as the images decode. */
const LOGOS = [
  { src: "/logos/logo-01.png", width: 1008 },
  { src: "/logos/logo-02.png", width: 809 },
  { src: "/logos/logo-03.png", width: 735 },
  { src: "/logos/logo-04.png", width: 224 },
  { src: "/logos/logo-05.png", width: 697 },
  { src: "/logos/logo-06.png", width: 380 },
] as const;

export function ClientsCard() {
  return (
    <div className={`${CARD} p-5`}>
      <div className="flex items-baseline justify-between gap-4">
        <p className={LABEL}>Trusted by</p>
        <p className="text-[14px] font-[430] text-slate">25+ companies</p>
      </div>
      <ul className="mt-4 grid grid-cols-3 items-center gap-x-5 gap-y-4">
        {LOGOS.map((logo) => (
          <li key={logo.src}>
            <img
              src={logo.src}
              alt=""
              width={logo.width}
              height={300}
              /* Decorative here — the count beside the label carries the
                 meaning, and six alt texts of company names would be read
                 aloud as a list with no context. */
              aria-hidden="true"
              className="h-5 w-full object-contain opacity-70 grayscale"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── The accent ────────────────────────────────────────────────
   The single peach surface on the page. Sienna is its ink and
   appears nowhere else, and it sits on paper — the system forbids
   it on any other ground. */
export function RaisedCard() {
  return (
    <div className="rounded-[var(--radius-card)] bg-peach p-5 text-sienna">
      <p className="text-[14px] font-[430] opacity-70">Raised by founders we&rsquo;ve backed</p>
      <p className="mt-2 font-display text-[44px] leading-none tracking-[-0.015em] tabular-nums">
        $40M+
      </p>
      <p className="mt-3 text-[15px] font-[430] leading-snug">
        Decks, models and investor strategy — from first conversation to close.
      </p>
    </div>
  );
}

/* ── What we do ────────────────────────────────────────────────
   The five offerings, in the order the Services section lists
   them, shortened to the label each is known by. */
const DISCIPLINES = [
  "Founder & company branding",
  "Product & technology creation",
  "LinkedIn lead generation",
  "Sales & market expansion",
  "Fundraising & growth decks",
] as const;

export function DisciplinesCard() {
  return (
    <div className={`${CARD} p-5`}>
      <p className={LABEL}>What we do</p>
      <ul className="mt-3 space-y-2.5">
        {DISCIPLINES.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-[15px] font-[430] leading-snug text-ink"
          >
            <span
              aria-hidden="true"
              className="mt-[7px] size-1.5 shrink-0 rounded-full bg-smoke"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── The team ──────────────────────────────────────────────────
   Monograms rather than photographs: at this size a face is
   unreadable, and the initials carry the point — a named team
   rather than an account manager. */
const MONOGRAMS = [
  { initials: "SG", tint: "bg-peach text-sienna" },
  { initials: "MG", tint: "bg-mist text-ink" },
  { initials: "AT", tint: "bg-mist text-ink" },
  { initials: "SB", tint: "bg-mist text-ink" },
] as const;

export function TeamCard() {
  return (
    <div className={`${CARD} p-5`}>
      <p className={LABEL}>One accountable team</p>
      <ul className="mt-4 flex -space-x-2">
        {MONOGRAMS.map((person) => (
          <li
            key={person.initials}
            aria-hidden="true"
            className={`flex size-10 items-center justify-center rounded-full border-2 border-paper text-[13px] font-[500] ${person.tint}`}
          >
            {person.initials}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[15px] font-[430] leading-snug text-slate">
        Named people on every engagement. No black boxes, no handoffs.
      </p>
    </div>
  );
}

/* ── The composer ──────────────────────────────────────────────
   Steep's "Ask anything…" field, turned into the one thing this
   site actually wants a visitor to do. It is a link wearing an
   input's clothes, not a form: there is no endpoint behind it and
   a real text field that discarded what you typed would be worse
   than none. */
export function ComposerCard() {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${CARD} group flex items-center gap-3 p-3 pl-5 transition-all duration-200 hover:scale-[1.02]`}
    >
      <span className="min-w-0 flex-1 truncate text-[16px] font-[430] text-smoke">
        Tell us what you&rsquo;re building…
      </span>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink text-paper">
        <ArrowUpRight className="size-5" strokeWidth={1.75} aria-hidden="true" />
      </span>
    </a>
  );
}

/* ── Shell chrome ──────────────────────────────────────────────
   The sidebar is the site's own navigation, read from the same
   list the header uses. It is what turns six floating cards into
   something that reads as one product surface. */
export function ShellSidebar() {
  return (
    <div className="flex h-full flex-col gap-5 p-4">
      {/* Window dots. Purely a cue that this is a product surface rather than
          a page section — three circles do more for that reading than any
          amount of chrome. */}
      <div aria-hidden="true" className="flex gap-1.5 px-1 pt-0.5">
        <span className="size-2.5 rounded-full bg-mist" />
        <span className="size-2.5 rounded-full bg-mist" />
        <span className="size-2.5 rounded-full bg-mist" />
      </div>

      <div className="flex items-center gap-2">
        <img
          src="/brand/landing-mark-ink-256.png"
          alt=""
          width={979}
          height={825}
          aria-hidden="true"
          className="h-6 w-auto"
        />
        <span className="text-[15px] font-[500] tracking-[-0.009em] text-ink">
          PitchKast
        </span>
      </div>

      <ul className="space-y-0.5">
        {NAV_LINKS.map((link, i) => (
          <li key={link.href}>
            <span
              className={`block rounded-[10px] px-3 py-2 text-[14px] font-[430] ${
                /* The first item reads as the current one — a sidebar with
                   nothing selected looks unrendered rather than quiet. */
                i === 0 ? "bg-mist text-ink" : "text-slate"
              }`}
            >
              {link.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
