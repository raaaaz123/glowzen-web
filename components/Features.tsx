import { CirclePlay, Images, ScanFace } from "lucide-react";

/**
 * The three-card row that carries the lean home page.
 *
 * Replaces the four-step HowItWorks block that used to sit here (it now opens
 * /guide, where there is room to explain rather than summarise). Three cards
 * rather than four is the point: the row has to survive on one screen next to
 * the hero, and a fourth card pushes it below the fold on a laptop.
 *
 * The icons are lucide rather than the emoji the reference uses. Emoji render
 * as a different typeface on every platform and would be the one thing on the
 * page not drawn in the brand's own hand.
 */
const features = [
  {
    icon: ScanFace,
    title: "Face scan",
    body: "One selfie, and you know which areas are actually worth your time — instead of copying a routine built for someone else's face.",
  },
  {
    icon: CirclePlay,
    title: "Guided sessions",
    body: "A video plays and a voice counts you through the hold, so your hands stay on your face and you stop second-guessing your form.",
  },
  {
    icon: Images,
    title: "Progress photos",
    body: "Eight weeks is a long time to go on a feeling. Your photos sit side by side, so you can look rather than wonder.",
  },
];

export default function Features() {
  return (
    <section className="px-5 pb-14 sm:px-8 sm:pb-20">
      {/* `max-w-6xl` to stay in line with every other section on the site — the
          reference runs max-w-5xl, but it has no other sections to agree with. */}
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            /* The reference's card: no border, no shadow, just white at a few
               percent over the page. On black that reads as a raised surface
               more cleanly than a hairline does, and it survives the violet
               washes bleeding underneath it. */
            className="rounded-3xl bg-white/[0.04] p-6"
          >
            <feature.icon
              aria-hidden
              className="size-6 text-rose-deep"
              strokeWidth={1.75}
            />
            <h3 className="mt-4 text-lg font-semibold tracking-tight">
              {feature.title}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
              {feature.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
