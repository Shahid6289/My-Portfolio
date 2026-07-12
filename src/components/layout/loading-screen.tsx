"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { site } from "@/data/site";
import { EASE } from "@/lib/motion";

/**
 * Brief branded splash: the gradient "SP" monogram scales in with the name
 * below, then the whole overlay fades away and unmounts. Shown once per
 * browser session; skipped entirely for reduced-motion users.
 */
export function LoadingScreen() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = React.useState(true);
  const [finished, setFinished] = React.useState(false);

  React.useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem("sp-splash-seen") === "1";
      window.sessionStorage.setItem("sp-splash-seen", "1");
    } catch {
      // storage unavailable (private mode) — fall back to showing the splash
    }
    if (reduceMotion || seen) {
      // Bypass the exit animation entirely so content shows immediately.
      setVisible(false);
      setFinished(true);
      return;
    }
    const timer = window.setTimeout(() => setVisible(false), 1100);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  if (finished) return null;

  return (
    <AnimatePresence onExitComplete={() => setFinished(true)}>
      {visible ? (
        <motion.div
          aria-hidden="true"
          exit={{ opacity: 0, transition: { duration: 0.45, ease: EASE } }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-background"
        >
          <div className="relative flex flex-col items-center gap-4">
            <div className="glow-blob left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 bg-emerald-500/20" />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: [0.85, 1.08, 1] }}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-gradient font-display text-6xl font-bold tracking-tight"
            >
              SP
            </motion.span>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5, ease: EASE }}
              className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground"
            >
              {site.name}
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
