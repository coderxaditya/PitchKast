"use client";
import { useEffect, useState } from "react";

import { Globe3D, GlobeMarker } from "@/components/ui/3d-globe";

/**
 * Where we actually work.
 *
 * Country-level entries are pinned to that country's primary business centre,
 * since a pin needs a single point and a country's centroid often lands in
 * open desert or ocean. City-level entries are the cities themselves.
 *
 * Coordinates are decimal degrees, north and east positive.
 */
const markers: GlobeMarker[] = [
  /* Americas — seven across the continental United States.
     Spread coast to coast rather than clustered on one seaboard: at this
     globe's radius two pins closer than roughly 8 degrees overlap into one
     blob at the default camera distance, and every pair below clears that.
     Avatars 15-18 are new; Singapore's and Australia's repeat here because
     the avatar set stops at 18, and those two sit on the opposite face of
     the globe — they are never on screen at the same time as these. */
  {
    lat: 40.7128,
    lng: -74.006,
    src: "https://assets.aceternity.com/avatars/1.webp",
    label: "New York",
  },
  {
    lat: 34.0522,
    lng: -118.2437,
    src: "https://assets.aceternity.com/avatars/15.webp",
    label: "Los Angeles",
  },
  {
    lat: 41.8781,
    lng: -87.6298,
    src: "https://assets.aceternity.com/avatars/16.webp",
    label: "Chicago",
  },
  {
    lat: 29.7604,
    lng: -95.3698,
    src: "https://assets.aceternity.com/avatars/17.webp",
    label: "Houston",
  },
  {
    lat: 25.7617,
    lng: -80.1918,
    src: "https://assets.aceternity.com/avatars/18.webp",
    label: "Miami",
  },
  {
    lat: 47.6062,
    lng: -122.3321,
    src: "https://assets.aceternity.com/avatars/13.webp",
    label: "Seattle",
  },
  {
    lat: 39.7392,
    lng: -104.9903,
    src: "https://assets.aceternity.com/avatars/14.webp",
    label: "Denver",
  },

  // Europe
  {
    lat: 51.5074,
    lng: -0.1278,
    src: "https://assets.aceternity.com/avatars/2.webp",
    label: "United Kingdom",
  },
  {
    lat: 40.4168,
    lng: -3.7038,
    src: "https://assets.aceternity.com/avatars/3.webp",
    label: "Spain",
  },
  {
    lat: 52.2297,
    lng: 21.0122,
    src: "https://assets.aceternity.com/avatars/4.webp",
    label: "Poland",
  },

  // Middle East & Africa
  {
    lat: 25.2048,
    lng: 55.2708,
    src: "https://assets.aceternity.com/avatars/5.webp",
    label: "Dubai",
  },
  {
    lat: 24.7136,
    lng: 46.6753,
    src: "https://assets.aceternity.com/avatars/6.webp",
    label: "Saudi Arabia",
  },
  {
    lat: 30.0444,
    lng: 31.2357,
    src: "https://assets.aceternity.com/avatars/7.webp",
    label: "Egypt",
  },

  // India — four separate cities, pinned individually
  {
    lat: 28.4595,
    lng: 77.0266,
    src: "https://assets.aceternity.com/avatars/8.webp",
    label: "Gurgaon",
  },
  {
    lat: 18.5204,
    lng: 73.8567,
    src: "https://assets.aceternity.com/avatars/9.webp",
    label: "Pune",
  },
  {
    lat: 17.385,
    lng: 78.4867,
    src: "https://assets.aceternity.com/avatars/10.webp",
    label: "Hyderabad",
  },
  {
    lat: 12.9716,
    lng: 77.5946,
    src: "https://assets.aceternity.com/avatars/11.webp",
    label: "Bangalore",
  },

  // Asia-Pacific
  {
    lat: 4.1755,
    lng: 73.5093,
    src: "https://assets.aceternity.com/avatars/12.webp",
    label: "Maldives",
  },
  {
    lat: 1.3521,
    lng: 103.8198,
    src: "https://assets.aceternity.com/avatars/13.webp",
    label: "Singapore",
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    src: "https://assets.aceternity.com/avatars/14.webp",
    label: "Australia",
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

/**
 * Which longitude the globe opens on.
 *
 * The camera sits on +z looking at the origin, and `latLngToVector3` puts a
 * point at longitude L on +z when L = -90 — so an unrotated globe always
 * opened on 90°W, dead centre on the Americas, with every marker except the
 * US behind the limb.
 *
 * Rotating the sphere by y brings longitude L forward when y = -90 - L. We
 * want to open on ~45°E, which frames Europe, Africa, the Gulf and India at
 * once — the dense part of the marker set:
 *
 *     y = -90 - 45 = -135
 *
 * Only the starting frame changes. Auto-rotation and drag still run exactly
 * as before, from here instead of from the Americas.
 */
const OPENING_ROTATION_Y = -135;

export function HeroGlobe() {
  /**
   * Drag-to-rotate is offered only where there is a cursor.
   *
   * On a touch screen the globe fills most of the hero, and a drag on it is
   * indistinguishable from the drag someone makes to scroll the page. The
   * globe won that contest every time: OrbitControls claimed the gesture,
   * `data-lenis-prevent-touch` told Lenis to keep its hands off, and
   * @react-three/fiber's `touch-action: none` stopped the browser scrolling
   * natively as a last resort. Three separate mechanisms, all agreeing that a
   * finger on the globe means "spin", so the page simply would not move.
   *
   * A capability test, not a width one: what matters is whether a pointer can
   * hover and aim precisely, which is the same question the gallery asks.
   * Auto-rotation is untouched — the globe still turns on its own everywhere.
   */
  const [canRotate, setCanRotate] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setCanRotate(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Positioned rather than grid-centred on purpose. Grid applies *safe*
          alignment: an item larger than its track refuses to overflow the start
          edge, so `place-items-center` pinned this box to top:0 and spilled it
          all off the bottom, dropping the globe 81px low. A translate centres
          it honestly and lets it overflow both edges evenly. */}
      <div
        /* Only where the globe can actually be dragged. It hands touch on the
           globe to OrbitControls instead of to Lenis, which is what a spinnable
           globe needs and what an unspinnable one must not have. The wheel is
           untouched either way, so scrolling over the globe with a mouse still
           scrolls the page. */
        {...(canRotate ? { "data-lenis-prevent-touch": "" } : null)}
        className="pointer-events-auto absolute top-1/2 left-1/2"
        style={{
          height: GLOBE_BOX,
          width: GLOBE_BOX,
          translate: "-50% -50%",
        }}
      >
        <Globe3D
          className="h-full w-full"
          markers={markers}
          config={{
            atmosphereColor: "#4da6ff",
            atmosphereIntensity: 20,
            bumpScale: 5,
            autoRotateSpeed: 0.3,
            enableRotate: canRotate,
            initialRotation: { x: 0, y: OPENING_ROTATION_Y },
          }}
        />
      </div>
    </div>
  );
}
