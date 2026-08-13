import AppleIcon from "./AppleIcon";
import InstallButton from "./InstallButton";
import PhoneFrame from "./PhoneFrame";
import { TAGLINE } from "@/lib/site";

/* Benefit, not spec. "18 guided exercises" is a number we care about; "eight
   minutes, before your coffee goes cold" is a thing the reader can picture
   themselves doing tomorrow. */
const pills = [
  { label: "Eight minutes, not an hour" },
  { label: "No needles, no clinic" },
  { label: "Nobody has to know" },
  { label: "Built around your face" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pt-12 pb-14 sm:px-8 sm:pt-16 sm:pb-20">
      {/* Decorative wash. aria-hidden: conveys nothing to a screen reader. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-blush/40 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-8">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-rose/15 bg-white/70 px-4 py-1.5 text-[13px] font-bold tracking-wide text-rose-deep uppercase">
            {TAGLINE}
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
              differentiator in one word. */}
          <h1 className="font-display mt-6 text-[2.75rem] leading-[1.05] font-semibold text-balance sm:text-[4rem]">
            Maximise your glow,{" "}
            <span className="text-gradient-rose">naturally</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
            A face scan, a plan built around it, and eight minutes a day —
            guided by video and voice. No equipment, no clinic, no account.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <InstallButton className="gradient-rose inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-base font-bold text-white shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5">
              <AppleIcon />
              Download app
            </InstallButton>
            <a
              href="#how"
              className="rounded-full border border-ink/10 bg-white px-8 py-4 text-base font-bold text-ink transition-colors hover:border-rose/30"
            >
              See how it works
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-2.5">
            {pills.map((pill) => (
              <li
                key={pill.label}
                className="rounded-full bg-white px-4 py-2 text-sm font-bold text-ink shadow-[var(--shadow-card)]"
              >
                {pill.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Two overlapping phones, tilted, running off the right edge — the
            arrangement that reads as "this is an app" faster than any sentence
            can. The container clips rather than scrolls: `overflow-hidden` on
            the section means the bleed costs no horizontal scrollbar, which is
            the usual way this layout breaks on a phone.

            On small screens the tilt and the overlap are dropped entirely and
            the front phone is centred. A 12-degree rotation that looks
            deliberate at 1200px looks like a rendering fault at 380px. */}
        <div className="relative flex justify-center lg:h-[34rem] lg:justify-end">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-8 rounded-[4rem] bg-rose/20 blur-3xl"
          />

          <PhoneFrame
            src="/screen-dashboard.png"
            alt="GlowZen — today's session, with the plan and streak on one screen"
            sizes="(max-width: 1024px) 0px, 248px"
            className="absolute top-6 right-0 hidden max-w-[224px] rotate-[8deg] opacity-95 lg:block"
          />

          <PhoneFrame
            src="/screen-welcome.png"
            alt="GlowZen — the welcome screen, where you pick your goals and focus areas"
            priority
            className="relative lg:absolute lg:top-16 lg:right-40 lg:-rotate-[6deg]"
          />
        </div>
      </div>
    </section>
  );
}
