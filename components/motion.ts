"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/* `useLayoutEffect` warns when it runs during SSR; on the server there is no
   layout to read, so fall back to `useEffect` there. */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Shared motion primitives for the whole site.
 *
 * Every hook here follows the same contract: it returns a `(delay) => props`
 * factory (or a set of handlers), and it collapses to a no-op under
 * `prefers-reduced-motion` — the reduced-motion path renders the *finished*
 * state, never nothing. Keeping them in one file is what makes the page read
 * as a single piece of choreography rather than a pile of effects.
 */

export const EASE_SNAP = [0.16, 1.36, 0.3, 1] as const;
export const EASE_SWING = [0.37, 0, 0.28, 1] as const;
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------- manual motion opt-out */

/*
  The footer carries a "stop motion" toggle for people who want the page
  still but haven't set an OS-level preference. A tiny external store lets
  every hook below react to it without threading a context through the tree
  — CSS keyframes are handled separately by `[data-motion="off"]`.
*/
let motionOff = false;
const motionListeners = new Set<() => void>();

function subscribeMotion(listener: () => void) {
  motionListeners.add(listener);
  return () => {
    motionListeners.delete(listener);
  };
}

export function setMotionOff(next: boolean) {
  motionOff = next;
  document.documentElement.dataset.motion = next ? "off" : "on";
  try {
    localStorage.setItem("ns-motion", next ? "off" : "on");
  } catch {
    /* private mode — the toggle still works for this session */
  }
  motionListeners.forEach((l) => l());
}

/**
 * True when animation should be suppressed: either the OS asks for reduced
 * motion, or the visitor flipped the footer toggle. Every hook in this file
 * gates on this rather than on `useReducedMotion()` directly.
 *
 * Reports `false` until mounted, on purpose. The server can't know either
 * preference, so components that swap whole subtrees on this value — the
 * swing intro, the cursor, every `Reveal` — would otherwise render one tree
 * on the server and a different one on the first client render, and React
 * throws away the markup and warns. The flip runs in a layout effect, before
 * paint, so nothing animated is ever shown to someone who asked for stillness.
 */
export function useMotionDisabled() {
  const prefersReduced = useReducedMotion();
  const manual = useSyncExternalStore(
    subscribeMotion,
    () => motionOff,
    () => false,
  );
  const [hydrated, setHydrated] = useState(false);
  useIsomorphicLayoutEffect(() => {
    /*
      Restore a saved manual preference before normal effects run. This keeps
      full-screen entrance effects from starting for someone who already chose
      "Motion: Off" on an earlier visit.
    */
    try {
      if (localStorage.getItem("ns-motion") === "off") setMotionOff(true);
    } catch {
      /* private mode — default to the system preference */
    }
    setHydrated(true);
  }, []);

  return hydrated && (Boolean(prefersReduced) || manual);
}

/** Line-draw: a stroke plots itself, like a web strand being shot out. */
export function useDraw() {
  const reduceMotion = useMotionDisabled();
  return (delay = 0, duration = 0.9) =>
    reduceMotion
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, margin: "-40px" },
          transition: { duration, delay, ease: EASE_OUT_EXPO },
        };
}

/** Fade-in for nodes and labels that shouldn't draw. */
export function useAppear() {
  const reduceMotion = useMotionDisabled();
  return (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true, margin: "-40px" },
          transition: { duration: 0.45, delay },
        };
}

/** Web-snap: a stiff spring that overshoots then locks into place. */
export function useSnap() {
  const reduceMotion = useMotionDisabled();
  return (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, scale: 0.86 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true, margin: "-60px" },
          transition: {
            type: "spring" as const,
            stiffness: 520,
            damping: 26,
            delay,
          },
        };
}

/**
 * True on devices with a precise pointer. The single gate for the custom
 * cursor, card tilt, magnetic buttons, and background motes — touch devices
 * therefore get the simplified experience automatically.
 *
 * Starts `false` so the server and first client render agree; the real value
 * lands in an effect.
 */
export function usePointerFine() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return fine;
}

/** True once mounted on the client. Used to keep effect-only UI out of SSR. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useIsomorphicLayoutEffect(() => setMounted(true), []);
  return mounted;
}

/**
 * Damped-sine pendulum keyframes.
 *
 * A real swing decays; a plain sine loop reads as a metronome. Sampling
 * `θ₀·e^(-ζt)·cos(2πt·cycles)` gives rotation keyframes that lose amplitude
 * the way a body on a strand actually does.
 */
export function swingKeyframes(
  amplitude = 26,
  cycles = 2,
  samples = 24,
  damping = 0.55,
) {
  return Array.from({ length: samples + 1 }, (_, i) => {
    const t = i / samples;
    return (
      amplitude * Math.exp(-damping * t * cycles) * Math.cos(2 * Math.PI * cycles * t)
    );
  });
}

/**
 * Magnetic pull toward the pointer. Returns a ref to attach to the element
 * and springy x/y motion values to drive it.
 */
export function useMagnetic(strength = 0.32, radius = 90) {
  const reduceMotion = useMotionDisabled();
  const fine = usePointerFine();
  const ref = useRef<HTMLElement | null>(null);

  const x = useSpring(useMotionValue(0), { stiffness: 320, damping: 22 });
  const y = useSpring(useMotionValue(0), { stiffness: 320, damping: 22 });

  const active = fine && !reduceMotion;

  useEffect(() => {
    if (!active) {
      x.set(0);
      y.set(0);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const reach = Math.max(r.width, r.height) / 2 + radius;

      if (dist < reach) {
        x.set(dx * strength);
        y.set(dy * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const onLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [active, radius, strength, x, y]);

  return { ref, x, y, active };
}

/**
 * Pointer-driven card tilt. Returns springy rotateX/rotateY values plus the
 * pointer position in element-local percentages, so a card can also move a
 * glare or web overlay to follow the cursor.
 */
export function useTilt(max = 7) {
  const reduceMotion = useMotionDisabled();
  const fine = usePointerFine();
  const active = fine && !reduceMotion;

  const rotateX = useSpring(useMotionValue(0), { stiffness: 260, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 260, damping: 20 });
  const px = useMotionValue(50);
  const py = useMotionValue(50);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!active) return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    px.set(nx * 100);
    py.set(ny * 100);
    rotateY.set((nx - 0.5) * max * 2);
    rotateX.set((0.5 - ny) * max * 2);
  };

  const onPointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    px.set(50);
    py.set(50);
  };

  return { rotateX, rotateY, px, py, active, onPointerMove, onPointerLeave };
}
