import { FRAME_COUNT, VIDEO_DURATION } from "../config";
import { frameRect } from "../math";
import type { StageRenderer } from "./types";

/**
 * Drives a real HTML5 <video> straight from scroll progress.
 *
 * The element never plays on its own — it stays paused for its whole
 * life and we only ever move `currentTime`. Two details keep that from
 * falling apart under a fast scrub:
 *
 *  1. Seeks are coalesced. Assigning `currentTime` while a seek is
 *     already in flight queues work the decoder can never catch up on,
 *     so a pending target is held and applied on `seeked` instead.
 *  2. The last frame is nudged just inside the duration, since seeking
 *     exactly to `duration` parks on the ended state in some browsers.
 *
 * Framing math is shared with the canvas renderer, so the hands enter
 * from the same edges at the same scale either way.
 */
export class VideoRenderer implements StageRenderer {
  private video: HTMLVideoElement;
  private pending: number | null = null;
  private seeking = false;
  private disposed = false;

  private onSeeked = () => {
    this.seeking = false;
    if (this.pending !== null) {
      const t = this.pending;
      this.pending = null;
      this.seek(t);
    }
  };

  constructor(video: HTMLVideoElement) {
    this.video = video;
    video.addEventListener("seeked", this.onSeeked);
  }

  load(onProgress: (fraction: number) => void) {
    return new Promise<void>((resolve) => {
      const v = this.video;

      const report = () => {
        if (!v.duration || !Number.isFinite(v.duration)) return;
        let buffered = 0;
        for (let i = 0; i < v.buffered.length; i++) {
          buffered += v.buffered.end(i) - v.buffered.start(i);
        }
        onProgress(Math.min(buffered / v.duration, 1));
      };

      const done = () => {
        if (this.disposed) return;
        v.removeEventListener("canplaythrough", done);
        v.removeEventListener("progress", report);
        onProgress(1);
        // Park on the first frame so the page opens on black.
        this.seek(0);
        resolve();
      };

      v.addEventListener("progress", report);
      v.addEventListener("canplaythrough", done);
      v.preload = "auto";
      v.pause();
      v.load();

      if (v.readyState >= 4) done();
    });
  }

  layout(vw: number, vh: number) {
    const { x, y, w, h } = frameRect(vw, vh);
    const s = this.video.style;
    s.position = "absolute";
    s.left = `${x}px`;
    s.top = `${y}px`;
    s.width = `${w}px`;
    s.height = `${h}px`;
  }

  render(frame: number, fade: number) {
    this.video.style.opacity = String(fade);

    const ratio = FRAME_COUNT > 1 ? frame / (FRAME_COUNT - 1) : 0;
    // Stay a half-frame inside the end so the final seek lands on the
    // last decoded frame rather than the ended state.
    const t = Math.min(ratio * VIDEO_DURATION, VIDEO_DURATION - 1 / 48);
    this.seek(t);
  }

  private seek(t: number) {
    if (this.disposed) return;
    if (this.seeking) {
      this.pending = t;
      return;
    }
    if (Math.abs(this.video.currentTime - t) < 1 / 240) return;
    this.seeking = true;
    this.video.currentTime = t;
  }

  dispose() {
    this.disposed = true;
    this.video.removeEventListener("seeked", this.onSeeked);
  }
}
