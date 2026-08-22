"use client";
// `motion/react` is the renamed successor to `framer-motion`; this project
// ships framer-motion and both export the same API. Importing the installed
// one avoids bundling two copies of the same library.
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export const ParallaxScroll = ({
  images,
  className,
  /** Alt text per image. Falls back to the original behaviour when absent. */
  alt,
}: {
  images: string[];
  className?: string;
  alt?: (src: string, index: number) => string;
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef, // remove this if your container is not fixed height
    offset: ["start start", "end start"], // remove this if your container is not fixed height
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const altFor = (src: string, i: number) => (alt ? alt(src, i) : "thumbnail");

  /* Images keep their own aspect ratio rather than being forced into a fixed
     h-80 crop box. The original `object-cover object-left-top` filled that box
     by cutting each photograph down to its top-left corner, which is why the
     previews showed a sliver of the subject. Natural height means the columns
     read as a masonry wall and every photograph is whole. */

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <div
      className={cn("h-[40rem] items-start overflow-y-auto w-full", className)}
      ref={gridRef}
    >
      <div
        /* No ref here. It was attached to both this grid and the scrolling
           parent, and `useScroll({ container })` needs the element that
           actually scrolls — whichever attached last silently decided whether
           the parallax responded at all. */
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start  max-w-5xl mx-auto gap-10 py-40 px-10"
      >
        <div className="grid gap-10">
          {firstPart.map((el, idx) => (
            <motion.div
              style={{ y: translateFirst }} // Apply the translateY motion value here
              key={"grid-1" + idx}
            >
              <img
                src={el}
                className="h-auto w-full rounded-lg object-contain !m-0 !p-0 transition-[filter,transform] duration-500 hover:brightness-105"
                alt={altFor(el, idx)}
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((el, idx) => (
            <motion.div style={{ y: translateSecond }} key={"grid-2" + idx}>
              <img
                src={el}
                className="h-auto w-full rounded-lg object-contain !m-0 !p-0 transition-[filter,transform] duration-500 hover:brightness-105"
                alt={altFor(el, third + idx)}
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((el, idx) => (
            <motion.div style={{ y: translateThird }} key={"grid-3" + idx}>
              <img
                src={el}
                className="h-auto w-full rounded-lg object-contain !m-0 !p-0 transition-[filter,transform] duration-500 hover:brightness-105"
                alt={altFor(el, 2 * third + idx)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
