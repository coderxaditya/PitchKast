import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/monad/Container";
import { SectionHeading } from "@/components/monad/SectionHeading";
import { TEAM } from "@/content/team";

/**
 * The team.
 *
 * Monad uses no photography, so the portraits are held in the system's
 * container language instead: a 16px-radius frame with a hairline, the photo
 * in black and white so the page stays in its warm grayscale. Under each, the
 * name in the serif, the role in uppercase mono, the one-line descriptor in
 * the sans, and a text link with an arrow to LinkedIn.
 */
export function Team() {
  return (
    <section id="team" aria-labelledby="team-title" className="scroll-mt-[var(--header-h)] py-16 lg:py-[120px]">
      <Container>
        <SectionHeading id="team-title" title="The people behind the work" />
        <ul className="mt-12 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {TEAM.map((person) => (
            <li key={person.name}>
              <div className="overflow-hidden rounded-card border border-off-black/20 bg-periwinkle/40">
                <img
                  src={person.src}
                  alt={`${person.name}, ${person.role}`}
                  width={person.w}
                  height={person.h}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="aspect-[4/5] w-full object-cover grayscale select-none"
                />
              </div>
              <h3 className="mt-6 font-serif text-subheading font-normal text-ink">{person.name}</h3>
              <p className="mt-2 text-body-sm tracking-[0.03em] text-graphite uppercase">{person.role}</p>
              <p className="mt-3 font-sans text-body text-off-black/80">{person.line}</p>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 py-1 text-body-sm tracking-[0.05em] text-off-black uppercase underline-offset-4 hover:underline"
              >
                LinkedIn
                <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
