"use client";

import { useCallback, useState } from "react";

import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { Lightbox } from "./Lightbox";
import {
  galleryAlt,
  galleryImages,
  galleryWall,
  galleryWallSource,
} from "./images";

/** The real set — what the viewer pages through, and what the counter counts. */
const IMAGES = galleryImages as unknown as string[];
/** The wall — the same photographs, padded with repeats to fill three columns. */
const WALL = galleryWall as unknown as string[];

/**
 * The parallax wall plus the viewer.
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
       so matching on src would always land on the first copy. */
    const all = [
      ...(e.currentTarget.querySelectorAll("img") as NodeListOf<HTMLImageElement>),
    ];
    const slot = all.indexOf(img as HTMLImageElement);
    if (slot >= 0) setOpen(galleryWallSource(slot));
  }, []);

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
        <Lightbox
          images={IMAGES}
          index={open}
          onIndex={setOpen}
          onClose={() => setOpen(null)}
          alt={galleryAlt}
        />
      )}
    </>
  );
}
