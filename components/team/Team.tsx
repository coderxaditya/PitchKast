import { Container } from "@/components/flat/Container";
import { TEAM } from "./people";

/**
 * LinkedIn glyph.
 *
 * Hand-drawn rather than imported: this version of lucide dropped its brand
 * icons, and pulling in a whole brand-icon package for one mark is not worth
 * the dependency.
 */
function LinkedInMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.4 21.5h5.16V9.24H2.4V21.5Zm7.4-12.26V21.5h5.16v-6.62c0-1.75.33-3.44 2.5-3.44 2.13 0 2.16 2 2.16 3.55v6.51h5.16v-7.54c0-4.47-.97-7.2-6.2-7.2-2.51 0-4.2 1.38-4.89 2.69h-.07V9.24H9.8Z" />
    </svg>
  );
}

/**
 * The team.
 *
 * A plain grid in document flow. What it replaces was a horizontally scrolling
 * stage of stacked cards where one person was readable at a time and the
 * eyebrow went sticky over the content on small screens.
 *
 * Each card shows the photograph, the name, the role and a LinkedIn link. The
 * one-line descriptors and the longer biographies both stay in `people.ts`;
 * neither renders here.
 */
export function Team() {
  return (
    <section
      id="team"
      aria-labelledby="team-title"
      className="scroll-mt-20 bg-canvas py-20 sm:py-24 lg:py-32"
    >
      <Container>
        <h2
          id="team-title"
          className="mx-auto max-w-3xl text-center text-display-lg leading-[0.95] font-extrabold tracking-[-0.03em] text-balance text-ink"
        >
          Meet us.
        </h2>

        <ul className="mt-14 grid gap-x-6 gap-y-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((person) => (
            <li key={person.name}>
              {/* A fixed 4:5 frame with object-cover. The source files run from
                  200x200 to 1600x1304, and letting each keep its own ratio
                  would leave the grid visibly ragged. */}
              <div className="overflow-hidden rounded-flat bg-surface">
                <img
                  src={person.src}
                  alt={person.name}
                  width={person.w}
                  height={person.h}
                  loading="lazy"
                  decoding="async"
                  /* Drag-to-save off, as before. */
                  draggable={false}
                  /* Black and white. Done in CSS rather than by processing the
                     files, so the originals stay in colour and this is one
                     word to undo — and so the structured data still points at
                     the real photographs. */
                  className="aspect-[4/5] w-full object-cover grayscale [-webkit-user-drag:none] select-none"
                />
              </div>

              <h3 className="mt-5 text-2xl leading-tight font-extrabold tracking-[-0.02em] text-balance text-ink">
                {person.name}
              </h3>
              <p className="mt-1.5 leading-snug font-semibold text-pretty text-action-strong">
                {person.role}
              </p>

              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 py-1 text-sm font-semibold text-ink-soft transition-colors duration-200 hover:text-action-strong"
              >
                <LinkedInMark className="size-4" />
                LinkedIn
                <span className="sr-only"> profile for {person.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
