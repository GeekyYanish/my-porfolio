/**
 * Core identity, links, and copy. Edit this file to update
 * headlines, contact details, education, and achievements.
 */

export const site = {
  name: "Yanish Rai",
  shortName: "YR",
  url: "https://yanish.me",
  location: "Bengaluru, Karnataka, India",
  /** Short form used in the hero eyebrow and footer title block. */
  neighborhood: "Bengaluru",
  /** Fills the blank in "Your Friendly Neighborhood ______". */
  profession: "Full-Stack Developer",
  headline: "Your Friendly Neighborhood Full-Stack Developer.",
  subheadline:
    "MCA student from CHRIST University building data-rich applications, AI evaluation workflows, real-time proctoring systems, and transparent Web3 products.",
  /**
   * The one-line answer to "what is he looking for", shown in the hero
   * eyebrow. Recruiters skimming for twenty seconds were previously told
   * what Yanish does but never what he wants; `targetRoles` — the only
   * place that said so — sits at the very bottom of the page.
   */
  availability: "Open to Full-Stack roles",
  supportLine:
    "Data analytics, AI systems, and full-stack products built with measurable engineering outcomes.",
  email: "yanishrai24@gmail.com",
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
    "Full-Stack Developer",
    "Data Analyst",
    "Data Engineer Intern",
    "Technical Consultant",
    "AI Application Developer",
    "Web3 / FinTech Builder",
  ],
  /**
   * Master switch for Lenis momentum scrolling. Set to false to fall back to
   * the browser's native scroll everywhere. (Lenis is additionally disabled
   * under `prefers-reduced-motion` and on coarse pointers regardless.)
   */
  smoothScroll: true,
};

/**
 * The origin story, told in comic panels. Each beat is one panel in the
 * About section — `caption` is the boxed narration, `line` the spoken beat.
 */
export type OriginBeat = {
  panel: string;
  caption: string;
  line: string;
};

export const originBeats: OriginBeat[] = [
  {
    panel: "01",
    caption: "Bengaluru. A campus lab, well past closing time.",
    line: "Started where product, data, and engineering overlap — and kept building there.",
  },
  {
    panel: "02",
    caption: "The work spread out fast.",
    line: "Evaluation infrastructure, AI proctoring, Web3 donation tracking, security audits, full-stack apps.",
  },
  {
    panel: "03",
    caption: "One rule stuck.",
    line: "Ship things that are technically clear, measurable, and actually useful.",
  },
];

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
