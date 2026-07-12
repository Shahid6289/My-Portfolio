/** Content for the About section — rewritten professionally, not copied from the resume. */
export const about = {
  paragraphs: [
    "I'm a Software Development Engineer in Test based in Kolkata, currently building quality infrastructure at BestQ Software. My work sits at the intersection of engineering and assurance: I design the automation frameworks — Playwright, Selenium, Appium, REST Assured — that let teams ship faster without shipping regressions.",
    "What sets my approach apart is depth across the full stack of quality: I validate everything from UI flows and mobile apps down to API contracts, database schemas and stored procedures, then wire it all into Jenkins CI/CD pipelines with Docker so results stay consistent from laptop to staging.",
    "I also build the tools I test with. I've engineered BestQ-Perf, a protocol-agnostic performance testing framework that load-tests REST, gRPC and WebSocket APIs side by side, and shipped a full-stack EdTech platform serving 500+ enrollments — experience that makes me a better engineer on both sides of the quality equation.",
  ],
  /** Quick-hit stats shown alongside the narrative. All figures come from the resume. */
  stats: [
    { value: "1000+", label: "Manual test cases automated" },
    { value: "40%", label: "Regression time reduced" },
    { value: "35%", label: "API coverage increased" },
    { value: "0", label: "Pipeline-blocking failures in 4 months" },
  ],
};
