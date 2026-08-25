import { Boxes, Database, ShieldCheck } from "lucide-react";
import Container from "@/components/Container";
import ProfileCrest from "@/components/ProfileCrest";
import ResumeCartridge from "@/components/ResumeCartridge";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import SoundEffect from "@/components/SoundEffect";
import { identityModules, originBeats, site } from "@/data/site";

const MODULE_STYLE = {
  trust: {
    Icon: ShieldCheck,
    text: "text-web-400",
    border: "border-web-500/45",
    dot: "bg-web-500",
  },
  data: {
    Icon: Database,
    text: "text-sense-400",
    border: "border-sense-500/45",
    dot: "bg-sense-500",
  },
  systems: {
    Icon: Boxes,
    text: "text-gold",
    border: "border-gold/45",
    dot: "bg-gold",
  },
} as const;

/* Panels tilt in alternating directions so the strip reads as a comic page
   rather than a row of cards. */
const TILT = ["-rotate-[1.4deg]", "rotate-[0.9deg]", "-rotate-[0.7deg]"];

export default function About() {
  return (
    <section id="about" className="defer-paint relative py-24 sm:py-32">
      <Container>
        <SectionHeader
          issue="01"
          label="Origin Story"
          title="How it started"
          intro={site.supportLine}
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* crest + résumé */}
          <div className="lg:col-span-4">
            <Reveal variant="left">
              <div className="relative mx-auto max-w-[300px] lg:mx-0">
                <ProfileCrest className="w-full" />
                <SoundEffect
                  className="absolute -top-2 -right-2"
                  rotate={12}
                  delay={0.5}
                >
                  THWIP!
                </SoundEffect>
              </div>
            </Reveal>

            <Reveal variant="left" delay={0.12}>
              <ResumeCartridge className="mt-8 w-full" />
            </Reveal>

            <Reveal variant="left" delay={0.18}>
              <dl className="mt-8 space-y-3 font-mono text-xs">
                <div className="flex justify-between gap-4 border-b border-ink/10 pb-2">
                  <dt className="text-ink-faint uppercase">Base</dt>
                  <dd className="text-right text-ink-muted">{site.location}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-ink/10 pb-2">
                  <dt className="text-ink-faint uppercase">Status</dt>
                  <dd className="text-right text-sense-400">
                    Open to opportunities
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* speech bubble + origin panels */}
          <div className="lg:col-span-8">
            <Reveal variant="right">
              <div className="paper-panel relative px-6 py-6 sm:px-8 sm:py-7">
                <span
                  aria-hidden="true"
                  className="halftone absolute inset-0 opacity-30"
                  style={{ "--dot": "var(--color-ink-black)" } as React.CSSProperties}
                />
                <p className="relative text-base leading-relaxed font-medium sm:text-lg">
                  {site.about}
                </p>
                {/* speech-bubble tail */}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-[18px] left-12 h-0 w-0 border-t-[18px] border-r-[20px] border-l-0 border-t-ink-black border-r-transparent"
                />
              </div>
            </Reveal>

            <ol className="mt-10 grid gap-5 sm:grid-cols-3">
              {originBeats.map((beat, i) => (
                <Reveal
                  as="li"
                  key={beat.panel}
                  variant="snap"
                  delay={i * 0.1}
                  className={`comic-panel relative overflow-hidden px-5 py-6 ${TILT[i]} transition-transform duration-300 hover:rotate-0`}
                >
                  {/* halftone sits behind the copy rather than under it —
                      at full strength the dots eat the small caption type */}
                  <span
                    aria-hidden="true"
                    className="halftone absolute inset-0 opacity-25"
                    style={{ "--dot-size": "8px" } as React.CSSProperties}
                  />
                  <span className="relative font-display text-3xl leading-none text-web-400/75">
                    {beat.panel}
                  </span>
                  <p className="relative mt-3 font-mono text-xs leading-relaxed tracking-wide text-sense-400 uppercase">
                    {beat.caption}
                  </p>
                  <p className="relative mt-2.5 text-sm leading-relaxed text-ink-muted">
                    {beat.line}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>

        {/* Trust / Data / Systems */}
        <div className="mt-20 sm:mt-24">
          <Reveal>
            <h3 className="font-heading text-2xl leading-[0.95] text-ink sm:text-3xl">
              Three things run through all of it
            </h3>
          </Reveal>

          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {identityModules.map((m, i) => {
              const s = MODULE_STYLE[m.key];
              return (
                <Reveal
                  as="li"
                  key={m.key}
                  delay={i * 0.1}
                  className={`comic-panel relative flex flex-col border-l-4 p-6 ${s.border}`}
                >
                  <s.Icon
                    className={`h-7 w-7 ${s.text}`}
                    aria-hidden="true"
                    strokeWidth={1.6}
                  />
                  <h4
                    className={`mt-4 font-heading text-2xl tracking-wide ${s.text}`}
                  >
                    {m.title}
                  </h4>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                    {m.thesis}
                  </p>

                  <ul className="mt-5 space-y-2.5 border-t border-ink/10 pt-4">
                    {m.examples.map((ex) => (
                      <li key={ex.label} className="flex gap-2.5 text-xs">
                        <span
                          aria-hidden="true"
                          className={`mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 ${s.dot}`}
                        />
                        <span className="text-ink-muted">
                          {ex.label}
                          <span className="mt-0.5 block font-mono text-micro tracking-[0.12em] text-ink-faint uppercase">
                            {ex.source}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
