import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { LAST_UPDATED_ISO } from "@/lib/legal";

/**
 * Three pages, so no need for generateSitemaps or splitting.
 *
 * The legal pages take their lastModified from the documents themselves —
 * a sitemap that claims a page changed when it didn't teaches crawlers to
 * ignore the field.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const legalUpdated = new Date(LAST_UPDATED_ISO);

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: legalUpdated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: legalUpdated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
