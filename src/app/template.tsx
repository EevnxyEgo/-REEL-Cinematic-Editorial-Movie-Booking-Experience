"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Per-route entrance. A charcoal "cut" covers the frame on navigation, then
 * rises to reveal the new screen — a film splice rather than a slide-fade.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
      >
        {children}
      </motion.div>

      <motion.div
        aria-hidden
        className="film-grain pointer-events-none fixed inset-0 z-[70] origin-bottom bg-ink"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.62, ease: [0.76, 0, 0.24, 1] }}
      />
    </>
  );
}
