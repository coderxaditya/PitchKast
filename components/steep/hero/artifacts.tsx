import { ArrowUpRight } from "lucide-react";

import { BOOKING_URL } from "@/lib/site";

/**
 * The fragments.
 *
 * Five of the seven are real crops of the PitchKast client portal — the
 * approval queue, the content calendar, the activity feed, the schedule and
 * the counters across the top. They are cut at build time by
 * `scripts/build-portal-crops.mjs`; the rectangles live there.
 *
 * That choice is the whole reason there are no charts here. The system asks
 * for "floating product artifacts", and the honest way to show a product is
 * to show the product — a hand-drawn analytics card would have meant
 * inventing numbers this company has not published.
 *
 * The remaining two are ours: the single peach surface the system permits per
 * page, and the composer, which is the one thing on the page a visitor is
 * actually being asked to do.
 */

/* ── Portal crops ──────────────────────────────────────────────
   Every one is a white artifact card with the screenshot inset at
   the system's 12px image radius. Intrinsic dimensions are
   declared so nothing reflows as the images decode — a grid that
   settles late is exactly what made the previous build's gallery
   land lopsided. */

type Crop = {
  /** File in `public/portal/`, without the extension. */
  name: string;
  width: number;
  height: number;
  /** What the fragment shows. Read aloud, so it says the meaning. */
  alt: string;
};

const CROPS = {
  stats: {
    name: "stats",
    width: 1204,
    height: 122,
    alt: "Portal counters: 14 posts, 2 published, 7 waiting on you, next post 24 September.",
  },
  queue: {
    name: "queue",
    width: 1196,
    height: 252,
    alt: "The portal's approval queue — five drafts, each tagged with its platform and its review state.",
  },
  upcoming: {
    name: "upcoming",
    width: 542,
    height: 298,
    alt: "The portal's schedule — five approved posts with their publication dates.",
  },
  calendar: {
    name: "calendar",
    width: 1092,
    height: 448,
    alt: "The portal's content calendar — a month of scheduled posts, colour-coded by state.",
  },
  feed: {
    name: "feed",
    width: 548,
    height: 420,
    alt: "The portal's activity feed — every state change on every post, timestamped.",
  },
} satisfies Record<string, Crop>;

export type CropName = keyof typeof CROPS;

export function PortalCard({ crop }: { crop: CropName }) {
  const { name, width, height, alt } = CROPS[crop];
  return (
    <div className="rounded-[var(--radius-elevated)] bg-paper p-2 shadow-artifact">
      <img
        src={`/portal/${name}.webp`}
        alt={alt}
        width={width}
        height={height}
        className="block h-auto w-full rounded-[var(--radius-image)]"
      />
    </div>
  );
}

/* ── The accent ────────────────────────────────────────────────
   The single peach surface on the page. Sienna is its ink and
   appears nowhere else, and it sits on paper — the system forbids
   this card on any other ground. */
export function RaisedCard() {
  return (
    <div className="flex h-full flex-col justify-center rounded-[var(--radius-card)] bg-peach px-6 py-5 text-sienna">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <p className="font-display text-[40px] leading-none tracking-[-0.015em] tabular-nums">
          $40M+
        </p>
        <p className="text-[15px] font-[450]">
          raised by founders we&rsquo;ve backed
        </p>
      </div>
      <p className="mt-2 text-[15px] font-[430] leading-snug opacity-80">
        Decks, models and investor strategy — from the first conversation to the
        close.
      </p>
    </div>
  );
}

/* ── The composer ──────────────────────────────────────────────
   Steep's "Ask anything…" field, turned into the one thing this
   page wants a visitor to do. It is a link wearing an input's
   clothes, not a form: there is no endpoint behind it, and a real
   text field that discarded what you typed would be worse than
   none.

   It matters more than it looks. The headline's two buttons clear
   out as the dashboard assembles, so once the assembly finishes
   this is the only call to action left on screen. */
export function ComposerCard() {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full items-center gap-3 rounded-[var(--radius-elevated)] bg-paper p-3 pl-5 shadow-artifact transition-all duration-200 hover:scale-[1.02]"
    >
      <span className="min-w-0 flex-1 text-[16px] font-[430] leading-snug text-smoke">
        Tell us what you&rsquo;re building…
      </span>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink text-paper">
        <ArrowUpRight className="size-5" strokeWidth={1.75} aria-hidden="true" />
      </span>
    </a>
  );
}
