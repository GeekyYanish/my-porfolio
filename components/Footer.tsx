import { site } from "@/data/site";

/**
 * Footer styled as an engineering drawing title block.
 */
export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line/20 bg-bp-900">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <div className="grid grid-cols-2 gap-px border border-line/20 bg-line/20 font-mono text-[11px] sm:grid-cols-4">
          {[
            { k: "DRAWN BY", v: "Yanish Rai" },
            { k: "LOCATION", v: "Bengaluru, IN" },
            { k: "SHEET", v: "01 OF 01 · REV A" },
            { k: "STATUS", v: "Open to opportunities" },
          ].map((cell) => (
            <div key={cell.k} className="bg-bp-900 px-4 py-3">
              <p className="text-[10px] tracking-[0.2em] text-ink-faint">
                {cell.k}
              </p>
              <p className="mt-1 text-ink-muted">{cell.v}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center font-mono text-[11px] text-ink-faint">
          © {new Date().getFullYear()} {site.name} · Built with Next.js,
          TypeScript & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
