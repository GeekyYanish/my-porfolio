/**
 * Featured case studies and the curated GitHub repo register.
 * `diagram` selects the bespoke schematic each case study renders.
 */

export type CaseStudyDetail = {
  problem: string;
  role: string;
  architecture: string;
  features: string[];
  impact: string;
  next: string;
};

export type CaseStudy = {
  id: string;
  figure: string;
  title: string;
  tagline: string;
  tech: string[];
  summary: string;
  points: string[];
  diagram: "procto" | "dochain" | "harness" | "mllab" | "p2p";
  diagramFlow: string[];
  links: { label: string; href: string }[];
  detail?: CaseStudyDetail;
  confidentialityNote?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "procto",
    figure: "FIG. 01",
    title: "Procto — AI-Powered Proctoring Platform",
    tagline: "Trust in online exams",
    tech: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Socket.io",
      "Ollama",
      "TypeScript",
    ],
    summary:
      "A full-stack AI examination platform with real-time proctoring, face detection, window blur tracking, webcam monitoring, AI-generated exam content from documents, and behavioral analytics.",
    points: [
      "Supported 50+ concurrent users in live proctoring sessions",
      "Designed the behavioral analytics engine producing trust and integrity scores",
      "Built real-time monitoring workflows over Socket.io",
      "Generated exam content from uploaded documents using Ollama",
    ],
    diagram: "procto",
    diagramFlow: [
      "Candidate",
      "Webcam Events",
      "Proctoring Engine",
      "Integrity Score",
      "Dashboard",
    ],
    links: [{ label: "GitHub", href: "https://github.com/GeekyYanish/Procto" }],
    detail: {
      problem:
        "Online exams are easy to compromise: candidates switch windows, look away, or bring help off-camera. Institutions need integrity signals that are continuous and explainable, not a single pass/fail webcam check.",
      role:
        "Designed and built the platform end-to-end: real-time event pipeline, behavioral analytics engine, exam authoring with AI-generated content, and the examiner dashboard.",
      architecture:
        "React front end streams webcam, focus, and window-blur events over Socket.io to a Node.js engine. Events are persisted in PostgreSQL via Prisma and scored by a behavioral analytics layer that aggregates signals into a per-candidate integrity score. Ollama generates exam questions from uploaded source documents.",
      features: [
        "Face detection and webcam monitoring during live sessions",
        "Window blur and tab-switch tracking as behavioral signals",
        "AI-generated exam content from instructor documents",
        "Integrity score dashboard for examiners, updated in real time",
      ],
      impact:
        "Handled 50+ concurrent proctored users with live event scoring, giving examiners a continuous, explainable view of session integrity instead of raw video review.",
      next:
        "Calibrate score weightings against labeled sessions, add appeal/review workflows for flagged candidates, and load-test the event pipeline beyond the current concurrency ceiling.",
    },
  },
  {
    id: "dochain",
    figure: "FIG. 02",
    title: "Dochain — Decentralized Crowdfunding & Donation Tracking",
    tagline: "Trust in donations and transactions",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Ethers.js",
      "Web3Modal",
      "Authentication",
    ],
    summary:
      "A blockchain-based donation platform focused on transparent transaction tracking, wallet onboarding, and trust in donation flows.",
    points: [
      "Transparent blockchain transaction tracking for every donation",
      "Multi-provider authentication alongside wallet login",
      "Wallet integration via Web3Modal and Ethers.js",
      "Web3 onboarding designed for non-crypto-native donors",
    ],
    diagram: "dochain",
    diagramFlow: [
      "Donor Wallet",
      "Campaign Contract",
      "Transaction Ledger",
      "Public Verification",
    ],
    links: [
      { label: "Dochain", href: "https://github.com/GeekyYanish/dochain" },
      {
        label: "HBL_ODYSSEY",
        href: "https://github.com/GeekyYanish/HBL_ODYSSEY",
      },
    ],
  },
  {
    id: "harness",
    figure: "FIG. 03",
    title: "Analytics Agent Evaluation Harness",
    tagline: "Trust in analytics and data quality",
    tech: ["Data modeling", "Schema design", "Scoring rubrics", "Dashboards"],
    summary:
      "Data and evaluation infrastructure built during my Adobe internship: large mock datasets, schema design, scenario benchmarking, automated scoring rubrics, and dashboard-based insights.",
    points: [
      "30K+ entity profiles and 600K+ transactional events generated",
      "100K+ secondary records keeping the dataset internally consistent",
      "50+ business scenarios benchmarked against an automated scoring rubric",
      "Schema redesign reduced data ingestion errors by 35%",
    ],
    diagram: "harness",
    diagramFlow: [
      "Mock Entities",
      "Transaction Events",
      "Scenario Tests",
      "Scoring Rubric",
      "Dashboard Insights",
    ],
    links: [],
    confidentialityNote:
      "Presented as an anonymized internship case study; internal tooling and datasets are not public.",
  },
  {
    id: "mllab",
    figure: "FIG. 04",
    title: "Machine Learning Lab",
    tagline: "Experimentation and analytics practice",
    tech: ["Python", "Jupyter Notebook"],
    summary:
      "Applied machine learning and data analysis notebooks showing experimentation, analytics practice, and model and data understanding.",
    points: [
      "Regression, classification, and evaluation notebooks",
      "Data cleaning and exploratory analysis workflows",
      "Documented experiment logs per lab session",
    ],
    diagram: "mllab",
    diagramFlow: ["Dataset", "Preprocess", "Train", "Evaluate", "Log"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/GeekyYanish/Machine_learning_lab",
      },
    ],
  },
  {
    id: "p2p",
    figure: "FIG. 05",
    title: "Peer-to-Peer Library Experiments",
    tagline: "Networking and backend systems",
    tech: ["Go", "TypeScript"],
    summary:
      "Networking and backend systems experiments around peer-to-peer concepts: node discovery, message passing, and decentralized data exchange.",
    points: [
      "Peer discovery and connection handling experiments",
      "Parallel implementations in Go and TypeScript",
      "Groundwork for decentralized application patterns",
    ],
    diagram: "p2p",
    diagramFlow: ["Peer A", "Discovery", "Peer B", "Exchange"],
    links: [
      {
        label: "P2P_Library (Go)",
        href: "https://github.com/GeekyYanish/P2P_Library",
      },
      {
        label: "peer_to_peer_lib (TS)",
        href: "https://github.com/GeekyYanish/peer_to_peer_lib",
      },
    ],
  },
];

