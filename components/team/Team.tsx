"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The team. These are real, named people — every field here is attributable to
 * them, so treat it as you would a quote in print.
 *
 * `line` is a one-line descriptor condensed from each person's own bio. It is
 * written *about* them, not presented as something they said, which is why it
 * renders without quotation marks.
 *
 * Photos live in `public/team/`. `w`/`h` are each file's true pixel size; they
 * only reserve the right aspect while the file loads, since the frame owns its
 * own dimensions. The frame is 484:596 (0.81), and `object-cover` centre-crops
 * whatever does not match — square and landscape sources lose their sides.
 */
const TEAM = [
  {
    name: "Soham Goel",
    role: "Founder & CEO, PitchKast",
    line: "Helping founders turn ideas into credibility.",
    src: "/team/soham-goel.jpeg",
    w: 960,
    h: 1280,
  },
  {
    name: "Manish Goel",
    role: "Co-Founder & Head of Innovation Cell, PitchKast",
    line: "Turning ideas into scalable solutions.",
    src: "/team/manish-goel.jpeg",
    w: 800,
    h: 800,
  },
  {
    name: "Mohit Garg",
    role: "Global Business Head & HR Team Lead, PitchKast",
    line: "Growing the business and the team behind it.",
    src: "/team/mohit-garg.jpeg",
    w: 1600,
    h: 1425,
  },
  {
    name: "Aditya T",
    role: "Head of Tech Department & Product Manager, PitchKast",
    line: "Bridging technical execution and product strategy.",
    src: "/team/aditya-t.jpeg",
    w: 786,
    h: 1280,
  },
  {
    name: "Sachin Bansal",
    role: "Advisor, PitchKast",
    line: "Strategic guidance on technology and scale.",
    src: "/team/sachin-bansal.jpeg",
    w: 200,
    h: 200,
  },
  {
    name: "Shelly G",
    role: "Head of Training Department, PitchKast",
    line: "Fifteen years building industry-ready talent.",
    src: "/team/shelly-g.png",
    w: 646,
    h: 1094,
  },
] as const;

/** Roughly one viewport per member, matching the reference's pacing. */
const TRACK_VH = TEAM.length * 90;

/**
 * Portrait size, taken from the reference: 484x596 at a 1440x900 viewport.
 * That is 33.6vw wide, but width alone would grow taller than a short laptop
 * can show, so it is also capped against height — 596/900 = 66vh tall, which
 * back-converts to 53.6vh of width at this aspect. Whichever binds first wins,
 * and the frame stays 484:596 either way.
 */
const PORTRAIT_W = "min(33.6vw, 53.6vh)";

/**
 * Portrait size below sm, where the card stacks vertically instead of running
 * as two columns — so the portrait shares the viewport's height with the name,
 * role and line beneath it rather than sitting beside them.
 *
 * Capped on height first: at 0.812 aspect, 37svh of width is 45.6svh of
 * height, which leaves a little over half the pane for the text block and the
 * eyebrow. 70vw takes over on a wide-but-short screen.
 */
const PORTRAIT_W_SM = "min(70vw, 37svh)";

/**
 * Our light surface, shared with Services so the two read as one continuous
 * light chapter rather than two differently-white blocks.
 *
 * The card bands below must use this exact value: they are opaque only so the
 * incoming card can wipe the outgoing one, and any difference from the section
 * behind them would draw that wipe edge as a visible line.
 */
const SURFACE = "#f4f3f0";

/**
 * Brand gold, darkened for light surfaces. The reference's #ff3c00 orange is
 * that template's identity, not ours; our own --color-gold (#c8a96a) is only
 * 2:1 here and fails AA at the 16px the role is set in. This is ~4.5:1 and is
 * the same value the Services heading already uses.
 */
const ACCENT = "#8a6a28";

/** Warm neutral for the portrait frame, in-family with SURFACE. */
const FRAME = "#e7e4dd";

