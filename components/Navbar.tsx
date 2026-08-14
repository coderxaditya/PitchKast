"use client";

import { useState } from "react";

import { ArrowUpRight } from "./icons";

const links = ["Home", "Voyages", "Worlds", "Innovation", "Plan Launch"];

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
          <div
            className="liquid-glass flex items-center justify-center rounded-full px-4 sm:px-5"
            style={{ height: 48 }}
          >
            <span className="font-body text-sm leading-none font-semibold tracking-[0.16em] whitespace-nowrap text-white uppercase sm:text-base sm:tracking-[0.18em]">
              PITCHKAST
            </span>
          </div>
        </div>

        {/* Desktop rail */}
        <div className="hidden items-center lg:flex">
          <div className="liquid-glass flex items-center rounded-full px-1.5 py-1.5">
            {links.map((link) => (
              <a
                key={link}
                href="#"
                className="font-body px-3 py-2 text-sm font-medium text-white/90"
              >
                {link}
              </a>
            ))}
            <button className="font-body ml-1 flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-black">
              Claim a Spot
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Compact chrome below lg — the rail's links and CTA are otherwise
            unreachable on a phone. */}
        <div className="flex items-center gap-2 lg:hidden">
          <button className="font-body flex h-12 items-center gap-1 rounded-full bg-white px-3.5 text-xs font-medium whitespace-nowrap text-black sm:px-4 sm:text-sm">
            Claim a Spot
            <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
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

        <div className="hidden flex-1 lg:block" />
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
              key={link}
              href="#"
              onClick={() => setOpen(false)}
              className="font-body rounded-full px-4 py-2.5 text-sm font-medium text-white/90"
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
