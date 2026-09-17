import { Container } from "@/components/monad/Container";
import { SectionHeading } from "@/components/monad/SectionHeading";
import { TESTIMONIALS, type Testimonial } from "@/content/testimonials";

/**
 * Testimonials.
 *
 * monad.com has no testimonials, so this is built from the system rather than
 * copied: hairline cards, each quote in the serif (the voice of the client,
 * set like a pull quote in a journal), the name in uppercase mono and the role
 * in Smoke underneath a hairline.
 *
 * The row runs endlessly, the same way as the logo strip: two copies of the
 * cards on one track, translated by half, so the loop has no visible join. It
 * pauses under a pointer so a quote can be read to the end, and the edges fade
 * into the parchment. The second copy is hidden from assistive technology.
 *
 * Every quote is the client's own, word for word.
 */
function Card({ t }: { t: Testimonial }) {
  return (
    <article className="flex h-full w-[min(86vw,460px)] flex-col justify-between rounded-card border border-off-black/20 p-7 sm:p-10">
      <blockquote className="font-serif text-[20px] leading-[1.4] tracking-[-0.01em] text-ink sm:text-subheading sm:leading-[1.35]">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <div className="mt-10 border-t border-ash pt-5">
        <p className="text-body-sm tracking-[0.05em] text-off-black uppercase">{t.name}</p>
        <p className="mt-1 text-body-sm text-smoke">{t.role}</p>
      </div>
    </article>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="scroll-mt-[var(--header-h)] py-16 lg:py-[120px]">
      <Container>
        <SectionHeading id="testimonials-title" title="What founders say about us" />
      </Container>

      <div
        className="marquee mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)] lg:mt-16"
      >
        <div className="flex w-max animate-marquee [animation-duration:90s]">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-label={copy === 0 ? "Testimonials" : undefined}
              aria-hidden={copy === 1 ? "true" : undefined}
              className="flex shrink-0 items-stretch gap-5 pr-5"
            >
              {TESTIMONIALS.map((t) => (
                <li key={t.name}>
                  <Card t={t} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
