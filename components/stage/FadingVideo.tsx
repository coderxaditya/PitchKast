"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const FADE_MS = 500;
const FADE_OUT_LEAD = 0.55; // seconds before the end to start fading out

/**
 * Looping background video with a rAF-driven crossfade — no CSS transitions.
 *
 * `loop` is deliberately off: the loop is implemented by hand off `ended` so
 * the tail can fade out before the head fades back in, instead of hard-cutting.
 */
export function FadingVideo({
  src,
  className,
  style,
}: {
  src: string;
  className?: string;
  style?: CSSProperties;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const fadingOutRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Each fade resumes from wherever the last one left off.
    const fadeTo = (target: number, duration: number) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const start = performance.now();
      const from = parseFloat(video.style.opacity || "0");
      const delta = target - from;

      const step = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        video.style.opacity = String(from + delta * t);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          rafRef.current = null;
        }
      };
      rafRef.current = requestAnimationFrame(step);
    };

    const onLoadedData = () => {
      video.style.opacity = "0";
      const p = video.play();
      if (p && p.catch) p.catch(() => {});
      fadeTo(1, FADE_MS);
    };

    const onTimeUpdate = () => {
      const remaining = video.duration - video.currentTime;
      if (!fadingOutRef.current && remaining <= FADE_OUT_LEAD && remaining > 0) {
        fadingOutRef.current = true;
        fadeTo(0, FADE_MS);
      }
    };

    const onEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        video.currentTime = 0;
        const p = video.play();
        if (p && p.catch) p.catch(() => {});
        fadingOutRef.current = false;
        fadeTo(1, FADE_MS);
      }, 100);
    };

    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);

    if (video.readyState >= 2) onLoadedData();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      playsInline
      preload="auto"
      className={className}
      style={{ ...style, opacity: 0 }}
    />
  );
}
