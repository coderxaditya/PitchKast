import { Container } from "@/components/monad/Container";
import { SectionHeading } from "@/components/monad/SectionHeading";
import { galleryAlt, galleryDims, galleryImages } from "@/content/gallery";

/**
 * The gallery: masonry columns so each photograph keeps its own proportions,
 * in 16px-radius hairline frames. On hover a photo eases in slightly and its
 * frame lifts. View only: the photographs do not open,
 * cannot be dragged out of the page and cannot be selected.
 */
export function Gallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="scroll-mt-[var(--header-h)] py-16 lg:py-[120px]">
      <Container>
        <SectionHeading id="gallery-title" title="Gallery" />
        <ul className="mt-12 columns-2 gap-3 sm:columns-3 lg:mt-16 lg:columns-4 [&>li]:mb-3">
          {galleryImages.map((src, i) => (
            <li key={src} data-reveal className="group break-inside-avoid">
              <div className="overflow-hidden rounded-card border border-off-black/15 transition-shadow duration-500 group-hover:shadow-[0_12px_32px_rgba(36,36,36,0.14)]">
                <img
                  src={src}
                  alt={galleryAlt(i)}
                  width={galleryDims[i][0]}
                  height={galleryDims[i][1]}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="pointer-events-none h-auto w-full transition-transform duration-700 ease-out select-none [-webkit-user-drag:none] group-hover:scale-[1.04]"
                />
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
