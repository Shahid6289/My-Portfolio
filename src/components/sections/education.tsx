"use client";

import { motion } from "framer-motion";
import { ChevronRight, GraduationCap, MapPin } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { education } from "@/data/education";
import { EASE, fadeUp, scaleIn, staggerContainer, VIEWPORT } from "@/lib/motion";

/**
 * Academic background rendered with the same timeline visual language as the
 * Experience section, in a shorter left-railed layout.
 */
export function Education() {
  return (
    <section id="education" className="relative overflow-hidden py-24 sm:py-28">
      {/* Decorative backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]"
      />
      <div aria-hidden className="glow-blob right-1/4 top-10 h-72 w-72 bg-violet-500/15" />

      <div className="container relative">
        <SectionHeading
          eyebrow="Education"
          title="Academic background"
          subtitle="The engineering foundation behind the automation and full-stack work."
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Timeline rail — draws in from the top on scroll into view */}
          <div aria-hidden className="absolute bottom-0 left-[5px] top-1 w-px">
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
            className="space-y-12"
          >
            {education.map((entry) => (
              <li key={entry.degree} className="relative pl-8">
                {/* Timeline node */}
                <motion.span variants={scaleIn} aria-hidden className="absolute left-0 top-8 z-10">
                  <span className="bg-gradient-brand relative flex h-3 w-3 rounded-full ring-4 ring-background" />
                </motion.span>

                <motion.article
                  variants={fadeUp}
                  className="group glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-start gap-4">
                      {/* Icon chip */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/15 via-violet-500/15 to-cyan-400/15 text-primary transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110">
                        <GraduationCap className="h-5 w-5" aria-hidden />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-semibold">{entry.degree}</h3>
                        <p className="mt-1 font-medium text-primary">{entry.college}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{entry.university}</p>
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                          {entry.location}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="glow"
                      className="shrink-0 transition-colors hover:border-primary/40"
                    >
                      {entry.duration}
                    </Badge>
                  </div>

                  {entry.gpa ? (
                    <p className="mt-4 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">CGPA:</span> {entry.gpa}
                    </p>
                  ) : null}

                  {entry.highlights?.length ? (
                    <ul className="mt-4 space-y-2.5">
                      {entry.highlights.map((highlight) => (
                        <li key={highlight} className="group/item flex gap-2">
                          <ChevronRight
                            className="mt-1 h-4 w-4 shrink-0 text-primary transition-transform duration-300 group-hover/item:translate-x-0.5"
                            aria-hidden
                          />
                          <span className="text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover/item:text-foreground">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </motion.article>
              </li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
