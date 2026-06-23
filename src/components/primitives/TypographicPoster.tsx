import type { Film } from "@/lib/types";
import { hashString } from "@/lib/seeded";

/**
 * A poster built entirely from type and rules — a 1970s programme card. Three
 * deterministic colourways keep a grid feeling varied without leaving the
 * palette. This is the demo's default treatment (no remote image required) and
 * the graceful fallback whenever a real poster fails to load.
 */

const VARIANTS = [
  { bg: "bg-paper-2", text: "text-ink", accent: "text-burgundy", rule: "border-ink/30" },
  { bg: "bg-burgundy", text: "text-paper", accent: "text-paper", rule: "border-paper/35" },
  { bg: "bg-ink", text: "text-paper", accent: "text-burgundy", rule: "border-paper/25" },
];

export function TypographicPoster({
  film,
  index = 0,
  className = "",
}: {
  film: Film;
  index?: number;
  className?: string;
}) {
  const v = VARIANTS[hashString(film.id) % VARIANTS.length];
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`relative flex aspect-[2/3] flex-col justify-between overflow-hidden border ${v.rule} ${v.bg} ${v.text} p-[6%] ${className}`}
    >
      <div className="halftone pointer-events-none absolute inset-0 opacity-[0.13]" />
      <div className="film-grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" />

      <div className="relative flex items-start justify-between">
        <span className="meta uppercase tracking-[0.28em]">Reel Programme</span>
        <span className="font-mono text-xs">N°{num}</span>
      </div>

      <div className="relative">
        <span className={`font-display text-[1.5em] leading-none ${v.accent}`}>✷</span>
        <h3 className="mt-3 break-words font-display text-[clamp(1.6rem,2.4vw+1rem,3rem)] font-semibold leading-[0.88] tracking-tight">
          {film.title}
        </h3>
      </div>

      <div className="relative">
        <div className={`mb-3 border-t ${v.rule}`} />
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-mono text-[0.62rem] uppercase tracking-[0.18em] opacity-80">
              {film.director ?? "Anon."}
            </p>
            <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] opacity-80">
              {film.genres[0] ?? "Feature"}
            </p>
          </div>
          <span className={`font-display text-[clamp(1.75rem,2vw+1rem,2.75rem)] leading-none ${v.accent}`}>
            {film.year}
          </span>
        </div>
      </div>
    </div>
  );
}
