"use client";

import { useCallback, useEffect, useState } from "react";

import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { galleryAlt, galleryImages, galleryWall, galleryWallSource } from "./images";

/** The real set — what the viewer pages through, and what the counter counts. */
const IMAGES = galleryImages as unknown as string[];
/** The wall — the same photographs, padded with repeats to fill three columns. */
const WALL = galleryWall as unknown as string[];

/**
 * The parallax grid plus a viewer.
 *
 * The grid crops every photograph to `h-80 object-cover`, which is what makes
 * the columns line up — and also means no photograph is ever seen whole. The
 * viewer is what the page was actually for: click a frame to see the full
 * image, arrows to move along, Escape to leave.
 *
 * Clicks are delegated from this wrapper rather than wired into ParallaxScroll,
 * so that component stays exactly as it ships.
 */
export function GalleryPageView() {
  const [open, setOpen] = useState<number | null>(null);

  const onGridClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const img = (e.target as HTMLElement).closest("img");
    if (!img) return;
    /* Resolve by DOM position, not by src. The wall repeats five photographs,
       so matching on src would always land on the first copy — and the viewer
       then pages the *real* set of ten, which is why the counter reads out of
       ten rather than out of fifteen. */
    const all = [...(e.currentTarget.querySelectorAll("img") as NodeListOf<HTMLImageElement>)];
    const slot = all.indexOf(img as HTMLImageElement);
    if (slot >= 0) setOpen(galleryWallSource(slot));
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % IMAGES.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + IMAGES.length) % IMAGES.length));
    };
    window.addEventListener("keydown", onKey);
    /* The grid is its own scroll container, so locking the page is not enough —
       hide the overflow on the element that actually scrolls. */
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <div onClick={onGridClick} className="[&_img]:cursor-zoom-in">
        <ParallaxScroll
          images={WALL}
          alt={(_src, slot) => galleryAlt(galleryWallSource(slot))}
          className="h-[calc(100svh-13rem)]"
        />
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={galleryAlt(open)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6"
          onClick={() => setOpen(null)}
        >
          <img
            src={IMAGES[open]}
            alt={galleryAlt(open)}
            /* Stop the click from reaching the backdrop, so clicking the photo
               itself does not dismiss the thing you just opened. */
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full cursor-default rounded-lg object-contain"
          />

          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label="Close"
            className="font-body absolute top-6 right-6 grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
          >
            &#10005;
          </button>

          <span className="font-body absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tabular-nums text-white/60">
            {open + 1} / {IMAGES.length}
          </span>
        </div>
      )}
    </>
  );
}
