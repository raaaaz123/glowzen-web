import Image from "next/image";
import Link from "next/link";
import AppleIcon from "./AppleIcon";
import { APP_STORE_URL } from "@/lib/site";

/**
 * Wordmark and one button — the reference's whole navigation.
 *
 * The seven section links (How it works, By area, Exercises, Tools, Compare,
 * Guide, FAQ) used to sit between them and are deliberately gone. Every one of
 * them is still linked from the Footer, so nothing became unreachable and the
 * internal linking a crawler follows is intact; what changed is that the top of
 * the page now asks for one thing instead of eight.
 *
 * Not sticky, also deliberately. A bar pinned over a hero that is meant to own
 * the screen spends 60px of every viewport restating a button the hero already
 * has, so the header scrolls away with the rest of the page.
 */
export default function Nav() {
  return (
    <header className="border-b border-white/5">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8"
      >
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/glowzen-icon.png"
            alt=""
            width={36}
            height={36}
            className="rounded-[10px] shadow-sm"
            priority
          />
          <span className="text-lg font-extrabold tracking-tight">GlowZen</span>
        </Link>

        {/* Straight to the listing, not to #get. The section it used to scroll
            to exists to sell the app; a visitor who has already decided should
            not have to read it again to find the button. */}
        <a
          href={APP_STORE_URL}
          className="gradient-rose inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-bold text-white shadow-[0_8px_18px_-6px_rgba(125,83,221,0.6)] transition-transform hover:-translate-y-0.5"
        >
          <AppleIcon />
          Get the app
        </a>
      </nav>
    </header>
  );
}
