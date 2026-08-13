"use client";

import * as React from "react";
import { X } from "lucide-react";

import InstallHelpBody, { installHelpTitle } from "./InstallHelpBody";
import {
  installEnvironment,
  type InstallEnvironment,
} from "@/lib/in-app-browser";
import { APP_STORE_URL } from "@/lib/site";

/**
 * Every "download the app" link on the site.
 *
 * It renders exactly the anchor each caller used to render — same href, same
 * classes, same children — so nothing changes for the large majority of
 * visitors, and the App Store URL is still in the HTML for crawlers and for
 * anyone with JavaScript off.
 *
 * What it adds is a click handler for the one case where that anchor is known
 * not to work: a social app's built-in browser on iOS, where the hand-off to
 * the App Store is blocked and the tap does nothing at all. See
 * `lib/in-app-browser.ts` for why that happens and why no URL fixes it.
 * Instead of firing a dead link, the button explains the thing that does work.
 *
 * The environment is read after mount rather than during render: the page is
 * statically prerendered, so the server has no user-agent to check, and
 * branching on one during render would mean the server's HTML and the
 * browser's first paint disagreeing.
 */
export default function InstallButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [environment, setEnvironment] =
    React.useState<InstallEnvironment | null>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setEnvironment(installEnvironment(navigator.userAgent));
  }, []);

  const intercept = Boolean(environment?.blocked || environment?.android);

  return (
    <>
      <a
        href={APP_STORE_URL}
        className={className}
        onClick={(event) => {
          // Only ever intercepted where the plain link is known to fail. An
          // ordinary browser follows the href exactly as it did before.
          if (!intercept) return;
          event.preventDefault();
          setOpen(true);
        }}
      >
        {children}
      </a>
      {open && environment && (
        <InstallHelpDialog
          environment={environment}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

function InstallHelpDialog({
  environment,
  onClose,
}: {
  environment: InstallEnvironment;
  onClose: () => void;
}) {
  const closeRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    // The panel covers the page, so the page behind it should not scroll away
    // underneath it on a phone.
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="install-help-title"
      className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-ink/50 p-4 backdrop-blur-sm sm:items-center"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md rounded-[var(--radius-card)] bg-white p-6 text-left shadow-[var(--shadow-lift)]">
        <div className="flex items-start justify-between gap-4">
          <h2
            id="install-help-title"
            className="font-display text-xl font-bold text-balance"
          >
            {installHelpTitle(environment)}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mt-1 -mr-1 rounded-full p-2 text-ink-muted hover:text-ink"
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>
        <InstallHelpBody environment={environment} />
      </div>
    </div>
  );
}
