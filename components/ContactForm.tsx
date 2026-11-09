"use client";

import { useState, type FormEvent } from "react";
import Icon from "@/components/ui/Icon";
import { icons, serviceOptions, site } from "@/lib/site";
import styles from "./ContactForm.module.css";

type Status = "idle" | "submitting" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className={styles.success}>
        <div className={styles.successIcon}>
          <Icon d={icons.check} size={28} stroke="#0E0D0B" strokeWidth={2.6} />
        </div>
        <h3 className={styles.successTitle}>Thanks, we&apos;ve got your request.</h3>
        <p className={styles.successCopy}>
          We&apos;ll reach out soon to schedule your free estimate. Need to talk
          sooner? Call{" "}
          <a href={site.phoneHref} className={styles.successLink}>
            {site.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3 className={styles.title}>Request a free estimate</h3>
      <div className={styles.row}>
        <label className={styles.label}>
          Name
          <input required name="name" autoComplete="name" className={styles.input} />
        </label>
        <label className={styles.label}>
          Phone
          <input
            required
            type="tel"
            name="phone"
            autoComplete="tel"
            className={styles.input}
          />
        </label>
      </div>
      <label className={styles.label}>
        Email
        <input type="email" name="email" autoComplete="email" className={styles.input} />
      </label>
      <label className={styles.label}>
        Type of project
        <select name="service" className={styles.select}>
          {serviceOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label className={styles.label}>
        Tell us about the project
        <textarea name="message" rows={4} className={styles.textarea} />
      </label>
      <button
        type="submit"
        disabled={status === "submitting"}
        aria-busy={status === "submitting"}
        className={styles.submit}
      >
        {status === "submitting" ? "Sending…" : "Send My Request"}
      </button>
      {status === "error" && (
        <p role="alert" className={styles.error}>
          Your request didn&apos;t go through. Please try again or call us at{" "}
          <a href={site.phoneHref} className={styles.successLink}>
            {site.phone}
          </a>
          .
        </p>
      )}
    </form>
  );
}
