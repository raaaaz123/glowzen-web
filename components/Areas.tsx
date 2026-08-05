// Zones and exercise names come straight from the app's catalogue
// (dietly_backend/app/services/glow_catalogue.py) — keep them in step.
const zones = [
  {
    zone: "Forehead & brow",
    tint: "from-rose-light/15 to-rose/10",
    exercises: ["Forehead Smoother", "Brow Lift Press", "Frown Line Release"],
  },
  {
    zone: "Eyes",
    tint: "from-orchid/15 to-orchid/5",
    exercises: ["Eye Circle Press", "Lower Lid Strengthener", "Temple Smooth"],
  },
  {
    zone: "Cheeks",
    tint: "from-coral/15 to-coral/5",
    exercises: ["Cheek Lifter", "Cheek Puff Pass", "Smile Smoother"],
  },
  {
    zone: "Lips",
    tint: "from-rose/15 to-blush/30",
    exercises: ["Lip Plump Press", "Lip Line Smoother"],
  },
  {
    zone: "Jawline",
    tint: "from-champagne/25 to-champagne/5",
    exercises: ["Jawline Sculptor", "Chin Lift Hold", "Fish Face Pull"],
  },
  {
    zone: "Neck",
    tint: "from-mint/15 to-mint/5",
    exercises: ["Neck Toner", "Platysma Stretch", "Neck Release Roll"],
  },
  {
    zone: "Nose",
    tint: "from-orchid/10 to-blush/25",
    exercises: ["Nose Tension Release"],
  },
];

export default function Areas() {
  return (
    <section id="areas" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-extrabold tracking-[0.18em] text-rose-deep uppercase">
            What you&apos;ll train
          </p>
          <h2 className="font-display mt-4 text-4xl leading-[1.1] font-semibold text-balance sm:text-5xl">
            Eighteen exercises across every part of your face
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            Your plan pulls from these based on the goals you pick — jawline
            definition, lift and tone, fewer fine lines, or simply unwinding
            tension.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {zones.map((zone) => (
            <article key={zone.zone} className="card-surface overflow-hidden">
              <div className={`bg-gradient-to-br ${zone.tint} px-7 py-6`}>
                <h3 className="text-xl font-extrabold">{zone.zone}</h3>
                <p className="mt-1 text-sm font-bold text-ink-muted">
                  {zone.exercises.length} exercises
                </p>
              </div>
              <ul className="space-y-2.5 px-7 py-6">
                {zone.exercises.map((exercise) => (
                  <li
                    key={exercise}
                    className="flex items-center gap-2.5 text-[15px] font-semibold text-ink-soft"
                  >
                    <span
                      aria-hidden
                      className="gradient-rose h-1.5 w-1.5 shrink-0 rounded-full"
                    />
                    {exercise}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
