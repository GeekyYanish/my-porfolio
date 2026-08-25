"use client";

import { useEffect, useState } from "react";
import { Zap, ZapOff } from "lucide-react";
import { setMotionOff, useMotionDisabled } from "@/components/motion";

/**
 * A manual escape hatch from the page's motion, for people who want it still
 * but haven't set an OS-level preference — it also restores the native
 * cursor, since the custom one is gated on the same flag.
 *
 * Hidden when the OS already asks for reduced motion: in that case there is
 * nothing left to turn off, and offering to "enable" it would override an
 * explicit system preference.
 */
export default function MotionToggle() {
  const [off, setOff] = useState(false);
  const [systemReduced, setSystemReduced] = useState(false);
  const disabled = useMotionDisabled();

  useEffect(() => {
    setSystemReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("ns-motion");
    } catch {
      /* storage blocked — default to motion on */
    }
    if (stored === "off") {
      setMotionOff(true);
      setOff(true);
    }
  }, []);

  if (systemReduced) return null;

  const toggle = () => {
    const next = !off;
    setOff(next);
    setMotionOff(next);
  };

  const Icon = disabled ? ZapOff : Zap;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={off}
      className="inline-flex min-h-11 items-center gap-2 border border-ink/15 px-4 py-2 font-mono text-micro tracking-[0.16em] text-ink-faint uppercase transition-colors hover:border-ink/35 hover:text-ink-muted"
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      Motion: {off ? "Off" : "On"}
    </button>
  );
}
