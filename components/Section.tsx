import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import DimensionRule from "@/components/DimensionRule";

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
  fadeEdges = false,
}: {
  id: string;
  sheet: string;
  label: string;
  title: string;
  intro?: string;
  children: ReactNode;
  /** Blur/fade the section's top and bottom edges into the surrounding
   *  ground, for sections that want to feel like they dissolve in and
   *  out rather than starting/ending on a hard line. */
  fadeEdges?: boolean;
}) {
  return (
    <section id={id} className="relative z-10">
      {fadeEdges ? (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-bp-800 via-bp-800/70 to-transparent backdrop-blur-sm"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-bp-800 via-bp-800/70 to-transparent backdrop-blur-sm"
          />
        </>
      ) : null}
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <Reveal>
          <header className="mb-10 md:mb-14">
            <p className="font-mono text-[11px] tracking-[0.25em] text-accent uppercase">
              {sheet} · {label}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-ink sm:text-4xl">
              {title}
            </h2>
            {intro ? (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
                {intro}
              </p>
            ) : null}
            {/* dimension rule with end ticks — draws in on scroll */}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
