"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  ExternalLink,
  Gauge,
  Github,
  Bug,
  type LucideIcon,
} from "lucide-react";

import { CollapsibleList } from "@/components/shared/collapsible-list";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { projects, type Project } from "@/data/projects";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Resolves icon names stored in @/data/projects to lucide components. */
const projectIcons: Record<Project["icon"], LucideIcon> = {
  Gauge,
  Bug,
};

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden py-12 sm:py-24 lg:py-28">
      {/* Decorative backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]"
      />
      <div aria-hidden="true" className="glow-blob left-1/4 top-0 h-72 w-72 bg-indigo-500/10 dark:bg-indigo-500/20" />
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
          className="grid gap-5 sm:gap-8 md:grid-cols-2"
        >
          {projects.map((project) => {
            const Icon = projectIcons[project.icon];

            return (
              <motion.article
                key={project.title}
                variants={fadeUp}
                className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
              >
                {/* Gradient keyline across the top, revealed on hover */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-brand opacity-0 transition-opacity duration-300 group-hover:opacity-60"
                />

                {/*
                  Image placeholder banner — swap this <div> for a real
                  screenshot (e.g. <Image src="/projects/….png" … />) when
                  one is available.
                */}
                <div
                  className={cn(
                    "shine relative flex h-32 items-center justify-center overflow-hidden bg-gradient-to-br sm:h-44",
                    project.gradient
                  )}
                >
                  <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-30" />
                  <Icon
                    aria-hidden="true"
                    className="h-11 w-11 text-white/90 drop-shadow transition-[transform,filter] duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_14px_rgba(255,255,255,0.35)] sm:h-14 sm:w-14"
                  />
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col gap-4 p-4 sm:gap-5 sm:p-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                      {project.title}
                    </h3>
                    <p className="text-sm leading-snug text-muted-foreground sm:leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Features — collapsed to the first 3 on mobile only */}
                  <CollapsibleList
                    items={project.features}
                    mobileLimit={3}
                    className="space-y-1.5 sm:space-y-2"
                    renderItem={(feature) => (
                      <li key={feature} className="group/item flex items-start gap-2 text-sm">
                        <CheckCircle2
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 shrink-0 text-primary transition-transform duration-300 group-hover/item:translate-x-0.5"
                        />
                        <span className="text-muted-foreground transition-colors duration-300 group-hover/item:text-foreground">
                          {feature}
                        </span>
                      </li>
                    )}
                  />

                  <motion.div
                    variants={staggerContainer(0.03)}
                    className="flex flex-wrap gap-1.5 sm:gap-2"
                  >
                    {project.techStack.map((tech) => (
                      <motion.span key={tech} variants={fadeUp} className="inline-flex">
                        <Badge
                          variant="secondary"
                          className="transition-colors hover:border-primary/40 hover:text-primary"
                        >
                          {tech}
                        </Badge>
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Footer */}
                  <div className="mt-auto flex flex-wrap items-center gap-2 sm:gap-3 sm:pt-1">
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
