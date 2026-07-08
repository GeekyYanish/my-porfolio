import { CheckSquare, ChevronRight } from "lucide-react";
import { experiences, type Experience } from "@/data/experience";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";

/** Mini pipeline diagram used on the Adobe card. */
function PipelineMotif({ steps }: { steps: string[] }) {
  return (
    <div aria-hidden="true">
      {/* horizontal pipeline on sm+ */}
      <ol className="hidden items-stretch gap-0 font-mono text-[10px] tracking-wide text-ink-muted uppercase sm:flex">
        {steps.map((step, i) => (
          <li key={step} className="flex flex-1 items-center">
            <span className="w-full border border-teal-data/50 bg-bp-900 px-2 py-2 text-center leading-tight">
              {step}
            </span>
            {i < steps.length - 1 ? (
              <ChevronRight
                size={14}
                className="mx-0.5 shrink-0 text-line/50"
              />
            ) : null}
          </li>
        ))}
      </ol>
      {/* stacked pipeline on mobile */}
      <ol className="flex flex-col gap-1 font-mono text-[10px] tracking-wide text-ink-muted uppercase sm:hidden">
        {steps.map((step, i) => (
          <li key={step} className="flex items-center gap-2">
            <span className="text-teal-data/70">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex-1 border border-teal-data/40 bg-bp-900 px-2 py-1.5">
              {step}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Audit checklist motif used on the Skylena card. */
function AuditMotif({ steps }: { steps: string[] }) {
  return (
    <ul
      aria-hidden="true"
      className="space-y-1.5 font-mono text-[11px] tracking-wide text-ink-muted"
    >
      {steps.map((step) => (
        <li key={step} className="flex items-center gap-2">
          <CheckSquare size={13} className="shrink-0 text-warn/80" />
          <span className="uppercase">{step}</span>
          <span className="ml-auto text-line/40">✓ PASS</span>
        </li>
      ))}
    </ul>
  );
}

function ExperienceCard({
  exp,
  primary,
}: {
  exp: Experience;
  primary: boolean;
}) {
  return (
    <article
      className={`corner-ticks border bg-bp-900/60 ${
        primary ? "border-teal-data/30 p-6 sm:p-8" : "border-line/15 p-6"
      }`}
    >
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div>
          <h3 className="font-heading text-xl font-semibold text-ink">
            {exp.company}
          </h3>
          <p className="mt-0.5 text-sm text-ink-muted">
            {exp.role} · {exp.location}
          </p>
        </div>
        <p className="font-mono text-[12px] tracking-wide text-accent">
          {exp.period}
        </p>
      </header>

      <div className="mt-5">
        {exp.motif === "pipeline" ? (
          <PipelineMotif steps={exp.diagramSteps} />
        ) : (
          <AuditMotif steps={exp.diagramSteps} />
        )}
      </div>

      <ul className="mt-5 space-y-2.5">
        {exp.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3 text-sm leading-relaxed">
            <span
              aria-hidden="true"
              className={`mt-[0.55em] h-px w-4 shrink-0 ${
                exp.motif === "pipeline" ? "bg-teal-data/70" : "bg-warn/70"
              }`}
            />
            <span className="text-ink-muted">{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function ExperienceTimeline() {
  return (
    <Section
      id="experience"
      sheet="SHT 03"
      label="Project Log"
      title="Experience"
      intro="Logged in reverse chronological order, the way a drawing revision table reads — most recent revision first."
    >
      <ol className="relative space-y-10 border-l border-line/20 pl-6 sm:pl-10">
        {experiences.map((exp, i) => (
          <li key={exp.company} className="relative">
            {/* timeline node marker */}
            <span
              aria-hidden="true"
              className="absolute top-7 -left-6 flex h-4 w-4 -translate-x-1/2 items-center justify-center sm:-left-10"
            >
              <span
                className={`h-2.5 w-2.5 rotate-45 border ${
                  i === 0
                    ? "border-teal-data bg-teal-data/30"
                    : "border-line/60 bg-bp-800"
                }`}
              />
            </span>
            <Reveal delay={i * 0.1}>
              <ExperienceCard exp={exp} primary={i === 0} />
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
