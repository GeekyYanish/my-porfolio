"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Lock, X } from "lucide-react";
import ProjectPanelArt from "@/components/art/ProjectPanelArt";
import { EASE_OUT_EXPO, useMotionDisabled } from "@/components/motion";
import type { ProjectEntry } from "@/data/projects";

/**
 * The full case study, opened like turning a comic page.
 *
 * Built on the native <dialog> with `showModal()`, which brings a real focus
 * trap, Escape-to-close, background inerting, and focus restoration for
 * free — all things a hand-rolled modal usually gets wrong. Framer only
 * handles the page-turn on the inner panel.
 */
export default function ProjectReader({
  entry,
  onClose,
}: {
  entry: ProjectEntry | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const reduceMotion = useMotionDisabled();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (entry && !el.open) el.showModal();
    if (!entry && el.open) el.close();
  }, [entry]);

  /* Escape and the backdrop both go through the dialog's own close event. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onCancelOrClose = () => onClose();
    el.addEventListener("close", onCancelOrClose);
    return () => el.removeEventListener("close", onCancelOrClose);
  }, [onClose]);

  useEffect(() => {
    if (!entry) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [entry]);

  const study = entry?.study;

  return (
    <dialog
      ref={ref}
      aria-labelledby="reader-title"
      className="w-full max-w-3xl backdrop:bg-night-950/80"
      onClick={(e) => {
        // clicks that land on the dialog element itself are backdrop clicks
        if (e.target === ref.current) ref.current?.close();
      }}
    >
      {entry && (
        <motion.article
          className="comic-panel relative max-h-[88vh] overflow-y-auto"
          style={{ transformOrigin: "left center" }}
          initial={reduceMotion ? undefined : { rotateY: -88, opacity: 0 }}
          animate={reduceMotion ? undefined : { rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
        >
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center border border-ink/20 bg-night-950/80 text-ink transition-colors hover:border-web-500 hover:text-web-400"
          >
            <span className="sr-only">Close case study</span>
            <X className="h-4 w-4" aria-hidden="true" />
          </button>

          <ProjectPanelArt
            panel={entry.panel}
            accent={entry.accent}
            label={`${entry.title} — schematic`}
            className="h-40 w-full border-b-2 border-ink/15 sm:h-52"
          />

          <div className="p-6 sm:p-9">
            <p className="font-mono text-[0.68rem] tracking-[0.24em] text-web-400 uppercase">
              {entry.index} · {entry.categories.join(" · ")}
            </p>
            <h2
              id="reader-title"
              className="mt-2.5 font-heading text-3xl leading-[0.95] text-ink sm:text-4xl"
            >
              {entry.title}
            </h2>
            <p className="mt-1.5 text-sm text-ink-faint">{entry.tagline}</p>

            <p className="mt-6 leading-relaxed text-ink-muted">{entry.blurb}</p>

            {/* flow strip */}
            {study && (
              <ol className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-2">
                {study.diagramFlow.map((step, i) => (
                  <li key={step} className="flex items-center gap-2">
                    <span className="border border-ink/15 bg-night-950/60 px-2.5 py-1 font-mono text-[0.65rem] tracking-wide text-ink-muted">
                      {step}
                    </span>
                    {i < study.diagramFlow.length - 1 && (
                      <span aria-hidden="true" className="text-web-400">
                        →
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            )}

            {study?.detail ? (
              <div className="mt-8 space-y-6">
                {(
                  [
                    ["The problem", study.detail.problem],
                    ["My role", study.detail.role],
                    ["Architecture", study.detail.architecture],
                    ["Impact", study.detail.impact],
                    ["What's next", study.detail.next],
                  ] as const
                ).map(([label, body]) => (
                  <section key={label}>
                    <h3 className="font-mono text-[0.65rem] leading-normal tracking-[0.22em] text-sense-400 uppercase">
                      {label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {body}
                    </p>
                  </section>
                ))}

                <section>
                  <h3 className="font-mono text-[0.65rem] leading-normal tracking-[0.22em] text-sense-400 uppercase">
                    Features
                  </h3>
                  <ul className="mt-2.5 space-y-2">
                    {study.detail.features.map((f) => (
                      <li key={f} className="flex gap-2.5 text-sm text-ink-muted">
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-web-500"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            ) : (
              study && (
                <ul className="mt-8 space-y-2.5">
                  {study.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm text-ink-muted">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-web-500"
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              )
            )}

            {study?.confidentialityNote && (
              <p className="mt-7 flex gap-2.5 border-l-2 border-gold/60 bg-gold/5 px-4 py-3 text-xs leading-relaxed text-ink-muted">
                <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" aria-hidden="true" />
                {study.confidentialityNote}
              </p>
            )}

            <ul className="mt-8 flex flex-wrap gap-1.5">
              {entry.tech.map((t) => (
                <li
                  key={t}
                  className="border border-ink/15 px-2.5 py-1 font-mono text-[0.68rem] text-ink-muted"
                >
                  {t}
                </li>
              ))}
            </ul>

            {entry.links.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-3 border-t border-ink/10 pt-6">
                {entry.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 border-2 border-ink/25 px-4 py-2.5 font-mono text-[0.7rem] tracking-[0.14em] text-ink uppercase transition-colors hover:border-web-500 hover:text-web-400"
                  >
                    {l.label}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </motion.article>
      )}
    </dialog>
  );
}
