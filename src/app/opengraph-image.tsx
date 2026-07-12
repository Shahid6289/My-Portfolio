import { ImageResponse } from "next/og";

import { site } from "@/data/site";

export const alt = `${site.name} — Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share card generated at build time — no external assets needed. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #09090b 0%, #1e1b4b 55%, #164e63 100%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "6px 22px",
            borderRadius: 9999,
            border: "1px solid rgba(129,140,248,0.45)",
            background: "rgba(99,102,241,0.15)",
            color: "#a5b4fc",
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Portfolio
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700, marginTop: 28 }}>
          {site.name}
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "#a1a1aa", marginTop: 16 }}>
          {site.role}
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#67e8f9", marginTop: 40 }}>
          Playwright · Selenium · Appium · k6 · API & DB Testing · CI/CD
        </div>
      </div>
    ),
    { ...size }
  );
}
