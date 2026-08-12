import type { Metadata } from "next";
import Link from "next/link";
import { CircleSlash2, Sparkles, Timer } from "lucide-react";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AppCta from "@/components/AppCta";
import Breadcrumbs from "@/components/Breadcrumbs";
import ExerciseBrowser from "@/components/ExerciseBrowser";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { zones } from "@/lib/zones";
import { exercises } from "@/lib/content/exercises";
import {
  EXERCISE_COUNT,
  SESSION_MINUTES,
  SITE_URL,
  ZONE_COUNT,
} from "@/lib/site";

const TITLE = `All ${EXERCISE_COUNT} face yoga exercises`;
const DESCRIPTION = `The full face yoga catalogue — ${EXERCISE_COUNT} exercises across ${ZONE_COUNT} zones, each with step-by-step technique, the muscles it works, common mistakes and safety notes.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/exercises" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/exercises",
    type: "website",
  },
};

const facts = [
  { icon: Sparkles, label: `${EXERCISE_COUNT} exercises` },
  { icon: Timer, label: `~${SESSION_MINUTES} min a day` },
  { icon: CircleSlash2, label: "No equipment" },
];

export default function Page() {
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Face yoga exercises",
    numberOfItems: exercises.length,
    itemListElement: exercises.map((exercise, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: exercise.name,
      url: `${SITE_URL}/exercises/${exercise.slug}`,
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
            <Breadcrumbs trail={[{ name: "Exercises", href: "/exercises" }]} />

            <header className="mt-6">
              <h1 className="font-display max-w-3xl text-[2.125rem] leading-[1.08] font-bold text-balance sm:text-[3rem]">
                {TITLE}
              </h1>
              <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-soft">
                Every exercise in the GlowZen catalogue, grouped by the part of
                the face it works. Each has its own page with step-by-step
                technique, the muscles involved, the mistakes people make, and
                who should skip it.
              </p>

              <ul className="mt-6 flex flex-wrap items-center gap-2">
                {facts.map((fact) => (
                  <li key={fact.label}>
                    <Badge
                      variant="outline"
                      className="gap-1.5 px-3 py-1.5 text-[13px]"
                    >
                      <fact.icon aria-hidden />
                      {fact.label}
                    </Badge>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button asChild variant="brand" size="lg">
                  <Link href="/face-yoga">Browse by area</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/guide">Start with the guide</Link>
                </Button>
              </div>
            </header>

            <Separator className="my-10" />

            <ExerciseBrowser exercises={exercises} zones={zones} />

            <AppCta
              variant="panel"
              headline="Eighteen exercises, and you need about five of them"
              body="Doing all of these would take half an hour, and most of it would not be work your face needs. GlowZen scans once, picks the movements that suit your goals and the areas you choose, and fits them into about eight minutes a day — with a video demo and a spoken count for each one."
            />

            <p className="mt-10 border-t border-border pt-7 text-sm leading-relaxed text-ink-muted">
              GlowZen is a general wellbeing and fitness app for facial
              exercise. Nothing here is medical advice, and it does not
              diagnose, treat or prevent any condition.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
