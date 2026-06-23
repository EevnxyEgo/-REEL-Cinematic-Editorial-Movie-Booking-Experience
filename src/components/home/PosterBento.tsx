"use client";

import Link from "next/link";
import type { Film } from "@/lib/types";
import { Poster } from "@/components/primitives/Poster";
import { Magnetic } from "@/components/primitives/Magnetic";
import { Reveal } from "@/components/primitives/Reveal";
import { formatRuntime } from "@/lib/format";

// Staggered vertical offsets give the row an editorial bento rhythm.
const OFFSETS = ["", "sm:mt-14", "sm:mt-6", "sm:mt-20"];

export function PosterBento({ films, startIndex = 1 }: { films: Film[]; startIndex?: number }) {
  if (films.length === 0) return null;

  return (
    <section className="gutter relative z-10 mt-28">
      <div className="mb-12 flex items-end justify-between border-b border-ink/20 pb-5">
        <h2 className="display-xl">Selected Engagements</h2>
        <span className="kicker hidden sm:block">In Rotation</span>
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-6">
        {films.map((film, i) => (
          <Reveal
            key={film.id}
            delay={i * 0.08}
            className={OFFSETS[i % OFFSETS.length]}
          >
            <Magnetic strength={0.16}>
              <Link
                href={`/film/${film.id}`}
                data-cursor
                data-cursor-label="View"
                className="group block"
              >
                <Poster
                  film={film}
                  index={startIndex + i}
                  sizes="(max-width: 640px) 45vw, 22vw"
                  className="transition-transform duration-500 group-hover:-translate-y-1.5"
                />
                <div className="mt-3 flex items-baseline justify-between gap-2 border-t border-ink/15 pt-2.5">
                  <span className="truncate font-display text-base leading-tight">
                    {film.title}
                  </span>
                  <span className="meta whitespace-nowrap text-ink-soft">
                    {formatRuntime(film.runtime)}
                  </span>
                </div>
              </Link>
            </Magnetic>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
