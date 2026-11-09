import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    images: ["/images/hero.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0E0D0B",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: site.name,
  description: site.description,
  url: site.url,
  image: `${site.url}/images/hero.jpg`,
  telephone: "+1-815-601-3663",
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.street,
    addressLocality: "Rockford",
    addressRegion: "IL",
    postalCode: "61107",
    addressCountry: "US",
  },
  hasMap: site.mapsUrl,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
  ],
  areaServed: [
    "Rockford, IL",
    "Loves Park, IL",
    "Machesney Park, IL",
    "Belvidere, IL",
    "Winnebago County, IL",
    "Boone County, IL",
    "Northern Illinois",
    "Beloit, WI",
    "Janesville, WI",
    "Southern Wisconsin",
  ],
  knowsAbout: [
    "Concrete driveways",
    "Concrete patios",
    "Stamped concrete",
    "Decorative concrete",
    "Sidewalks and steps",
    "Foundations and footings",
    "Concrete slabs",
    "Curbs and edging",
    "Concrete repair",
  ],
  sameAs: [site.facebook, site.yelp],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/archivo-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/archivo-narrow-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