export function Team() {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    const update = () => {
      const rect = track.getBoundingClientRect();

      /* The pinned pane's own height, not innerHeight. It is sized in svh —
         the viewport with mobile browser chrome *showing* — while innerHeight
         grows as that chrome retracts, which would drift progress mid-scroll
         by however tall the address bar is. */
      const distance = rect.height - stage.offsetHeight;
      const progress =
        distance <= 0 ? 0 : Math.min(Math.max(-rect.top / distance, 0), 1);

      /* One property drives all six cards; CSS does the per-card maths. */
      stage.style.setProperty("--team-p", progress.toFixed(5));

      /* State only for the counter, which changes six times in total. */
      const index = Math.min(
        TEAM.length - 1,
        Math.round(progress * (TEAM.length - 1)),
      );
      setActive((current) => (current === index ? current : index));
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
      aria-label="Meet us"
      /* svh, not vh: on mobile `vh` is the *largest* viewport, which would make
         the track taller than the distance actually scrolled and leave the last
         member unreached. */
      className="relative z-10 h-[var(--team-track)]"
      style={
        {
          "--team-track": `${TRACK_VH}svh`,
          background: SURFACE,
        } as React.CSSProperties
      }
    >
      {/* One pinned stack at every width. Cards slide up and over one another;
          below sm each card lays itself out as a column instead of two. */}
      <div
        ref={stageRef}
        className="sticky top-0 h-[100svh] overflow-hidden"
        style={{ "--team-last": TEAM.length - 1 } as React.CSSProperties}
      >
        <p
          className="font-body absolute top-7 left-1/2 z-20 -translate-x-1/2 text-xs tracking-[0.24em] uppercase sm:top-12"
          style={{ color: ACCENT }}
        >
          (Meet us)
        </p>

        <div className="absolute right-6 bottom-6 z-20 flex items-center gap-3 sm:right-8 sm:bottom-10 sm:gap-4 lg:right-14">
          <span
            aria-hidden="true"
            className="block h-2 w-2 rotate-45"
            style={{ background: ACCENT }}
          />
          <span
            className="font-body text-sm tabular-nums text-neutral-500"
            aria-live="polite"
          >
            {active + 1}/{TEAM.length}
          </span>
        </div>

        {TEAM.map((member, i) => (
          <article
            key={member.name}
            /* The card's opaque surface is this element, spanning the whole
               pinned pane, so every card covers exactly the same rectangle.

               It used to be the inner row, which shrink-wrapped its content —
               and content height varies per member. Aditya's role wraps to a
               second line, making his band 496px against everyone else's 453.
               A shorter card sliding up over him could not cover his last
               43px, so his line bled out from under the incoming card. Sizing
               the surface to the pane instead of the text removes the whole
               class of bug: coverage no longer depends on what anyone's role
               happens to say. */
            className="team-card absolute inset-0 flex items-center"
            style={
              {
                "--team-i": i,
                zIndex: i + 1,
                background: SURFACE,
              } as React.CSSProperties
            }
          >
            {/* Opaque. This band is the card's own surface: as the card slides
                up, its top edge wipes the member beneath from the bottom of
                the screen upward. Leaving it transparent let every member's
                text pile up in the same place. Its height matches the portrait,
                so the wipe line is a single clean edge across both columns.

                Below sm it becomes a single centred column — portrait above,
                text below — and the same wipe still works, because the band is
                still one opaque rectangle covering everything the card draws. */}
            <div className="mx-auto flex w-full max-w-[76rem] flex-col items-center gap-6 px-6 text-center sm:flex-row sm:items-stretch sm:gap-10 sm:px-8 sm:text-left lg:gap-14 lg:px-14">
              <div
                className="aspect-[484/596] w-[var(--portrait-sm)] shrink-0 overflow-hidden rounded-[1.5rem] sm:w-[var(--portrait)] sm:rounded-[2rem]"
                style={
                  {
                    "--portrait-sm": PORTRAIT_W_SM,
                    "--portrait": PORTRAIT_W,
                    background: FRAME,
                  } as React.CSSProperties
                }
              >
                <img
                  src={member.src}
                  alt={`${member.name}, ${member.role}`}
                  width={member.w}
                  height={member.h}
                  decoding="async"
                  loading={i === 0 ? "eager" : "lazy"}
                  className="h-full w-full object-cover grayscale"
                />
              </div>

              {/* items-stretch keeps this column the portrait's full height, so
                  the band covers the same vertical span in both columns and the
                  wipe edge stays a single clean line. The text sits at the top
                  of that span; the rest is deliberate empty surface. */}
              <div className="flex min-w-0 flex-1 flex-col py-1">
                <h3 className="font-body text-[clamp(1.6rem,7vw,4.2rem)] leading-[1.02] font-bold tracking-[-0.02em] text-balance text-neutral-950 sm:text-[clamp(2rem,4.17vw,4.2rem)]">
                  {member.name}
                </h3>
                <p
                  className="font-body mt-3 text-sm font-medium text-balance sm:mt-5 sm:text-base"
                  style={{ color: ACCENT }}
                >
                  {member.role}
                </p>
                <p className="font-body mt-4 text-[clamp(0.95rem,3.6vw,1.35rem)] text-pretty text-neutral-800 italic sm:mt-7 sm:text-[clamp(1rem,1.5vw,1.35rem)]">
                  {member.line}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
