import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, Info } from "lucide-react";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AppCta from "@/components/AppCta";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { comparisonBySlug, comparisons } from "@/lib/content/comparisons";
import { SITE_NAME } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return comparisons.map((comparison) => ({ slug: comparison.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comparison = comparisonBySlug(slug);
  if (!comparison) return {};

  return {
    title: comparison.title,
    description: comparison.description,
    alternates: { canonical: `/compare/${comparison.slug}` },
    openGraph: {
      title: comparison.title,
      description: comparison.description,
      url: `/compare/${comparison.slug}`,
      type: "article",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comparison = comparisonBySlug(slug);
  if (!comparison) notFound();

  const others = comparisons.filter((other) => other.slug !== comparison.slug);

  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: comparison.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  }).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: json }}
      />
      <Nav />
      <main>
        <div className="px-5 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <Breadcrumbs
              trail={[
                { name: "Compare", href: "/compare" },
                { name: comparison.title, href: `/compare/${comparison.slug}` },
              ]}
            />

            <header className="mt-6">
              <Badge variant="soft" className="text-[11px] tracking-wide uppercase">
                Face yoga vs {comparison.alternative}
              </Badge>
              <h1 className="font-display mt-3.5 text-[2.125rem] leading-[1.08] font-bold text-balance sm:text-[2.75rem]">
                {comparison.title}
              </h1>
              <p className="mt-4 text-[17px] leading-relaxed font-semibold text-ink">
                {comparison.answer}
              </p>
            </header>

            {comparison.intro.map((paragraph) => (
              <p key={paragraph} className="mt-4 leading-relaxed text-ink-soft">
                {paragraph}
              </p>
            ))}

            {/* The table is the reason this page type exists — it is the part
                an assistant lifts wholesale and the part a reader scans before
                deciding whether to read anything else. `overflow-x-auto` keeps
                it scrolling inside its own box rather than pushing the page
                sideways on a phone. */}
            <section id="at-a-glance" className="mt-12 scroll-mt-24">
              <h2 className="font-display text-xl font-bold sm:text-2xl">
                At a glance
              </h2>
              <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
                <table className="w-full min-w-[34rem] border-collapse text-left text-[15px]">
                  <caption className="sr-only">
                    Face yoga compared with {comparison.alternative}
                  </caption>
                  <thead>
                    <tr className="bg-secondary">
                      <th scope="col" className="px-4 py-3 font-bold">
                        <span className="sr-only">Attribute</span>
                      </th>
                      <th scope="col" className="px-4 py-3 font-bold text-rose-deep">
                        Face yoga
                      </th>
                      <th scope="col" className="px-4 py-3 font-bold capitalize">
                        {comparison.alternative}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.table.map((row) => (
                      <tr key={row.attribute} className="border-t border-border">
                        <th
                          scope="row"
                          className="px-4 py-3 align-top font-bold text-ink-soft"
                        >
                          {row.attribute}
                        </th>
                        <td className="px-4 py-3 align-top">{row.faceYoga}</td>
                        <td className="px-4 py-3 align-top text-ink-soft">
                          {row.other}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <AppCta headline={comparison.cta.headline} body={comparison.cta.body} />

            <section id="which" className="scroll-mt-24">
              <h2 className="font-display text-xl font-bold sm:text-2xl">
                Which one suits you
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[17px]">
                      Face yoga, if…
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2.5">
                      {comparison.chooseFaceYoga.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2.5 text-[15px] leading-relaxed text-ink-soft"
                        >
                          <Check
                            aria-hidden
                            className="mt-1 size-4 shrink-0 text-rose-deep"
                            strokeWidth={3}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Not decoration. A comparison page that never concedes
                    anything reads as an advert, and neither a person nor an
                    assistant quotes an advert. */}
                <Card className="bg-secondary">
                  <CardHeader>
                    <CardTitle className="text-[17px] capitalize">
                      {comparison.alternative}, if…
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2.5">
                      {comparison.chooseOther.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2.5 text-[15px] leading-relaxed text-ink-soft"
                        >
                          <Check
                            aria-hidden
                            className="mt-1 size-4 shrink-0 text-ink-muted"
                            strokeWidth={3}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="verdict" className="mt-12 scroll-mt-24">
              <h2 className="font-display text-xl font-bold sm:text-2xl">
                The honest answer
              </h2>
              <Card className="mt-5 border-champagne/50 bg-champagne/8">
                <CardContent className="flex gap-3.5 p-5">
                  <Info
                    aria-hidden
                    className="mt-0.5 size-5 shrink-0 text-champagne"
                  />
                  <p className="leading-relaxed text-ink-soft">
                    {comparison.verdict}
                  </p>
                </CardContent>
              </Card>
            </section>

            <section id="faq" className="mt-12 scroll-mt-24">
              <h2 className="font-display text-xl font-bold sm:text-2xl">
                Questions people ask
              </h2>
              <div className="mt-5 divide-y divide-border border-t border-border">
                {comparison.faqs.map((faq) => (
                  <div key={faq.q} className="py-5">
                    <h3 className="text-[17px] font-bold leading-snug">
                      {faq.q}
                    </h3>
                    <p className="mt-2 leading-relaxed text-ink-soft">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                <h2 className="font-display text-xl font-bold sm:text-2xl">
                  Other comparisons
                </h2>
                <Button asChild variant="link" size="sm" className="px-0">
                  <Link href="/compare">
                    See all
                    <ArrowUpRight aria-hidden className="size-4" />
                  </Link>
                </Button>
              </div>
              <Separator className="mt-3" />
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {others.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={`/compare/${other.slug}`}
                      className="inline-block rounded-full border border-border bg-white px-4 py-2 text-[15px] font-bold capitalize transition-colors hover:border-rose/30 hover:text-rose-deep"
                    >
                      vs {other.alternative}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <AppCta
              variant="panel"
              headline="Whatever else you choose, this part costs nothing"
              body={`${SITE_NAME} scans your face once, builds a routine from what it finds, and counts you through it in about eight minutes a day. No account, no card, and nothing to undo if you decide it is not for you.`}
            />

            <p className="mt-10 border-t border-border pt-7 text-sm leading-relaxed text-ink-muted">
              {SITE_NAME} is a general wellbeing and fitness app for facial
              exercise. Nothing on this page is medical or dental advice, and it
              does not diagnose, treat or prevent any condition. Treatments and
              devices described here are not ours; for anything clinical, speak
              to a doctor, dentist or the clinician treating you.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
