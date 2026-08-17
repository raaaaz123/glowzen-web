import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Cloud, Lock, TriangleAlert } from "lucide-react";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AppCta from "@/components/AppCta";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { tools, type Tool } from "@/lib/content/tools";
import { SITE_URL } from "@/lib/site";

/**
 * The shell every tool page renders inside.
 *
 * The five tools have nothing in common as widgets — a timer and a photo
 * comparer share no logic — but the page around them is identical: the
 * answer-first opener, the tool, the explainer, what it cannot do, the
 * questions, and the same structured data. Writing that five times would mean
 * five copies drifting apart, so the widget arrives as `children` and
 * everything else comes from the record in `lib/content/tools.ts`.
 *
 * Two things here are deliberate rather than decorative:
 *
 *   - The limitations block sits *above* the FAQ, not in a footnote. A tool
 *     that produces an output invites the reader to treat it as a verdict, and
 *     the honest qualification has to be somewhere they will actually read.
 *   - `WebApplication` markup describes a free browser tool, with no
 *     `aggregateRating` and no `review`. The same rule as everywhere else on
 *     this site: markup only ever restates what is visible.
 */
export default function ToolPage({
  tool,
  children,
}: {
  tool: Tool;
  children: ReactNode;
}) {
  const others = tools.filter((other) => other.slug !== tool.slug);

  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: tool.title,
        url: `${SITE_URL}/tools/${tool.slug}`,
        description: tool.answer,
        applicationCategory: "HealthApplication",
        applicationSubCategory: "Facial exercise",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "FAQPage",
        mainEntity: tool.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  }).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: json }}
      />
      <Nav />
      <main>
        <article className="px-5 py-10 sm:px-8 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <Breadcrumbs
              trail={[
                { name: "Tools", href: "/tools" },
                { name: tool.name, href: `/tools/${tool.slug}` },
              ]}
            />

            <h1 className="font-display mt-6 text-[2rem] leading-[1.1] font-bold text-balance sm:text-[2.75rem]">
              {tool.title}
            </h1>

            {/* The paragraph an AI Overview lifts, so it stands alone. */}
            <p className="mt-5 text-[17px] leading-relaxed font-semibold text-ink">
              {tool.answer}
            </p>

            {/* Two different marks on purpose. A green padlock over "this one
                sends your text to a server" would be reassurance the sentence
                does not support — the reader should be able to tell the two
                kinds of tool apart at a glance. */}
            <p className="mt-4 flex gap-2.5 text-[15px] leading-relaxed text-ink-soft">
              {tool.ai ? (
                <Cloud aria-hidden className="mt-1 size-4 shrink-0 text-champagne" />
              ) : (
                <Lock aria-hidden className="mt-1 size-4 shrink-0 text-mint" />
              )}
              <span>{tool.privacyNote}</span>
            </p>

            {/* The tool itself, high on the page. Someone who arrived to use it
                should not have to read an essay to reach it — the essay is
                underneath, for the reader (and the crawler) who wants it. */}
            <section id="tool" className="mt-8 scroll-mt-24">
              <h2 className="sr-only">{tool.widgetHeading}</h2>
              {children}
            </section>

            {/* Straight after the tool: the reader has just had the useful part
                for free, which is the only moment an install ask is fair. */}
            <AppCta headline={tool.cta.headline} body={tool.cta.body} />

            {tool.body.map((section) => (
              <section key={section.heading} className="mt-12">
                <h2 className="font-display text-xl font-bold sm:text-2xl">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-4 leading-relaxed text-ink-soft"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            <section id="limitations" className="mt-12 scroll-mt-24">
              <h2 className="font-display text-xl font-bold sm:text-2xl">
                What this tool cannot tell you
              </h2>
              <div className="mt-4 rounded-2xl border border-champagne/45 bg-champagne/8 px-5 py-5">
                <ul className="space-y-2.5">
                  {tool.limitations.map((item) => (
                    <li key={item} className="flex gap-3 text-ink-soft">
                      <span
                        aria-hidden
                        className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-rose"
                      />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section id="faq" className="mt-12 scroll-mt-24">
              <h2 className="font-display text-xl font-bold sm:text-2xl">
                Questions about this tool
              </h2>
              <div className="mt-5 divide-y divide-ink/8 border-t border-ink/8">
                {tool.faqs.map((faq) => (
                  <div key={faq.q} className="py-5">
                    <h3 className="text-[17px] leading-snug font-bold">
                      {faq.q}
                    </h3>
                    <p className="mt-2 leading-relaxed text-ink-soft">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Every tool points back at the guide, and across at the others.
                A tool page that only links to the App Store is a dead end for
                the reader who is not ready to install anything. */}
            <Card className="mt-12">
              <CardContent className="p-5 sm:px-6">
                <div className="flex gap-3">
                  <TriangleAlert
                    aria-hidden
                    className="mt-0.5 size-4 shrink-0 text-champagne"
                  />
                  <p className="leading-relaxed text-ink-soft">
                    New to this? The{" "}
                    <Link
                      href="/guide"
                      className="font-bold text-rose-deep hover:underline"
                    >
                      beginner&rsquo;s guide to face yoga
                    </Link>{" "}
                    covers what the practice is, what it can and cannot do, and
                    how to start without hurting yourself — worth ten minutes
                    before your first session.
                  </p>
                </div>
              </CardContent>
            </Card>

            <nav aria-label="Other tools" className="mt-10">
              <h2 className="text-xs font-extrabold tracking-[0.12em] text-ink-muted uppercase">
                The other free tools
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {others.map((other) => (
                  <li key={other.slug} className="flex">
                    <Link
                      href={`/tools/${other.slug}`}
                      className="group flex w-full items-start justify-between gap-3 rounded-2xl border border-ink/10 bg-surface px-4 py-3.5 transition-colors hover:border-rose/30"
                    >
                      <span>
                        <span className="block font-bold group-hover:text-rose-deep">
                          {other.name}
                        </span>
                        <span className="mt-0.5 block text-[13px] leading-snug text-ink-muted">
                          {other.summary}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="mt-0.5 size-4 shrink-0 text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rose-deep"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <AppCta
              variant="panel"
              headline="A tool in a browser tab is not a habit"
              body={`You can use this whenever you remember to open it, which in practice means for about a week. GlowZen puts the same job on your phone — the plan, the timing, the demonstration and the record of what you have done — and shows up on the days you would otherwise have skipped.`}
            />

            <p className="mt-8 border-t border-border pt-6 text-sm leading-relaxed text-ink-muted">
              GlowZen is a general wellbeing and fitness app for facial
              exercise. Nothing here is medical advice, and it does not
              diagnose, treat or prevent any condition. If a movement hurts,
              stop; if something persists, speak to a doctor or dentist.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
