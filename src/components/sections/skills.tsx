"use client";

import { motion } from "framer-motion";
import {
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
import { skillCategories, type SkillCategory } from "@/data/skills";
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
                <Card className="h-full hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
                  <CardHeader className="flex-row items-center gap-3 space-y-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/15 to-cyan-500/15 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <CardTitle>{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
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
