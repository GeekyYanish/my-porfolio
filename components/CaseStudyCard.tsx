import { ExternalLink, Lock } from "lucide-react";
import type { CaseStudy } from "@/data/projects";
import ProjectGraph from "@/components/ProjectGraph";

/**
 * One featured case study. Layout alternates and the schematic
 * inside differs per project, so no two cards read the same.
 * Full case detail (when present) expands via a native <details>.
 */
export default function CaseStudyCard({
  study,
  flip,
}: {
  study: CaseStudy;
  flip: boolean;
}) {
  return (
    <article className="corner-ticks border border-line/15 bg-bp-900/60">
      <div
        className={`grid gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:items-start ${
          flip ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* text column */}
        <div>
          <p className="font-mono text-[11px] tracking-[0.25em] text-accent uppercase">
            {study.figure} · {study.tagline}
          </p>
          <h3 className="mt-3 font-heading text-2xl font-semibold text-ink">
            {study.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            {study.summary}
          </p>

          <ul className="mt-5 space-y-2">
            {study.points.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-relaxed">
                <span
                  aria-hidden="true"
                  className="mt-[0.55em] h-px w-4 shrink-0 bg-accent/60"
                />
                <span className="text-ink-muted">{point}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-2">
            {study.tech.map((t) => (
              <li
                key={t}
                className="border border-line/25 px-2 py-1 font-mono text-[11px] text-ink-muted"
              >
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            {study.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[13px] text-accent underline-offset-4 hover:underline"
              >
                <ExternalLink size={13} aria-hidden="true" /> {link.label}
              </a>
            ))}
            {study.confidentialityNote ? (
              <p className="inline-flex items-center gap-1.5 font-mono text-[11px] text-ink-faint">
                <Lock size={12} aria-hidden="true" />
                {study.confidentialityNote}
              </p>
            ) : null}
          </div>
        </div>

        {/* schematic column */}
        <div className="border border-line/10 bg-bp-800/70 p-4">
          <ProjectGraph study={study} />
        </div>
      </div>

      {/* expandable full case study */}
      {study.detail ? (
        <details className="group border-t border-line/15">
          <summary className="cursor-pointer list-none px-6 py-4 font-mono text-[12px] tracking-[0.2em] text-accent uppercase transition-colors hover:bg-bp-800/60 sm:px-8">
            <span className="group-open:hidden">
              + Expand full case study
            </span>
            <span className="hidden group-open:inline">
              − Collapse case study
            </span>
          </summary>
          <div className="grid gap-6 px-6 pb-8 sm:px-8 md:grid-cols-2">
            <div>
              <h4 className="font-mono text-[11px] tracking-[0.2em] text-ink-faint uppercase">
                Problem
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {study.detail.problem}
              </p>
              <h4 className="mt-5 font-mono text-[11px] tracking-[0.2em] text-ink-faint uppercase">
                My role
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {study.detail.role}
              </p>
              <h4 className="mt-5 font-mono text-[11px] tracking-[0.2em] text-ink-faint uppercase">
                Architecture
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {study.detail.architecture}
              </p>
            </div>
            <div>
              <h4 className="font-mono text-[11px] tracking-[0.2em] text-ink-faint uppercase">
                Key features
              </h4>
              <ul className="mt-2 space-y-2">
                {study.detail.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="mt-[0.55em] h-px w-4 shrink-0 bg-accent/60"
                    />
                    <span className="text-ink-muted">{f}</span>
                  </li>
                ))}
              </ul>
              <h4 className="mt-5 font-mono text-[11px] tracking-[0.2em] text-ink-faint uppercase">
                Impact
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {study.detail.impact}
              </p>
              <h4 className="mt-5 font-mono text-[11px] tracking-[0.2em] text-ink-faint uppercase">
                What I would improve next
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {study.detail.next}
              </p>
            </div>
          </div>
        </details>
      ) : null}
    </article>
  );
}
