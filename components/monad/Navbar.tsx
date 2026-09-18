"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Button, Caret, HYPER } from "@/components/monad/Button";
import { Container } from "@/components/monad/Container";
import { HyperText } from "@/components/ui/hyper-text";
import { SERVICES, serviceAnchor } from "@/content/services";
import { BOOKING_URL, HEADER_LINKS } from "@/lib/site";

/**
 * Site header, on monad.com's.
 *
 * Logo far left, the links grouped beside it in the mono face at 16px
 * uppercase with 0.05em tracking, and two pills on the right: a dark one and
 * the page's single Lake Blue action. No border and no shadow; the bar is
 * parchment so the page slides under it cleanly.
 *
 * "Services" opens a parchment panel of the five services on hover or
 * keyboard focus, each linking to its own card in the services section. The
 * link for the section the reader is in is set in Off-Black; the rest are
 * Smoke.
 */
const LINK =
  "inline-flex items-center gap-1.5 whitespace-nowrap py-2 text-[15px] tracking-[0.05em] uppercase transition-colors duration-150 hover:text-off-black xl:text-body";

/** Which header link the reader is in; sections not in the header count as
    part of the last one above them. */
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

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 8" aria-hidden="true" className={`h-2 w-3 shrink-0 ${className}`}>
      <path d="M1 1.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <img
        src="/brand/landing-mark-ink-256.png"
        alt=""
        width={979}
        height={825}
        className="h-8 w-auto"
      />
      <span className="font-sans text-[26px] font-semibold tracking-[-0.04em] text-off-black">
        PitchKast
      </span>
    </span>
  );
}

function ServicesPanel() {
  return (
    <div className="invisible absolute top-full left-0 z-50 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-has-[:focus-visible]:visible group-has-[:focus-visible]:opacity-100">
      <ul className="w-[560px] rounded-card border border-ash bg-parchment p-2 shadow-md">
        {SERVICES.map((service, i) => (
          <li key={service.name}>
            <a
              href={serviceAnchor(i)}
              className="flex items-start justify-between gap-6 rounded-[12px] px-4 py-3 transition-colors hover:bg-periwinkle/50 focus-visible:bg-periwinkle/50"
            >
              <span>
                <span className="block text-body-sm tracking-[0.05em] text-off-black uppercase">
                  {service.menuName}
                </span>
                <span className="mt-1 block text-body-sm text-smoke">{service.short}</span>
              </span>
              {service.badge ? (
                <span className="shrink-0 rounded-pill border border-ash px-2.5 py-1 text-caption text-graphite">
                  {service.badge}
                </span>
              ) : null}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const current = useCurrentSection();

  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-parchment">
      <Container>
        <div className="flex h-[var(--header-h)] items-center justify-between gap-6">
          <div className="flex items-center gap-8 xl:gap-12">
            <a href="#home" aria-label="PitchKast, back to top" onClick={() => setOpen(false)}>
              <Logo />
            </a>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-5 xl:gap-8">
                {HEADER_LINKS.filter((l) => l.href !== "#home").map((link) => {
                  const active = current === link.href;
                  const tone = active ? "text-off-black" : "text-smoke";
                  if (link.href === "#services") {
                    return (
                      <li key={link.href} className="group relative">
                        <a
                          href={link.href}
                          aria-current={active ? "location" : undefined}
                          className={`${LINK} ${tone} group-hover:text-off-black`}
                        >
                          {link.label}
                          <Chevron className="transition-transform duration-200 group-hover:rotate-180" />
                        </a>
                        <ServicesPanel />
                      </li>
                    );
                  }
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        aria-current={active ? "location" : undefined}
                        className={`${LINK} ${tone}`}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Magic UI's Hyper Text: the label scrambles and resolves on
                load and again on hover. The link carries the real label, so a
                screen reader never reads the scrambled letters. */}
            <Button asChild variant="dark" className="btn-glow hidden xl:inline-flex">
              <a href="#contact" aria-label="Let's talk">
                <HyperText as="span" aria-hidden="true" className={HYPER}>
                  {"Let's talk"}
                </HyperText>
              </a>
            </Button>
            <Button asChild variant="lake" className="btn-glow hidden sm:inline-flex">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" aria-label="Book a call">
                <HyperText as="span" aria-hidden="true" className={HYPER}>
                  Book a call
                </HyperText>
                <Caret />
              </a>
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex size-11 items-center justify-center rounded-pill border border-ash text-off-black lg:hidden"
            >
              {open ? <X className="size-5" strokeWidth={1.5} /> : <Menu className="size-5" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </Container>

      <div
        id="mobile-nav"
        hidden={!open}
        className="max-h-[calc(100svh-var(--header-h))] overflow-y-auto border-t border-ash bg-parchment lg:hidden"
      >
        <Container>
          <ul className="flex flex-col py-4">
            {HEADER_LINKS.map((link) => (
              <li key={link.href} className="border-b border-ash last:border-b-0">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={current === link.href ? "location" : undefined}
                  className="block py-4 text-label tracking-[0.05em] text-off-black uppercase"
                >
                  {link.label}
                </a>
                {link.href === "#services" ? (
                  <ul className="-mt-1 mb-3 pl-4">
                    {SERVICES.map((service, i) => (
                      <li key={service.name}>
                        <a
                          href={serviceAnchor(i)}
                          onClick={() => setOpen(false)}
                          className="block py-2 text-body-sm text-smoke"
                        >
                          {service.menuName}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
            <li className="pt-5 sm:hidden">
              <Button asChild variant="lake" className="w-full">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  Book a call
                  <Caret />
                </a>
              </Button>
            </li>
          </ul>
        </Container>
      </div>
    </header>
  );
}
