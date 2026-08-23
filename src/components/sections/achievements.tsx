"use client";

import { motion } from "framer-motion";
import { Bug, Database, Layers, Target, type LucideIcon } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { achievements, type Achievement } from "@/data/achievements";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/motion";

/** Resolves icon names stored in @/data/achievements to lucide components. */
const achievementIcons: Record<Achievement["icon"], LucideIcon> = {
  Target,
  Database,
  Bug,
  Layers,
};

export function Achievements() {
  return (
    <section id="achievements" className="relative overflow-hidden py-12 sm:py-24 lg:py-28">
      {/* Decorative backdrop */}
      <div
        aria-hidden="true"
        className="glow-blob right-1/4 top-10 h-72 w-72 bg-violet-500/[0.07] dark:bg-violet-500/15"
      />

      <div className="container relative">
        <SectionHeading
          eyebrow="Highlights"
          title="Leadership & impact"
          subtitle="Ownership beyond the test suite — from strategy and data integrity to defect lifecycles and architecture-aware automation."
        />

        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid gap-3 sm:grid-cols-2 sm:gap-6"
        >
          {achievements.map((achievement) => {
            const Icon = achievementIcons[achievement.icon];

            return (
              <motion.article
                key={achievement.title}
                variants={fadeUp}
                className="group rounded-2xl border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 sm:p-6"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="shine flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 sm:h-11 sm:w-11">
                    <Icon aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="space-y-1 sm:space-y-1.5">
                    <h3 className="font-display font-semibold leading-snug tracking-tight transition-colors duration-300 group-hover:text-primary sm:leading-normal">
                      {achievement.title}
                    </h3>
                    <p className="text-sm leading-snug text-muted-foreground sm:leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
