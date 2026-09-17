import { Container } from "@/components/monad/Container";
import { LOGOS } from "@/content/logos";

/**
 * Social proof, on monad.com's: a small mono caption, then one row of client
 * marks, black on parchment, moving slowly and endlessly. The marks are already black
 * on white; `mix-blend-multiply` drops their white field into the parchment
 * so no logo shows a box.
 */
export function LogoStrip() {
  const row = (copy: number) => (
    <ul
      aria-hidden={copy === 1 ? "true" : undefined}
      className="flex shrink-0 items-center gap-14 pr-14"
    >
      {LOGOS.map((logo) => (
        <li key={logo.file}>
          <img
            src={`/logos/${logo.file}`}
            alt={copy === 0 ? logo.name : ""}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-10 w-32 object-contain mix-blend-multiply select-none"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Clients" className="py-10 lg:py-14">
      <Container>
        <p className="text-caption tracking-[0.05em] text-smoke uppercase sm:text-body-sm">
          Trusted by founders at
        </p>
      </Container>
      <div className="marquee mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max animate-marquee">
          {row(0)}
          {row(1)}
        </div>
      </div>
    </section>
  );
}
