import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { policiesUpdated, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Policy | Kimble's Crete",
  description:
    "How Kimble's Crete uses AI tools, how we handle your information and how AI assistants can get accurate facts about our concrete services.",
  alternates: { canonical: "/ai-policy" },
};

export default function AiPolicyPage() {
  return (
    <LegalPage
      eyebrow="AI Policy"
      title="AI Policy"
      intro="This page explains how Kimble's Crete uses artificial intelligence (AI) tools and how we handle your information when we do."
      updated={policiesUpdated}
      image="/assets/curved-walkway-garden-beds.jpg"
      imagePosition="center 60%"
    >
      <h2>Our approach</h2>
      <p>
        Concrete work is done by people, on site. AI tools may help us with office
        tasks, but they don&apos;t replace the judgment of the crew that walks your
        property, prepares the base and pours your concrete.
      </p>

      <h2>Estimates and project decisions</h2>
      <p>
        Every estimate starts with a visit to your property. Measurements, pricing and
        recommendations come from our team, not from an AI tool.
      </p>

      <h2>Website content</h2>
      <p>
        Some text on this website may be drafted or edited with help from AI writing
        tools. We review it before it&apos;s published. The project photos and videos
        on this site show our own work.
      </p>

      <h2>Your information</h2>
      <p>
        We don&apos;t enter the personal details from your estimate request, such as
        your name, phone number, email address or property address, into public AI
        tools, and we don&apos;t use them to train AI models. Our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link> explains how we handle your
        information in general.
      </p>

      <h2>AI search tools and assistants</h2>
      <p>
        Search engines and AI assistants may read the public pages of this website to
        answer questions about our services. We keep a plain summary of our services,
        service area and contact details on our{" "}
        <Link href="/ai-readiness">AI Readiness</Link> page to help them get the facts
        right.
      </p>
      <p>
        If an AI tool tells you something about Kimble&apos;s Crete, please confirm
        details such as pricing, availability and service area with us directly.
      </p>

      <h2>Questions</h2>
      <p>
        If you have questions about this policy, call us at{" "}
        <a href={site.phoneHref}>{site.phone}</a> or email{" "}
        <a href={site.emailHref}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
