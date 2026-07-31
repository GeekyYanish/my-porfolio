import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import SkillWeb from "@/components/SkillWeb";

export default function Skills() {
  return (
    <section id="skills" className="defer-paint relative py-24 sm:py-32">
      {/* faint halftone wash so the section reads as a printed page */}
      <div
        aria-hidden="true"
        className="halftone pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{ "--dot-size": "10px" } as React.CSSProperties}
      />

      <Container className="relative">
        <SectionHeader
          issue="02"
          label="Capability Map"
          title="Skills, wired to evidence"
          intro="Grouped by capability rather than listed flat — the outline is a proficiency profile, and every group points at the work that proves it."
        />
        <SkillWeb />
      </Container>
    </section>
  );
}
