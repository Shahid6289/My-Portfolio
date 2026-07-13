"use client";

import { motion } from "framer-motion";
import { Briefcase, Mail, MapPin } from "lucide-react";

import { CountUp } from "@/components/shared/count-up";
import { SectionHeading } from "@/components/shared/section-heading";
import { about } from "@/data/about";
import { site } from "@/data/site";
import { fadeUp, scaleIn, staggerContainer, VIEWPORT } from "@/lib/motion";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-28">
      <div
        className="glow-blob left-1/4 top-0 h-72 w-72 bg-indigo-500/20"
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
                <li className="group/item flex items-center gap-3">
                  <MapPin
                    className="h-4 w-4 shrink-0 text-primary transition-transform duration-300 group-hover/item:translate-x-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-muted-foreground transition-colors group-hover/item:text-foreground">
                    {site.location}
                  </span>
                </li>
                <li className="group/item flex items-center gap-3">
                  <Mail
                    className="h-4 w-4 shrink-0 text-primary transition-transform duration-300 group-hover/item:translate-x-0.5"
                    aria-hidden="true"
                  />
                  <a
                    href={`mailto:${site.email}`}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {site.email}
                  </a>
                </li>
                <li className="group/item flex items-center gap-3">
                  <Briefcase
                    className="h-4 w-4 shrink-0 text-primary transition-transform duration-300 group-hover/item:translate-x-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-muted-foreground transition-colors group-hover/item:text-foreground">
                    SDET @ BestQ Software
                  </span>
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
                className="group relative flex flex-col justify-center gap-2 overflow-hidden rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
              >
                <div
                  className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <span className="text-gradient font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  <CountUp value={stat.value} />
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
