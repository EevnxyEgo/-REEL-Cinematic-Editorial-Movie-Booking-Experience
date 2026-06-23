"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/** Reactively tracks a media query without syncing state inside an effect. */
function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * A hairline ring that trails the pointer and swells into a labelled disc over
 * `[data-cursor]` targets (posters, controls). Suppressed on touch / reduced
 * motion. Purely decorative — the native cursor is never hidden.
 */
export function CustomCursor() {
  const reduce = useReducedMotion();
  const fine = useMediaQuery("(pointer: fine)");
  const enabled = fine && !reduce;

  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 700, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 700, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      if (target) {
        setActive(true);
        setLabel(target.dataset.cursorLabel ?? "");
      } else {
        setActive(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="no-print pointer-events-none fixed left-0 top-0 z-[90] flex items-center justify-center"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full border border-burgundy text-burgundy"
        animate={{
          width: active ? 76 : 16,
          height: active ? 76 : 16,
          backgroundColor: active ? "var(--burgundy)" : "rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        style={{ marginLeft: active ? -38 : -8, marginTop: active ? -38 : -8 }}
      >
        {active && label && (
          <span className="text-[0.5rem] font-mono uppercase tracking-[0.2em] text-paper">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
