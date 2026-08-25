import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

/**
 * Everything is crawlable. The only disallow is Next's build output, which
 * contains no pages and would waste crawl budget.
 *
 * `host` and `sitemap` are absolute on purpose: a relative sitemap line is
 * ignored by most crawlers.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/_next/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
