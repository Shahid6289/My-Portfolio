"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  /** Stat like "200+", "40%", "0" — the digits animate, the suffix stays. */
  value: string;
  className?: string;
  /** Animation length in seconds. */
  duration?: number;
}

/**
 * Animates the numeric part of a stat from 0 to its target the first time
 * it scrolls into view. Falls back to the static value for non-numeric
 * inputs and for reduced-motion users.
 */
export function CountUp({ value, className, duration = 1.4 }: CountUpProps) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (!inView || target === null) return;
    if (reduce) {
      setDisplay(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setDisplay(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, reduce, duration]);

  if (target === null) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
