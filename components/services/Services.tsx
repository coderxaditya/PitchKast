"use client";

import { useEffect, useRef } from "react";

const SERVICES = [
  "Technology consulting",
  "Website development",
  "Software and application development",
  "Product development",
  "UI/UX design",
  "Branding and visual identity",
  "Pitch decks and business presentations",
  "Founder branding",
  "LinkedIn management",
  "Social media management",
  "Content strategy",
  "Content writing",
  "SEO",
  "Digital marketing",
  "Lead generation",
  "Business development",
  "Outreach",
  "Investor relations support",
  "Fundraising support",
  "Business strategy",
  "Market research",
  "Training and consulting",
  "Other services specifically agreed in writing",
] as const;

/**
 * Scroll length, md and up. The reference spends about five viewports on six
 * items, which would be nineteen for twenty-three — far too long to sit
 * through. This keeps the same feel at roughly a quarter viewport per line.
 */
const TRACK_VH = 520;
/** Fallback spacing, used only by the reduced-motion flat list. */
const STEP = "clamp(3.2rem, 7vh, 5.6rem)";
/**
 * Cylinder geometry. The angle is how far apart lines sit around the drum —
 * 17° puts roughly five either side of the front before they turn edge-on —
 * and the radius sets how far a line travels backwards as it goes over.
 */
const ANGLE = "17deg";
/**
 * Front-of-drum spacing is R·sin(17°) ≈ 0.29R, so the radius has to clear the
 * line height or neighbouring lines touch before the curve has even started.
 * At the desktop size that needs ~230px; this leaves margin on top.
 */
const RADIUS = "clamp(210px, 31vh, 340px)";

export function Services() {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    /* The cylinder only exists from md up. The width check lives *inside* the
       handler rather than around the subscription: conditionally attaching
       meant a page first painted narrow never wired the listener at all, and
       never recovered on resize. Subscribing once and cheaply bailing cannot
       get stuck. */
    const wide = window.matchMedia("(min-width: 768px)");

    /* One passive listener writing one custom property. No rAF loop: this only
       has work while the user is actually scrolling, and a standing loop is
       what stalled the logo marquee on mobile. */
    const update = () => {
      if (!wide.matches) return;
      const rect = track.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const progress =
        distance <= 0 ? 0 : Math.min(Math.max(-rect.top / distance, 0), 1);
      stage.style.setProperty("--svc-p", progress.toFixed(5));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      ref={trackRef}
      aria-label="Services"
      /* Auto height on mobile, a tall scroll track from md up. */
      className="relative z-10 bg-[#f4f3f0] md:h-[var(--svc-track)]"
      style={{ "--svc-track": `${TRACK_VH}vh` } as React.CSSProperties}
    >
      <div className="flex w-full flex-col md:sticky md:top-0 md:h-screen md:overflow-hidden">
        <div className="px-6 pt-20 text-center md:pt-24">
          {/* Deeper than the brand gold: #c8a96a on this background is 2:1
              and fails contrast, this is ~4.5:1. The full stop is inside the
              colour, not left to inherit — it reads as part of the word. */}
          <h2 className="font-heading text-[clamp(2.6rem,8vw,6rem)] leading-none tracking-[-0.03em] text-[#8a6a28] italic">
            Services.
          </h2>
        </div>

        <div
          ref={stageRef}
          className="svc-stage relative mt-14 md:mt-0 md:flex-1"
          style={
            {
              "--svc-last": SERVICES.length - 1,
              "--svc-step": STEP,
              "--svc-angle": ANGLE,
              "--svc-r": RADIUS,
            } as React.CSSProperties
          }
        >
          {/* From md up each line is absolutely positioned and derives its own
              offset from --svc-p, so the list reads as a cylinder turning past
              the viewport. Below md it is an ordinary flowing list. */}
          <ul className="svc-list flex flex-col md:absolute md:inset-0 md:items-center md:justify-center">
            {SERVICES.map((service, i) => (
              <li
                key={service}
                className="svc-item border-b border-neutral-950/10 px-6 py-4 text-center last:border-b-0 md:border-0 md:py-0"
                style={{ "--svc-i": i } as React.CSSProperties}
              >
                {/* Capped below the old 4.2rem: the longest name is 44
                    characters, and at that size the line height ate the gap
                    the curve needs to stay legible. */}
                <span className="font-display block text-[clamp(1.35rem,4.6vw,3.6rem)] leading-[1.05] font-extrabold tracking-[-0.02em] text-balance text-neutral-950 md:leading-[0.95]">
                  {service}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
