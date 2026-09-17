import type { Metadata, Viewport } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/seo";
import { IBM_Plex_Mono, Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

/**
 * The three faces.
 *
 * The system is Untitled Serif for headings, ABC Diatype Mono for every
 * functional string, and Untitled Sans for a few card paragraphs. All three
 * are licensed and not redistributable, so the site ships open substitutes:
 * Newsreader, IBM Plex Mono (the reference names it as a stand-in) and Inter.
 *
 * Self-hosted at build time by next/font, so no CDN round trip and no shift
 * while the faces arrive.
 */
const serif = Newsreader({
  subsets: ["latin"],
  /* Headings are locked at 400; italic is loaded for the one emphasised
     phrase a headline may carry. */
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    template: `%s | ${SITE_NAME}`,
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
  themeColor: "#f6f3f1",
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
      /* One palette, light only: parchment is the canvas everywhere. */
      className={cn(serif.variable, mono.variable, sans.variable, "font-mono")}
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
