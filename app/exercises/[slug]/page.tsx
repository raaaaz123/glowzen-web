import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  CircleSlash2,
  Repeat2,
  ShieldAlert,
  Timer,
  TriangleAlert,
} from "lucide-react";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AppCta from "@/components/AppCta";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  exerciseBySlug,
  exercises,
  exercisesForZone,
} from "@/lib/content/exercises";
import { zoneBySlug } from "@/lib/zones";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return exercises.map((exercise) => ({ slug: exercise.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exercise = exerciseBySlug(slug);
  if (!exercise) return {};

  const title = `${exercise.name}: how to do it`;

  return {
    title,
    description: exercise.summary,
    alternates: { canonical: `/exercises/${exercise.slug}` },
    openGraph: {
      title,
      description: exercise.summary,
      url: `/exercises/${exercise.slug}`,
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
  const exercise = exerciseBySlug(slug);
  if (!exercise) notFound();

  const zone = zoneBySlug(exercise.zoneSlug);
  const siblings = exercisesForZone(exercise.zoneSlug).filter(
    (other) => other.slug !== exercise.slug,
  );

  // HowTo is the whole point of this template: a procedure with discrete steps
  // is exactly what assistants quote when someone asks how to do a movement.
  // `supply` and `tool` are stated as empty on purpose — "no equipment" is a
  // real selling point of the practice, not an omission.
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to do the ${exercise.name}`,
    description: exercise.answer,
    totalTime: "PT2M",
    supply: [],
    tool: [],
    step: exercise.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      text: step,
    })),
  }).replace(/</g, "\\u003c");

  const meta = [
    { icon: Timer, label: "Hold", value: exercise.hold },
    { icon: Repeat2, label: "Rounds", value: exercise.reps },
    { icon: CircleSlash2, label: "Equipment", value: "None" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: json }}
      />
      <Nav />
      <main>
        <div className="px-5 py-10 sm:px-8 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <Breadcrumbs
              trail={[
                { name: "Face yoga", href: "/face-yoga" },
                ...(zone
                  ? [{ name: zone.zone, href: `/face-yoga/${zone.slug}` }]
                  : []),
                { name: exercise.name, href: `/exercises/${exercise.slug}` },
              ]}
            />

            <header className="mt-6">
              {zone && (
                <Badge asChild variant="soft" className="text-[11px] tracking-wide uppercase">
                  <Link href={`/face-yoga/${zone.slug}`}>{zone.zone}</Link>
                </Badge>
              )}
              <h1 className="font-display mt-3.5 text-[2.125rem] leading-[1.08] font-bold text-balance sm:text-[2.75rem]">
                {exercise.name}
              </h1>
              <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
                {exercise.answer}
              </p>
            </header>

            {/* One card with three inline stats, rather than three separate
                tiles. Values of very different lengths — "10 seconds per side"
                next to "None" — never sat straight in equal boxes. */}
            <Card className="mt-6">
              <CardContent className="flex flex-wrap gap-x-8 gap-y-4 p-4 sm:px-5">
                {meta.map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5">
                    <span
                      aria-hidden
                      className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent text-rose-deep"
                    >
                      <item.icon className="size-4" />
                    </span>
                    <span>
                      <span className="block text-[11px] font-extrabold tracking-[0.1em] text-ink-muted uppercase">
                        {item.label}
                      </span>
                      <span className="block font-bold">{item.value}</span>
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <section id="steps" className="mt-10 scroll-mt-24">
              <h2 className="font-display text-xl font-bold sm:text-2xl">
                How to do it
              </h2>
              <ol className="mt-5 space-y-3">
                {exercise.steps.map((step, index) => (
                  <li key={step}>
                    <Card>
                      <CardContent className="flex gap-4 p-4 sm:px-5">
                        <span
                          aria-hidden
                          className="gradient-rose flex size-7 shrink-0 items-center justify-center rounded-full text-[13px] font-extrabold text-white"
                        >
                          {index + 1}
                        </span>
                        <span className="leading-relaxed text-ink-soft">
                          {step}
                        </span>
                      </CardContent>
                    </Card>
                  </li>
                ))}
              </ol>
            </section>

            {/* Straight after the steps: the reader now has the whole movement
                for free, which is the moment a timer and a demo mean something. */}
            <AppCta headline={exercise.cta.headline} body={exercise.cta.body} />

            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[17px]">What it works</CardTitle>
                  <CardDescription>{exercise.muscles}</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[17px]">
                    <TriangleAlert
                      aria-hidden
                      className="size-4 text-champagne"
                    />
                    Common mistakes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2.5">
                    {exercise.mistakes.map((mistake) => (
                      <li
                        key={mistake}
                        className="flex gap-2.5 text-[15px] leading-relaxed text-ink-soft"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-rose"
                        />
                        {mistake}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-4 border-champagne/50 bg-champagne/8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[13px] tracking-[0.1em] uppercase">
                  <ShieldAlert aria-hidden className="size-4" />
                  Before you start
                </CardTitle>
                <CardDescription className="text-ink-soft">
                  {exercise.caution}
                </CardDescription>
              </CardHeader>
            </Card>

            {siblings.length > 0 && zone && (
              <section className="mt-10">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                  <h2 className="font-display text-xl font-bold sm:text-2xl">
                    More for the {zone.zone.toLowerCase()}
                  </h2>
                  <Button asChild variant="link" size="sm" className="px-0">
                    <Link href={`/face-yoga/${zone.slug}`}>
                      How to train this area
                      <ArrowUpRight aria-hidden className="size-4" />
                    </Link>
                  </Button>
                </div>
                <Separator className="mt-3" />
                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                  {siblings.map((other) => (
                    <li key={other.slug} className="flex">
                      <Link
                        href={`/exercises/${other.slug}`}
                        className="group flex w-full rounded-2xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                      >
                        <Card className="w-full transition-all group-hover:-translate-y-1 group-hover:border-rose/30 group-hover:shadow-[var(--shadow-card)]">
                          <CardHeader className="flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <CardTitle className="text-[17px] group-hover:text-rose-deep">
                                {other.name}
                              </CardTitle>
                              <ArrowUpRight
                                aria-hidden
                                className="mt-0.5 size-4 shrink-0 text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rose-deep"
                              />
                            </div>
                            <CardDescription>{other.summary}</CardDescription>
                          </CardHeader>
                          <CardFooter className="flex-wrap gap-2">
                            <Badge variant="outline">
                              <Timer aria-hidden />
                              {other.hold}
                            </Badge>
                            <Badge variant="outline">
                              <Repeat2 aria-hidden />
                              {other.reps}
                            </Badge>
                          </CardFooter>
                        </Card>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <AppCta
              variant="panel"
              headline="Knowing the movement is the easy part. Doing it for eight weeks is not."
              body={`You could practise the ${exercise.name} tonight from this page. The question is whether you will still be doing it in March — in the right order, held long enough, on the days it belongs. That is the part GlowZen takes off your hands.`}
            />

            <p className="mt-8 border-t border-border pt-6 text-sm leading-relaxed text-ink-muted">
              GlowZen is a general wellbeing and fitness app for facial
              exercise. Nothing here is medical advice, and it does not
              diagnose, treat or prevent any condition. If a movement hurts,
              stop; if something persists, speak to a doctor or dentist.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
