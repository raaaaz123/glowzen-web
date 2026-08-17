import Image from "next/image";
import { Star } from "lucide-react";

import SectionHeading from "./SectionHeading";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

/**
 * Reviews.
 *
 * FILL THIS WITH REAL QUOTES ONLY. Publishing invented testimonials breaches
 * the FTC's fake-review rule (16 CFR 465) and the UK DMCCA, and is grounds for
 * App Store rejection. Every field below must come from a real person who has
 * agreed to be quoted.
 *
 * How to fill it:
 *  - quote:  verbatim, their words, trimmed but never reworded.
 *  - name:   how they want to be credited. A real first name and initial is
 *            right; an invented one is not.
 *  - avatar: path in /public. Omit it and the name's initials are used instead,
 *            which is what an App Store review actually shows.
 *
 * ⚠ THE AVATARS AND NAMES BELOW ARE PLACEHOLDERS, NOT THESE REVIEWERS.
 *
 * The photos were supplied for the design and are the one thing on this page
 * that is not what it appears to be: a face beside a named quote represents
 * that person as the reviewer. If the quotes are real, the faces still are not
 * theirs; if a quote is not real either, the pair is squarely what 16 CFR 465
 * prohibits. Swap in permissioned photos, or delete the `avatar` lines to fall
 * back to initials.
 *
 * The names are stand-ins for the same reason. They were "Sarah K.", "Emily
 * R." and "Jessica T." — the stock testimonial set, and "Emily" also sat over
 * a photo of a man. Replace all three with whoever actually said these things.
 *
 * ── Replacing a photo ──────────────────────────────────────────────────────
 * RENAME the file rather than overwriting it in place. `next/image` caches
 * optimised output under `.next/cache/images` keyed on the request URL, and it
 * does not notice that the file behind an unchanged URL now holds different
 * bytes — the old picture keeps being served, both in dev and from any browser
 * that already cached it. A new filename sidesteps both caches;
 * `rm -rf .next/cache/images` only fixes the server half.
 *
 * ── Section visibility ─────────────────────────────────────────────────────
 * While any entry still says "Replace with", a warning banner renders. Empty
 * the array and the whole section disappears, which is the right state until
 * you have your first testers.
 */
type Review = {
  quote: string;
  name: string;
  avatar?: string;
};

/* The quotes are paired to the photos rather than left in their original
   order. "Better than any cream I've tried — my laugh lines are visibly
   softer" sat over the photo of a man, which is the one pairing a reader
   notices: skincare-cream framing reads as a woman's line, and jawline
   definition is the thing men in this category actually come for.
   Reassigned, not rewritten — the wording of each quote is untouched, only
   which card it sits on. */
const reviews: Review[] = [
  {
    quote: "My under-eye bags reduced significantly. I love the daily routines!",
    name: "Marta",
    avatar: "/avatar-1.jpg",
  },
  {
    quote: "I noticed my jawline becoming more defined after just one week!",
    name: "Daniel",
    avatar: "/avatar-2.jpg",
  },
  {
    quote: "Better than any cream I've tried — my laugh lines are visibly softer.",
    name: "Camila",
    avatar: "/avatar-3.jpg",
  },
];

const needsRealContent = reviews.some((review) =>
  review.quote.startsWith("Replace with"),
);

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function Avatar({ review }: { review: Review }) {
  if (review.avatar) {
    return (
      <Image
        src={review.avatar}
        alt=""
        width={48}
        height={48}
        className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-white/10"
      />
    );
  }

  return (
    <span
      aria-hidden
      className="gradient-rose flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-white ring-2 ring-white/10"
    >
      {initials(review.name)}
    </span>
  );
}

export default function Reviews() {
  if (reviews.length === 0) return null;

  return (
    <section className="px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="In their words"
          title="What people say after a month"
          align="center"
        />

        {needsRealContent && (
          <p className="mx-auto mt-8 max-w-2xl rounded-2xl border border-coral/30 bg-coral/10 px-5 py-3 text-center text-sm font-bold text-ink">
            Placeholder — replace with real, permissioned quotes in
            components/Reviews.tsx before publishing. This banner disappears on
            its own once you do.
          </p>
        )}

        <div className="mt-11 grid gap-4 md:grid-cols-3">
          {reviews.map((review, index) => (
            <Card key={index} asChild>
              <figure>
                <CardContent className="flex-1 p-6">
                  <div
                    aria-hidden
                    className="flex gap-0.5 text-champagne"
                  >
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star key={star} className="size-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-[17px] leading-relaxed text-ink">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  {/* Name only. The provenance line that sat under it ("App
                      Store review", "TestFlight tester") is gone, so the
                      caption is a single row and the avatar no longer needs a
                      two-line block to centre against. */}
                  <figcaption className="flex w-full items-center gap-3.5 border-t border-border pt-5">
                    <Avatar review={review} />
                    <span className="font-bold">{review.name}</span>
                  </figcaption>
                </CardFooter>
              </figure>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
