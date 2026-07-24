"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";

const accentClass = {
  cyan: "text-accent",
  teal: "text-teal-data",
} as const;

const underlineClass = {
  cyan: "stroke-accent",
  teal: "stroke-teal-data",
} as const;

/**
 * Hero <h1>, rendered from `site.headlineParts` so the accent words stay
 * in the data layer. Accent words sit above a blueprint "dimension"
 * underline — a measured line with end ticks — that plots itself in after
 * the text settles. `text-balance` handles responsive line wrapping, so
 * there are no brittle <br> tags. Fully static under reduced motion.
 */
export default function HeroHeadline() {
  const reduceMotion = useReducedMotion();
  let accentIndex = 0;

  return (
    <h1 className="mt-5 font-heading text-4xl leading-tight font-bold text-balance text-ink sm:text-5xl md:text-[3.4rem]">
      {site.headlineParts.map((part, i) => {
        if (!("accent" in part) || !part.accent) {
          return <span key={i}>{part.text}</span>;
        }
        const accent = part.accent;
        const delay = 0.5 + accentIndex * 0.25;
        accentIndex += 1;

        return (
          <span key={i} className="relative inline-block whitespace-nowrap">
            <span className={accentClass[accent]}>{part.text}</span>
            {/* drawn measurement underline with end ticks */}
            <svg
              aria-hidden="true"
              className="absolute -bottom-1.5 left-0 h-2 w-full overflow-visible"
              viewBox="0 0 100 8"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M0.75 6.5 L0.75 2 M0.75 6.5 L99.25 6.5 M99.25 6.5 L99.25 2"
                className={underlineClass[accent]}
                fill="none"
                strokeWidth="1.25"
                vectorEffect="non-scaling-stroke"
                initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
                animate={
                  reduceMotion ? undefined : { pathLength: 1, opacity: 0.85 }
                }
                transition={{ duration: 0.7, delay, ease: "easeInOut" }}
                style={reduceMotion ? { opacity: 0.85 } : undefined}
              />
            </svg>
          </span>
        );
      })}
    </h1>
  );
}
