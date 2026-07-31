"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send } from "lucide-react";
import { EASE_OUT_EXPO, useMotionDisabled } from "@/components/motion";
import { site } from "@/data/site";

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

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
 * The site is fully static, so there's no server to post to: this validates
 * in the browser, plays the web-shoot, then hands off to the visitor's mail
 * client with the message pre-filled. Everything they typed survives the
 * handoff, and there's a plain mailto fallback underneath if it doesn't.
 *
 * Errors are announced through `aria-invalid` + `aria-describedby` and are
 * always text — never colour alone.
 */
export default function ContactForm() {
  const [values, setValues] = useState<Record<Field, string>>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);
  const reduceMotion = useMotionDisabled();
  const formRef = useRef<HTMLFormElement>(null);

  const setField = (field: Field, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    // Re-validate live only after the first submit attempt, so the form
    // doesn't nag while someone is still typing their first character.
    if (submitted) setErrors(validate({ ...values, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
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

    setSent(true);

    const subject = encodeURIComponent(
      `Portfolio enquiry from ${values.name.trim()}`,
    );
    const body = encodeURIComponent(
      `${values.message.trim()}\n\n—\n${values.name.trim()}\n${values.email.trim()}`,
    );

    // let the web-shoot land before the mail client steals focus
    window.setTimeout(() => {
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    }, 900);
  };

  const fieldClasses = (field: Field) =>
    `w-full border-2 bg-night-950/60 px-3.5 py-3 text-sm text-ink placeholder:text-ink-faint/70 transition-colors focus:outline-none ${
      errors[field]
        ? "border-web-500"
        : "border-ink/18 focus:border-sense-500"
    }`;

  return (
    <div className="relative">
      <form ref={formRef} noValidate onSubmit={handleSubmit} className="space-y-5">
        {(["name", "email"] as Field[]).map((field) => (
          <div key={field}>
            <label
              htmlFor={`field-${field}`}
              className="mb-1.5 block font-mono text-[0.66rem] tracking-[0.18em] text-ink-muted uppercase"
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
              className={fieldClasses(field)}
            />
            {errors[field] && (
              <p
                id={`error-${field}`}
                className="mt-1.5 font-mono text-[0.68rem] text-web-400"
              >
                {errors[field]}
              </p>
            )}
          </div>
        ))}

        <div>
          <label
            htmlFor="field-message"
            className="mb-1.5 block font-mono text-[0.66rem] tracking-[0.18em] text-ink-muted uppercase"
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
            className={`${fieldClasses("message")} resize-y`}
          />
          {errors.message && (
            <p
              id="error-message"
              className="mt-1.5 font-mono text-[0.68rem] text-web-400"
            >
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="sense-ring relative inline-flex w-full items-center justify-center gap-2.5 border-2 border-web-500 bg-web-500 px-6 py-3.5 font-mono text-xs tracking-[0.16em] text-ink uppercase transition-colors hover:border-web-400 hover:bg-web-400 sm:w-auto"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Shoot a message
        </button>

        <p role="status" className="min-h-[1.25rem] font-mono text-[0.7rem] text-sense-400">
          {sent
            ? "Message ready — opening your mail app now."
            : ""}
        </p>

        <p className="text-xs leading-relaxed text-ink-faint">
          This opens your own mail app with the message filled in. Prefer to do
          it yourself?{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-sense-400 underline underline-offset-4 hover:text-sense-500"
          >
            {site.email}
          </a>
        </p>
      </form>

      {/* web-shoot: a strand fires across the panel and lands a THWIP */}
      <AnimatePresence>
        {sent && !reduceMotion && (
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
