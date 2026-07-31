"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO, useMotionDisabled } from "@/components/motion";
import { site } from "@/data/site";

/**
 * The hero <h1>.
 *
 * The visible name is split per character so it can snap in letter by
 * letter, which would make a screen reader spell it out — so the split
 * markup is `aria-hidden` and the real sentence lives in an `sr-only` span.
 * Under reduced motion the same markup renders with no animation at all.
 */
export default function HeroHeadline() {
  const reduceMotion = useMotionDisabled();
  const chars = [...site.name];

  /*
    Transform-only, deliberately — no opacity fade anywhere in the hero
    headline.

    Framer serialises `initial` into the SSR markup, so fading in from
    `opacity: 0` means the biggest text on the page cannot paint until
    hydration finishes, and it becomes the LCP element at well over two
    seconds. Animating position and scale alone lets the server-rendered
    text paint immediately and still land the entrance.
  */
  const line = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { y: 18 },
          animate: { y: 0 },
          transition: { duration: 0.55, delay, ease: EASE_OUT_EXPO },
        };

  return (
    <h1 className="mt-5">
      <span className="sr-only">
        {site.name} — {site.headline}
      </span>

      <span aria-hidden="true">
        <span className="chromatic block font-display text-[clamp(2.3rem,10.5vw,7rem)] leading-[0.92] tracking-tight text-ink">
          {chars.map((c, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={
                reduceMotion ? undefined : { y: -14, rotate: -7, scale: 0.9 }
              }
              animate={reduceMotion ? undefined : { y: 0, rotate: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 560,
                damping: 26,
                delay: 0.12 + i * 0.03,
              }}
            >
              {c === " " ? " " : c}
            </motion.span>
          ))}
        </span>

        <motion.span
          {...line(0.46)}
          className="mt-4 block font-heading text-[clamp(1.35rem,4.6vw,2.9rem)] leading-[1.02] text-ink-muted uppercase"
        >
          Your Friendly Neighborhood
        </motion.span>

        <motion.span
          {...line(0.56)}
          className="block font-heading text-[clamp(1.7rem,6.2vw,4rem)] leading-[1] text-sense-400 uppercase"
          style={{ textShadow: "0 0 32px color-mix(in srgb, var(--color-sense-500) 45%, transparent)" }}
        >
          {site.profession}
        </motion.span>
      </span>
    </h1>
  );
}
