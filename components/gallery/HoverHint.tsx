"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

import styles from "./HoverHint.module.css";

/**
 * How far the cursor must travel inside the section to count as "got it".
 *
 * This is now the *only* thing that dismisses the hint. There is deliberately
 * no timeout: the prompt has one job, and a prompt that disappears on its own
 * while the reader is still sitting still has failed at it.
 */
const LEARNED_DISTANCE = 140;

type Phase = "idle" | "showing" | "leaving" | "done";

/**
 * First-visit coach mark for the gallery's cursor trail.
 *
 * The trail is invisible until the cursor moves, so a reader who scrolls in
 * and pauses sees an empty page with a heading on it and scrolls straight
 * past — the feature simply does not exist for them. A line of text saying
 * "move your cursor" was already there and clearly did not carry.
 *
 * Two conditions gate it, both deliberate:
 *
 *   1. A fine pointer. Same capability test the trail itself uses, so this
 *      never appears on a phone, where there is nothing to hover with.
 *   2. The section is actually on screen, so the prompt arrives when it is
 *      true rather than firing on page load.
 *
 * It shows on every visit, not just the first. Nothing is persisted: the
 * trail is a discovery a reader can easily forget between sessions, and the
 * cost of re-offering is a card that vanishes the instant they move — while
 * the cost of withholding is a section that looks empty.
 *
 * Dismissal is earned rather than timed: 140px of cursor travel inside the
 * section, which is the reader demonstrating they understood. Someone who
 * already knows sees it for a fraction of a second; someone who sits still
 * keeps the instruction in front of them for as long as they need it. Nobody
 * has to find a close button. `pointer-events: none` throughout, so it never
 * intercepts the very gesture it is asking for.
 */
export function HoverHint({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  /* Kept in a ref as well so the dismiss path can read it without becoming a
     dependency and re-registering the listener on every state change. */
  const phaseRef = useRef<Phase>("idle");
  phaseRef.current = phase;
  /* Held in a ref, not a local, because the effect that starts it depends on
     `phase` — so `setPhase("leaving")` immediately re-runs that effect, and a
     cleanup clearing a local timer would cancel the exit before it finished.
     It is cleared once, on real unmount, below. */
  const exitTimerRef = useRef(0);

  useEffect(() => () => window.clearTimeout(exitTimerRef.current), []);

  // ── Should it ever appear? ───────────────────────────────────
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;

    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setPhase("showing");
      },
      /* Half the section on screen. Lower and it fires while the gallery is
         still a sliver at the bottom of the viewport, where the reader is not
         looking yet. */
      { threshold: 0.5 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [sectionRef]);

  // ── Dismissal ────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "showing") return;
    const el = sectionRef.current;
    if (!el) return;

    let origin: { x: number; y: number } | null = null;
    const finish = () => {
      if (phaseRef.current !== "showing") return;
      el.removeEventListener("pointermove", onMove);
      setPhase("leaving");
      /* Long enough for the 0.45s exit animation to finish before the node
         is removed; unmounting mid-animation would make it vanish instead
         of lifting away. */
      exitTimerRef.current = window.setTimeout(() => setPhase("done"), 450);
    };

    const onMove = (event: PointerEvent) => {
      if (!origin) {
        origin = { x: event.clientX, y: event.clientY };
        return;
      }
      const travelled = Math.hypot(
        event.clientX - origin.x,
        event.clientY - origin.y,
      );
      if (travelled >= LEARNED_DISTANCE) finish();
    };

    el.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      el.removeEventListener("pointermove", onMove);
    };
  }, [phase, sectionRef]);

  if (phase === "idle" || phase === "done") return null;

  return (
    <div
      /* Above the trail's own overlay (z-50) and the View all link (z-60) is
         beside it, not under it. Never interactive: the reader's cursor has
         to reach the trail underneath. */
      className="pointer-events-none absolute inset-x-0 bottom-[14%] z-[70] flex justify-center px-6"
      /* Announced once, politely — a screen reader user has no cursor to move
         and should not be interrupted by this. */
      role="status"
      aria-live="polite"
    >
      <div
        className={`${styles.wrap} ${phase === "leaving" ? styles.leaving : ""} flex items-center gap-6 rounded-[1.75rem] border border-black/10 bg-white/80 px-7 py-5 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.28)] backdrop-blur-md`}
      >
        <div className={styles.demo} aria-hidden="true">
          <span className={styles.card} />
          <span className={styles.card} />
          <span className={styles.card} />

          <span className={styles.halo} />
          <svg
            className={styles.cursor}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 3l14 8.5-6.2 1.4L9.6 19 5 3z"
              fill="#1a1a1a"
              stroke="#fff"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="text-left">
          <p className="font-heading text-[1.6rem] leading-none tracking-[-0.02em] text-neutral-900 italic">
            Hover here.
          </p>
          <p className="font-body mt-2 text-[0.8125rem] leading-snug text-neutral-700">
            Move your cursor and the photographs follow.
          </p>
        </div>
      </div>
    </div>
  );
}