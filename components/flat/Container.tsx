import { cn } from "@/lib/utils";

/**
 * The shell every section's content sits in.
 *
 * One place owns the page's maximum measure and its gutters, so a section can
 * never quietly ship a different width. Sections themselves stay full-bleed —
 * colour blocks have to reach the viewport edges — and put this inside.
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
