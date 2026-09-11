import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * The page's buttons.
 *
 * Flat rules, applied here rather than remembered per use: no shadow at any
 * point, one radius, and feedback carried entirely by scale and colour. The
 * `on*` variants are for the coloured and dark section grounds, where a blue
 * button would vanish into the block behind it — which is why the ground, not
 * the button's role, picks the variant.
 */
const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-flat font-semibold whitespace-nowrap transition-all duration-200 select-none active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /* Light grounds. */
        solid: "bg-action text-white hover:scale-105 hover:bg-action-strong",
        secondary:
          "bg-surface text-ink hover:scale-105 hover:bg-hairline",
        outline:
          "border-4 border-action bg-transparent text-action hover:scale-105 hover:bg-action hover:text-white",

        /* On the amber band, where blue clashes and white would read as a
           second background rather than a control. */
        ink: "bg-ink text-white hover:scale-105 hover:bg-ink/90",

        /* Coloured and dark grounds. */
        onColor:
          "bg-white text-action-strong hover:scale-105 hover:bg-blue-50",
        onColorOutline:
          "border-4 border-white bg-transparent text-white hover:scale-105 hover:bg-white hover:text-action-strong",
      },
      size: {
        /* The system's floor for a comfortable target is h-14; the nav runs
           one step down because it shares a row with the wordmark. */
        lg: "h-16 px-9 text-lg",
        md: "h-14 px-7 text-base",
        sm: "h-11 px-5 text-[0.9375rem]",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
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
  /* `asChild` so a call to action can be a real anchor. A button with an
     onClick loses middle-click, "open in new tab" and the link role. */
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp className={cn(button({ variant, size }), className)} {...props} />
  );
}
