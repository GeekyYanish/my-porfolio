"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import type { CaseStudy } from "@/data/projects";
import { useDraw, useAppear } from "@/components/motion";

/**
 * Bespoke schematic per case study. Each variant is a different
 * drawing: a real-time flow, a ledger graph, a measured pipeline,
 * an experiment log, and a peer mesh. On small screens the SVG is
 * replaced by an accessible stacked flow list. The line-draw/appear
 * primitives live in components/motion.ts and are shared site-wide.
 */

/** Procto — real-time event flow with a signal trace underneath. */
function ProctoDiagram({ flow }: { flow: string[] }) {
  const draw = useDraw();
  const appear = useAppear();
  const boxW = 108;
  const gap = 24;
  const startX = 14;

  return (
    <svg
      viewBox="0 0 700 180"
      role="img"
      aria-label={`Real-time proctoring flow: ${flow.join(", then ")}`}
      className="h-auto w-full"
    >
      {flow.map((label, i) => {
        const x = startX + i * (boxW + gap);
        return (
          <motion.g key={label} {...appear(i * 0.14)}>
            <rect
              x={x}
              y="52"
              width={boxW}
              height="44"
              className="fill-bp-900 stroke-accent/60"
              strokeWidth="1"
            />
            <text
              x={x + boxW / 2}
              y="78"
              textAnchor="middle"
              className="fill-ink-muted font-mono"
              fontSize="10.5"
              letterSpacing="0.5"
            >
              {label.toUpperCase()}
            </text>
            {i < flow.length - 1 ? (
              <motion.path
                {...draw(0.15 + i * 0.14)}
                d={`M ${x + boxW} 74 L ${x + boxW + gap} 74 M ${x + boxW + gap - 6} 69 L ${x + boxW + gap} 74 L ${x + boxW + gap - 6} 79`}
                fill="none"
                className="stroke-accent/70"
                strokeWidth="1.2"
              />
            ) : null}
          </motion.g>
        );
      })}
      {/* live signal trace */}
      <motion.path
        {...draw(0.8)}
        d="M 14 140 L 150 140 L 165 126 L 180 152 L 195 132 L 208 140 L 380 140 L 395 128 L 410 150 L 424 140 L 686 140"
        fill="none"
        className="stroke-warn/50"
        strokeWidth="1.1"
      />
      <motion.text
        {...appear(1)}
        x="14"
        y="164"
        className="fill-ink-faint font-mono"
        fontSize="9.5"
        letterSpacing="2"
      >
        WEBCAM / BLUR / FOCUS EVENTS — STREAMED LIVE OVER SOCKET.IO
      </motion.text>
    </svg>
  );
}

/** Dochain — node-and-edge ledger graph. */
function DochainDiagram({ flow }: { flow: string[] }) {
  const draw = useDraw();
  const appear = useAppear();
  const nodes = [
    { x: 100, y: 60 },
    { x: 300, y: 128 },
    { x: 480, y: 52 },
    { x: 620, y: 128 },
  ];

  return (
    <svg
      viewBox="0 0 700 190"
      role="img"
      aria-label={`Blockchain donation flow: ${flow.join(", then ")}`}
      className="h-auto w-full"
    >
      {nodes.slice(0, -1).map((n, i) => (
        <motion.path
          key={i}
          {...draw(0.2 + i * 0.2)}
          d={`M ${n.x} ${n.y} L ${nodes[i + 1].x} ${nodes[i + 1].y}`}
          fill="none"
          className="stroke-teal-data/60"
          strokeWidth="1.2"
          strokeDasharray="6 4"
        />
      ))}
      {nodes.map((n, i) => (
        <motion.g key={flow[i]} {...appear(i * 0.18)}>
          {/* hexagonal block node */}
          <polygon
            points={`${n.x},${n.y - 22} ${n.x + 19},${n.y - 11} ${n.x + 19},${n.y + 11} ${n.x},${n.y + 22} ${n.x - 19},${n.y + 11} ${n.x - 19},${n.y - 11}`}
            className="fill-bp-900 stroke-teal-data"
            strokeWidth="1.2"
          />
          <circle cx={n.x} cy={n.y} r="3.5" className="fill-teal-data" />
          <text
            x={n.x}
            y={n.y + (n.y < 100 ? 42 : -34)}
            textAnchor="middle"
            className="fill-ink-muted font-mono"
            fontSize="10.5"
            letterSpacing="0.5"
          >
            {flow[i].toUpperCase()}
          </text>
        </motion.g>
      ))}
      {/* small satellite verification nodes */}
      <motion.g {...appear(0.9)}>
        {[
          { x: 560, y: 170 },
          { x: 660, y: 172 },
          { x: 610, y: 178 },
        ].map((s, i) => (
          <g key={i}>
            <line
              x1="620"
              y1="128"
              x2={s.x}
              y2={s.y}
              className="stroke-teal-data/30"
              strokeWidth="1"
            />
            <circle
              cx={s.x}
              cy={s.y}
              r="4"
              className="fill-bp-900 stroke-teal-data/60"
              strokeWidth="1"
            />
          </g>
        ))}
      </motion.g>
      <motion.text
        {...appear(1)}
        x="14"
        y="180"
        className="fill-ink-faint font-mono"
        fontSize="9.5"
        letterSpacing="2"
      >
        EVERY DONATION VERIFIABLE ON-CHAIN
      </motion.text>
    </svg>
  );
}

