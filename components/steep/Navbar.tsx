"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/steep/Button";
import { Container } from "@/components/steep/Container";
import { BOOKING_URL, NAV_LINKS } from "@/lib/site";

/**
 * Site header.
 *
 * Whisper-quiet, as the system asks: no shadow, no separator, no blur —
 * logo left, links centred, a text link and a filled pill on the right.
 *
 * It is sticky and therefore needs *some* ground to sit on, so it carries the
 * page's own paper rather than the transparency the reference describes. A
 * transparent bar over the hero's floating fragments would have the cards
 * sliding visibly under the navigation as they assemble.
 *
 * Navigation is plain anchors. `scroll-behavior: smooth` on the document does
 * the travelling, and a real href keeps middle-click, "open in new tab" and
 * the link semantics a scripted handler throws away.
 */
const NAV_LINK =
  "text-[15px] font-[430] text-slate transition-colors duration-200 hover:text-ink";

export function Navbar() {
  const [open, setOpen] = useState(false);

  /* Close on the way up to desktop, or the panel is left open and hidden
     while its `aria-expanded` still claims otherwise. */
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-paper">
      <Container>
        <div className="flex h-[72px] items-center justify-between gap-6">
          {/* ── Lockup ── */}
          <a
            href="#home"
            className="flex shrink-0 items-center gap-2"
            aria-label="PitchKast, back to top"
            onClick={() => setOpen(false)}
          >
            <img
              src="/brand/landing-mark-ink-256.png"
              alt=""
              width={979}
              height={825}
              className="h-7 w-auto"
            />
            <span className="text-[19px] font-[500] tracking-[-0.009em] text-ink">
              PitchKast
            </span>
          </a>

          {/* ── Links ──
              Absolutely centred on the bar rather than centred in the space
              left over, so the row does not shift as the logo or the CTA pair
              change width. */}
          <nav
            aria-label="Primary"
            className="absolute left-1/2 hidden -translate-x-1/2 lg:block"
          >
            <ul className="flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={NAV_LINK}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Call to action ──
              The system's pairing rule, in its lowest-emphasis form: a plain
              text link beside the filled pill. */}
          <div className="flex shrink-0 items-center gap-4">
            <a
              href="#case-studies"
              className={`${NAV_LINK} hidden sm:inline-block`}
            >
              Case studies
            </a>

            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Book a call
              </a>
            </Button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex size-10 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-mist lg:hidden"
            >
              {open ? (
                <X className="size-5" strokeWidth={1.75} />
              ) : (
                <Menu className="size-5" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* ── Mobile panel ──
          `hidden` rather than an unmount, so the panel keeps a stable id for
          `aria-controls` and the closed state costs no layout. */}
      <div id="mobile-nav" hidden={!open} className="bg-paper lg:hidden">
        <Container>
          <ul className="flex flex-col pb-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-subheading font-[430] text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-3 sm:hidden">
              <Button asChild size="md" className="w-full">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  Book a discovery call
                </a>
              </Button>
            </li>
          </ul>
        </Container>
      </div>
    </header>
  );
}
