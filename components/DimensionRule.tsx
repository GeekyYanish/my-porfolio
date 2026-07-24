"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The blueprint "dimension rule" under every section heading: a hairline
 * bounded by two end ticks. It plots itself out from the left when the
 * heading scrolls into view — the same line-draw idiom used across the
 * hero and case-study diagrams. Static under reduced motion.
 */
export default function DimensionRule({ isPaper }: { isPaper: boolean }) {
  const reduceMotion = useReducedMotion();
  const tick = isPaper ? "bg-paper-line/40" : "bg-line/40";
  const rule = isPaper ? "bg-paper-line/25" : "bg-line/20";

  const grow = reduceMotion
    ? undefined
    : {
        initial: { scaleX: 0 },
        whileInView: { scaleX: 1 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <div className="mt-6 flex items-center" aria-hidden="true">
      <span className={`h-3 w-px ${tick}`} />
      <motion.span
        {...grow}
        className={`h-px flex-1 origin-left ${rule}`}
      />
      <span className={`h-3 w-px ${tick}`} />
    </div>
  );
}
