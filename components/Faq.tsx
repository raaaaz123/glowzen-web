const faqs = [
  {
    q: "Does facial exercise actually work?",
    a: "Facial exercise affects people differently and change is gradual. GlowZen is a general wellbeing and fitness app — it doesn't promise a particular result, and any timeframes in the app are guidance rather than a commitment.",
  },
  {
    q: "How long does a session take?",
    a: "Around eight minutes. Sessions are built from your available time, so a shorter commitment gives you a shorter routine rather than a rushed one.",
  },
  {
    q: "Do I need any equipment?",
    a: "No. Every exercise uses only your hands and your face, so you can practise anywhere with no products, tools or procedures.",
  },
  {
    q: "What happens to my face scan?",
    a: "It is analysed once to estimate the zone scores you see after setup, then stored in private encrypted storage. It is never used to train a model and never shown to another user.",
  },
  {
    q: "Is it safe?",
    a: "Practise gently and ease off anything uncomfortable. If you have a jaw, neck or skin condition, or you are recovering from a procedure, check with a professional first. GlowZen is not medical care and does not diagnose or treat any condition.",
  },
  {
    q: "Can I delete everything?",
    a: "Yes. Delete my data in settings removes your plan, history and every photo from the device and from our storage. It's immediate and can't be undone.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-xs font-extrabold tracking-[0.18em] text-rose-deep uppercase">
            Questions
          </p>
          <h2 className="font-display mt-4 text-4xl leading-[1.1] font-semibold text-balance sm:text-5xl">
            The things people ask first
          </h2>
        </div>

        <div className="mt-12 space-y-3.5">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="card-surface group px-6 py-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-[17px] font-extrabold">
                {faq.q}
                <span
                  aria-hidden
                  className="shrink-0 text-2xl leading-none font-light text-rose-deep transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3.5 text-[15px] leading-relaxed text-ink-soft">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
