"use client";

import * as React from "react";

/**
 * Copyright year that never goes stale on a statically prerendered page:
 * the build-era fallback renders on the server, then the visitor's actual
 * year replaces it after hydration.
 */
export function CurrentYear() {
  const [year, setYear] = React.useState(2026);

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <span>{year}</span>;
}
