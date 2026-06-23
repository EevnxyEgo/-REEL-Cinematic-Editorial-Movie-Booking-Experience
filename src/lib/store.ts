import { create } from "zustand";
import { MAX_SEATS } from "./format";

export interface BookingState {
  filmId: string | null;
  dateKey: string | null;
  time: string | null;
  format: string | null;
  seats: string[];
  setFilm: (id: string) => void;
  setShowtime: (dateKey: string, time: string, format: string) => void;
  toggleSeat: (id: string) => void;
  clearSeats: () => void;
  reset: () => void;
}

const EMPTY = {
  filmId: null,
  dateKey: null,
  time: null,
  format: null,
  seats: [] as string[],
};

export const useBooking = create<BookingState>((set) => ({
  ...EMPTY,
  setFilm: (id) =>
    set((s) => (s.filmId === id ? s : { ...EMPTY, filmId: id })),
  setShowtime: (dateKey, time, format) =>
    set((s) => {
      // Changing the showtime invalidates any seats picked for the old one.
      const changed = s.dateKey !== dateKey || s.time !== time;
      return { dateKey, time, format, seats: changed ? [] : s.seats };
    }),
  toggleSeat: (id) =>
    set((s) => {
      if (s.seats.includes(id)) {
        return { seats: s.seats.filter((x) => x !== id) };
      }
      if (s.seats.length >= MAX_SEATS) return s;
      // Keep a stable visual order (row then column).
      const next = [...s.seats, id].sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true }),
      );
      return { seats: next };
    }),
  clearSeats: () => set({ seats: [] }),
  reset: () => set({ ...EMPTY }),
}));
