/**
 * Full-screen film-grain veil. Pure CSS texture; the subtle flicker animation
 * is automatically disabled under `prefers-reduced-motion` (see globals.css).
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="no-print film-grain grain-overlay grain-flicker pointer-events-none fixed inset-[-50%] z-[60]"
      style={{ mixBlendMode: "overlay" }}
    />
  );
}
