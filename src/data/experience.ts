/** Work history rendered as the Experience timeline. */
export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  /** Responsibility / achievement bullets, impact-first. */
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
      "Built multi-protocol performance testing capability — measured by per-protocol Apdex and response-time reports under concurrent load — by developing a k6 + TypeScript framework that load-tests REST, gRPC and WebSocket APIs, complemented by baseline load tests with Apache JMeter.",
      "Cut UI regression cycle time by ~30% by building and maintaining a Playwright (TypeScript) automation framework that replaced repetitive manual test cases.",
      "Reduced regression testing time by 40% with a Selenium WebDriver + TestNG UI framework, replacing 200+ manual test cases across sprint cycles.",
      "Improved data integrity across 3 services — zero post-deployment data defects — by authoring SQL stored procedures and assertion scripts validating schema consistency and business logic.",
      "Expanded mobile coverage with Appium suites for Android and iOS, cutting manual mobile regression effort by 50%.",
      "Achieved zero pipeline-blocking failures over 4 months by integrating automated suites into Jenkins CI/CD with Docker-containerised execution.",
      "Strengthened API reliability by validating REST payloads, status codes, headers and auth flows with Postman and REST Assured.",
      "Validated OWASP Top 10 risk areas (XSS, SQL injection, auth flaws) with Burp Suite, reducing security defect leakage into production.",
    ],
    technologies: [
      "Playwright",
      "k6",
      "Selenium",
      "TestNG",
      "Appium",
      "REST Assured",
      "Postman",
      "gRPC",
      "WebSocket",
      "JMeter",
      "Burp Suite",
      "Jenkins",
      "Docker",
      "SQL",
      "Jira",
    ],
  },
  {
    company: "GoSky Tech Softwares Pvt. Ltd.",
    role: "SDET Intern",
    duration: "Oct 2024 – Apr 2025",
    location: "Onsite · Kolkata, India (part-time alongside final-year studies)",
    highlights: [
      "Increased REST API test coverage by ~35% by executing functional and edge-case scenarios with REST Assured and Postman across microservices.",
      "Validated zero data loss in a legacy-to-microservices migration by writing SQL queries and stored procedures asserting row-level accuracy post-migration.",
      "Reduced manual regression effort by ~40% by automating regression scripts and integrating them into Jenkins pipelines under Git version control.",
      "Built Appium test scripts for Android mobile regression and wired them into Jenkins, cutting manual mobile QA time by 40%.",
      "Automated AWS infrastructure tasks with Boto3 and Lambda, validating environment state through SQL assertions on RDS — managed via the Linux CLI.",
      "Contributed to release quality by writing manual test cases and participating in requirement reviews across the SDLC and STLC.",
    ],
    technologies: [
      "REST Assured",
      "Postman",
      "Appium",
      "Jenkins",
      "Git",
      "AWS Lambda",
      "AWS RDS",
      "Boto3",
      "SQL",
      "Linux",
    ],
  },
];
