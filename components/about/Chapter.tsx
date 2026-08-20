"use client";

import type { ReactNode } from "react";

import { Rise } from "@/components/motion/Rise";
import { cn } from "@/lib/utils";

/**
 * The shell every chapter shares: an anchor id for the rail, the eyebrow and
 * hairline that head it, and the vertical rhythm between chapters.
 *
 * Previously each panel re-declared this markup with slightly different
 * margins and sizes. Centralising it is what lets the seven read as one
 * system rather than seven boxes that happen to sit near each other.
 *
 * `full` opts a chapter out of the reading shell and lets it run the whole
 * width — reserved for the two moments that are meant to interrupt.
 */
export function Chapter({
  id,
  index,
  title,
  inView,
  full = false,
  className,
  children,
}: {
  id: string;
  index: string;
  title: string;
  inView: boolean;
  full?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-label`}
      className={cn("relative scroll-mt-24", className)}
    >
      <Rise delay={0} play={inView}>
        <div className="flex items-baseline gap-4">
          <span
            id={`${id}-label`}
            className="font-body text-eyebrow text-gold shrink-0 tracking-[0.3em] uppercase"
          >
            {index} &mdash; {title}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "h-px flex-1 origin-left bg-gradient-to-r from-white/18 to-transparent transition-transform duration-1000 ease-out",
              inView ? "scale-x-100" : "scale-x-0",
            )}
          />
        </div>
      </Rise>

      <div className={cn("mt-10 lg:mt-14", full ? "" : "max-w-none")}>
        {children}
      </div>
    </section>
  );
}
