import { NextResponse } from "next/server";
import { site } from "@/data/site";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

/*
  Misconfiguration is an operator problem, not a visitor problem. Log the
  specific cause for whoever owns the deploy and return one opaque 503 — the
  client turns any 5xx into the prefilled `mailto:` fallback, so the visitor
  gets a way through instead of an instruction to set an env var.
*/
function configError(reason: string) {
  console.error(`Contact form misconfigured: ${reason}`);
  return errorResponse("The contact form is temporarily unavailable.", 503);
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return errorResponse("Please send the form again.", 400);
  }

  // Quietly accept bot submissions that fill the hidden honeypot field.
  if (asTrimmedString(payload.website)) {
    return NextResponse.json({ ok: true });
  }

  const name = asTrimmedString(payload.name);
  const email = asTrimmedString(payload.email);
  const message = asTrimmedString(payload.message);

  if (name.length < 2 || name.length > MAX_NAME_LENGTH) {
    return errorResponse("Please enter a valid name.", 400);
  }
  if (email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    return errorResponse("Please enter a valid email address.", 400);
  }
  if (message.length < 10 || message.length > MAX_MESSAGE_LENGTH) {
    return errorResponse("Please add a little more detail to your message.", 400);
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return configError("RESEND_API_KEY is not set");
  }

  const recipient = process.env.CONTACT_TO_EMAIL?.trim() || site.email;
  const sender = process.env.RESEND_FROM_EMAIL?.trim();

  if (!sender) {
    return configError("RESEND_FROM_EMAIL is not set");
  }
  if (!EMAIL_PATTERN.test(recipient)) {
    return configError(`recipient address is not a valid email: ${recipient}`);
  }

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: `Portfolio enquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    });

    if (!resendResponse.ok) {
      const providerError = await resendResponse.text();
      console.error("Resend contact form error:", providerError);
      return errorResponse("The message could not be delivered.", 502);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form request failed:", error);
    return errorResponse("The message could not be delivered.", 502);
  }
}
