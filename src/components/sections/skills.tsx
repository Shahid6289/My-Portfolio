"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  Gauge,
  Server,
  Network,
  TestTubes,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { skillCategories, testingTypes, type SkillCategory } from "@/data/skills";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/motion";

/** Resolves the icon names declared in the skills data to lucide components. */
const iconMap: Record<SkillCategory["icon"], LucideIcon> = {
  Code2,
  Gauge,
  Server,
  Network,
  TestTubes,
  Database,
  Cloud,
  Workflow,
  Wrench,
};

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-24 sm:py-28">
      <div
        className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]"
        aria-hidden="true"
      />
      <div
        className="glow-blob right-1/4 top-1/3 h-72 w-72 bg-cyan-500/10"
        aria-hidden="true"
      />

      <div className="container relative">
        <SectionHeading
          eyebrow="Skills"
          title="My technical toolbox"
          subtitle="An automation-first engineering stack — the languages, frameworks and platforms I use to test deeply and build reliably."
        />

        {/* Testing-types coverage strip — the exact words hirers scan for */}
        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mb-12 flex flex-wrap items-center justify-center gap-2.5"
        >
          {testingTypes.map((type) => (
            <motion.span key={type} variants={fadeUp}>
              <span className="glass inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                {type}
              </span>
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.map((category) => {
            const Icon = iconMap[category.icon];
            return (
              <motion.div key={category.title} variants={fadeUp}>
                <Card className="group relative h-full overflow-hidden hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
                  <div
                    className="bg-gradient-brand absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-60"
                    aria-hidden="true"
                  />
                  <CardHeader className="flex-row items-center gap-3 space-y-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/15 to-cyan-500/15 text-primary transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_18px_-4px_hsl(var(--primary)/0.45)]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <CardTitle>{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      variants={staggerContainer(0.03)}
                      initial="hidden"
                      whileInView="visible"
                      viewport={VIEWPORT}
                      className="flex flex-wrap gap-2"
                    >
                      {category.skills.map((skill) => (
                        <motion.span key={skill} variants={fadeUp}>
                          <Badge
                            variant="secondary"
                            className="transition-colors hover:border-primary/40 hover:text-primary"
                          >
                            {skill}
                          </Badge>
                        </motion.span>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
