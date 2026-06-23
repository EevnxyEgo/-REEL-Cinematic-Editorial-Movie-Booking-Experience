import type { ShowDay } from "./types";
import { seededRng } from "./seeded";

const SLOTS = ["11:00", "14:30", "17:15", "20:00", "22:30"] as const;
const FORMATS = ["70MM", "35MM", "DIGITAL 4K", "70MM", "DIGITAL 4K"] as const;
const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

/** A deterministic week of showtimes for a film, starting today (server time). */
export function getShowDays(filmId: string, count = 6): ShowDay[] {
  const today = new Date();
  const days: ShowDay[] = [];

  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate(),
    ).padStart(2, "0")}`;
    const rng = seededRng(`${filmId}|${dateKey}`);

    const showtimes = SLOTS.map((time, idx) => ({
      time,
      format: FORMATS[idx % FORMATS.length],
      soldOut: rng() < 0.16,
    }));

    days.push({
      dateKey,
      weekday: WEEKDAYS[d.getDay()],
      day: String(d.getDate()).padStart(2, "0"),
      month: MONTHS[d.getMonth()],
      showtimes,
    });
  }

  return days;
}
