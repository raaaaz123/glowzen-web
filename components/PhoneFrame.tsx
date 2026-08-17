import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * A screenshot in a phone bezel. Shared by the hero and the app tour so the
 * device never renders two different ways on one page.
 *
 * Screenshots are real captures from the shipping build rather than mockups,
 * so what a visitor sees here is what they get after installing.
 */
export default function PhoneFrame({
  src,
  alt,
  priority = false,
  className,
  sizes = "248px",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={cn(
        /* The bezel was `ink/85` — near-black against the old white page. `ink`
           is now near-white, and a literal black bezel would vanish into a
           black page, so the device is drawn in `surface-2`: light enough to
           separate from the background, dark enough to still read as a phone. */
        "relative w-full max-w-[248px] rounded-[2.4rem] border-[6px] border-surface-2 bg-surface-2 shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={900}
        height={1956}
        sizes={sizes}
        className="w-full rounded-[1.9rem]"
        priority={priority}
      />
    </div>
  );
}
