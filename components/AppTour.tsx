import Image from "next/image";

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

function Phone({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[248px] rounded-[2.4rem] border-[6px] border-ink/85 bg-ink/85 shadow-[var(--shadow-lift)]">
      <Image
        src={src}
        alt={alt}
        width={900}
        height={1956}
        sizes="248px"
        className="w-full rounded-[1.9rem]"
        priority={priority}
      />
    </div>
  );
}

export default function AppTour() {
  return (
    <section id="tour" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold tracking-[0.18em] text-rose-deep uppercase">
            Inside the app
          </p>
          <h2 className="font-display mt-4 text-4xl leading-[1.1] font-semibold text-balance sm:text-5xl">
            Everything you need, nothing you don&apos;t
          </h2>
        </div>

        <div className="mt-16 grid gap-14 sm:grid-cols-2 lg:gap-20">
          {screens.map((screen, index) => (
            <figure key={screen.src}>
              <Phone
                src={screen.src}
                alt={`GlowZen — ${screen.caption}`}
                priority={index === 0}
              />
              <figcaption className="mx-auto mt-8 max-w-xs text-center">
                <h3 className="text-lg font-extrabold">{screen.caption}</h3>
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
