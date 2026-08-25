"use client";

import { motion, useMotionTemplate } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
import ProjectPanelArt from "@/components/art/ProjectPanelArt";
import WebMesh from "@/components/art/WebMesh";
import { useTilt } from "@/components/motion";
import type { ProjectEntry } from "@/data/projects";

const ACCENT = {
  web: { text: "text-web-400", border: "hover:border-web-500/70" },
  sense: { text: "text-sense-400", border: "hover:border-sense-500/70" },
  gold: { text: "text-gold", border: "hover:border-gold/70" },
} as const;

/**
 * One project, as a comic panel.
 *
 * On a fine pointer the card tilts toward the cursor and a web overlay
 * blooms from wherever the pointer is; on touch it's a plain, static card
 * with the same content and the same hit targets. The whole panel is
 * keyboard-reachable through the buttons inside it — the card itself is not
 * a click target, so nothing is trapped behind a hover.
 */
export default function ProjectPanel({
  entry,
  onOpen,
}: {
  entry: ProjectEntry;
  onOpen: (entry: ProjectEntry) => void;
}) {
  const { rotateX, rotateY, px, py, active, onPointerMove, onPointerLeave } =
    useTilt(6);
  const accent = ACCENT[entry.accent];

  /* The web overlay is revealed through a mask centred on the pointer.
     Built once here — a hook can't live inside the conditional below. */
  const webMask = useMotionTemplate`radial-gradient(circle at ${px}% ${py}%, black 0%, black 34%, transparent 68%)`;

  return (
    <motion.article
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={active ? { rotateX, rotateY, transformPerspective: 1100 } : undefined}
      className={`comic-panel group relative flex h-full flex-col overflow-hidden border-ink/15 transition-colors duration-300 ${accent.border}`}
    >
      {/* artwork */}
      <div className="relative overflow-hidden border-b-2 border-ink/15">
        <ProjectPanelArt
          panel={entry.panel}
          accent={entry.accent}
          label={`${entry.title} — schematic`}
          className="h-40 w-full transition-transform duration-500 ease-out group-hover:scale-[1.04] sm:h-44"
        />

        {/* web overlay, revealed from the pointer position on hover */}
        <motion.svg
          viewBox="0 0 400 200"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={
            active
              ? { maskImage: webMask, WebkitMaskImage: webMask }
              : undefined
          }
        >
          <WebMesh
            cx={200}
            cy={100}
            radius={280}
            spokes={12}
            rings={6}
            sag={0.13}
            strokeWidth={0.9}
            opacity={0.45}
          />
        </motion.svg>

        <span className="absolute top-3 left-3 border border-ink/25 bg-night-950/85 px-2 py-0.5 font-mono text-micro tracking-[0.16em] text-ink-muted uppercase">
          {entry.index}
        </span>

        {entry.note && (
          <span className="absolute top-3 right-3 border border-gold/50 bg-night-950/85 px-2 py-0.5 font-mono text-micro tracking-[0.14em] text-gold uppercase">
            {entry.note}
          </span>
        )}
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-heading text-2xl leading-tight text-ink">
          {entry.title}
        </h3>
        <p className={`mt-1 font-mono text-xs tracking-wide ${accent.text}`}>
          {entry.tagline}
        </p>

        <p className="mt-3.5 line-clamp-4 text-sm leading-relaxed text-ink-muted">
          {entry.blurb}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {entry.tech.slice(0, 5).map((t) => (
            <li
              key={t}
              className="border border-ink/12 px-2 py-0.5 font-mono text-micro text-ink-faint"
            >
              {t}
            </li>
          ))}
          {entry.tech.length > 5 && (
            <li className="px-1 py-0.5 font-mono text-micro text-ink-faint">
              +{entry.tech.length - 5}
            </li>
          )}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-ink/10 pt-4">
          {entry.study && (
            <button
              type="button"
              onClick={() => onOpen(entry)}
              className="inline-flex min-h-11 items-center gap-2 bg-web-500 px-4 py-2 font-mono text-micro tracking-[0.14em] text-ink uppercase transition-colors hover:bg-web-400"
            >
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              Case study
              <span className="sr-only">for {entry.title}</span>
            </button>
          )}

          {entry.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-11 items-center gap-1.5 border border-ink/20 px-3.5 py-2 font-mono text-micro tracking-[0.14em] text-ink-muted uppercase transition-colors hover:border-sense-500 hover:text-sense-400"
            >
              {l.label}
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
