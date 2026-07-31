/**
 * Skills grouped by capability. Each group cites the projects
 * that prove it — skills never appear without evidence.
 *
 * Array order is the order groups are placed around the skill web, so
 * neighbours should be related where possible: the `related` chords look
 * natural when they connect adjacent or near-adjacent spokes.
 */

export type SkillGroup = {
  title: string;
  code: string;
  /**
   * Proficiency, 1–5. Drives how far the node sits from the centre of the
   * skill web, so the outline doubles as a radar chart. Editorial, derived
   * from how much shipped work backs each group — adjust freely.
   */
  level: 1 | 2 | 3 | 4 | 5;
  /** One line shown in the expanded popup card. */
  blurb: string;
  items: string[];
  evidence: string[];
  /** Codes of related groups — drawn as animated web chords. */
  related: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Data & Analytics",
    code: "DA",
    level: 5,
    blurb:
      "Modeling data that holds up under inspection, then proving it with dashboards and evaluation scenarios.",
    items: [
      "Python",
      "SQL",
      "Data modeling",
      "Dashboards",
      "Jupyter Notebook",
      "Evaluation frameworks",
    ],
    evidence: ["Adobe evaluation harness", "Machine Learning Lab"],
    related: ["AI", "FS"],
  },
  {
    title: "AI Systems",
    code: "AI",
    level: 4,
    blurb:
      "Turning model output into scored, explainable signals rather than a black box verdict.",
    items: [
      "Ollama",
      "AI-generated content workflows",
      "Behavioral analytics",
      "Scoring systems",
    ],
    evidence: ["Procto integrity engine", "Adobe scoring rubric"],
    related: ["DA", "FS"],
  },
  {
    title: "Full Stack",
    code: "FS",
    level: 5,
    blurb:
      "End-to-end product work — real-time backends, typed APIs, and the interfaces on top of them.",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "MongoDB",
    ],
    evidence: ["Procto", "Dochain", "Full-stack coursework"],
    related: ["AI", "W3", "CT"],
  },
  {
    title: "Web3",
    code: "W3",
    level: 4,
    blurb:
      "Wallet onboarding and publicly verifiable transaction flows, built for people who aren't crypto-native.",
    items: [
      "Ethers.js",
      "Web3Modal",
      "Wallet integration",
      "Blockchain transaction tracking",
    ],
    evidence: ["Dochain", "HBL_ODYSSEY"],
    related: ["FS", "SEC"],
  },
  {
    title: "Security",
    code: "SEC",
    level: 3,
    blurb:
      "Finding the ways a web application breaks, then writing up the fix so someone can actually ship it.",
    items: [
      "Penetration testing",
      "Vulnerability assessment",
      "Remediation reporting",
    ],
    evidence: ["Skylena internship"],
    related: ["W3", "CT"],
  },
  {
    title: "Cloud & Tools",
    code: "CT",
    level: 3,
    blurb:
      "The deployment and delivery layer underneath everything else on this page.",
    items: ["AWS", "Git", "Cloudinary"],
    evidence: ["Skylena AWS assessments", "All project repos"],
    related: ["FS", "SEC"],
  },
];
