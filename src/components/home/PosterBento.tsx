"use client";

import Link from "next/link";
import type { Film } from "@/lib/types";
import { Poster } from "@/components/primitives/Poster";
import { Magnetic } from "@/components/primitives/Magnetic";
import { Reveal } from "@/components/primitives/Reveal";
import { formatRuntime } from "@/lib/format";

/**
 * Asymmetric editorial mosaic. Each tile takes a deliberate column span so the
 * row reads like a magazine spread — a feature poster, a triplet, a closing
 * pair — rather than a uniform grid. Rows sum to six columns on desktop; small
 * screens fall back to a clean 2-up. Staggered top offsets give it bento rhythm.
 */
const TILES = [
  { span: "sm:col-span-4", offset: "" },
  { span: "sm:col-span-2", offset: "sm:mt-16" },
  { span: "sm:col-span-2", offset: "" },
  { span: "sm:col-span-2", offset: "sm:mt-10" },
  { span: "sm:col-span-2", offset: "" },
  { span: "sm:col-span-3", offset: "sm:mt-12" },
  { span: "sm:col-span-3", offset: "" },
];

export function PosterBento({ films, startIndex = 1 }: { films: Film[]; startIndex?: number }) {
  if (films.length === 0) return null;

  return (
    <section className="gutter relative z-10 mt-28">
      <div className="mb-12 flex items-end justify-between border-b border-ink/20 pb-5">
        <h2 className="display-xl">Now Showing</h2>
        <span className="kicker hidden sm:block">In Rotation · {films.length}</span>
      </div>

      <div className="grid grid-cols-2 items-start gap-x-5 gap-y-10 sm:grid-cols-6 sm:gap-x-6 sm:gap-y-8">
        {films.map((film, i) => {
          const tile = TILES[i % TILES.length];
          const feature = tile.span === "sm:col-span-4";
          return (
            <Reveal key={film.id} delay={(i % 4) * 0.07} className={`${tile.span} ${tile.offset}`}>
              <Magnetic strength={0.14}>
                <Link
                  href={`/film/${film.id}`}
                  data-cursor
                  data-cursor-label="View"
                  className="group block"
                >
                  <Poster
                    film={film}
                    index={startIndex + i}
                    priority={i < 2}
                    sizes={
                      feature
                        ? "(max-width: 640px) 45vw, 44vw"
                        : "(max-width: 640px) 45vw, 22vw"
                    }
                    className="transition-transform duration-500 group-hover:-translate-y-1.5"
                  />
                  <div className="mt-3 flex items-baseline justify-between gap-2 border-t border-ink/15 pt-2.5">
                    <span
                      className={`truncate font-display leading-tight ${
                        feature ? "text-xl sm:text-2xl" : "text-base"
                      }`}
                    >
                      {film.title}
                    </span>
                    <span className="meta whitespace-nowrap text-ink-soft">
                      {film.year || formatRuntime(film.runtime)}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-3">
                    <span className="meta truncate text-ink-soft">
                      {film.genres.slice(0, feature ? 3 : 1).join(" · ") || "Feature"}
                    </span>
                    {film.originalLanguage && (
                      <span className="meta shrink-0 uppercase tracking-[0.18em] text-ink-soft/75">
                        {film.originalLanguage}
                      </span>
                    )}
                  </div>
                </Link>
              </Magnetic>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
