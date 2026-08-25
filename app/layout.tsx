import type { Metadata, Viewport } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/seo";
import {
  Barlow,
  Barlow_Condensed,
  Instrument_Serif, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


/* Self-hosted at build time — the same faces liquidGlass pulled from the
   Google Fonts CDN, minus the third-party round trip. */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-barlow-condensed",
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
  themeColor: "#000000",
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
      /* `dark` is the truth here — the site is black-on-white-text throughout.
         It flips shadcn's tokens to their dark values, which is what makes the
         rainbow button render its white face with a dark label. */
      className={cn(
        "dark",
        instrumentSerif.variable,
        barlow.variable,
        barlowCondensed.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body className="is-loading bg-black">
        {/* Ahead of the content so a crawler that only reads the first chunk
            of the document still gets the entity description. */}
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
