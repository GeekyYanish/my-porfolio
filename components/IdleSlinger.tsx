"use client";

import { motion } from "framer-motion";
import Slinger from "@/components/art/Slinger";
import { useMotionDisabled } from "@/components/motion";

/**
 * The slinger at rest, hanging off the footer on a long strand and swinging
 * gently. A slow, low-amplitude loop — this one is ambience, not an event,
 * so it never gets loud enough to pull the eye off the page.
 */
export default function IdleSlinger({ className = "" }: { className?: string }) {
  const reduceMotion = useMotionDisabled();

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <motion.div
        className="flex origin-top flex-col items-center"
        animate={reduceMotion ? undefined : { rotate: [-5.5, 5.5, -5.5] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="h-24 w-px bg-linear-to-b from-transparent via-ink/35 to-ink/55 sm:h-32" />
        <Slinger className="-mt-1 w-12 sm:w-16" />
      </motion.div>
    </div>
  );
}
