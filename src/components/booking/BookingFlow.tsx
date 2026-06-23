"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Film, ShowDay } from "@/lib/types";
import { useBooking } from "@/lib/store";
import { ShowtimeStep } from "./ShowtimeStep";
import { SeatStep } from "./SeatStep";
import { CheckoutStep } from "./CheckoutStep";

const STEP_LABELS = ["Showtime", "Seats", "Ticket"];

export function BookingFlow({ film, days }: { film: Film; days: ShowDay[] }) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const { setFilm, time, seats, reset } = useBooking();
  const [step, setStep] = useState(0);

  useEffect(() => {
    setFilm(film.id);
  }, [film.id, setFilm]);

  const reachable = (target: number) => {
    if (target <= step) return true;
    if (target === 1) return Boolean(time);
    if (target === 2) return Boolean(time) && seats.length > 0;
    return false;
  };

  const goTo = (target: number) => {
    if (reachable(target)) setStep(target);
  };

  const restart = () => {
    reset();
    setStep(0);
    router.push("/");
  };

  const variants = {
    enter: { opacity: 0, y: reduce ? 0 : 24 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: reduce ? 0 : -24 },
  };

  return (
    <div className="gutter relative z-10 pb-12 pt-8">
      {/* Stepper */}
      <div className="no-print mb-12">
        <Link
          href={`/film/${film.id}`}
          className="underline-sweep mb-6 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-soft"
        >
          <ArrowLeft size={13} strokeWidth={1.5} /> {film.title}
        </Link>
        <div className="flex items-stretch gap-3 md:gap-6">
          {STEP_LABELS.map((label, i) => {
            const active = i === step;
            const done = i < step;
            const can = reachable(i);
            return (
              <button
                key={label}
                onClick={() => goTo(i)}
                disabled={!can}
                className={`group flex-1 border-t-2 pt-3 text-left transition-colors ${
                  active
                    ? "border-burgundy"
                    : done
                      ? "border-ink/50"
                      : "border-ink/15"
                } ${can ? "" : "cursor-not-allowed"}`}
              >
                <span
                  className={`block font-mono text-[0.6rem] uppercase tracking-[0.2em] ${
                    active ? "text-burgundy" : "text-ink-soft"
                  }`}
                >
                  0{i + 1}
                </span>
                <span
                  className={`mt-1 block font-display text-lg leading-none md:text-2xl ${
                    active || done ? "text-ink" : "text-ink-soft"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {step === 0 && <ShowtimeStep film={film} days={days} onNext={() => goTo(1)} />}
          {step === 1 && (
            <SeatStep
              film={film}
              days={days}
              onBack={() => setStep(0)}
              onNext={() => goTo(2)}
            />
          )}
          {step === 2 && (
            <CheckoutStep
              film={film}
              days={days}
              onBack={() => setStep(1)}
              onRestart={restart}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
