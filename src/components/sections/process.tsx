"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Bug,
  ClipboardList,
  FileSearch,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { processSteps, type ProcessStep } from "@/data/process";
import { EASE, fadeUp, staggerContainer, VIEWPORT } from "@/lib/motion";

/** Resolves the icon names declared in the process data to lucide components. */
const iconMap: Record<ProcessStep["icon"], LucideIcon> = {
  FileSearch,
  ClipboardList,
  Bot,
  Workflow,
  Bug,
};

/**
 * "How I deliver quality" — the five-step delivery pipeline, rendered as a
 * horizontal stepper on desktop (with a rail that draws itself in) and a
 * stacked grid on smaller screens.
 */
export function Process() {
  return (
    <section id="process" className="relative overflow-hidden py-12 sm:py-24 lg:py-28">
      <div
        className="glow-blob left-[15%] top-16 h-72 w-72 bg-indigo-500/10 dark:bg-indigo-500/20"
        aria-hidden="true"
      />

      <div className="container relative">
        <SectionHeading
          eyebrow="Process"
          title="How I deliver quality"
          subtitle="Quality isn't a phase at the end — it's a pipeline that starts with the requirements and gates every release."
        />

        <div className="relative">
          {/* Connecting rail (desktop): draws in across the five steps */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 1.2, ease: EASE }}
            className="bg-gradient-brand absolute left-[10%] right-[10%] top-7 hidden h-px origin-left opacity-40 lg:block"
            aria-hidden="true"
          />

          <motion.ol
            variants={staggerContainer(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="grid gap-5 sm:grid-cols-2 sm:gap-10 lg:grid-cols-5 lg:gap-6"
          >
            {processSteps.map((step, index) => {
              const Icon = iconMap[step.icon];
              return (
                <motion.li
                  key={step.title}
                  variants={fadeUp}
                  className="group relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-card shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_-6px_hsl(var(--primary)/0.5)] sm:h-14 sm:w-14">
                    <Icon className="h-5 w-5 text-primary sm:h-6 sm:w-6" aria-hidden="true" />
                  </div>
                  <span className="mt-1.5 font-display text-[11px] font-bold leading-4 tracking-widest text-primary/60 sm:mt-2 sm:text-xs">
                    0{index + 1}
                  </span>
                  <h3 className="mt-1 font-display text-sm font-semibold sm:mt-1.5">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 max-w-none text-xs leading-snug text-muted-foreground sm:mt-2 sm:max-w-[16rem] sm:leading-relaxed">
                    {step.description}
                  </p>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
