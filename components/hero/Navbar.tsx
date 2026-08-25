"use client";

import { useState } from "react";
import { scrollToSection } from "@/lib/scrollToSection";

import { ArrowUpRight } from "@/components/icons";
import { RainbowButton } from "@/components/ui/rainbow-button";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
];

/**
 * Both CTAs point here. Declared once so the desktop and mobile buttons can
 * never drift apart, and rendered through `asChild` so each is a real anchor —
 * a button with an onClick would lose middle-click, "open in new tab", and the
 * link semantics assistive tech announces.
 */
const BOOKING_URL = "https://calendly.com/goelsoham/founder-growth-strategy-call";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </>
      ) : (
        <>
          <path d="M4 8h16" />
          <path d="M4 16h16" />
        </>
      )}
    </svg>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="pointer-events-auto absolute top-4 right-0 left-0 z-50 px-4 sm:px-8 lg:px-16">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-1 justify-start">
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "#home")}
            className="liquid-glass flex items-center justify-center rounded-full px-4 sm:px-5"
            style={{ height: 48 }}
          >
            <span className="font-body text-sm leading-none font-semibold tracking-[0.16em] whitespace-nowrap text-white uppercase sm:text-base sm:tracking-[0.18em]">
              PITCHKAST
            </span>
          </a>
        </div>

        {/* Desktop rail */}
        <div className="hidden items-center lg:flex">
          <div className="liquid-glass flex items-center rounded-full px-2 py-1.5 xl:px-4">
            <span className="rim-light" aria-hidden="true" />
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="font-body px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors xl:px-8"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* CTA lives outside the rail, hard right. */}
        <div className="hidden flex-1 justify-end lg:flex">
          {/* rounded-full rather than the component's default rounded-sm —
              every other control in this nav is a pill. h-12 matches the 48px
              logo pill and menu button, which the default h-9 sat small
              against; this is the page's one conversion action and it was the
              shortest thing in the nav. */}
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

        {/* Compact chrome below lg — the rail's links and CTA are otherwise
            unreachable on a phone. */}
        <div className="flex items-center gap-2 lg:hidden">
          <RainbowButton
            asChild
            className="font-body h-12 rounded-full px-3.5 text-xs sm:px-4 sm:text-sm"
          >
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book a Discovery Call
              <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </a>
          </RainbowButton>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="liquid-glass flex items-center justify-center rounded-full text-white"
            style={{ width: 48, height: 48 }}
          >
            <MenuIcon open={open} />
          </button>
        </div>

      </div>

      {/* The 4px variant is tuned for chips over video; a menu sitting on top
          of the headline needs the heavy blur plus a tint to stay readable. */}
      {open && (
        <div
          className="liquid-glass-strong mt-3 flex flex-col rounded-[1.25rem] p-2 lg:hidden"
          style={{ background: "rgba(10, 10, 12, 0.62)" }}
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                setOpen(false);
                scrollToSection(e, link.href);
              }}
              className="font-body rounded-full px-4 py-2.5 text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
