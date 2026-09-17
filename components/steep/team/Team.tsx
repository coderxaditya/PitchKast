import { Container } from "@/components/steep/Container";
import { TEAM } from "./people";

/**
 * LinkedIn glyph.
 *
 * Hand-drawn rather than imported: this version of lucide dropped its brand
 * icons, and a whole brand-icon package for one mark is not worth the
 * dependency.
 */
function LinkedInMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.4 21.5h5.16V9.24H2.4V21.5Zm7.4-12.26V21.5h5.16v-6.62c0-1.75.33-3.44 2.5-3.44 2.13 0 2.16 2 2.16 3.55v6.51h5.16v-7.54c0-4.47-.97-7.2-6.2-7.2-2.51 0-4.2 1.38-4.89 2.69h-.07V9.24H9.8Z" />
    </svg>
  );
}

/**
 * The team, as the reference's image-over-text column row.
 *
 * steep.app closes its AI section with three columns, each an image at a 16px
 * radius over a 20px title and an 18px line at 60% ink, about 40px apart.
 * That is a team grid in everything but name, so this is that row with a
 * person in each column: photograph, name, role, LinkedIn.
 *
 * Carried over from the previous build, because they were your calls:
 * photographs in black and white, and no one-line descriptors under the
 * names. The descriptors and the full biographies both stay in `people.ts`
 * (the structured data reads them) and neither renders here.
 */
export function Team() {
  return (
    <section
      id="team"
      aria-labelledby="team-title"
      className="scroll-mt-24 bg-sky py-24 lg:py-32"
    >
      <Container>
        <h2
          id="team-title"
          className="font-display text-heading-lg font-normal text-ink"
        >
          Meet us.
        </h2>

        <ul className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {TEAM.map((person) => (
            <li key={person.name} className="group">
              {/* A fixed 4:5 frame. The files run from 200x200 to 1600x1304,
                  and letting each keep its own ratio left the grid ragged. */}
              <div className="overflow-hidden rounded-[var(--radius-small)] bg-mist">
                <img
                  src={person.src}
                  alt={person.name}
                  width={person.w}
                  height={person.h}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  /* Black and white in CSS rather than in the files, so the
                     originals stay in colour and this is one word to undo.
                     The slow, slight scale is the only motion: the reference
                     keeps its surfaces quiet. */
                  className="aspect-[4/5] w-full object-cover grayscale transition-transform duration-700 ease-[cubic-bezier(0,0,0.2,1)] select-none [-webkit-user-drag:none] group-hover:scale-[1.03]"
                />
              </div>

              <h3 className="mt-6 text-body-lg font-medium text-ink">{person.name}</h3>
              <p className="mt-1.5 text-[18px] leading-[1.45] text-ink/60">{person.role}</p>

              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 py-1 text-[16px] font-[430] text-ink underline-offset-4 hover:underline"
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
