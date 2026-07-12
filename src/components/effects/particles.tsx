"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

/** Max distance (px) at which two particles are linked by a line. */
const LINK_DISTANCE = 120;
/** One particle per this many px² of canvas area (~60 dots on a laptop). */
const AREA_PER_PARTICLE = 22000;
const MIN_PARTICLES = 20;
const MAX_PARTICLES = 90;
const RESIZE_DEBOUNCE_MS = 200;

/**
 * Decorative canvas particle network for the hero backdrop. Slow-drifting
 * dots joined by distance-faded lines. Theme-aware, DPR-aware, paused while
 * the tab is hidden, and left blank for reduced-motion users (the canvas
 * still mounts so server and client markup match).
 */
export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();

  // Theme color lives in a ref so toggling the theme recolors on the next
  // frame instead of tearing down and respawning the whole simulation.
  // Dark-first site: fall back to the dark tone until the theme resolves.
  const rgbRef = useRef("165, 180, 252");
  useEffect(() => {
    rgbRef.current = resolvedTheme === "light" ? "99, 102, 241" : "165, 180, 252";
  }, [resolvedTheme]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let rafId = 0;
    let running = true;
    let resizeTimer = 0;

    const setSize = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = () => {
      // Count scales with viewport area, so phones get far fewer dots.
      const target = Math.max(
        MIN_PARTICLES,
        Math.min(MAX_PARTICLES, Math.round((width * height) / AREA_PER_PARTICLE))
      );
      particles = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.8,
      }));
    };

    const step = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        // Wrap around the edges for a seamless drift.
        if (p.x < -LINK_DISTANCE) p.x = width + LINK_DISTANCE;
        else if (p.x > width + LINK_DISTANCE) p.x = -LINK_DISTANCE;
        if (p.y < -LINK_DISTANCE) p.y = height + LINK_DISTANCE;
        else if (p.y > height + LINK_DISTANCE) p.y = -LINK_DISTANCE;
      }

      const rgb = rgbRef.current;
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < LINK_DISTANCE * LINK_DISTANCE) {
            const alpha = (1 - Math.sqrt(distSq) / LINK_DISTANCE) * 0.28;
            ctx.strokeStyle = `rgba(${rgb}, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = `rgba(${rgb}, 0.55)`;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(step);
    };

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        setSize();
        spawn();
      }, RESIZE_DEBOUNCE_MS);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else if (!running) {
        running = true;
        rafId = requestAnimationFrame(step);
      }
    };

    setSize();
    spawn();
    rafId = requestAnimationFrame(step);

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [prefersReducedMotion]);

  // No reduced-motion early return here: useReducedMotion() is null during
  // SSR, so branching the markup on it would cause a hydration mismatch.
  // The effect above simply never draws, leaving the canvas transparent.
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
