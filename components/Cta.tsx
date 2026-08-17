import Image from "next/image";
import AppleIcon from "./AppleIcon";
import { APP_STORE_URL } from "@/lib/site";

/**
 * The closing ask: icon, one line, one button.
 *
 * A support block used to sit under the button — the address, the reply
 * window, and a link to /support — on the reasoning that a reviewer or a stuck
 * user lands here first and "hidden behind a footer link" is not "shown". It
 * was also most of the panel's height. Both of those routes still exist in the
 * Footer, under Legal: Support and Contact, and /support carries the address in
 * full, so nothing became unreachable when this shrank.
 */
export default function Cta() {
  return (
    <section id="get" className="scroll-mt-24 px-5 py-12 sm:px-8 sm:py-16">
      <div className="gradient-rose relative mx-auto max-w-6xl overflow-hidden rounded-[var(--radius-hero)] px-8 py-12 text-center shadow-[var(--shadow-lift)] sm:px-12 sm:py-14">
        {/* The icon is full-bleed violet, and this panel is a violet gradient —
            without the white ring it dissolves into the background. */}
        <Image
          src="/glowzen-icon.png"
          alt=""
          width={64}
          height={64}
          className="mx-auto rounded-[16px] shadow-lg ring-4 ring-white/80"
        />

        <p className="mx-auto mt-5 max-w-lg text-lg text-white/90">
          Eight minutes, before the coffee goes cold. Free to start, no card, no
          account.
        </p>

        <a
          href={APP_STORE_URL}
          className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-base font-extrabold text-rose-ink transition-transform hover:-translate-y-0.5"
        >
          <AppleIcon />
          Download on the App Store
        </a>

        <p className="mt-5 text-sm font-semibold text-white/85">
          iPhone · iOS 17 or later
        </p>
      </div>
    </section>
  );
}
