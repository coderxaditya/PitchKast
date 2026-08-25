/**
 * Everything a search engine, a social card or a crawler needs to know about
 * this site, declared once.
 *
 * It lives in one file because these values have to agree with each other to
 * work: the canonical URL, the sitemap, the OpenGraph `url` and the JSON-LD
 * `@id` are all the same string, and a mismatch between any two of them is the
 * classic way a site ends up competing with itself for its own name.
 */

/**
 * The canonical origin. No trailing slash — every helper below appends its own.
 *
 * Overridable so a Netlify preview build does not advertise itself as the
 * production domain. Deploy previews that claim the canonical URL get their
 * content treated as a duplicate of the real site, which is worth avoiding
 * even though previews are usually noindexed anyway.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pitchkast.com"
).replace(/\/$/, "");

export const SITE_NAME = "PitchKast";

/**
 * The homepage title.
 *
 * Brand first, then the two things someone would actually type. The title tag
 * is the single strongest on-page signal for a branded query, and this site
 * previously shipped "Venture Past Our Sky" — evocative, and containing
 * neither the company name nor any service. A search for "PitchKast" had
 * nothing in the title to match.
 *
 * 54 characters, inside the ~60 Google renders before truncating.
 */
export const SITE_TITLE =
  "PitchKast — Founder Branding & LinkedIn Lead Gen";

/**
 * 155 characters, the practical ceiling before a snippet is cut.
 *
 * Written as a sentence a human would read rather than a keyword list: Google
 * rewrites descriptions it finds unhelpful, and a stuffed one is the surest
 * way to have yours replaced with an arbitrary sentence from the page.
 */
export const SITE_DESCRIPTION =
  "PitchKast is an end-to-end growth partner for early-stage founders — founder branding, LinkedIn lead generation, product build, and fundraising decks.";

/** Used as the OpenGraph/Twitter card image alt, and by the image route. */
export const SITE_TAGLINE = "Strategic Growth Partners";

/**
 * Verified profiles, for the Organization `sameAs`.
 *
 * Only real, live URLs belong here — it is how a search engine reconciles this
 * site with the entity behind it. The Instagram and X accounts are still
 * placeholders in the footer, so they are deliberately absent rather than
 * listed as "#".
 */
export const SOCIAL_PROFILES = [
  "https://www.linkedin.com/company/pitchkast-india/",
];

/** Routes worth listing in the sitemap, in descending priority. */
export const ROUTES = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/gallery", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
];

export const url = (path = "/") => `${SITE_URL}${path === "/" ? "" : path}`;
