import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { LAST_UPDATED_ISO } from "@/lib/legal";
import { zones } from "@/lib/zones";
import { exercises } from "@/lib/content/exercises";
import { comparisons } from "@/lib/content/comparisons";

/**
 * Still well under the 50,000-URL limit, so no need for generateSitemaps.
 *
 * The zone and exercise entries are mapped from the same arrays the pages are
 * generated from, so a new entry in the catalogue is indexed automatically and
 * the sitemap cannot list a page that does not exist.
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
      url: `${SITE_URL}/guide`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/face-yoga`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/exercises`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...zones.map((zone) => ({
      url: `${SITE_URL}/face-yoga/${zone.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...exercises.map((exercise) => ({
      url: `${SITE_URL}/exercises/${exercise.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${SITE_URL}/compare`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...comparisons.map((comparison) => ({
      url: `${SITE_URL}/compare/${comparison.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${SITE_URL}/support`,
      lastModified: legalUpdated,
      changeFrequency: "monthly",
      priority: 0.5,
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
