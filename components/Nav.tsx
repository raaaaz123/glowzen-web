import Image from "next/image";
import Link from "next/link";
import AppleIcon from "./AppleIcon";
import InstallButton from "./InstallButton";

const links = [
  { href: "/#how", label: "How it works" },
  { href: "/face-yoga", label: "By area" },
  { href: "/exercises", label: "Exercises" },
  { href: "/tools", label: "Tools" },
  { href: "/compare", label: "Compare" },
  { href: "/guide", label: "Guide" },
  { href: "/#faq", label: "FAQ" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-cream/80 backdrop-blur-xl">
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

        {/* gap-6 rather than gap-8 since Tools made it seven links — the row
            is the same overall width it was at six. */}
        <ul className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[15px] font-semibold text-ink-soft transition-colors hover:text-rose-deep"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Straight to the listing, not to #get. The section it used to scroll
            to exists to sell the app; a visitor who has already decided should
            not have to read it again to find the button. */}
        <InstallButton className="gradient-rose inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-bold text-white shadow-[0_8px_18px_-6px_rgba(125,83,221,0.6)] transition-transform hover:-translate-y-0.5">
          <AppleIcon />
          Get the app
        </InstallButton>
      </nav>
    </header>
  );
}
