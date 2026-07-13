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
  /** Index into the brand tint palette (indigo / violet / cyan). */
  tint: number;
  /** Per-particle offset so the twinkle cycles are desynchronised. */
  phase: number;
  /** 0 = far layer (smaller, slower, dimmer) · 1 = near layer. */
  depth: 0 | 1;
}

/** Max distance (px) at which two particles are linked by a line. */
const LINK_DISTANCE = 130;
/** Max distance (px) at which a particle links to the cursor. */
const MOUSE_LINK_DISTANCE = 170;
/** One particle per this many px² of canvas area (~65 dots on a laptop). */
const AREA_PER_PARTICLE = 20000;
const MIN_PARTICLES = 24;
const MAX_PARTICLES = 100;
const RESIZE_DEBOUNCE_MS = 200;

/** Brand palette per theme — indigo, violet, cyan ("r, g, b" strings). */
const DARK_TINTS = ["165, 180, 252", "196, 181, 253", "103, 232, 249"];
const LIGHT_TINTS = ["79, 70, 229", "124, 58, 237", "8, 145, 178"];

/**
 * Decorative canvas constellation for the hero backdrop. Two depth layers of
 * slow-drifting dots in the three brand tints, joined by distance-faded
 * lines, with a soft glow and gentle twinkle per dot — and lines that reach
 * out to the cursor as it moves. Theme-aware, DPR-aware, paused while the
 * tab is hidden, and left blank for reduced-motion users (the canvas still
 * mounts so server and client markup match).
 */
export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();

  // Theme tints live in a ref so toggling the theme recolors on the next
  // frame instead of tearing down and respawning the whole simulation.
  // Dark-first site: fall back to the dark tones until the theme resolves.
  const tintsRef = useRef<string[]>(DARK_TINTS);
  useEffect(() => {
    tintsRef.current = resolvedTheme === "light" ? LIGHT_TINTS : DARK_TINTS;
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
    const mouse = { x: 0, y: 0, active: false };

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
      particles = Array.from({ length: target }, () => {
        const depth: 0 | 1 = Math.random() < 0.45 ? 0 : 1;
        const speed = depth === 0 ? 0.18 : 0.35;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          r: (Math.random() * 1.4 + 0.9) * (depth === 0 ? 0.7 : 1.15),
          tint: Math.floor(Math.random() * 3),
          phase: Math.random() * Math.PI * 2,
          depth,
        };
      });
    };

    const step = (now: number) => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      const tints = tintsRef.current;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        // Wrap around the edges for a seamless drift.
        if (p.x < -LINK_DISTANCE) p.x = width + LINK_DISTANCE;
        else if (p.x > width + LINK_DISTANCE) p.x = -LINK_DISTANCE;
        if (p.y < -LINK_DISTANCE) p.y = height + LINK_DISTANCE;
        else if (p.y > height + LINK_DISTANCE) p.y = -LINK_DISTANCE;
      }

      // Particle-to-particle links, tinted by one endpoint.
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < LINK_DISTANCE * LINK_DISTANCE) {
            const alpha = (1 - Math.sqrt(distSq) / LINK_DISTANCE) * 0.22;
            ctx.strokeStyle = `rgba(${tints[a.tint]}, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Links reaching out to the cursor — makes the web feel alive.
      if (mouse.active) {
        for (const p of particles) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < MOUSE_LINK_DISTANCE * MOUSE_LINK_DISTANCE) {
            const alpha = (1 - Math.sqrt(distSq) / MOUSE_LINK_DISTANCE) * 0.32;
            ctx.strokeStyle = `rgba(${tints[p.tint]}, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // Dots: soft outer glow + twinkling core.
      for (const p of particles) {
        const depthFactor = p.depth === 0 ? 0.55 : 1;
        const twinkle = 0.75 + 0.25 * Math.sin(now * 0.0012 + p.phase);
        const tint = tints[p.tint];

        ctx.fillStyle = `rgba(${tint}, ${(0.1 * twinkle * depthFactor).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${tint}, ${(0.62 * twinkle * depthFactor).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(step);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      // Only engage while the cursor is actually over the hero canvas.
      mouse.active = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      mouse.x = x;
      mouse.y = y;
    };

    const onPointerLeave = () => {
      mouse.active = false;
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
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
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
