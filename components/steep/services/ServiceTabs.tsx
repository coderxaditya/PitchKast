"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import { BOOKING_URL } from "@/lib/site";
import type { Service } from "./offerings";

/**
 * The tabs and the panel they switch.
 *
 * Measured off steep.app's feature tabs and rebuilt: a column of tabs, 17px
 * titles, the closed ones at 60% opacity; the open tab's description grows in
 * by animating its grid rows from `0fr` to `1fr` over 450ms and fades in 100ms
 * behind that; under every tab a hairline, and under the open one a 2px ink
 * bar filling across it.
 *
 * That bar is the timer — see "Service tabs" in `globals.css`. This component
 * never counts time. It listens for the bar's `animationend` and moves on,
 * which is why hovering, scrolling away and reduced motion all pause the
 * rotation without any code of their own.
 *
 * It is a real tab widget: `tablist`/`tab`/`tabpanel`, arrow keys and
 * Home/End move between tabs, and only the open tab is in the tab order.
 * Closed panels are `inert`, so their text is neither read out nor tabbable
 * while they sit invisible under the open one.
 */
export function ServiceTabs({ services }: { services: Service[] }) {
  const [open, setOpen] = useState(0);
  const [running, setRunning] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /* Only rotate while the section is actually on screen. */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* The navbar's services dropdown names a service; open its tab. */
  useEffect(() => {
    const onPick = (e: Event) => setOpen((e as CustomEvent<number>).detail);
    window.addEventListener("pitchkast:service", onPick);
    return () => window.removeEventListener("pitchkast:service", onPick);
  }, []);

  const select = (i: number, focus = false) => {
    const next = (i + services.length) % services.length;
    setOpen(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowDown: open + 1,
      ArrowRight: open + 1,
      ArrowUp: open - 1,
      ArrowLeft: open - 1,
      Home: 0,
      End: services.length - 1,
    };
    if (e.key in keys) {
      e.preventDefault();
      select(keys[e.key], true);
    }
  };

  return (
    <div
      ref={rootRef}
      data-running={running}
      /* Desktop only. Below `lg` the reference drops its tabs for a carousel,
         which `Services` renders instead; with this element not displayed the
         observer never sees it intersect, so the rotation never runs there. */
      className="svc mt-20 hidden lg:flex lg:flex-row lg:items-center lg:gap-12"
    >
      {/* ── Tabs ─────────────────────────────────────────────── */}
      <div
        role="tablist"
        aria-label="Services"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="svc-tabs flex w-full shrink-0 flex-col lg:w-[282px]"
      >
        {services.map((service, i) => {
          const isOpen = i === open;
          return (
            <button
              key={service.name}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`service-tab-${i}`}
              aria-selected={isOpen}
              aria-controls={`service-panel-${i}`}
              tabIndex={isOpen ? 0 : -1}
              onClick={() => select(i)}
              className={`relative w-full cursor-pointer py-5 text-left text-ink transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-60 hover:opacity-100"
              }`}
            >
              <span className="block pb-0.5 text-body">{service.menuName}</span>

              {/* Height by grid rows rather than a measured max-height, so the
                  description can be any length and still animate. */}
              <span
                className={`grid transition-[grid-template-rows] duration-[450ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <span className="overflow-hidden">
                  <span
                    className={`block pt-1 text-[16px] leading-snug transition-opacity delay-100 duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                      isOpen ? "opacity-60" : "opacity-0"
                    }`}
                  >
                    {service.lead}
                  </span>
                </span>
              </span>

              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-black/10"
              >
                {isOpen ? (
                  /* Keyed on the open tab so every selection mounts a fresh
                     bar and the animation starts from empty. */
                  <span
                    key={open}
                    onAnimationEnd={() => select(open + 1)}
                    className="svc-bar block h-[2px] -translate-y-[0.5px] rounded-full bg-ink"
                  />
                ) : null}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Panels ───────────────────────────────────────────────
          All five sit in one grid cell, so the stack is always as tall as
          the longest and nothing below moves when the tab changes. */}
      <div className="svc-panels min-w-0 flex-1 rounded-[var(--radius-card)] bg-mist p-4 sm:p-8 lg:p-12">
        <div className="grid">
          {services.map((service, i) => {
            const isOpen = i === open;
            return (
              <article
                key={service.name}
                role="tabpanel"
                id={`service-panel-${i}`}
                aria-labelledby={`service-tab-${i}`}
                inert={!isOpen}
                className={`col-start-1 row-start-1 rounded-[var(--radius-image)] bg-paper p-7 shadow-artifact transition-[opacity,translate] duration-500 ease-[cubic-bezier(0,0,0.2,1)] sm:p-10 ${
                  isOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
                }`}
              >
                <p className="text-[14px] font-[430] text-ash tabular-nums">
                  Service {String(i + 1).padStart(2, "0")} of{" "}
                  {String(services.length).padStart(2, "0")}
                </p>

                <h3 className="mt-3 font-display text-heading font-normal text-balance text-ink">
                  {service.name}
                </h3>

                <p className="mt-4 text-[18px] font-[430] leading-[1.45] text-slate">
                  {service.lead}
                </p>

                <ul className="mt-8 border-t border-hairline">
                  {service.points.map((point, p) => (
                    <li
                      key={point}
                      className="flex gap-4 border-b border-hairline py-3.5 text-[16px] leading-snug text-ink"
                    >
                      <span className="w-6 shrink-0 text-[14px] leading-[1.45] text-ash tabular-nums">
                        {String(p + 1).padStart(2, "0")}
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>

                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={isOpen ? undefined : -1}
                  className="mt-6 inline-flex items-center gap-1.5 py-1 text-[16px] font-[450] text-ink underline-offset-4 hover:underline"
                >
                  Talk to us about this
                  <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
