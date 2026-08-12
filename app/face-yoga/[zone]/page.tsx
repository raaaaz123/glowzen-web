import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AppCta from "@/components/AppCta";
import Breadcrumbs from "@/components/Breadcrumbs";
import ExerciseCard from "@/components/ExerciseCard";
import { zoneBySlug, zones } from "@/lib/zones";
import { exercisesForZone } from "@/lib/content/exercises";
import { SITE_URL } from "@/lib/site";

/**
 * One page per zone, generated from `lib/zones.ts`.
 *
 * `dynamicParams = false` so a URL outside the catalogue 404s at build time
 * rather than being rendered on demand — there are seven zones and there will
 * only ever be seven, so any other slug is a bad link, not a missing page.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return zones.map((zone) => ({ zone: zone.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ zone: string }>;
}): Promise<Metadata> {
  const { zone: slug } = await params;
  const zone = zoneBySlug(slug);
  if (!zone) return {};

  return {
    title: zone.title,
    description: zone.description,
    alternates: { canonical: `/face-yoga/${zone.slug}` },
    openGraph: {
      title: zone.title,
      description: zone.description,
      url: `/face-yoga/${zone.slug}`,
      type: "article",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ zone: string }>;
}) {
  const { zone: slug } = await params;
  const zone = zoneBySlug(slug);
  if (!zone) notFound();

  const zoneExercises = exercisesForZone(zone.slug);

  // ItemList so the exercise set is machine-readable as a set, and FAQPage for
  // the questions. Both restate what is visible on the page, which is the
  // condition for the markup being eligible at all.
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: `${zone.zone} exercises`,
        numberOfItems: zoneExercises.length,
        itemListElement: zoneExercises.map((exercise, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: exercise.name,
          url: `${SITE_URL}/exercises/${exercise.slug}`,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: zone.faqs.map((faq) => ({
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
        <article className="px-5 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <Breadcrumbs
              trail={[
                { name: "Face yoga", href: "/face-yoga" },
                { name: zone.zone, href: `/face-yoga/${zone.slug}` },
              ]}
            />

            <h1 className="font-display mt-6 text-[2rem] leading-[1.1] font-bold text-balance sm:text-[2.75rem]">
              {zone.title}
            </h1>

            {/* The answer-first paragraph. Sized up because it is the part an
                assistant or an AI Overview lifts, and the part a reader who
                bounces in 8 seconds actually reads. */}
            <p className="mt-5 text-[17px] leading-relaxed font-semibold text-ink">
              {zone.answer}
            </p>

            {zone.intro.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 leading-relaxed text-ink-soft"
              >
                {paragraph}
              </p>
            ))}

            <section id="exercises" className="mt-12 scroll-mt-24">
              <h2 className="font-display text-xl font-bold sm:text-2xl">
                The {zoneExercises.length === 1 ? "exercise" : `${zoneExercises.length} exercises`} for this area
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {zoneExercises.map((exercise) => (
                  <ExerciseCard key={exercise.slug} exercise={exercise} />
                ))}
              </div>
            </section>

            {/* Mid-page, after the reader has been given the full exercise set
                for free. This is the earned moment, not the top of the page. */}
            <AppCta headline={zone.cta.headline} body={zone.cta.body} />

            <section id="muscles" className="mt-12 scroll-mt-24">
              <h2 className="font-display text-xl font-bold sm:text-2xl">
                Which muscles you are working
              </h2>
              <p className="mt-4 leading-relaxed text-ink-soft">
                {zone.muscles}
              </p>
            </section>

            <section id="how-often" className="mt-12 scroll-mt-24">
              <h2 className="font-display text-xl font-bold sm:text-2xl">
                How often to practise
              </h2>
              <p className="mt-4 leading-relaxed text-ink-soft">
                {zone.frequency}
              </p>
            </section>

            <section id="avoid" className="mt-12 scroll-mt-24">
              <h2 className="font-display text-xl font-bold sm:text-2xl">
                What to avoid
              </h2>
              <div className="mt-4 rounded-2xl border border-champagne/45 bg-champagne/8 px-5 py-5">
                <ul className="space-y-2.5">
                  {zone.avoid.map((item) => (
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
                Questions about this area
              </h2>
              <div className="mt-5 divide-y divide-ink/8 border-t border-ink/8">
                {zone.faqs.map((faq) => (
                  <div key={faq.q} className="py-5">
                    <h3 className="font-bold text-[17px] leading-snug">
                      {faq.q}
                    </h3>
                    <p className="mt-2 leading-relaxed text-ink-soft">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <nav aria-label="Other areas" className="mt-12">
              <h2 className="text-xs font-extrabold tracking-[0.12em] text-ink-muted uppercase">
                Other areas
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {zones
                  .filter((other) => other.slug !== zone.slug)
                  .map((other) => (
                    <li key={other.slug}>
                      <Link
                        href={`/face-yoga/${other.slug}`}
                        className="inline-block rounded-full border border-ink/10 bg-white px-4 py-2 text-[15px] font-bold transition-colors hover:border-rose/30 hover:text-rose-deep"
                      >
                        {other.zone}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>

            <p className="mt-10 border-t border-ink/5 pt-7 text-sm leading-relaxed text-ink-muted">
              GlowZen is a general wellbeing and fitness app for facial
              exercise. Nothing here is medical advice, and it does not
              diagnose, treat or prevent any condition. If you have a health
              concern about your face, jaw or neck, speak to a doctor or
              dentist.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
