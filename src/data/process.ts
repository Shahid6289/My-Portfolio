/**
 * The delivery pipeline rendered in the "How I deliver quality" section.
 * Every step is backed by the resume: requirement reviews across the
 * SDLC/STLC, test case & scenario design, automation frameworks, Jenkins
 * CI/CD with Docker and k6 thresholds, and the Jira defect lifecycle.
 */
export interface ProcessStep {
  title: string;
  description: string;
  /** lucide-react icon name, resolved inside the Process section. */
  icon: "FileSearch" | "ClipboardList" | "Bot" | "Workflow" | "Bug";
}

export const processSteps: ProcessStep[] = [
  {
    title: "Requirement Reviews",
    description:
      "Quality starts before code: reviewing requirements across the SDLC and STLC to surface risks and edge cases early.",
    icon: "FileSearch",
  },
  {
    title: "Test Design",
    description:
      "Functional, regression, smoke and sanity cases and scenarios designed straight from product requirements.",
    icon: "ClipboardList",
  },
  {
    title: "Automation",
    description:
      "Playwright, Selenium, Appium and REST Assured suites that replace repetitive manual cycles across UI, API and mobile.",
    icon: "Bot",
  },
  {
    title: "CI/CD Quality Gates",
    description:
      "Suites wired into Jenkins with Docker-containerised runs; k6 thresholds and assertions fail the build before defects escape.",
    icon: "Workflow",
  },
  {
    title: "Triage & Reporting",
    description:
      "Defects logged, tracked and verified in Jira — driving re-open rates down and shortening resolution cycles.",
    icon: "Bug",
  },
];
