"use client";

import * as React from "react";
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
      <svg viewBox="0 0 200 200" className="h-40 w-40 sm:h-72 sm:w-72">
        <defs>
          {/* Stops darken in light mode ([stop-color:…] overrides the attr)
              so the HUD keeps contrast on the white card */}
          <linearGradient id="core-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop
              offset="0%"
              stopColor="#6366f1"
              className="[stop-color:#4f46e5] dark:[stop-color:#6366f1]"
            />
            <stop
              offset="50%"
              stopColor="#8b5cf6"
              className="[stop-color:#7c3aed] dark:[stop-color:#8b5cf6]"
            />
            <stop
              offset="100%"
              stopColor="#22d3ee"
              className="[stop-color:#0891b2] dark:[stop-color:#22d3ee]"
            />
          </linearGradient>
          <radialGradient id="core-glow" cx="0.5" cy="0.5" r="0.5">
            <stop
              offset="0%"
              stopColor="#8b5cf6"
              className="[stop-opacity:0.35] dark:[stop-opacity:0.55]"
            />
            <stop
              offset="60%"
              stopColor="#6366f1"
              className="[stop-opacity:0.10] dark:[stop-opacity:0.18]"
            />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient depth — stronger in dark mode where the card is near-black */}
        <circle cx="100" cy="100" r="95" fill="url(#core-glow)" className="opacity-40 dark:opacity-70" />

        {/* Energy ripples pulsing out from behind the medallion */}
        {[0, 1.3].map((delay) => (
          <motion.circle
            key={delay}
            cx="100"
            cy="100"
            fill="none"
            stroke="url(#core-gradient)"
            strokeWidth="1.5"
            initial={{ r: 28, opacity: 0.4 }}
            animate={reduce ? { r: 32, opacity: 0.15 } : { r: [28, 48], opacity: [0.4, 0] }}
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
              className="opacity-75 dark:opacity-100"
            />
          ))}
          <circle cx="100" cy="55" r="2.5" className="fill-cyan-600 dark:fill-cyan-400" />
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
              className="opacity-45 dark:opacity-75"
            />
          ))}
          <circle cx="100" cy="162" r="2" className="fill-violet-600 dark:fill-violet-500" />
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
          className="opacity-30 dark:opacity-55"
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
              className="opacity-60 dark:opacity-85"
            />
          ))}
        </g>

        {/* Quality gauge: a 270° dial that fills while the score counts to 100.
            Track + fill share one literal arc path (r=34, opening at the bottom). */}
        <circle cx="100" cy="100" r="38" fill="url(#core-glow)" />
        <path
          d="M75.96 124.04 A34 34 0 1 1 124.04 124.04"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          className="stroke-zinc-300/70 dark:stroke-white/10"
        />
        <motion.path
          d="M75.96 124.04 A34 34 0 1 1 124.04 124.04"
          fill="none"
          stroke="url(#core-gradient)"
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduce ? 0 : 1.8, delay: reduce ? 0 : 0.3, ease: "easeInOut" }}
        />
      </svg>

      {/* Score readout overlaid on the gauge */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <GaugeReadout />
      </div>
    </div>
  );
}

/** Radial spark offsets (px) for the completion burst — literals, 8 directions. */
const SPARKS = [
  { x: 0, y: -64, color: "bg-cyan-400" },
  { x: 45, y: -45, color: "bg-violet-400" },
  { x: 64, y: 0, color: "bg-indigo-400" },
  { x: 45, y: 45, color: "bg-cyan-400" },
  { x: 0, y: 64, color: "bg-violet-400" },
  { x: -45, y: 45, color: "bg-indigo-400" },
  { x: -64, y: 0, color: "bg-cyan-400" },
  { x: -45, y: -45, color: "bg-violet-400" },
] as const;

/**
 * Counts the quality score from 0 to 100 in sync with the gauge fill. On
 * completion the number pops, a shockwave ring and radial sparks burst
 * outward, and a pulsing emerald status LED settles into the dial's bottom
 * opening. Reduced motion jumps straight to the final state, burst-free.
 */
