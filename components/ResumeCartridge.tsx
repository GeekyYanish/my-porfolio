import { Download } from "lucide-react";
import { site } from "@/data/site";

/**
 * The résumé download, styled as a web-fluid cartridge: a ridged canister
 * with a pressure gauge and a red band. Still a plain download anchor
 * underneath — the whole thing is one hit target with a real label.
 */
export default function ResumeCartridge({
  className = "",
}: {
  className?: string;
}) {
  return (
    <a
      href={site.resumePath}
      download
      className={`group relative flex items-stretch overflow-hidden border-2 border-ink/20 bg-night-900 transition-colors hover:border-web-500 ${className}`}
    >
      {/* ridged cap */}
      <span
        aria-hidden="true"
        className="flex w-9 shrink-0 flex-col justify-center gap-1 border-r-2 border-ink/20 bg-night-800 px-2 transition-colors group-hover:border-web-500/60"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="h-px w-full bg-ink/25" />
        ))}
      </span>

      {/* body */}
      <span className="relative flex flex-1 items-center gap-3 px-4 py-3.5">
        <span
          aria-hidden="true"
          className="halftone-red absolute inset-0 opacity-40"
        />
        <span className="relative flex flex-col">
          <span className="font-mono text-[0.6rem] tracking-[0.22em] text-web-400 uppercase">
            Web-Fluid Cartridge
          </span>
          <span className="font-heading text-lg tracking-wide text-ink uppercase">
            Download Résumé
          </span>
          <span className="font-mono text-[0.6rem] tracking-[0.14em] text-ink-faint uppercase">
            PDF · Pressure 100%
          </span>
        </span>

        <Download
          className="relative ml-auto h-5 w-5 shrink-0 text-ink-muted transition-transform duration-300 group-hover:translate-y-0.5 group-hover:text-web-400"
          aria-hidden="true"
        />
      </span>

      {/* charge gauge */}
      <span
        aria-hidden="true"
        className="w-2 shrink-0 bg-linear-to-t from-web-600 via-web-500 to-sense-400"
      />
    </a>
  );
}
