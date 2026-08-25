"use client";

import Image from "next/image";
import { scrollToSection } from "@/lib/scrollToSection";
import Link from "next/link";
import { SocialDock } from "./SocialDock";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { ArrowUpRight } from "@/components/icons";

const BOOKING_URL = "https://calendly.com/goelsoham/founder-growth-strategy-call";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white py-16 px-6 md:px-12 lg:px-24 overflow-hidden relative border-t border-neutral-800">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16 lg:gap-8 relative z-10">

        {/* Left Section - Logo and Copyright */}
        <div className="flex flex-col gap-6 lg:w-1/3">
          <div className="flex items-center gap-3">
            {/* object-contain, and no `p-1`. The previous source was a
                2400x1792 canvas whose artwork covered 16.8% of it, so
                `object-cover` in this square box cropped to the middle of that
                canvas and rendered an almost empty orange tile. The mark is
                now pre-cropped square, so it fills the box exactly. */}
            <div className="w-8 h-8 relative overflow-hidden rounded">
              <Image
                src="/brand/logo.png"
                alt="PitchKast"
                fill
                sizes="32px"
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold tracking-tight">PitchKast</span>
          </div>
          <p className="text-sm text-neutral-300">
            © copyright PitchKast 2026. All rights reserved.
          </p>
          {/* Corporate disclosure — sits a step quieter than the copyright
              line above it, since it is legal provenance rather than a claim
              the reader needs to act on. `text-pretty` keeps "Himadri
              Infrabuild Private Limited" from breaking across an awkward
              last line. */}
          <p className="mt-2 max-w-[46ch] text-xs leading-relaxed text-pretty text-neutral-300">
            PitchKast &mdash; A service brand operating under its parent
            company, Himadri Infrabuild Private Limited.
          </p>
          <div className="mt-8 flex flex-col items-start gap-6">
            <SocialDock />
            <RainbowButton
              asChild
              className="font-body h-12 rounded-full px-7 text-base"
            >
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Book a Discovery Call
                <ArrowUpRight className="size-5" />
              </a>
            </RainbowButton>
          </div>
        </div>

        {/* Right Section - Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-16 lg:w-2/3">
          {/* Pages */}
          <div className="flex flex-col gap-5">
            <h3 className="font-semibold text-neutral-100">Pages</h3>
            <div className="flex flex-col gap-4">
              <a href="#home" onClick={(e) => scrollToSection(e, "#home")} className="text-sm text-neutral-200 hover:text-white transition-colors">Home</a>
              <a href="#about" onClick={(e) => scrollToSection(e, "#about")} className="text-sm text-neutral-200 hover:text-white transition-colors">About</a>
              <a href="#case-studies" onClick={(e) => scrollToSection(e, "#case-studies")} className="text-sm text-neutral-200 hover:text-white transition-colors">Case Studies</a>
              <a href="#services" onClick={(e) => scrollToSection(e, "#services")} className="text-sm text-neutral-200 hover:text-white transition-colors">Services</a>
              <a href="#team" onClick={(e) => scrollToSection(e, "#team")} className="text-sm text-neutral-200 hover:text-white transition-colors">Team</a>
              <a href="#gallery" onClick={(e) => scrollToSection(e, "#gallery")} className="text-sm text-neutral-200 hover:text-white transition-colors">Gallery</a>
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-5">
            <h3 className="font-semibold text-neutral-100">Socials</h3>
            <div className="flex flex-col gap-4">
              <Link href="#" className="text-sm text-neutral-200 hover:text-white transition-colors">Instagram</Link>
              <Link href="#" className="text-sm text-neutral-200 hover:text-white transition-colors">Twitter</Link>
              <Link href="https://www.linkedin.com/company/pitchkast-india/?viewAsMember=true" className="text-sm text-neutral-200 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">LinkedIn</Link>
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-5">
            <h3 className="font-semibold text-neutral-100">Legal</h3>
            <div className="flex flex-col gap-4">
              <Link href="/privacy" className="text-sm text-neutral-200 hover:text-white transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Massive Background Text */}
      <div className="w-full mt-24 lg:mt-32 flex justify-center items-end pointer-events-none select-none h-48 lg:h-64 overflow-hidden relative">
        {/* A <div>, not an <h1>. This is a decorative wordmark bleeding off
            the bottom of the page, but as a heading it was the highest-ranked
            one in the document — so it defined the homepage's topic as the
            company's own name rather than what the company does. aria-hidden
            because a screen reader announcing "heading level 1, PitchKast" at
            the very end of the page is noise; the name is already in the
            title, the logo link and the copyright line. */}
        <div
          aria-hidden="true"
          className="text-[20vw] lg:text-[18vw] leading-none font-bold tracking-tighter text-neutral-900 absolute bottom-[-10%] md:bottom-[-20%] lg:bottom-[-25%]"
        >
          PitchKast
        </div>
      </div>
    </footer>
  );
}
