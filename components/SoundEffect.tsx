"use client";

import { motion } from "framer-motion";
import { useMotionDisabled } from "@/components/motion";

/**
 * A comic sound-effect sticker — "THWIP!", "SNAP!".
 *
 * Purely decorative and hidden from assistive tech: the word carries no
 * information the surrounding copy doesn't already give. Used sparingly, at
 * the two or three moments where it actually lands.
 */
export default function SoundEffect({
  children,
  className = "",
  rotate = -8,
  tone = "web",
  delay = 0,
}: {
  children: string;
  className?: string;
  rotate?: number;
  tone?: "web" | "sense" | "gold";
  delay?: number;
}) {
  const reduceMotion = useMotionDisabled();

  const color = {
    web: "text-web-500",
    sense: "text-sense-400",
    gold: "text-gold",
  }[tone];

  const content = (
    <span
      className={`font-display text-2xl leading-none tracking-tight sm:text-3xl ${color}`}
      style={{
        WebkitTextStroke: "1.5px var(--color-ink-black)",
        paintOrder: "stroke fill",
        filter: "drop-shadow(3px 3px 0 var(--color-ink-black))",
      }}
    >
      {children}
    </span>
  );

  if (reduceMotion) {
    return (
      <span
        aria-hidden="true"
        className={`inline-block ${className}`}
        style={{ rotate: `${rotate}deg` }}
      >
        {content}
      </span>
    );
  }

  return (
    <motion.span
      aria-hidden="true"
      className={`inline-block ${className}`}
      initial={{ opacity: 0, scale: 0.4, rotate: rotate - 14 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 620, damping: 16, delay }}
    >
      {content}
    </motion.span>
  );
}
