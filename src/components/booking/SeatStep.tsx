"use client";

import { useMemo } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import type { Film, ShowDay } from "@/lib/types";
import { useBooking } from "@/lib/store";
import { buildSeatMap } from "@/lib/seats";
import { SeatMap } from "./SeatMap";
import { Ticker } from "@/components/primitives/Ticker";
import { ADMISSION, MAX_SEATS, formatPrice } from "@/lib/format";

export function SeatStep({
  film,
  days,
  onBack,
  onNext,
}: {
  film: Film;
  days: ShowDay[];
  onBack: () => void;
  onNext: () => void;
}) {
  const { dateKey, time, format, seats, toggleSeat } = useBooking();
  const day = days.find((d) => d.dateKey === dateKey);

  const rows = useMemo(
    () => buildSeatMap(`${film.id}|${dateKey}|${time}`),
    [film.id, dateKey, time],
  );

  const subtotal = seats.length * ADMISSION;

  return (
    <div>
      <header className="mb-8">
        <span className="kicker">Step 02 — Seats</span>
        <h2 className="display-xl mt-3">Claim your seats</h2>
        <button
          onClick={onBack}
          className="underline-sweep mt-3 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-soft"
        >
          <ArrowLeft size={13} strokeWidth={1.5} />
          {day ? `${day.weekday} ${day.day} ${day.month}` : ""} · {time} · {format} —
          change
        </button>
      </header>

      <SeatMap rows={rows} selected={seats} onToggle={toggleSeat} />

      <p className="mt-8 text-center font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-soft">
        Up to {MAX_SEATS} seats · Arrow keys to move · Enter to select
      </p>

      {/* Action bar */}
      <div className="sticky bottom-4 z-20 mx-auto mt-10 flex max-w-2xl items-center justify-between gap-4 border border-ink/25 bg-paper/95 px-5 py-4">
        <div>
          <p className="meta uppercase tracking-[0.18em] text-ink-soft">
            {seats.length === 0
              ? "No seats yet"
              : `${seats.length} seat${seats.length > 1 ? "s" : ""} · ${seats.join(", ")}`}
          </p>
          <Ticker
            value={subtotal}
            format={formatPrice}
            className="font-display text-3xl font-semibold text-burgundy"
          />
        </div>
        <button
          onClick={onNext}
          disabled={seats.length === 0}
          data-cursor={seats.length ? "" : undefined}
          data-cursor-label="Next"
          className={`inline-flex items-center gap-3 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
            seats.length
              ? "bg-burgundy text-paper hover:bg-burgundy-2"
              : "cursor-not-allowed border border-ink/20 text-ink-soft"
          }`}
        >
          Checkout
          <ArrowRight size={15} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
