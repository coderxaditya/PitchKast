import {
  Blocks,
  Megaphone,
  Presentation,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

/**
 * Icon and accent for each service, parallel to `SERVICES` by index.
 *
 * Kept out of `offerings.ts` so that file stays pure content, and out of
 * `Services.tsx` so the navbar's dropdown can show the same icons without
 * importing a section it has nothing else to do with.
 *
 * Class strings are written out whole. Tailwind scans source statically, so a
 * class assembled from a variable is never generated.
 */
export const LOOKS: {
  icon: LucideIcon;
  card: string;
  hover: string;
  mark: string;
  chip: string;
}[] = [
  {
    icon: Megaphone,
    card: "bg-blue-50",
    hover: "group-hover:bg-blue-100",
    mark: "text-action-strong",
    chip: "bg-blue-50 text-action-strong",
  },
  {
    icon: Blocks,
    card: "bg-emerald-50",
    hover: "group-hover:bg-emerald-100",
    mark: "text-emerald-700",
    chip: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: Target,
    card: "bg-amber-50",
    hover: "group-hover:bg-amber-100",
    mark: "text-amber-700",
    chip: "bg-amber-50 text-amber-700",
  },
  {
    icon: TrendingUp,
    card: "bg-blue-50",
    hover: "group-hover:bg-blue-100",
    mark: "text-action-strong",
    chip: "bg-blue-50 text-action-strong",
  },
  {
    icon: Presentation,
    card: "bg-emerald-50",
    hover: "group-hover:bg-emerald-100",
    mark: "text-emerald-700",
    chip: "bg-emerald-50 text-emerald-700",
  },
];
