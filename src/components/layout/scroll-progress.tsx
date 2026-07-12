"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin brand-gradient bar pinned above the navbar that fills as the
 * visitor scrolls through the page.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="bg-gradient-brand fixed inset-x-0 top-0 z-[60] h-1 origin-left"
    />
  );
}
