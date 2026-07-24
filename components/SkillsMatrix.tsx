import { skillGroups } from "@/data/skills";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";

/**
 * Skills as a wiring diagram: each capability cluster carries
 * blueprint tags plus leader lines pointing to the projects
 * that prove the skill.
 */
export default function SkillsMatrix() {
  return (
    <Section
      id="skills"
      sheet="SHT 04"
      label="Capability Matrix"
      title="Skills, wired to evidence"
      intro="Grouped by capability, not listed flat — and every group points at the project where the skill was actually used."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.code} delay={(i % 3) * 0.1}>
            <article className="corner-ticks flex h-full flex-col border border-line/15 bg-bp-900/60 p-5">
              <header className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center border border-accent/50 font-mono text-[11px] font-semibold text-accent">
                  {group.code}
                </span>
                <h3 className="font-heading text-lg font-semibold text-ink">
                  {group.title}
                </h3>
              </header>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border border-line/25 bg-bp-800 px-2 py-1 font-mono text-[11px] text-ink-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              {/* leader line to evidence */}
              <div className="mt-auto pt-5">
                <div className="flex items-center gap-2" aria-hidden="true">
                  <span className="h-px w-6 bg-teal-data/60" />
                  <span className="h-1.5 w-1.5 rotate-45 border border-teal-data/60" />
                </div>
                <p className="mt-2 font-mono text-[11px] leading-relaxed text-teal-data/90">
                  PROVEN IN: {group.evidence.join(" · ")}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
