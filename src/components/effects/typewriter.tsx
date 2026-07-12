"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

const TYPE_MS = 65;
const DELETE_MS = 35;
const HOLD_MS = 1800;
/** Small breath between finishing a delete and starting the next phrase. */
const NEXT_PHRASE_MS = 300;

interface TypewriterProps {
  /** Phrases typed and deleted in an endless loop. */
  phrases: readonly string[];
  className?: string;
}

/**
 * Looping type/delete text effect with a blinking caret. Renders the first
 * phrase statically for reduced-motion users, and exposes only a static
 * sr-only phrase to screen readers so the churn is never announced.
 */
export function Typewriter({ phrases, className }: TypewriterProps) {
  const prefersReducedMotion = useReducedMotion();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (phrases.length === 0) return;

    // Reduced motion: pin the full first phrase instead of looping. Handled
    // here (not by branching the render output) so server and client markup
    // stay identical — useReducedMotion() is null during SSR.
    if (prefersReducedMotion) {
      setPhraseIndex(0);
      setCharCount(phrases[0].length);
      setDeleting(false);
      return;
    }

    const phrase = phrases[phraseIndex % phrases.length];
    let timeoutId: number;

    if (!deleting && charCount < phrase.length) {
      timeoutId = window.setTimeout(() => setCharCount((c) => c + 1), TYPE_MS);
    } else if (!deleting) {
      timeoutId = window.setTimeout(() => setDeleting(true), HOLD_MS);
    } else if (charCount > 0) {
      timeoutId = window.setTimeout(() => setCharCount((c) => c - 1), DELETE_MS);
    } else {
      timeoutId = window.setTimeout(() => {
        setDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }, NEXT_PHRASE_MS);
    }

    return () => window.clearTimeout(timeoutId);
  }, [charCount, deleting, phraseIndex, phrases, prefersReducedMotion]);

  if (phrases.length === 0) return null;

  const visibleText = phrases[phraseIndex % phrases.length].slice(0, charCount);

  return (
    <span aria-live="off" className={cn("inline-flex items-baseline", className)}>
      <span aria-hidden="true">{visibleText}</span>
      {/* Caret is hidden via CSS under reduced motion — same markup on server and client */}
      <span
        aria-hidden="true"
        className="ml-0.5 animate-blink font-light text-primary motion-reduce:hidden"
      >
        |
      </span>
      <span className="sr-only">{phrases[0]}</span>
    </span>
  );
}
