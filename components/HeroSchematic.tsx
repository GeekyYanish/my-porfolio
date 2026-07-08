"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Blueprint schematic for the hero: the main pipeline
 * Data → Evaluation → AI Systems → Trust → Product,
 * annotated with a ledger graph, a data pipeline, a UI wireframe,
 * and a real-time signal trace — one motif per body of work.
 */

const MAIN_NODES = [
  { x: 84, y: 120, label: "DATA" },
  { x: 236, y: 76, label: "EVALUATION" },
  { x: 392, y: 136, label: "AI SYSTEMS" },
  { x: 540, y: 84, label: "TRUST" },
  { x: 636, y: 186, label: "PRODUCT" },
];

const MAIN_PATH =
  "M 106 114 L 214 82 M 258 82 L 370 130 M 414 130 L 518 90 M 558 96 L 620 172";

const LEDGER_NODES = [
  { x: 92, y: 306 },
  { x: 152, y: 276 },
  { x: 168, y: 344 },
  { x: 104, y: 372 },
];

export default function HeroSchematic() {
  const reduceMotion = useReducedMotion();

  const draw = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { duration: 1.1, delay, ease: "easeInOut" as const },
        };

  const appear = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.5, delay },
        };

  return (
    <svg
      viewBox="0 0 720 460"
      role="img"
      aria-label="Schematic diagram of connected systems: data flows into evaluation, AI systems, trust, and product, annotated with a blockchain ledger graph, a data pipeline, a UI wireframe, and a real-time signal trace"
      className="h-auto w-full"
    >
      {/* figure annotation */}
      <motion.text
        {...appear(0.1)}
        x="16"
        y="26"
        className="fill-accent font-mono"
        fontSize="11"
        letterSpacing="3"
      >
        FIG. 00 — SYSTEM OVERVIEW
      </motion.text>
      <motion.line
        {...draw(0.15)}
        x1="16"
        y1="36"
        x2="240"
        y2="36"
        className="stroke-line/30"
        strokeWidth="1"
      />

      {/* main pipeline connectors */}
      <motion.path
        {...draw(0.4)}
        d={MAIN_PATH}
        fill="none"
        className="stroke-accent/70"
        strokeWidth="1.5"
        strokeDasharray={reduceMotion ? "none" : undefined}
      />

      {/* main nodes */}
      {MAIN_NODES.map((node, i) => (
        <motion.g key={node.label} {...appear(0.5 + i * 0.18)}>
          <circle
            cx={node.x}
            cy={node.y}
            r="21"
            className="fill-bp-900 stroke-line/60"
            strokeWidth="1"
          />
          <circle cx={node.x} cy={node.y} r="4" className="fill-accent" />
          {/* crosshair ticks */}
          <line
            x1={node.x - 28}
            y1={node.y}
            x2={node.x - 24}
            y2={node.y}
            className="stroke-line/40"
            strokeWidth="1"
          />
          <line
            x1={node.x + 24}
            y1={node.y}
            x2={node.x + 28}
            y2={node.y}
            className="stroke-line/40"
            strokeWidth="1"
          />
          <text
            x={node.x}
            y={node.y + 40}
            textAnchor="middle"
            className="fill-ink-muted font-mono"
            fontSize="11"
            letterSpacing="1.5"
          >
            {node.label}
          </text>
        </motion.g>
      ))}

      {/* ledger graph motif — Web3 work */}
      <motion.g {...appear(1.4)}>
        {[
          [0, 1],
          [1, 2],
          [2, 3],
          [3, 0],
          [0, 2],
        ].map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={LEDGER_NODES[a].x}
            y1={LEDGER_NODES[a].y}
            x2={LEDGER_NODES[b].x}
            y2={LEDGER_NODES[b].y}
            className="stroke-teal-data/50"
            strokeWidth="1"
          />
        ))}
        {LEDGER_NODES.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r="6"
            className="fill-bp-900 stroke-teal-data"
            strokeWidth="1.2"
          />
        ))}
        <text
          x="130"
          y="408"
          textAnchor="middle"
          className="fill-ink-faint font-mono"
          fontSize="10"
          letterSpacing="2"
        >
          LEDGER GRAPH
        </text>
      </motion.g>

      {/* data pipeline motif — analytics work */}
      <motion.g {...appear(1.55)}>
        {[276, 352, 428].map((x, i) => (
          <g key={x}>
            <rect
              x={x}
              y="312"
              width="56"
              height="34"
              className="fill-bp-900 stroke-teal-data/80"
              strokeWidth="1"
            />
            <line
              x1={x + 8}
              y1="329"
              x2={x + 48}
              y2="329"
              className="stroke-teal-data/40"
              strokeWidth="1"
            />
            {i < 2 ? (
              <path
                d={`M ${x + 56} 329 L ${x + 76} 329 M ${x + 71} 324 L ${x + 76} 329 L ${x + 71} 334`}
                fill="none"
                className="stroke-line/50"
                strokeWidth="1"
              />
            ) : null}
          </g>
        ))}
        <text
          x="380"
          y="372"
          textAnchor="middle"
          className="fill-ink-faint font-mono"
          fontSize="10"
          letterSpacing="2"
        >
          DATA PIPELINE
        </text>
      </motion.g>

      {/* UI wireframe motif — full-stack work */}
      <motion.g {...appear(1.7)}>
        <rect
          x="540"
          y="286"
          width="140"
          height="96"
          className="fill-bp-900 stroke-line/50"
          strokeWidth="1"
        />
        <line
          x1="540"
          y1="306"
          x2="680"
          y2="306"
          className="stroke-line/40"
          strokeWidth="1"
        />
        <circle cx="551" cy="296" r="3" className="fill-accent/70" />
        <rect
          x="551"
          y="317"
          width="52"
          height="54"
          className="fill-transparent stroke-line/30"
          strokeWidth="1"
        />
        <line
          x1="615"
          y1="322"
          x2="668"
          y2="322"
          className="stroke-line/35"
          strokeWidth="1"
        />
        <line
          x1="615"
          y1="336"
          x2="660"
          y2="336"
          className="stroke-line/35"
          strokeWidth="1"
        />
        <line
          x1="615"
          y1="350"
          x2="668"
          y2="350"
          className="stroke-line/35"
          strokeWidth="1"
        />
        <text
          x="610"
          y="408"
          textAnchor="middle"
          className="fill-ink-faint font-mono"
          fontSize="10"
          letterSpacing="2"
        >
          UI WIREFRAME
        </text>
      </motion.g>

      {/* real-time signal trace — proctoring work */}
      <motion.path
        {...draw(1.85)}
        d="M 40 442 L 180 442 L 200 442 L 212 428 L 224 452 L 236 434 L 246 442 L 420 442 L 434 430 L 448 452 L 460 442 L 680 442"
        fill="none"
        className="stroke-warn/60"
        strokeWidth="1.2"
      />
      <motion.text
        {...appear(2.1)}
        x="40"
        y="430"
        className="fill-ink-faint font-mono"
        fontSize="10"
        letterSpacing="2"
      >
        REALTIME SIGNAL
      </motion.text>
    </svg>
  );
}
