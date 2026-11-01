/**
 * Leadership, ownership and impact highlights rendered in the
 * Achievements section (sourced from the resume's Leadership section).
 */
export interface Achievement {
  title: string;
  description: string;
  /** lucide-react icon name resolved in the Achievements section. */
  icon: "Target" | "Database" | "Bug" | "Layers" | "ShieldCheck" | "LayoutDashboard";
}

export const achievements: Achievement[] = [
  {
    title: "AI Quality Engineering",
    description:
      "Built the guardrail and data-privacy test practice for an LLM platform — adversarial prompt coverage across ten risk categories, platform-block vs model-refusal classification, and PII masking verified across 32 entity types.",
    icon: "ShieldCheck",
  },
  {
    title: "QA Baseline Built from Zero",
    description:
      "Created a platform's QA baseline across 13 modules and wrote a Python (openpyxl) pipeline merging manual test cases from several workbooks into one coverage-gap dashboard with stable IDs — then surfaced 60 defects through exploratory testing of the model lifecycle.",
    icon: "LayoutDashboard",
  },
  {
    title: "End-to-End Test Strategy Ownership",
    description:
      "Owned test strategy across UI (Selenium/Playwright), mobile (Appium), API and database layers — improving release confidence and reducing escaped defects across multiple products.",
    icon: "Target",
  },
  {
    title: "Database Testing Practice Lead",
    description:
      "Led the DB testing practice by writing and reviewing stored procedures, triggers and SQL assertion scripts, keeping data consistent across migrations and deployments.",
    icon: "Database",
  },
  {
    title: "Defect Lifecycle Management",
    description:
      "Drove defect triage, tracking and verification with developers and QA in Jira — consistently reducing re-open rates and shortening resolution cycles.",
    icon: "Bug",
  },
  {
    title: "Distributed Load Testing on Kubernetes",
    description:
      "Drove adoption of containerised, distributed load testing on Kubernetes — then independently diagnosed and resolved an environment issue skewing spike results, making performance runs reproducible and reliable.",
    icon: "Layers",
  },
];
