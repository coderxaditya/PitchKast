"use client";

import { useEffect, useRef, useState } from "react";

import { KineticText } from "@/components/ui/kinetic-text";
import { TypingAnimation } from "@/components/ui/typing-animation";

/**
 * The hero headline: typed out first, then handed to Kinetic Text.
 *
 * Magic UI's Typing Animation writes the line character by character with a
 * blinking cursor. When the last character lands, the typed copy is swapped
 * for the Kinetic Text copy, whose letters thicken under the pointer.
 *
 * Both copies share one grid cell. The kinetic copy is there from the first
 * paint, only transparent, so the headline's two lines are reserved and
 * nothing below moves while the text types in; it also carries the words for
 * screen readers throughout, so the typed copy is hidden from them. The
 * typing runs under `prefers-reduced-motion` too: it moves nothing on the
 * page, and skipping it made the headline flash in half typed on phones with
 * the setting on.
 *
 * The typing component reports no "done", so the hand-over watches the typed
 * copy itself and swaps once the whole line is on screen. Timing it instead
 * would swap early whenever the browser slows timers down, as it does in a
 * background tab, and cut the typing off half way.
 */
const DELAY = 300; // ms before the first character
const SPEED = 55; // ms per character

export function HeroHeadline({ text }: { text: string }) {
  const [typed, setTyped] = useState(false);
  const typing = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = typing.current;
    if (!el) return;
    let hold = 0;
    const check = () => {
      /* The cursor is its own span; the typed characters are the text before
         it. Once they spell the whole line, let the last one sit briefly. */
      if (el.textContent?.startsWith(text) && !hold) {
        hold = window.setTimeout(() => setTyped(true), 400);
      }
    };
    const mo = new MutationObserver(check);
    mo.observe(el, { childList: true, characterData: true, subtree: true });
    return () => {
      mo.disconnect();
      window.clearTimeout(hold);
    };
  }, [text]);

  return (
    <h1
      id="hero-title"
      className="mx-auto grid max-w-[21ch] font-serif text-display text-ink [font-optical-sizing:auto]"
    >
      {/* The finished headline: each word is its own Kinetic Text, so the
          line wraps between words rather than inside them. */}
      <span
        className={`col-start-1 row-start-1 transition-opacity duration-300 ${
          typed ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {text.split(" ").map((word, i) => (
          <span key={i}>
            {i > 0 ? " " : null}
            <KineticText as="span" text={word} className="inline-flex" />
          </span>
        ))}
      </span>

      {!typed ? (
        <span ref={typing} aria-hidden="true" className="col-start-1 row-start-1">
          <TypingAnimation
            startOnView={false}
            delay={DELAY}
            typeSpeed={SPEED}
            className="inline leading-[1.2] font-[300] tracking-[-0.02em]"
          >
            {text}
          </TypingAnimation>
        </span>
      ) : null}
    </h1>
  );
}
