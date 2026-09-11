"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

import { Button } from "@/components/flat/Button";
import { Container } from "@/components/flat/Container";
import { LOOKS } from "@/components/services/looks";
import { SERVICES } from "@/components/services/offerings";
import { BOOKING_URL, NAV_LINKS } from "@/lib/site";

/**
 * Site header.
 *
 * A solid white bar rather than the glass pill it replaces: the flat system
 * has no blur and no translucency, and a bar with a hairline under it is how
 * this aesthetic separates the header from the page.
 *
 * Sticky, because every section below is reachable from here and the page is
 * long. It is a plain `sticky` on a normal-flow element — nothing on the page
 * sets a transform any more, which is what broke the previous attempt.
 *
 * Navigation is plain anchors. `scroll-behavior: smooth` on the document does
 * what the old scroll library was called for, and a real href keeps
 * middle-click, "open in new tab" and the link role that a scripted handler
 * throws away.
 */
const SERVICES_HREF = "#services";

const NAV_LINK =
  "text-[0.9375rem] font-medium text-ink-soft transition-colors duration-200 hover:text-ink";

/**
 * The Services item, with the five offerings under it.
 *
 * No state and no JavaScript: the panel is revealed by `group-hover` and
 * `group-focus-within` on the list item, so it opens on hover and also when a
 * keyboard user tabs into it — which a hover-only menu would lock them out of.
 *
 * The wrapper carries the top padding rather than the panel, for two reasons.
 * It gives the cursor a bridge to cross from the link down into the panel —
 * without it the hover is lost in the gap and the menu snaps shut halfway. And
 * it is sized to clear the header: the list item's bottom edge sits 29px above
 * the bar's own, so anything less would leave the panel overlapping the
 * header it hangs from.
 *
 * `invisible`, not `hidden`: a hidden element cannot be transitioned, and its
 * links stay out of the tab order until it is shown, which is what makes
 * focus-within work in the first place.
 */
function ServicesMenu({ label }: { label: string }) {
  return (
    <li className="group relative">
      <a href={SERVICES_HREF} className={`${NAV_LINK} inline-flex items-center gap-1`}>
        {label}
        <ChevronDown
          className="size-4 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
          strokeWidth={2.5}
          aria-hidden="true"
        />
      </a>

      <div className="invisible absolute top-full left-1/2 z-50 w-[44rem] -translate-x-1/2 pt-8 opacity-0 transition-opacity duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        {/* A solid border rather than a shadow — the system has no shadows,
            and a white panel on a white page needs an edge from somewhere. */}
        <ul className="grid grid-cols-2 gap-1 rounded-flat border-2 border-ink bg-canvas p-3">
          {SERVICES.map((service, i) => {
            const look = LOOKS[i];
            const Icon = look.icon;
            return (
              <li
                key={service.name}
                /* Five into two columns leaves the last one alone; it takes
                   the full width instead of sitting beside a gap. */
                className={i === SERVICES.length - 1 ? "col-span-2" : undefined}
              >
                <a
                  href={SERVICES_HREF}
                  className="flex gap-3 rounded-flat p-3 transition-colors duration-200 hover:bg-surface"
                >
                  <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-flat ${look.chip}`}
                  >
                    <Icon className="size-5" strokeWidth={2.25} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.9375rem] leading-snug font-bold text-ink">
                      {service.menuName}
                    </span>
                    <span className="mt-0.5 block text-sm leading-snug text-ink-soft">
                      {service.short}
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  /* Close on resize to desktop, or the panel is left open and hidden while
     its `aria-expanded` still claims otherwise. */
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-canvas">
      <Container>
        <div className="flex h-20 items-center justify-between gap-6">
          {/* ── Lockup ── */}
          <a
            href="#home"
            className="flex shrink-0 items-center gap-2.5"
            aria-label="PitchKast — back to top"
            onClick={() => setOpen(false)}
          >
            {/* The ink cut of the mark. The white one the site shipped with is
                invisible on this bar; both are generated from the same source
                so their shapes are identical. */}
            <img
              src="/brand/landing-mark-ink-256.png"
              alt=""
              width={979}
              height={825}
              className="h-9 w-auto"
            />
            <span className="text-[1.375rem] font-extrabold tracking-[-0.02em] text-ink">
              PitchKast
            </span>
          </a>

          {/* ── Links ── */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map((link) =>
                link.href === SERVICES_HREF ? (
                  <ServicesMenu key={link.href} label={link.label} />
                ) : (
                  <li key={link.href}>
                    <a href={link.href} className={NAV_LINK}>
                      {link.label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </nav>

          {/* ── Call to action ── */}
          <div className="flex shrink-0 items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Book a Discovery Call
              </a>
            </Button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex size-11 items-center justify-center rounded-flat bg-surface text-ink transition-colors duration-200 hover:bg-hairline lg:hidden"
            >
              {open ? (
                <X className="size-5" strokeWidth={2.5} />
              ) : (
                <Menu className="size-5" strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* ── Mobile panel ── */}
      {/* `hidden` rather than an unmount so the panel keeps a stable id for
          `aria-controls`, and so the closed state costs no layout. */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-hairline bg-canvas lg:hidden"
      >
        <Container>
          <ul className="flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-lg font-semibold text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="py-3 sm:hidden">
              <Button asChild size="md" className="w-full">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  Book a Discovery Call
                </a>
              </Button>
            </li>
          </ul>
        </Container>
      </div>
    </header>
  );
}
