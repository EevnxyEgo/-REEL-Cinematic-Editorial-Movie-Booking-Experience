"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { Film, ShowDay } from "@/lib/types";
import { useBooking } from "@/lib/store";

export function ShowtimeStep({
  film,
  days,
  onNext,
}: {
  film: Film;
  days: ShowDay[];
  onNext: () => void;
}) {
  const reduce = useReducedMotion();
  const { dateKey, time, setShowtime } = useBooking();
  const [activeDate, setActiveDate] = useState(dateKey ?? days[0].dateKey);
  const day = days.find((d) => d.dateKey === activeDate) ?? days[0];

  const committed = dateKey === activeDate ? time : null;

  return (
    <div>
      <header className="mb-10">
        <span className="kicker">Step 01 — Showtime</span>
        <h2 className="display-xl mt-3">Choose your screening</h2>
        <p className="meta mt-3 uppercase tracking-[0.18em] text-ink-soft">{film.title}</p>
      </header>

      {/* Date strip */}
      <div className="-mx-1 mb-12 flex gap-1 overflow-x-auto pb-2">
        {days.map((d) => {
          const isActive = d.dateKey === activeDate;
          return (
            <button
              key={d.dateKey}
              onClick={() => setActiveDate(d.dateKey)}
              data-cursor
              className="relative shrink-0 px-5 py-3 text-center"
              aria-pressed={isActive}
            >
              <span
                className={`block font-mono text-[0.65rem] uppercase tracking-[0.2em] ${
                  isActive ? "text-burgundy" : "text-ink-soft"
                }`}
              >
                {d.weekday}
              </span>
              <span
                className={`mt-1 block font-display text-3xl leading-none transition-colors ${
                  isActive ? "text-ink" : "text-ink-soft"
                }`}
              >
                {d.day}
              </span>
              <span
                className={`mt-1 block font-mono text-[0.65rem] uppercase tracking-[0.2em] ${
                  isActive ? "text-burgundy" : "text-ink-soft"
                }`}
              >
                {d.month}
              </span>
              {isActive && (
                <motion.span
                  layoutId="date-underline"
                  className="absolute inset-x-3 -bottom-0.5 h-[2px] bg-burgundy"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Times — kinetic typographic list */}
      <ul className="border-t border-ink/20">
        {day.showtimes.map((s, i) => {
          const isSelected = committed === s.time;
          return (
            <li key={s.time} className="border-b border-ink/15">
              <motion.button
                disabled={s.soldOut}
                onClick={() => setShowtime(activeDate, s.time, s.format)}
                data-cursor={s.soldOut ? undefined : ""}
                data-cursor-label="Select"
                aria-pressed={isSelected}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={`group flex w-full items-center justify-between gap-4 py-5 text-left md:py-6 ${
                  s.soldOut ? "cursor-not-allowed opacity-40" : ""
                }`}
              >
                <span className="flex items-baseline gap-5">
                  <span
                    className={`relative font-display text-[clamp(2rem,6vw,3.75rem)] font-semibold leading-none tracking-tight transition-[color,transform] duration-500 ${
                      isSelected
                        ? "text-burgundy"
                        : "group-hover:translate-x-2 group-hover:text-burgundy"
                    } ${s.soldOut ? "line-through" : ""}`}
                  >
                    {s.time}
                    {isSelected && (
                      <motion.span
                        layoutId="time-underline"
                        className="absolute -bottom-1 left-0 h-[2px] w-full bg-burgundy"
                      />
                    )}
                  </span>
                </span>
                <span className="text-right font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-soft">
                  {s.soldOut ? "Sold Out" : s.format}
                  <br />
                  Hall {String((i % 3) + 1).padStart(2, "0")}
                </span>
              </motion.button>
            </li>
          );
        })}
      </ul>

      {/* Continue */}
      <div className="mt-12 flex items-center justify-between gap-4">
        <span className="meta uppercase tracking-[0.18em] text-ink-soft">
          {time && dateKey
            ? `Selected · ${time}`
            : "Pick a time to continue"}
        </span>
        <button
          onClick={onNext}
          disabled={!time}
          data-cursor={time ? "" : undefined}
          data-cursor-label="Next"
          className={`inline-flex items-center gap-3 px-7 py-4 font-mono text-xs uppercase tracking-[0.22em] transition-colors ${
            time
              ? "bg-burgundy text-paper hover:bg-burgundy-2"
              : "cursor-not-allowed border border-ink/20 text-ink-soft"
          }`}
        >
          Choose Seats
          <ArrowRight size={15} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
