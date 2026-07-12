import {
  ArrowUpRight,
  Github,
  Heart,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { CurrentYear } from "@/components/shared/current-year";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/data/site";

/**
 * Site footer: a get-in-touch call-to-action band, then brand / explore /
 * contact columns, with a copyright bar underneath. Static markup —
 * rendered on the server (CSS-only animation, no client hooks).
 */
export function Footer() {
  const socials = [
    { label: "LinkedIn", href: site.socials.linkedin, Icon: Linkedin, external: true },
    { label: "GitHub", href: site.socials.github, Icon: Github, external: true },
    { label: "Email", href: `mailto:${site.email}`, Icon: Mail, external: false },
  ];

  const contacts = [
    { label: site.email, href: `mailto:${site.email}`, Icon: Mail },
    { label: site.phone, href: `tel:${site.phone.replace(/[^+\d]/g, "")}`, Icon: Phone },
    { label: site.location, Icon: MapPin },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Gradient hairline instead of a flat border */}
      <div aria-hidden="true" className="bg-gradient-brand absolute inset-x-0 top-0 h-px opacity-60" />
      {/* Soft glow behind the CTA band */}
      <div
        aria-hidden="true"
        className="glow-blob left-1/2 top-0 h-56 w-[28rem] -translate-x-1/2 bg-indigo-500/10"
      />

      <div className="container relative">
        {/* CTA band */}
        <div className="flex flex-col items-center gap-5 py-14 text-center sm:py-16">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Let&apos;s ship something <span className="text-gradient">reliable</span> together
          </h2>
          <p className="max-w-md text-sm text-muted-foreground">
            Open to SDET and QA automation roles — remote or Pan India. If quality
            matters to your team, let&apos;s talk.
          </p>
          <a href="#contact" className={buttonVariants({ variant: "gradient", size: "lg" })}>
            Get in touch
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>

        {/* Columns */}
        <div className="grid gap-10 border-t border-border/40 py-12 md:grid-cols-[1.6fr_1fr_1.2fr]">
          {/* Brand */}
          <div className="space-y-4">
            <p className="flex items-center gap-2">
              <span className="text-gradient font-display text-2xl font-bold tracking-tight">
                SP.
              </span>
              <span className="font-display font-semibold">{site.name}</span>
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {site.tagline}
            </p>
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Open to new opportunities
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Explore</h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Get in touch</h3>
            <ul className="space-y-2.5">
              {contacts.map(({ label, href, Icon }) => (
                <li key={label} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {href ? (
                    <a href={href} className="break-all transition-colors hover:text-primary">
                      {label}
                    </a>
                  ) : (
                    label
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center gap-3">
              {socials.map(({ label, href, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="glass rounded-full p-2.5 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary"
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-2 border-t border-border/40 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            &copy; <CurrentYear /> {site.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with
            <Heart className="h-3 w-3 fill-rose-500 text-rose-500" aria-hidden="true" />
            by Shahid Parvez
          </p>
        </div>
      </div>
    </footer>
  );
}
