"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  CodeXml,
  Globe,
  Menu,
  Presentation,
  TrendingUp,
  UserRound,
  X,
} from "lucide-react";

import { Button } from "@/components/steep/Button";
import { Container } from "@/components/steep/Container";
import { SERVICES } from "@/components/steep/services/offerings";
import { pickService } from "@/components/steep/services/pick";
import { BOOKING_URL, HEADER_LINKS } from "@/lib/site";

/**
 * Site header.
 *
 * The links are the reference's (iniziomedia.com) navbar: 16px, about 34px
 * apart, the current section in ink at 600 and the rest in slate. "Services"
 * carries a chevron and, on hover or keyboard focus, a two-column panel of
 * the services, each with an icon tile, its name, a result where one exists,
 * and a one-line description. Measured off their page: 16px radius, 12px
 * padding, 4px between items, a 16px bridge above it so the pointer can
 * cross, and a 0.2s fade. Their panel is 720px; this one is 820px, so the
 * longer service names keep their result badge on the same line.
 *
 * It is see-through at the very top, over the hero's colour wash, and fills
 * with paper within the first 120px of scroll (see "Hero wash" in
 * `globals.css`).
 */
const NAV_LINK =
  "inline-flex items-center gap-1 -my-1 py-1 text-[16px] transition-colors duration-150 hover:text-ink";

const ICONS = [UserRound, CodeXml, TrendingUp, Globe, Presentation];

/**
 * Which header link the reader is currently in.
 *
 * Sections not in the header (the customer stories, team, gallery, FAQ)
 * count as part of the last header section above them, so the highlight
 * never goes blank mid-page.
 */
function useCurrentSection() {
  const [current, setCurrent] = useState("#home");

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const line = window.scrollY + window.innerHeight * 0.35;
      let best = "#home";
      let bestTop = -Infinity;
      for (const { href } of HEADER_LINKS) {
        const el = document.querySelector<HTMLElement>(href);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= line && top > bestTop) {
          best = href;
          bestTop = top;
        }
      }
      /* The footer is short; at the very bottom it is where the reader is. */
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        best = "#contact";
      }
      setCurrent(best);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return current;
}

/* ── The services panel ─────────────────────────────────────── */
function ServicesMenu() {
  return (
    /* Positioned against the nav, not the link, so the panel centres on the
       bar and stays on screen at 1024px, where centring on "Services" would
       push its left edge past the viewport. */
    <div className="invisible absolute top-full left-1/2 z-50 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-has-[:focus-visible]:visible group-has-[:focus-visible]:opacity-100">
      <div className="w-[min(820px,92vw)] rounded-2xl border border-hairline bg-paper p-3 shadow-[0_24px_60px_-12px_rgba(23,25,28,0.18)]">
        <ul className="grid grid-cols-2 gap-1">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[i];
            return (
              <li key={service.name}>
                <a
                  href="#services"
                  onClick={() => pickService(i)}
                  className="flex gap-3 rounded-xl p-3 transition-colors duration-150 hover:bg-mist focus-visible:bg-mist focus-visible:outline-none"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-sienna/15 bg-peach text-sienna">
                    <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-[14px] leading-5 font-semibold whitespace-nowrap text-ink">
                        {service.menuName}
                      </span>
                      {service.badge ? (
                        <span className="rounded-md border border-sienna/20 bg-peach px-1.5 py-0.5 text-[10px] leading-[15px] font-semibold whitespace-nowrap text-sienna">
                          {service.badge}
                        </span>
                      ) : null}
                    </span>
                    <span className="text-[12px] leading-5 text-slate">{service.short}</span>
                  </span>
                </a>
              </li>
            );
          })}

          {/* Five services in a two-column grid leave one cell; it holds the
              one next step that fits every service. */}
          <li>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 rounded-xl p-3 transition-colors duration-150 hover:bg-mist focus-visible:bg-mist focus-visible:outline-none"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-ink text-paper">
                <CalendarDays className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="text-[14px] leading-5 font-semibold text-ink">
                  Not sure where to start?
                </span>
                <span className="text-[12px] leading-5 text-slate">
                  Book a call and we will map it out with you.
                </span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const current = useCurrentSection();

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
    <header className="site-header sticky top-0 z-50 bg-paper">
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
              Absolutely centred on the bar, so the row does not shift as the
              logo or the call to action change width. */}
          <nav
            aria-label="Primary"
            className="absolute left-1/2 hidden -translate-x-1/2 lg:block"
          >
            <ul className="flex items-center gap-[34px]">
              {HEADER_LINKS.map((link) => {
                const active = current === link.href;
                const tone = active ? "font-semibold text-ink" : "font-normal text-slate";
                if (link.href === "#services") {
                  return (
                    <li key={link.href} className="group">
                      <a
                        href={link.href}
                        aria-current={active ? "location" : undefined}
                        className={`${NAV_LINK} ${tone} group-hover:text-ink`}
                      >
                        {link.label}
                        <ChevronDown
                          className="size-4 transition-transform duration-200 group-hover:rotate-180 group-has-[:focus-visible]:rotate-180"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      </a>
                      <ServicesMenu />
                    </li>
                  );
                }
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={active ? "location" : undefined}
                      className={`${NAV_LINK} ${tone}`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ── Call to action ── */}
          <div className="flex shrink-0 items-center gap-4">
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
          The services are listed under their link, since there is no hover
          to open a dropdown. */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="max-h-[calc(100svh-72px)] overflow-y-auto bg-paper lg:hidden"
      >
        <Container>
          <ul className="flex flex-col pb-4">
            {HEADER_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={current === link.href ? "location" : undefined}
                  className={`block py-3 text-subheading ${
                    current === link.href ? "font-semibold" : "font-[430]"
                  } text-ink`}
                >
                  {link.label}
                </a>
                {link.href === "#services" ? (
                  <ul className="mb-2 border-l border-hairline pl-4">
                    {SERVICES.map((service, i) => (
                      <li key={service.name}>
                        <a
                          href="#services"
                          onClick={() => {
                            pickService(i);
                            setOpen(false);
                          }}
                          className="block py-2 text-[15px] text-slate"
                        >
                          {service.menuName}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
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
