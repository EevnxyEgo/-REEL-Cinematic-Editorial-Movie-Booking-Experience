import type { Film } from "@/lib/types";

/**
 * THE REEL PROGRAMME — a hand-curated permanent collection used whenever no
 * TMDB key is present. Copy is original and on-brand (no synopsis is lifted
 * verbatim from a database). Posters are intentionally typographic: the demo
 * never depends on a remote image, and the look is true to a 1970s film
 * programme. Supplying a TMDB key swaps this for live "Now Playing" data.
 */
export const CURATED_FILMS: Film[] = [
  {
    id: "blade-runner",
    title: "Blade Runner",
    year: 1982,
    director: "Ridley Scott",
    tagline: "Man has made his match.",
    overview:
      "Rain-soaked neon and synthetic souls. A blade runner is pulled back to retire four replicants who refuse to die quietly — and forced to ask what, exactly, he is hunting.",
    runtime: 117,
    genres: ["Science Fiction", "Noir"],
    rating: 8.1,
    posterPath: null,
    backdropPath: null,
    trailerKey: null,
  },
  {
    id: "2001-a-space-odyssey",
    title: "2001: A Space Odyssey",
    year: 1968,
    director: "Stanley Kubrick",
    tagline: "The ultimate trip.",
    overview:
      "From a bone flung skyward to a stargate beyond Jupiter, the monolith measures the whole arc of human ambition — and the cold intelligence we build to outlast us.",
    runtime: 149,
    genres: ["Science Fiction", "Drama"],
    rating: 8.3,
    posterPath: null,
    backdropPath: null,
    trailerKey: null,
  },
  {
    id: "in-the-mood-for-love",
    title: "In the Mood for Love",
    year: 2000,
    director: "Wong Kar-wai",
    tagline: "Feel for the moment.",
    overview:
      "Two neighbours discover their spouses are having an affair, and circle one another through narrow hallways and slow rain — rehearsing a love they refuse to begin.",
    runtime: 98,
    genres: ["Romance", "Drama"],
    rating: 8.1,
    posterPath: null,
    backdropPath: null,
    trailerKey: null,
  },
  {
    id: "apocalypse-now",
    title: "Apocalypse Now",
    year: 1979,
    director: "Francis Ford Coppola",
    tagline: "The horror, rendered in light.",
    overview:
      "A captain travels upriver into the heart of the war to terminate a colonel who has crowned himself a god. The jungle keeps no record of who returns.",
    runtime: 147,
    genres: ["War", "Drama"],
    rating: 8.4,
    posterPath: null,
    backdropPath: null,
    trailerKey: null,
  },
  {
    id: "taxi-driver",
    title: "Taxi Driver",
    year: 1976,
    director: "Martin Scorsese",
    tagline: "On every street, a reckoning.",
    overview:
      "Sleepless and unmoored, a night-shift cabbie drifts through a city that will not look back — until he decides to become the flood that washes it clean.",
    runtime: 114,
    genres: ["Crime", "Drama"],
    rating: 8.2,
    posterPath: null,
    backdropPath: null,
    trailerKey: null,
  },
  {
    id: "stalker",
    title: "Stalker",
    year: 1979,
    director: "Andrei Tarkovsky",
    tagline: "Step into the Zone.",
    overview:
      "A guide leads two restless men through the forbidden Zone toward a room that grants your deepest wish. The closer they come, the less certain they are of what they want.",
    runtime: 162,
    genres: ["Science Fiction", "Drama"],
    rating: 8.2,
    posterPath: null,
    backdropPath: null,
    trailerKey: null,
  },
  {
    id: "persona",
    title: "Persona",
    year: 1966,
    director: "Ingmar Bergman",
    tagline: "Two faces, one wound.",
    overview:
      "An actress falls silent; the nurse who tends her cannot stop talking. On a windswept island the two women begin to bleed into a single, unstable self.",
    runtime: 83,
    genres: ["Drama", "Psychological"],
    rating: 8.1,
    posterPath: null,
    backdropPath: null,
    trailerKey: null,
  },
  {
    id: "the-conformist",
    title: "The Conformist",
    year: 1970,
    director: "Bernardo Bertolucci",
    tagline: "A beautiful collaboration with the void.",
    overview:
      "To belong, a hollow man agrees to murder his old professor for the regime. The film drapes fascism in polished marble and finds only the emptiness beneath.",
    runtime: 113,
    genres: ["Drama", "Political"],
    rating: 8.0,
    posterPath: null,
    backdropPath: null,
    trailerKey: null,
  },
];

export function getCuratedFilm(id: string): Film | null {
  return CURATED_FILMS.find((f) => f.id === id) ?? null;
}
