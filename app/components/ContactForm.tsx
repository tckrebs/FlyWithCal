"use client";

import { FormEvent, useState } from "react";

// Submissions go to Netlify Forms, which only works on the deployed site. The
// form is registered by public/__forms.html, so field names must match it.
const FORM_NAME = "contact";
const FORM_ENDPOINT = "/__forms.html";

type Status = "idle" | "sending" | "sent" | "error";

const LABEL_CLASSES = "font-display text-xs text-white";
// Framed like the footer map: black border inside a thin white outline. The
// outline turns accent blue on focus, so keyboard users can see where they are.
const INPUT_CLASSES =
  "w-full rounded-lg border-4 border-[#111010] bg-white px-4 py-3 text-[#111010] outline outline-2 outline-white transition-[outline-color] duration-150 placeholder:text-neutral-500 focus:outline-[#1f3fbf]";

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className={LABEL_CLASSES}>
        {label}
        {!required && <span className="text-neutral-500"> (optional)</span>}
      </span>
      <input
        autoComplete={autoComplete}
        className={INPUT_CLASSES}
        name={name}
        required={required}
        type={type}
      />
    </label>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(
          new FormData(form) as unknown as Record<string, string>,
        ).toString(),
      });
      if (!response.ok) throw new Error(`Form submit failed: ${response.status}`);
      form.reset();
      setStatus("sent");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="font-display text-lg text-white" role="status">
        Thanks! Your message is on its way. Cal will be in touch soon.
      </p>
    );
  }

  return (
    <form
      className="flex max-w-2xl flex-col gap-6"
      name={FORM_NAME}
      onSubmit={handleSubmit}
    >
      <input name="form-name" type="hidden" value={FORM_NAME} />
      {/* Honeypot: hidden from people, but spam bots tend to fill it in. */}
      <p className="hidden">
        <label>
          Don’t fill this out: <input name="bot-field" tabIndex={-1} />
        </label>
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field autoComplete="given-name" label="First name" name="firstName" />
        <Field autoComplete="family-name" label="Last name" name="lastName" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field autoComplete="email" label="Email" name="email" type="email" />
        <Field
          autoComplete="tel"
          label="Phone"
          name="phone"
          required={false}
          type="tel"
        />
      </div>
      <label className="flex flex-col gap-2">
        <span className={LABEL_CLASSES}>Message</span>
        <textarea className={INPUT_CLASSES} name="message" required rows={6} />
      </label>

      {status === "error" && (
        <p className="text-sm text-red-400" role="alert">
          Something went wrong sending your message. Please try again.
        </p>
      )}

      <button
        className="font-display self-start inline-flex items-center justify-center leading-none whitespace-nowrap rounded-full bg-[#111010] px-5 py-3 text-white shadow-[inset_0_0_0_2px_white] transition-colors duration-200 hover:bg-[#1f3fbf] disabled:opacity-60"
        disabled={status === "sending"}
        type="submit"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