/** Curated GitHub register — the "drawing index" of public work. */
export type Repo = {
  index: string;
  name: string;
  description: string;
  stack: string[];
  href: string;
  demo?: string;
  note?: string;
};

export const repos: Repo[] = [
  {
    index: "R-01",
    name: "Procto",
    description:
      "AI-powered exam proctoring platform with real-time monitoring and integrity scoring.",
    stack: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    href: "https://github.com/GeekyYanish/Procto",
  },
  {
    index: "R-02",
    name: "dochain",
    description:
      "Decentralized crowdfunding and donation tracking with wallet onboarding.",
    stack: ["Next.js", "Ethers.js", "TypeScript"],
    href: "https://github.com/GeekyYanish/dochain",
  },
  {
    index: "R-03",
    name: "HBL_ODYSSEY",
    description:
      "Hackathon build exploring transparent Web3 donation flows and authentication.",
    stack: ["Next.js", "Web3Modal", "TypeScript"],
    href: "https://github.com/GeekyYanish/HBL_ODYSSEY",
    note: "Hackathon project",
  },
  {
    index: "R-04",
    name: "Machine_learning_lab",
    description:
      "Applied ML and data analysis notebooks — experiments, evaluation, and analytics practice.",
    stack: ["Python", "Jupyter"],
    href: "https://github.com/GeekyYanish/Machine_learning_lab",
  },
  {
    index: "R-05",
    name: "P2P_Library",
    description: "Peer-to-peer networking experiments in Go.",
    stack: ["Go"],
    href: "https://github.com/GeekyYanish/P2P_Library",
    note: "Systems experiment",
  },
];
