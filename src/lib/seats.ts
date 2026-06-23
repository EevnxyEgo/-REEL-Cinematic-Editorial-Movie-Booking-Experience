import type { SeatRow, Seat } from "./types";
import { seededRng } from "./seeded";

// Row "I" is skipped by cinema convention (reads as "1").
const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "J"];
const COLS = 14;
const AISLE_AFTER = [4, 10];

/** Deterministic blueprint seat map keyed by film + date + time. */
export function buildSeatMap(seedStr: string): SeatRow[] {
  const rng = seededRng(seedStr);

  return ROWS.map((row) => {
    const seats: Seat[] = [];
    for (let c = 1; c <= COLS; c++) {
      const taken = rng() < 0.2;
      seats.push({
        id: `${row}${c}`,
        row,
        col: c,
        status: taken ? "taken" : "available",
        aisleAfter: AISLE_AFTER.includes(c),
      });
    }
    return { row, seats };
  });
}

export const SEAT_ROWS = ROWS;
export const SEAT_COLS = COLS;
