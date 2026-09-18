import { Container } from "@/components/monad/Container";
import { LinkedInIcon } from "@/components/monad/footer-icons";
import { SectionHeading } from "@/components/monad/SectionHeading";
import { TEAM } from "@/content/team";

/**
 * The team, in one row.
 *
 * Six compact cards side by side from 1280px; below that the same row scrolls
 * sideways with each card snapping into place, rather than stacking into a
 * tall column. Each card is a 16px-radius hairline frame: the photograph in
 * full colour, as supplied, with a round LinkedIn button pinned to its corner;
 * then the name in the serif and the role in small uppercase mono. On hover the photo eases in slightly and a
 * pastel wash (one of Monad's four gradients per card) rises behind the text.
 */
const WASHES = [
  "linear-gradient(rgba(255,148,115,0.8), rgba(160,181,235,0.8))",
  "linear-gradient(rgb(160,181,235), rgb(167,252,205))",
  "linear-gradient(270deg, rgba(226,193,97,0.8), rgba(243,122,10,0.7))",
  "radial-gradient(60% 60% at 30% 40%, rgb(167,252,205), rgb(226,193,97))",
];

export function Team() {
  return (
    <section id="team" aria-labelledby="team-title" className="scroll-mt-[var(--header-h)] py-16 lg:py-[120px]">
      <Container>
        <SectionHeading id="team-title" title="The people behind the work" />
      </Container>

      <Container className="mt-10 lg:mt-14">
        <ul className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-10 sm:scroll-px-10 sm:px-10 xl:mx-0 xl:grid xl:grid-cols-6 xl:overflow-visible xl:px-0 [&::-webkit-scrollbar]:hidden">
          {TEAM.map((person, i) => (
            <li
              key={person.name}
              data-reveal
              className="group relative flex w-[220px] shrink-0 snap-start flex-col overflow-hidden rounded-card border border-off-black/20 p-2 xl:w-auto"
            >
              <div
                aria-hidden="true"
                className="wash right-[-30%] bottom-[-40%] h-[60%] w-[90%] opacity-0 transition-opacity duration-500 group-hover:opacity-80"
                style={{ background: WASHES[i % WASHES.length] }}
              />

              <div className="relative overflow-hidden rounded-[10px] bg-periwinkle/40">
                <img
                  src={person.src}
                  alt={`${person.name}, ${person.role}`}
                  width={person.w}
                  height={person.h}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out select-none group-hover:scale-[1.04]"
                />
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${person.name} on LinkedIn`}
                  className="absolute top-2 right-2 flex size-9 items-center justify-center rounded-pill bg-parchment/90 text-off-black transition-colors hover:bg-lake hover:text-parchment"
                >
                  <LinkedInIcon className="size-3.5" />
                </a>
              </div>

              <div className="relative flex flex-1 flex-col px-2 pt-4 pb-3">
                <h3 className="font-serif text-[20px] leading-[1.2] font-normal text-ink">{person.name}</h3>
                <p className="mt-1.5 text-caption leading-[1.35] tracking-[0.03em] text-graphite uppercase">
                  {person.role}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
