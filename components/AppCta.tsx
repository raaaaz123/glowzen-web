import AppleIcon from "./AppleIcon";
import InstallButton from "./InstallButton";
import { MIN_OS } from "@/lib/site";

/**
 * The install prompt used across the content pages.
 *
 * Every caller passes its own `headline` and `body`, and those strings live
 * next to the content they belong to — in the zone and exercise records. That
 * is deliberate. A generic "download GlowZen" repeated under 25 pages is
 * banner-blindness by the second page; a line that names what the app does for
 * *this* movement is a reason to tap. If you add a page, write it a reason.
 *
 * Two variants, and the distinction is about earned attention:
 *   - `inline` sits mid-article, after the reader has been given something
 *     useful for free. Quiet, so it does not read as an interruption.
 *   - `panel`  closes the page, where a full-strength ask is fair.
 *
 * Both carry the same honest platform line. Sending an Android user to the App
 * Store without warning is the sort of small dishonesty that costs more trust
 * than the click is worth.
 */
export default function AppCta({
  headline,
  body,
  variant = "inline",
}: {
  headline: string;
  body: string;
  variant?: "inline" | "panel";
}) {
  if (variant === "panel") {
    return (
      <aside className="gradient-rose relative mt-16 overflow-hidden rounded-[var(--radius-hero)] px-7 py-10 shadow-[var(--shadow-lift)] sm:px-12 sm:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/15 blur-2xl"
        />
        <div className="relative">
          <h2 className="font-display text-2xl font-bold text-balance text-white sm:text-[1.75rem]">
            {headline}
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-white/90">{body}</p>
          <InstallButton className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[15px] font-extrabold text-rose-deep transition-transform hover:-translate-y-0.5">
            <AppleIcon />
            Download GlowZen
          </InstallButton>
          <p className="mt-4 text-sm font-semibold text-white/70">
            iPhone · {MIN_OS} or later · Free to start
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="my-12 rounded-2xl border border-rose/20 bg-blush/25 px-5 py-6 sm:px-7">
      <h2 className="font-bold text-[17px] leading-snug text-balance">
        {headline}
      </h2>
      <p className="mt-2 leading-relaxed text-ink-soft">{body}</p>
      <InstallButton className="gradient-rose mt-5 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-[15px] font-bold text-white transition-transform hover:-translate-y-0.5">
        <AppleIcon />
        Get GlowZen for iPhone
      </InstallButton>
      <p className="mt-3 text-xs font-bold text-ink-muted">
        {MIN_OS} or later · Free to start · No account needed
      </p>
    </aside>
  );
}
