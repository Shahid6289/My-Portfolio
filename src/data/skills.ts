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
    | "Wrench";
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: "Code2",
    skills: ["Java", "JavaScript", "TypeScript", "SQL"],
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
    skills: ["MySQL", "MongoDB", "Stored Procedures", "Triggers", "Schema & Data Validation"],
  },
  {
    title: "Cloud",
    icon: "Cloud",
    skills: ["AWS EC2", "AWS Lambda", "AWS RDS", "Boto3"],
  },
  {
    title: "CI/CD & DevOps",
    icon: "Workflow",
    skills: ["Jenkins", "Docker", "Git", "GitHub", "Bitbucket", "Linux/Unix CLI"],
  },
  {
    title: "Practices & Tools",
    icon: "Wrench",
    skills: ["Agile / Scrum", "SDLC & STLC", "Jira", "Defect Lifecycle", "Requirement Reviews"],
  },
];
