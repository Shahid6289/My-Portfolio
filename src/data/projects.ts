/** Projects rendered as cards in the Projects section. */
export interface Project {
  title: string;
  description: string;
  features: string[];
  techStack: string[];
  /** TODO: add your real repository URLs — not listed on the resume. */
  github?: string;
  liveDemo?: string;
  /** Tailwind gradient classes for the card's image placeholder. */
  gradient: string;
  /** lucide-react icon name shown on the placeholder. */
  icon: "Gauge" | "Bug";
}

export const projects: Project[] = [
  {
    title: "Multi-Protocol Performance Testing Framework",
    description:
      "A protocol-agnostic performance testing framework built on k6 + TypeScript that load-tests REST, gRPC and WebSocket APIs side by side from a single tool, with CI-enforced cross-protocol consistency checks.",
    features: [
      "Sequential, concurrent, ramping and simultaneous-barrier spike profiles, runnable as distributed k6 runners",
      "Cross-protocol data-consistency assertions — order via REST, verify over gRPC, watch over WebSocket — with k6 thresholds failing CI on any inconsistency",
      "Per-protocol Apdex, custom latency metrics and trace-id failure logging",
      "Self-contained single-file HTML report generated from each run's JSON summary",
    ],
    techStack: ["k6", "TypeScript", "gRPC", "WebSocket", "REST", "Node.js"],
    gradient: "from-indigo-500 via-violet-500 to-fuchsia-500",
    icon: "Gauge",
  },
  {
    title: "BugSnap — One-Click Bug Capture & AI-Written Tickets",
    description:
      "A full-stack bug-reporting platform — Chrome MV3 extension, Node/Express/TypeScript API and React dashboard — that captures console errors, failed network calls, environment info and a screenshot in one click, then files a labeled, severity-rated GitHub issue written by AI.",
    features: [
      "One-click capture of console errors, failed network calls, environment info and a screenshot, filed straight to GitHub Issues",
      "AI treated as an unreliable dependency: Gemini output is schema-validated with zod and falls back to a deterministic generator, so the API never fails because the AI did",
      "17 backend tests in Vitest, including an HTTP end-to-end capture flow and RBAC denial cases",
      "Privacy-first capture with AES-256-GCM token encryption, SHA-256-hashed API keys and no header or request-body capture",
      "Relational integrity by design — composite-PK membership junction and a deliberate cascade strategy across teams, users and reports",
    ],
    techStack: [
      "TypeScript",
      "Chrome MV3",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "React",
      "Vitest",
      "Gemini API",
    ],
    gradient: "from-rose-500 via-fuchsia-500 to-indigo-500",
    icon: "Bug",
  },
];
