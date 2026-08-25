"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import WebMesh from "@/components/art/WebMesh";
import { EASE_OUT_EXPO, useMotionDisabled } from "@/components/motion";

/**
 * First-load web wipe: a web-covered screen tears at the middle and both
 * halves are pulled off the viewport, exposing the site underneath.
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
  const [pulling, setPulling] = useState(false);

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
    /*
      Two seconds end to end, held once per session by the sessionStorage
      gate above. The web sits and reads for a beat before it tears, so the
      hold is deliberate rather than a stall — the tear itself still runs at
      the same speed.
    */
    const pullTimer = window.setTimeout(() => setPulling(true), 1160);
    const finishTimer = window.setTimeout(() => setPlaying(false), 2000);
    return () => {
      window.clearTimeout(pullTimer);
      window.clearTimeout(finishTimer);
    };
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {playing && (
        <motion.div
          key="curtain"
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[90] overflow-hidden bg-night-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
        >
          <motion.div
            className="absolute -top-[5%] -left-[6%] h-[110%] w-[58%] bg-[linear-gradient(135deg,var(--color-night-800),var(--color-night-950)_68%)] shadow-[12px_0_24px_color-mix(in_srgb,var(--color-ink-black)_45%,transparent)]"
            style={{ clipPath: "polygon(0 0, 100% 0, 92% 47%, 100% 100%, 0 100%)" }}
            initial={{ x: 0, y: 0, rotate: 0 }}
            animate={
              pulling
                ? { x: "-118vw", y: "-5vh", rotate: -5 }
                : { x: 0, y: 0, rotate: 0 }
            }
            transition={{ duration: 0.72, ease: EASE_OUT_EXPO }}
          />
          <motion.div
            className="absolute -top-[5%] -right-[6%] h-[110%] w-[58%] bg-[linear-gradient(225deg,var(--color-night-800),var(--color-night-950)_68%)] shadow-[-12px_0_24px_color-mix(in_srgb,var(--color-ink-black)_45%,transparent)]"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 8% 53%)" }}
            initial={{ x: 0, y: 0, rotate: 0 }}
            animate={
              pulling
                ? { x: "118vw", y: "5vh", rotate: 5 }
                : { x: 0, y: 0, rotate: 0 }
            }
            transition={{ duration: 0.72, ease: EASE_OUT_EXPO }}
          />
          <motion.svg
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 h-full w-full text-web-500"
            initial={{ scale: 1.18, opacity: 0 }}
            animate={
              pulling
                ? { scale: 1.3, opacity: 0 }
                : { scale: 1, opacity: 0.9 }
            }
            transition={{ duration: pulling ? 0.42 : 0.34, ease: EASE_OUT_EXPO }}
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
          </motion.svg>
          <motion.p
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-mono text-micro tracking-[0.42em] text-ink-muted uppercase sm:text-xs"
            animate={pulling ? { opacity: 0, scale: 0.94 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            Night shift // loading
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
