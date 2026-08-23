"use client";

import { motion } from "framer-motion";
import { ChevronRight, MapPin } from "lucide-react";

import { CollapsibleList } from "@/components/shared/collapsible-list";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/data/experience";
import { EASE, scaleIn, slideInLeft, slideInRight, staggerContainer, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Work-history timeline: a single gradient rail (left on mobile, centered on
 * lg) with a glass card per role. The newest role's node pulses to signal
 * that it is the current position.
 */
export function Experience() {

  return (
    <section id="experience" className="relative overflow-hidden py-12 sm:py-24 lg:py-28">
      {/* Decorative backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]"
      />
      <div aria-hidden className="glow-blob left-1/4 top-0 h-72 w-72 bg-indigo-500/10 dark:bg-indigo-500/20" />
      <div aria-hidden className="glow-blob bottom-16 right-1/4 h-72 w-72 bg-cyan-400/10" />

      <div className="container relative">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          subtitle="A timeline of roles where I have built automation frameworks, hardened CI/CD pipelines and kept releases shipping with confidence."
        />

        <div className="relative mx-auto max-w-5xl">
          {/* Timeline rail — draws in from the top on scroll into view */}
          <div
            aria-hidden
            className="absolute bottom-0 left-[5px] top-1 w-px lg:left-1/2 lg:-translate-x-1/2"
          >
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 1.1, ease: EASE }}
              className="h-full w-full origin-top bg-gradient-to-b from-indigo-500 via-violet-500 to-cyan-400/40"
            />
          </div>

          <motion.ol
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="space-y-6 sm:space-y-12"
          >
            {experiences.map((experience, index) => {
              const isLeft = index % 2 === 0;
              const isCurrent = index === 0;

              return (
                <li
                  key={`${experience.company}-${experience.role}`}
                  className="relative pl-8 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:pl-0"
                >
                  {/* Timeline node */}
                  <motion.span
                    variants={scaleIn}
                    aria-hidden
                    className="absolute left-0 top-7 z-10 lg:left-1/2 lg:-translate-x-1/2"
                  >
                    <span className="relative flex h-3 w-3">
                      {isCurrent ? (
                        <span className="bg-gradient-brand absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:hidden" />
                      ) : null}
                      <span className="bg-gradient-brand relative inline-flex h-3 w-3 rounded-full ring-4 ring-background" />
                    </span>
                  </motion.span>

                  <motion.article
                    variants={isLeft ? slideInLeft : slideInRight}
                    className={cn(
                      "group glass rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 sm:p-6",
                      isLeft ? "lg:col-start-1" : "lg:col-start-2"
                    )}
                  >
                    {/* Header: role, duration, company, location */}
                    <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-3">
                      <div>
                        <h3 className="font-display text-base font-semibold sm:text-lg">
                          {experience.role}
                        </h3>
                        <p className="mt-1 font-medium text-primary">
                          <span className="bg-gradient-brand bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                            {experience.company}
                          </span>
                        </p>
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                          {experience.location}
                        </p>
                      </div>
                      <span className="relative inline-flex shrink-0">
                        {isCurrent ? (
                          <span
                            aria-hidden
                            className="absolute inset-0 animate-pulse rounded-full bg-primary/25 blur-[6px] motion-reduce:hidden"
                          />
                        ) : null}
                        <Badge variant="glow" className="relative">
                          {experience.duration}
                        </Badge>
                      </span>
                    </div>

                    {/* Highlights — collapsed to the first 3 on mobile only */}
                    <div className="mt-4 sm:mt-5">
                      <CollapsibleList
                        items={experience.highlights}
                        mobileLimit={3}
                        className="space-y-2 sm:space-y-2.5"
                        renderItem={(highlight) => (
                          <li key={highlight} className="group/item flex gap-2">
                            <ChevronRight
                              className="mt-1 h-4 w-4 shrink-0 text-primary transition-transform duration-300 group-hover/item:translate-x-0.5"
                              aria-hidden
                            />
                            <span className="text-sm leading-snug text-muted-foreground transition-colors duration-300 group-hover/item:text-foreground sm:leading-relaxed">
                              {highlight}
                            </span>
                          </li>
                        )}
                      />
                    </div>

                    {/* Tech tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border/60 pt-3 sm:mt-5 sm:gap-2 sm:pt-4">
                      {experience.technologies.map((technology) => (
                        <Badge
                          key={technology}
                          variant="outline"
                          className="transition-colors hover:border-primary/40 hover:text-primary"
                        >
                          {technology}
                        </Badge>
                      ))}
                    </div>
                  </motion.article>
                </li>
              );
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
