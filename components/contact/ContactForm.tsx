"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import type { ContactFormData, ContactInquiryType } from "@/types";

const INQUIRY_TYPES: { value: ContactInquiryType; label: string }[] = [
  { value: "editorial", label: "Editorial Commission" },
  { value: "commercial", label: "Commercial Work" },
  { value: "exhibition", label: "Exhibition / Print" },
  { value: "licensing", label: "Image Licensing" },
  { value: "general", label: "General Inquiry" },
];

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form data:", data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Contact form"
          >
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-caption block">
                Name *
              </label>
              <input
                id="name"
                type="text"
                className="form-field"
                placeholder="Your name"
                {...register("name", { required: "Name is required" })}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && (
                <p className="text-2xs text-burgundy mt-1" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-caption block">
                Email *
              </label>
              <input
                id="email"
                type="email"
                className="form-field"
                placeholder="your.email@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p className="text-2xs text-burgundy mt-1" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Inquiry Type */}
            <div className="space-y-2">
              <label htmlFor="inquiryType" className="text-caption block">
                Inquiry Type *
              </label>
              <select
                id="inquiryType"
                className="form-field appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'><path d='m1 1 4 4 4-4' stroke='%238A8580' stroke-width='1'/></svg>")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right center",
                }}
                {...register("inquiryType", { required: "Please select an inquiry type" })}
                aria-invalid={errors.inquiryType ? "true" : "false"}
              >
                <option value="">Select an option</option>
                {INQUIRY_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.inquiryType && (
                <p className="text-2xs text-burgundy mt-1" role="alert">
                  {errors.inquiryType.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-caption block">
                Message *
              </label>
              <textarea
                id="message"
                className="form-field min-h-[120px] resize-none"
                placeholder="Tell me about your project..."
                {...register("message", { required: "Message is required" })}
                aria-invalid={errors.message ? "true" : "false"}
              />
              {errors.message && (
                <p className="text-2xs text-burgundy mt-1" role="alert">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="nav-link text-charcoal flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                <span
                  className="block h-px bg-charcoal transition-all duration-350"
                  style={{ width: isSubmitting ? "0px" : "32px" }}
                />
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            className="py-12 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            role="status"
          >
            <p className="font-fraunces font-light text-2xl text-charcoal mb-3">
              Thank you.
            </p>
            <p className="text-editorial text-ash mb-8">
              Your message has been received. I will reply shortly.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-caption text-fog hover:text-ash transition-colors duration-250"
            >
              ← Send another message
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
