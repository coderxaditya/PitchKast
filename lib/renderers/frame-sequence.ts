import {
  FRAME_COUNT,
  PRELOAD_CONCURRENCY,
  framePath,
} from "../scrub-config";
import { frameRect } from "../stage-math";
import type { StageRenderer } from "./types";

/**
 * Paints a fully decoded image sequence to a canvas.
 *
 * This is the default renderer. Seeking a <video> snaps to the nearest
 * keyframe and has to re-decode forward from it, which shows up as
 * notchy playback under a scrub — especially in reverse, where every
 * step is a fresh backward seek. A preloaded sequence has no such
 * asymmetry: frame N costs exactly the same whichever direction you
 * arrived from, so forward and reverse feel identical.
 */
export class FrameSequenceRenderer implements StageRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private frames: (HTMLImageElement | undefined)[] = new Array(FRAME_COUNT);
  private vw = 0;
  private vh = 0;
  /** Cache key of the last thing actually drawn. */
  private painted = "";
  private disposed = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) throw new Error("2D canvas context unavailable");
    this.ctx = ctx;
  }

  load(onProgress: (fraction: number) => void) {
    return new Promise<void>((resolve) => {
      let loaded = 0;
      let cursor = 0;

      const bump = () => {
        if (this.disposed) return;
        loaded++;
        onProgress(loaded / FRAME_COUNT);
        if (loaded === FRAME_COUNT) resolve();
        else next();
      };

      const next = () => {
        if (cursor >= FRAME_COUNT || this.disposed) return;
        const i = cursor++;
        const img = new Image();
        img.decoding = "async";
        img.onload = bump;
        img.onerror = bump; // a dropped frame must not stall the page
        img.src = framePath(i);
        this.frames[i] = img;
      };

      for (let i = 0; i < PRELOAD_CONCURRENCY; i++) next();
    });
  }

  layout(vw: number, vh: number, dpr: number) {
    this.vw = vw;
    this.vh = vh;

    this.canvas.width = Math.round(vw * dpr);
    this.canvas.height = Math.round(vh * dpr);
    this.canvas.style.width = `${vw}px`;
    this.canvas.style.height = `${vh}px`;

    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.ctx.imageSmoothingQuality = "high";

    this.painted = ""; // force a repaint at the new size
  }

  render(frame: number, fade: number) {
    const key = `${frame}:${fade.toFixed(3)}`;
    if (key === this.painted) return;

    const img = this.frames[frame];
    if (!img || !img.complete || !img.naturalWidth) return;

    const { x, y, w, h } = frameRect(this.vw, this.vh);

    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.vw, this.vh);

    if (fade > 0) {
      this.ctx.globalAlpha = fade;
      this.ctx.drawImage(img, x, y, w, h);
      this.ctx.globalAlpha = 1;
    }
    this.painted = key;
  }

  dispose() {
    this.disposed = true;
    for (const img of this.frames) {
      if (img) {
        img.onload = null;
        img.onerror = null;
      }
    }
    this.frames = [];
  }
}
