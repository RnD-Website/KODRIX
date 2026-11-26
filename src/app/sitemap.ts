import type { MetadataRoute } from "next";
import { pages } from "@/data/pages";
export default function sitemap(): MetadataRoute.Sitemap {
  const url = process.env.NEXT_PUBLIC_SITE_URL || "https://kodrix.example.com";
  return [{ url, lastModified: new Date(), changeFrequency: "weekly", priority: 1 }, ...pages.map((p) => ({ url: `${url}/${p.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 }))];
}
