"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  Bot,
  Bug,
  Download,
  Github,
  Linkedin,
  Mail,
  Network,
  type LucideIcon,
} from "lucide-react";
import {
  siApachejmeter,
  siAppium,
  siBurpsuite,
  siK6,
  siMysql,
  siPostman,
  siSelenium,
  type SimpleIcon,
} from "simple-icons";

import { AmbientBackground } from "@/components/effects/ambient";
import { Typewriter } from "@/components/effects/typewriter";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/data/site";
import { fadeUp, scaleIn, staggerContainer, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
  external: boolean;
}

const socialLinks: SocialLink[] = [
  { label: "LinkedIn profile", href: site.socials.linkedin, icon: Linkedin, external: true },
  { label: "GitHub profile", href: site.socials.github, icon: Github, external: true },
  { label: `Email ${site.name}`, href: `mailto:${site.email}`, icon: Mail, external: false },
];

interface FloatingChip {
  label: string;
  /** Official brand mark from simple-icons, rendered in its brand color. */
  brand?: SimpleIcon;
  /** Lucide fallback for tools without a published brand mark. */
  icon?: LucideIcon;
}

/**
 * QA-tooling chips riding the dashed orbit ring, evenly spaced by angle.
 * Odd-numbered chips hide on mobile, which keeps the remaining four evenly
 * spaced. Playwright and REST Assured ship no mark in simple-icons, so they
 * fall back to lucide glyphs.
 */
const floatingChips: FloatingChip[] = [
  { label: "Playwright", icon: Bot },
  { label: "Selenium", brand: siSelenium },
  { label: "Appium", brand: siAppium },
  { label: "REST Assured", icon: Network },
  { label: "k6", brand: siK6 },
  { label: "JMeter", brand: siApachejmeter },
  { label: "Postman", brand: siPostman },
  { label: "MySQL", brand: siMysql },
  { label: "Burp Suite", brand: siBurpsuite },
];

/** Chip orbit radius as a % of the portrait container — matches the dashed ring. */
const CHIP_ORBIT_RADIUS = 58;

/**
 * Animated centrepiece for the portrait circle: a bug-hunting radar scope —
 * concentric rings and a crosshair, a sweep beam revolving over them, blips
 * pulsing as they're "detected", and a bug glyph caught dead-centre. A
 * hand-rolled, Lottie-style motion graphic with no extra runtime. Only
 * `animate`/`transition` branch on reduced motion (never the markup), so
 * SSR and client stay in sync.
 */
