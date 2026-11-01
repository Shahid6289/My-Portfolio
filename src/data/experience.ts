/** Work history rendered as the Experience timeline. */
export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  /**
   * Responsibility / achievement bullets, impact-first.
   *
   * Deliberately kept to ~10 per role: the card renders every bullet from the
   * `sm` breakpoint up, so a longer list turns the timeline into a wall of
   * text. Related points are merged into one bullet rather than appended.
   */
  highlights: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    company: "BestQ Software Pvt. Ltd.",
    role: "SDET",
    duration: "Oct 2025 – Present",
    location: "Remote · Kolkata, India",
    highlights: [
      "Own quality for AI Hub, an intelligent document processing and AI assistant platform: built its Playwright API regression framework across six inference services — 98.6% endpoint coverage, AJV schema validation on every response.",
      "Automated the full async batch lifecycle — create, upload, poll, results, stop/resume — across five model families, with webhook callback testing.",
      "Built an AI guardrail harness running adversarial prompts across ten risk categories, separating platform blocks from model refusals, and verified PII masking across 32 entity types.",
      "Built the Playwright UI suite (Page Object Model) covering train, deploy, infer, review and retrain across four model types, plus tenant onboarding.",
      "Made the suites trustworthy: a shared rate limiter with split 429/5xx retries, per-flow contract tests, network-idle waits instead of sleeps, and builds that fail on silently skipped tests.",
      "Created the QA baseline across 13 modules with a Python (openpyxl) coverage-gap dashboard, and found 60 defects through exploratory testing.",
      "Cut UI regression cycle time ~30%, migrating the legacy Selenium (Java/TestNG) suite to Playwright without losing coverage.",
      "Replaced manual API checks with REST Assured, Postman/Newman and Karate suites, wired into Jenkins on Docker runners alongside PyTest and Appium.",
      "Ran distributed k6 load and spike tests on Kubernetes to set capacity baselines for transaction-heavy services.",
    ],
    technologies: [
      "Playwright",
      "TypeScript",
      "Page Object Model",
      "AJV Schema Validation",
      "REST Assured",
      "Postman / Newman",
      "Karate",
      "Python (PyTest)",
      "Appium",
      "k6",
      "Jenkins",
      "Docker",
      "Kubernetes"
    ],
  },
  {
    company: "GoSky Tech Softwares Pvt. Ltd.",
    role: "SDET Intern",
    duration: "Oct 2024 – Apr 2025",
    location: "Onsite · Kolkata, India (part-time alongside final-year studies)",
    highlights: [
      "Increased REST API test coverage ~35% with functional, negative and edge-case scenarios in REST Assured and Postman across microservices.",
      "Automated UI regression with Selenium (Java) and TestNG on Jenkins, cutting manual regression effort ~40% per cycle.",
      "Ran the automated suites against AWS EC2 test environments, under Git version control.",
      "Tracked defects to closure in Jira across Agile sprints, working with developers through triage, fix and re-verification.",
      "Wrote manual test cases and joined requirement reviews across the SDLC and STLC.",
    ],
    technologies: [
      "Selenium",
      "TestNG",
      "Java",
      "REST Assured",
      "Postman",
      "Jenkins",
      "Git",
      "Amazon Web Services",
      "Jira",
    ],
  },
];
