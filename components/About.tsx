import { site } from "@/data/site";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <Section id="about" sheet="SHT 08" label="General Notes" title="About">
      <Reveal>
        <div className="corner-ticks max-w-3xl border border-line/15 bg-bp-900/60 p-6 sm:p-8">
          <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
            {site.about}
          </p>
          <p className="mt-6 font-mono text-[11px] tracking-wide text-ink-faint uppercase">
            Currently targeting: {site.targetRoles.join(" · ")}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
