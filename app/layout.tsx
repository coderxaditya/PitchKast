import type { Metadata, Viewport } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/seo";
import {
  DM_Sans,
  Inter,
  Plus_Jakarta_Sans,
  Source_Serif_4,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

/**
 * The two faces.
 *
 * The system specifies Signifier (display serif) and Sohne (body sans), both
 * licensed from Klim and neither redistributable, so the site ships the
 * substitutes the reference document names itself: Source Serif 4 and Inter.
 *
 * Both are loaded as variable fonts rather than as a weight list, and that is
 * deliberate — Sohne's half-step weights (430, 450, 480) are the system's
 * stated way of building hierarchy without reaching for bold, and a static
 * weight list would round every one of them to 400 or 500.
 *
 * Self-hosted at build time by next/font, so no CDN round trip and no shift
 * while the face arrives.
 */
const signifier = Source_Serif_4({
  subsets: ["latin"],
  /* The display face is used at 400 only — the restraint is the signature —
     but italic is needed: every headline carries one italicised phrase. */
  style: ["normal", "italic"],
  variable: "--font-signifier",
  display: "swap",
});

const sohne = Inter({
  subsets: ["latin"],
  variable: "--font-sohne",
  display: "swap",
});

/**
 * The portal's two faces.
 *
 * The hero's fragments are a rebuild of the PitchKast client portal, and the
 * portal is built on DM Sans with Plus Jakarta Sans for its figures and
 * labels. Loading both is what keeps the rebuild honest — in the site's own
 * Inter the fragments look like a tasteful approximation of the product
 * rather than the product.
 *
 * Both are variable and subset to latin, and they are scoped to those
 * fragments: nothing else on the page uses them.
 */
const portalSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const portalDisplay = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  /* Resolves every relative URL below, and every `alternates.canonical` on a
     child page. Without it Next emits relative OG URLs, which most crawlers
     and every social scraper refuse to follow. */
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_TITLE,
    /* Child pages set only their own name; the brand is appended here so it
       can never be forgotten on a new page. */
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,

  /* Not a ranking signal at Google since 2009, and included anyway because
     several other engines and a number of AI crawlers still read it. It costs
     one line and is honest about what the site sells. */
  keywords: [
    "PitchKast",
    "founder branding",
    "LinkedIn lead generation",
    "B2B lead generation agency",
    "personal branding for founders",
    "growth partner for startups",
    "pitch deck agency",
    "fundraising deck",
    "go to market strategy",
    "social media marketing agency",
  ],

  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  /* The homepage's canonical. Child pages override this with their own.
     A site reachable at both the apex and the Netlify subdomain needs this to
     nominate a single winner, or the two split each other's ranking. */
  alternates: { canonical: "/" },

  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      /* Defaults cap the snippet and forbid large image previews, which is
         what produces a bare text result instead of a rich one. */
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  /* Silences the "this page mentions a phone number" auto-linking Safari does
     to arbitrary digits, which mangles the stats counters in the hero. */
  formatDetection: { telephone: false, address: false, email: false },

  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      /* One palette, light only. Every surface in the system is declared
         explicitly, so there is no theme class to flip. */
      className={cn(
        signifier.variable,
        sohne.variable,
        portalSans.variable,
        portalDisplay.variable,
        "font-sans",
      )}
    >
      <body>
        {/* Ahead of the content so a crawler that only reads the first chunk
            of the document still gets the entity description. */}
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
