/**
 * Leadership, ownership and impact highlights rendered in the
 * Achievements section (sourced from the resume's Leadership section).
 */
export interface Achievement {
  title: string;
  description: string;
  /** lucide-react icon name resolved in the Achievements section. */
  icon: "Target" | "Database" | "Bug" | "Layers";
}

export const achievements: Achievement[] = [
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
