"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  ExternalLink,
  Gauge,
  Github,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { projects, type Project } from "@/data/projects";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Resolves icon names stored in @/data/projects to lucide components. */
const projectIcons: Record<Project["icon"], LucideIcon> = {
  Gauge,
  GraduationCap,
};

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden py-24 sm:py-28">
      {/* Decorative backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]"
      />
      <div aria-hidden="true" className="glow-blob left-1/4 top-0 h-72 w-72 bg-indigo-500/20" />
      <div
        aria-hidden="true"
        className="glow-blob bottom-10 right-1/4 h-64 w-64 bg-cyan-500/10"
      />

      <div className="container relative">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built"
          subtitle="Full-stack products shipped with the same rigour I bring to testing them — automated, asserted and production-ready."
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid gap-8 md:grid-cols-2"
        >
          {projects.map((project) => {
            const Icon = projectIcons[project.icon];

            return (
              <motion.article
                key={project.title}
                variants={fadeUp}
                className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
              >
                {/*
                  Image placeholder banner — swap this <div> for a real
                  screenshot (e.g. <Image src="/projects/….png" … />) when
                  one is available.
                */}
                <div
                  className={cn(
                    "relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br",
                    project.gradient
                  )}
                >
                  <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-30" />
                  <Icon
                    aria-hidden="true"
                    className="h-14 w-14 text-white/90 drop-shadow transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col gap-5 p-6">
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-semibold tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                  </div>

                  <ul className="space-y-2">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <CheckCircle2
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                        />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-1">
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants({ variant: "outline", size: "sm" })}
                      >
                        <Github aria-hidden="true" className="h-4 w-4" />
                        GitHub
                      </a>
                    ) : null}
                    {project.liveDemo ? (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants({ variant: "gradient", size: "sm" })}
                      >
                        <ExternalLink aria-hidden="true" className="h-4 w-4" />
                        Live Demo
                      </a>
                    ) : null}
                    {!project.github && !project.liveDemo ? (
                      <Badge variant="secondary" className="text-muted-foreground">
                        Code available on request
                      </Badge>
                    ) : null}
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
