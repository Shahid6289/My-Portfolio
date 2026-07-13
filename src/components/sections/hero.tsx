"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  Bot,
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
 * Quality-core geometry, precomputed as literals: computing Math.sin/cos at
 * render time causes SSR hydration mismatches — Node's and the browser's
 * trig differ in the last float digit.
 *
 * Inner trio: r=45, three 80° arcs with 40° gaps.
 * Middle pair: r=62, two 150° arcs with 30° gaps.
 * Bezel ticks: r=80, four 16° blocks at the cardinal points.
 */
const ARC_SET_INNER = [
  "M100 55 A45 45 0 0 1 144.32 92.19",
  "M138.97 122.5 A45 45 0 0 1 84.61 142.28",
  "M61.03 122.5 A45 45 0 0 1 71.08 65.53",
] as const;

const ARC_SET_MIDDLE = [
  "M100 38 A62 62 0 0 1 131 153.69",
  "M100 162 A62 62 0 0 1 69 46.31",
] as const;

const TICK_BLOCKS = [
  "M88.87 20.78 A80 80 0 0 1 111.13 20.78",
  "M179.22 88.87 A80 80 0 0 1 179.22 111.13",
  "M111.13 179.22 A80 80 0 0 1 88.87 179.22",
  "M20.78 111.13 A80 80 0 0 1 20.78 88.87",
] as const;

/**
 * Animated centrepiece for the portrait circle: a sci-fi "quality core" —
 * concentric arc segments spinning at different speeds and directions
 * around a pulsing energy core, energy ripples radiating outward, orbiting
 * satellite dots, and a checkmark drawn into the middle ("all gates
 * green"). Hand-rolled SVG with literal path coordinates (render-time trig
 * causes SSR hydration mismatches). Rotations freeze under reduced motion
 * via the global CSS rule; ripples and the check draw-in branch on
 * useReducedMotion.
 */
function QualityCore() {
  const reduce = useReducedMotion();
  return (
    <div className="relative" aria-hidden="true">
      <svg viewBox="0 0 200 200" className="h-52 w-52 sm:h-72 sm:w-72">
        <defs>
          <linearGradient id="core-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <radialGradient id="core-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#6366f1" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient depth + inner reference ring */}
        <circle cx="100" cy="100" r="95" fill="url(#core-glow)" opacity="0.35" />
        <circle
          cx="100"
          cy="100"
          r="30"
          fill="none"
          stroke="url(#core-gradient)"
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Energy ripples pulsing out of the core */}
        {[0, 1.3].map((delay) => (
          <motion.circle
            key={delay}
            cx="100"
            cy="100"
            fill="none"
            stroke="url(#core-gradient)"
            strokeWidth="1.5"
            initial={{ r: 18, opacity: 0.4 }}
            animate={reduce ? { r: 24, opacity: 0.15 } : { r: [18, 40], opacity: [0.35, 0] }}
            transition={
              reduce ? { duration: 0 } : { duration: 2.6, delay, repeat: Infinity, ease: "easeOut" }
            }
          />
        ))}

        {/* Inner arc trio — fast clockwise, with a cyan satellite riding along */}
        <g
          className="animate-[spin-slow_8s_linear_infinite]"
          style={{ transformBox: "view-box", transformOrigin: "100px 100px" }}
        >
          {ARC_SET_INNER.map((d) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke="url(#core-gradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.75"
            />
          ))}
          <circle cx="100" cy="55" r="2.5" fill="#22d3ee" />
        </g>

        {/* Middle arc pair — slower, counter-rotating, violet satellite */}
        <g
          className="animate-[spin-slow_14s_linear_infinite]"
          style={{
            transformBox: "view-box",
            transformOrigin: "100px 100px",
            animationDirection: "reverse",
          }}
        >
          {ARC_SET_MIDDLE.map((d) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke="url(#core-gradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.45"
            />
          ))}
          <circle cx="100" cy="162" r="2" fill="#8b5cf6" />
        </g>

        {/* Outer bezel: faint dashed ring + four tick blocks drifting slowly */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="url(#core-gradient)"
          strokeWidth="1"
          strokeDasharray="2 7"
          opacity="0.3"
        />
        <g
          className="animate-[spin-slow_30s_linear_infinite]"
          style={{ transformBox: "view-box", transformOrigin: "100px 100px" }}
        >
          {TICK_BLOCKS.map((d) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke="url(#core-gradient)"
              strokeWidth="3.5"
              opacity="0.6"
            />
          ))}
        </g>

        {/* The core: glow + the verified check drawing itself in */}
        <circle cx="100" cy="100" r="22" fill="url(#core-glow)" />
        <motion.path
          d="M89 100 L97 108 L112 91"
          fill="none"
          stroke="url(#core-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.5, ease: "easeInOut" }}
        />
      </svg>
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
                <QualityCore />
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
                  // Rounded to 2dp: raw trig floats differ between Node and
                  // the browser and would mismatch in the style attribute.
                  const left = +(50 + CHIP_ORBIT_RADIUS * Math.cos(angle)).toFixed(2);
                  const top = +(50 + CHIP_ORBIT_RADIUS * Math.sin(angle)).toFixed(2);
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
