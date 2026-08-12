import PhoneFrame from "./PhoneFrame";
import SectionHeading from "./SectionHeading";

// Real screenshots captured from the shipping build — no mockups, so what a
// visitor sees here is exactly what they get after installing.
const screens = [
  {
    src: "/screen-welcome.png",
    caption: "Open it",
    body: "Tell GlowZen your goals and the areas you want to work on. No account, no email.",
  },
  {
    src: "/screen-dashboard.png",
    caption: "Today's session",
    body: "Your plan for the day, the exercises it contains, and your streak — all on one screen.",
  },
];

export default function AppTour() {
  return (
    <section id="tour" className="scroll-mt-24 px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Inside the app"
          title="You press play. That is the whole ask."
          align="center"
        />

        <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:gap-16">
          {screens.map((screen, index) => (
            <figure key={screen.src}>
              <PhoneFrame
                className="mx-auto"
                src={screen.src}
                alt={`GlowZen — ${screen.caption}`}
                priority={index === 0}
              />
              <figcaption className="mx-auto mt-8 max-w-xs text-center">
                <h3 className="text-[17px] font-bold">{screen.caption}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {screen.body}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
