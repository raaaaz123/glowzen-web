import BeforeAfter from "./BeforeAfter";

const pills = [
  { label: "8 min/day" },
  { label: "18 guided exercises" },
  { label: "No needles" },
  { label: "Made for you" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-28">
      {/* Decorative wash. aria-hidden: conveys nothing to a screen reader. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-blush/40 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-rose/15 bg-white/70 px-4 py-1.5 text-[13px] font-bold tracking-wide text-rose-deep uppercase">
            Facial fitness, personalised
          </p>

          <h1 className="font-display mt-7 text-[3rem] leading-[1.02] font-semibold text-balance sm:text-[4.25rem]">
            Sculpt, lift &amp; glow —{" "}
            <span className="text-gradient-rose">naturally</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            GlowZen scans your face, builds a plan around the areas you care
            about, and coaches you through it — eight minutes a day, no
            equipment, no procedures.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#get"
              className="gradient-rose rounded-full px-8 py-4 text-base font-bold text-white shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5"
            >
              Start my glow-up →
            </a>
            <a
              href="#how"
              className="rounded-full border border-ink/10 bg-white px-8 py-4 text-base font-bold text-ink transition-colors hover:border-rose/30"
            >
              See how it works
            </a>
          </div>

          <p className="mt-5 text-sm font-semibold text-ink-muted">
            🔒 Free to start · No credit card needed
          </p>

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

        <div className="relative mx-auto w-full max-w-sm">
          <div
            aria-hidden
            className="absolute inset-6 rounded-[3rem] bg-rose/20 blur-3xl"
          />
          <div className="relative">
            <BeforeAfter />
            <p className="mt-4 text-center text-sm font-bold text-ink-soft">
              Drag to compare
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              {[
                { value: "18", label: "Exercises" },
                { value: "7", label: "Face zones" },
                { value: "8 min", label: "A day" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white p-3 shadow-[var(--shadow-card)]"
                >
                  <p className="text-xl font-extrabold text-rose-deep">
                    {stat.value}
                  </p>
                  <p className="text-xs font-bold text-ink-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
