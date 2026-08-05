import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Everything here is public marketing copy, so every crawler is welcome —
 * including the AI ones. Being quotable by ChatGPT, Claude, Perplexity and
 * Google's AI surfaces is the point of llms.txt and the structured data; a
 * blanket disallow for those agents would undo it.
 *
 * The blocked paths are Next.js build output. They are not secret, they are
 * just noise that dilutes what a crawler learns about the site.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/static/chunks/", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
