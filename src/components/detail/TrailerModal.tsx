"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { X, Play } from "lucide-react";

export function TrailerModal({
  open,
  onClose,
  trailerKey,
  title,
}: {
  open: boolean;
  onClose: () => void;
  trailerKey: string | null;
  title: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — trailer`}
          className="fixed inset-0 z-[85] flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            aria-label="Close trailer"
            onClick={onClose}
            className="absolute inset-0 bg-ink/85"
            tabIndex={-1}
          />

          <motion.div
            className="relative z-10 w-full max-w-4xl border border-ink/40 bg-paper p-3"
            initial={{ y: 28, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 18, opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-3 flex items-center justify-between px-1">
              <span className="meta uppercase tracking-[0.2em] text-ink-soft">
                Trailer · {title}
              </span>
              <button
                ref={closeRef}
                onClick={onClose}
                data-cursor
                data-cursor-label="Close"
                className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-burgundy"
              >
                Close <X size={14} strokeWidth={1.5} />
              </button>
            </div>

            <div className="relative aspect-video overflow-hidden border border-ink/30 bg-ink">
              {trailerKey ? (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&rel=0`}
                  title={`${title} trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="film-grain absolute inset-0 flex flex-col items-center justify-center gap-4 bg-burgundy/15 text-center text-paper">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-paper/50">
                    <Play size={22} strokeWidth={1.25} />
                  </span>
                  <p className="max-w-xs px-6 font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.18em]">
                    Trailer not held in the archive print. Add a TMDB key to stream
                    the real thing.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
