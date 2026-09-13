import { TEAM } from "@/components/steep/team/people";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
  url,
} from "@/lib/seo";

/**
 * Structured data — the machine-readable version of "who is this".
 *
 * This is the part of SEO that actually moves a branded query like
 * "PitchKast". Without it a search engine has to infer from prose that the
 * site belongs to a company of that name; with it, the company is asserted
 * directly, along with what it sells and where else it exists on the web.
 * It is also the input to a knowledge panel and to sitelinks, and it is what
 * AI answer engines read when they cite a source.
 *
 * Three linked nodes rather than three loose ones. The `@id` cross-references
 * are what let a parser understand that the Organization *is* the publisher of
 * the WebSite, instead of treating them as unrelated facts that happen to
 * share a page.
 */
export function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: "Pitchkast",
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#logo`,
          /* The mark itself. This was pointing at the OpenGraph card, which
             is a wide text banner — Google wants a square-ish logo here and
             uses it for the knowledge panel and the result favicon. */
          url: url("/brand/logo-512.png"),
          width: 512,
          height: 512,
          caption: SITE_NAME,
        },
        image: { "@id": `${SITE_URL}/#logo` },
        sameAs: SOCIAL_PROFILES,
        /* Read from the Team component's own roster rather than restated, for
           the same reason the FAQ graph reads from faqData: a second copy is
           a copy that drifts.

           Six named people, each with a role and a LinkedIn profile that
           resolves, is one of the strongest entity signals a small site can
           offer. It is what lets a search engine connect "Soham Goel" to
           "PitchKast" as fact rather than co-occurrence, and it is a direct
           input to the experience and trust side of how business sites are
           assessed. */
        employee: TEAM.map((member) => ({
          "@type": "Person",
          name: member.name,
          /* The role strings all end in ", PitchKast"; the organisation is
             already stated by the link below, so it is trimmed here. */
          jobTitle: member.role.replace(/,\s*PitchKast$/, ""),
          worksFor: { "@id": `${SITE_URL}/#organization` },
          ...(member.linkedin ? { sameAs: [member.linkedin] } : null),
          image: url(member.src),
        })),
        /* Named because the people are already on the page and attributable;
           an Organization whose founder resolves to a real LinkedIn profile is
           a far stronger entity signal than a bare company name. */
        founder: {
          "@type": "Person",
          name: "Soham Goel",
          jobTitle: "Founder & CEO",
          sameAs: ["https://www.linkedin.com/in/sohamgoelsg/"],
        },
      },
      {
        /* ProfessionalService is a subtype of LocalBusiness, and it is the
           closest accurate type for an agency. Claiming LocalBusiness outright
           would invite a request for an address and opening hours this site
           does not publish. */
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
        areaServed: [
          { "@type": "Country", name: "India" },
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Country", name: "Singapore" },
          { "@type": "Country", name: "United Arab Emirates" },
        ],
        /* Mirrors the five services the page actually lists. Structured data
           that disagrees with the visible page is a spam signal, so this is
           kept in step with the Services section deliberately. */
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: [
            "Founder & Company Branding Across Social Media Platforms",
            "Product & Technology Creation",
            "LinkedIn Lead Generation & Marketing",
            "Sales & Market Expansion",
            "Fundraising & Strategic Growth Decks",
          ].map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        /* What Google renders as the "site name" line above a result — the
           bold "Pitchkast" rather than a bare domain. It picks that from this
           node, and the alternates give it the casings people actually type,
           so a lowercase or spaced query still resolves to the same entity. */
        alternateName: ["Pitchkast", "PITCHKAST", "Pitch Kast"],
        description: SITE_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      /* JSON.stringify cannot emit `</script>`, so there is no injection
         surface here — every value is a build-time constant from lib/seo. */
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
