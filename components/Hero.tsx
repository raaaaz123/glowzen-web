import Image from "next/image";
import { Star } from "lucide-react";

import { APP_STORE_RATING, APP_STORE_URL } from "@/lib/site";

export default function Hero() {
  return (
    /* On a laptop the hero is sized to the screen rather than to its contents:
       one viewport, minus the header above it, with everything centred in what
       is left. 4.5rem is the header's measured height — it is a plain static
       bar with no breakpoint of its own, so the number is stable, but it is the
       one thing here that has to change if the header's padding does.

       `svh` rather than `vh` so a mobile browser's collapsing toolbar cannot
       make this taller than the screen it is meant to match. `min-h` rather
       than `h` so a short window or a long translation grows the section
       instead of clipping it. Below lg it stays content-height: a full-screen
       hero on a phone is mostly empty space above the fold. */
    <section className="relative flex flex-col justify-center overflow-hidden px-5 pt-16 pb-16 sm:px-8 sm:pt-24 sm:pb-24 lg:min-h-[calc(100svh-4.5rem)] lg:py-12">
      {/* Was a 1:1 split. The headline runs at 4rem now and "Maximise your
          glow," has to hold one line, which it cannot do in half of max-w-6xl;
          the phones bleed off the right edge anyway, so the space comes out of
          a column that was mostly overflow to begin with. */}
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <div>
          {/* Social proof in the slot the tagline used to hold. One pill, not
              two stacked: the tagline still carries the description in the
              <title> and the meta description, and this is the thing a visitor
              who has never heard of the app actually stops for.

              Visible copy only — deliberately NOT mirrored into JSON-LD as an
              aggregateRating. Google forbids a site marking up ratings of
              itself, and JsonLd.tsx already turns that rule down once. */}
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[13px] font-semibold text-ink">
            <span aria-hidden className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="size-3.5 fill-champagne text-champagne"
                  strokeWidth={0}
                />
              ))}
            </span>
            {APP_STORE_RATING} on the App Store
          </p>

          {/* Short aspirational headline, mechanism moved to the line below —
              the split this category converts on.

              "Glow" rather than "potential": glow is the brand's own word, and
              "maximise your potential" is the sentence a competitor already
              runs, so borrowing it would spend our headline making someone
              else's point.

              It reads as puffery, which is exactly why it is safe. A vague
              aspiration is not a claim anyone has to substantiate, where "look
              5 years younger" would be. "Naturally" carries the no-needles
              differentiator in one word.

              No `text-balance`, unlike every other heading on the site:
              balancing splits "Maximise your glow," across two ragged lines to
              even them up, which is the opposite of what this headline wants —
              one full line, then the accent word alone underneath. */}
          <h1 className="font-display mt-6 text-[2.75rem] leading-[1.02] font-semibold sm:text-[4rem]">
            Maximise your glow,
            <span className="text-gradient-rose block">naturally</span>
          </h1>

          {/* Deliberately two lines, and sized to stay two: 84 characters in a
              max-w-lg column at 18px. Push much past ~115 and it wraps to
              three, which is what the longer version of this line did.

              The reference's own sentence ("see your real potential… maximize
              your looks") is its copy and its framing, so this keeps the shape
              — imperative, three beats, payoff last — and changes the words.
              "Where the potential is" also says something truer about the
              product than "your real potential" does: the scan reports which
              areas are worth your time, which is a claim we can stand behind,
              and it sidesteps the looksmaxxing register the rest of the site
              stays out of.

              Brighter than the `text-ink-soft` this used to be. At 18px on a
              near-black page that grey was legible but receded; `text-ink/85`
              is near-white and still clearly subordinate to the headline. */}
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/85 sm:text-xl">
            Scan your face, see where the potential is, and follow a plan built
            to get you there.
          </p>

          {/* The badge is the only call to action here now. A "See how it
              works" link sat beside it and pointed at /guide#how, which the
              footer still links — the hero asks for the install and nothing
              else. */}
          <div className="mt-8">
            {/* Apple's supplied badge, not a button styled to look like one.
                The App Store guidelines require the artwork be used as issued —
                unmodified, and with clear space around it — so it carries no
                hover transform and no wrapper background. The `blk` variant is
                the one Apple specifies for dark backgrounds. */}
            <a
              href={APP_STORE_URL}
              className="inline-block transition-opacity hover:opacity-85"
            >
              {/* 200x67 keeps the artwork's own 119.66:40 ratio, so the badge
                  scales rather than stretches — Apple's guidelines require it
                  be used as issued. */}
              <Image
                src="/app-store-badge.svg"
                alt="Download GlowZen on the App Store"
                width={200}
                height={67}
                priority
              />
            </a>
          </div>
        </div>

        {/* Three phones fanned around a raised centre — scan result, today's
            routine, progress — so the hero shows the whole loop rather than one
            screen of it.

            Every size here is a percentage of the container rather than a pixel
            width, and there is no breakpoint in the group at all: the fan holds
            its proportions from 320px to 1536px and simply gets smaller. That
            is what keeps all three visible on a phone, where a pixel-sized
            arrangement would either overflow or shrink the outer two to
            nothing. The negative margins are the overlap, also in percent, so
            they scale with everything else.

            The three renders carry their own device bezels, so they are plain
            <Image>s rather than <PhoneFrame>s — wrapping them would draw a
            second phone around the first.

            Widths are 30/37/28, and the middle one is the outlier for a reason:
            the results render is a wider, shorter aspect than the other two, so
            matching the others' width would leave the centre phone *shorter*
            than the ones flanking it and lose the raised-centre read entirely.
            37% is what puts it back on top. The right-hand phone is a little
            narrower than the left so the fan reads as depth rather than as a
            symmetrical row.

            They sum to well under 100% on purpose. A rotated element's bounding
            box is wider than its layout width — at 9 degrees a phone this tall
            gains about a third of its width again — so a fan sized to fill the
            container overflows it once the outer two are tilted. Measured: the
            group lands at ~96% of the container from 320px up. */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative flex w-full max-w-[34rem] items-center justify-center">
            <Image
              src="/screen-today.png"
              alt="GlowZen — today's routine, with the streak, the day's exercises and the daily goal"
              width={853}
              height={1844}
              sizes="(max-width: 640px) 30vw, 165px"
              className="w-[30%] -translate-y-[1%] -rotate-[9deg]"
            />

            <Image
              src="/screen-results.png"
              alt="GlowZen — scan results, scoring jawline, cheekbones, symmetry and skin quality"
              width={901}
              height={1746}
              sizes="(max-width: 640px) 37vw, 205px"
              priority
              className="relative z-10 -mx-[6.5%] w-[37%]"
            />

            <Image
              src="/screen-progress.png"
              alt="GlowZen — a before and after pair from the progress tab"
              width={853}
              height={1844}
              sizes="(max-width: 640px) 28vw, 155px"
              className="w-[28%] -translate-y-[1%] rotate-[9deg]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
