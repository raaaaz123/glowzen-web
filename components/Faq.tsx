import { ChevronDown } from "lucide-react";

import { faqs } from "@/lib/faqs";

/**
 * Styled as a shadcn Accordion, built on native `<details>`.
 *
 * The visual language is the accordion's — same border rule, same chevron,
 * same type — but Radix's Accordion does not render a closed panel's content
 * at all, and these answers are the visible half of the `FAQPage` markup in
 * `components/JsonLd.tsx`. Structured data whose text is absent from the page
 * is exactly what Google treats as spam, so the content has to be in the HTML
 * whether or not the panel is open.
 *
 * `<details>` gives that for free, plus keyboard and screen-reader behaviour
 * we would otherwise be reimplementing, and no JavaScript at all.
 */
export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-3xl">
        {/* The visible "Questions / The doubts worth having" heading is gone.
            An <h2> stays, screen-reader-only: this section is the visible half
            of the FAQPage markup, and a landmark with no heading at all leaves
            the document outline jumping from the reviews straight into a list
            of questions with nothing naming them. Costs no pixels. */}
        <h2 className="sr-only">Frequently asked questions</h2>

        <div className="border-t border-border">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group border-b border-border [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-left text-[17px] font-bold leading-snug transition-colors hover:text-rose-deep">
                {faq.q}
                <ChevronDown
                  aria-hidden
                  className="mt-1 size-4 shrink-0 text-ink-muted transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <p className="pb-4 leading-relaxed text-ink-soft">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
