import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * The pill.
 *
 * Two variants and they are a matched pair: the system asks for every filled
 * primary to be paired with a ghost secondary on the same row, sharing the
 * geometry so they read as one control group. `link` is the third, lowest
 * emphasis form — no box at all, the arrow glyph carries the affordance and
 * the underline appears only on hover.
 *
 * `rounded-full` everywhere. The system permits no other radius on a button.
 */
const button = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        /* Ink on paper. The only dark surface in the system. */
        filled:
          "rounded-full bg-ink text-paper hover:scale-[1.03] active:scale-100",
        /* Same pill, hairline of ink, transparent fill. */
        ghost:
          "rounded-full border border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
        /* Inline text. No padding box to grow, so hover is the underline. */
        link: "text-ink underline-offset-4 hover:underline",
      },
      size: {
        lg: "h-12 px-6 text-[17px] font-[430]",
        md: "h-11 px-5 text-[16px] font-[430]",
        sm: "h-9 px-4 text-[15px] font-[430]",
      },
    },
    compoundVariants: [
      /* The link variant has no height or horizontal box — the size tokens
         above would give it one. */
      { variant: "link", class: "h-auto px-0" },
    ],
    defaultVariants: { variant: "filled", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof button> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp className={cn(button({ variant, size }), className)} {...props} />
  );
}
