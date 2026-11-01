/**
 * Skill categories rendered as cards in the Skills section.
 * `icon` is a lucide-react icon name resolved inside the Skills component.
 */
export interface SkillCategory {
  title: string;
  /** lucide-react icon component name, resolved in the Skills section. */
  icon:
    | "Code2"
    | "Gauge"
    | "Server"
    | "Network"
    | "TestTubes"
    | "Database"
    | "Cloud"
    | "Workflow"
    | "Wrench"
    | "BrainCircuit";
  skills: string[];
}

/**
 * Testing types covered (straight from the resume's "Testing Types" line,
 * plus OWASP security work from the CV) — rendered as a highlight strip
 * above the skill grid. These are the exact keywords recruiters and ATS
 * systems scan for.
 */
export const testingTypes = [
  "Manual Testing",
  "Functional Testing",
  "Regression Testing",
  "Smoke Testing",
  "Sanity Testing",
  "UI Testing",
  "API Testing",
  "Mobile Testing",
  "Performance & Load Testing",
  "Security Testing (OWASP)",
  "Integration Testing",
  "End-to-End Testing",
  "Exploratory Testing",
  "Negative & Edge-Case Design",
  "Contract & Schema Testing",
  "AI Guardrail Testing",
  "PII & Data-Privacy Testing",
] as const;

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: "Code2",
    skills: ["Java", "JavaScript", "TypeScript", "Python", "SQL"],
  },
  {
    title: "Test Automation",
    icon: "TestTubes",
    skills: [
      "Playwright",
      "Selenium WebDriver",
      "TestNG",
      "Appium",
      "REST Assured",
      "Postman",
      "Newman",
      "Karate",
      "PyTest",
      "AJV JSON-Schema Validation",
      "Page Object Model",
      "Parallel & Cross-Browser Runs",
      "Webhook & Callback Testing",
      "k6",
      "JMeter",
      "Burp Suite (OWASP Top 10)",
    ],
  },
  {
    title: "Performance & Load Testing",
    icon: "Gauge",
    skills: [
      "k6",
      "Apache JMeter",
      "Load Profile Design",
      "Apdex & Latency Metrics",
      "CI Performance Gates",
      "Distributed k6 Runners on Kubernetes",
      "Spike & Capacity Baselines",
    ],
  },
  {
    title: "Backend",
    icon: "Server",
    skills: ["Node.js", "Express.js", "REST APIs", "Microservices", "JWT Auth"],
  },
  {
    title: "Protocols",
    icon: "Network",
    skills: ["REST", "gRPC", "WebSocket", "HTTP"],
  },
  {
    title: "Databases",
    icon: "Database",
    skills: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Stored Procedures",
      "Triggers",
      "Schema & Data Validation",
    ],
  },
  {
    title: "Cloud",
    icon: "Cloud",
    skills: ["AWS EC2", "AWS Lambda", "AWS RDS", "Boto3", "GCP Secret Manager"],
  },
  {
    title: "CI/CD & DevOps",
    icon: "Workflow",
    skills: [
      "Jenkins",
      "Docker",
      "Kubernetes",
      "Git",
      "GitHub",
      "Bitbucket",
      "Linux/Unix CLI",
    ],
  },
  {
    title: "Practices & Tools",
    icon: "Wrench",
    skills: [
      "Agile / Scrum",
      "SDLC & STLC",
      "Jira",
      "Defect Lifecycle",
      "Requirement Reviews",
      "Test Strategy",
      "Coverage-Gap Dashboards",
      "Flaky-Test Triage",
      "Root-Cause Analysis",
    ],
  },
  {
    title: "AI & LLM Quality",
    icon: "BrainCircuit",
    skills: [
      "AI Guardrail Testing",
      "Adversarial Prompt Suites",
      "PII Masking Validation",
      "Synthetic Test Data",
      "LLM APIs",
      "GitHub Copilot",
      "Claude",
    ],
  },
];
