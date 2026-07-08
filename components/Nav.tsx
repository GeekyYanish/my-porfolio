"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";

const links = [
  { href: "#identity", label: "Identity", index: "01" },
  { href: "#metrics", label: "Metrics", index: "02" },
  { href: "#experience", label: "Experience", index: "03" },
  { href: "#work", label: "Case Studies", index: "04" },
  { href: "#skills", label: "Skills", index: "05" },
  { href: "#github", label: "GitHub", index: "06" },
  { href: "#contact", label: "Contact", index: "07" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/15 bg-bp-900/90 backdrop-blur-[2px]">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8"
      >
        <a
          href="#top"
          className="flex items-center gap-3 font-mono text-sm text-ink"
        >
          {/* drawing-stamp style monogram */}
          <span className="inline-flex h-8 w-8 items-center justify-center border border-accent/60 text-xs font-semibold text-accent">
            {site.shortName}
          </span>
          <span className="hidden font-medium tracking-wide sm:inline">
            YANISH RAI
          </span>
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group font-mono text-[12px] tracking-wide text-ink-muted transition-colors hover:text-accent"
              >
                <span className="text-accent/60">{link.index}</span>{" "}
                <span className="group-hover:underline group-hover:underline-offset-4">
                  {link.label}
                </span>
              </a>
            </li>
          ))}
          <li>
            <a
              href={site.resumePath}
              download
              className="border border-accent/60 px-3 py-1.5 font-mono text-[12px] text-accent transition-colors hover:bg-accent hover:text-bp-900"
            >
              Resume
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center border border-line/25 text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open ? (
        <ul
          id="mobile-nav"
          className="border-t border-line/15 bg-bp-900 px-5 py-4 lg:hidden"
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 font-mono text-sm text-ink-muted hover:text-accent"
              >
                <span className="text-accent/60">{link.index}</span>{" "}
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-3">
            <a
              href={site.resumePath}
              download
              className="inline-block border border-accent/60 px-4 py-2 font-mono text-sm text-accent"
            >
              Download Resume
            </a>
          </li>
        </ul>
      ) : null}
    </header>
  );
}
