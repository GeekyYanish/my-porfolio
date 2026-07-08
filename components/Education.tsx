import { GraduationCap } from "lucide-react";
import { education } from "@/data/site";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";

export default function Education() {
  return (
    <Section
      id="education"
      sheet="SHT 07"
      label="Credentials"
      title="Education"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {education.map((entry, i) => (
          <Reveal key={entry.institution} delay={i * 0.1}>
            <article className="corner-ticks flex h-full gap-4 border border-line/15 bg-bp-900/60 p-6">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-accent/50 text-accent">
                <GraduationCap size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-heading text-lg font-semibold text-ink">
                  {entry.institution}
                </h3>
                <p className="mt-1 text-sm text-ink-muted">
                  {entry.degree} · {entry.place}
                </p>
                <p className="mt-3 font-mono text-[12px] text-teal-data">
                  CGPA {entry.cgpa}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
