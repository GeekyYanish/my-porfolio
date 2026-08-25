"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/Container";
import ProjectPanel from "@/components/ProjectPanel";
import ProjectReader from "@/components/ProjectReader";
import SectionHeader from "@/components/SectionHeader";
import { EASE_OUT_EXPO, useMotionDisabled } from "@/components/motion";
import {
  projectCategories,
  projectEntries,
  type ProjectCategory,
  type ProjectEntry,
} from "@/data/projects";

type Filter = ProjectCategory | "All";
const FILTERS: Filter[] = ["All", ...projectCategories];

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [reading, setReading] = useState<ProjectEntry | null>(null);
  const reduceMotion = useMotionDisabled();

  const visible = useMemo(
    () =>
      filter === "All"
        ? projectEntries
        : projectEntries.filter((p) => p.categories.includes(filter)),
    [filter],
  );

  return (
    <section id="work" className="defer-paint relative py-24 sm:py-32">
      <Container>
        <SectionHeader
          issue="03"
          label="Case Files"
          title="Selected work"
          intro="Six builds — a real-time proctoring platform, a public donation ledger, evaluation infrastructure, ML notebooks, a peer mesh, and a hackathon sprint. Open a case file for the full write-up."
        />

        {/* filters */}
        <div
          role="group"
          aria-label="Filter projects by category"
          className="mb-10 flex flex-wrap gap-2"
        >
          {FILTERS.map((f) => {
            const on = filter === f;
            const count =
              f === "All"
                ? projectEntries.length
                : projectEntries.filter((p) => p.categories.includes(f)).length;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={on}
                className={`relative inline-flex min-h-11 items-center border-2 px-4 py-2 font-mono text-xs tracking-[0.14em] uppercase transition-colors ${
                  on
                    ? "border-web-500 bg-web-500 text-ink"
                    : "border-ink/18 text-ink-faint hover:border-ink/40 hover:text-ink-muted"
                }`}
              >
                {f}
                <span className="ml-1.5 opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        <p className="sr-only" role="status">
          Showing {visible.length} of {projectEntries.length} projects
          {filter !== "All" ? ` in ${filter}` : ""}.
        </p>

        {visible.length === 0 && (
          <p className="comic-panel px-6 py-10 text-center text-sm text-ink-muted">
            No case files under{" "}
            <span className="text-ink">{filter}</span> yet.{" "}
            <button
              type="button"
              onClick={() => setFilter("All")}
              className="text-sense-400 underline underline-offset-4 hover:text-sense-500"
            >
              Show all six
            </button>
            .
          </p>
        )}

        <motion.ul
          layout={!reduceMotion}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((entry) => (
              <motion.li
                key={entry.id}
                layout={!reduceMotion}
                initial={reduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
                animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
                className="min-w-0"
              >
                <ProjectPanel entry={entry} onOpen={setReading} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </Container>

      <ProjectReader entry={reading} onClose={() => setReading(null)} />
    </section>
  );
}
