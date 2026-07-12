/**
 * Certifications rendered as cards. The section hides itself automatically
 * while this list is empty.
 *
 * No certifications are listed on the source resumes — add yours here, e.g.:
 *
 * {
 *   name: "ISTQB Certified Tester — Foundation Level",
 *   organization: "ISTQB",
 *   date: "2025",
 *   url: "https://…verification-link…",
 * }
 */
export interface Certification {
  name: string;
  organization: string;
  date: string;
  url?: string;
}

export const certifications: Certification[] = [];
