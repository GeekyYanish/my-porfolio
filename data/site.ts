/**
 * Core identity, links, and copy. Edit this file to update
 * headlines, contact details, education, and achievements.
 */

export const site = {
  name: "Yanish Rai",
  shortName: "YR",
  location: "Bengaluru, Karnataka, India",
  headline: "I build systems where trust, data, and product engineering meet.",
  subheadline:
    "MCA student from CHRIST University building data-rich applications, AI evaluation workflows, real-time proctoring systems, and transparent Web3 products.",
  supportLine:
    "Data analytics, AI systems, and full-stack products built with measurable engineering outcomes.",
  email: "yanish.rai@mca.christuniversity.in",
  github: "https://github.com/GeekyYanish",
  githubHandle: "GeekyYanish",
  linkedin: "https://www.linkedin.com/in/yanishrai/",
  linkedinHandle: "yanishrai",
  resumePath: "/resume.pdf",
  about:
    "I’m based in Bengaluru and enjoy building systems where product, data, and engineering meet. My work has moved across analytics evaluation infrastructure, AI-powered proctoring, Web3 donation tracking, cybersecurity, and full-stack applications. I care about building products that are technically clear, measurable, and useful.",
  contactCta:
    "Open to internships, entry-level roles, technical consulting opportunities, and product engineering collaborations.",
  targetRoles: [
    "Data Analyst",
    "Data Engineer Intern",
    "Full-Stack Developer",
    "Technical Consultant",
    "AI Application Developer",
    "Web3 / FinTech Builder",
  ],
};

export type EducationEntry = {
  institution: string;
  place: string;
  degree: string;
  cgpa: string;
};

export const education: EducationEntry[] = [
  {
    institution: "CHRIST (Deemed to be University)",
    place: "Bengaluru",
    degree: "MCA — Master of Computer Applications",
    cgpa: "8.89 / 10",
  },
  {
    institution: "St. Joseph’s College",
    place: "Bengaluru",
    degree: "BCA — Bachelor of Computer Applications",
    cgpa: "8.01 / 10",
  },
];

export type Achievement = {
  title: string;
  detail: string;
  highlight?: boolean;
};

export const achievements: Achievement[] = [
  {
    title: "1st Runner-up — VERSION’26, NIT Trichy",
    detail:
      "National intercollegiate competition; placed 2nd with a team of 4 among 30+ competing teams.",
    highlight: true,
  },
  {
    title: "Class Representative — CHRIST University",
    detail:
      "Elected representative coordinating between faculty and the MCA cohort.",
  },
  {
    title: "Peace and Reconciliation Head — NETSF, St. Joseph’s College",
    detail:
      "Led a 100+ member student forum promoting cultural dialogue and social cohesion.",
  },
];

/** The Trust / Data / Systems identity modules. */
export type IdentityModule = {
  key: "trust" | "data" | "systems";
  title: string;
  thesis: string;
  examples: { label: string; source: string }[];
};

export const identityModules: IdentityModule[] = [
  {
    key: "trust",
    title: "Trust",
    thesis:
      "Systems people can rely on: exam integrity, transparent transactions, and hardened web applications.",
    examples: [
      {
        label: "Behavioral integrity scoring for online exams",
        source: "Procto",
      },
      {
        label: "Publicly verifiable donation transaction tracking",
        source: "Dochain",
      },
      {
        label: "Penetration testing on AWS-hosted web applications",
        source: "Skylena internship",
      },
    ],
  },
  {
    key: "data",
    title: "Data",
    thesis:
      "Data infrastructure that holds up under inspection: schemas, mock datasets, dashboards, and evaluation scenarios.",
    examples: [
      {
        label: "600K+ transactional events modeled for agent evaluation",
        source: "Adobe internship",
      },
      {
        label: "Schema design that cut ingestion errors by 35%",
        source: "Adobe internship",
      },
      {
        label: "50+ business test scenarios benchmarked with scoring rubrics",
        source: "Evaluation harness",
      },
    ],
  },
  {
    key: "systems",
    title: "Systems",
    thesis:
      "End-to-end products: real-time backends, Web3 flows, full-stack apps, and the architecture holding them together.",
    examples: [
      {
        label: "Real-time proctoring supporting 50+ concurrent users",
        source: "Procto",
      },
      {
        label: "Wallet onboarding and multi-provider authentication",
        source: "Dochain / HBL_ODYSSEY",
      },
      {
        label: "Peer-to-peer networking experiments in Go and TypeScript",
        source: "P2P Library",
      },
    ],
  },
];
