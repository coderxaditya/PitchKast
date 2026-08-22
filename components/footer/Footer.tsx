"use client";

import Image from "next/image";
import { scrollToSection } from "@/lib/scrollToSection";
import Link from "next/link";
import { SocialDock } from "./SocialDock";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white py-16 px-6 md:px-12 lg:px-24 overflow-hidden relative border-t border-neutral-800">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16 lg:gap-8 relative z-10">

        {/* Left Section - Logo and Copyright */}
        <div className="flex flex-col gap-6 lg:w-1/3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 relative rounded overflow-hidden flex items-center justify-center bg-white/5 p-1">
              <Image
                src="/footerLogo/Screenshot2026-07-09at2.41.03AM.png"
                alt="PitchKast Logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xl font-bold tracking-tight">PitchKast</span>
          </div>
          <p className="text-sm text-neutral-400">
            © copyright PitchKast 2026. All rights reserved.
          </p>
          <div className="mt-8">
            <SocialDock />
          </div>
        </div>

        {/* Right Section - Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-16 lg:w-2/3">
          {/* Pages */}
          <div className="flex flex-col gap-5">
            <h3 className="font-semibold text-neutral-100">Pages</h3>
            <div className="flex flex-col gap-4">
              <a href="#home" onClick={(e) => scrollToSection(e, "#home")} className="text-sm text-neutral-400 hover:text-white transition-colors">Home</a>
              <a href="#about" onClick={(e) => scrollToSection(e, "#about")} className="text-sm text-neutral-400 hover:text-white transition-colors">About</a>
              <a href="#case-studies" onClick={(e) => scrollToSection(e, "#case-studies")} className="text-sm text-neutral-400 hover:text-white transition-colors">Case Studies</a>
              <a href="#services" onClick={(e) => scrollToSection(e, "#services")} className="text-sm text-neutral-400 hover:text-white transition-colors">Services</a>
              <a href="#team" onClick={(e) => scrollToSection(e, "#team")} className="text-sm text-neutral-400 hover:text-white transition-colors">Team</a>
              <a href="#gallery" onClick={(e) => scrollToSection(e, "#gallery")} className="text-sm text-neutral-400 hover:text-white transition-colors">Gallery</a>
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-5">
            <h3 className="font-semibold text-neutral-100">Socials</h3>
            <div className="flex flex-col gap-4">
              <Link href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Instagram</Link>
              <Link href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Twitter</Link>
              <Link href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">LinkedIn</Link>
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-5">
            <h3 className="font-semibold text-neutral-100">Legal</h3>
            <div className="flex flex-col gap-4">
              <Link href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Massive Background Text */}
      <div className="w-full mt-24 lg:mt-32 flex justify-center items-end pointer-events-none select-none h-48 lg:h-64 overflow-hidden relative">
        <h1 className="text-[20vw] lg:text-[18vw] leading-none font-bold tracking-tighter text-neutral-900 absolute bottom-[-10%] md:bottom-[-20%] lg:bottom-[-25%]">
          PitchKast
        </h1>
      </div>
    </footer>
  );
}