/** Adobe harness — measured data pipeline with dimension callouts. */
function HarnessDiagram({ flow }: { flow: string[] }) {
  const draw = useDraw();
  const appear = useAppear();
  const boxW = 116;
  const gap = 22;
  const startX = 10;
  const dims = ["30K+", "600K+", "50+", "AUTO", "LIVE"];

  return (
    <svg
      viewBox="0 0 700 170"
      role="img"
      aria-label={`Evaluation data pipeline: ${flow.join(", then ")}`}
      className="h-auto w-full"
    >
      {flow.map((label, i) => {
        const x = startX + i * (boxW + gap);
        return (
          <motion.g key={label} {...appear(i * 0.13)}>
            {/* dimension callout above each stage */}
            <line
              x1={x + 8}
              y1="34"
              x2={x + boxW - 8}
              y2="34"
              className="stroke-teal-data/50"
              strokeWidth="1"
            />
            <line
              x1={x + 8}
              y1="29"
              x2={x + 8}
              y2="39"
              className="stroke-teal-data/50"
              strokeWidth="1"
            />
            <line
              x1={x + boxW - 8}
              y1="29"
              x2={x + boxW - 8}
              y2="39"
              className="stroke-teal-data/50"
              strokeWidth="1"
            />
            <text
              x={x + boxW / 2}
              y="24"
              textAnchor="middle"
              className="fill-teal-data font-mono"
              fontSize="10.5"
              fontWeight="600"
            >
              {dims[i]}
            </text>
            <rect
              x={x}
              y="56"
              width={boxW}
              height="46"
              className="fill-bp-900 stroke-line/50"
              strokeWidth="1"
            />
            <text
              x={x + boxW / 2}
              y="76"
              textAnchor="middle"
              className="fill-ink-muted font-mono"
              fontSize="9.5"
            >
              {label.split(" ")[0].toUpperCase()}
            </text>
            <text
              x={x + boxW / 2}
              y="90"
              textAnchor="middle"
              className="fill-ink-muted font-mono"
              fontSize="9.5"
            >
              {label.split(" ").slice(1).join(" ").toUpperCase()}
            </text>
            {i < flow.length - 1 ? (
              <motion.path
                {...draw(0.1 + i * 0.13)}
                d={`M ${x + boxW} 79 L ${x + boxW + gap} 79`}
                fill="none"
                className="stroke-teal-data/70"
                strokeWidth="1.2"
              />
            ) : null}
          </motion.g>
        );
      })}
      <motion.text
        {...appear(0.9)}
        x="10"
        y="140"
        className="fill-ink-faint font-mono"
        fontSize="9.5"
        letterSpacing="2"
      >
        SCHEMA REDESIGN → INGESTION ERRORS DOWN 35%
      </motion.text>
      <motion.line
        {...draw(1)}
        x1="10"
        y1="150"
        x2="330"
        y2="150"
        className="stroke-teal-data/40"
        strokeWidth="1"
      />
    </svg>
  );
}

