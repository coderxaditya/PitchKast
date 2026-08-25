import type { Metadata } from "next";
import Link from "next/link";

import { SmoothScroll } from "@/components/SmoothScroll";
import { ACCENT } from "@/components/gallery/images";

/**
 * A real 404.
 *
 * The site had none, so an unknown path fell through to Next's built-in page.
 * That page renders and returns a 404 correctly, but it carries no `noindex`
 * and no link back into the site — so a crawler that reaches a dead URL (a
 * mistyped backlink, an old path, a scraped link) finds a dead end and spends
 * crawl budget there. `noindex, follow` is the correct pair: do not index this
 * page, but do follow the link home.
 */
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center bg-black px-6 text-center">
      {/* Short enough not to scroll, mounted anyway so every route in the
          app behaves identically — including if this page ever grows. */}
      <SmoothScroll />
      <div>
        <p
          className="font-body text-xs tracking-[0.24em] uppercase"
          style={{ color: ACCENT }}
        >
          (404)
        </p>
        <h1 className="font-heading mt-6 text-[clamp(2.4rem,8vw,4.5rem)] leading-none tracking-[-0.03em] text-white italic">
          Nothing here.
        </h1>
        <p className="font-body mx-auto mt-6 max-w-[42ch] text-sm text-neutral-400">
          That page has moved or never existed.
        </p>
        <Link
          href="/"
          className="font-body mt-10 inline-flex items-center gap-2 rounded-full border px-6 py-3 text-xs tracking-[0.18em] uppercase transition-colors duration-300 hover:bg-white/[0.06]"
          style={{ borderColor: ACCENT, color: ACCENT }}
        >
          Back to PitchKast
        </Link>
      </div>
    </main>
  );
}
