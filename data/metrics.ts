/**
 * Metrics rendered as blueprint measurement callouts.
 * Each metric carries one line of context — numbers never stand alone.
 */

export type Metric = {
  value: string;
  label: string;
  context: string;
  accent?: "cyan" | "teal" | "gold";
};

export const metrics: Metric[] = [
  {
    value: "30K+",
    label: "entity profiles generated",
    context:
      "Synthetic customer and account profiles powering an analytics agent evaluation environment.",
    accent: "teal",
  },
  {
    value: "600K+",
    label: "transactional events modeled",
    context:
      "Event-level mock data with realistic distributions for testing analytics pipelines at scale.",
    accent: "teal",
  },
  {
    value: "100K+",
    label: "secondary records generated",
    context:
      "Supporting lookup and dimension records keeping the mock dataset internally consistent.",
    accent: "teal",
  },
  {
    value: "35%",
    label: "reduction in ingestion errors",
    context:
      "Result of redesigning the schema architecture feeding the evaluation data pipeline.",
    accent: "cyan",
  },
  {
    value: "50+",
    label: "evaluation scenarios benchmarked",
    context:
      "Business test scenarios with automated scoring rubrics for analytics agent responses.",
    accent: "cyan",
  },
  {
    value: "50+",
    label: "concurrent users in Procto",
    context:
      "Real-time proctoring sessions with live webcam events handled over Socket.io.",
    accent: "cyan",
  },
  {
    value: "30+",
    label: "teams competed at VERSION’26",
    context:
      "National intercollegiate competition at NIT Trichy — finished 1st runner-up in a team of 4.",
    accent: "gold",
  },
];
