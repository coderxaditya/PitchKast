import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { SmoothScroll } from "@/components/SmoothScroll";
import { BackLink } from "@/components/gallery/BackLink";
import { GalleryPageView } from "@/components/gallery/GalleryPageView";
import { ACCENT, SURFACE } from "@/components/gallery/images";

export const metadata: Metadata = {
  /* Just the page name — the root layout's title template appends the brand,
     so writing it here as well produced "Gallery - PitchKast - PitchKast". */
  title: "Gallery",
  description:
    "Moments from PitchKast — the team, the work, and the founders we build with.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <main
      className="min-h-[100svh]"
      style={{ background: SURFACE, color: "#0a0a0a" }}
    >
      {/* This route had no smooth scroll at all — Lenis is created by the
          handshake hook, which only exists on the home page. Stepping out of
          the gallery section into "View all" therefore crossed a boundary
          where the scroll changed character entirely. */}
      <BreadcrumbJsonLd name="Gallery" path="/gallery" />
      <SmoothScroll wrapperSelector="[data-gallery-scroller]" />

      <header className="mx-auto flex max-w-5xl items-end justify-between px-10 pt-14 pb-8">
        <div>
          <p
            className="font-body text-xs tracking-[0.24em] uppercase"
            style={{ color: ACCENT }}
          >
            (Gallery)
          </p>
          <h1
            className="font-heading mt-4 text-[clamp(2.4rem,6vw,4.5rem)] leading-none tracking-[-0.03em] italic"
            style={{ color: ACCENT }}
          >
            Moments.
          </h1>
        </div>

        <BackLink />
      </header>

      <GalleryPageView />
    </main>
  );
}
