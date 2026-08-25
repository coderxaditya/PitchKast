"use client";

import { useEffect, useRef, useState } from "react";

/* The roster lives in ./people so the structured data can read it too; see
   the note there. Re-exported so this module stays the name everything else
   already imports. */
export { TEAM } from "./people";
import { TEAM } from "./people";

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
 * Capped on height first: at 0.812 aspect, 26svh of width is ~32svh of
 * height. That is deliberately small — each card now carries a name, a role,
 * a one-liner and two paragraphs of biography, and all of it has to fit
 * inside one 100svh pane without running under the counter. 50vw takes over
 * on a wide-but-short screen.
 */
const PORTRAIT_W_SM = "min(50vw, 26svh)";

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
      id="team"
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
        {/* sm and up only. Below that this same label is rendered inside each
            card instead — see the per-card copy further down. Here it is a
            child of the pinned stage, so it holds still while cards slide
            past; on a phone that read as a stuck label pinned over the
            portrait rather than as part of the section. */}
        <p
          className="font-body absolute top-7 left-1/2 z-20 hidden -translate-x-1/2 text-xs tracking-[0.24em] uppercase sm:top-12 sm:block"
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
            className="font-body text-sm tabular-nums text-neutral-700"
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
            {/* Below sm: a single column that starts at the top of the pane
                and reserves its bottom for the counter (pb-16), so the last
                line of biography can never run underneath it. The card itself
                is `items-center` on the article, which centred a column that
                is now taller than the pane and pushed its head off-screen —
                `self-start` overrides that below sm only. */}
            <div className="mx-auto flex h-full w-full max-w-[76rem] flex-col items-center gap-[clamp(0.75rem,2svh,1.25rem)] px-6 pt-[clamp(1rem,3svh,1.75rem)] pb-14 text-center sm:h-auto sm:flex-row sm:items-stretch sm:gap-10 sm:px-8 sm:py-0 sm:text-left lg:gap-14 lg:px-14">
              <p
                className="font-body text-xs tracking-[0.24em] uppercase sm:hidden"
                style={{ color: ACCENT }}
              >
                (Meet us)
              </p>

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
                  /* These are photographs of real, named people, so the drag
                     gesture that lifts a copy out of the page is switched off.

                     Both halves are needed: `-webkit-user-drag` is what Chrome,
                     Safari and Edge honour, and Firefox ignores it entirely and
                     answers only to the `draggable` attribute. `select-none`
                     stops the portrait being caught up in a text selection that
                     starts in the copy beside it, which is the other way a drag
                     picks the image up.

                     Scoped to these six images on purpose. It is a deterrent
                     against the accidental drag, not protection — right-click
                     and Save Image is untouched, and anything stronger would
                     mean watermarking or serving a lower resolution. */
                  draggable={false}
                  className="h-full w-full object-cover grayscale select-none [-webkit-user-drag:none]"
                />
              </div>

              {/* items-stretch keeps this column the portrait's full height, so
                  the band covers the same vertical span in both columns and the
                  wipe edge stays a single clean line. The text sits at the top
                  of that span; the rest is deliberate empty surface. */}
              <div className="flex min-w-0 w-full flex-1 flex-col text-left sm:w-auto sm:py-1 sm:text-left">
                <div className="flex items-center gap-3 sm:gap-4">
                  <h3 className="font-body text-[clamp(1.3rem,3.4svh,4.2rem)] leading-[1.02] font-bold tracking-[-0.02em] text-balance text-neutral-950 sm:text-[clamp(2rem,4.17vw,4.2rem)]">
                    {member.name}
                  </h3>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name}'s LinkedIn`}
                      className="flex size-8 items-center justify-center rounded-full bg-neutral-100 sm:size-10 text-neutral-700 hover:bg-neutral-200 hover:text-black transition-colors shrink-0"
                    >
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="size-4 sm:size-5">
                        <title>LinkedIn</title>
                        <path
                          fill="currentColor"
                          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                        />
                      </svg>
                    </a>
                  )}
                </div>
                <p
                  className="font-body mt-[clamp(0.35rem,1svh,0.5rem)] text-[clamp(0.75rem,1.75svh,0.875rem)] leading-snug font-medium text-balance sm:mt-5 sm:text-base"
                  style={{ color: ACCENT }}
                >
                  {member.role}
                </p>
                <p className="font-body mt-[clamp(0.5rem,1.5svh,0.75rem)] text-[clamp(0.8125rem,2svh,1.35rem)] leading-snug text-pretty text-neutral-800 italic sm:mt-7 sm:text-[clamp(1rem,1.5vw,1.35rem)]">
                  {member.line}
                </p>
                {/* The biography reads as body copy now, not as a footnote:
                    one Tailwind step up at every width (14 -> 16px on sm,
                    15 -> 17px on lg, and the mobile clamp raised in both floor
                    and ceiling), and lifted from neutral-600 to neutral-800 —
                    600 on this light surface sat around 4.6:1 and rendered as
                    grey filler; 800 reads as content while the gold role line
                    keeps the accent. Mobile sizes stay svh-driven because the
                    whole card must fit one 100svh pane above the counter; the
                    overflow probe below re-verifies the worst case. */}
                <div className="font-body mt-[clamp(0.5rem,1.75svh,0.875rem)] max-w-2xl space-y-[clamp(0.375rem,1.25svh,0.625rem)] text-[clamp(0.75rem,1.85svh,0.9375rem)] leading-[1.55] text-neutral-800 sm:mt-6 sm:space-y-3 sm:text-base sm:leading-relaxed lg:text-[1.0625rem]">
                  {member.description.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
