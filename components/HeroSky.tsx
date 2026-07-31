"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import CitySkyline from "@/components/art/CitySkyline";
import WebMesh from "@/components/art/WebMesh";
import { usePointerFine, useMotionDisabled } from "@/components/motion";
import { seededRandom } from "@/components/seeded";

/* Ambient motes — seeded so server and client agree. */
const MOTES = (() => {
  const rand = seededRandom(4_820_117);
  return Array.from({ length: 14 }, () => ({
    left: rand() * 100,
    delay: rand() * 22,
    duration: 16 + rand() * 14,
    size: 1 + rand() * 2.2,
    drift: (rand() - 0.5) * 90,
    opacity: 0.25 + rand() * 0.4,
  }));
})();

/**
 * The hero's night city: three skyline planes that parallax against the
 * scroll, a moon glow, corner webbing, and drifting motes.
 *
 * Depth comes from differential scroll speed — the near towers move up
 * faster than the page, the far haze lags behind it. All of it collapses to
 * a static, still city when motion is suppressed.
 */
export default function HeroSky() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useMotionDisabled();
  const fine = usePointerFine();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const soft = { stiffness: 90, damping: 26, mass: 0.4 };
  // near planes outrun the page, far planes lag it
  const yFar = useSpring(useTransform(scrollYProgress, [0, 1], [0, 110]), soft);
  const yMid = useSpring(useTransform(scrollYProgress, [0, 1], [0, 40]), soft);
  const yNear = useSpring(useTransform(scrollYProgress, [0, 1], [0, -60]), soft);
  const glow = useTransform(scrollYProgress, [0, 1], [1, 0.25]);

  const still = reduceMotion;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/*
        Deep sky.

        The horizon has to end up genuinely *bright* — light pollution over a
        city at night is, and more practically, the buildings are near-black
        masses with no outline of their own. They only read as a skyline
        because the sky behind them glows. Every earlier attempt at a subtle
        gradient here just made the city disappear and left the lit windows
        floating on their own.
      */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#04050d_0%,#0a0d1f_38%,#171a3d_66%,#2c1c46_84%,#43203a_100%)]" />
      <motion.div
        style={still ? undefined : { opacity: glow }}
        className="absolute inset-x-0 bottom-0 h-3/5 bg-[radial-gradient(80%_100%_at_46%_104%,color-mix(in_srgb,var(--color-web-500)_58%,transparent)_0%,color-mix(in_srgb,var(--color-web-600)_26%,transparent)_40%,transparent_74%)]"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(55%_100%_at_82%_104%,color-mix(in_srgb,var(--color-sense-500)_26%,transparent)_0%,transparent_62%)]" />

      {/* moon, low and hazy behind the webbing */}
      <div className="absolute top-[14%] right-[10%] hidden sm:block">
        <div className="h-16 w-16 rounded-full bg-[radial-gradient(circle_at_38%_34%,color-mix(in_srgb,var(--color-paper)_92%,transparent)_0%,color-mix(in_srgb,var(--color-gold)_38%,transparent)_62%,transparent_74%)] opacity-55" />
        <div className="absolute inset-0 -z-10 h-16 w-16 scale-[3.4] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-paper)_12%,transparent)_0%,transparent_62%)]" />
      </div>

      {/* corner webbing, drawn top-right and bottom-left */}
      <svg
        className="absolute inset-0 h-full w-full text-web-500"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        <WebMesh
          cx={1200}
          cy={0}
          radius={520}
          spokes={9}
          rings={6}
          sag={0.16}
          rotate={Math.PI / 2}
          arc={Math.PI / 2}
          strokeWidth={1.1}
          opacity={0.3}
        />
        <WebMesh
          cx={0}
          cy={800}
          radius={300}
          spokes={7}
          rings={4}
          sag={0.16}
          rotate={-Math.PI / 2}
          arc={Math.PI / 2}
          strokeWidth={1}
          opacity={0.18}
        />
        {/* strands hanging from the top edge, with a little catenary sag */}
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.22"
          strokeLinecap="round"
        >
          <path d="M180 0Q188 150 168 286" />
          <path d="M470 0Q462 120 486 212" />
          <path d="M860 0Q872 180 848 330" />
        </g>
      </svg>

      {/*
        Skyline bands.

        Composed the way skyline illustrations are rather than by strict
        perspective: the distant band sits highest and smallest, and the
        near one is a low strip along the bottom. Letting the foreground
        loom largest — which is what perspective would demand — just walls
        off the two bands behind it.
      */}
      <motion.div
        style={still ? undefined : { y: yFar }}
        className="absolute inset-x-0 bottom-0 h-[46%] lg:h-[54%]"
      >
        <CitySkyline plane={1} className="h-full w-full city-drift" />
      </motion.div>
      <motion.div
        style={still ? undefined : { y: yMid }}
        className="absolute inset-x-0 bottom-0 h-[40%] lg:h-[48%]"
      >
        <CitySkyline plane={2} className="h-full w-full" />
      </motion.div>
      <motion.div
        style={still ? undefined : { y: yNear }}
        className="absolute inset-x-0 -bottom-6 h-[26%] lg:h-[31%]"
      >
        <CitySkyline plane={3} className="h-full w-full" />
      </motion.div>

      {/* motes drift up through the foreground — desktop only */}
      {fine && !still && (
        <div className="absolute inset-0">
          {MOTES.map((m, i) => (
            <span
              key={i}
              className="mote absolute bottom-0 rounded-full bg-sense-400"
              style={
                {
                  left: `${m.left}%`,
                  width: m.size,
                  height: m.size,
                  "--mote-delay": `${m.delay}s`,
                  "--mote-duration": `${m.duration}s`,
                  "--mote-drift": `${m.drift}px`,
                  "--mote-opacity": m.opacity,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}

      {/* Grain, then a vignette weighted to the top and sides — it has to
          leave the horizon glow intact or the skyline goes flat again. */}
      <div className="grain absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_38%,transparent_42%,color-mix(in_srgb,var(--color-night-950)_55%,transparent)_100%)]" />
      {/* light readability scrim behind the headline column */}
      <div className="absolute inset-0 bg-[linear-gradient(100deg,color-mix(in_srgb,var(--color-night-950)_58%,transparent)_0%,color-mix(in_srgb,var(--color-night-950)_22%,transparent)_44%,transparent_68%)]" />
    </div>
  );
}
