import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AppCta from "@/components/AppCta";
import Breadcrumbs from "@/components/Breadcrumbs";
import { zones } from "@/lib/zones";
import { exercisesForZone } from "@/lib/content/exercises";
import { EXERCISE_COUNT, SITE_URL, ZONE_COUNT } from "@/lib/site";

/**
 * The pillar hub. Its job is to be the one page that links to every zone, so
 * nothing below it is more than two clicks from the home page and crawlers
 * find the whole set from a single entry point.
 */
const TITLE = "Face yoga by area: all 7 zones";
const DESCRIPTION = `A face yoga exercise for every part of your face — ${EXERCISE_COUNT} movements across ${ZONE_COUNT} zones, with technique, muscles worked, how often to practise and when to skip it.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/face-yoga" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/face-yoga",
    type: "website",
  },
};

export default function Page() {
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Face yoga zones",
    numberOfItems: zones.length,
    itemListElement: zones.map((zone, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: zone.zone,
      url: `${SITE_URL}/face-yoga/${zone.slug}`,
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
        <article className="px-5 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs trail={[{ name: "Face yoga", href: "/face-yoga" }]} />

            <h1 className="font-display mt-7 text-4xl leading-[1.08] font-semibold text-balance sm:text-5xl">
              {TITLE}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed font-semibold text-ink">
              Face yoga divides the face into areas, each with its own muscles
              and its own rules. The eye area needs the lightest possible touch;
              the jaw needs the most caution; the forehead mostly needs
              releasing rather than strengthening. Pick the area you care about
              and start there.
            </p>

            <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
              Every page below covers the same ground: the exercises for that
              area, which muscles they work, how often to practise, what to
              avoid, and the questions people actually ask. None of it promises
              you a result — facial exercise is a general wellbeing practice,
              and anyone attaching a guarantee to it is selling something.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {zones.map((zone) => {
                const count = exercisesForZone(zone.slug).length;
                return (
                  <Link
                    key={zone.slug}
                    href={`/face-yoga/${zone.slug}`}
                    className="card-surface overflow-hidden transition-transform hover:-translate-y-0.5"
                  >
                    <div className={`bg-gradient-to-br ${zone.tint} px-7 py-6`}>
                      <h2 className="text-xl font-extrabold">{zone.zone}</h2>
                      <p className="mt-1 text-sm font-bold text-ink-muted">
                        {count} {count === 1 ? "exercise" : "exercises"}
                      </p>
                    </div>
                    <p className="px-7 py-6 leading-relaxed text-ink-soft">
                      {zone.description}
                    </p>
                  </Link>
                );
              })}
            </div>

            <AppCta
              variant="panel"
              headline="Seven areas, and no obvious place to start"
              body={`Reading all ${ZONE_COUNT} of these tells you what exists. It does not tell you which areas your face would benefit from working, in what order, or how to fit them into eight minutes. GlowZen scans your face once and builds the plan from what it finds — then coaches you through it with video and voice.`}
            />

            <div className="mt-14">
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                Start somewhere else
              </h2>
              <ul className="mt-5 space-y-2.5">
                <li>
                  <Link
                    href="/guide"
                    className="font-bold text-rose-deep hover:underline"
                  >
                    Face yoga at home: a beginner&apos;s guide
                  </Link>
                  <span className="text-ink-muted">
                    {" "}
                    — what the practice is, and how to start from nothing.
                  </span>
                </li>
                <li>
                  <Link
                    href="/exercises"
                    className="font-bold text-rose-deep hover:underline"
                  >
                    All {EXERCISE_COUNT} exercises
                  </Link>
                  <span className="text-ink-muted">
                    {" "}
                    — the full catalogue in one list.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
