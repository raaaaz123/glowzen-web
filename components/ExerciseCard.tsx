import Link from "next/link";
import type { Exercise } from "@/lib/content/exercises";

/**
 * One exercise, as a link card. Used by `/exercises` and every zone page, so
 * the two cannot drift into looking like different products.
 *
 * Deliberately compact: there are 18 of these on the index and a full-bleed
 * card per row turns that into a very long scroll with very little on screen.
 * Name, one line, and the numbers someone scanning actually wants.
 */
export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <Link
      href={`/exercises/${exercise.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-ink/8 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-rose/30 hover:shadow-[var(--shadow-card)]"
    >
      <h3 className="font-bold text-[17px] leading-snug text-ink group-hover:text-rose-deep">
        {exercise.name}
      </h3>
      <p className="mt-1.5 flex-1 text-[15px] leading-relaxed text-ink-soft">
        {exercise.summary}
      </p>
      <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-semibold text-ink-muted">
        <span>{exercise.hold}</span>
        <span aria-hidden className="text-ink-muted/50">
          ·
        </span>
        <span>{exercise.reps}</span>
      </p>
    </Link>
  );
}
