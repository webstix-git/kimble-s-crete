import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { areaServed, policiesUpdated, services, site, steps } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Readiness: Service Index | Kimble's Crete",
  description:
    "A plain summary of Kimble's Crete's concrete services, service area, hours and contact details for customers, search engines and AI assistants.",
  alternates: { canonical: "/ai-readiness" },
};

const serviceListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Kimble's Crete concrete services",
  itemListElement: services.map((service, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: service.name,
      description: service.desc,
      areaServed,
      provider: {
        "@type": "GeneralContractor",
        name: site.name,
        url: site.url,
        telephone: "+1-815-601-3663",
      },
    },
  })),
};

export default function AiReadinessPage() {
  return (
    <LegalPage
      eyebrow="AI Readiness"
      title="Kimble's Crete service index"
      intro="A plain summary of who we are, what we do and where we work. It's written for customers, search engines and AI assistants that need accurate facts about Kimble's Crete."
      updated={policiesUpdated}
      image="/assets/commercial-entry-steps.jpg"
      imagePosition="center 35%"
      updatedLabel="Last reviewed"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListJsonLd) }}
      />

      <h2>At a glance</h2>
      <dl>
        <dt>Business</dt>
        <dd>{site.name}</dd>
        <dt>What we do</dt>
        <dd>Residential and commercial concrete contractor</dd>
        <dt>Based in</dt>
        <dd>
          {site.street} {site.suite}, {site.cityLine}
        </dd>
        <dt>Experience</dt>
        <dd>{site.yearsInBusiness}+ years of concrete work in Rockford</dd>
        <dt>Service radius</dt>
        <dd>Up to 100 miles from Rockford, IL</dd>
        <dt>Estimates</dt>
        <dd>Free, on-site estimates</dd>
        <dt>Hours</dt>
        <dd>
          {site.hours.days}, {site.hours.time}
        </dd>
        <dt>Phone</dt>
        <dd>
          <a href={site.phoneHref}>{site.phone}</a>
        </dd>
        <dt>Email</dt>
        <dd>
          <a href={site.emailHref}>{site.email}</a>
        </dd>
      </dl>

      <h2>Services</h2>
      {services.map((service) => (
        <section key={service.name}>
          <h3>{service.name}</h3>
          <p>{service.desc}</p>
        </section>
      ))}
      <p>
        <strong>Also available:</strong> shed and garage slabs, footings and steps,
        and concrete repair.
      </p>
      <p>
        <strong>Finishes:</strong> broom, colored and stamped concrete, plus tooled
        borders.
      </p>

      <h2>Service area</h2>
      <p>
        We take residential and commercial concrete work up to 100 miles from
        Rockford, including:
      </p>
      <ul>
        {areaServed.map((area) => (
          <li key={area}>{area}</li>
        ))}
      </ul>

      <h2>How a project works</h2>
      <ul>
        {steps.map((step, i) => (
          <li key={step.title}>
            <strong>{step.title}.</strong>{" "}
            {i === 0
              ? `Call ${site.phone} or request a free estimate on our website.`
              : step.desc}
          </li>
        ))}
      </ul>

      <h2>Pricing</h2>
      <p>
        Every project is priced after an on-site visit, because the size, site
        conditions and finish all affect the cost. Call{" "}
        <a href={site.phoneHref}>{site.phone}</a> to set up a free estimate.
      </p>

      <h2>Find us online</h2>
      <ul>
        <li>
          Website: <a href={site.url}>{site.url.replace("https://", "")}</a>
        </li>
        <li>
          Facebook:{" "}
          <a href={site.facebook} target="_blank" rel="noopener noreferrer">
            facebook.com/kimblescrete
          </a>
        </li>
        <li>
          Yelp:{" "}
          <a href={site.yelp} target="_blank" rel="noopener noreferrer">
            Kimble&apos;s Crete on Yelp
          </a>
        </li>
        <li>
          Google Maps:{" "}
          <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
            Kimble&apos;s Crete in Rockford
          </a>
        </li>
      </ul>
      <p>
        See our <Link href="/ai-policy">AI Policy</Link> for how we use AI tools and how we
        handle your information.
      </p>
    </LegalPage>
  );
}
