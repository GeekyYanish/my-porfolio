/**
 * Deterministic PRNG (mulberry32).
 *
 * The city skyline and the ambient motes are generated rather than authored,
 * but they must produce byte-identical markup on the server and the client —
 * `Math.random()` here would guarantee a hydration mismatch. Seeded, the
 * geometry is stable across renders and across machines.
 *
 * Lives outside `motion.ts` deliberately: that module is `"use client"`, and
 * server components (CitySkyline) need this too.
 */
export function seededRandom(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
