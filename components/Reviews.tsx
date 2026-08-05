import Image from "next/image";

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
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold tracking-[0.18em] text-rose-deep uppercase">
            In their words
          </p>
          <h2 className="font-display mt-4 text-4xl leading-[1.1] font-semibold text-balance sm:text-5xl">
            What people say after a month
          </h2>
        </div>

        {needsRealContent && (
          <p className="mx-auto mt-8 max-w-2xl rounded-2xl border border-coral/30 bg-coral/10 px-5 py-3 text-center text-sm font-bold text-ink">
            Placeholder — replace with real, permissioned quotes in
            components/Reviews.tsx before publishing. This banner disappears on
            its own once you do.
          </p>
        )}

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reviews.map((review, index) => (
            <figure key={index} className="card-surface flex flex-col p-8">
              <div aria-hidden className="tracking-widest text-champagne">
                ★★★★★
              </div>

              <blockquote className="mt-4 grow text-[17px] leading-relaxed text-ink">
                “{review.quote}”
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3.5 border-t border-ink/5 pt-5">
                <Avatar review={review} />
                <span>
                  <span className="block font-extrabold">{review.name}</span>
                  <span className="block text-sm font-semibold text-ink-muted">
                    {review.detail}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
