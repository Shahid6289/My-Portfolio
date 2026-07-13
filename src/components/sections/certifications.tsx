"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { certifications } from "@/data/certifications";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/motion";

export function Certifications() {
  // Certification entries live in @/data/certifications — while that list
  // is empty this section hides itself automatically. Add credentials there
  // and this grid renders with no component changes needed.
  if (certifications.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="relative overflow-hidden py-24 sm:py-28">
      {/* Decorative backdrop */}
      <div
        aria-hidden="true"
        className="glow-blob left-1/3 top-16 h-64 w-64 bg-cyan-500/15"
      />

      <div className="container relative">
        <SectionHeading
          eyebrow="Certifications"
          title="Credentials"
          subtitle="Formal certifications that back up the hands-on experience."
        />

        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {certifications.map((certification) => (
            <motion.article
              key={certification.name}
              variants={fadeUp}
              className="group relative rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-md">
                  <Award aria-hidden="true" className="h-5 w-5" />
                </div>
                <div className="min-w-0 space-y-1">
                  <h3 className="font-semibold leading-snug">{certification.name}</h3>
                  <p className="text-sm text-primary">{certification.organization}</p>
                  <p className="text-xs text-muted-foreground">{certification.date}</p>
                </div>
                {certification.url ? (
                  <a
                    href={certification.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Verify certification: ${certification.name}`}
                    className="ml-auto rounded-md p-1 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <ExternalLink aria-hidden="true" className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
