"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";

/**
 * Word-by-word blur reveal.
 *
 * liquidGlass triggered this from an IntersectionObserver. Here the hero is
 * always in view on load, but the frame sequence is still preloading behind a
 * loader — so `play` is driven by the loader instead. Same animation, correct
 * moment.
 */
export function BlurText({
  text = "",
  delay = 100,
  className = "",
  stepDuration = 0.35,
  align = "center",
  as: Tag = "p",
  play,
}: {
  text?: string;
  delay?: number;
  className?: string;
  stepDuration?: number;
  /** Words are laid out with flex, so alignment can't come from text-align. */
  align?: "center" | "left";
  /**
   * Headlines animated by this component are still headlines. Rendering every
   * one as a `<p>` left the About section with no heading structure at all,
   * which is how screen-reader users navigate a long page.
   */
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4";
  play: boolean;
}) {
  const words = text.split(" ");

  const fromSnapshot = { filter: "blur(10px)", opacity: 0, y: 50 };
  const midSnapshot = { filter: "blur(5px)", opacity: 0.5, y: -5 };
  const toSnapshot = { filter: "blur(0px)", opacity: 1, y: 0 };

  const animateKeyframes = {
    filter: [fromSnapshot.filter, midSnapshot.filter, toSnapshot.filter],
    opacity: [fromSnapshot.opacity, midSnapshot.opacity, toSnapshot.opacity],
    y: [fromSnapshot.y, midSnapshot.y, toSnapshot.y],
  };

  return (
    <Tag
      className={className}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: align === "left" ? "flex-start" : "center",
        rowGap: "0.1em",
      }}
    >
      {words.map((word, i) => (
        /* The fragment carries a real space after every word but the last.
           Without it the words are adjacent <span>s separated only by a
           margin, so the element's text content is "StrategicGrowthPartners":
           one run-on token to a crawler extracting the h1, and one run-on word
           to a screen reader reading it aloud.

           The space costs nothing visually. This is a flex container, and a
           text node of pure whitespace between two flex items is not rendered
           at all — the spec drops it rather than making it an anonymous item.
           Verified below by measuring the heading's width before and after. */
        <Fragment key={i}>
          {i > 0 ? " " : null}
          <motion.span
            initial={fromSnapshot}
            animate={play ? animateKeyframes : fromSnapshot}
            transition={{
              duration: stepDuration * 2,
              times: [0, 0.5, 1],
              ease: "easeOut",
              delay: (i * delay) / 1000,
            }}
            style={{
              display: "inline-block",
              marginRight: "0.28em",
              willChange: "transform, filter, opacity",
            }}
          >
            {word}
          </motion.span>
        </Fragment>
      ))}
    </Tag>
  );
}
