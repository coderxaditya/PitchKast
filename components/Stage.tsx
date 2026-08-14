"use client";

import { useEffect, useRef } from "react";

import { useHandshakeStage } from "@/hooks/useHandshakeStage";
import {
  BG_VIDEO_SRC,
  RENDERER,
  TRACK_VH,
  VIDEO_SRC,
} from "@/lib/scrub-config";
import { FadingVideo } from "./FadingVideo";
import { Hero } from "./Hero";
import { Loader } from "./Loader";

export function Stage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { loadPct, ready } = useHandshakeStage({
    trackRef,
    canvasRef,
    videoRef,
  });

  useEffect(() => {
    if (!ready) return;
    document.body.classList.remove("is-loading");
  }, [ready]);

  return (
    <>
      <Loader pct={loadPct} done={ready} />

      {/* Scroll driver + pinned stage. The scrubbed footage takes the slot
          liquidGlass gave its autoplaying background video. */}
      <main
        ref={trackRef}
        className="relative bg-black"
        style={{ height: `${TRACK_VH}vh` }}
      >
        <section className="sticky top-0 h-screen w-full overflow-hidden bg-black">
          {RENDERER === "video" ? (
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              aria-hidden="true"
              className="z-0 block"
            />
          ) : (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 z-0 block h-full w-full"
            />
          )}

          {/* Ambient background, sitting on top of the scrubbed footage and
              dissolving away as you scroll. Layering it this way rather than
              compositing into the canvas leaves the scroll video's renderer
              completely untouched. */}
          <div className="bg-veil pointer-events-none absolute inset-0 z-[1] overflow-hidden">
            <FadingVideo
              src={BG_VIDEO_SRC}
              className="absolute top-0 left-1/2 -translate-x-1/2 object-cover object-top"
              style={{ width: "120%", height: "120%" }}
            />
          </div>

          <Hero play={ready} />
        </section>
      </main>
    </>
  );
}
