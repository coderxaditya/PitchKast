import { Container } from "@/components/flat/Container";
import WorldMap from "@/components/ui/world-map";
import { ARCS, COUNTRIES } from "./countries";
import { ARC_POINTS } from "./projected";

/**
 * Global reach.
 *
 * Sits at the end of About rather than as its own top-level section, because
 * it is the last thing About is claiming: who the team has worked with, and
 * where.
 *
 * The whole band is dark, matching the reference. That puts two dark bands in
 * About — this and the growth system — but the white principles grid sits
 * between them, so they read as separate interruptions rather than one long
 * stretch.
 *
 * Every arc starts in Gurgaon, so the drawing reads as reach outward instead
 * of traffic between arbitrary pairs.
 */
/* The map's geometry is generated, so it can go stale. Comparing the counts
   turns a forgotten `node scripts/build-world-map.mjs` into a build failure
   naming the fix, rather than a map quietly missing a country. */
if (ARC_POINTS.length !== ARCS.length) {
  throw new Error(
    `World map is stale: ${ARC_POINTS.length} generated arcs vs ${ARCS.length} in countries.ts. Run: node scripts/build-world-map.mjs`,
  );
}

export function Reach() {
  return (
    <div className="on-dark bg-ink py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-eyebrow font-bold tracking-[0.12em] text-action uppercase">
            Global Reach
          </p>
          <h3 className="mt-4 text-display-md leading-[1.0] font-extrabold tracking-[-0.03em] text-balance text-white">
            Founders in {COUNTRIES.length} countries chose us.{" "}
            <span className="text-action">Yours could be next.</span>
          </h3>
        </div>

        {/* A 2:1 world map inside a phone's width renders about 327x164,
            where twelve arcs and thirteen markers are simply too small to
            read. Below sm it keeps a legible minimum width and scrolls
            sideways inside its own box — the page itself never scrolls
            horizontally. */}
        <div className="mt-12 overflow-x-auto sm:mt-14 sm:overflow-x-visible">
          <div className="min-w-[32rem] sm:min-w-0">
            <WorldMap />
          </div>
        </div>

        {/* The country row. Four up on a phone would crush the longer labels,
            so it steps 2 / 3 / 4 / 6 with the wider arrangements only at the
            widths that can hold them. */}
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:mt-12 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {COUNTRIES.map((country) => (
            <li
              key={country.code}
              /* White at 6% rather than a border. On this ground that is a
                 clear enough value step to define the card, and it keeps the
                 row flat — no rims, no glow. */
              className="rounded-flat bg-white/[0.06] p-5 transition-all duration-200 hover:scale-[1.03] hover:bg-white/[0.11]"
            >
              <img
                src={`/flags/${country.code.toLowerCase()}.png`}
                alt={country.name}
                width={120}
                height={80}
                loading="lazy"
                decoding="async"
                /* A fixed box with object-cover: the flags run from 1:1 to
                   2:1, and letting each keep its own ratio would leave the row
                   visibly ragged. */
                className="h-7 w-10 rounded-[3px] object-cover"
              />

              {/* Flag, name, count. The ISO code line and the city line that
                  sat here are gone — on a three-line card, a code directly
                  above the name it abbreviates was saying the same thing
                  twice. */}
              <p className="mt-3.5 text-lg leading-snug font-extrabold tracking-[-0.01em] text-balance text-white">
                {country.short}
              </p>
              {/* Blue 400, not the page's Blue 500. Measured on this card:
                  Blue 500 is 4.12:1 and drops to 3.54:1 once hover lightens
                  the ground, so it fails small-text AA in both states. Blue
                  400 reads 5.96 and 5.12. */}
              <p className="mt-2 text-sm font-bold text-blue-400">
                {country.clients} {country.clients === 1 ? "client" : "clients"}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
