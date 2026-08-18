import type { LogoItem } from "@/components/ui/LogoLoop";

/**
 * Placeholder client lockups — a geometric mark plus a wordmark, drawn in
 * `currentColor` so the strip controls its own colour and hover state.
 *
 * These are deliberately invented names. Swapping in the real thing is a
 * one-line change per entry: replace the `node` with
 * `{ src: "/logos/acme.svg", alt: "Acme" }` and LogoLoop renders an <img>
 * instead, re-measuring the track once the image loads.
 */

function Lockup({ mark, name }: { mark: React.ReactNode; name: string }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        {mark}
      </svg>
      <span className="font-body text-xl font-semibold tracking-[-0.01em] whitespace-nowrap">
        {name}
      </span>
    </span>
  );
}

export const partnerLogos: LogoItem[] = [
  {
    title: "Northwind",
    ariaLabel: "Northwind",
    node: (
      <Lockup
        name="Northwind"
        mark={
          <>
            <path d="M3 17L9 7l6 10" />
            <path d="M13 12l4-6 4 11" />
          </>
        }
      />
    ),
  },
  {
    title: "Cobalt",
    ariaLabel: "Cobalt",
    node: (
      <Lockup
        name="Cobalt"
        mark={
          <>
            <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
            <circle cx="12" cy="12" r="3.5" />
          </>
        }
      />
    ),
  },
  {
    title: "Meridian",
    ariaLabel: "Meridian",
    node: (
      <Lockup
        name="Meridian"
        mark={
          <>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M3.5 12h17" />
            <path d="M12 3.5c2.4 2.5 3.6 5.4 3.6 8.5S14.4 18 12 20.5C9.6 18 8.4 15.1 8.4 12S9.6 6 12 3.5Z" />
          </>
        }
      />
    ),
  },
  {
    title: "Halcyon",
    ariaLabel: "Halcyon",
    node: (
      <Lockup
        name="Halcyon"
        mark={
          <>
            <path d="M12 3.5 20.5 12 12 20.5 3.5 12Z" />
            <path d="M12 8.5 15.5 12 12 15.5 8.5 12Z" />
          </>
        }
      />
    ),
  },
  {
    title: "Fathom",
    ariaLabel: "Fathom",
    node: (
      <Lockup
        name="Fathom"
        mark={
          <>
            <path d="M3.5 8.5h17" />
            <path d="M3.5 15.5h17" />
            <path d="M9 3.5 7 20.5" />
            <path d="M17 3.5l-2 17" />
          </>
        }
      />
    ),
  },
  {
    title: "Ardent",
    ariaLabel: "Ardent",
    node: (
      <Lockup
        name="Ardent"
        mark={
          <>
            <path d="M12 3.5c3 4 6 6.4 6 10a6 6 0 0 1-12 0c0-3.6 3-6 6-10Z" />
          </>
        }
      />
    ),
  },
  {
    title: "Solstice",
    ariaLabel: "Solstice",
    node: (
      <Lockup
        name="Solstice"
        mark={
          <>
            <circle cx="12" cy="12" r="4.5" />
            <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M5 5l1.8 1.8M17.2 17.2 19 19M19 5l-1.8 1.8M6.8 17.2 5 19" />
          </>
        }
      />
    ),
  },
  {
    title: "Verity",
    ariaLabel: "Verity",
    node: (
      <Lockup
        name="Verity"
        mark={
          <>
            <path d="M12 3.5 20 7v6c0 4-3.4 6.9-8 7.5-4.6-.6-8-3.5-8-7.5V7Z" />
            <path d="m8.8 12 2.2 2.2 4.2-4.4" />
          </>
        }
      />
    ),
  },
];
