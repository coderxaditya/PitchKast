"use client";

import { useEffect, useRef } from "react";

const SERVICES = [
  "Founder & Company Branding",
  "Product & Technology",
  "Growth & Marketing",
  "Sales & Market Expansion",
  "Fundraising & Strategic Growth",
] as const;

/**
 * Scroll length, derived from the list rather than hard-coded.
 *
 * The drum makes SERVICES.length - 1 moves, and each wants a bit over half a
 * viewport to feel deliberate rather than twitchy. Add the pinned pane itself
 * and that is the whole track. Deriving it matters: this was 520vh when the
 * list held twenty-three names, and leaving that number behind for five would
 * have spent five viewports of scrolling on each move.
 */
const STEP_VH = 55;
const TRACK_VH = 100 + (SERVICES.length - 1) * STEP_VH;
/** Fallback spacing, used only by the reduced-motion flat list. */
const STEP = "clamp(3.2rem, 7vh, 5.6rem)";
/**
 * Cylinder geometry. The angle is how far apart lines sit around the drum, and
 * the radius sets how far a line travels backwards as it goes over.
 *
 * 17° was right for twenty-three names: it kept five or so alive either side
 * of the front, and the list was long enough that the drum was always mid-turn.
 * Five names at 17° would span only 68° in total — the whole list sitting near
 * the front at once, barely curving, which is not the effect. 24° spreads the
 * same five across ±48° from the focus, so the far ones genuinely turn away:
 *
 *   +/-1 step -> 24 deg, cos 0.91   near the front, full strength
 *   +/-2      -> 48 deg, cos 0.67   clearly receding
 *   +/-3      -> 72 deg, cos 0.31   nearly edge-on
 *   +/-4      -> 96 deg, cos < 0    gone
 */
const ANGLE = "24deg";
/**
 * Front-of-drum spacing is R·sin(24°) ≈ 0.41R, so the radius has to clear the
 * tallest line or neighbours touch before the curve has even started.
 *
 * This constraint is what used to keep the section off phones entirely. The
 * longest name is now 30 characters and wraps to two lines inside the 22ch cap
 * on a narrow screen, so the radius has to clear two lines:
 *
 *   2 lines x 1.05rem x 1.05 leading  ~=  35px
 *   needed R  =  35 / 0.41            ~=  85px
 *
 * The 200px floor clears that several times over, including on a short
 * landscape phone where 30vh alone would only be ~190px. The wider angle also
 * bought headroom here: at 17° the same two lines needed 121px.
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
                {/* Size: floor and slope both raised, ceiling untouched.
                    3.6rem was right on a large display, so that stays exactly
                    as it was; what changed is how quickly the type reaches it.
                    At 4.6vw the cap only engaged past ~1250px, which left
                    every phone, tablet and smaller laptop reading well under
                    it — 17px on a 375px screen. At 6vw the cap arrives by
                    960px, so everything below grows and everything at the cap
                    is byte-identical to before.

                    The 22ch cap keeps the longest name (30 chars) to two lines
                    on a narrow screen — which is what --svc-r's 200px floor is
                    sized to clear. Released from sm up. */}
                <span className="font-display mx-auto block max-w-[22ch] text-[clamp(1.35rem,6vw,3.6rem)] leading-[1.05] font-extrabold tracking-[-0.02em] text-balance text-neutral-950 sm:max-w-none md:leading-[0.95]">
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
