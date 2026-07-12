"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "@/components/shared/section-heading";
import { site } from "@/data/site";
import { fadeUp, slideInRight, staggerContainer, VIEWPORT } from "@/lib/motion";

/** Resolves icon names used by the contact channel list below. */
const contactIcons: Record<string, LucideIcon> = {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
};

interface ContactChannel {
  icon: string;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

/** Direct channels — every value is sourced from the central site config. */
const channels: ContactChannel[] = [
  { icon: "Mail", label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: "Phone", label: "Phone", value: site.phone, href: `tel:${site.phone}` },
  { icon: "MapPin", label: "Location", value: site.location },
  {
    icon: "Linkedin",
    label: "LinkedIn",
    value: "Connect with me",
    href: site.socials.linkedin,
    external: true,
  },
  {
    icon: "Github",
    label: "GitHub",
    value: "Browse my code",
    href: site.socials.github,
    external: true,
  },
];

type FormStatus = "idle" | "sending" | "success" | "error";

/**
 * Contact section: direct-channel cards on the left, an AJAX contact form on
 * the right.
 *
 * NOTE: The form posts to FormSubmit (https://formsubmit.co), which requires a
 * one-time email activation — the very first submission sends a confirmation
 * link to {site.email}; until it is clicked, messages are not delivered. An
 * EmailJS-based alternative is documented in the README.
 */
export function Contact() {
  const [status, setStatus] = React.useState<FormStatus>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: real users never see or fill this field — bots do.
    if (String(data.get("_honey") ?? "").trim().length > 0) return;

    setStatus("sending");
    try {
      const response = await fetch("https://formsubmit.co/ajax/" + site.email, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          subject: String(data.get("subject") ?? "").trim() || "Portfolio contact",
          message: String(data.get("message") ?? ""),
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!response.ok) throw new Error(`FormSubmit responded with ${response.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-28">
      {/* Decorative backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]"
      />
      <div aria-hidden="true" className="glow-blob left-1/4 top-0 h-72 w-72 bg-emerald-500/20" />
      <div aria-hidden="true" className="glow-blob bottom-10 right-1/4 h-72 w-72 bg-cyan-500/10" />

      <div className="container relative">
        <SectionHeading
          eyebrow="Contact"
          title="Let's work together"
          subtitle="Hiring for an SDET or full-stack role, or have a project in mind? My inbox is always open — I usually reply within a day."
        />

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Left: direct channels */}
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="flex flex-col gap-4 lg:col-span-2"
          >
            {channels.map((channel) => {
              const Icon = contactIcons[channel.icon] ?? Mail;
              const inner = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {channel.label}
                    </span>
                    <span className="block truncate text-sm font-medium text-foreground">
                      {channel.value}
                    </span>
                  </span>
                </>
              );
              const rowClasses =
                "glass flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10";

              return (
                <motion.div key={channel.label} variants={fadeUp}>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      className={rowClasses}
                      aria-label={`${channel.label}: ${channel.value}`}
                      {...(channel.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={rowClasses}>{inner}</div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right: contact form */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="lg:col-span-3"
          >
            <Card className="glass p-6 sm:p-8">
              <form onSubmit={handleSubmit}>
                {/* Honeypot — visually hidden, ignored by humans, catnip for bots */}
                <div
                  aria-hidden="true"
                  className="absolute h-px w-px overflow-hidden whitespace-nowrap [clip:rect(0,0,0,0)]"
                >
                  <label htmlFor="contact-honey">Leave this field empty</label>
                  <input
                    id="contact-honey"
                    type="text"
                    name="_honey"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-2 block text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="contact-name"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="mb-2 block text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="contact-subject" className="mb-2 block text-sm font-medium">
                    Subject{" "}
                    <span className="font-normal text-muted-foreground">(optional)</span>
                  </label>
                  <Input
                    id="contact-subject"
                    name="subject"
                    placeholder="What would you like to discuss?"
                  />
                </div>

                <div className="mt-5">
                  <label htmlFor="contact-message" className="mb-2 block text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    required
                    placeholder="Tell me about the role or project…"
                  />
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  className="mt-6 w-full"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </Button>

                <p role="status" aria-live="polite" className="mt-4 min-h-5 text-sm">
                  {status === "success" ? (
                    <span className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                      Thanks for reaching out! I&apos;ll get back to you soon.
                    </span>
                  ) : status === "error" ? (
                    <span className="text-red-600 dark:text-red-400">
                      Something went wrong. Please email me directly at{" "}
                      <a
                        href={`mailto:${site.email}`}
                        className="font-medium underline underline-offset-4 hover:text-red-500"
                      >
                        {site.email}
                      </a>
                      .
                    </span>
                  ) : null}
                </p>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
