"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Command as CommandIcon, Menu, Sparkles, X } from "lucide-react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/data/site";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Section ids the scroll-spy observes: hero plus every nav anchor. */
const SECTION_IDS = ["home", ...site.nav.map((item) => item.href.slice(1))];

/**
 * Fixed site header: transparent over the hero, frosted glass once scrolled.
 * Desktop shows scroll-spied anchor links with an animated gradient underline;
 * mobile collapses into a glass dropdown.
 */
export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [activeId, setActiveId] = React.useState<string>("home");
  const hamburgerRef = React.useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  /**
   * Mobile-menu navigation: Chromium cancels an in-flight smooth scroll when
   * layout mutates, and the menu's height-collapse + unmount does exactly
   * that — so the default anchor jump silently dies at scrollY 0. Instead:
   * close the menu first, then start the scroll once the exit animation
   * (0.25s) has finished.
   */
  const closeMenuAndScroll =
    (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setMenuOpen(false);
      const target = document.querySelector(href);
      window.setTimeout(() => {
        target?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
        history.replaceState(null, "", href);
      }, 280);
    };

  // Glass background once the page has scrolled past the very top.
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: the section crossing a narrow band mid-viewport is "active".
  React.useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu on Escape, returning focus to the hamburger
  // so keyboard users aren't stranded on <body>.
  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const openCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || menuOpen
          ? "glass shadow-md shadow-black/5 dark:shadow-black/20"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <a
          href="#home"
          aria-label={`${site.name} — back to top`}
          className="font-display text-2xl font-bold tracking-tight"
        >
          <span className="text-gradient transition duration-300 hover:drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]">
            SP.
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {site.nav.map((item) => {
            const isActive = activeId === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/60",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
                {isActive ? (
                  <motion.span
                    layoutId="nav-underline"
                    aria-hidden="true"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-brand"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
              </a>
            );
          })}
        </nav>

        {/* Right-side controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Open command palette"
            onClick={openCommandPalette}
            className="hidden h-9 items-center gap-1.5 rounded-full border border-border px-3 text-xs font-medium text-muted-foreground transition hover:border-primary/30 hover:text-foreground hover:shadow-sm sm:flex"
          >
            <CommandIcon className="h-3.5 w-3.5" aria-hidden />
            <span>K</span>
          </button>

          <ThemeToggle />

          {/* Border-beam "Hire Me" — resume download lives in the hero CTA;
              the navbar offers the complementary action instead */}
          <a
            href="#contact"
            className="group/hire relative hidden overflow-hidden rounded-full p-[1.5px] transition-shadow duration-300 hover:shadow-[0_0_18px_-6px_hsl(var(--primary)/0.6)] sm:inline-flex"
          >
            <span
              aria-hidden="true"
              className="absolute inset-[-100%] animate-[spin-slow_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,#6366f1_18%,#8b5cf6_32%,#22d3ee_46%,transparent_64%)]"
            />
            <span className="relative inline-flex h-9 items-center gap-1.5 rounded-full bg-background/95 px-4 text-xs font-semibold backdrop-blur transition-colors duration-300 group-hover/hire:bg-background/85">
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              <span className="text-gradient">Hire Me</span>
            </span>
          </a>

          {/* Mobile hamburger */}
          <button
            ref={hamburgerRef}
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "lg:hidden")}
          >
            {menuOpen ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="glass overflow-hidden border-x-0 border-b lg:hidden"
          >
            {/* max-h keeps Contact/Resume reachable on short landscape viewports;
                the cap lives on this inner div so the height:auto animation still works */}
            <div className="container flex max-h-[calc(100dvh-4rem)] flex-col gap-1 overflow-y-auto py-4">
              {site.nav.map((item) => {
                const isActive = activeId === item.href.slice(1);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeMenuAndScroll(item.href)}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-accent text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={closeMenuAndScroll("#contact")}
                className={cn(buttonVariants({ variant: "gradient", size: "sm" }), "mt-2")}
              >
                <Sparkles aria-hidden="true" />
                Hire Me
              </a>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
