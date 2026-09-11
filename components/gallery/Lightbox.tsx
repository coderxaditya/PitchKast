"use client";

import { useCallback, useEffect } from "react";

/**
 * Full-size viewer for the gallery grid.
 *
 * The grid shows scaled-down previews; this is where a photograph is actually
 * seen. It carries its own controls rather than relying on the keyboard
 * alone, because on a phone there is no Escape key and no arrow keys.
 *
 * ---
 * Shared control styling.
 *
 * The fill is opaque, and that is the whole point of it.
 *
 * It was `bg-black/55` — translucent — which meant the control took its
 * appearance from whatever sat behind it. On a desktop the photograph leaves a
 * wide gutter of near-black backdrop, so the buttons read as dark. On a phone
 * the photograph fills the width and the arrows land on top of it, so a bright
 * frame showed straight through and the same control read as a pale, washed
 * disc. Same CSS, two different-looking buttons.
 *
 * A solid fill removes the dependency: the control is one colour in both
 * places, whether it is sitting on the backdrop or on a sunlit photograph.
 * The backdrop blur went with the translucency — there is nothing left to see
 * through, and it was costing a paint.
 */
const CONTROL =
  "grid place-items-center rounded-full border border-white/45 bg-neutral-950 text-white shadow-xl " +
  "transition-colors duration-200 hover:border-white/80 hover:bg-neutral-800 " +
  "h-12 w-12 text-lg sm:h-14 sm:w-14 sm:text-xl";

export function Lightbox({
  images,
  index,
  onIndex,
  onClose,
  alt,
}: {
  images: readonly string[];
  index: number;
  onIndex: (next: number) => void;
  onClose: () => void;
  alt: (i: number) => string;
}) {
  const go = useCallback(
    (delta: number) => onIndex((index + delta + images.length) % images.length),
    [index, images.length, onIndex],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);

    /* Lock the page behind the overlay, so a scroll here does not move the
       grid underneath. */
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [go, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt(index)}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 sm:p-8"
      onClick={onClose}
    >
      <img
        src={images[index]}
        alt={alt(index)}
        /* Without this the click reaches the backdrop and dismisses the very
           photograph that was just opened. */
        onClick={(e) => e.stopPropagation()}
        className="max-h-full max-w-full cursor-default rounded-lg object-contain"
      />

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className={`absolute top-4 right-4 sm:top-6 sm:right-6 ${CONTROL}`}
      >
        &#10005;
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photograph"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className={`absolute top-1/2 left-3 -translate-y-1/2 sm:left-6 ${CONTROL}`}
          >
            &#8592;
          </button>
          <button
            type="button"
            aria-label="Next photograph"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className={`absolute top-1/2 right-3 -translate-y-1/2 sm:right-6 ${CONTROL}`}
          >
            &#8594;
          </button>
        </>
      )}

      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-neutral-950 px-3 py-1 text-xs tabular-nums text-white/80">
        {index + 1} / {images.length}
      </span>
    </div>
  );
}
