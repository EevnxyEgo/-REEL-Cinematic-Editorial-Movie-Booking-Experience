"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Play, ArrowLeft, ArrowRight } from "lucide-react";
import type { Film, FilmSource } from "@/lib/types";
import { Poster } from "@/components/primitives/Poster";
import { Magnetic } from "@/components/primitives/Magnetic";
import { Reveal } from "@/components/primitives/Reveal";
import { TrailerModal } from "./TrailerModal";
import { formatRuntime } from "@/lib/format";

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-ink/15 py-3">
      <dt className="meta uppercase tracking-[0.2em] text-ink-soft">{label}</dt>
      <dd className="text-right font-display text-lg">{value}</dd>
    </div>
  );
}

export function DetailView({ film, source }: { film: Film; source: FilmSource }) {
  const [trailerOpen, setTrailerOpen] = useState(false);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const posterY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -36]);

  return (
    <article ref={ref} className="gutter relative z-10 pt-8 pb-8">
      <Link
        href="/"
        data-cursor
        data-cursor-label="Back"
        className="underline-sweep mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-ink-soft"
      >
        <ArrowLeft size={14} strokeWidth={1.5} /> The Programme
      </Link>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* LEFT — grainy poster, sticky with a whisper of parallax */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <motion.div style={{ y: posterY }}>
              <Magnetic strength={0.12}>
                <Poster
                  film={film}
                  index={0}
                  priority
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="shadow-[16px_16px_0_0_var(--burgundy)]"
                />
              </Magnetic>
            </motion.div>
            <div className="mt-4 flex items-center justify-between">
              <span className="meta uppercase tracking-[0.2em] text-ink-soft">
                {source === "tmdb" ? "TMDB" : "Archive Print"}
              </span>
              <span className="meta uppercase tracking-[0.2em] text-ink-soft">
                {film.rating ? `★ ${film.rating.toFixed(1)} / 10` : "Unrated"}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT — the notes */}
        <div className="lg:col-span-7">
          <span className="kicker">The Notes</span>
          <h1 className="display-xl mt-4">{film.title}</h1>

          {film.tagline && (
            <p className="pull-quote mt-5 text-burgundy">“{film.tagline}”</p>
          )}

          <Reveal className="mt-10">
            <p className="max-w-2xl font-display text-[clamp(1.35rem,1rem+1.4vw,2rem)] font-normal italic leading-[1.3]">
              {film.overview}
            </p>
          </Reveal>

          <dl className="mt-12 max-w-xl">
            <MetaRow label="Year" value={String(film.year)} />
            <MetaRow label="Running Time" value={formatRuntime(film.runtime)} />
            {film.director && <MetaRow label="Director" value={film.director} />}
            {film.originalLanguage && (
              <MetaRow label="Language" value={film.originalLanguage} />
            )}
            <MetaRow label="Genre" value={film.genres.join(" · ") || "Feature"} />
          </dl>

          {film.cast.length > 0 && (
            <Reveal className="mt-14 max-w-xl">
              <div className="flex items-center gap-4">
                <span className="kicker">Featuring</span>
                <span className="h-[1px] flex-1 bg-ink/15" />
              </div>
              <ul className="mt-6 grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
                {film.cast.map((member) => (
                  <li key={member.name} className="border-b border-ink/15 pb-3">
                    <p className="font-display text-lg leading-tight">{member.name}</p>
                    {member.character && (
                      <p className="meta mt-1 uppercase tracking-[0.16em] text-ink-soft">
                        {member.character}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Magnetic strength={0.4}>
              <Link
                href={`/film/${film.id}/book`}
                data-cursor
                data-cursor-label="Reserve"
                className="group inline-flex items-center gap-3 bg-burgundy px-7 py-4 font-mono text-xs uppercase tracking-[0.22em] text-paper transition-colors hover:bg-burgundy-2"
              >
                Reserve Seats
                <ArrowRight
                  size={15}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Magnetic>

            <button
              onClick={() => setTrailerOpen(true)}
              data-cursor
              data-cursor-label="Play"
              className="underline-sweep inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.22em]"
            >
              <Play size={15} strokeWidth={1.5} /> Watch Trailer
            </button>
          </div>
        </div>
      </div>

      <TrailerModal
        open={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        trailerKey={film.trailerKey}
        title={film.title}
      />
    </article>
  );
}
