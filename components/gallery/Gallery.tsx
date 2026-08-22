"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ImageTrail } from "@/components/ui/image-trail";
import { rememberScroll } from "@/lib/returnScroll";
import { ACCENT, SURFACE, galleryAlt, galleryImages } from "./images";

/* This section is gated on a pointer test rather than a width: the trail
   needs a cursor to follow, which is a capability question, not a size one.

   The variant is written out in full at every use. Tailwind scans source text
   statically, so a class assembled from a constant is never seen and never
   generated — which is exactly how the View all link below first shipped as
   `display: none`. */

export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [warm, setWarm] = useState(false);

  /* Warm the cache as the section approaches, not on page load.
     The trail spawns an <img> at the moment the cursor moves, so an unfetched
     file shows as a blank rectangle on the first pass through — the one pass
     that makes the impression. */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setWarm(true);
        io.disconnect();
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!warm) return;
    galleryImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [warm]);

  return (
    <section
      ref={sectionRef}
      aria-label="Gallery"
      className="relative z-10"
      style={{ background: SURFACE }}
    >
      {/* ── Desktop: the trail ── */}
      <div className="hidden [@media(hover:hover)_and_(pointer:fine)]:block">
        <ImageTrail
          images={galleryImages as unknown as string[]}
          threshold={74}
          minDelay={45}
          duration={1100}
          maxItems={9}
          rotationRange={34}
          imageClassName="w-44 rounded-md lg:w-56"
          className="flex h-[100svh] cursor-crosshair items-center justify-center"
        >
          <div className="pointer-events-none px-6 text-center">
            <p
              className="font-body text-xs tracking-[0.24em] uppercase"
              style={{ color: ACCENT }}
            >
              (Gallery)
            </p>
            <h2 className="font-heading mt-6 text-[clamp(2.6rem,8vw,6rem)] leading-none tracking-[-0.03em] text-[#8a6a28] italic">
              Moments.
            </h2>
            <p className="font-body mt-6 text-sm text-neutral-500">
              Move your cursor to look around.
            </p>
          </div>
        </ImageTrail>
      </div>

      {/* Above the trail overlay, which sits at z-50 and is pointer-events-none,
          so this stays clickable while images sweep over it. */}
      <Link
        href="/gallery"
        /* Note the offset on the way out, so Back can land here rather than at
           the top of the page. */
        onClick={rememberScroll}
        className="font-body absolute right-8 bottom-8 z-[60] hidden items-center gap-2 rounded-full border px-5 py-2.5 text-xs tracking-[0.18em] uppercase transition-colors duration-300 hover:bg-black/[0.04] lg:right-14 lg:bottom-12 [@media(hover:hover)_and_(pointer:fine)]:inline-flex"
        style={{ borderColor: ACCENT, color: ACCENT }}
      >
        View all
        <span aria-hidden="true">&#8599;</span>
      </Link>

      {/* ── Touch: deliberately a placeholder ──
          A cursor trail has no touch equivalent and a different treatment is
          planned here. This is the minimum that does not read as broken.
          `loading="lazy"` matters — without it every one of these would be
          fetched on desktop too, where this branch never shows. */}
      <div className="px-6 py-24 [@media(hover:hover)_and_(pointer:fine)]:hidden">
        <p
          className="font-body text-xs tracking-[0.24em] uppercase"
          style={{ color: ACCENT }}
        >
          (Gallery)
        </p>
        <h2 className="font-heading mt-5 text-[clamp(2.6rem,12vw,4rem)] leading-none tracking-[-0.03em] text-[#8a6a28] italic">
          Moments.
        </h2>

        <ul className="mt-10 grid grid-cols-2 gap-3">
          {galleryImages.map((src, i) => (
            <li key={src} className="overflow-hidden rounded-lg bg-[#e7e4dd]">
              <img
                src={src}
                alt={galleryAlt(i)}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
