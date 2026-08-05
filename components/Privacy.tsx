import Link from "next/link";

const promises = [
  {
    title: "No account, ever",
    body: "No email, no password, no sign-in screen. Your device generates a random identifier and that is the whole of your identity.",
  },
  {
    title: "Photos stay private",
    body: "Progress photos live in private encrypted storage. The app fetches them through links that expire after minutes, so nothing is publicly browsable.",
  },
  {
    title: "Nothing is sold",
    body: "We don't sell, rent or trade your data, and your photos are never used for advertising or to train a model.",
  },
  {
    title: "Delete it in one tap",
    body: "Delete my data removes your plan, history and every photo — from the device and from our storage — immediately.",
  },
];

export default function Privacy() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[var(--radius-hero)] border border-ink/5 bg-white/70 p-8 backdrop-blur-sm sm:p-14">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold tracking-[0.18em] text-rose-deep uppercase">
              Your face, your data
            </p>
            <h2 className="font-display mt-4 text-4xl leading-[1.1] font-semibold text-balance sm:text-5xl">
              Built to know as little about you as possible
            </h2>
            <p className="mt-4 text-lg text-ink-soft">
              Facial photos are sensitive, so the app is designed to hold the
              minimum it needs to work.
            </p>
          </div>

          <dl className="mt-12 grid gap-8 sm:grid-cols-2">
            {promises.map((promise) => (
              <div key={promise.title}>
                <dt className="flex items-center gap-2.5 text-lg font-extrabold">
                  <span
                    aria-hidden
                    className="gradient-rose inline-flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                  >
                    ✓
                  </span>
                  {promise.title}
                </dt>
                <dd className="mt-2 pl-9 text-[15px] leading-relaxed text-ink-soft">
                  {promise.body}
                </dd>
              </div>
            ))}
          </dl>

          <Link
            href="/privacy"
            className="mt-10 inline-block text-[15px] font-bold text-rose-deep underline underline-offset-4"
          >
            Read the full privacy policy →
          </Link>
        </div>
      </div>
    </section>
  );
}
