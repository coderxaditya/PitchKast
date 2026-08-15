/**
 * A stage renderer owns one painting surface and knows how to show an
 * arbitrary frame of the handshake on demand. The scrub controller is
 * deliberately renderer-agnostic: it only ever hands over a frame index
 * and an opening-fade amount.
 */
export interface StageRenderer {
  /** Resolve once the renderer can show any frame without stalling. */
  load(onProgress: (fraction: number) => void): Promise<void>;
  /** Called on mount and on every viewport change. */
  layout(vw: number, vh: number, dpr: number): void;
  /**
   * @param frame 0 … FRAME_COUNT-1
   * @param fade  0 … 1, the rise out of pure black at the top of the page
   */
  render(frame: number, fade: number): void;
  /** Drop listeners and references. */
  dispose(): void;
}
