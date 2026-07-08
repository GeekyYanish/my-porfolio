import { metrics } from "@/data/metrics";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";

const accentText = {
  cyan: "text-accent",
  teal: "text-teal-data",
  gold: "text-gold",
} as const;

const accentBorder = {
  cyan: "bg-accent/60",
  teal: "bg-teal-data/60",
  gold: "bg-gold/60",
} as const;

/**
 * Metrics rendered as blueprint measurement callouts:
 * dimension line with end ticks above each figure, and a
 * one-line annotation explaining what the number means.
 */
export default function MetricCallouts() {
  return (
    <Section
      id="metrics"
      sheet="SHT 02"
      label="Measured Output"
      title="Numbers with context"
      intro="Every figure below is a measurement from real work — none of them stand without an explanation of what was built and why the number matters."
    >
      <div className="grid gap-px border border-line/15 bg-line/10 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric, i) => {
          const accent = metric.accent ?? "cyan";
          return (
            <Reveal key={metric.label} delay={(i % 3) * 0.08}>
              <div className="h-full bg-bp-800 p-6">
                {/* dimension line */}
                <div className="flex items-center" aria-hidden="true">
                  <span className={`h-2.5 w-px ${accentBorder[accent]}`} />
                  <span className={`h-px w-16 ${accentBorder[accent]}`} />
                  <span className={`h-2.5 w-px ${accentBorder[accent]}`} />
                </div>
                <p
                  className={`mt-3 font-mono text-3xl font-semibold tracking-tight ${accentText[accent]}`}
                >
                  {metric.value}
                </p>
                <p className="mt-1 font-mono text-[12px] tracking-wide text-ink uppercase">
                  {metric.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {metric.context}
                </p>
              </div>
            </Reveal>
          );
        })}
        {/* filler cell keeps the grid rectangular on lg (7 items in 3 cols) */}
        <div
          aria-hidden="true"
          className="hidden bg-bp-800 p-6 lg:flex lg:flex-col lg:justify-end"
        >
          <p className="font-mono text-[11px] leading-relaxed text-ink-faint">
            ALL DIMENSIONS VERIFIED
            <br />
            AGAINST DELIVERED WORK
            <br />
            SCALE 1:1 · REV A
          </p>
        </div>
      </div>
    </Section>
  );
}
