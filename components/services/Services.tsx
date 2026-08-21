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
 * Scroll length. The reference spends about five viewports on six items, which
 * would be nineteen for twenty-three — far too long to sit through. This keeps
 * the same feel at roughly a quarter viewport per line.
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
 * tallest line or neighbours touch before the curve has even started.
 *
 * That constraint is what used to keep this section off phones. The longest
 * name is 44 characters and wraps to three lines on a narrow screen, so the
 * radius has to clear three lines, not one:
 *
 *   3 lines x 1.05rem x 1.05 leading  ~=  53px
 *   needed R  =  53 / 0.29            ~=  183px
 *
 * The 200px floor covers that with margin, including on a short landscape
 * phone where 30vh alone would only be ~190px. On a tall screen 30vh takes
 * over and the drum grows with the viewport as before.
 */
const RADIUS = "clamp(200px, 30vh, 340px)";
/**
 * Perspective scales with the drum. A fixed 820px against a 200px radius on a
 * phone reads as a much stronger lens than the same 820px against 340px on a
 * desktop, which made the near lines balloon. Tying it to the viewport keeps
 * the apparent curvature consistent across sizes.
 */
const PERSPECTIVE = "clamp(520px, 92vh, 900px)";

export function Services() {
  const trackRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const pin = pinRef.current;
    const stage = stageRef.current;
    if (!track || !pin || !stage) return;

    /* One passive listener writing one custom property. No rAF loop: this only
       has work while the user is actually scrolling, and a standing loop is
       what stalled the logo marquee on mobile.

       No width test any more — the cylinder runs at every size. */
    const update = () => {
      const rect = track.getBoundingClientRect();

      /* Measure the pinned pane rather than assuming it equals the window.
         On mobile it is sized in svh, which is the *smallest* viewport — the
         one with the browser chrome showing — while innerHeight grows as that
         chrome retracts. Using innerHeight here would drift the progress by
         however tall the address bar happens to be at that moment. */
      const pinned = pin.offsetHeight;
      const distance = rect.height - pinned;
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
      /* A tall scroll track at every width — this is what the pinned pane
         travels through. svh, not vh: on mobile `vh` is the *largest* viewport
         and would make the track taller than the distance actually scrolled,
         so the drum would never finish its turn. */
      className="relative z-10 h-[var(--svc-track)] bg-[#f4f3f0]"
      style={{ "--svc-track": `${TRACK_VH}svh` } as React.CSSProperties}
    >
      <div
        ref={pinRef}
        className="sticky top-0 flex h-[100svh] w-full flex-col overflow-hidden"
      >
        <div className="px-6 pt-14 text-center sm:pt-20 md:pt-24">
          {/* Deeper than the brand gold: #c8a96a on this background is 2:1
              and fails contrast, this is ~4.5:1. The full stop is inside the
              colour, not left to inherit — it reads as part of the word. */}
          <h2 className="font-heading text-[clamp(2.6rem,8vw,6rem)] leading-none tracking-[-0.03em] text-[#8a6a28] italic">
            Services.
          </h2>
        </div>

        <div
          ref={stageRef}
          className="svc-stage relative flex-1"
          style={
            {
              "--svc-last": SERVICES.length - 1,
              "--svc-step": STEP,
              "--svc-angle": ANGLE,
              "--svc-r": RADIUS,
              "--svc-perspective": PERSPECTIVE,
            } as React.CSSProperties
          }
        >
          {/* Every line is absolutely positioned and derives its own offset
              from --svc-p, so the list reads as a cylinder turning past the
              viewport. */}
          <ul className="svc-list absolute inset-0 flex flex-col items-center justify-center">
            {SERVICES.map((service, i) => (
              <li
                key={service}
                className="svc-item px-5 text-center sm:px-6"
                style={{ "--svc-i": i } as React.CSSProperties}
              >
                {/* The floor drops to 1.05rem so the longest name (44 chars)
                    wraps to at most three lines on a 360px screen — which is
                    what --svc-r's 200px floor is sized to clear. */}
                <span className="font-display mx-auto block max-w-[22ch] text-[clamp(1.05rem,4.6vw,3.6rem)] leading-[1.05] font-extrabold tracking-[-0.02em] text-balance text-neutral-950 sm:max-w-none md:leading-[0.95]">
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
