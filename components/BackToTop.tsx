"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { EASE_OUT_EXPO, useMotionDisabled } from "@/components/motion";

/**
 * Back to top, played as a web retracting: the strand above the button
 * snaps upward and the button gets pulled with it before the page scrolls.
 *
 * Under reduced motion it's an ordinary button that jumps straight to the
 * top — no yank, no delay.
 */
export default function BackToTop() {
  const [pulling, setPulling] = useState(false);
  const reduceMotion = useMotionDisabled();

  const goTop = () => {
    if (reduceMotion) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    setPulling(true);
    window.setTimeout(
      () => window.scrollTo({ top: 0, behavior: "smooth" }),
      260,
    );
    window.setTimeout(() => setPulling(false), 900);
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* the strand overhead — retracts when the button is pulled */}
      <motion.span
        aria-hidden="true"
        className="w-px origin-bottom bg-linear-to-t from-web-500/70 to-transparent"
        initial={false}
        animate={
          reduceMotion
            ? { height: 34 }
            : { height: pulling ? 10 : 34, opacity: pulling ? 1 : 0.7 }
        }
        transition={{ duration: 0.26, ease: EASE_OUT_EXPO }}
        style={{ height: 34 }}
      />

      <motion.button
        type="button"
        onClick={goTop}
        animate={
          reduceMotion ? undefined : { y: pulling ? -26 : 0, scale: pulling ? 0.92 : 1 }
        }
        transition={{ type: "spring", stiffness: 520, damping: 22 }}
        className="group flex h-11 w-11 items-center justify-center border-2 border-web-500/60 bg-night-950 text-ink transition-colors hover:border-web-500 hover:bg-web-500/15"
      >
        <span className="sr-only">Back to top</span>
        <ArrowUp
          className="h-4 w-4 transition-transform group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </motion.button>
    </div>
  );
}
