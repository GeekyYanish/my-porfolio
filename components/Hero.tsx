import { ArrowDown, Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { site } from "@/data/site";
import HeroSchematic from "@/components/HeroSchematic";
import HeroHeadline from "@/components/HeroHeadline";
import Reveal from "@/components/Reveal";

export default function Hero() {
  return (
    <section id="top" className="relative z-10 pt-24 md:pt-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 sm:px-8 md:pb-24 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div>
          <Reveal>
            <p className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.25em] text-accent uppercase">
              <span
                aria-hidden="true"
                className="hero-leader inline-block h-px w-8 bg-accent/60"
              />
              SHT 00 · Yanish Rai — Bengaluru, IN
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <HeroHeadline />
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
                className="group inline-flex items-center gap-2 bg-accent px-5 py-2.5 font-mono text-sm font-medium text-bp-900 transition-colors hover:bg-accent/85"
              >
                View Projects{" "}
                <ArrowDown
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-y-0.5 motion-reduce:transition-none"
                />
              </a>
              <a
                href={site.resumePath}
                download
                className="group relative inline-flex items-center gap-2 border border-line/40 px-5 py-2.5 font-mono text-sm text-ink transition-colors hover:border-accent hover:text-accent"
              >
                {/* blueprint corner ticks that complete on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-px -left-px h-2 w-2 border-t border-l border-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100 motion-reduce:transition-none"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-px -bottom-px h-2 w-2 border-r border-b border-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100 motion-reduce:transition-none"
                />
                <Download
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                />{" "}
                Download Resume
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
                  className="inline-flex items-center gap-1.5 text-ink-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  <GithubIcon size={15} /> GitHub
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-ink-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  <LinkedinIcon size={15} /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-1.5 text-ink-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
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
