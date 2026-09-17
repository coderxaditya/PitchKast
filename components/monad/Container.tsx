import { cn } from "@/lib/utils";

/**
 * The page measure: 1432px with 40px gutters, the reference's own container
 * (a 1352px column at 1440). Gutters narrow to 20px on a phone.
 */
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[var(--shell)] px-5 sm:px-10", className)}
      {...props}
    />
  );
}
