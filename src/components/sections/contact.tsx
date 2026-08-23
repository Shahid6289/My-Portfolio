"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
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
import { EASE, fadeUp, slideInRight, staggerContainer, VIEWPORT } from "@/lib/motion";

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
 * The form posts to Web3Forms (https://web3forms.com) — a backendless form
 * API for static sites. It needs NEXT_PUBLIC_WEB3FORMS_KEY set (get a free
 * access key at web3forms.com; it's a publishable key, safe to expose
 * client-side). Without the key, submissions fall back to the error state,
 * which offers a direct mailto link — the form never dead-ends.
 */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export function Contact() {
  const [status, setStatus] = React.useState<FormStatus>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: real users never see or fill this field — bots do.
    if (String(data.get("_honey") ?? "").trim().length > 0) return;

    if (!WEB3FORMS_KEY) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          subject: String(data.get("subject") ?? "").trim() || "Portfolio contact",
          message: String(data.get("message") ?? ""),
          from_name: "Portfolio contact form",
        }),
      });
      const result = (await response.json()) as { success?: boolean };
      if (!response.ok || !result.success) {
        throw new Error(`Web3Forms responded with ${response.status}`);
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-12 sm:py-24 lg:py-28">
      {/* Decorative backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]"
      />
      <div aria-hidden="true" className="glow-blob left-1/4 top-0 h-72 w-72 bg-indigo-500/10 dark:bg-indigo-500/20" />
      <div aria-hidden="true" className="glow-blob bottom-10 right-1/4 h-72 w-72 bg-cyan-500/10" />

      <div className="container relative">
        <SectionHeading
          eyebrow="Contact"
          title="Let's work together"
          subtitle="Hiring for an SDET or full-stack role, or have a project in mind? My inbox is always open — I usually reply within a day."
        />

        <div className="grid gap-6 sm:gap-10 lg:grid-cols-5">
          {/* Left: direct channels */}
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="flex flex-col gap-2.5 sm:gap-4 lg:col-span-2"
          >
            {channels.map((channel) => {
              const Icon = contactIcons[channel.icon] ?? Mail;
              const inner = (
                <>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 sm:h-11 sm:w-11">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {channel.label}
                    </span>
                    <span className="block truncate text-sm font-medium text-foreground">
                      {channel.value}
                    </span>
                  </span>
                  {channel.external ? (
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  ) : null}
                </>
              );
              const rowClasses =
                "group glass flex items-center gap-3 rounded-2xl p-3 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 sm:gap-4 sm:p-4";

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
            <Card className="glass p-4 focus-within:border-primary/40 focus-within:shadow-lg focus-within:shadow-primary/10 dark:focus-within:border-primary/40 sm:p-8">
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

                <div className="grid gap-3 sm:grid-cols-2 sm:gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-1.5 block text-sm font-medium sm:mb-2"
                    >
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
                    <label
                      htmlFor="contact-email"
                      className="mb-1.5 block text-sm font-medium sm:mb-2"
                    >
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

                <div className="mt-3 sm:mt-5">
                  <label
                    htmlFor="contact-subject"
                    className="mb-1.5 block text-sm font-medium sm:mb-2"
                  >
                    Subject{" "}
                    <span className="font-normal text-muted-foreground">(optional)</span>
                  </label>
                  <Input
                    id="contact-subject"
                    name="subject"
                    placeholder="What would you like to discuss?"
                  />
                </div>

                <div className="mt-3 sm:mt-5">
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block text-sm font-medium sm:mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    required
                    placeholder="Tell me about the role or project…"
                    className="min-h-[96px] sm:min-h-[120px]"
                  />
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  className="shine mt-4 w-full sm:mt-6"
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

                <p role="status" aria-live="polite" className="mt-3 min-h-5 text-sm sm:mt-4">
                  <AnimatePresence mode="wait" initial={false}>
                    {status === "success" ? (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                        Thanks for reaching out! I&apos;ll get back to you soon.
                      </motion.span>
                    ) : status === "error" ? (
                      <motion.span
                        key="error"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="inline-block text-red-600 dark:text-red-400"
                      >
                        Something went wrong. Please email me directly at{" "}
                        <a
                          href={`mailto:${site.email}`}
                          className="font-medium underline underline-offset-4 hover:text-red-500"
                        >
                          {site.email}
                        </a>
                        .
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </p>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
