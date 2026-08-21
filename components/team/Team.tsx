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

    /* Only the desktop stack is scroll-driven. The width test sits inside the
       handler so a page first painted narrow still wires up when widened. */
    const wide = window.matchMedia("(min-width: 768px)");

    const update = () => {
      if (!wide.matches) return;
      const rect = track.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
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
      className="relative z-10 md:h-[var(--team-track)]"
      style={
        {
          "--team-track": `${TRACK_VH}vh`,
          background: SURFACE,
        } as React.CSSProperties
      }
    >
      {/* ── Mobile: a plain vertical stack of cards. Nothing pinned, nothing
             scroll-driven, no hover — just swipe down through the team. ── */}
      <div className="px-6 py-24 md:hidden">
        <p
          className="font-body text-xs tracking-[0.24em] uppercase"
          style={{ color: ACCENT }}
        >
          (Meet us)
        </p>

        <ul className="mt-12 flex flex-col gap-16">
          {TEAM.map((member, i) => (
            <li key={member.name}>
              <div
                className="overflow-hidden rounded-[1.75rem]"
                style={{ background: FRAME }}
              >
                <img
                  src={member.src}
                  alt={`${member.name}, ${member.role}`}
                  width={member.w}
                  height={member.h}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[484/596] w-full object-cover grayscale"
                />
              </div>

              <div className="mt-6 flex items-baseline justify-between">
                <h3 className="font-body text-2xl font-bold tracking-[-0.01em] text-neutral-950">
                  {member.name}
                </h3>
                <span className="font-body text-xs tabular-nums text-neutral-400">
                  {i + 1}/{TEAM.length}
                </span>
              </div>

              <p
                className="font-body mt-2 text-sm font-medium"
                style={{ color: ACCENT }}
              >
                {member.role}
              </p>
              <p className="font-body mt-4 text-base text-neutral-700 italic">
                {member.line}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Desktop: cards slide up and stack over one another ── */}
      <div
        ref={stageRef}
        className="relative hidden md:sticky md:top-0 md:block md:h-screen md:overflow-hidden"
        style={{ "--team-last": TEAM.length - 1 } as React.CSSProperties}
      >
        <p
          className="font-body absolute top-12 left-1/2 z-20 -translate-x-1/2 text-xs tracking-[0.24em] uppercase"
          style={{ color: ACCENT }}
        >
          (Meet us)
        </p>

        <div className="absolute right-8 bottom-10 z-20 flex items-center gap-4 lg:right-14">
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
            className="team-card absolute inset-0 flex items-center"
            style={
              {
                "--team-i": i,
                zIndex: i + 1,
              } as React.CSSProperties
            }
          >
            {/* Opaque. This band is the card's own surface: as the card slides
                up, its top edge wipes the member beneath from the bottom of
                the screen upward. Leaving it transparent let every member's
                text pile up in the same place. Its height matches the portrait,
                so the wipe line is a single clean edge across both columns. */}
            <div
              className="mx-auto flex w-full max-w-[76rem] items-stretch gap-10 px-8 lg:gap-14 lg:px-14"
              style={{ background: SURFACE }}
            >
              <div
                className="aspect-[484/596] shrink-0 overflow-hidden rounded-[2rem]"
                style={{ width: PORTRAIT_W, background: FRAME }}
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
                <h3 className="font-body text-[clamp(2rem,4.17vw,4.2rem)] leading-[1.02] font-bold tracking-[-0.02em] text-neutral-950">
                  {member.name}
                </h3>
                <p
                  className="font-body mt-5 text-base font-medium"
                  style={{ color: ACCENT }}
                >
                  {member.role}
                </p>
                <p className="font-body mt-7 text-[clamp(1rem,1.5vw,1.35rem)] text-neutral-800 italic">
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
