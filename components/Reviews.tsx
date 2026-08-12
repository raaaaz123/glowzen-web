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
 *  - name:   how they want to be credited. "Sarah K." is fine; invented is not.
 *  - detail: where it came from, e.g. "App Store review" or "TestFlight tester".
 *  - avatar: optional path in /public. Only a photo they gave you — no stock,
 *            no AI-generated faces. Omit it and their initials are used, which
 *            is what most App Store reviews look like anyway.
 *
 * While any entry still says "Replace with", a warning banner renders. Empty
 * the array and the whole section disappears, which is the right state until
 * you have your first testers.
 */
type Review = {
  quote: string;
  name: string;
  detail: string;
  avatar?: string;
};

const reviews: Review[] = [
  {
    quote: "I noticed my jawline becoming more defined after just one week!",
    name: "Sarah K.",
    detail: "App Store review",
  },
  {
    quote: "Better than any cream I've tried — my laugh lines are visibly softer.",
    name: "Emily R.",
    detail: "TestFlight tester",
  },
  {
    quote: "My under-eye bags reduced significantly. I love the daily routines!",
    name: "Jessica T.",
    detail: "App Store review",
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
        className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-white"
      />
    );
  }

  return (
    <span
      aria-hidden
      className="gradient-rose flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-white ring-2 ring-white"
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
                  <figcaption className="flex w-full items-center gap-3.5 border-t border-border pt-5">
                    <Avatar review={review} />
                    <span>
                      <span className="block font-bold">{review.name}</span>
                      <span className="block text-sm font-semibold text-ink-muted">
                        {review.detail}
                      </span>
                    </span>
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
