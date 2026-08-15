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
      initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
      animate={
        play
          ? { filter: "blur(0px)", opacity: 1, y: 0 }
          : { filter: "blur(10px)", opacity: 0, y: 20 }
      }
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      onAnimationComplete={() => {
        if (ref.current) ref.current.style.filter = "";
      }}
    >
      {children}
    </motion.div>
  );
}