function GaugeReadout() {
  const reduce = useReducedMotion();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (reduce) {
      setValue(100);
      return;
    }
    // Mirrors the gauge fill: 300ms delay, 1.8s ease-out sweep.
    const DELAY_MS = 300;
    const DURATION_MS = 1800;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(Math.max(now - start - DELAY_MS, 0) / DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const done = value === 100;
  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Completion burst: shockwave ring + radial sparks (renders client-side
          only once the count finishes, so SSR markup stays stable) */}
      {done && !reduce ? (
        <>
          <motion.span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[4.5rem] w-[4.5rem] rounded-full border-2 border-cyan-400/70 sm:h-24 sm:w-24"
            initial={{ x: "-50%", y: "-50%", scale: 0.7, opacity: 0.8 }}
            animate={{ x: "-50%", y: "-50%", scale: 2, opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
          {SPARKS.map(({ x, y, color }, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className={cn("absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full", color)}
              initial={{ x: "-50%", y: "-50%", opacity: 1, scale: 1 }}
              animate={{
                x: `calc(-50% + ${x}px)`,
                y: `calc(-50% + ${y}px)`,
                opacity: 0,
                scale: 0.3,
              }}
              transition={{ duration: 0.8, delay: i * 0.02, ease: "easeOut" }}
            />
          ))}
        </>
      ) : null}

      <motion.span
        className="text-gradient font-display text-xl font-bold tracking-tight sm:text-3xl"
        animate={done && !reduce ? { scale: [1, 1.18, 1] } : undefined}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {value}%
      </motion.span>

      {/* Status LED resting in the dial's bottom opening */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute -bottom-4 left-1/2 flex h-2 w-2 -translate-x-1/2 transition-opacity duration-500 sm:-bottom-8",
          done ? "opacity-100" : "opacity-0"
        )}
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
    </div>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-[85svh] items-center overflow-hidden pb-14 pt-20 sm:min-h-screen sm:pb-16 sm:pt-24"
    >
      {/* Backdrop layers */}
      <ParticlesBackground />
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="glow-blob left-[12%] top-8 -z-10 h-72 w-72 animate-float bg-indigo-500/10 dark:bg-indigo-500/20"
      />
      <div
        aria-hidden="true"
        className="glow-blob bottom-16 right-[10%] -z-10 h-72 w-72 animate-float bg-cyan-500/10 dark:bg-cyan-500/20"
        style={{ animationDelay: "2.5s" }}
      />

      <div className="container">
        <div className="grid items-center gap-11 sm:gap-16 lg:grid-cols-2 lg:gap-10">
          {/* Text column */}
          {/* initial={false}: the hero is above the fold, so it must be visible
              in the prerendered HTML (LCP) instead of waiting for hydration */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial={false}
            whileInView="visible"
            viewport={VIEWPORT}
            className="flex flex-col items-center gap-3 text-center sm:gap-6 lg:items-start lg:text-left"
          >
            <motion.div
              variants={fadeUp}
              className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-sm font-medium transition-colors duration-300 hover:border-primary/30 sm:gap-2.5 sm:px-4 sm:py-1.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to new opportunities
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              <span className="block">Hi, I&apos;m</span>
              <span className="text-gradient block">{site.name}</span>
            </motion.h1>

            {/* Terminal-style role line — the gradient chevron stays put, so
                the line never looks empty between typing cycles */}
            <motion.div
              variants={fadeUp}
              className="flex min-h-[2.75rem] items-baseline justify-center gap-2 font-display text-lg font-semibold leading-tight sm:min-h-[2.25rem] sm:gap-2.5 sm:text-2xl sm:leading-8 lg:justify-start"
            >
              <span aria-hidden="true" className="text-gradient select-none">
                ▸
              </span>
              <Typewriter phrases={site.typingRoles} className="text-foreground/90" />
            </motion.div>

            {/* leading-snug + text-sm only below sm; sm:text-base/leading-6
                restores the inherited 16px/1.5 desktop rhythm exactly */}
            <motion.p
              variants={fadeUp}
              className="max-w-xl text-sm leading-snug text-muted-foreground sm:text-base sm:leading-6"
            >
              {site.tagline}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:justify-start"
            >
              {/* Below sm the lg size is shrunk to the default button metrics so
                  both CTAs share one row instead of wrapping onto two */}
              <a
                href={site.resumePath}
                download
                className={cn(
                  buttonVariants({ variant: "gradient", size: "lg" }),
                  "shine",
                  "h-10 px-5 text-sm sm:h-12 sm:px-7 sm:text-base"
                )}
              >
                <Download aria-hidden="true" />
                Download Resume
              </a>
              <a
                href="#contact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "shine",
                  "h-10 px-5 text-sm sm:h-12 sm:px-7 sm:text-base"
                )}
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
                  className="glass rounded-full p-2.5 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-[0_0_16px_-4px_hsl(var(--primary)/0.5)] sm:p-3"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </motion.div>

            {/* Impact strip — the three headline numbers, counted up on view */}
            <motion.div
              variants={fadeUp}
              className="mt-0 grid w-full max-w-xl grid-cols-3 gap-3 border-t border-border/40 pt-4 sm:mt-2 sm:gap-6 sm:pt-6"
            >
              {about.stats.slice(0, 3).map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-gradient font-display text-xl font-bold sm:text-3xl">
                    <CountUp value={stat.value} />
                  </div>
                  <div className="mt-0.5 text-[11px] leading-tight text-muted-foreground sm:mt-1 sm:text-xs sm:leading-snug">
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
            <div className="group relative mr-0 h-56 w-56 sm:h-96 sm:w-96 lg:mr-12">
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
              <div className="absolute inset-0 flex items-center justify-center rounded-full border border-border bg-card">
                <QualityCore />
                {/* Absolutely positioned so its height can't shift the gauge off
                    the circle's true centre. Sits low, where the chord narrows:
                    on mobile the icon is dropped and tracking tightened so the
                    pill stays inside the curve (145px would overflow 126px). */}
                <span className="absolute bottom-[8%] left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full border border-primary/20 bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.04em] text-primary sm:gap-1.5 sm:px-3 sm:py-1 sm:text-[10px] sm:tracking-[0.18em]">
                  <BadgeCheck className="hidden h-3 w-3 sm:inline sm:h-3.5 sm:w-3.5" aria-hidden="true" />
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
                      className="absolute"
                      style={{ left: `${left}%`, top: `${top}%`, x: "-50%", y: "-50%" }}
                    >
                      <div className="animate-orbit-reverse flex flex-col items-center group-hover:[animation-play-state:paused]">
                        {/* Big logo disc — the label rides in a pill overlapping below */}
                        <div
                          className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-zinc-200/80 bg-white shadow-lg transition-transform duration-300 hover:scale-110 dark:border-white/15 dark:bg-zinc-900 sm:h-[4.25rem] sm:w-[4.25rem]"
                          // Soft drop shadow tinted with the tool's own brand color
                          style={
                            brand
                              ? { boxShadow: `0 10px 26px -8px #${brand.hex}80` }
                              : undefined
                          }
                        >
                          {/* Brand-tinted halo behind the logo — dark mode only,
                              so dark marks (MySQL, JMeter) stay legible */}
                          {brand ? (
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 opacity-0 dark:opacity-100"
                              style={{
                                background: `radial-gradient(circle at 50% 42%, #${brand.hex}38, transparent 72%)`,
                              }}
                            />
                          ) : null}
                          {brand ? (
                            <svg
                              viewBox="0 0 24 24"
                              className="relative h-6 w-6 dark:brightness-125 dark:saturate-125 sm:h-8 sm:w-8"
                              fill={`#${brand.hex}`}
                              aria-hidden="true"
                            >
                              <path d={brand.path} />
                            </svg>
                          ) : Icon ? (
                            <Icon
                              className="relative h-6 w-6 text-indigo-600 dark:text-indigo-400 sm:h-8 sm:w-8"
                              aria-hidden="true"
                            />
                          ) : null}
                        </div>
                        <div className="glass mt-1 whitespace-nowrap rounded-full px-1.5 py-0.5 text-[9px] font-semibold shadow-md sm:mt-2 sm:px-2.5 sm:text-xs">
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
