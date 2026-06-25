"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import type { Film } from "@/lib/types";
import { Poster } from "@/components/primitives/Poster";
import { formatRuntime } from "@/lib/format";

/** Magazine contents page: titles as rows, with a poster that trails the pointer. */
export function ProgrammeIndex({
  films,
  startIndex = 0,
}: {
  films: Film[];
  startIndex?: number;
}) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<{ film: Film; index: number } | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 280, damping: 28, mass: 0.5 });
  const y = useSpring(my, { stiffness: 280, damping: 28, mass: 0.5 });

  const handleMove = (e: React.MouseEvent) => {
    mx.set(e.clientX + 28);
    my.set(e.clientY - 130);
  };

  return (
    <section
      className="gutter relative z-10 mt-28"
      onMouseMove={reduce ? undefined : handleMove}
    >
      <div className="mb-6 flex items-end justify-between border-b border-ink/20 pb-5">
        <h2 className="display-xl">The Full Programme</h2>
        <span className="kicker hidden sm:block">Index · {films.length} Titles</span>
      </div>

      <ul>
        {films.map((film, i) => (
          <li key={film.id} className="border-b border-ink/15">
            <Link
              href={`/film/${film.id}`}
              data-cursor
              data-cursor-label="Open"
              className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-4 py-5 md:grid-cols-[3rem_1fr_auto] md:py-7"
              onMouseEnter={() => setHovered({ film, index: startIndex + i })}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="font-mono text-xs text-ink-soft">
                {String(startIndex + i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-[clamp(1.7rem,5vw,3.4rem)] font-semibold leading-[0.95] tracking-tight transition-[color,transform] duration-500 group-hover:text-burgundy md:group-hover:translate-x-3">
                {film.title}
              </span>
              <span className="col-span-2 mt-1 font-mono text-[0.68rem] uppercase leading-relaxed tracking-[0.15em] text-ink-soft md:col-span-1 md:mt-0 md:text-right">
                {film.year} · {formatRuntime(film.runtime)}
                {film.originalLanguage ? ` · ${film.originalLanguage}` : ""}
                <br className="hidden md:block" />
                <span className="md:hidden"> · </span>
                {film.genres.slice(0, 2).join(" / ")}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {!reduce && (
        <AnimatePresence>
          {hovered && (
            <motion.div
              key={hovered.film.id}
              aria-hidden
              className="pointer-events-none fixed left-0 top-0 z-[65] hidden w-44 lg:block"
              style={{ x, y }}
              initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: -4 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            >
              <Poster film={hovered.film} index={hovered.index} sizes="180px" />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
}
