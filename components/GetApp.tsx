"use client";

import * as React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

import InstallHelpBody, { installHelpTitle } from "./InstallHelpBody";
import {
  installEnvironment,
  type InstallEnvironment,
} from "@/lib/in-app-browser";
import { APP_STORE_URL } from "@/lib/site";

/**
 * `/get` — the link to put in a social bio.
 *
 * In an ordinary browser it is a redirect: land, go straight to the App Store,
 * never really see this page. In a social app's built-in browser it does not
 * bother trying, because the redirect would land in the same dead end the
 * download buttons do, and instead shows the way out.
 *
 * `location.replace` rather than `assign` so the back button returns to
 * whatever the person was reading, not to a page that immediately bounces them
 * forward again.
 */
export default function GetApp() {
  const [environment, setEnvironment] =
    React.useState<InstallEnvironment | null>(null);

  React.useEffect(() => {
    const detected = installEnvironment(navigator.userAgent);
    setEnvironment(detected);
    if (!detected.blocked && !detected.android) {
      window.location.replace(APP_STORE_URL);
    }
  }, []);

  // Pre-detection, and the moment before the redirect fires. Deliberately
  // plain: for most visitors this is on screen for a few hundred milliseconds.
  if (!environment || (!environment.blocked && !environment.android)) {
    return (
      <div className="text-center">
        <Loader2
          aria-hidden
          className="mx-auto size-6 animate-spin text-rose-deep"
        />
        <p className="mt-4 leading-relaxed text-ink-soft">
          Opening the App Store…
        </p>
        <p className="mt-6 text-sm">
          <a
            href={APP_STORE_URL}
            className="font-bold text-rose-deep underline underline-offset-4"
          >
            Tap here if nothing happens
          </a>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-[1.75rem] leading-[1.15] font-bold text-balance sm:text-[2rem]">
        {installHelpTitle(environment)}
      </h1>
      <InstallHelpBody environment={environment} />
      <p className="mt-8 border-t border-border pt-6 text-sm leading-relaxed text-ink-muted">
        Or{" "}
        <Link
          href="/"
          className="font-bold text-rose-deep underline underline-offset-4"
        >
          read about GlowZen first
        </Link>{" "}
        — the site works perfectly well in here, it is only the App Store
        hand-off that this browser blocks.
      </p>
    </div>
  );
}