function BugRadar() {
  const reduce = useReducedMotion();
  return (
    <div className="relative" aria-hidden="true">
      <svg viewBox="0 0 200 200" className="h-44 w-44 sm:h-60 sm:w-60">
        <defs>
          <linearGradient id="radar-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id="radar-sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Scope rings + crosshair */}
        {[34, 58, 82].map((r, i) => (
          <circle
            key={r}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke="url(#radar-gradient)"
            strokeWidth="1.5"
            strokeDasharray={i === 2 ? "3 6" : undefined}
            opacity={0.4 - i * 0.09}
          />
        ))}
        <line x1="100" y1="14" x2="100" y2="186" stroke="url(#radar-gradient)" opacity="0.14" />
        <line x1="14" y1="100" x2="186" y2="100" stroke="url(#radar-gradient)" opacity="0.14" />

        {/*
          Sweep beam — CSS rotation (spin-slow keyframes) around the scope
          centre; transform-box view-box maps the origin to viewBox units.
          The global reduced-motion rule freezes it automatically.
        */}
        <g
          className="animate-[spin-slow_5s_linear_infinite]"
          style={{ transformBox: "view-box", transformOrigin: "100px 100px" }}
        >
          <path d="M100 100 L100 18 A82 82 0 0 1 141 29 Z" fill="url(#radar-sweep)" />
          <line x1="100" y1="100" x2="100" y2="18" stroke="url(#radar-gradient)" strokeWidth="2" opacity="0.7" />
        </g>

        {/* Detection blips lighting up around the scope */}
        {[
          { cx: 146, cy: 72, fill: "#22d3ee", delay: 0 },
          { cx: 63, cy: 138, fill: "#14b8a6", delay: 1.6 },
          { cx: 128, cy: 142, fill: "#10b981", delay: 3.1 },
        ].map(({ cx, cy, fill, delay }) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            fill={fill}
            initial={{ r: 3, opacity: 0.35 }}
            animate={reduce ? { r: 3, opacity: 0.5 } : { r: [2.5, 4.5, 2.5], opacity: [0.15, 0.9, 0.15] }}
            transition={
              reduce ? { duration: 0 } : { duration: 5, delay, repeat: Infinity, ease: "easeInOut" }
            }
          />
        ))}
      </svg>

      {/* The catch: a bug locked in the crosshair */}
      <motion.span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.4, ease: "easeOut" }}
      >
        <Bug className="h-10 w-10 sm:h-12 sm:w-12" strokeWidth={1.75} />
      </motion.span>
    </div>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-24"
    >
      {/* Backdrop layers — drifting ambient orbs under a masked dot grid */}
      <AmbientBackground />
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]"
      />

      <div className="container">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-10">
          {/* Text column */}
          {/* initial={false}: the hero is above the fold, so it must be visible
              in the prerendered HTML (LCP) instead of waiting for hydration */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial={false}
            whileInView="visible"
            viewport={VIEWPORT}
            className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left"
          >
            <motion.div
              variants={fadeUp}
              className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-sm font-medium"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to new opportunities
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              <span className="block">Hi, I&apos;m</span>
              <span className="text-gradient block">{site.name}</span>
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="min-h-[3.5rem] text-xl text-muted-foreground sm:min-h-[2rem] sm:text-2xl"
            >
              <Typewriter phrases={site.typingRoles} />
            </motion.div>

            <motion.p variants={fadeUp} className="max-w-xl text-muted-foreground">
              {site.tagline}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <a
                href={site.resumePath}
                download
                className={buttonVariants({ variant: "gradient", size: "lg" })}
              >
                <Download aria-hidden="true" />
                Download Resume
              </a>
              <a
                href="#contact"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                <Mail aria-hidden="true" />
                Contact Me
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="glass rounded-full p-3 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-primary"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual column */}
          <motion.div
            variants={scaleIn}
            initial={false}
            whileInView="visible"
            viewport={VIEWPORT}
            className="flex justify-center lg:justify-end"
          >
            <div className="group relative mr-0 h-72 w-72 sm:h-96 sm:w-96 lg:mr-12">
              {/* Dashed orbit ring — sized in % so the chips (58% radius) ride
                  exactly on it at every breakpoint; accent dots revolve with it */}
              <div
                aria-hidden="true"
                className="absolute inset-[-8%] animate-spin-slow rounded-full border border-dashed border-primary/25"
                style={{ animationDirection: "reverse", animationDuration: "30s" }}
              >
                <span className="bg-gradient-brand absolute -top-1 left-1/2 h-2 w-2 rounded-full" />
                <span className="absolute -right-1 top-1/2 h-1.5 w-1.5 rounded-full bg-cyan-400" />
              </div>
              {/* Slow-spinning conic brand ring */}
              <div
                aria-hidden="true"
                className="absolute -inset-1.5 animate-spin-slow rounded-full opacity-80 blur-[6px]"
                style={{
                  background:
                    "conic-gradient(from 90deg, #10b981, #14b8a6, #22d3ee, #10b981)",
                }}
              />
              {/*
                PLACEHOLDER portrait — replace this inner circle's content with
                a real photo via next/image, e.g.:
                <Image src="/profile.jpg" alt="Shahid Parvez" fill priority
                       className="rounded-full object-cover" />
              */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-full border border-border bg-card">
                <BugRadar />
                <span className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                  <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  SDET · QA Engineer
                </span>
              </div>

              {/*
                Orbit layer — decorative (the same skills live in #skills).
                The layer revolves all chips clockwise; a counter-rotating
                inner div keeps each chip upright. Hovering the portrait
                pauses the whole carousel.
              */}
              <div
                aria-hidden="true"
                className="animate-orbit absolute inset-0 z-10 group-hover:[animation-play-state:paused]"
              >
                {floatingChips.map(({ label, brand, icon: Icon }, index) => {
                  const angle =
                    (index / floatingChips.length) * 2 * Math.PI - Math.PI / 2;
                  const left = 50 + CHIP_ORBIT_RADIUS * Math.cos(angle);
                  const top = 50 + CHIP_ORBIT_RADIUS * Math.sin(angle);
                  return (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.35 + index * 0.12,
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                      }}
                      className={cn("absolute", index % 2 === 1 && "hidden sm:block")}
                      style={{ left: `${left}%`, top: `${top}%`, x: "-50%", y: "-50%" }}
                    >
                      <div className="animate-orbit-reverse group-hover:[animation-play-state:paused]">
                        <div
                          className="glass flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-medium shadow-lg"
                          // Soft glow tinted with the tool's own brand color
                          style={
                            brand
                              ? { boxShadow: `0 4px 18px -6px #${brand.hex}66` }
                              : undefined
                          }
                        >
                          {brand ? (
                            <svg
                              viewBox="0 0 24 24"
                              className="h-5 w-5 shrink-0"
                              fill={`#${brand.hex}`}
                              aria-hidden="true"
                            >
                              <path d={brand.path} />
                            </svg>
                          ) : Icon ? (
                            <Icon
                              className="h-5 w-5 shrink-0 text-primary"
                              aria-hidden="true"
                            />
                          ) : null}
                          {label}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-muted-foreground transition-colors hover:text-primary sm:block"
      >
        <span className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-current p-1.5 opacity-60">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-current"
            animate={prefersReducedMotion ? undefined : { y: [0, 12, 0], opacity: [1, 0.35, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </a>
    </section>
  );
}
