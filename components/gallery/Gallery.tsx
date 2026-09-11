"use client";

import { useState } from "react";
import { Container } from "@/components/flat/Container";
import { Lightbox } from "./Lightbox";
import { galleryAlt, galleryDims, galleryImages } from "./images";

/**
 * The gallery.
 *
 * One grid, the same at every width. What it replaces was two entirely
 * different sections behind a pointer test: a full-screen cursor trail on
 * desktop, where the photographs only existed while the mouse was moving and a
 * coach mark had to teach people that, and a plain grid on touch. The plain
 * grid was the one that worked, so it is now the only one.
 *
 * Masonry columns rather than a fixed grid, so each photograph keeps its own
 * proportions. The ten files are a mix of portrait, landscape and square, and
 * forcing them into one box crops each of them to a slice.
 */
export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="scroll-mt-20 bg-surface py-20 sm:py-24 lg:py-32"
    >
      <Container>
        {/* "Gallery" is the heading now rather than a label above one — with
            "Moments." gone there was nothing left for it to label. */}
        <h2
          id="gallery-title"
          className="text-display-lg leading-[0.95] font-extrabold tracking-[-0.03em] text-ink"
        >
          Gallery
        </h2>

        {/* A button, not a bare image: this is the way into the viewer, and it
            should answer to a keyboard and a screen reader as well as a tap. */}
        <ul className="mt-12 columns-2 gap-4 sm:mt-14 sm:columns-3 lg:columns-4 [&>li]:mb-4">
          {galleryImages.map((src, i) => (
            <li key={src} className="break-inside-avoid">
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Open ${galleryAlt(i)}`}
                className="block w-full overflow-hidden rounded-flat bg-hairline transition-transform duration-200 hover:scale-[1.02]"
              >
                <img
                  src={src}
                  alt={galleryAlt(i)}
                  /* Intrinsic size, so the box is reserved before the file
                     lands and the columns balance correctly on first paint. */
                  width={galleryDims[i][0]}
                  height={galleryDims[i][1]}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full"
                />
              </button>
            </li>
          ))}
        </ul>
      </Container>

      {open !== null && (
        <Lightbox
          images={galleryImages}
          index={open}
          onIndex={setOpen}
          onClose={() => setOpen(null)}
          alt={galleryAlt}
        />
      )}
    </section>
  );
}
