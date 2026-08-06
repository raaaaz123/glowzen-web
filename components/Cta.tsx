import Image from "next/image";
import Link from "next/link";
import { CONTACT_EMAIL, REPLY_WINDOW } from "@/lib/legal";

export default function Cta() {
  return (
    <section id="get" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="gradient-rose relative mx-auto max-w-6xl overflow-hidden rounded-[var(--radius-hero)] px-8 py-16 text-center shadow-[var(--shadow-lift)] sm:px-14 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/15 blur-2xl"
        />

        <div className="relative">
          {/* The icon is full-bleed pink, and this panel is a rose gradient —
              without the white ring it dissolves into the background. */}
          <Image
            src="/glowzen-icon.png"
            alt=""
            width={88}
            height={88}
            className="mx-auto rounded-[20px] shadow-lg ring-[5px] ring-white/80"
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

          {/* The support address, on the page a reviewer and a stuck user are
              both most likely to land on. Hidden behind a link on the footer
              only is not "shown". */}
          <div className="mt-10 border-t border-white/25 pt-8">
            <p className="text-[15px] font-semibold text-white/90">
              Questions, or something not working? Email{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=GlowZen%20support`}
                className="font-extrabold break-all text-white underline underline-offset-4"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              — a person replies within {REPLY_WINDOW}.
            </p>
            <Link
              href="/support"
              className="mt-3 inline-block text-[15px] font-bold text-white/85 underline underline-offset-4 hover:text-white"
            >
              Read the support page →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
