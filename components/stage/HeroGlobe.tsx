"use client";
import { Globe3D, GlobeMarker } from "@/components/ui/3d-globe";

const sampleMarkers: GlobeMarker[] = [
  {
    lat: 40.7128,
    lng: -74.006,
    src: "https://assets.aceternity.com/avatars/1.webp",
    label: "New York",
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    src: "https://assets.aceternity.com/avatars/2.webp",
    label: "London",
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    src: "https://assets.aceternity.com/avatars/3.webp",
    label: "Tokyo",
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    src: "https://assets.aceternity.com/avatars/4.webp",
    label: "Sydney",
  },
  {
    lat: 48.8566,
    lng: 2.3522,
    src: "https://assets.aceternity.com/avatars/5.webp",
    label: "Paris",
  },
  {
    lat: 28.6139,
    lng: 77.209,
    src: "https://assets.aceternity.com/avatars/6.webp",
    label: "New Delhi",
  },
  {
    lat: 55.7558,
    lng: 37.6173,
    src: "https://assets.aceternity.com/avatars/7.webp",
    label: "Moscow",
  },
  {
    lat: -22.9068,
    lng: -43.1729,
    src: "https://assets.aceternity.com/avatars/8.webp",
    label: "Rio de Janeiro",
  },
  {
    lat: 31.2304,
    lng: 121.4737,
    src: "https://assets.aceternity.com/avatars/9.webp",
    label: "Shanghai",
  },
  {
    lat: 25.2048,
    lng: 55.2708,
    src: "https://assets.aceternity.com/avatars/10.webp",
    label: "Dubai",
  },
  {
    lat: -34.6037,
    lng: -58.3816,
    src: "https://assets.aceternity.com/avatars/11.webp",
    label: "Buenos Aires",
  },
  {
    lat: 1.3521,
    lng: 103.8198,
    src: "https://assets.aceternity.com/avatars/12.webp",
    label: "Singapore",
  },
  {
    lat: 37.5665,
    lng: 126.978,
    src: "https://assets.aceternity.com/avatars/13.webp",
    label: "Seoul",
  },
];

/**
 * The hero globe, sized so the sphere spans ~85% of the viewport.
 *
 * Markers and config are the demo's, unchanged. The only thing added here is
 * placement and scale.
 *
 * The box is not the globe. With the component's fixed camera — radius 2, fov
 * 45, camera at radius * 3.5 = 7, zoom disabled — the sphere's angular radius
 * is asin(2/7) = 16.6° against a 22.5° half-FOV, so it covers
 * tan(16.6°) / tan(22.5°) = 0.72 of its container. Hitting 85% of the screen
 * therefore needs a container of 0.85 / 0.72 = 118.1vmin, not 85.
 *
 * Past 100vmin the *container* is wider than the viewport's short axis and
 * spills, but the sphere inside it is still only 85vmin — so the globe itself
 * never crops. The stage clips the overflow, so nothing scrolls.
 *
 * vmin measures the shorter axis, so the globe reads at the same size relative
 * to the screen in portrait and landscape. No px cap: a fixed ceiling would
 * quietly break the 85% relationship on large displays.
 */
const GLOBE_BOX = "118.1vmin";

export function HeroGlobe() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Positioned rather than grid-centred on purpose. Grid applies *safe*
          alignment: an item larger than its track refuses to overflow the start
          edge, so `place-items-center` pinned this box to top:0 and spilled it
          all off the bottom, dropping the globe 81px low. A translate centres
          it honestly and lets it overflow both edges evenly. */}
      <div
        className="pointer-events-auto absolute top-1/2 left-1/2"
        style={{
          height: GLOBE_BOX,
          width: GLOBE_BOX,
          translate: "-50% -50%",
        }}
      >
        <Globe3D
          className="h-full w-full"
          markers={sampleMarkers}
          config={{
            atmosphereColor: "#4da6ff",
            atmosphereIntensity: 20,
            bumpScale: 5,
            autoRotateSpeed: 0.3,
          }}
        />
      </div>
    </div>
  );
}
