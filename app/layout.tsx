import type { Metadata, Viewport } from "next";
import "./globals.css";
import {
  APP_STORE_ID,
  DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  TAGLINE,
} from "@/lib/site";

const title = `${SITE_NAME} — ${TAGLINE}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s · ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  // Google has ignored meta keywords since 2009, so this earns nothing on its
  // own — it is a hint for the smaller engines that still read it. The terms
  // that matter are the ones written into the visible copy and /guide.
  //
  // Generic terms only. Competitors' app and brand names are deliberately
  // absent: using another company's mark to catch its traffic is trademark
  // infringement, and App Store review rejects metadata that names rival apps.
  keywords: [
    "face yoga",
    "face yoga at home",
    "facial exercise",
    "facial fitness",
    "face workout",
    "face scan",
    "face score",
    "jawline exercises",
    "looksmaxxing",
    "face yoga guide",
  ],
  // Every page here is canonical at its own path; setting it explicitly stops
  // a stray query string (ad trackers, share links) being indexed separately.
  alternates: {
    canonical: "/",
    // Points assistants at the plain-text summary. Not part of any spec —
    // llms.txt is found by convention at the root — but it costs one link tag
    // and makes the file discoverable from any page.
    types: { "text/plain": "/llms.txt" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title,
    description: DESCRIPTION,
    url: SITE_URL,
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: DESCRIPTION,
  },
  // Safari on iOS turns this into a native install banner above the page, with
  // the real icon, rating and an Open/Get button. It is the shortest path from
  // the site to the App Store on the one platform the app runs on.
  itunes: { appId: APP_STORE_ID },
  category: "health",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
