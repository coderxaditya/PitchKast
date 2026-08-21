import type { Metadata, Viewport } from "next";
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
  title: "Venture Past Our Sky",
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
      <body className="is-loading bg-black">{children}</body>
    </html>
  );
}
