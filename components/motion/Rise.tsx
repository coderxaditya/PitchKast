"use client";

import { motion } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * liquidGlass's `rise()` entrance, as a component.
 *
 * One addition: the inline `filter` is stripped once the animation settles.
 * Framer leaves `filter: blur(0px)` on the element, and a filter of any length
 * makes it a backdrop root — which would cut the `.liquid-glass` children
 * inside off from the video behind and render them as flat plates.
 */
export function Rise({
  delay,
  play,
  className,
  children,
}: {
  delay: number;
  play: boolean;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className={className}
      /* 6px of travel and a 4px blur, down from 20px and 10px. The heavy
         version read as a whole panel assembling itself, which is fine when
         you are already looking at it and useless when you are scrolling
         past — at 10px of blur the copy is unreadable for most of the
         animation, so the reader sees a smear and keeps going. */
      initial={{ filter: "blur(4px)", opacity: 0, y: 6 }}
      animate={
        play
          ? { filter: "blur(0px)", opacity: 1, y: 0 }
          : { filter: "blur(4px)", opacity: 0, y: 6 }
      }
      transition={{ duration: 0.42, ease: "easeOut", delay }}
      onAnimationComplete={() => {
        /* Only strip the filter once settled *visible*. Clearing it on the way
           out would also wipe the blur(10px) the next entry needs to animate
           from, so a replayed reveal would fade in without ever blurring. */
        if (play && ref.current) ref.current.style.filter = "";
      }}
    >
      {children}
    </motion.div>
  );
}
