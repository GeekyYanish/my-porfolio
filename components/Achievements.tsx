import { achievements } from "@/data/site";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";

/**
 * Achievements plotted as annotated coordinate markers on a
 * blueprint line — the highlight (VERSION'26) drawn in gold.
 */
export default function Achievements() {
  return (
    <Section
      id="achievements"
      sheet="SHT 07"
      label="Milestones"
      title="Achievements & leadership"
    >
      <ol className="relative space-y-8 border-l border-line/20 pl-8 sm:pl-12">
        {achievements.map((item, i) => (
          <li key={item.title} className="relative">
            {/* coordinate crosshair marker */}
            <span
              aria-hidden="true"
              className="absolute top-1 -left-8 -translate-x-1/2 sm:-left-12"
            >
              <span className="relative block h-5 w-5">
                <span
                  className={`absolute inset-0 rounded-full border ${
                    item.highlight ? "border-gold" : "border-line/50"
                  }`}
                />
                <span
                  className={`absolute top-1/2 left-1/2 h-px w-7 -translate-x-1/2 -translate-y-1/2 ${
                    item.highlight ? "bg-gold/60" : "bg-line/30"
                  }`}
                />
                <span
                  className={`absolute top-1/2 left-1/2 h-7 w-px -translate-x-1/2 -translate-y-1/2 ${
                    item.highlight ? "bg-gold/60" : "bg-line/30"
                  }`}
                />
              </span>
            </span>
            <Reveal delay={i * 0.1}>
              <p className="font-mono text-[10px] tracking-[0.25em] text-ink-faint uppercase">
                MARK {String(i + 1).padStart(2, "0")}
              </p>
              <h3
                className={`mt-1 font-heading text-lg font-semibold ${
                  item.highlight ? "text-gold" : "text-ink"
                }`}
              >
                {item.title}
              </h3>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-muted">
                {item.detail}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
