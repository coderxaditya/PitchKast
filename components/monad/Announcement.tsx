"use client";

import { useState } from "react";
import { X } from "lucide-react";

/**
 * The black strip across the top of the page, as on monad.com: one sentence
 * in the mono face, a small parchment pill, and a close control. Closing it
 * only hides it for this visit.
 */
export function Announcement() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="relative bg-ink text-parchment">
      <div className="mx-auto flex max-w-[var(--shell)] items-center justify-center gap-4 py-2.5 pr-12 pl-5 sm:pl-10">
        <p className="text-body-sm sm:text-label">
          <span className="hidden md:inline">Founders we have backed have raised $40M+. </span>
          See how the work got done.
        </p>
        <a
          href="#case-studies"
          className="shrink-0 rounded-pill bg-parchment px-3.5 py-1.5 text-caption tracking-[0.05em] text-off-black uppercase transition-colors hover:bg-periwinkle sm:text-body-sm"
        >
          Read the stories
        </a>
      </div>
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Dismiss announcement"
        className="absolute top-1/2 right-3 flex size-8 -translate-y-1/2 items-center justify-center rounded-pill hover:bg-white/10 sm:right-6"
      >
        <X className="size-4" strokeWidth={2} />
      </button>
    </div>
  );
}
