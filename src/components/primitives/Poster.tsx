"use client";

import Image from "next/image";
import { useState } from "react";
import type { Film } from "@/lib/types";
import { posterUrl } from "@/lib/images";
import { TypographicPoster } from "./TypographicPoster";

/**
 * Portrait poster. Renders a burgundy-duotoned real image when TMDB supplies
 * one, otherwise (and on any load error) the typographic programme card.
 */
export function Poster({
  film,
  index = 0,
  sizes = "(max-width: 768px) 50vw, 22vw",
  priority = false,
  className = "",
}: {
  film: Film;
  index?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const url = posterUrl(film.posterPath);

  if (!url || failed) {
    return <TypographicPoster film={film} index={index} className={className} />;
  }

  return (
    <div
      className={`duotone relative aspect-[2/3] overflow-hidden border border-ink/20 ${className}`}
    >
      <Image
        src={url}
        alt={`${film.title} poster`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        onError={() => setFailed(true)}
      />
      <div className="film-grain pointer-events-none absolute inset-0 z-[2] opacity-[0.07] mix-blend-overlay" />
    </div>
  );
}
