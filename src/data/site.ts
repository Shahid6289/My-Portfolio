/**
 * Central site configuration — every section reads identity, links and
 * SEO strings from here so there is a single place to update them.
 */
export const site = {
  name: "Shahid Parvez",
  firstName: "Shahid",
  /** Short professional title shown under the name. */
  role: "SDET · QA Automation Engineer",
  /** Phrases cycled by the hero typing animation. */
  typingRoles: [
    "Software Development Engineer in Test",
    "QA Automation Engineer",
    "API & Database Testing",
    "Mobile Test Automation",
    "Performance & Security Testing",
  ],
  tagline:
    "I design and scale test automation that ships faster and lasts longer — focusing on frameworks, resilience, and CI/CD integration. With proven success in both fast-paced startups and large enterprises, I help teams move confidently from code-commit to production release.",
  email: "devcraft.shahid@gmail.com",
  phone: "+91-6289883556",
  location: "Kolkata · West Bengal · India",
  /** Public site URL — override with NEXT_PUBLIC_SITE_URL when deployed. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://shahidparvez.vercel.app",
  resumePath: "/Shahid_Parvez_Resume.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/shahid-parvez-8599961b3/",
    github: "https://github.com/Shahid6289",
  },
  /** Section anchors used by the navbar, command palette and footer. */
  nav: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ],
  seo: {
    title: "Shahid Parvez — SDET · QA Automation Engineer",
    description:
      "Portfolio of Shahid Parvez, a Software Development Engineer in Test (SDET) from Kolkata, India. Specialised in Playwright, Selenium, Appium, API & database testing, performance and security testing, and CI/CD quality pipelines.",
    keywords: [
      "Shahid Parvez",
      "SDET",
      "Software Development Engineer in Test",
      "QA Automation Engineer",
      "Test Automation Engineer",
      "Quality Assurance",
      "Playwright",
      "Selenium",
      "Appium",
      "REST Assured",
      "API Testing",
      "Database Testing",
      "Performance Testing",
      "k6",
      "JMeter",
      "gRPC",
      "Kolkata",
    ],
  },
} as const;

export type Site = typeof site;
