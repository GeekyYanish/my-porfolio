"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useMagnetic } from "@/components/motion";

/**
 * A link that leans toward the pointer as it approaches.
 *
 * The magnetic pull is desktop-only and switches off with the rest of the
 * motion; on touch, and for anyone who's opted out, this is an ordinary
 * anchor with an ordinary hit area. `senseRing` adds the spider-sense pulse
 * reserved for the two primary calls to action.
 */
export default function MagneticButton({
  href,
  children,
  tone = "primary",
  senseRing = false,
  download = false,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: "primary" | "ghost";
  senseRing?: boolean;
  download?: boolean;
  external?: boolean;
  className?: string;
}) {
  const { ref, x, y } = useMagnetic(0.28, 70);

  const base =
    "relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 font-mono text-xs sm:text-sm uppercase tracking-[0.16em] transition-colors duration-200";

  const tones = {
    primary:
      "bg-web-500 text-ink border-2 border-web-500 hover:bg-web-400 hover:border-web-400 shadow-panel-sm",
    ghost:
      "border-2 border-ink/25 text-ink hover:border-sense-400 hover:text-sense-400",
  } as const;

  return (
    <motion.a
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={href}
      download={download || undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      style={{ x, y }}
      className={`${base} ${tones[tone]} ${senseRing ? "sense-ring" : ""} ${className}`}
    >
      {children}
    </motion.a>
  );
}
