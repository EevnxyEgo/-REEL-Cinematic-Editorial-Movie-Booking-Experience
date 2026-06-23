"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Ticket } from "lucide-react";
import type { Film, ShowDay } from "@/lib/types";
import { useBooking } from "@/lib/store";
import { ADMISSION, BOOKING_FEE, formatPrice } from "@/lib/format";
import { hashString } from "@/lib/seeded";
import { ETicket } from "./ETicket";

export function CheckoutStep({
  film,
  days,
  onBack,
  onRestart,
}: {
  film: Film;
  days: ShowDay[];
  onBack: () => void;
  onRestart: () => void;
}) {
  const { dateKey, time, format, seats } = useBooking();
  const [confirmed, setConfirmed] = useState(false);

  const day = days.find((d) => d.dateKey === dateKey);
  const dateLabel = day ? `${day.weekday} ${day.day} ${day.month}` : (dateKey ?? "—");

  const subtotal = seats.length * ADMISSION;
  const fee = seats.length ? BOOKING_FEE : 0;
  const total = subtotal + fee;

  const bookingId = useMemo(() => {
    const h = hashString(`${film.id}|${dateKey}|${time}|${seats.join(",")}`);
    return h.toString(16).toUpperCase().padStart(6, "0").slice(0, 6);
  }, [film.id, dateKey, time, seats]);

  if (confirmed) {
    return (
      <ETicket
        film={film}
        dateLabel={dateLabel}
        time={time ?? "—"}
        format={format ?? "—"}
        seats={seats}
        total={total}
        bookingId={bookingId}
        onRestart={onRestart}
      />
    );
  }

  return (
    <div>
      <header className="mb-10">
        <span className="kicker">Step 03 — Checkout</span>
        <h2 className="display-xl mt-3">Confirm your booking</h2>
        <button
          onClick={onBack}
          className="underline-sweep mt-3 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-soft"
        >
          <ArrowLeft size={13} strokeWidth={1.5} /> Back to seats
        </button>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        {/* Summary */}
        <div className="border border-ink/20 p-7 md:p-9">
          <h3 className="font-display text-3xl font-semibold leading-none">{film.title}</h3>
          <p className="meta mt-2 uppercase tracking-[0.18em] text-ink-soft">
            {film.year} · {film.director ?? "Feature"}
          </p>

          <dl className="mt-8">
            <Line label="Date" value={dateLabel} />
            <Line label="Time" value={time ?? "—"} />
            <Line label="Format" value={format ?? "—"} />
            <Line label="Seats" value={seats.length ? seats.join(", ") : "—"} />
            <Line label={`Admission · ${seats.length} × ${formatPrice(ADMISSION)}`} value={formatPrice(subtotal)} />
            <Line label="Booking fee" value={formatPrice(fee)} />
          </dl>

          <div className="mt-6 flex items-end justify-between border-t border-ink/30 pt-6">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-ink-soft">
              Total
            </span>
            <span className="font-display text-4xl font-semibold text-burgundy">
              {formatPrice(total)}
            </span>
          </div>
        </div>

        {/* Confirm */}
        <div className="flex flex-col justify-between gap-8">
          <p className="pull-quote text-ink-soft">
            The lights are dimming. Confirm to print your seat in the dark.
          </p>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setConfirmed(true)}
            disabled={seats.length === 0}
            data-cursor={seats.length ? "" : undefined}
            data-cursor-label="Issue"
            className={`inline-flex items-center justify-center gap-3 px-7 py-5 font-mono text-xs uppercase tracking-[0.24em] transition-colors ${
              seats.length
                ? "bg-burgundy text-paper hover:bg-burgundy-2"
                : "cursor-not-allowed border border-ink/20 text-ink-soft"
            }`}
          >
            <Ticket size={16} strokeWidth={1.5} /> Confirm &amp; Issue Ticket
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-ink/12 py-3">
      <dt className="meta uppercase tracking-[0.15em] text-ink-soft">{label}</dt>
      <dd className="text-right font-display text-lg">{value}</dd>
    </div>
  );
}
