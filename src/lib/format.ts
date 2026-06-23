/** Formatting helpers + booking economics. */

export const ADMISSION = 14;
export const BOOKING_FEE = 2.5;
export const MAX_SEATS = 8;

export function formatRuntime(min: number): string {
  if (!min || min <= 0) return "—";
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}H ${String(m).padStart(2, "0")}M`;
}

export function formatPrice(n: number): string {
  return `$${n.toFixed(2)}`;
}

/** "blade-runner" → "BLADE RUNNER" used as a typographic poster id stamp. */
export function shortCode(id: string, len = 6): string {
  return id.replace(/[^a-z0-9]/gi, "").slice(0, len).toUpperCase().padEnd(len, "0");
}
