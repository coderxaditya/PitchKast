import { cn } from "@/lib/utils";

/**
 * The 1200px measure.
 *
 * Every section is built on it, so the width lives in one place rather than
 * as a `max-w-*` repeated down the page. The gutter is 24px on a phone and
 * 32px from `sm` up — the page is spacious, and content never reaches an edge.
 */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--shell)] px-6 sm:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
