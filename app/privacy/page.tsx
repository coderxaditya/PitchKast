import type { Metadata } from "next";

import { SmoothScroll } from "@/components/SmoothScroll";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import PolicyPages from "./PolicyPages";

/**
 * Server wrapper so the route can export `metadata`.
 *
 * The page itself is interactive (the sidebar tracks the section you are in),
 * so it has to be a client component — and a client component cannot export
 * metadata. Splitting it this way is the standard fix and costs nothing: the
 * wrapper renders on the server, the policy text ships in the static HTML, and
 * only the sidebar's behaviour is hydrated.
 */
export const metadata: Metadata = {
  /* Just the page name; the root layout's template appends the brand. The
     five policies share one page, so this names the page rather than any one
     policy. */
  title: "Policies",
  description:
    "Terms & Conditions, Privacy Policy, Cookie Policy, Refund and Cancellation Policy, and Intellectual Property Policy for PitchKast.",
  alternates: { canonical: "/privacy" },
  /* Indexable, but these are the pages you least want ranking for a branded
     query. Nothing here excludes them; the canonical and the sitemap priority
     do the steering. */
  robots: { index: true, follow: true },
};

export default function PrivacyRoute() {
  return (
    <>
      {/* This route had no smooth scroll at all — Lenis is created by the
          handshake hook on the home page and by SmoothScroll on /gallery, and
          nothing covered the policies. It is also the longest document on the
          site, so it is the page where the difference is most felt. The window
          is the scroller here; there is no nested overflow container. */}
      <SmoothScroll />
      <BreadcrumbJsonLd name="Policies" path="/privacy" />
      <PolicyPages />
    </>
  );
}
