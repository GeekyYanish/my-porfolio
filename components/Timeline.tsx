import { Award, Briefcase, GraduationCap } from "lucide-react";
import Container from "@/components/Container";
import WebMesh from "@/components/art/WebMesh";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { timeline, type TimelineNode } from "@/data/experience";

const KIND = {
  work: {
    Icon: Briefcase,
    label: "Experience",
    text: "text-web-400",
    ring: "border-web-500",
    fill: "bg-web-500",
  },
  study: {
    Icon: GraduationCap,
    label: "Education",
    text: "text-sense-400",
    ring: "border-sense-500",
    fill: "bg-sense-500",
  },
  honor: {
    Icon: Award,
    label: "Milestone",
    text: "text-gold",
    ring: "border-gold",
    fill: "bg-gold",
  },
} as const;

function Node({ node, index }: { node: TimelineNode; index: number }) {
  const k = KIND[node.kind];
  const left = index % 2 === 0;

  return (
    <li className="relative grid md:grid-cols-2 md:gap-x-14">
      {/* attachment point on the strand */}
      <span
        aria-hidden="true"
        className="absolute top-7 left-4 z-10 -translate-x-1/2 md:left-1/2"
      >
        <span className="relative flex h-5 w-5 items-center justify-center">
          <svg
            viewBox="0 0 60 60"
            className={`absolute h-12 w-12 ${k.text}`}
            aria-hidden="true"
          >
            <WebMesh
              cx={30}
              cy={30}
              radius={28}
              spokes={8}
              rings={3}
              sag={0.16}
              strokeWidth={1}
              opacity={0.4}
            />
          </svg>
          <span
            className={`h-3 w-3 rotate-45 border-2 bg-night-950 ${k.ring}`}
          />
        </span>
      </span>

      <Reveal
        variant={left ? "left" : "right"}
        className={`pl-12 md:pl-0 ${
          left ? "md:col-start-1 md:pr-2" : "md:col-start-2 md:pl-2"
        }`}
      >
        <article className="comic-panel relative p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span
              className={`inline-flex items-center gap-1.5 font-mono text-[0.62rem] tracking-[0.2em] uppercase ${k.text}`}
            >
              <k.Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {k.label}
            </span>
            {node.period && (
              <span className="font-mono text-[0.65rem] text-ink-faint">
                {node.period}
              </span>
            )}
            {node.meta && (
              <span className="border border-ink/15 px-2 py-0.5 font-mono text-[0.62rem] text-ink-muted">
                {node.meta}
              </span>
            )}
          </div>

          <h3 className="mt-2.5 font-heading text-xl leading-tight text-ink sm:text-2xl">
            {node.title}
          </h3>
          <p className="mt-1 text-sm text-ink-muted">
            {node.org}
            {node.place && (
              <span className="text-ink-faint"> · {node.place}</span>
            )}
          </p>

          {node.detail && (
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {node.detail}
            </p>
          )}

          {node.bullets && (
            <ul className="mt-4 space-y-2">
              {node.bullets.map((b) => (
                <li
                  key={b}
                  className="flex gap-2.5 text-sm leading-relaxed text-ink-muted"
                >
                  <span
                    aria-hidden="true"
                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 ${k.fill}`}
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          {node.steps && (
            <ol className="mt-4 flex flex-wrap gap-1.5 border-t border-ink/10 pt-3.5">
              {node.steps.map((s) => (
                <li
                  key={s}
                  className="border border-ink/12 px-2 py-0.5 font-mono text-[0.6rem] tracking-wide text-ink-faint"
                >
                  {s}
                </li>
              ))}
            </ol>
          )}

          {node.highlight && (
            <span
              aria-hidden="true"
              className="absolute -top-px -right-px h-6 w-6 border-t-2 border-r-2 border-gold"
            />
          )}
        </article>
      </Reveal>
    </li>
  );
}

export default function Timeline() {
  return (
    <section id="experience" className="defer-paint relative py-24 sm:py-32">
      <Container>
        <SectionHeader
          issue="04"
          label="Field Log"
          title="Experience & education"
          intro="Work, degrees, and milestones hanging off one strand, most recent first."
        />

        <div className="relative">
          {/* the strand itself */}
          <span
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-4 w-px bg-linear-to-b from-transparent via-web-500/45 to-transparent md:left-1/2"
          />

          <ol className="space-y-10 sm:space-y-12">
            {timeline.map((node, i) => (
              <Node key={node.id} node={node} index={i} />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
