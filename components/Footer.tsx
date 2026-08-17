import Image from "next/image";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/legal";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-ink/5 px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <Image
              src="/glowzen-icon.png"
              alt=""
              width={32}
              height={32}
              className="rounded-[9px]"
            />
            <span className="text-base font-extrabold">GlowZen</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            A general wellbeing and fitness app for facial exercise. Not medical
            care — it does not diagnose, treat or prevent any condition.
          </p>
        </div>

        <nav aria-label="Footer" className="flex gap-14">
          <div>
            <h2 className="text-xs font-extrabold tracking-[0.12em] text-ink-muted uppercase">
              Product
            </h2>
            <ul className="mt-3.5 space-y-2.5 text-[15px] font-semibold">
              <li>
                <Link href="/guide#how" className="hover:text-rose-deep">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/face-yoga" className="hover:text-rose-deep">
                  Face yoga by area
                </Link>
              </li>
              <li>
                <Link href="/exercises" className="hover:text-rose-deep">
                  All exercises
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-rose-deep">
                  Free tools
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-rose-deep">
                  Compare
                </Link>
              </li>
              <li>
                <Link href="/guide" className="hover:text-rose-deep">
                  Face yoga guide
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-rose-deep">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-extrabold tracking-[0.12em] text-ink-muted uppercase">
              Legal
            </h2>
            <ul className="mt-3.5 space-y-2.5 text-[15px] font-semibold">
              <li>
                <Link href="/privacy" className="hover:text-rose-deep">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-rose-deep">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-rose-deep">
                  Support
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="hover:text-rose-deep"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <p className="mx-auto mt-10 max-w-6xl text-sm text-ink-muted">
        © {new Date().getFullYear()} GlowZen. All rights reserved.
      </p>
    </footer>
  );
}
