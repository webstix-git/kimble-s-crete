import type { MetadataRoute } from "next";
import { legalLinks, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...legalLinks.map((link) => ({
      url: `${site.url}${link.href}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
