import { CONTACT_EMAIL, REPLY_WINDOW } from "@/lib/legal";

/**
 * The support address, made impossible to miss.
 *
 * A reviewer checking the support URL and a user whose camera permission is
 * stuck are both looking for the same thing, and neither should have to read
 * prose to find it. The mailto is prefilled with a subject so replies arrive
 * sorted, and the "include this" line is what turns one exchange into one.
 */
export default function SupportContact() {
  return (
    <div className="mt-10 rounded-[var(--radius-hero)] border border-ink/5 bg-surface/70 p-7 backdrop-blur-sm sm:p-9">
      <p className="text-xs font-extrabold tracking-[0.18em] text-rose-deep uppercase">
        Email support
      </p>

      <a
        href={`mailto:${CONTACT_EMAIL}?subject=GlowZen%20support`}
        className="font-display mt-3 block text-2xl font-semibold break-all text-rose-deep underline underline-offset-4 sm:text-3xl"
      >
        {CONTACT_EMAIL}
      </a>

      <p className="mt-4 leading-relaxed text-ink-soft">
        A person reads every message and replies within {REPLY_WINDOW}. Include
        your iOS version, your device model and a screenshot if something looks
        wrong — that is usually the difference between one reply and four.
      </p>
    </div>
  );
}
