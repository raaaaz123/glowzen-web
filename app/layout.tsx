import type { Metadata, Viewport } from "next";
import { Fraunces, Nunito } from "next/font/google";
import "./globals.css";

// Nunito is the closest widely available match to SF Pro Rounded, which the
// iOS app uses throughout.
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

// Fraunces carries the headlines. Its soft, slightly wonky serif reads as
// beauty-editorial rather than clinical, and the SOFT axis keeps it in the
// same rounded family of shapes as the app's SF Pro Rounded.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const description =
  "Sculpt, lift and glow — naturally, in just 8 minutes a day. GlowZen builds a personalised facial exercise plan and guides you through it with video demos and voice coaching.";

export const metadata: Metadata = {
  metadataBase: new URL("https://glowzen.app"),
  title: {
    default: "GlowZen — Facial exercise, personalised to your face",
    template: "%s · GlowZen",
  },
  description,
  applicationName: "GlowZen",
  keywords: [
    "face yoga",
    "facial exercise",
    "jawline",
    "face workout",
    "facial fitness",
  ],
  openGraph: {
    title: "GlowZen — Facial exercise, personalised to your face",
    description,
    type: "website",
    siteName: "GlowZen",
  },
  twitter: {
    card: "summary_large_image",
    title: "GlowZen — Facial exercise, personalised to your face",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#fffbf9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${fraunces.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
