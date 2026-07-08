/**
 * Skills grouped by capability. Each group cites the projects
 * that prove it — skills never appear without evidence.
 */

export type SkillGroup = {
  title: string;
  code: string;
  items: string[];
  evidence: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Data & Analytics",
    code: "DA",
    items: [
      "Python",
      "SQL",
      "Data modeling",
      "Dashboards",
      "Jupyter Notebook",
      "Evaluation frameworks",
    ],
    evidence: ["Adobe evaluation harness", "Machine Learning Lab"],
  },
  {
    title: "Full Stack",
    code: "FS",
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
  },
  {
    title: "AI Systems",
    code: "AI",
    items: [
      "Ollama",
      "AI-generated content workflows",
      "Behavioral analytics",
      "Scoring systems",
    ],
    evidence: ["Procto integrity engine", "Adobe scoring rubric"],
  },
  {
    title: "Web3",
    code: "W3",
    items: [
      "Ethers.js",
      "Web3Modal",
      "Wallet integration",
      "Blockchain transaction tracking",
    ],
    evidence: ["Dochain", "HBL_ODYSSEY"],
  },
  {
    title: "Cloud & Tools",
    code: "CT",
    items: ["AWS", "Git", "Cloudinary"],
    evidence: ["Skylena AWS assessments", "All project repos"],
  },
  {
    title: "Security",
    code: "SEC",
    items: [
      "Penetration testing",
      "Vulnerability assessment",
      "Remediation reporting",
    ],
    evidence: ["Skylena internship"],
  },
];
