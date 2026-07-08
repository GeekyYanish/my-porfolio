/**
 * Fixed blueprint drawing surface: fine grid, major grid, and
 * ruler tick marks along the top edge. Pure CSS — zero JS cost.
 */
export default function SchematicBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      {/* fine grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--color-line) 4%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-line) 4%, transparent) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* major grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--color-line) 7%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-line) 7%, transparent) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />
      {/* ruler ticks along top edge */}
      <div
        className="absolute inset-x-0 top-0 h-2"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--color-line) 25%, transparent) 1px, transparent 1px)",
          backgroundSize: "120px 100%",
        }}
      />
      {/* subtle vignette to keep edges calm */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 0%, transparent 55%, rgba(16, 27, 49, 0.55) 100%)",
        }}
      />
    </div>
  );
}
