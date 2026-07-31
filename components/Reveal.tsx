"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO, useMotionDisabled } from "@/components/motion";

type Variant = "rise" | "left" | "right" | "snap" | "fade";

const VARIANTS: Record<
  Variant,
  { from: Record<string, number>; to: Record<string, number> }
> = {
  rise: { from: { opacity: 0, y: 26 }, to: { opacity: 1, y: 0 } },
  left: { from: { opacity: 0, x: -32 }, to: { opacity: 1, x: 0 } },
  right: { from: { opacity: 0, x: 32 }, to: { opacity: 1, x: 0 } },
  snap: { from: { opacity: 0, scale: 0.9 }, to: { opacity: 1, scale: 1 } },
  fade: { from: { opacity: 0 }, to: { opacity: 1 } },
};

/**
 * Generic scroll-in wrapper. Under reduced motion it renders a plain element
 * — the finished state, immediately — rather than something invisible.
 *
 * Stagger siblings with `delay={i * 0.08}`.
 */
export default function Reveal({
  children,
  delay = 0,
  variant = "rise",
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  variant?: Variant;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const reduceMotion = useMotionDisabled();

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as];
  const v = VARIANTS[variant];

  return (
    <MotionTag
      className={className}
      initial={v.from}
      whileInView={v.to}
      viewport={{ once: true, margin: "-70px" }}
      transition={
        variant === "snap"
          ? { type: "spring", stiffness: 460, damping: 24, delay }
          : { duration: 0.6, delay, ease: EASE_OUT_EXPO }
      }
    >
      {children}
    </MotionTag>
  );
}
