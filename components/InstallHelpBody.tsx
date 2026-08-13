"use client";

import * as React from "react";
import Link from "next/link";
import { Check, Copy, MoreHorizontal } from "lucide-react";

import type { InstallEnvironment } from "@/lib/in-app-browser";
import { APP_STORE_URL, MIN_OS } from "@/lib/site";

/**
 * The "your browser is blocking this" explanation, shared by the two places
 * that need it: the dialog behind every install button, and `/get`, the short
 * link meant for the Instagram bio.
 *
 * It lives in one file because the instructions are the actual fix — the whole
 * point of the change — and two copies of them would drift the first time
 * Instagram renames a menu item.
 */

export function installHelpTitle(environment: InstallEnvironment): string {
  if (environment.android) return "GlowZen is on iPhone only";
  return `${environment.app ?? "This app"}'s browser blocks the App Store`;
}

export default function InstallHelpBody({
  environment,
}: {
  environment: InstallEnvironment;
}) {
  const [copied, setCopied] = React.useState(false);
  const [manual, setManual] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(APP_STORE_URL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Embedded web views refuse clipboard writes often enough that a silent
      // failure here would be the second dead button on the same screen. Show
      // the URL instead, pre-selected, so it can still be copied by hand.
      setManual(true);
    }
  };

  if (environment.android) {
    return (
      <>
        <p className="mt-3 leading-relaxed text-ink-soft">
          There is no Android version yet, so the download button has nowhere
          useful to send you. GlowZen needs an iPhone running {MIN_OS} or later.
        </p>
        <p className="mt-4 leading-relaxed text-ink-soft">
          Everything on this site is free to read in the meantime — the{" "}
          <Link
            href="/exercises"
            className="font-bold text-rose-deep underline underline-offset-4"
          >
            eighteen exercises
          </Link>
          , the{" "}
          <Link
            href="/guide"
            className="font-bold text-rose-deep underline underline-offset-4"
          >
            beginner&rsquo;s guide
          </Link>{" "}
          and the{" "}
          <Link
            href="/tools"
            className="font-bold text-rose-deep underline underline-offset-4"
          >
            free tools
          </Link>{" "}
          all work in this browser.
        </p>
      </>
    );
  }

  const app = environment.app ?? "This app";

  return (
    <>
      <p className="mt-3 leading-relaxed text-ink-soft">
        You are reading this inside {app}, which opens links in its own browser
        rather than Safari. That browser is not allowed to open the App Store,
        which is why the button did nothing.
      </p>

      <ol className="mt-5 space-y-3">
        <Step number={1}>
          Tap the{" "}
          <MoreHorizontal
            aria-label="three dots"
            className="inline-block size-4 align-[-2px]"
          />{" "}
          menu in the top corner of this screen.
        </Step>
        <Step number={2}>
          Choose <strong>Open in external browser</strong> — some versions say{" "}
          <strong>Open in Safari</strong>.
        </Step>
        <Step number={3}>Tap Download again. It will work there.</Step>
      </ol>

      <div className="mt-5 border-t border-border pt-5">
        <p className="text-[15px] leading-relaxed text-ink-soft">
          Or copy the link and paste it into Safari yourself:
        </p>
        <button
          type="button"
          onClick={copy}
          className="mt-3 flex w-full items-center justify-center gap-2.5 rounded-full border border-ink/12 px-5 py-3 text-[15px] font-bold transition-colors hover:border-rose/40 hover:text-rose-deep"
        >
          {copied ? (
            <Check aria-hidden className="size-4" />
          ) : (
            <Copy aria-hidden className="size-4" />
          )}
          {copied ? "Link copied" : "Copy the App Store link"}
        </button>

        {manual && (
          <>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-muted">
              This browser would not let the page copy for you. Tap and hold
              the address to select it:
            </p>
            <input
              readOnly
              value={APP_STORE_URL}
              aria-label="App Store link"
              onFocus={(event) => event.currentTarget.select()}
              className="mt-2 w-full rounded-xl border border-ink/12 bg-cream-deep px-3 py-2.5 text-[13px] text-ink-soft"
            />
          </>
        )}
      </div>

      {/* The escape hatch from our own guess. The detection is an assumption
          about someone else's software; if this web view does hand off after
          all, nothing here should have stood in the way. */}
      <p className="mt-4 text-center text-sm">
        <a
          href={APP_STORE_URL}
          className="font-bold text-rose-deep underline underline-offset-4"
        >
          Try opening the App Store anyway
        </a>
      </p>
    </>
  );
}

function Step({
  number,
  children,
}: {
  number: number;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span
        aria-hidden
        className="gradient-rose flex size-6 shrink-0 items-center justify-center rounded-full text-[12px] font-extrabold text-white"
      >
        {number}
      </span>
      <span className="leading-relaxed text-ink-soft">{children}</span>
    </li>
  );
}
