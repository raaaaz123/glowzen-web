import { cn } from "@/lib/utils";

/**
 * The one type scale for every landing-page section heading.
 *
 * Before this, each section carried its own sizes and weights — `text-4xl
 * sm:text-5xl font-semibold` here, `text-lg font-extrabold` there — which was
 * survivable while a serif carried the headlines and obvious once everything
 * became one sans family. Sections now differ by content, not by typography.
 *
 * Change a size here and the whole page moves together, which is the point.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "max-w-2xl",
        centered && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-xs font-extrabold tracking-[0.18em] text-rose-deep uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display mt-3.5 text-[2.25rem] leading-[1.1] font-bold text-balance sm:text-[2.75rem]">
        {title}
      </h2>
      {lead && (
        <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">{lead}</p>
      )}
    </div>
  );
}
