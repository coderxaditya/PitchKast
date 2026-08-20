"use client";

import { useEffect, useRef } from "react";

import { useHandshakeStage } from "@/hooks/useHandshakeStage";
import {
  RENDERER,
  TRACK_VH,
  VIDEO_SRC,
} from "@/lib/scrub/config";
import LightRays from "@/components/ui/LightRays";
import { HeroGlobe } from "./HeroGlobe";
import { Hero } from "@/components/hero/Hero";
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
              completely untouched.

              `bg-veil` carries --bgFade, so the rays and the globe dissolve
              together over the first stretch of scroll and hand off to the
              handshake footage exactly as the old space clip did.

              The component ships `z-[3]` on its own root. This wrapper is a
              positioned element with a z-index, so it opens a stacking context
              and that 3 is scoped inside it — it cannot climb over the globe
              or the copy. */}
          <div className="bg-veil absolute inset-0 z-[1] overflow-hidden">
            <LightRays
              raysOrigin="top-center"
              raysColor="#ffffff"
              raysSpeed={1}
              lightSpread={0.5}
              rayLength={3}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0}
              distortion={0}
              className="custom-rays"
              pulsating={false}
              fadeDistance={1}
              saturation={1}
            />
          </div>

          {/* Centred on the rays, behind the copy. Its own layer so it keeps
              pointer events for OrbitControls. */}
          <div className="bg-veil absolute inset-0 z-[2]">
            <HeroGlobe />
          </div>

          <Hero play={ready} />
        </section>
      </main>
    </>
  );
}
