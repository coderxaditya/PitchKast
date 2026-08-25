import { SITE_NAME, url } from "@/lib/seo";

/**
 * BreadcrumbList for a sub-page.
 *
 * What it buys is small and concrete: the result line renders as
 * "pitchkast.com › Gallery" instead of a bare truncated URL. On a site with
 * three routes that is not a ranking lever, but it is the difference between
 * a result that reads as a section of a real site and one that reads as a
 * loose page, and it costs one element.
 */
export function BreadcrumbJsonLd({
  name,
  path,
}: {
  name: string;
  path: string;
}) {
  const graph = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: url("/") },
      { "@type": "ListItem", position: 2, name, item: url(path) },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
