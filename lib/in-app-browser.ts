/**
 * Detecting the social apps' built-in browsers, and why it is worth doing.
 *
 * ## The bug this exists for
 *
 * Someone taps the link in GlowZen's Instagram bio. Instagram does not hand
 * the URL to Safari — it opens it in its own WKWebView. The site looks fine,
 * they tap "Download app", and nothing happens at all.
 *
 * The reason is specific: `apps.apple.com` responds by redirecting to Apple's
 * own `itms-appss://` scheme, which is what actually launches the App Store.
 * A WKWebView embedded in another app cannot hand that scheme off unless the
 * host app chooses to, and Meta's does not. The navigation dies inside the
 * web view. No error, no fallback, no App Store.
 *
 * ## What does not fix it
 *
 * Linking straight to `itms-apps://` instead of `https://apps.apple.com/…`
 * fails the same way — the scheme is blocked, not the redirect. The old
 * `x-safari-https://` trick that used to kick a URL out to Safari has been
 * intercepted for some time now, as has the `googlechrome://` hop for most
 * users. There is no magic URL left that reliably escapes these browsers;
 * treating any of them as a fix means shipping something that silently stops
 * working.
 *
 * ## What does
 *
 * Telling the person what has happened and how to get out of it: the ⋯ menu
 * in the corner has "Open in external browser", and that is one tap. So the
 * install buttons detect the environment and, instead of firing a link that
 * leads nowhere, explain the one thing that works. The direct link is still
 * offered underneath, because some of these web views do let it through and
 * nobody should be blocked by our guess about their browser.
 *
 * Everything here is a pure function of the user-agent string so it can be
 * reasoned about and tested without a browser. Sniffing the UA is normally a
 * bad habit; it is the only signal available for this, since a web view that
 * blocks a navigation is indistinguishable from one that simply took its time.
 */

/**
 * The tokens these apps put in their user-agent.
 *
 * `FBAN`/`FBAV`/`FB_IAB` are Facebook's family markers and appear in
 * Instagram's UA too on some versions, so Instagram is matched first and wins.
 */
const IN_APP_BROWSERS: { name: string; pattern: RegExp }[] = [
  { name: "Instagram", pattern: /Instagram/i },
  { name: "Facebook", pattern: /FBAN|FBAV|FB_IAB|FBIOS|FBDV/i },
  { name: "Messenger", pattern: /Messenger(?:ForiOS)?/i },
  { name: "TikTok", pattern: /musical_ly|BytedanceWebview|TikTok/i },
  { name: "Snapchat", pattern: /Snapchat/i },
  { name: "Threads", pattern: /Barcelona/i },
  { name: "LinkedIn", pattern: /LinkedInApp/i },
  { name: "Pinterest", pattern: /Pinterest/i },
  { name: "X", pattern: /Twitter/i },
  { name: "WhatsApp", pattern: /WhatsApp/i },
  { name: "Line", pattern: /\bLine\//i },
];

/** The app whose browser this is, or null for an ordinary browser. */
export function inAppBrowserName(ua: string): string | null {
  return IN_APP_BROWSERS.find(({ pattern }) => pattern.test(ua))?.name ?? null;
}

export function isInAppBrowser(ua: string): boolean {
  return inAppBrowserName(ua) !== null;
}

/**
 * iOS, including iPadOS.
 *
 * iPads have reported a desktop Safari UA since iPadOS 13, so the platform
 * check alone misses them; a "Macintosh" that reports touch points is one.
 * That branch only runs in a browser, and callers pass `navigator.userAgent`
 * from an effect, so touching `navigator` here is safe.
 */
export function isIOS(ua: string): boolean {
  if (/iPad|iPhone|iPod/i.test(ua)) return true;
  return (
    /Macintosh/i.test(ua) &&
    typeof navigator !== "undefined" &&
    navigator.maxTouchPoints > 1
  );
}

export function isAndroid(ua: string): boolean {
  return /Android/i.test(ua);
}

export type InstallEnvironment = {
  /** The app trapping the page, if any. */
  app: string | null;
  ios: boolean;
  android: boolean;
  /** True when tapping an App Store link is expected to do nothing. */
  blocked: boolean;
};

/**
 * What we know about where this page is being viewed.
 *
 * `blocked` is deliberately narrow: an in-app browser on iOS. An in-app
 * browser on Android has a different problem (the App Store is not where its
 * apps come from), and an ordinary browser has none.
 */
export function installEnvironment(ua: string): InstallEnvironment {
  const app = inAppBrowserName(ua);
  const ios = isIOS(ua);
  return { app, ios, android: isAndroid(ua), blocked: Boolean(app) && ios };
}
