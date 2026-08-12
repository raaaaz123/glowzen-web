import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export type Crumb = { name: string; href: string };

/**
 * Visible breadcrumb trail plus the matching `BreadcrumbList` markup.
 *
 * Both come from one array so the markup cannot describe a path different from
 * the one on screen — Google treats a mismatch between structured data and
 * visible content as spam, and a breadcrumb is the easiest place to drift.
 *
 * The trail always starts at the site root, so callers pass only the segments
 * below it. The final crumb renders as plain text rather than a link, because
 * linking a page to itself is noise for anyone tabbing through.
 */
export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const full: Crumb[] = [{ name: "Home", href: "/" }, ...trail];

  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: full.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.href === "/" ? "" : crumb.href}`,
    })),
  }).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: json }}
      />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-bold text-ink-muted">
          {full.map((crumb, index) => {
            const last = index === full.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-ink-soft">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.href} className="hover:text-rose-deep">
                    {crumb.name}
                  </Link>
                )}
                {!last && <span aria-hidden>/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
