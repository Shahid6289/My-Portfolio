/** Content for the About section — rewritten professionally, not copied from the resume. */
export const about = {
  paragraphs: [
    "I'm a Software Development Engineer in Test based in Kolkata, currently building quality infrastructure at BestQ Software. My work sits at the intersection of engineering and assurance: I design the automation frameworks — Playwright, Selenium, Appium, REST Assured — that let teams ship faster without shipping regressions.",
    "Right now that means AI Hub — BestQ's intelligent document processing and AI assistant platform. I took its Playwright API regression framework to 98.6% endpoint coverage with AJV schema validation on every response, automated the full async batch lifecycle across five model families, and built an AI guardrail harness that runs adversarial prompts across ten risk categories while telling platform blocks apart from model refusals — alongside PII masking checks across 32 entity types. Testing AI systems means asserting on software that can answer differently every time, and that changes how you design the assertions.",
    "What sets my approach apart is depth across the full stack of quality: I validate everything from UI flows and mobile apps down to API contracts, database schemas and stored procedures, then wire it all into Jenkins CI/CD pipelines with Docker so results stay consistent from laptop to staging.",
    "I also build the tools I test with. I've engineered a protocol-agnostic performance testing framework that load-tests REST, gRPC and WebSocket APIs side by side, and BugSnap — a full-stack bug-reporting platform whose Chrome extension turns a one-click capture into an AI-written, severity-rated GitHub issue. Building on both sides of the quality equation makes me a better engineer on each.",
  ],
  /** Quick-hit stats shown alongside the narrative. All figures come from the resume. */
  stats: [
    { value: "1000+", label: "Manual test cases automated" },
    { value: "40%", label: "Regression time reduced" },
    { value: "35%", label: "API coverage increased" },
    { value: "0", label: "Pipeline-blocking failures in 4 months" },
  ],
};
