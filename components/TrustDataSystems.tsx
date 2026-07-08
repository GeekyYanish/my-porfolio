import { ShieldCheck, Database, Workflow } from "lucide-react";
import { identityModules } from "@/data/site";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";

const icons = {
  trust: ShieldCheck,
  data: Database,
  systems: Workflow,
} as const;

const accents = {
  trust: "text-accent border-accent/50",
  data: "text-teal-data border-teal-data/50",
  systems: "text-gold border-gold/50",
} as const;

/**
 * The signature section: three connected blueprint modules mapping
 * Trust / Data / Systems onto concrete pieces of work.
 */
export default function TrustDataSystems() {
  return (
    <Section
      id="identity"
      sheet="SHT 01"
      label="Technical Identity"
      title="Trust, Data, Systems"
      intro="One theme runs through everything I build: systems people can verify. Proctoring integrity, transparent transactions, evaluated analytics — each project is one of these three modules made concrete."
    >
      <div className="relative grid gap-6 md:grid-cols-3">
        {/* connector line across modules on desktop */}
        <div
          aria-hidden="true"
          className="absolute top-8 right-8 left-8 hidden h-px bg-line/20 md:block"
        />
        {identityModules.map((mod, i) => {
          const Icon = icons[mod.key];
          return (
            <Reveal key={mod.key} delay={i * 0.12}>
              <article className="corner-ticks relative h-full border border-line/15 bg-bp-900/60 p-6">
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex h-11 w-11 items-center justify-center border bg-bp-900 ${accents[mod.key]}`}
                  >
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.25em] text-ink-faint uppercase">
                      MODULE {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-heading text-xl font-semibold text-ink">
                      {mod.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                  {mod.thesis}
                </p>
                <ul className="mt-5 space-y-3 border-t border-line/10 pt-4">
                  {mod.examples.map((ex) => (
                    <li key={ex.label} className="text-sm">
                      <p className="leading-snug text-ink">{ex.label}</p>
                      <p className="mt-0.5 font-mono text-[11px] text-ink-faint">
                        ↳ {ex.source}
                      </p>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
