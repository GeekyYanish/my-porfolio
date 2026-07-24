"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Shared blueprint motion primitives.
 *
 * The site has two motion idioms: SVG line-drawing (`pathLength`) and
 * simple fade-in. These hooks return a factory that maps a `delay` to a
 * framer-motion prop bag, and collapse to `{}` (i.e. static) under
 * `prefers-reduced-motion`. Kept identical across Hero, Section, and the
 * case-study diagrams so the whole page reads as one drawing being plotted.
 */

/** Line-draw: strokes appear as if being plotted. */
export function useDraw() {
  const reduceMotion = useReducedMotion();
  return (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, margin: "-40px" },
          transition: { duration: 0.9, delay, ease: "easeInOut" as const },
        };
}

/** Fade-in for nodes/labels that shouldn't draw. */
export function useAppear() {
  const reduceMotion = useReducedMotion();
  return (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true, margin: "-40px" },
          transition: { duration: 0.45, delay },
        };
}
