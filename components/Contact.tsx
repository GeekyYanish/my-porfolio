import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { site } from "@/data/site";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";

/**
 * Contact rendered as a schematic terminal panel.
 */
export default function Contact() {
  const rows = [
    {
      key: "EMAIL",
      label: site.email,
      href: `mailto:${site.email}`,
      icon: Mail,
    },
    {
      key: "GITHUB",
      label: `github.com/${site.githubHandle}`,
      href: site.github,
      icon: GithubIcon,
    },
    {
      key: "LINKEDIN",
      label: `linkedin.com/in/${site.linkedinHandle}`,
      href: site.linkedin,
      icon: LinkedinIcon,
    },
  ];

  return (
    <Section
      id="contact"
      sheet="SHT 09"
      label="Signal Terminal"
      title="Contact"
      intro={site.contactCta}
    >
      <Reveal>
        <div className="max-w-2xl border border-line/25 bg-bp-950">
          {/* terminal header bar */}
          <div className="flex items-center justify-between border-b border-line/20 px-4 py-2.5">
            <p className="font-mono text-[12px] text-ink-muted">
              yanish@bengaluru:~$ contact --open
            </p>
            <span
              aria-hidden="true"
              className="flex gap-1.5"
            >
              <span className="h-2 w-2 border border-line/40" />
              <span className="h-2 w-2 border border-line/40" />
              <span className="h-2 w-2 border border-accent/60 bg-accent/30" />
            </span>
          </div>

          <ul className="divide-y divide-line/10 font-mono text-sm">
            {rows.map((row) => (
              <li key={row.key}>
                <a
                  href={row.href}
                  target={row.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={
                    row.href.startsWith("mailto")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="group flex items-center gap-4 px-4 py-4 transition-colors hover:bg-bp-900"
                >
                  <row.icon
                    size={16}
                    aria-hidden="true"
                    className="shrink-0 text-accent"
                  />
                  <span className="w-20 shrink-0 text-[11px] tracking-[0.2em] text-ink-faint">
                    {row.key}
                  </span>
                  <span className="truncate text-ink-muted transition-colors group-hover:text-accent">
                    {row.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="ml-auto text-accent opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="border-t border-line/20 px-4 py-3">
            <p className="font-mono text-[11px] leading-relaxed text-teal-data">
              STATUS: OPEN — internships · entry-level roles · technical
              consulting · product engineering collaborations
              <span className="animate-pulse text-accent motion-reduce:animate-none">
                {" "}
                ▍
              </span>
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
