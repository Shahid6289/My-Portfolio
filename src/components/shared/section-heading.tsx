"use client";

import { motion } from "framer-motion";

import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small uppercase chip above the title, e.g. "What I do". */
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

/**
 * Standard heading used by every section: eyebrow chip, gradient-accented
 * title and optional subtitle, revealed with a staggered fade-up.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={cn(
        "mb-14 flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <motion.span
        variants={fadeUp}
        className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary"
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p variants={fadeUp} className="max-w-2xl text-balance text-muted-foreground">
          {subtitle}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
