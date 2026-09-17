import { cn } from "@/lib/utils";

/**
 * A section's title block: the serif at 48px weight 400, optionally with a
 * mono lead underneath in Graphite. Left-aligned, as every Monad section is,
 * unless a section asks for centre.
 */
export function SectionHeading({
  id,
  title,
  lead,
  center,
  className,
}: {
  id: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(center && "mx-auto text-center", className)}>
      <h2 id={id} className="font-serif text-heading-lg font-normal text-off-black">
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            "mt-4 max-w-[60ch] text-body-lg text-graphite",
            center && "mx-auto",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
