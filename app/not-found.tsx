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
    <main className="grid min-h-[100svh] place-items-center bg-parchment px-6 text-center">
      <div>
        <p className="text-body-sm tracking-[0.05em] text-smoke uppercase">404</p>
        <h1 className="mt-5 font-serif text-display font-normal text-ink">Nothing here.</h1>
        <p className="mx-auto mt-5 max-w-[42ch] text-body-lg text-graphite">
          That page has moved or never existed.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex h-12 items-center rounded-pill bg-off-black px-8 text-[18px] tracking-[0.05em] text-parchment uppercase transition-colors hover:bg-ink"
        >
          Back to PitchKast
        </Link>
      </div>
    </main>
  );
}
