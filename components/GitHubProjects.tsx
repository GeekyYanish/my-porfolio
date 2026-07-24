import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { repos } from "@/data/projects";
import { site } from "@/data/site";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";

/**
 * Curated GitHub register rendered as a light "printed sheet" —
 * the drawing index of an engineering set. Table on desktop,
 * stacked cards on mobile. Repos are framed honestly (coursework,
 * experiments, hackathon builds) rather than overclaimed.
 */
export default function GitHubProjects() {
  return (
    <Section
      id="github"
      sheet="SHT 05"
      label="Drawing Register"
      title="GitHub index"
      intro="A curated register of public repositories — flagship builds first, coursework and experiments labeled as exactly that."
      variant="paper"
    >
      {/* desktop: register table */}
      <Reveal>
        <div className="hidden overflow-hidden border border-paper-line/25 md:block">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">
              Curated list of GitHub repositories by Yanish Rai
            </caption>
            <thead>
              <tr className="border-b border-paper-line/25 bg-paper-line/5 font-mono text-[11px] tracking-[0.15em] text-paper-ink/60 uppercase">
                <th scope="col" className="px-4 py-3 font-medium">
                  No.
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Repository
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Description
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Stack
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Link
                </th>
              </tr>
            </thead>
            <tbody>
              {repos.map((repo) => (
                <tr
                  key={repo.name}
                  className="border-b border-paper-line/15 last:border-b-0 hover:bg-paper-accent/5"
                >
                  <td className="px-4 py-3.5 font-mono text-[12px] text-paper-accent">
                    {repo.index}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-mono text-[13px] font-semibold text-paper-ink">
                      {repo.name}
                    </span>
                    {repo.note ? (
                      <span className="mt-0.5 block font-mono text-[10px] tracking-wide text-paper-ink/50 uppercase">
                        {repo.note}
                      </span>
                    ) : null}
                  </td>
                  <td className="max-w-sm px-4 py-3.5 leading-snug text-paper-ink/75">
                    {repo.description}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[11px] text-paper-ink/60">
                    {repo.stack.join(" · ")}
                  </td>
                  <td className="px-4 py-3.5">
                    <a
                      href={repo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[12px] text-paper-accent underline-offset-4 hover:underline"
                      aria-label={`Open ${repo.name} on GitHub`}
                    >
                      <ExternalLink size={12} aria-hidden="true" /> View
                    </a>
                    {repo.demo ? (
                      <a
                        href={repo.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-3 inline-flex items-center gap-1 font-mono text-[12px] text-paper-accent underline-offset-4 hover:underline"
                      >
                        Demo
                      </a>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      {/* mobile: stacked cards */}
      <div className="space-y-4 md:hidden">
        {repos.map((repo, i) => (
          <Reveal key={repo.name} delay={(i % 2) * 0.06}>
            <article className="border border-paper-line/25 p-4">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-mono text-sm font-semibold text-paper-ink">
                  {repo.name}
                </h3>
                <span className="font-mono text-[11px] text-paper-accent">
                  {repo.index}
                </span>
              </div>
              {repo.note ? (
                <p className="mt-0.5 font-mono text-[10px] tracking-wide text-paper-ink/50 uppercase">
                  {repo.note}
                </p>
              ) : null}
              <p className="mt-2 text-sm leading-snug text-paper-ink/75">
                {repo.description}
              </p>
              <p className="mt-2 font-mono text-[11px] text-paper-ink/60">
                {repo.stack.join(" · ")}
              </p>
              <a
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 font-mono text-[12px] text-paper-accent underline-offset-4 hover:underline"
              >
                <ExternalLink size={12} aria-hidden="true" /> View on GitHub
              </a>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 border border-paper-line/40 px-5 py-2.5 font-mono text-sm text-paper-ink transition-colors hover:border-paper-accent hover:text-paper-accent"
        >
          <GithubIcon size={15} /> All repositories →
          github.com/{site.githubHandle}
        </a>
      </Reveal>
    </Section>
  );
}
