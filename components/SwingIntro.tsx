"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Slinger from "@/components/art/Slinger";
import { swingKeyframes, useMotionDisabled } from "@/components/motion";

/**
 * The load-time swing: a slinger arcs across the hero once, then is gone.
 *
 * Two nested transforms do the work. The outer one translates the anchor
 * point linearly across the viewport; the inner one rotates the strand about
 * that anchor through `swingKeyframes()` — a damped sine, so the arc loses
 * amplitude the way a real body on a line does instead of ticking like a
 * metronome.
 *
 * It unmounts when it's finished, so it costs nothing for the rest of the
 * session, and it never mounts at all under reduced motion.
 */

const DURATION = 3.1;
const SWING = swingKeyframes(30, 2, 26, 0.5);
const TIMES = SWING.map((_, i) => i / (SWING.length - 1));

export default function SwingIntro() {
  const reduceMotion = useMotionDisabled();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const t = setTimeout(() => setDone(true), (DURATION + 0.7) * 1000);
    return () => clearTimeout(t);
  }, [reduceMotion]);

  if (reduceMotion || done) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
    >
      <motion.div
        className="absolute top-0 left-0"
        initial={{ x: "-18vw" }}
        animate={{ x: "116vw" }}
        transition={{ duration: DURATION, ease: "linear" }}
      >
        <motion.div
          className="origin-top"
          initial={{ rotate: SWING[0] }}
          animate={{ rotate: SWING }}
          transition={{ duration: DURATION, times: TIMES, ease: "linear" }}
        >
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: DURATION, times: [0, 0.08, 0.86, 1] }}
          >
            {/* the strand, anchored off-screen above */}
            <span className="h-[26vh] w-px bg-linear-to-b from-transparent via-ink/60 to-ink/80 sm:h-[30vh]" />
            <Slinger className="-mt-1 w-16 sm:w-24" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
