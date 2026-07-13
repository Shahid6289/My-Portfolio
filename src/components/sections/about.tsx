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

          {/*
            Terminal card — a green pipeline, the SDET's favourite sight.
            Illustrative output; the totals mirror the resume's 200+ automated
            cases. (The headline stats moved to the hero's impact strip.)
          */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="content-start lg:col-span-2"
          >
            <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
              {/* Title bar */}
              <div className="flex items-center gap-2 border-b border-border/60 bg-muted/40 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" aria-hidden="true" />
                <span className="ml-2 text-xs font-medium text-muted-foreground">
                  quality-pipeline — zsh
                </span>
              </div>

              {/* Test run, revealed line by line */}
              <motion.div
                variants={staggerContainer(0.14, 0.2)}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                className="space-y-1.5 p-5 font-mono text-[13px] leading-relaxed"
              >
                <motion.p variants={fadeUp}>
                  <span className="text-primary">$</span> npx playwright test
                </motion.p>
                <motion.p variants={fadeUp} className="text-muted-foreground">
                  Running 200 tests using 4 workers…
                </motion.p>
                <motion.p variants={fadeUp}>
                  <span className="text-emerald-500">✓</span> auth.spec.ts{" "}
                  <span className="text-muted-foreground">(24 passed)</span>
                </motion.p>
                <motion.p variants={fadeUp}>
                  <span className="text-emerald-500">✓</span> payments.spec.ts{" "}
                  <span className="text-muted-foreground">(31 passed)</span>
                </motion.p>
                <motion.p variants={fadeUp}>
                  <span className="text-emerald-500">✓</span> api-contracts.spec.ts{" "}
                  <span className="text-muted-foreground">(58 passed)</span>
                </motion.p>
                <motion.p variants={fadeUp}>
                  <span className="text-emerald-500">✓</span> db-assertions.spec.ts{" "}
                  <span className="text-muted-foreground">(87 passed)</span>
                </motion.p>
                <motion.p variants={fadeUp} className="pt-1 font-semibold text-emerald-500">
                  200 passed <span className="font-normal text-muted-foreground">(3m 42s)</span>
                </motion.p>
                <motion.p variants={fadeUp} className="pt-2">
                  <span className="text-primary">$</span> All quality gates green — ship it
                  <span
                    className="ml-1 inline-block h-3.5 w-[7px] animate-blink bg-primary align-middle"
                    aria-hidden="true"
                  />
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
