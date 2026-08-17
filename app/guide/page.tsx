import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import GuideJsonLd from "@/components/GuideJsonLd";
import HowItWorks from "@/components/HowItWorks";
import { GUIDE_DESCRIPTION, GUIDE_TITLE, guideSections } from "@/lib/guide";

export const metadata: Metadata = {
  title: GUIDE_TITLE,
  description: GUIDE_DESCRIPTION,
  alternates: { canonical: "/guide" },
  keywords: [
    "face yoga at home",
    "face yoga guide",
    "facial exercise guide",
    "face scan",
    "face score",
    "looksmaxxing",
    "jawline exercises",
    "facial fitness",
  ],
  openGraph: {
    title: GUIDE_TITLE,
    description: GUIDE_DESCRIPTION,
    url: "/guide",
    type: "article",
  },
};

export default function Page() {
  return (
    <>
      <GuideJsonLd />
      <Nav />
      <main>
        <article className="px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/"
              className="text-[15px] font-bold text-rose-deep hover:underline"
            >
              ← Back to GlowZen
            </Link>

            <h1 className="font-display mt-8 text-4xl leading-[1.08] font-semibold text-balance sm:text-6xl">
              {GUIDE_TITLE}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              {GUIDE_DESCRIPTION}
            </p>

            {/* A contents list gives the page its own jump links, which is
                what a search result needs to deep-link a section. */}
            <nav aria-label="Contents" className="card-surface mt-10 px-6 py-5">
              <h2 className="text-xs font-extrabold tracking-[0.12em] text-ink-muted uppercase">
                On this page
              </h2>
              <ul className="mt-3.5 space-y-2 text-[15px] font-semibold">
                {guideSections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-ink-soft hover:text-rose-deep"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-14 space-y-12">
              {guideSections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24"
                >
                  <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                    {section.heading}
                  </h2>

                  {section.body.map((paragraph) => (
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

            <aside className="card-surface mt-16 px-7 py-8">
              <h2 className="font-display text-2xl font-semibold">
                Following this with GlowZen
              </h2>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Everything above works with a mirror and no app at all. GlowZen
                exists for the part that is tedious on your own: deciding which
                exercises to do, holding them for the right length of time, and
                remembering what your face looked like eight weeks ago. It
                builds the routine, plays a demonstration with spoken cues, and
                keeps the photos side by side.
              </p>
              <Link
                href="/#get"
                className="gradient-rose mt-6 inline-block rounded-full px-7 py-3.5 text-[15px] font-bold text-white shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5"
              >
                See how it works →
              </Link>
            </aside>
          </div>
        </article>

        {/* Moved off the home page in the lean redesign. It belongs here: the
            guide is the page that explains face yoga in general, and this is
            the four-step version of how GlowZen does it. Sits outside the
            article's `max-w-3xl` because it is a four-column grid — inside the
            measure it would wrap to one column and read as a list. */}
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
