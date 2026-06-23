"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Printer, RotateCcw } from "lucide-react";
import QRCode from "qrcode";
import type { Film } from "@/lib/types";
import { formatPrice } from "@/lib/format";

// The physical ticket is always paper — fixed cream/charcoal so the QR keeps
// contrast and prints correctly regardless of the active theme.
const TICKET_BG = "#f4ede2";
const TICKET_INK = "#1f1b18";
const TICKET_ACCENT = "#6e1a23";

export function ETicket({
  film,
  dateLabel,
  time,
  format,
  seats,
  total,
  bookingId,
  onRestart,
}: {
  film: Film;
  dateLabel: string;
  time: string;
  format: string;
  seats: string[];
  total: number;
  bookingId: string;
  onRestart: () => void;
}) {
  const [qr, setQr] = useState("");

  useEffect(() => {
    const payload = JSON.stringify({
      id: bookingId,
      film: film.title,
      date: dateLabel,
      time,
      format,
      seats,
      total,
    });
    QRCode.toDataURL(payload, {
      margin: 0,
      width: 320,
      color: { dark: TICKET_INK, light: TICKET_BG },
    })
      .then(setQr)
      .catch(() => setQr(""));
  }, [bookingId, film.title, dateLabel, time, format, seats, total]);

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="print-ticket relative grid w-full max-w-3xl grid-cols-1 overflow-hidden border shadow-[16px_16px_0_0_var(--burgundy)] sm:grid-cols-[1.7fr_1fr]"
        style={{ background: TICKET_BG, color: TICKET_INK, borderColor: "rgba(31,27,24,0.4)" }}
      >
        {/* Stub — details */}
        <div className="film-grain relative p-7 sm:p-9">
          <div className="flex items-center justify-between">
            <span
              className="font-mono text-[0.6rem] uppercase tracking-[0.3em]"
              style={{ color: TICKET_ACCENT }}
            >
              REEL · Admit {seats.length}
            </span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em]">
              N° {bookingId}
            </span>
          </div>

          <h3 className="mt-6 font-display text-[clamp(1.8rem,5vw,3rem)] font-semibold leading-[0.9]">
            {film.title}
          </h3>
          <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.2em]">
            {film.year} · {film.director ?? "Feature"}
          </p>

          <div
            className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-t pt-6"
            style={{ borderColor: "rgba(31,27,24,0.25)" }}
          >
            <Field label="Date" value={dateLabel} />
            <Field label="Time" value={time} />
            <Field label="Format" value={format} />
            <Field label="Seats" value={seats.join(", ")} />
          </div>

          <div
            className="mt-7 flex items-end justify-between border-t pt-5"
            style={{ borderColor: "rgba(31,27,24,0.25)" }}
          >
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em]">
              Total Paid
            </span>
            <span
              className="font-display text-3xl font-semibold"
              style={{ color: TICKET_ACCENT }}
            >
              {formatPrice(total)}
            </span>
          </div>
        </div>

        {/* Perforation */}
        <div
          className="relative hidden sm:block"
          style={{ borderLeft: "2px dashed rgba(31,27,24,0.4)" }}
        >
          <span
            className="absolute -left-[9px] -top-[9px] h-4 w-4 rounded-full"
            style={{ background: "var(--paper)" }}
          />
          <span
            className="absolute -left-[9px] -bottom-[9px] h-4 w-4 rounded-full"
            style={{ background: "var(--paper)" }}
          />
        </div>

        {/* QR panel */}
        <div className="flex flex-col items-center justify-center gap-4 p-7">
          {qr ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={qr} alt={`Ticket QR code ${bookingId}`} className="h-36 w-36" />
          ) : (
            <div className="h-36 w-36 animate-pulse" style={{ background: "rgba(31,27,24,0.08)" }} />
          )}
          <p className="text-center font-mono text-[0.55rem] uppercase leading-relaxed tracking-[0.2em]">
            Scan at the door
            <br />
            Single admission
          </p>
        </div>
      </motion.div>

      <div className="no-print mt-10 flex flex-wrap items-center justify-center gap-5">
        <button
          onClick={() => window.print()}
          data-cursor
          data-cursor-label="Print"
          className="inline-flex items-center gap-2.5 bg-burgundy px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:bg-burgundy-2"
        >
          <Printer size={15} strokeWidth={1.5} /> Print Ticket
        </button>
        <button
          onClick={onRestart}
          data-cursor
          data-cursor-label="Home"
          className="underline-sweep inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em]"
        >
          <RotateCcw size={14} strokeWidth={1.5} /> Book Another
        </button>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[0.55rem] uppercase tracking-[0.25em] opacity-60">{label}</p>
      <p className="mt-1 font-display text-lg leading-tight">{value}</p>
    </div>
  );
}
