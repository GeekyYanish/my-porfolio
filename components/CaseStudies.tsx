import { caseStudies } from "@/data/projects";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import CaseStudyCard from "@/components/CaseStudyCard";

export default function CaseStudies() {
  return (
    <Section
      id="work"
      sheet="SHT 03"
      label="Featured Drawings"
      title="Case studies"
      intro="Five systems, five different schematics — a real-time event flow, a ledger graph, a measured data pipeline, an experiment log, and a peer mesh. Each drawn the way the system actually works."
    >
      <div className="space-y-10">
        {caseStudies.map((study, i) => (
          <Reveal key={study.id} delay={0.05}>
            <CaseStudyCard study={study} flip={i % 2 === 1} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
