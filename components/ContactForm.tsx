"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { EASE_OUT_EXPO, useMotionDisabled } from "@/components/motion";
import { site } from "@/data/site";

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;
type SubmissionState = "idle" | "sending" | "success" | "error";

/**
 * Builds the "email me directly" escape hatch, prefilled with everything the
 * visitor already typed so a failed send never costs them the message.
 */
function mailtoFallback(values: Record<Field, string>) {
  const subject = `Portfolio enquiry from ${values.name.trim() || "your site"}`;
  const body = `${values.message.trim()}\n\n— ${values.name.trim()}\n${values.email.trim()}`;
  return `mailto:${site.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

const EMPTY_VALUES: Record<Field, string> = {
  name: "",
  email: "",
  message: "",
};

const LABELS: Record<Field, string> = {
  name: "Your name",
  email: "Email address",
  message: "What are we building?",
};

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  }
  // Deliberately loose: one @, a dot in the domain, no spaces. Anything
  // stricter rejects valid addresses more often than it catches typos.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address, like you@example.com.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Please add a little more detail (at least 10 characters).";
  }

  return errors;
}

/**
 * Contact form.
 *
 * The browser validates the fields, then posts them to the server-side
 * contact endpoint, which sends the message through Resend — so in the happy
 * path the visitor never needs a mail app.
 *
 * When that path fails the form degrades instead of dead-ending: the visitor
 * is offered a `mailto:` prefilled with everything they already typed, so a
 * missing API key or a provider outage costs them a click rather than the
 * whole message. Server wording is only ever shown for 4xx, which is the one
 * case the visitor can actually act on.
 *
 * Errors are announced through `aria-invalid` + `aria-describedby` and are
 * always text — never colour alone.
 */
export default function ContactForm() {
  const [values, setValues] = useState<Record<Field, string>>(EMPTY_VALUES);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submission, setSubmission] = useState<SubmissionState>("idle");
  const [feedback, setFeedback] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const reduceMotion = useMotionDisabled();
  const formRef = useRef<HTMLFormElement>(null);

  const setField = (field: Field, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (submission !== "idle") {
      setSubmission("idle");
      setFeedback("");
    }
    // Re-validate live only after the first submit attempt, so the form
    // doesn't nag while someone is still typing their first character.
    if (submitted) setErrors(validate({ ...values, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length) {
      const first = (["name", "email", "message"] as Field[]).find(
        (f) => found[f],
      );
      if (first) {
        formRef.current
          ?.querySelector<HTMLElement>(`#field-${first}`)
          ?.focus();
      }
      return;
    }

    setSubmission("sending");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        /*
          A 4xx means the visitor can fix it, and the endpoint's own wording
          is already addressed to them. Anything 5xx is the delivery path
          failing — an unconfigured key, a provider outage — which is never
          the visitor's problem to read about, let alone act on. Say so
          plainly and hand them the prefilled mailto instead.
        */
        const theirs = response.status < 500 && result.error;
        setSubmission("error");
        setFeedback(
          theirs ||
            "I couldn’t send that from here. Your message is safe — use the direct email link below and it’ll arrive with everything you typed.",
        );
        return;
      }

      setSubmission("success");
      setFeedback("Message sent — it’s on its way to my inbox.");
      setValues(EMPTY_VALUES);
      setErrors({});
      setHoneypot("");
    } catch {
      /* Offline, DNS, blocked request — same escape hatch. */
      setSubmission("error");
      setFeedback(
        "I couldn’t reach the server. Your message is safe — use the direct email link below and it’ll arrive with everything you typed.",
      );
    }
  };

  const fieldClasses = (field: Field) =>
    `w-full border-2 bg-night-950/60 px-3.5 py-3 text-sm text-ink placeholder:text-ink-faint/70 transition-colors focus:outline-none ${
      errors[field]
        ? "border-web-500"
        : "border-ink/18 focus:border-sense-500"
    }`;

  return (
    <div className="relative">
      <form
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        aria-busy={submission === "sending"}
        className="space-y-5"
      >
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {(["name", "email"] as Field[]).map((field) => (
          <div key={field}>
            <label
              htmlFor={`field-${field}`}
              className="mb-1.5 block font-mono text-micro tracking-[0.18em] text-ink-muted uppercase"
            >
              {LABELS[field]}
            </label>
            <input
              id={`field-${field}`}
              name={field}
              type={field === "email" ? "email" : "text"}
              autoComplete={field === "email" ? "email" : "name"}
              value={values[field]}
              onChange={(e) => setField(field, e.target.value)}
              aria-invalid={Boolean(errors[field])}
              aria-describedby={errors[field] ? `error-${field}` : undefined}
              disabled={submission === "sending"}
              className={fieldClasses(field)}
            />
            {errors[field] && (
              <p
                id={`error-${field}`}
                className="mt-1.5 font-mono text-xs text-web-400"
              >
                {errors[field]}
              </p>
            )}
          </div>
        ))}

        <div>
          <label
            htmlFor="field-message"
            className="mb-1.5 block font-mono text-micro tracking-[0.18em] text-ink-muted uppercase"
          >
            {LABELS.message}
          </label>
          <textarea
            id="field-message"
            name="message"
            rows={5}
            value={values.message}
            onChange={(e) => setField("message", e.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "error-message" : undefined}
            disabled={submission === "sending"}
            className={`${fieldClasses("message")} resize-y`}
          />
          {errors.message && (
            <p
              id="error-message"
              className="mt-1.5 font-mono text-xs text-web-400"
            >
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={submission === "sending"}
          className="sense-ring relative inline-flex w-full items-center justify-center gap-2.5 border-2 border-web-500 bg-web-500 px-6 py-3.5 font-mono text-xs tracking-[0.16em] text-ink uppercase transition-colors hover:border-web-400 hover:bg-web-400 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          {submission === "sending" ? "Sending…" : "Shoot a message"}
        </button>

        {/*
          Success is polite; a failed send is an `alert`, because it needs to
          interrupt — there is an action waiting behind it. Both mount into a
          reserved min-height so neither one shifts the form.
        */}
        <div className="min-h-[1.25rem]">
          {submission === "error" ? (
            <p role="alert" className="font-mono text-xs text-web-400">
              {feedback}
            </p>
          ) : (
            <p
              role="status"
              aria-live="polite"
              className="font-mono text-xs text-sense-400"
            >
              {feedback}
            </p>
          )}
        </div>

        {submission === "error" && (
          <a
            href={mailtoFallback(values)}
            className="inline-flex w-full items-center justify-center gap-2.5 border-2 border-sense-500 px-6 py-3.5 font-mono text-xs tracking-[0.16em] text-sense-400 uppercase transition-colors hover:bg-sense-500/15 sm:w-auto"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Email it to me directly
          </a>
        )}

        <p className="max-w-sm text-xs leading-relaxed text-ink-faint">
          Your message is sent directly through the form. If it can&apos;t be
          delivered, email me at{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-sense-400 underline underline-offset-4 hover:text-sense-500"
          >
            {site.email}
          </a>
          .
        </p>
      </form>

      {/* web-shoot: a strand fires across the panel and lands a THWIP */}
      <AnimatePresence>
        {submission === "success" && !reduceMotion && (
          <motion.div
            key="shoot"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <svg
              viewBox="0 0 400 300"
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              <motion.path
                d="M20 280C120 250 260 120 388 24"
                fill="none"
                stroke="var(--color-sense-400)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.9 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.42, ease: EASE_OUT_EXPO }}
              />
            </svg>
            <motion.span
              className="absolute top-2 right-3 font-display text-2xl text-sense-400 sm:text-3xl"
              style={{
                WebkitTextStroke: "1.5px var(--color-ink-black)",
                paintOrder: "stroke fill",
              }}
              initial={{ opacity: 0, scale: 0.3, rotate: -18 }}
              animate={{ opacity: 1, scale: 1, rotate: -8 }}
              transition={{ type: "spring", stiffness: 600, damping: 15, delay: 0.32 }}
            >
              THWIP!
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
