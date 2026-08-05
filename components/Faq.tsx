import { faqs } from "@/lib/faqs";

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
