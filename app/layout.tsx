import type { Metadata, Viewport } from "next";
import {
  Barlow,
  Barlow_Condensed,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";

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
      className={`${instrumentSerif.variable} ${barlow.variable} ${barlowCondensed.variable}`}
    >
      <body className="is-loading bg-black">{children}</body>
    </html>
  );
}
