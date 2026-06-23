"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { Film, FilmSource } from "@/lib/types";
import { Poster } from "@/components/primitives/Poster";
import { Magnetic } from "@/components/primitives/Magnetic";
import { Tag } from "@/components/primitives/Tag";
import { formatRuntime } from "@/lib/format";

export function FeaturedHero({ film, source }: { film: Film; source: FilmSource }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const posterY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40]);

  const stamp = source === "tmdb" ? "Now Playing" : "The Permanent Programme";

  return (
    <section
      ref={ref}
      className="gutter relative z-10 grid items-end gap-x-10 gap-y-12 pb-16 pt-10 md:pt-14 lg:grid-cols-12"
    >
      <motion.div style={{ y: titleY }} className="lg:col-span-7">
        <div className="mb-7 flex items-center gap-4">
          <span className="kicker">{stamp}</span>
          <span className="h-[1px] w-16 bg-ink/30" />
          <span className="meta uppercase tracking-[0.2em] text-burgundy">
            Feature Presentation
          </span>
        </div>

        <h1 className="display-hero">
          {film.title.split(" ").map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              className="mr-[0.22em] inline-block"
              initial={reduce ? false : { y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {film.tagline && (
          <p className="pull-quote mt-7 max-w-xl text-ink-soft">“{film.tagline}”</p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
          <Tag>{film.year}</Tag>
          <Tag>{formatRuntime(film.runtime)}</Tag>
          {film.genres.slice(0, 2).map((g) => (
            <Tag key={g}>{g}</Tag>
          ))}
          {film.director && <Tag>Dir. {film.director}</Tag>}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Magnetic strength={0.4}>
            <Link
              href={`/film/${film.id}/book`}
              data-cursor
              data-cursor-label="Reserve"
              className="group inline-flex items-center gap-3 bg-burgundy px-7 py-4 font-mono text-xs uppercase tracking-[0.22em] text-paper transition-colors hover:bg-burgundy-2"
            >
              Reserve Seats
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </Magnetic>
          <Link
            href={`/film/${film.id}`}
            data-cursor
            data-cursor-label="Read"
            className="underline-sweep font-mono text-xs uppercase tracking-[0.22em]"
          >
            Read the Notes
          </Link>
        </div>
      </motion.div>

      <motion.div style={{ y: posterY }} className="lg:col-span-5">
        <Magnetic strength={0.18}>
          <div data-cursor data-cursor-label="View" className="relative">
            <Link href={`/film/${film.id}`} aria-label={`Open ${film.title}`}>
              <Poster
                film={film}
                index={0}
                priority
                sizes="(max-width: 1024px) 80vw, 38vw"
                className="shadow-[14px_14px_0_0_var(--burgundy)]"
              />
            </Link>
            <div className="mt-3 flex items-center justify-between">
              <span className="meta uppercase tracking-[0.2em] text-ink-soft">
                Reel N°01
              </span>
              <span className="meta uppercase tracking-[0.2em] text-ink-soft">
                {film.rating ? `★ ${film.rating.toFixed(1)}` : "Unrated"}
              </span>
            </div>
          </div>
        </Magnetic>
      </motion.div>
    </section>
  );
}
