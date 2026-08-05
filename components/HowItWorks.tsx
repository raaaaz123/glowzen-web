const steps = [
  {
    step: "01",
    title: "Scan your face",
    body: "A single selfie is analysed for tone, definition and symmetry across seven zones. It never leaves your private storage, and it is never shown to anyone else.",
  },
  {
    step: "02",
    title: "Get your plan",
    body: "Answer a few questions — your goals, focus areas, experience and the time you can give — and GlowZen assembles a routine from its exercise library.",
  },
  {
    step: "03",
    title: "Practise daily",
    body: "Each session plays a video demonstration with spoken cues and a timer, so you can follow along hands-free and keep your form honest.",
  },
  {
    step: "04",
    title: "Watch it change",
    body: "Progress photos sit side by side, streaks and badges track consistency, and your zone scores update as you go.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-extrabold tracking-[0.18em] text-rose-deep uppercase">
            How it works
          </p>
          <h2 className="font-display mt-4 text-4xl leading-[1.1] font-semibold text-balance sm:text-5xl">
            Four steps, then eight minutes a day
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            No guesswork about which exercises to do or how long to hold them.
          </p>
        </div>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => (
            <li key={item.step} className="card-surface p-7">
              <span className="gradient-rose inline-flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-extrabold text-white">
                {item.step}
              </span>
              <h3 className="mt-5 text-lg font-extrabold">{item.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
