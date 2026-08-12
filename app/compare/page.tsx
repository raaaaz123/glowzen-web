import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AppCta from "@/components/AppCta";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { comparisons } from "@/lib/content/comparisons";
import { SITE_URL } from "@/lib/site";

const TITLE = "Face yoga compared: botox, gua sha, mewing and more";
const DESCRIPTION =
  "How facial exercise compares with botulinum toxin, gua sha, microcurrent, facial massage, mewing, jaw exercisers and face tape — mechanism, cost, risk and who each suits.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/compare" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/compare",
    type: "website",
  },
};

export default function Page() {
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Face yoga comparisons",
    numberOfItems: comparisons.length,
    itemListElement: comparisons.map((comparison, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: comparison.title,
      url: `${SITE_URL}/compare/${comparison.slug}`,
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
          <div className="mx-auto max-w-5xl">
            <Breadcrumbs trail={[{ name: "Compare", href: "/compare" }]} />

            <header className="mt-6 max-w-2xl">
              <h1 className="font-display text-[2.125rem] leading-[1.08] font-bold text-balance sm:text-[3rem]">
                {TITLE}
              </h1>
              <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
                Facial exercise is one option among many, and it is not the
                right one for every goal. Each page below sets out what the
                alternative actually does, what it costs, what it risks, and the
                cases where it is the better choice — including the ones where
                that is not face yoga.
              </p>
              <p className="mt-4 leading-relaxed text-ink-soft">
                Every comparison here is against a <em>type</em> of treatment or
                technique rather than any company&apos;s product. Nothing on
                these pages is medical or dental advice.
              </p>
            </header>

            <div className="mt-11 grid gap-4 sm:grid-cols-2">
              {comparisons.map((comparison) => (
                <Link
                  key={comparison.slug}
                  href={`/compare/${comparison.slug}`}
                  className="group flex rounded-2xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  <Card className="w-full transition-all group-hover:-translate-y-1 group-hover:border-rose/30 group-hover:shadow-[var(--shadow-card)]">
                    <CardHeader className="flex-1">
                      <CardTitle className="text-[17px] capitalize group-hover:text-rose-deep">
                        Face yoga vs {comparison.alternative}
                      </CardTitle>
                      <CardDescription>{comparison.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <span className="inline-flex items-center gap-1 text-[15px] font-bold text-rose-deep">
                        Read the comparison
                        <ArrowUpRight aria-hidden className="size-4" />
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>

            <AppCta
              variant="panel"
              headline="The option you can test for free, today"
              body="Most of the things compared here cost money before you know whether a facial routine survives your actual week. GlowZen is the free version of that experiment — one scan, a plan built around your face, and about eight minutes a day."
            />

            <p className="mt-10 border-t border-border pt-7 text-sm leading-relaxed text-ink-muted">
              GlowZen is a general wellbeing and fitness app for facial
              exercise. Nothing here is medical or dental advice, and it does
              not diagnose, treat or prevent any condition. For anything
              clinical, speak to a doctor or dentist.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
