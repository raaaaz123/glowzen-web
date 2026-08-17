import BeforeAfter from "./BeforeAfter";
import SectionHeading from "./SectionHeading";

/**
 * The before/after slider, relocated out of the hero when the hero took on the
 * phone mockups.
 *
 * Kept deliberately modest — one column, no surrounding claims. A before/after
 * is the most persuasive and most legally loaded element on a page like this,
 * and the stats beneath it are facts from `lib/site.ts` rather than promises
 * about what the images show.
 */
const stats = [
  { value: "18", label: "Exercises" },
  { value: "7", label: "Face zones" },
  { value: "8 min", label: "A day" },
];

export default function Compare() {
  return (
    <section className="px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Side by side"
            title="Look, rather than wonder"
            lead="Eight weeks is a long time to go on a feeling. Progress photos sit next to each other in the app, taken the same way each time, so you can see what changed instead of trying to remember."
          />

          <div className="relative mx-auto w-full max-w-sm">
            <div className="relative">
              <BeforeAfter />
              <p className="mt-4 text-center text-sm font-bold text-ink-soft">
                Drag to compare
              </p>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl bg-surface p-3 shadow-[var(--shadow-card)]"
                  >
                    <p className="text-xl font-extrabold text-rose-deep">
                      {stat.value}
                    </p>
                    <p className="text-xs font-bold text-ink-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
