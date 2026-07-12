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
  icon: "Gauge" | "GraduationCap";
}

export const projects: Project[] = [
  {
    title: "Multi-Protocol Performance Testing Framework",
    description:
      "A protocol-agnostic performance testing framework built on k6 + TypeScript that load-tests REST, gRPC and WebSocket APIs side by side from a single tool, with CI-enforced cross-protocol consistency checks.",
    features: [
      "Sequential, concurrent and ramping load profiles composed from k6 scenarios and arrival-rate executors",
      "Cross-protocol data-consistency assertions — order via REST, verify over gRPC, watch over WebSocket — with k6 thresholds failing CI on any inconsistency",
      "Per-protocol Apdex, custom latency metrics and trace-id failure logging",
      "Self-contained single-file HTML report generated from each run's JSON summary",
    ],
    techStack: ["k6", "TypeScript", "gRPC", "WebSocket", "REST", "Node.js"],
    gradient: "from-indigo-500 via-violet-500 to-fuchsia-500",
    icon: "Gauge",
  },
  {
    title: "StudyNotion — EdTech Platform",
    description:
      "A full-stack EdTech platform supporting 500+ course enrollments, with role-based access control, payment workflows and a regression suite asserting user and transaction integrity at the database level.",
    features: [
      "500+ student enrollments supported",
      "Role-based access control for students and instructors",
      "Payment workflow coverage with a TestNG-based regression suite",
      "Database-level assertions on user and transaction records",
    ],
    techStack: ["React.js", "Node.js", "JavaScript", "JWT Auth", "TestNG"],
    gradient: "from-cyan-500 via-sky-500 to-indigo-500",
    icon: "GraduationCap",
  },
];
