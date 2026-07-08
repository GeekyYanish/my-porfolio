/**
 * Work experience entries, rendered as a project-log timeline.
 * `motif` selects the visual treatment of each card.
 */

export type Experience = {
  company: string;
  location: string;
  role: string;
  period: string;
  motif: "pipeline" | "audit";
  bullets: string[];
  /** labels for the motif diagram */
  diagramSteps: string[];
};

export const experiences: Experience[] = [
  {
    company: "Adobe Inc.",
    location: "Bengaluru",
    role: "Technical Consultant Intern",
    period: "Apr 2026 — Jun 2026",
    motif: "pipeline",
    bullets: [
      "Engineered scalable mock data infrastructure with 30K+ entity profiles, 600K+ transactional events, and 100K+ secondary records",
      "Designed schema architecture that reduced data ingestion errors by 35%",
      "Built an analytics agent evaluation framework covering 50+ business test scenarios",
      "Delivered automated scoring rubric and interactive dashboard for stakeholder insights",
    ],
    diagramSteps: [
      "Mock Entities",
      "Event Streams",
      "Schema Layer",
      "Eval Scenarios",
      "Dashboard",
    ],
  },
  {
    company: "Skylena Info Technology Pvt. Ltd.",
    location: "Bengaluru",
    role: "Cybersecurity Intern",
    period: "Jan 2024 — Mar 2024",
    motif: "audit",
    bullets: [
      "Performed penetration testing and vulnerability assessments on AWS-hosted web applications",
      "Documented technical findings and remediation steps for stakeholders",
    ],
    diagramSteps: [
      "Recon & scoping",
      "Vulnerability scan",
      "Manual penetration tests",
      "Findings documented",
      "Remediation steps delivered",
    ],
  },
];
