"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ACCENT } from "./images";

/**
 * Back to wherever the reader came from.
 *
 * A plain `href="/"` was a *forward* navigation to the home route: the App
 * Router mounted the page afresh, the hero pinned itself to the top as it does
 * on any first visit, and the reader was thrown back to the landing frame
 * having just been two thirds down the page.
 *
 * `router.back()` pops the entry instead, which is what "back" means and what
 * the browser's own button does — paired with the offset the gallery link
 * stored on the way out, the reader lands on the gallery section again.
 *
 * It stays an `<a href="/">` underneath so the middle-click, the
 * open-in-new-tab and the crawler all still get a real destination, and so
 * arriving at /gallery directly — with nothing to go back to — goes somewhere
 * sensible rather than off the site.
 */
export function BackLink() {
  const router = useRouter();

  return (
    <Link
      href="/"
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        /* Only pop when there is something of ours to pop back to. A direct
           landing on /gallery has no such entry, and back would leave the
           site entirely. */
        if (window.history.length > 1 && document.referrer) {
          e.preventDefault();
          router.back();
        }
      }}
      className="font-body inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs tracking-[0.18em] uppercase transition-colors duration-300 hover:bg-black/[0.04]"
      style={{ borderColor: ACCENT, color: ACCENT }}
    >
      <span aria-hidden="true">&#8592;</span>
      Back
    </Link>
  );
}
