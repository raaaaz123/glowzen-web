import Link from "next/link";
import type { LegalDocument } from "@/lib/legal";

export default function LegalPage({ doc }: { doc: LegalDocument }) {
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
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">{doc.intro}</p>

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
                  {paragraph}
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
                      <span className="leading-relaxed">{bullet}</span>
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
