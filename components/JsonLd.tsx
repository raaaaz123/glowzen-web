import { faqs } from "@/lib/faqs";
import { CONTACT_EMAIL } from "@/lib/legal";
import {
  APP_STORE_URL,
  DESCRIPTION,
  MIN_OS,
  SITE_NAME,
  SITE_URL,
  TAGLINE,
} from "@/lib/site";

/**
 * Structured data for the home page.
 *
 * Deliberately absent: aggregateRating and Review. Google's guidelines forbid
 * a site marking up reviews of itself, and inventing a star rating to win a
 * rich result is the same offence as inventing a testimonial. When the App
 * Store listing has real ratings, link to them — don't restate them here.
 *
 * Every claim below also appears in the visible copy, which is the condition
 * for the markup being eligible at all.
 */
export default function JsonLd() {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/glowzen-icon.png`,
      email: CONTACT_EMAIL,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "MobileApplication",
      "@id": `${SITE_URL}/#app`,
      name: SITE_NAME,
      alternateName: `${SITE_NAME} — ${TAGLINE}`,
      description: DESCRIPTION,
      applicationCategory: "HealthApplication",
      applicationSubCategory: "Facial exercise",
      operatingSystem: `${MIN_OS} or later`,
      // The listing URL is empty until the app ships; omit the key rather than
      // emitting an empty string, which validators flag.
      ...(APP_STORE_URL ? { installUrl: APP_STORE_URL } : {}),
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ];

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph })
    // A literal "</script>" inside the payload would close the tag early. None
    // of the copy contains one today; escaping means none ever can.
    .replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
