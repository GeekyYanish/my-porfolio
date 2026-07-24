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
      {/* slow-drifting scanline — a faint plotter pass over the sheet */}
      <div
        className="bp-scanline absolute inset-x-0 top-0 h-24"
        style={{
          background:
            "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--color-accent) 4%, transparent) 45%, color-mix(in srgb, var(--color-accent) 6%, transparent) 50%, transparent)",
        }}
      />
      {/* survey point: a slowly breathing crosshair on a major grid node */}
      <div className="bp-survey absolute top-[18%] left-[76%] h-4 w-4">
        <span
          className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 55%, transparent)" }}
        />
        <span
          className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 55%, transparent)" }}
        />
      </div>
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
