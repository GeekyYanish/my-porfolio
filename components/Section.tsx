import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

/**
 * Section wrapper styled like a sheet of an engineering drawing:
 * mono sheet annotation, heading, and a dimension rule underneath.
 */
export default function Section({
  id,
  sheet,
  label,
  title,
  intro,
  children,
  variant = "dark",
}: {
  id: string;
  sheet: string;
  label: string;
  title: string;
  intro?: string;
  children: ReactNode;
  variant?: "dark" | "paper";
}) {
  const isPaper = variant === "paper";

  return (
    <section
      id={id}
      className={
        isPaper
          ? "relative z-10 bg-paper text-paper-ink"
          : "relative z-10"
      }
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <Reveal>
          <header className="mb-10 md:mb-14">
            <p
              className={`font-mono text-[11px] tracking-[0.25em] uppercase ${
                isPaper ? "text-paper-accent" : "text-accent"
              }`}
            >
              {sheet} · {label}
            </p>
            <h2
              className={`mt-3 font-heading text-3xl font-semibold sm:text-4xl ${
                isPaper ? "text-paper-ink" : "text-ink"
              }`}
            >
              {title}
            </h2>
            {intro ? (
              <p
                className={`mt-4 max-w-2xl text-base leading-relaxed ${
                  isPaper ? "text-paper-ink/70" : "text-ink-muted"
                }`}
              >
                {intro}
              </p>
            ) : null}
            {/* dimension rule with end ticks */}
            <div className="mt-6 flex items-center" aria-hidden="true">
              <span
                className={`h-3 w-px ${isPaper ? "bg-paper-line/40" : "bg-line/40"}`}
              />
              <span
                className={`h-px flex-1 ${isPaper ? "bg-paper-line/25" : "bg-line/20"}`}
              />
              <span
                className={`h-3 w-px ${isPaper ? "bg-paper-line/40" : "bg-line/40"}`}
              />
            </div>
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
