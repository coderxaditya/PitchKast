import { Container } from "@/components/monad/Container";
import { LOGOS } from "@/content/logos";

/**
 * Social proof, on monad.com's: a small mono caption, then one row of client
 * marks, moving slowly and endlessly. The marks are the transparent black
 * cuts from `scripts/build-logo-ink.mjs`, so each floats on the parchment
 * with no box behind it.
 */
export function LogoStrip() {
  const row = (copy: number) => (
    <ul
      aria-hidden={copy === 1 ? "true" : undefined}
      className="flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16"
    >
      {LOGOS.map((logo) => (
        <li key={logo.file}>
          <img
            src={`/logos/ink/${logo.file}`}
            alt={copy === 0 ? logo.name : ""}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-10 w-32 object-contain select-none sm:h-14 sm:w-44"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Clients" className="py-10 lg:py-14">
      <Container>
        <p className="text-label tracking-[0.05em] text-off-black uppercase sm:text-subheading">
          Trusted by founders at
        </p>
      </Container>
      <div className="marquee mt-10 overflow-hidden sm:mt-14 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max animate-marquee">
          {row(0)}
          {row(1)}
        </div>
      </div>
    </section>
  );
}
