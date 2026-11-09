import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { policiesUpdated, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Kimble's Crete",
  description:
    "How Kimble's Crete collects, uses and protects the information you share through our website and estimate request form.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Privacy Policy"
      title="Privacy Policy"
      intro="This policy explains what information Kimble's Crete collects through this website, how we use it and the choices you have."
      updated={policiesUpdated}
      image="/assets/stamped-wood-plank-patio.jpg"
      imagePosition="center 70%"
    >
      <h2>Information we collect</h2>
      <h3>Information you give us</h3>
      <p>
        When you request an estimate through our form, we ask for your name, phone
        number, email address, whether the project is residential or commercial, the
        type of project and any details you choose to add. If you call or email us,
        we receive whatever you share in that conversation.
      </p>
      <h3>Information collected automatically</h3>
      <p>
        Like most websites, the service that hosts our site records basic technical
        details when you visit, such as your IP address, browser type and the pages
        you view. These records help keep the website running and secure.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To respond to your request and schedule your free estimate.</li>
        <li>To talk with you about your project, pricing and scheduling.</li>
        <li>To complete the work you hire us to do.</li>
        <li>To keep this website working properly and securely.</li>
      </ul>
      <p>
        We don&apos;t sell your personal information, and we don&apos;t use it for
        unrelated marketing.
      </p>

      <h2>When we share information</h2>
      <p>We only share your information in these situations:</p>
      <ul>
        <li>
          With service providers that help us run this website and deliver form
          messages to us, and only as needed to provide that service.
        </li>
        <li>When the law requires it, or to protect our rights and safety.</li>
      </ul>

      <h2>Cookies and content from other companies</h2>
      <p>
        This website doesn&apos;t use its own advertising or analytics cookies. Some
        pages show content from other companies: a Google Maps view of our service
        area and project videos from our Facebook page. When that content loads,
        Google and Meta may collect information such as your IP address and set
        their own cookies under their own policies. You can read the{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Google Privacy Policy
        </a>{" "}
        and the{" "}
        <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer">
          Meta Privacy Policy
        </a>
        .
      </p>
      <p>
        Our site also links to our Facebook and Yelp pages. Those sites have their own
        privacy practices, which this policy doesn&apos;t cover.
      </p>

      <h2>How long we keep information</h2>
      <p>
        We keep estimate requests and project records for as long as we need them to
        serve you, keep business records and meet legal obligations.
      </p>

      <h2>How we protect information</h2>
      <p>
        We take reasonable steps to protect the information you send us. No website
        or email system is completely secure, so please don&apos;t send sensitive
        details such as payment card numbers through our form.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask us to tell you what information we have about you, correct it or
        delete it. Contact us using the details below and we&apos;ll take care of it.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        This website is meant for adults planning concrete work. We don&apos;t
        knowingly collect information from children under 13.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we change how we handle information, we&apos;ll update this page and the
        date at the top.
      </p>

      <h2>Contact us</h2>
      <address>
        <strong>{site.name}</strong>
        <br />
        {site.street}
        <br />
        {site.suite}
        <br />
        {site.cityLine}
        <br />
        Phone: <a href={site.phoneHref}>{site.phone}</a>
        <br />
        Email: <a href={site.emailHref}>{site.email}</a>
      </address>
    </LegalPage>
  );
}
