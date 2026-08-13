import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import GetApp from "@/components/GetApp";
import { SITE_NAME, TAGLINE } from "@/lib/site";

/**
 * The short link for a social bio: glowzen.app/get
 *
 * `noindex` on purpose. It is a redirect with a fallback, not a page anyone
 * should reach from a search result, and it is kept out of `sitemap.ts` for
 * the same reason. The landing page is the thing that should rank.
 */
export const metadata: Metadata = {
  title: `Get ${SITE_NAME}`,
  description: `Download ${SITE_NAME} — ${TAGLINE}.`,
  robots: { index: false, follow: true },
  alternates: { canonical: "/get" },
};

export default function Page() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2.5">
          <Image
            src="/glowzen-icon.png"
            alt=""
            width={44}
            height={44}
            className="rounded-xl shadow-sm"
            priority
          />
          <span className="text-xl font-extrabold tracking-tight">
            {SITE_NAME}
          </span>
        </Link>

        <div className="mt-8">
          <GetApp />
        </div>
      </div>
    </main>
  );
}
