import type { CastMember, Film, FilmSource } from "./types";
import { CURATED_FILMS, getCuratedFilm } from "@/data/films";

/**
 * Data layer with graceful degradation.
 *
 * - With `TMDB_API_KEY`: live "Now Playing" + real duotone imagery from TMDB.
 * - Without a key (or on any network error): the curated archive programme.
 *
 * Nothing here ever throws to the caller — REEL always renders.
 */

const TMDB_BASE = "https://api.themoviedb.org/3";
const KEY = process.env.TMDB_API_KEY?.trim();

interface TmdbListMovie {
  id: number;
  title: string;
  overview: string;
  release_date?: string;
  vote_average?: number;
  poster_path: string | null;
  backdrop_path: string | null;
  genre_ids?: number[];
  original_language?: string;
}

interface TmdbDetail extends TmdbListMovie {
  runtime?: number;
  tagline?: string;
  genres?: { id: number; name: string }[];
}

interface TmdbCastCredit {
  name: string;
  character?: string;
  order: number;
  known_for_department?: string;
}

/** ISO 639-1 code → readable English language name (e.g. "ja" → "Japanese"). */
function languageName(code?: string): string | null {
  if (!code) return null;
  try {
    return new Intl.DisplayNames(["en"], { type: "language" }).of(code) ?? code.toUpperCase();
  } catch {
    return code.toUpperCase();
  }
}

/** Top-billed cast, in credit order, capped for an editorial "Featuring" block. */
function topCast(cast: TmdbCastCredit[], limit = 6): CastMember[] {
  return [...cast]
    .sort((a, b) => a.order - b.order)
    .slice(0, limit)
    .map((c) => ({ name: c.name, character: c.character?.trim() || null }));
}

async function tmdbFetch<T>(path: string, revalidate = 3600): Promise<T> {
  const sep = path.includes("?") ? "&" : "?";
  const res = await fetch(`${TMDB_BASE}${path}${sep}api_key=${KEY}`, {
    next: { revalidate },
    headers: { accept: "application/json" },
  });
  if (!res.ok) throw new Error(`TMDB ${res.status}`);
  return res.json() as Promise<T>;
}

let genreCache: Map<number, string> | null = null;
async function genreMap(): Promise<Map<number, string>> {
  if (genreCache) return genreCache;
  const data = await tmdbFetch<{ genres: { id: number; name: string }[] }>(
    "/genre/movie/list?language=en-US",
    86400,
  );
  genreCache = new Map(data.genres.map((g) => [g.id, g.name]));
  return genreCache;
}

function yearOf(date?: string): number {
  return date ? Number(date.slice(0, 4)) || 0 : 0;
}

function mapListMovie(m: TmdbListMovie, genres: Map<number, string>): Film {
  return {
    id: String(m.id),
    title: m.title,
    year: yearOf(m.release_date),
    director: null,
    tagline: null,
    overview: m.overview || "Synopsis withheld.",
    runtime: 0,
    genres: (m.genre_ids ?? []).map((id) => genres.get(id)).filter(Boolean).slice(0, 3) as string[],
    rating: m.vote_average ? Math.round(m.vote_average * 10) / 10 : null,
    posterPath: m.poster_path,
    backdropPath: m.backdrop_path,
    trailerKey: null,
    originalLanguage: languageName(m.original_language),
    cast: [],
  };
}

export async function getFilms(): Promise<{ films: Film[]; source: FilmSource }> {
  if (!KEY) return { films: CURATED_FILMS, source: "archive" };
  try {
    const [page1, page2, genres] = await Promise.all([
      tmdbFetch<{ results: TmdbListMovie[] }>("/movie/now_playing?language=en-US&page=1"),
      tmdbFetch<{ results: TmdbListMovie[] }>("/movie/now_playing?language=en-US&page=2"),
      genreMap(),
    ]);
    // Merge two pages, drop rows without a synopsis or real poster, dedupe by id.
    const seen = new Set<number>();
    const films = [...page1.results, ...page2.results]
      .filter((m) => {
        if (!m.overview || !m.poster_path || seen.has(m.id)) return false;
        seen.add(m.id);
        return true;
      })
      .slice(0, 18)
      .map((m) => mapListMovie(m, genres));
    if (films.length === 0) return { films: CURATED_FILMS, source: "archive" };
    return { films, source: "tmdb" };
  } catch {
    return { films: CURATED_FILMS, source: "archive" };
  }
}

export async function getFilm(id: string): Promise<{ film: Film | null; source: FilmSource }> {
  // Non-numeric ids belong to the curated archive.
  if (!KEY || !/^\d+$/.test(id)) {
    return { film: getCuratedFilm(id), source: "archive" };
  }
  try {
    const [detail, credits, videos] = await Promise.all([
      tmdbFetch<TmdbDetail>(`/movie/${id}?language=en-US`),
      tmdbFetch<{ crew: { job: string; name: string }[]; cast: TmdbCastCredit[] }>(
        `/movie/${id}/credits?language=en-US`,
      ),
      tmdbFetch<{ results: { type: string; site: string; key: string }[] }>(
        `/movie/${id}/videos?language=en-US`,
      ),
    ]);
    const director = credits.crew.find((c) => c.job === "Director")?.name ?? null;
    const trailer = videos.results.find(
      (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"),
    );
    const film: Film = {
      id: String(detail.id),
      title: detail.title,
      year: yearOf(detail.release_date),
      director,
      tagline: detail.tagline || null,
      overview: detail.overview || "Synopsis withheld.",
      runtime: detail.runtime ?? 0,
      genres: (detail.genres ?? []).map((g) => g.name).slice(0, 3),
      rating: detail.vote_average ? Math.round(detail.vote_average * 10) / 10 : null,
      posterPath: detail.poster_path,
      backdropPath: detail.backdrop_path,
      trailerKey: trailer?.key ?? null,
      originalLanguage: languageName(detail.original_language),
      cast: topCast(credits.cast ?? []),
    };
    return { film, source: "tmdb" };
  } catch {
    return { film: getCuratedFilm(id), source: "archive" };
  }
}
