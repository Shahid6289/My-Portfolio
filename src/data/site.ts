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
    "API & Database Testing Specialist",
    "Mobile Test Automation Engineer",
  ],
  tagline:
    "I build the automation frameworks and quality pipelines that let teams ship with confidence — Playwright, Selenium, Appium and API test suites wired into CI/CD.",
  email: "devcraft.shahid@gmail.com",
  phone: "+91-6289883556",
  location: "Kolkata, India · Open to Remote",
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
