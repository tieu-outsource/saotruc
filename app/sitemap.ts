import type { MetadataRoute } from "next";
import { cms } from "@/lib/reader";

const BASE = "https://daythoisao.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (await cms.posts())
    .filter((p) => p.entry.published)
    .map((p) => {
      const lastModified = p.entry.date ? new Date(p.entry.date) : undefined;
      return {
        url: `${BASE}/tin-tuc/${p.slug}`,
        ...(lastModified ? { lastModified } : {}),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    });

  const pages: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/tin-tuc`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/lophoc`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/tailieu`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/cua-hang-sao`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/khoa-hoc-quay-san`, changeFrequency: "monthly", priority: 0.8 },
  ];

  return [...pages, ...posts];
}
