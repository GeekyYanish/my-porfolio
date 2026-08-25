import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { site } from "@/data/site";

const CHANNELS = [
  {
    Icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    external: false,
  },
  {
    Icon: GithubIcon,
    label: "GitHub",
    value: `github.com/${site.githubHandle}`,
    href: site.github,
    external: true,
  },
  {
    Icon: LinkedinIcon,
    label: "LinkedIn",
    value: `linkedin.com/in/${site.linkedinHandle}`,
    href: site.linkedin,
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="defer-paint relative py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="halftone-red pointer-events-none absolute inset-0 opacity-[0.5]"
      />

      <Container className="relative">
        <SectionHeader
          issue="05"
          label="Team-Up"
          title="Let’s team up."
          intro={site.contactCta}
        />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-12">
          <Reveal variant="left">
            <div className="comic-panel p-6 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>

          <div className="space-y-5">
            <Reveal variant="right">
              <ul className="comic-panel divide-y divide-ink/10">
                {CHANNELS.map(({ Icon, label, value, href, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer noopener" : undefined}
                      className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-ink/5"
                    >
                      <Icon className="h-5 w-5 shrink-0 text-ink-faint transition-colors group-hover:text-sense-400" />
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-micro tracking-[0.2em] text-ink-faint uppercase">
                          {label}
                        </span>
                        <span className="block truncate text-sm text-ink-muted transition-colors group-hover:text-ink">
                          {value}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-ink-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                      {external && (
                        <span className="sr-only">(opens in a new tab)</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal variant="right" delay={0.1}>
              <div className="comic-panel p-5">
                <p className="flex items-center gap-2 font-mono text-micro tracking-[0.2em] text-ink-faint uppercase">
                  <MapPin className="h-3.5 w-3.5 text-web-400" aria-hidden="true" />
                  Based in
                </p>
                <p className="mt-1.5 text-sm text-ink-muted">{site.location}</p>

                <p className="mt-5 font-mono text-micro tracking-[0.2em] text-ink-faint uppercase">
                  Currently targeting
                </p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {site.targetRoles.map((role) => (
                    <li
                      key={role}
                      className="border border-ink/15 px-2 py-0.5 font-mono text-micro text-ink-muted"
                    >
                      {role}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 flex items-center gap-2 border-t border-ink/10 pt-4 font-mono text-xs text-sense-400">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full bg-sense-400"
                  />
                  Open to opportunities
                  <span aria-hidden="true" className="caret">
                    _
                  </span>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
