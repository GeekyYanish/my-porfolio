"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EASE_OUT_EXPO, useMotionDisabled } from "@/components/motion";
import { skillGroups } from "@/data/skills";

/**
 * The skill web: a real spider web that is also a radar chart.
 *
 * Each group owns a spoke, and its node sits at a radius proportional to
 * `level` — so the shape of the red outline *is* the proficiency profile,
 * and the concentric rings that make it look like a web are the chart's
 * gridlines. The two readings are the same drawing.
 *
 * Interaction lives in real <button>s absolutely positioned over the SVG
 * nodes rather than in the SVG itself, so tab order, focus rings, and hit
 * areas all behave normally. Below `md` the web becomes decoration and the
 * accordion underneath carries the same content.
 */

const SIZE = 620;
const C = SIZE / 2;
const MAX_R = 190;
const LABEL_R = 238;
const SAG = 0.11;
const N = skillGroups.length;

const angleAt = (i: number) => (-Math.PI / 2) + (i * 2 * Math.PI) / N;
const pt = (r: number, a: number) =>
  [C + r * Math.cos(a), C + r * Math.sin(a)] as const;
const fmt = (p: readonly [number, number]) =>
  `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;

/** One concentric web ring, with each segment sagging toward the hub. */
function ringPath(r: number) {
  const parts: string[] = [];
  for (let i = 0; i < N; i += 1) {
    const a1 = angleAt(i);
    const a2 = angleAt(i + 1);
    if (i === 0) parts.push(`M${fmt(pt(r, a1))}`);
    parts.push(`Q${fmt(pt(r * (1 - SAG), (a1 + a2) / 2))} ${fmt(pt(r, a2))}`);
  }
  return `${parts.join("")}Z`;
}

const nodes = skillGroups.map((g, i) => {
  const a = angleAt(i);
  const r = (MAX_R * g.level) / 5;
  const [x, y] = pt(r, a);
  const [lx, ly] = pt(LABEL_R, a);
  const cos = Math.cos(a);
  return {
    ...g,
    i,
    x,
    y,
    lx,
    ly,
    anchor: (cos > 0.25 ? "start" : cos < -0.25 ? "end" : "middle") as
      | "start"
      | "end"
      | "middle",
    /** percentages, for positioning the HTML button over the node */
    left: (x / SIZE) * 100,
    top: (y / SIZE) * 100,
  };
});

const profile = `M${nodes.map((n) => fmt([n.x, n.y] as const)).join("L")}Z`;

/** Chords between related groups, curved inward like real web bridging. */
const chords = skillGroups.flatMap((g, i) =>
  g.related
    .map((code) => nodes.findIndex((n) => n.code === code))
    .filter((j) => j > i)
    .map((j) => {
      const a = nodes[i];
      const b = nodes[j];
      return {
        key: `${i}-${j}`,
        pair: [i, j] as const,
        d: `M${fmt([a.x, a.y])}Q${fmt([C + (a.x + b.x - 2 * C) * 0.28, C + (a.y + b.y - 2 * C) * 0.28])} ${fmt([b.x, b.y])}`,
      };
    }),
);

const ACCENT = ["var(--color-web-500)", "var(--color-sense-500)"];

export default function SkillWeb() {
  const [active, setActive] = useState(0);
  const reduceMotion = useMotionDisabled();
  const current = skillGroups[active];

  const drawn = (delay: number, duration = 1) =>
    reduceMotion
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration, delay, ease: EASE_OUT_EXPO },
        };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-center lg:gap-14">
      {/* ---------------------------------------------------------- web */}
      <div className="relative mx-auto w-full max-w-[34rem]">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="w-full"
          role="img"
          aria-label={`Skill web. ${skillGroups
            .map((g) => `${g.title}, level ${g.level} of 5`)
            .join(". ")}.`}
        >
          {/* gridline rings */}
          {[1, 2, 3, 4, 5].map((lvl, i) => (
            <motion.path
              key={lvl}
              d={ringPath((MAX_R * lvl) / 5)}
              fill="none"
              stroke="var(--color-ink)"
              strokeWidth={lvl === 5 ? 1.4 : 1}
              opacity={lvl === 5 ? 0.22 : 0.12}
              {...drawn(0.05 * i, 0.8)}
            />
          ))}

          {/* spokes run past the outermost ring, like anchor lines */}
          {nodes.map((n, i) => (
            <motion.line
              key={`spoke-${n.code}`}
              x1={C}
              y1={C}
              x2={pt(MAX_R + 16, angleAt(i))[0]}
              y2={pt(MAX_R + 16, angleAt(i))[1]}
              stroke="var(--color-ink)"
              strokeWidth="1"
              opacity="0.16"
              {...drawn(0.03 * i, 0.7)}
            />
          ))}

          {/* related-skill chords */}
          {chords.map((c, i) => {
            const lit = c.pair.includes(active);
            return (
              <motion.path
                key={c.key}
                d={c.d}
                fill="none"
                stroke={lit ? "var(--color-sense-400)" : "var(--color-ink)"}
                strokeWidth={lit ? 1.8 : 1}
                opacity={lit ? 0.85 : 0.2}
                style={{ transition: "stroke 0.3s, opacity 0.3s" }}
                {...drawn(0.4 + 0.06 * i, 0.7)}
              />
            );
          })}

          {/* the proficiency outline */}
          <motion.path
            d={profile}
            fill="var(--color-web-500)"
            fillOpacity="0.13"
            stroke="var(--color-web-500)"
            strokeWidth="2.4"
            strokeLinejoin="round"
            {...drawn(0.55, 1.1)}
          />

          {/* hub */}
          <circle cx={C} cy={C} r="6" fill="var(--color-web-500)" />
          <circle
            cx={C}
            cy={C}
            r="13"
            fill="none"
            stroke="var(--color-web-500)"
            strokeWidth="1.2"
            opacity="0.5"
          />

          {/* node markers, drawn under the interactive buttons */}
          {nodes.map((n) => {
            const on = n.i === active;
            return (
              <g key={`node-${n.code}`} style={{ transition: "opacity 0.3s" }}>
                {on && (
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r="26"
                    fill="var(--color-sense-500)"
                    opacity="0.18"
                  />
                )}
                <rect
                  x={n.x - 9}
                  y={n.y - 9}
                  width="18"
                  height="18"
                  transform={`rotate(45 ${n.x} ${n.y})`}
                  fill={on ? "var(--color-sense-400)" : "var(--color-night-950)"}
                  stroke={on ? "var(--color-sense-400)" : "var(--color-web-500)"}
                  strokeWidth="2.4"
                />
              </g>
            );
          })}

          {/* spoke labels */}
          {nodes.map((n) => (
            <text
              key={`label-${n.code}`}
              x={n.lx}
              y={n.ly}
              textAnchor={n.anchor}
              dominantBaseline="middle"
              fontFamily="var(--font-mono)"
              fontSize="15"
              letterSpacing="1.4"
              fill={
                n.i === active ? "var(--color-ink)" : "var(--color-ink-faint)"
              }
              style={{ transition: "fill 0.3s" }}
            >
              {n.code}
            </text>
          ))}
        </svg>

        {/* real buttons over the nodes — md and up */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          {nodes.map((n) => (
            <button
              key={`btn-${n.code}`}
              type="button"
              onClick={() => setActive(n.i)}
              onMouseEnter={() => setActive(n.i)}
              onFocus={() => setActive(n.i)}
              aria-pressed={n.i === active}
              className="pointer-events-auto absolute h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ left: `${n.left}%`, top: `${n.top}%` }}
            >
              <span className="sr-only">
                {n.title} — level {n.level} of 5
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------- detail (md+) */}
      <div className="hidden lg:block">
        <div
          className="comic-panel relative min-h-[24rem] p-7"
          aria-live="polite"
        >
          <span
            aria-hidden="true"
            className="halftone-red absolute inset-0 opacity-25"
          />
          <div className="relative">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-mono text-xs tracking-[0.22em] text-web-400 uppercase">
                {current.code}
              </span>
              <span className="font-mono text-micro tracking-[0.18em] text-ink-faint uppercase">
                Level {current.level} / 5
              </span>
            </div>

            <h3 className="mt-3 font-heading text-3xl leading-[0.95] text-ink">
              {current.title}
            </h3>

            {/* level meter — bars, so it isn't colour-only */}
            <div className="mt-4 flex gap-1.5" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  className={`h-1.5 flex-1 ${
                    s <= current.level ? "bg-web-500" : "bg-ink/15"
                  }`}
                />
              ))}
            </div>

            <p className="mt-5 text-sm leading-relaxed text-ink-muted">
              {current.blurb}
            </p>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {current.items.map((item) => (
                <li
                  key={item}
                  className="border border-ink/15 px-2.5 py-1 font-mono text-xs text-ink-muted"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-ink/10 pt-4">
              <p className="font-mono text-micro tracking-[0.2em] text-ink-faint uppercase">
                Proven in
              </p>
              <ul className="mt-2 space-y-1">
                {current.evidence.map((e, i) => (
                  <li
                    key={e}
                    className="flex items-center gap-2 text-xs text-ink-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rotate-45"
                      style={{ background: ACCENT[i % ACCENT.length] }}
                    />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------------- accordion (below lg) */}
      <ul className="space-y-2.5 lg:hidden">
        {skillGroups.map((g) => (
          <li key={g.code}>
            <details className="comic-panel group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center gap-3">
                <span className="font-mono text-xs text-web-400">{g.code}</span>
                <span className="font-heading text-lg text-ink">{g.title}</span>
                <span
                  aria-hidden="true"
                  className="ml-auto flex gap-1"
                  title={`Level ${g.level} of 5`}
                >
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className={`h-1.5 w-1.5 rotate-45 ${
                        s <= g.level ? "bg-web-500" : "bg-ink/20"
                      }`}
                    />
                  ))}
                </span>
              </summary>

              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {g.blurb}
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="border border-ink/15 px-2 py-0.5 font-mono text-micro text-ink-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 font-mono text-micro tracking-[0.16em] text-ink-faint uppercase">
                Proven in: {g.evidence.join(" · ")}
              </p>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
