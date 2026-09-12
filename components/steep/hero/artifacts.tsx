import { ArrowUpRight } from "lucide-react";

import { BOOKING_URL } from "@/lib/site";

/**
 * The two fragments that are ours rather than the portal's.
 *
 * The portal surfaces live in `portal.tsx`. These are the single peach card
 * the system permits per page, and the composer.
 */

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
