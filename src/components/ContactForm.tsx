"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "./Icon";

// EmailJS public settings (the same service, template and public key the old site used).
const EMAILJS_URL = "https://api.emailjs.com/api/v1.0/email/send";
const SERVICE_ID = "service_hg0ttpe";
const TEMPLATE_ID = "template_6x1opry";
const PUBLIC_KEY = "DL-E8dje2rOO6v-Ad";

const ORG_TYPES = ["Church or Ministry", "Business", "Non-profit Organisation", "Other"];

const field =
  "mt-2 block w-full rounded-xl border border-line bg-bg px-4 py-3 text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";
const label = "text-sm font-semibold";

type Status = "idle" | "sending" | "sent" | "invalid" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();

    // Honeypot: real people never see or fill this field. Pretend it worked and send nothing.
    if (get("website")) {
      setStatus("sent");
      return;
    }

    const firstName = get("first_name");
    const email = get("email");
    const message = get("message");
    if (!firstName || !email || !message) {
      setStatus("invalid");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(EMAILJS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: SERVICE_ID,
          template_id: TEMPLATE_ID,
          user_id: PUBLIC_KEY,
          template_params: {
            first_name: firstName,
            last_name: get("last_name"),
            email,
            organisation: get("organisation") || "Not provided",
            org_type: get("org_type") || "Not specified",
            message,
          },
        }),
      });
      if (!res.ok) throw new Error(`EmailJS ${res.status}`);
      setStatus("sent");
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" aria-live="polite" className="py-6">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-panel-strong text-accent">
          <Icon name="check" className="h-6 w-6" strokeWidth={2.4} />
        </span>
        <h3 className="mt-4 text-2xl font-bold">Message received.</h3>
        <p className="mt-2 text-muted">Thank you for reaching out. We will be in touch soon.</p>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} className="grid gap-5" aria-describedby="contact-form-status">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-first-name" className={label}>First name <span className="text-accent" aria-hidden="true">*</span></label>
          <input id="cf-first-name" name="first_name" type="text" autoComplete="given-name" placeholder="Your first name" required aria-required="true" className={field} />
        </div>
        <div>
          <label htmlFor="cf-last-name" className={label}>Last name</label>
          <input id="cf-last-name" name="last_name" type="text" autoComplete="family-name" placeholder="Your last name" className={field} />
        </div>
      </div>

      <div>
        <label htmlFor="cf-email" className={label}>Email address <span className="text-accent" aria-hidden="true">*</span></label>
        <input id="cf-email" name="email" type="email" autoComplete="email" placeholder="you@organisation.com" required aria-required="true" className={field} />
      </div>

      <div>
        <label htmlFor="cf-organisation" className={label}>Organisation name</label>
        <input id="cf-organisation" name="organisation" type="text" autoComplete="organization" placeholder="Your church, business, or non-profit" className={field} />
      </div>

      <div>
        <label htmlFor="cf-type" className={label}>Organisation type</label>
        <select id="cf-type" name="org_type" defaultValue="" className={field}>
          <option value="" disabled>Select one</option>
          {ORG_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="cf-message" className={label}>How can we help? <span className="text-accent" aria-hidden="true">*</span></label>
        <textarea id="cf-message" name="message" rows={6} required aria-required="true" placeholder="Tell us a little about your organisation and what you are hoping to achieve with AI." className={field} />
      </div>

      {/* Honeypot for spam bots: hidden from people and screen readers. */}
      <div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p id="contact-form-status" role="status" aria-live="polite" className={status === "invalid" || status === "error" ? "rounded-xl border border-red-400/50 bg-red-500/10 px-4 py-3 text-sm text-ink" : "sr-only"}>
        {status === "invalid" && "Please fill in your name, email, and message before sending."}
        {status === "error" && "Something went wrong. Please try again, or email us at hello@wiseintegrate.com."}
        {sending && "Sending your message."}
      </p>

      <div>
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={sending} aria-busy={sending}>
          {sending ? "Sending…" : <>Send Message <Icon name="arrow" className="h-4 w-4" /></>}
        </button>
        <p className="mt-3 text-sm text-muted">We will never share your information. No spam, ever.</p>
      </div>
    </form>
  );
}
