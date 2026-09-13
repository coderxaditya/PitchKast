"use client";

import { useCallback, useLayoutEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

/**
 * Full-size viewer for the gallery.
 *
 * A native modal `<dialog>`, which is what the previous hand-built overlay was
 * approximating. `showModal()` puts it in the top layer, makes the page behind
 * it inert, keeps Tab inside it and closes on Escape, all without code of our
 * own. What that overlay never did was hand focus back: close it and the
 * keyboard was left at the top of the document. The tile that opened it now
 * gets focus back.
 *
 * Controls are the system's pill: white on the dark backdrop, ink icon, the
 * overlay shadow. Solid rather than translucent, so they look the same on the
 * backdrop and on a bright photograph a phone lays them over.
 */
const CONTROL =
  "grid size-11 place-items-center rounded-full bg-paper text-ink shadow-overlay transition-transform duration-200 hover:scale-105 sm:size-12";

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
  const ref = useRef<HTMLDialogElement>(null);

  const go = useCallback(
    (delta: number) => onIndex((index + delta + images.length) % images.length),
    [index, images.length, onIndex],
  );

  /* Layout effect, so `close()` runs before React removes the element: a modal
     dialog pulled out of the document without being closed skips the steps
     that restore focus. The trigger is also refocused by hand, because not
     every browser restores it. */
  useLayoutEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const trigger = document.activeElement as HTMLElement | null;
    dialog.showModal();

    /* The dialog does not stop the page behind it scrolling. */
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";

    return () => {
      root.style.overflow = previous;
      if (dialog.open) dialog.close();
      trigger?.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-label={alt(index)}
      /* Escape fires `cancel`; let the parent unmount rather than the browser
         closing a dialog React still thinks is open. */
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      /* A click that lands on the dialog itself, rather than on anything in
         it, is a click on the backdrop. */
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-4 backdrop:bg-ink/90 sm:p-8"
    >
      <div
        className="flex h-full w-full items-center justify-center"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <img
          src={images[index]}
          alt={alt(index)}
          className="max-h-full max-w-full rounded-[var(--radius-image)] object-contain"
        />
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className={`absolute top-4 right-4 sm:top-6 sm:right-6 ${CONTROL}`}
      >
        <X className="size-5" strokeWidth={1.75} />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photograph"
            onClick={() => go(-1)}
            className={`absolute top-1/2 left-3 -translate-y-1/2 sm:left-6 ${CONTROL}`}
          >
            <ArrowLeft className="size-5" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            aria-label="Next photograph"
            onClick={() => go(1)}
            className={`absolute top-1/2 right-3 -translate-y-1/2 sm:right-6 ${CONTROL}`}
          >
            <ArrowRight className="size-5" strokeWidth={1.75} />
          </button>
        </>
      )}

      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-paper px-3.5 py-1.5 text-[14px] text-ink tabular-nums shadow-overlay">
        {index + 1} / {images.length}
      </span>
    </dialog>
  );
}
