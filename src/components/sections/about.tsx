"use client";

import { motion } from "framer-motion";
import { Briefcase, Mail, MapPin } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { about } from "@/data/about";
import { site } from "@/data/site";
import { fadeUp, scaleIn, staggerContainer, VIEWPORT } from "@/lib/motion";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-28">
      <div
        className="glow-blob left-1/4 top-0 h-72 w-72 bg-emerald-500/20"
        aria-hidden="true"
      />

      <div className="container relative">
        <SectionHeading
          eyebrow="About me"
          title="Engineering quality, end to end"
          subtitle="A quick look at who I am, how I work, and the impact behind the numbers."
        />

        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          {/* Narrative + quick facts */}
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="flex flex-col gap-6 lg:col-span-3"
          >
            {about.paragraphs.map((paragraph) => (
              <motion.p
                key={paragraph.slice(0, 32)}
                variants={fadeUp}
                className="leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </motion.p>
            ))}

            <motion.div variants={fadeUp} className="glass rounded-2xl p-6">
              <ul className="flex flex-col gap-4 text-sm">
                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-muted-foreground">{site.location}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <a
                    href={`mailto:${site.email}`}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {site.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Briefcase className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-muted-foreground">SDET @ BestQ Software</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="grid grid-cols-2 content-start gap-4 lg:col-span-2"
          >
            {about.stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="flex flex-col justify-center gap-2 rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
              >
                <span className="text-gradient font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  {stat.value}
                </span>
                <span className="text-xs leading-snug text-muted-foreground sm:text-sm">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
