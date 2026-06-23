"use client";

import type { Film } from "@/lib/types";

/** A kinetic band of film titles drifting past, pausing on hover. */
export function TitleMarquee({ films }: { films: Film[] }) {
  const titles = films.map((f) => f.title);
  const sequence = [...titles, ...titles];

  return (
    <div className="relative z-10 overflow-hidden border-y border-ink/15 py-4">
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap will-change-transform">
        {sequence.map((title, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-2xl italic text-ink-soft">{title}</span>
            <span className="font-display text-lg text-burgundy">✷</span>
          </span>
        ))}
      </div>
    </div>
  );
}
