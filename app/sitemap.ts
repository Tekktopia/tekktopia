import type { MetadataRoute } from "next";

const BASE = "https://tekktopialtd.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE,                                   priority: 1.0,  changeFrequency: "weekly"  as const },
    { url: `${BASE}/services`,                     priority: 0.9,  changeFrequency: "weekly"  as const },
    { url: `${BASE}/services/software-development`,priority: 0.85, changeFrequency: "monthly" as const },
    { url: `${BASE}/services/it-support`,          priority: 0.85, changeFrequency: "monthly" as const },
    { url: `${BASE}/services/cybersecurity`,       priority: 0.85, changeFrequency: "monthly" as const },
    { url: `${BASE}/services/cloud-computing`,     priority: 0.85, changeFrequency: "monthly" as const },
    { url: `${BASE}/services/data-analytics`,      priority: 0.85, changeFrequency: "monthly" as const },
    { url: `${BASE}/services/mobile-web-development`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/services/product-design`,      priority: 0.8,  changeFrequency: "monthly" as const },
    { url: `${BASE}/services/emerging-tech`,       priority: 0.8,  changeFrequency: "monthly" as const },
    { url: `${BASE}/services/consultancy`,         priority: 0.8,  changeFrequency: "monthly" as const },
    { url: `${BASE}/about`,                        priority: 0.8,  changeFrequency: "monthly" as const },
    { url: `${BASE}/projects`,                     priority: 0.75, changeFrequency: "weekly"  as const },
    { url: `${BASE}/blog`,                         priority: 0.7,  changeFrequency: "daily"   as const },
    { url: `${BASE}/team`,                         priority: 0.65, changeFrequency: "monthly" as const },
    { url: `${BASE}/careers`,                      priority: 0.65, changeFrequency: "weekly"  as const },
    { url: `${BASE}/contact`,                      priority: 0.7,  changeFrequency: "monthly" as const },
    { url: `${BASE}/faq`,                          priority: 0.6,  changeFrequency: "monthly" as const },
  ];

  return staticPages.map(({ url, priority, changeFrequency }) => ({
    url,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
