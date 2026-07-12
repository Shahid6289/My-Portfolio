"use client";

import * as React from "react";
import { Command } from "cmdk";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Briefcase,
  Check,
  Copy,
  Download,
  FolderGit2,
  Github,
  GraduationCap,
  Hash,
  Layers,
  Linkedin,
  Mail,
  SunMoon,
  User,
  type LucideIcon,
} from "lucide-react";
import { useTheme } from "next-themes";

import { site } from "@/data/site";
import { EASE } from "@/lib/motion";

/** Icons for the navigation group, keyed by anchor href. */
const NAV_ICONS: Record<string, LucideIcon> = {
  "#about": User,
  "#skills": Layers,
  "#experience": Briefcase,
  "#projects": FolderGit2,
  "#education": GraduationCap,
  "#contact": Mail,
};

const ITEM_CLASS =
  "flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground outline-none transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground";

const ICON_CLASS = "h-4 w-4 shrink-0 text-muted-foreground";

/**
 * Cmd+K palette for jumping between sections and running quick actions
 * (theme toggle, resume download, copy email, social links).
 * Also opens on the global "open-command-palette" CustomEvent.
 */
export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const copyTimeout = React.useRef<number | null>(null);
  const dialogRef = React.useRef<HTMLDivElement>(null);

  /**
   * Element that had focus when the palette opened. Captured in the open
   * handlers — NOT in an effect, which would run after Command.Input has
   * already autofocused and capture the palette's own input instead.
   */
  const openerRef = React.useRef<HTMLElement | null>(null);

  // Cmd/Ctrl+K toggles, Escape closes; the navbar hint button fires the event.
  React.useEffect(() => {
    const capture = () => {
      openerRef.current = document.activeElement as HTMLElement | null;
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (!open) capture();
        setOpen(!open);
      } else if (event.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpenEvent = () => {
      if (!open) capture();
      setOpen(true);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onOpenEvent);
    };
  }, [open]);

  // Lock body scroll while the palette is open.
  React.useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // When the palette closes: return focus to the opener (WCAG 2.4.3) and
  // reset any pending "Copied!" state so a stale 1s timer can't snap a
  // freshly reopened palette shut.
  React.useEffect(() => {
    if (open) return;
    if (copyTimeout.current !== null) {
      window.clearTimeout(copyTimeout.current);
      copyTimeout.current = null;
    }
    setCopied(false);
    openerRef.current?.focus();
    openerRef.current = null;
  }, [open]);

  // aria-modal dialogs must contain Tab — cycle focus among the palette's
  // focusable descendants instead of letting it escape behind the overlay.
  const trapFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusable = dialog.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  // Clear any pending "Copied!" timer on unmount.
  React.useEffect(
    () => () => {
      if (copyTimeout.current !== null) window.clearTimeout(copyTimeout.current);
    },
    []
  );

  const close = React.useCallback(() => setOpen(false), []);

  const scrollToSection = (href: string) => {
    close();
    document
      .querySelector(href)
      ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    close();
  };

  const downloadResume = () => {
    close();
    const anchor = document.createElement("a");
    anchor.href = site.resumePath;
    anchor.download = "";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  const copyEmail = async () => {
    // A second copy in quick succession must supersede the first timer.
    if (copyTimeout.current !== null) window.clearTimeout(copyTimeout.current);
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      copyTimeout.current = window.setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 1000);
    } catch {
      close();
    }
  };

  const openLink = (url: string) => {
    close();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onKeyDown={trapFocus}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
          className="fixed inset-0 z-[70] flex items-start justify-center bg-background/80 px-4 pt-[15vh] backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="glass w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/40"
          >
            <Command label="Command palette">
              <Command.Input
                autoFocus
                placeholder="Type a command or search…"
                className="w-full border-b border-border bg-transparent px-4 py-3.5 text-base text-foreground outline-none placeholder:text-muted-foreground sm:text-sm"
              />
              <Command.List className="max-h-80 overflow-y-auto p-2 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground">
                <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Navigation">
                  {site.nav.map((item) => {
                    const Icon = NAV_ICONS[item.href] ?? Hash;
                    return (
                      <Command.Item
                        key={item.href}
                        value={`go to ${item.label}`}
                        onSelect={() => scrollToSection(item.href)}
                        className={ITEM_CLASS}
                      >
                        <Icon className={ICON_CLASS} aria-hidden />
                        {item.label}
                      </Command.Item>
                    );
                  })}
                </Command.Group>

                <Command.Group heading="Actions">
                  <Command.Item
                    value="toggle theme dark light mode"
                    onSelect={toggleTheme}
                    className={ITEM_CLASS}
                  >
                    <SunMoon className={ICON_CLASS} aria-hidden />
                    Toggle theme
                  </Command.Item>
                  <Command.Item
                    value="download resume cv"
                    onSelect={downloadResume}
                    className={ITEM_CLASS}
                  >
                    <Download className={ICON_CLASS} aria-hidden />
                    Download resume
                  </Command.Item>
                  <Command.Item
                    value="copy email address"
                    onSelect={copyEmail}
                    className={ITEM_CLASS}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 shrink-0 text-emerald-500" aria-hidden />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className={ICON_CLASS} aria-hidden />
                        Copy email
                      </>
                    )}
                  </Command.Item>
                  <Command.Item
                    value="open linkedin profile"
                    onSelect={() => openLink(site.socials.linkedin)}
                    className={ITEM_CLASS}
                  >
                    <Linkedin className={ICON_CLASS} aria-hidden />
                    Open LinkedIn
                  </Command.Item>
                  <Command.Item
                    value="open github profile"
                    onSelect={() => openLink(site.socials.github)}
                    className={ITEM_CLASS}
                  >
                    <Github className={ICON_CLASS} aria-hidden />
                    Open GitHub
                  </Command.Item>
                </Command.Group>
              </Command.List>
              <div className="flex items-center justify-between border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
                <span>Navigate with ↑ ↓</span>
                <span>↵ select · esc close</span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
