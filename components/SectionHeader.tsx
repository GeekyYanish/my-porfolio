import Reveal from "@/components/Reveal";

/**
 * The comic-issue section header: a numbered eyebrow on a web strand, a
 * poster-scale h2, and an optional intro. Every section uses this so the
 * page keeps one rhythm.
 */
export default function SectionHeader({
  issue,
  label,
  title,
  intro,
  align = "left",
}: {
  /** Two-digit issue number, e.g. "01". */
  issue: string;
  /** Small caps label beside the number. */
  label: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <header className={`mb-12 sm:mb-16 ${centered ? "text-center" : ""}`}>
      <Reveal variant="fade">
        <div
          className={`flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.28em] text-web-400 uppercase ${
            centered ? "justify-center" : ""
          }`}
        >
          <span aria-hidden="true" className="text-ink-faint">
            Issue
          </span>
          <span className="text-base leading-none text-web-500">#{issue}</span>
          <span
            aria-hidden="true"
            className="h-px w-8 bg-linear-to-r from-web-500 to-transparent"
          />
          <span className="text-ink-muted">{label}</span>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="mt-4 text-4xl leading-[0.9] text-ink sm:text-6xl lg:text-7xl">
          {title}
        </h2>
      </Reveal>

      {intro && (
        <Reveal delay={0.12}>
          <p
            className={`mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg ${
              centered ? "mx-auto" : ""
            }`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </header>
  );
}