/** ML Lab — notebook experiment log. */
function MlLabDiagram({ flow }: { flow: string[] }) {
  const appear = useAppear();
  return (
    <svg
      viewBox="0 0 700 190"
      role="img"
      aria-label={`Notebook workflow: ${flow.join(", then ")}`}
      className="h-auto w-full"
    >
      {flow.map((label, i) => {
        const y = 26 + i * 32;
        return (
          <motion.g key={label} {...appear(i * 0.12)}>
            <text
              x="16"
              y={y + 14}
              className="fill-accent font-mono"
              fontSize="11"
            >
              In [{i + 1}]:
            </text>
            <rect
              x="86"
              y={y}
              width="520"
              height="22"
              className="fill-bp-900 stroke-line/30"
              strokeWidth="1"
            />
            <text
              x="98"
              y={y + 14.5}
              className="fill-ink-muted font-mono"
              fontSize="10.5"
            >
              {`>> ${label.toLowerCase()}()`}
            </text>
            <text
              x="622"
              y={y + 14.5}
              className="fill-teal-data font-mono"
              fontSize="10"
            >
              ✓ ok
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}

/** P2P — peer mesh network. */
function P2pDiagram({ flow }: { flow: string[] }) {
  const draw = useDraw();
  const appear = useAppear();
  const peers = [
    { x: 140, y: 60, label: flow[0] },
    { x: 360, y: 130, label: flow[1] },
    { x: 560, y: 56, label: flow[2] },
    { x: 250, y: 160, label: "Peer C" },
    { x: 480, y: 168, label: flow[3] },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [3, 1],
    [1, 4],
    [4, 2],
  ];

  return (
    <svg
      viewBox="0 0 700 210"
      role="img"
      aria-label={`Peer-to-peer mesh: ${flow.join(", ")}`}
      className="h-auto w-full"
    >
      {edges.map(([a, b], i) => (
        <motion.path
          key={i}
          {...draw(0.15 + i * 0.12)}
          d={`M ${peers[a].x} ${peers[a].y} L ${peers[b].x} ${peers[b].y}`}
          fill="none"
          className="stroke-gold/40"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      ))}
      {peers.map((p, i) => (
        <motion.g key={p.label + i} {...appear(i * 0.12)}>
          <circle
            cx={p.x}
            cy={p.y}
            r="16"
            className="fill-bp-900 stroke-gold/70"
            strokeWidth="1.2"
          />
          <circle cx={p.x} cy={p.y} r="3" className="fill-gold" />
          <text
            x={p.x}
            y={p.y + (p.y < 110 ? 34 : -26)}
            textAnchor="middle"
            className="fill-ink-muted font-mono"
            fontSize="10"
          >
            {p.label.toUpperCase()}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

export default function ProjectGraph({ study }: { study: CaseStudy }) {
  const diagrams = {
    procto: ProctoDiagram,
    dochain: DochainDiagram,
    harness: HarnessDiagram,
    mllab: MlLabDiagram,
    p2p: P2pDiagram,
  } as const;
  const Diagram = diagrams[study.diagram];

  return (
    <div>
      {/* full schematic on sm+ */}
      <div className="hidden sm:block">
        <Diagram flow={study.diagramFlow} />
      </div>
      {/* simplified stacked flow on mobile */}
      <ol className="flex flex-col gap-1.5 sm:hidden" aria-hidden="true">
        {study.diagramFlow.map((step, i) => (
          <li
            key={step}
            className="flex items-center gap-2 font-mono text-[11px] tracking-wide text-ink-muted uppercase"
          >
            <span className="text-accent/70">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex-1 border border-line/25 bg-bp-900 px-2.5 py-2">
              {step}
            </span>
            {i < study.diagramFlow.length - 1 ? (
              <MoveRight size={12} className="rotate-90 text-line/50" />
            ) : (
              <span className="w-3" />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
