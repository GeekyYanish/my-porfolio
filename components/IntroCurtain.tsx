"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import WebMesh from "@/components/art/WebMesh";
import { EASE_OUT_EXPO, useMotionDisabled } from "@/components/motion";

/**
 * First-load web wipe: a web shoots across the screen, then the whole sheet
 * splits and pulls away.
 *
 * Gated on sessionStorage so it plays once per visit rather than on every
 * anchor navigation, and skipped entirely under reduced motion.
 *
 * Deliberately built from a background *colour* plus SVG strokes — no large
 * text or background image — so it is not itself an LCP candidate and the
 * hero headline underneath still sets the metric.
 */
export default function IntroCurtain() {
  const reduceMotion = useMotionDisabled();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    /*
      `reduceMotion` is false for the first commit — see `useMotionDisabled`,
      which defers to avoid a hydration mismatch — so this effect can have
      already started the curtain by the time the real preference arrives.
      Tear it down rather than just declining to start it.
    */
    if (reduceMotion) {
      setPlaying(false);
      return;
    }
    let seen = false;
    try {
      seen = sessionStorage.getItem("ns-intro") === "1";
    } catch {
      /* storage blocked — treat as first visit, it's only cosmetic */
    }
    if (seen) return;

    try {
      sessionStorage.setItem("ns-intro", "1");
    } catch {
      /* ignore */
    }
    setPlaying(true);
    const t = setTimeout(() => setPlaying(false), 850);
    return () => clearTimeout(t);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {playing && (
        <motion.div
          key="curtain"
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[90] bg-night-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.38, ease: EASE_OUT_EXPO } }}
        >
          <motion.svg
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid slice"
            className="h-full w-full text-web-500"
            initial={{ scale: 1.25, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          >
            <motion.g
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.68, ease: EASE_OUT_EXPO }}
            >
              <WebMesh
                cx={500}
                cy={500}
                radius={760}
                spokes={16}
                rings={7}
                sag={0.14}
                strokeWidth={1.6}
                opacity={0.75}
              />
            </motion.g>
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
