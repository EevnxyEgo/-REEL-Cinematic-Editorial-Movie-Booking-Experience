/** Domain types for REEL. */

export type FilmSource = "tmdb" | "archive";

export interface CastMember {
  name: string;
  /** Role in the film, or null when unknown. */
  character: string | null;
}

export interface Film {
  /** Slug for curated films, numeric TMDB id (as string) for live films. */
  id: string;
  title: string;
  year: number;
  director: string | null;
  tagline: string | null;
  overview: string;
  /** Minutes. 0 when unknown (TMDB list rows). */
  runtime: number;
  genres: string[];
  /** 0–10, or null when unknown. */
  rating: number | null;
  /** TMDB path (e.g. "/abc.jpg") or null → render a typographic poster. */
  posterPath: string | null;
  backdropPath: string | null;
  /** YouTube key or null → trailer renders an archive-mode placeholder. */
  trailerKey: string | null;
  /** Readable original language (e.g. "Japanese"), or null when unknown. */
  originalLanguage: string | null;
  /** Top-billed cast. Empty on list rows (only resolved on the detail view). */
  cast: CastMember[];
}

export interface Showtime {
  /** 24h "HH:MM". */
  time: string;
  /** Presentation format, e.g. "70MM". */
  format: string;
  soldOut: boolean;
}

export interface ShowDay {
  /** ISO yyyy-mm-dd. */
  dateKey: string;
  weekday: string;
  day: string;
  month: string;
  showtimes: Showtime[];
}

export type SeatStatus = "available" | "taken" | "selected";

export interface Seat {
  id: string;
  row: string;
  col: number;
  status: SeatStatus;
  aisleAfter: boolean;
}

export interface SeatRow {
  row: string;
  seats: Seat[];
}
