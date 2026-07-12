/** Education entries rendered as a timeline. */
export interface Education {
  degree: string;
  college: string;
  university: string;
  location: string;
  duration: string;
  /** Optional — omit when not published. */
  gpa?: string;
  highlights?: string[];
}

export const education: Education[] = [
  {
    degree: "B.Tech in Electronics & Communication Engineering",
    college: "Dr. Sudhir Chandra Sur Degree Engineering College",
    university: "Maulana Abul Kalam Azad University of Technology (MAKAUT)",
    location: "Kolkata, India",
    duration: "May 2022 – June 2025",
    highlights: [
      "Completed the degree while working part-time as an SDET Intern during the final year.",
    ],
  },
];
