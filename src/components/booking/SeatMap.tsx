"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import type { SeatRow } from "@/lib/types";

/**
 * Print-blueprint auditorium. Hairline seats, a curved screen, sepia hatch for
 * taken seats, burgundy spring-fill for selected. Fully keyboard navigable:
 * Tab between seats, arrow keys to roam the grid, Enter/Space to claim.
 */
export function SeatMap({
  rows,
  selected,
  onToggle,
}: {
  rows: SeatRow[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  const refs = useRef<(HTMLButtonElement | null)[][]>([]);

  const focusCell = (ri: number, ci: number): boolean => {
    const el = refs.current[ri]?.[ci];
    if (el && !el.disabled) {
      el.focus();
      return true;
    }
    return false;
  };

  const move = (ri: number, ci: number, dr: number, dc: number) => {
    let r = ri;
    let c = ci;
    for (let step = 0; step < 24; step++) {
      r += dr;
      c += dc;
      if (r < 0 || r >= rows.length) return;
      if (c < 0 || c >= rows[r].seats.length) {
        if (dc !== 0) return;
        continue;
      }
      if (focusCell(r, c)) return;
    }
  };

  const onKeyDown = (e: React.KeyboardEvent, ri: number, ci: number) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        move(ri, ci, 0, -1);
        break;
      case "ArrowRight":
        e.preventDefault();
        move(ri, ci, 0, 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        move(ri, ci, -1, 0);
        break;
      case "ArrowDown":
        e.preventDefault();
        move(ri, ci, 1, 0);
        break;
    }
  };

  return (
    <div className="w-full">
      {/* Screen */}
      <div className="mx-auto mb-10 max-w-2xl">
        <svg viewBox="0 0 400 34" className="w-full" aria-hidden>
          <path
            d="M6 30 Q200 -2 394 30"
            fill="none"
            stroke="var(--burgundy)"
            strokeWidth="1.5"
          />
        </svg>
        <p className="meta text-center uppercase tracking-[0.6em] text-ink-soft">Screen</p>
      </div>

      <div
        role="group"
        aria-label="Seat map. Use arrow keys to move between seats and Enter to select."
        className="mx-auto flex max-w-2xl flex-col items-center gap-2.5"
      >
        {rows.map((row, ri) => (
          <div key={row.row} className="flex w-full items-center justify-center gap-2.5">
            <span className="w-4 shrink-0 text-right font-mono text-[0.65rem] text-ink-soft">
              {row.row}
            </span>
            <div className="flex items-center gap-1.5">
              {row.seats.map((seat, ci) => {
                const isSelected = selected.includes(seat.id);
                const isTaken = seat.status === "taken";
                return (
                  <span
                    key={seat.id}
                    className="flex items-center"
                    style={{ marginRight: seat.aisleAfter ? "0.9rem" : undefined }}
                  >
                    <motion.button
                      ref={(el) => {
                        refs.current[ri] ??= [];
                        refs.current[ri][ci] = el;
                      }}
                      type="button"
                      disabled={isTaken}
                      aria-pressed={isSelected}
                      aria-label={`Seat ${seat.id}, ${
                        isTaken ? "taken" : isSelected ? "selected" : "available"
                      }`}
                      onClick={() => !isTaken && onToggle(seat.id)}
                      onKeyDown={(e) => onKeyDown(e, ri, ci)}
                      whileTap={isTaken ? undefined : { scale: 0.84 }}
                      className={`relative h-6 w-6 border transition-colors sm:h-7 sm:w-7 ${
                        isTaken
                          ? "cursor-not-allowed border-transparent"
                          : isSelected
                            ? "border-burgundy"
                            : "border-ink/35 hover:border-burgundy hover:bg-burgundy/10"
                      }`}
                    >
                      {isTaken && (
                        <span
                          className="absolute inset-0"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(45deg, var(--sepia) 0, var(--sepia) 1.5px, transparent 1.5px, transparent 5px)",
                            opacity: 0.6,
                          }}
                        />
                      )}
                      {isSelected && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 600, damping: 22 }}
                          className="absolute inset-[2px] bg-burgundy"
                        />
                      )}
                    </motion.button>
                  </span>
                );
              })}
            </div>
            <span className="w-4 shrink-0 font-mono text-[0.65rem] text-ink-soft">
              {row.row}
            </span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
        <Legend className="border border-ink/35" label="Available" />
        <Legend className="border border-burgundy bg-burgundy" label="Selected" />
        <Legend
          className="border border-transparent"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, var(--sepia) 0, var(--sepia) 1.5px, transparent 1.5px, transparent 5px)",
          }}
          label="Taken"
        />
      </div>
    </div>
  );
}

function Legend({
  className,
  style,
  label,
}: {
  className: string;
  style?: React.CSSProperties;
  label: string;
}) {
  return (
    <span className="flex items-center gap-2.5">
      <span className={`h-4 w-4 ${className}`} style={style} />
      <span className="meta uppercase tracking-[0.18em] text-ink-soft">{label}</span>
    </span>
  );
}
