"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

/**
 * Typographic PAPER ⇄ MIDNIGHT switch. Toggling fires a brief "film exposure"
 * flash across the screen as the palette swaps.
 */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const [flashing, setFlashing] = useState(false);
  const isDark = theme === "dark";

  const handle = () => {
    setFlashing(true);
    toggle();
    window.setTimeout(() => setFlashing(false), 620);
  };

  return (
    <>
      <button
        type="button"
        onClick={handle}
        data-cursor
        aria-pressed={isDark}
        aria-label={`Switch to ${isDark ? "paper" : "midnight"} theme`}
        className="group flex items-center gap-2.5 select-none"
      >
        <span
          className={`meta uppercase tracking-[0.2em] transition-opacity ${
            isDark ? "opacity-35" : "opacity-100"
          }`}
        >
          Paper
        </span>
        <span className="relative h-4 w-9 border border-ink/40">
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 520, damping: 32 }}
            className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 bg-burgundy"
            style={{ left: isDark ? "calc(100% - 0.875rem)" : "0.125rem" }}
          />
        </span>
        <span
          className={`meta uppercase tracking-[0.2em] transition-opacity ${
            isDark ? "opacity-100" : "opacity-35"
          }`}
        >
          Midnight
        </span>
      </button>

      <AnimatePresence>
        {flashing && (
          <motion.div
            key="exposure"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.85, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.62, ease: "easeInOut", times: [0, 0.35, 1] }}
            className="film-grain pointer-events-none fixed inset-0 z-[80] bg-burgundy/30"
          />
        )}
      </AnimatePresence>
    </>
  );
}
