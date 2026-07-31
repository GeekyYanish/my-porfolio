/**
 * Work experience, plus the merged `timeline` the Experience & Education
 * section renders: work, study, and honour milestones hanging off one strand.
 */

import { achievements, education } from "./site";

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

/**
 * One node on the web strand.
 *
 * `period` is only set where a real date exists in the source data — work
 * entries have one, degrees and honours don't, and none are invented. The
 * array order below is the display order (most recent first) and is an
 * editorial ordering, not a claim about exact dates.
 */
export type TimelineNode = {
  id: string;
  kind: "work" | "study" | "honor";
  title: string;
  org: string;
  place?: string;
  period?: string;
  meta?: string;
  detail?: string;
  bullets?: string[];
  steps?: string[];
  highlight?: boolean;
};

export const timeline: TimelineNode[] = [
  {
    id: "adobe",
    kind: "work",
    title: experiences[0].role,
    org: experiences[0].company,
    place: experiences[0].location,
    period: experiences[0].period,
    bullets: experiences[0].bullets,
    steps: experiences[0].diagramSteps,
  },
  {
    id: "version26",
    kind: "honor",
    title: achievements[0].title,
    org: "NIT Trichy",
    detail: achievements[0].detail,
    highlight: achievements[0].highlight,
  },
  {
    id: "mca",
    kind: "study",
    title: education[0].degree,
    org: education[0].institution,
    place: education[0].place,
    meta: `CGPA ${education[0].cgpa}`,
  },
  {
    id: "class-rep",
    kind: "honor",
    title: achievements[1].title,
    org: "CHRIST (Deemed to be University)",
    detail: achievements[1].detail,
  },
  {
    id: "skylena",
    kind: "work",
    title: experiences[1].role,
    org: experiences[1].company,
    place: experiences[1].location,
    period: experiences[1].period,
    bullets: experiences[1].bullets,
    steps: experiences[1].diagramSteps,
  },
  {
    id: "bca",
    kind: "study",
    title: education[1].degree,
    org: education[1].institution,
    place: education[1].place,
    meta: `CGPA ${education[1].cgpa}`,
  },
  {
    id: "netsf",
    kind: "honor",
    title: achievements[2].title,
    org: "NETSF, St. Joseph’s College",
    detail: achievements[2].detail,
  },
];
