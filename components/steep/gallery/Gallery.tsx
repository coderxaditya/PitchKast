import { Container } from "@/components/steep/Container";
import { galleryAlt, galleryDims, galleryImages } from "./images";

/**
 * The gallery.
 *
 * Unchanged in what it is, because each part was a decision made on the
 * previous build: one masonry grid at every width (the phone layout, adopted
 * everywhere), "Gallery" as the heading with nothing above it, no "View all"
 * button.
 *
 * View only: the photographs do not open in a viewer and cannot be dragged
 * out of the page or selected.
 *
 * Restyled to the system: a Fog White band after the white team section, the
 * 64px serif heading left-aligned like every other section, the 12px image
 * radius.
 *
 * Masonry columns rather than a fixed grid, so each photograph keeps its own
 * proportions: the ten files mix portrait, landscape and square, and one box
 * would crop each to a slice.
 */
export function Gallery() {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="scroll-mt-24 bg-fog py-24 lg:py-32"
    >
      <Container>
        <h2
          id="gallery-title"
          className="font-display text-heading-lg font-normal text-ink"
        >
          Gallery
        </h2>

        <ul className="mt-14 columns-2 gap-4 sm:columns-3 lg:mt-20 lg:columns-4 [&>li]:mb-4">
          {galleryImages.map((src, i) => (
            <li key={src} className="break-inside-avoid">
              <div className="overflow-hidden rounded-[var(--radius-image)] bg-mist">
                <img
                  src={src}
                  alt={galleryAlt(i)}
                  /* Intrinsic size, so the box is reserved before the file
                     lands and the columns balance on first paint. */
                  width={galleryDims[i][0]}
                  height={galleryDims[i][1]}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="pointer-events-none h-auto w-full select-none [-webkit-user-drag:none]"
                />
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
