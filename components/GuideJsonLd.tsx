import { GUIDE_DESCRIPTION, GUIDE_TITLE, guideSections } from "@/lib/guide";
import { LAST_UPDATED_ISO } from "@/lib/legal";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * Structured data for the guide.
 *
 * Article rather than HowTo: Google retired HowTo rich results in 2023, so the
 * markup would carry cost with no benefit. BreadcrumbList still renders in the
 * result, and hasPart/anchors give an assistant the section it should quote
 * instead of the whole page.
 */
export default function GuideJsonLd() {
  const url = `${SITE_URL}/guide`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: GUIDE_TITLE,
        description: GUIDE_DESCRIPTION,
        url,
        inLanguage: "en",
        datePublished: LAST_UPDATED_ISO,
        dateModified: LAST_UPDATED_ISO,
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntityOfPage: url,
        about: [
          "Face yoga",
          "Facial exercise",
          "Facial fitness",
          "Looksmaxxing",
        ],
        hasPart: guideSections.map((section) => ({
          "@type": "WebPageElement",
          name: section.heading,
          url: `${url}#${section.id}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: SITE_NAME,
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Guide",
            item: url,
          },
        ],
      },
      // The Organization the two blocks above reference by id. Repeated here
      // because a crawler that only fetches this page never sees the home
      // page's graph.
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/glowzen-icon.png`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
