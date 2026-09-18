import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * The pill.
 *
 * Measured off monad.com: 48px tall, 12px 32px padding, 100px radius, the mono
 * face at 18px uppercase with 0.05em tracking. Three fills:
 *
 *  · `lake`: the single primary action on a screen. Nowhere else.
 *  · `dark`: Off-Black, the everyday action.
 *  · `ghost`: a hairline of Off-Black on the canvas.
 *
 * Hover is a small darken or fill, never a lift: the system has no shadows.
 */
const pill = cva(
  "inline-flex h-12 items-center justify-center gap-2 rounded-pill px-6 font-mono text-[15px] leading-none tracking-[0.05em] whitespace-nowrap uppercase transition-colors duration-200 sm:px-8 sm:text-[18px]",
  {
    variants: {
      variant: {
        lake: "bg-lake text-parchment hover:bg-[#2249b0]",
        dark: "bg-off-black text-parchment hover:bg-ink",
        ghost:
          "border border-off-black bg-transparent text-off-black hover:bg-off-black hover:text-parchment",
      },
      size: {
        md: "",
        sm: "h-10 px-5 text-[14px] sm:px-6 sm:text-[15px]",
      },
    },
    defaultVariants: { variant: "dark", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof pill> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp className={cn(pill({ variant, size }), className)} {...props} />;
}

/** The trailing ▸ Monad sets after a primary label. */
export function Caret() {
  return (
    <svg viewBox="0 0 8 12" aria-hidden="true" className="size-3 shrink-0 fill-current">
      <path d="M0 0l8 6-8 6z" />
    </svg>
  );
}

/* A Hyper Text label inside a pill: undo the component's demo styling (4xl,
   bold, padding) so the label keeps the pill's own type. */
export const HYPER = "py-0 text-[length:inherit] leading-none font-normal";
