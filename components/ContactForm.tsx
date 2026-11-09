"use client";

import { useState, type FormEvent } from "react";
import Icon from "@/components/ui/Icon";
import { icons, propertyTypes, serviceOptions, site } from "@/lib/site";
import styles from "./ContactForm.module.css";

type Status = "idle" | "submitting" | "sent" | "error";

function RequiredMark() {
  return (
    <span aria-hidden="true" className={styles.required}>
      *
    </span>
  );
}

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
          <span>
            Name:<RequiredMark />
          </span>
          <input required name="name" autoComplete="name" className={styles.input} />
        </label>
        <label className={styles.label}>
          <span>
            Phone:<RequiredMark />
          </span>
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
        <span>
          Email:<RequiredMark />
        </span>
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          className={styles.input}
        />
      </label>
      <fieldset className={styles.fieldset}>
        <legend className={styles.label}>
          <span>
            Property type:<RequiredMark />
          </span>
        </legend>
        <div className={styles.radios}>
          {propertyTypes.map((type) => (
            <label key={type} className={styles.radio}>
              <input required type="radio" name="propertyType" value={type} />
              {type}
            </label>
          ))}
        </div>
      </fieldset>
      <label className={styles.label}>
        <span>
          Type of project:<RequiredMark />
        </span>
        <select required name="service" defaultValue="" className={styles.select}>
          <option value="" disabled>
            Select a project type
          </option>
          {serviceOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label className={styles.label}>
        Tell us about the project:
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
