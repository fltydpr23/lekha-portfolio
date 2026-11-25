"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { ContactFormData, ContactInquiryType } from "@/types";

const INQUIRY_TYPES: { value: ContactInquiryType; label: string }[] = [
  { value: "editorial", label: "Editorial" },
  { value: "commercial", label: "Commercial" },
  { value: "exhibition", label: "Exhibition" },
  { value: "licensing", label: "Licensing" },
  { value: "general", label: "General" },
];

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default function ContactForm() {
  const [isSent, setIsSent] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    defaultValues: { name: "", email: "", inquiryType: "editorial", message: "" },
  });

  // Move focus to the confirmation heading so the change is announced.
  useEffect(() => {
    if (isSent) titleRef.current?.focus();
  }, [isSent]);

  const onSubmit = async (data: ContactFormData) => {
    // Mockup submission — replace with a real endpoint later.
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("Inquiry:", data);
    reset();
    setIsSent(true);
  };

  if (isSent) {
    return (
      <div role="status">
        <p className="label reveal" style={stagger(0)}>
          Received
        </p>
        <h1
          ref={titleRef}
          tabIndex={-1}
          className="contact__title reveal"
          style={stagger(1)}
        >
          Thank you.
        </h1>
        <p className="contact__lede reveal" style={stagger(2)}>
          Your inquiry has been sent. Expect a personal reply within 48 hours.
        </p>
        <div className="sent__actions reveal" style={stagger(3)}>
          <button
            type="button"
            className="link link--quiet label"
            onClick={() => setIsSent(false)}
          >
            Send another inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <header>
        <p className="label reveal" style={stagger(0)}>
          Infos
        </p>
        <h1 className="contact__title reveal" style={stagger(1)}>
          Tell me about your project.
        </h1>
        <p className="contact__lede reveal" style={stagger(2)}>
          For editorial commissions, commercial work, exhibitions and image
          licensing.
        </p>
      </header>

      <form
        className="form"
        onSubmit={handleSubmit(onSubmit)}
        aria-label="Inquiry form"
        noValidate
      >
        <div className="form__row reveal" style={stagger(3)}>
          <div className="field">
            <label htmlFor="name" className="label">
              Name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              className="field__control"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              {...register("name", { required: "Enter your name." })}
            />
            {errors.name && (
              <p id="name-error" className="field__error">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="name@example.com"
              className="field__control"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email", {
                required: "Enter your email address.",
                pattern: {
                  value: EMAIL_PATTERN,
                  message: "Enter an email address like name@example.com.",
                },
              })}
            />
            {errors.email && (
              <p id="email-error" className="field__error">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <fieldset className="choices reveal" style={stagger(4)}>
          <legend className="label">Inquiry type</legend>
          <div className="choices__list">
            {INQUIRY_TYPES.map((type) => (
              <label key={type.value} className="choice">
                <input
                  type="radio"
                  value={type.value}
                  {...register("inquiryType")}
                />
                <span className="choice__mark" aria-hidden="true" />
                <span className="choice__text">{type.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="field reveal" style={stagger(5)}>
          <label htmlFor="message" className="label">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            className="field__control"
            placeholder="Scope, dates, location or print details"
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : undefined}
            {...register("message", { required: "Enter a message." })}
          />
          {errors.message && (
            <p id="message-error" className="field__error">
              {errors.message.message}
            </p>
          )}
        </div>

        <div className="reveal" style={stagger(6)}>
          <button
            type="submit"
            className="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            data-cursor="image"
          >
            <span>{isSubmitting ? "Sending…" : "Send inquiry"}</span>
            <svg
              className="submit__arrow"
              viewBox="0 0 40 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              aria-hidden="true"
            >
              <path d="M0 5h39M35 1l4 4-4 4" />
            </svg>
          </button>
        </div>
      </form>
    </>
  );
}
