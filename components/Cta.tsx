import Image from "next/image";

export default function Cta() {
  return (
    <section id="get" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="gradient-rose relative mx-auto max-w-6xl overflow-hidden rounded-[var(--radius-hero)] px-8 py-16 text-center shadow-[var(--shadow-lift)] sm:px-14 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/15 blur-2xl"
        />

        <div className="relative">
          <Image
            src="/glowzen-icon.png"
            alt=""
            width={88}
            height={88}
            className="mx-auto rounded-[20px] shadow-lg"
          />
          <h2 className="font-display mt-7 text-4xl leading-[1.05] font-semibold text-balance text-white sm:text-6xl">
            Eight minutes a day. Start tonight.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/90">
            Free to start, no credit card, no account to create.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            {/* TODO: swap for the real App Store URL once the listing is live. */}
            <a
              href="#"
              className="rounded-full bg-white px-8 py-4 text-base font-extrabold text-rose-deep transition-transform hover:-translate-y-0.5"
            >
              Download on the App Store
            </a>
          </div>

          <p className="mt-6 text-sm font-semibold text-white/75">
            iPhone · iOS 17 or later
          </p>
        </div>
      </div>
    </section>
  );
}
