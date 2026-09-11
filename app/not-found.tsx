import type { Metadata } from "next";
import Link from "next/link";

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
    <main className="grid min-h-[100svh] place-items-center bg-surface px-6 text-center">
      <div>
        <p className="text-eyebrow font-bold tracking-[0.12em] text-action-strong uppercase">
          404
        </p>
        <h1 className="mt-5 text-display-lg leading-[0.95] font-extrabold tracking-[-0.03em] text-ink">
          Nothing here.
        </h1>
        <p className="mx-auto mt-5 max-w-[42ch] text-lg text-ink-soft">
          That page has moved or never existed.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex items-center rounded-flat bg-action px-7 py-4 font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-action-strong"
        >
          Back to PitchKast
        </Link>
      </div>
    </main>
  );
}
