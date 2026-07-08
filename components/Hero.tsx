import { ArrowDown, Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { site } from "@/data/site";
import HeroSchematic from "@/components/HeroSchematic";
import Reveal from "@/components/Reveal";

export default function Hero() {
  return (
    <section id="top" className="relative z-10 pt-24 md:pt-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 sm:px-8 md:pb-24 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div>
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.25em] text-accent uppercase">
              SHT 00 · Yanish Rai — Bengaluru, IN
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 font-heading text-4xl leading-tight font-bold text-ink sm:text-5xl md:text-[3.4rem]">
              I build systems where{" "}
              <span className="text-accent">trust</span>,{" "}
              <span className="text-teal-data">data</span>, and product
              engineering meet.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {site.subheadline}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2 bg-accent px-5 py-2.5 font-mono text-sm font-medium text-bp-900 transition-colors hover:bg-accent/85"
              >
                View Projects <ArrowDown size={15} aria-hidden="true" />
              </a>
              <a
                href={site.resumePath}
                download
                className="inline-flex items-center gap-2 border border-line/40 px-5 py-2.5 font-mono text-sm text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <Download size={15} aria-hidden="true" /> Download Resume
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <ul className="mt-6 flex flex-wrap items-center gap-5 font-mono text-[13px]">
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-ink-muted transition-colors hover:text-accent"
                >
                  <GithubIcon size={15} /> GitHub
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-ink-muted transition-colors hover:text-accent"
                >
                  <LinkedinIcon size={15} /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-1.5 text-ink-muted transition-colors hover:text-accent"
                >
                  <Mail size={15} aria-hidden="true" /> Email
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="relative">
          <div className="corner-ticks border border-line/15 bg-bp-900/50 p-3 sm:p-5">
            <HeroSchematic />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
