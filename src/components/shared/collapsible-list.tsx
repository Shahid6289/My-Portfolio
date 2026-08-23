"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Below Tailwind's `sm` breakpoint (640px) the list collapses. */
const MOBILE_QUERY = "(max-width: 639.98px)";

/**
 * Reports whether the viewport is below Tailwind's `sm` breakpoint.
 *
 * Deliberately starts as `{ mounted: false, isMobile: false }` so the server
 * render and the first client render both produce the fully expanded list.
 * The collapse only happens afterwards, from an effect, which keeps hydration
 * byte-identical while still keeping the hidden items out of the DOM on
 * mobile — CSS-only hiding would leave them costing layout on every phone.
 */
function useMobileBreakpoint() {
  const [state, setState] = React.useState({ mounted: false, isMobile: false });

  React.useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    const sync = () => setState({ mounted: true, isMobile: query.matches });

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return state;
}

interface CollapsibleListProps {
  items: readonly string[] | string[];
  /** Renders one item — should return an `<li>`; keys are handled here. */
  renderItem: (item: string, index: number) => React.ReactNode;
  /** How many items stay visible on mobile before the toggle. */
  mobileLimit?: number;
  /**
   * Spacing utilities for the list rhythm, e.g. `space-y-2 sm:space-y-2.5`.
   * Applied to the wrapper *and* to both list groups so the gaps between the
   * always-visible items, the revealed items and the toggle all match. Keep
   * it to spacing — outer margins belong on a wrapper around this component.
   */
  className?: string;
}

/**
 * Shows the first `mobileLimit` items on phones behind a "Show N more"
 * toggle, and every item unconditionally from `sm` up (where the toggle is
 * never rendered at all). Used to keep long highlight/feature lists from
 * stretching the mobile page.
 */
export function CollapsibleList({
  items,
  renderItem,
  mobileLimit = 3,
  className,
}: CollapsibleListProps) {
  const listId = React.useId();
  const reduceMotion = useReducedMotion();
  const { mounted, isMobile } = useMobileBreakpoint();
  const [expanded, setExpanded] = React.useState(false);

  const all: readonly string[] = items;
  const collapsible = mounted && isMobile && all.length > mobileLimit;
  const visible: readonly string[] = collapsible ? all.slice(0, mobileLimit) : all;
  const rest: readonly string[] = collapsible ? all.slice(mobileLimit) : [];

  return (
    <div id={listId} className={className}>
      <ul className={className}>
        {visible.map((item, index) => (
          <React.Fragment key={item}>{renderItem(item, index)}</React.Fragment>
        ))}
      </ul>

      {collapsible ? (
        <>
          <AnimatePresence initial={false}>
            {expanded ? (
              <motion.div
                key="rest"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
                className="overflow-hidden"
              >
                <ul className={className}>
                  {rest.map((item, index) => (
                    <React.Fragment key={item}>
                      {renderItem(item, mobileLimit + index)}
                    </React.Fragment>
                  ))}
                </ul>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            aria-expanded={expanded}
            aria-controls={listId}
            className="inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:underline"
          >
            {expanded ? "Show less" : `Show ${all.length - mobileLimit} more`}
            <ChevronDown
              aria-hidden="true"
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-300 motion-reduce:transition-none",
                expanded && "rotate-180"
              )}
            />
          </button>
        </>
      ) : null}
    </div>
  );
}
