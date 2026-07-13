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

import { ParticlesBackground } from "@/components/effects/particles";
import { Typewriter } from "@/components/effects/typewriter";
import { CountUp } from "@/components/shared/count-up";
import { buttonVariants } from "@/components/ui/button";
import { about } from "@/data/about";
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
      <svg viewBox="0 0 200 200" className="h-52 w-52 sm:h-72 sm:w-72">
        <defs>
          <linearGradient id="radar-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          {/* Soft depth shading inside the scope */}
          <radialGradient id="radar-bg" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.14" />
            <stop offset="65%" stopColor="#6366f1" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="100" cy="100" r="95" fill="url(#radar-bg)" />

        {/* Scope rings + crosshair */}
        {[40, 66, 90].map((r, i) => (
          <circle
            key={r}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke="url(#radar-gradient)"
            strokeWidth="1.5"
            strokeDasharray={i === 2 ? "3 6" : undefined}
            opacity={0.42 - i * 0.1}
          />
        ))}
        <line x1="100" y1="10" x2="100" y2="190" stroke="url(#radar-gradient)" opacity="0.12" />
        <line x1="10" y1="100" x2="190" y2="100" stroke="url(#radar-gradient)" opacity="0.12" />

        {/* Instrument tick marks every 30° around the outer ring */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = ((i * 30 - 90) * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={100 + 86 * Math.cos(angle)}
              y1={100 + 86 * Math.sin(angle)}
              x2={100 + 93 * Math.cos(angle)}
              y2={100 + 93 * Math.sin(angle)}
              stroke="url(#radar-gradient)"
              strokeWidth="1.5"
              opacity="0.35"
            />
          );
        })}

        {/*
          Sweep beam — CSS rotation (spin-slow keyframes) around the scope
          centre; transform-box view-box maps the origin to viewBox units.
          Three trailing sectors fade the beam out like a real radar
          afterglow, and a glowing dot rides the beam tip. The global
          reduced-motion rule freezes the rotation automatically.
        */}
        <g
          className="animate-[spin-slow_6s_linear_infinite]"
          style={{ transformBox: "view-box", transformOrigin: "100px 100px" }}
        >
          <path
            d="M100 100 L69.22 15.42 A90 90 0 0 1 100 10 Z"
            fill="url(#radar-gradient)"
            opacity="0.28"
          />
          <path
            d="M100 100 L42.15 31.06 A90 90 0 0 1 69.22 15.42 Z"
            fill="url(#radar-gradient)"
            opacity="0.13"
          />
          <path
            d="M100 100 L22.06 55 A90 90 0 0 1 42.15 31.06 Z"
            fill="url(#radar-gradient)"
            opacity="0.05"
          />
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="10"
            stroke="url(#radar-gradient)"
            strokeWidth="2"
            opacity="0.8"
          />
          <circle cx="100" cy="10" r="6.5" fill="#22d3ee" opacity="0.25" />
          <circle cx="100" cy="10" r="3" fill="#22d3ee" opacity="0.9" />
        </g>

        {/* Detection blips lighting up around the scope */}
        {[
          { cx: 160, cy: 74, fill: "#22d3ee", delay: 0 },
          { cx: 56, cy: 140, fill: "#8b5cf6", delay: 1.6 },
          { cx: 132, cy: 152, fill: "#6366f1", delay: 3.1 },
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
        <Bug className="h-11 w-11 sm:h-14 sm:w-14" strokeWidth={1.75} />
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
      {/* Backdrop layers */}
      <ParticlesBackground />
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="glow-blob left-[12%] top-8 -z-10 h-72 w-72 animate-float bg-indigo-500/20"
      />
      <div
        aria-hidden="true"
        className="glow-blob bottom-16 right-[10%] -z-10 h-72 w-72 animate-float bg-cyan-500/20"
        style={{ animationDelay: "2.5s" }}
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
              className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300 hover:border-primary/30"
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

            {/* Terminal-style role line — the gradient chevron stays put, so
                the line never looks empty between typing cycles */}
            <motion.div
              variants={fadeUp}
              className="flex min-h-[3.5rem] items-baseline justify-center gap-2.5 font-display text-xl font-semibold sm:min-h-[2.25rem] sm:text-2xl lg:justify-start"
            >
              <span aria-hidden="true" className="text-gradient select-none">
                ▸
              </span>
              <Typewriter phrases={site.typingRoles} className="text-foreground/90" />
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
                className={cn(buttonVariants({ variant: "gradient", size: "lg" }), "shine")}
              >
                <Download aria-hidden="true" />
                Download Resume
              </a>
              <a
                href="#contact"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "shine")}
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
                  className="glass rounded-full p-3 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-[0_0_16px_-4px_hsl(var(--primary)/0.5)]"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </motion.div>

            {/* Impact strip — the three headline numbers, counted up on view */}
            <motion.div
              variants={fadeUp}
              className="mt-2 grid w-full max-w-xl grid-cols-3 gap-4 border-t border-border/40 pt-6 sm:gap-6"
            >
              {about.stats.slice(0, 3).map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-gradient font-display text-2xl font-bold sm:text-3xl">
                    <CountUp value={stat.value} />
                  </div>
                  <div className="mt-1 text-xs leading-snug text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
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
                    "conic-gradient(from 90deg, #6366f1, #8b5cf6, #22d3ee, #6366f1)",
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
