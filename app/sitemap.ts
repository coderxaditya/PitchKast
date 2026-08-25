import type { MetadataRoute } from "next";

import { ROUTES, url } from "@/lib/seo";

/**
 * Generated from the same route list the rest of the site uses, so a new page
 * cannot be added without appearing here.
 *
 * `lastModified` is the build time rather than a hard-coded date — a sitemap
 * that always claims the same date tells a crawler nothing about freshness.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: url(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
