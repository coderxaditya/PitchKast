import { Container } from "@/components/monad/Container";

/**
 * The client circle: a wall of the people PitchKast has worked with, straight
 * after the international reach band so the countries get faces.
 *
 * A peach band (Coral at a low tint over the parchment) with a faint square
 * grid, a small Crimson eyebrow, one centred serif line, then the portraits in
 * rows of five (three on a phone). Each portrait is a greyscale circle in a
 * thin Crimson ring; on hover it takes its colour back and lifts slightly.
 * The photos are the square crops from `scripts/build-client-circle.mjs`.
 *
 * The people are not named here, so each photo is decorative and the list
 * carries one label for the whole wall.
 */
const PORTRAITS = Array.from(
  { length: 15 },
  (_, i) => `/client-circle/web/client-${String(i + 1).padStart(2, "0")}.webp`,
);

const GRID = {
  backgroundImage:
    "linear-gradient(rgba(243,122,10,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(243,122,10,0.07) 1px, transparent 1px)",
  backgroundSize: "32px 32px",
};

export function ClientCircle() {
  return (
    <section aria-labelledby="client-circle-title" className="px-1 py-6 lg:py-10">
      <div className="relative overflow-hidden rounded-band bg-coral/15" style={GRID}>
        <Container className="relative py-16 lg:py-[120px]">
          <div data-reveal className="mx-auto max-w-[52ch] text-center">
            <p className="text-body-sm font-medium tracking-[0.1em] text-crimson uppercase">
              Faces behind the partnerships
            </p>
            <h2
              id="client-circle-title"
              className="mt-4 font-serif text-subheading font-normal text-off-black sm:text-[28px] sm:leading-[1.35]"
            >
              A cross-section of the founders, executives and teams PitchKast
              has partnered with, spanning technology, hospitality, education,
              media and tourism.
            </h2>
          </div>

          <ul
            aria-label="Portraits of PitchKast clients"
            className="mx-auto mt-10 grid max-w-[1000px] grid-cols-3 gap-4 sm:gap-6 md:grid-cols-5 lg:mt-14 lg:gap-8"
          >
            {PORTRAITS.map((src) => (
              <li key={src} data-reveal className="group">
                <div className="aspect-square overflow-hidden rounded-full border-2 border-crimson/70 bg-parchment shadow-[0_6px_20px_rgba(243,122,10,0.12)] transition-transform duration-300 ease-out group-hover:-translate-y-1">
                  <img
                    src={src}
                    alt=""
                    width={320}
                    height={320}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="size-full object-cover grayscale transition-[filter] duration-500 select-none group-hover:grayscale-0"
                  />
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
