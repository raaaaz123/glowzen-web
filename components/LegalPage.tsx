import Link from "next/link";
import type { ReactNode } from "react";
import { CONTACT_EMAIL } from "@/lib/legal";
import type { LegalDocument } from "@/lib/legal";

/**
 * Turns the contact address into a mailto link wherever it appears in the copy.
 *
 * The alternative is duplicating every sentence that mentions it into markup,
 * which is how the address ends up spelled two ways. Splitting on the constant
 * means the documents stay plain strings and the only address that can be
 * linked is the one the rest of the site already uses.
 */
function linkEmail(text: string): ReactNode {
  const parts = text.split(CONTACT_EMAIL);
  if (parts.length === 1) return text;

  return parts.map((part, index) => (
    <span key={index}>
      {index > 0 && (
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-semibold text-rose-deep underline underline-offset-4"
        >
          {CONTACT_EMAIL}
        </a>
      )}
      {part}
    </span>
  ));
}

/**
 * `lead` sits between the intro and the first heading. Support uses it for the
 * contact card — the address has to be the first thing on the page for someone
 * who arrived stuck, not the last thing after fourteen answers they've already
 * tried.
 */
export default function LegalPage({
  doc,
  lead,
}: {
  doc: LegalDocument;
  lead?: ReactNode;
}) {
  return (
    <article className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-[15px] font-bold text-rose-deep hover:underline"
        >
          ← Back to GlowZen
        </Link>

        <h1 className="font-display mt-8 text-5xl font-semibold sm:text-6xl">
          {doc.title}
        </h1>
        <p className="mt-3 text-sm font-bold text-ink-muted">
          Last updated {doc.updated}
        </p>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">
          {linkEmail(doc.intro)}
        </p>

        {lead}

        <div className="mt-14 space-y-12">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                {section.heading}
              </h2>

              {section.body?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-4 leading-relaxed text-ink-soft"
                >
                  {linkEmail(paragraph)}
                </p>
              ))}

              {section.bullets && (
                <ul className="mt-4 space-y-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-ink-soft">
                      <span
                        aria-hidden
                        className="gradient-rose mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      />
                      <span className="leading-relaxed">
                        {linkEmail(bullet)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
