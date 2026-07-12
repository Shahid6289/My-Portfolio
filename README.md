# Shahid Parvez — Portfolio

A modern, responsive portfolio for **Shahid Parvez** — SDET · QA Automation Engineer — built with Next.js (App Router), TypeScript, Tailwind CSS and Framer Motion.

## ✨ Features

- **Premium UI** — glassmorphism, gradient accents, dot-grid backdrops, floating elements, hover micro-interactions
- **Dark / light mode** with system preference support and persistence (`next-themes`)
- **Framer Motion animations** — scroll reveals, staggered fades, section transitions, all `prefers-reduced-motion`-aware
- **Command palette** — press <kbd>⌘K</kbd> / <kbd>Ctrl K</kbd> to navigate, toggle theme, copy email, download resume
- **Animated particle background**, typing effect, scroll progress bar, back-to-top, loading splash
- **Working contact form** via [FormSubmit](https://formsubmit.co/) — no API keys or backend required
- **SEO-ready** — metadata, Open Graph + Twitter cards, generated OG image, `robots.txt`, `sitemap.xml`, JSON-LD Person schema
- **Accessible** — semantic HTML, keyboard navigation, ARIA labels, focus rings, skip-to-content link
- **Content-driven** — every fact on the page lives in `src/data/*`; components never hardcode resume content

## 🧱 Tech Stack

| Layer     | Choice                                        |
| --------- | --------------------------------------------- |
| Framework | Next.js 15 (App Router) + React 19            |
| Language  | TypeScript (strict)                           |
| Styling   | Tailwind CSS 3.4 + shadcn/ui-style primitives |
| Animation | Framer Motion 11                              |
| Icons     | Lucide React                                  |
| Theming   | next-themes                                   |
| Palette   | cmdk                                          |

## 📁 Project Structure

```
├── public/
│   └── Shahid_Parvez_Resume.pdf   # served by the "Download Resume" buttons
├── src/
│   ├── app/
│   │   ├── layout.tsx             # fonts, metadata, theme provider, JSON-LD
│   │   ├── page.tsx               # section assembly
│   │   ├── globals.css            # design tokens + utility classes
│   │   ├── icon.svg               # favicon (SP monogram)
│   │   ├── opengraph-image.tsx    # generated social share card
│   │   ├── robots.ts / sitemap.ts # SEO
│   ├── components/
│   │   ├── ui/                    # shadcn-style primitives (button, card, badge, …)
│   │   ├── layout/                # navbar, footer, command palette, scroll progress, …
│   │   ├── sections/              # hero, about, skills, experience, projects, …
│   │   ├── effects/               # particles, typewriter
│   │   ├── shared/                # section heading
│   │   └── theme/                 # theme provider + toggle
│   ├── data/                      # ← ALL site content lives here
│   │   ├── site.ts                # name, links, SEO, nav
│   │   ├── about.ts / skills.ts / experience.ts / projects.ts
│   │   └── education.ts / certifications.ts / achievements.ts
│   └── lib/                       # cn() helper + shared motion variants
├── netlify.toml
└── tailwind.config.ts
```

## 🚀 Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## 🔧 Things to Personalize

1. **GitHub links** — your resumes don't list a GitHub profile, so placeholders are used.
   Update `socials.github` in [src/data/site.ts](src/data/site.ts) and the optional
   `github` / `liveDemo` fields per project in [src/data/projects.ts](src/data/projects.ts).
2. **Profile photo** — the hero shows an "SP" monogram placeholder. Drop a photo into
   `public/` and swap the placeholder block in `src/components/sections/hero.tsx`
   (marked with a comment) for a `next/image`.
3. **Certifications** — none are listed on the resumes, so the section auto-hides.
   Add entries in [src/data/certifications.ts](src/data/certifications.ts) and it appears automatically.
4. **Project screenshots** — project cards use gradient placeholders (marked with comments)
   that can be replaced with real screenshots.
5. **Contact form activation** — FormSubmit sends a one-time activation email to
   `devcraft.shahid@gmail.com` on the first submission. Click the link once and the
   form is live. Prefer EmailJS? Swap the `fetch` call in
   `src/components/sections/contact.tsx` for the EmailJS SDK.
6. **Site URL** — set `NEXT_PUBLIC_SITE_URL` after deploying so SEO tags, the sitemap
   and robots.txt point at your real domain.

## 🌐 Deployment

### Vercel (recommended)

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

Or push the repo to GitHub and import it at [vercel.com/new](https://vercel.com/new) — zero config needed.
Then add an environment variable `NEXT_PUBLIC_SITE_URL=https://your-domain.com` in the Vercel dashboard and redeploy.

### Netlify

```bash
npm i -g netlify-cli
netlify init    # link the repo/site (installs @netlify/plugin-nextjs automatically via netlify.toml)
netlify deploy --build --prod
```

Or connect the repo at [app.netlify.com](https://app.netlify.com) — `netlify.toml` already configures the build.

## 🔑 Environment Variables

| Variable               | Required | Purpose                                                      |
| ---------------------- | -------- | ------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | No       | Canonical site URL for SEO/sitemap (falls back to a default) |

No secrets are needed — the contact form runs entirely on FormSubmit's free endpoint.

---

Built with ❤️ by Shahid Parvez
