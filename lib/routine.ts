/**
 * Routine assembly, kept out of the widget so it is plain data in, plain data
 * out — and so the quiz and the builder cannot disagree about what a routine
 * from a given set of zones looks like.
 *
 * ## Why this file imports nothing
 *
 * The builder runs in the browser, and a client component that imports
 * `lib/content/exercises.ts` ships all eighteen entries — every step, every
 * caution, every CTA — down the wire to render a list of names. So the page
 * trims the catalogue to `RoutineExercise` on the server (see
 * `lib/routine-source.ts`) and hands it over as props. Everything here works
 * on that shape and touches no content module.
 *
 * Nothing here is personalised. It arranges a catalogue against a time budget;
 * it knows nothing about the person reading it, which is exactly what
 * `/tools/face-yoga-routine-builder` says on the page.
 */

/** One exercise, reduced to what a routine actually needs. */
export type RoutineExercise = {
  slug: string;
  name: string;
  zoneSlug: string;
  /** Prose timing, for display: "30 seconds", "3 rounds each side". */
  hold: string;
  reps: string;
  /** Total working time including rests between rounds. */
  seconds: number;
  /** Position in the catalogue, so ordering stays pure. */
  order: number;
};

export type RoutineZone = { slug: string; zone: string };

/** One exercise's phase lengths, for the timer. */
export type TimerPreset = {
  slug: string;
  name: string;
  zoneSlug: string;
  work: number;
  rest: number;
  rounds: number;
};

/**
 * The order a session runs in: top of the face downward.
 *
 * Not alphabetical and not the catalogue order. Lips sit between cheeks and
 * jaw because the muscles around the mouth are involved in both — the Lip
 * Plump Press page says so directly — and the neck closes because its release
 * movement needs something to release.
 */
export const ZONE_ORDER = [
  "forehead",
  "eyes",
  "nose",
  "cheeks",
  "lips",
  "jawline",
  "neck",
];

function zoneRank(slug: string): number {
  const index = ZONE_ORDER.indexOf(slug);
  // An unranked zone sorts last rather than first, so adding a zone to the
  // catalogue and forgetting it here degrades quietly instead of putting a
  // neck movement before the forehead.
  return index === -1 ? ZONE_ORDER.length : index;
}

/** Zones in session order. Anything not in `ZONE_ORDER` keeps its own order. */
export function inSessionOrder<T extends { slug: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => zoneRank(a.slug) - zoneRank(b.slug));
}

export type Routine = {
  exercises: RoutineExercise[];
  seconds: number;
  /** Zone slugs that were picked but did not fit in the time given. */
  omitted: string[];
};

/**
 * Fill a time budget with exercises from the chosen zones.
 *
 * Coverage first: every chosen zone gets its shortest movement before any zone
 * gets a second one. Someone who ticks "jawline" and "eyes" asked for both, and
 * a routine that spends the whole budget on the jaw because those exercises
 * come first in the catalogue has answered a different question.
 *
 * After that it fans out in catalogue order, one movement per zone per pass,
 * taking anything that still fits. A short movement can therefore slip in
 * after a longer one was skipped, which is deliberate — the alternative is
 * leaving 40 seconds of the budget unspent to preserve a tidier ordering that
 * nobody can see anyway.
 */
export function buildRoutine(
  pool: RoutineExercise[],
  zoneSlugs: string[],
  budgetSeconds: number,
): Routine {
  const chosen = ZONE_ORDER.filter((slug) => zoneSlugs.includes(slug));
  const remaining = new Map(
    chosen.map((slug) => [
      slug,
      pool
        .filter((exercise) => exercise.zoneSlug === slug)
        .sort((a, b) => a.order - b.order),
    ]),
  );

  const picked: RoutineExercise[] = [];
  let seconds = 0;

  const take = (exercise: RoutineExercise) => {
    if (seconds + exercise.seconds > budgetSeconds) return false;
    picked.push(exercise);
    seconds += exercise.seconds;
    return true;
  };

  // Pass one: the shortest movement in each zone, so the budget is spread
  // across everything asked for before it is spent deepening any one area.
  for (const slug of chosen) {
    const zonePool = remaining.get(slug);
    if (!zonePool?.length) continue;
    const shortest = zonePool.reduce((a, b) => (b.seconds < a.seconds ? b : a));
    if (take(shortest)) zonePool.splice(zonePool.indexOf(shortest), 1);
  }

  // Subsequent passes: one per zone at a time, in catalogue order, until a
  // whole pass adds nothing — either everything is used or nothing else fits.
  let added = true;
  while (added) {
    added = false;
    for (const slug of chosen) {
      const zonePool = remaining.get(slug);
      if (!zonePool?.length) continue;
      if (take(zonePool[0])) {
        zonePool.shift();
        added = true;
      }
    }
  }

  picked.sort((a, b) => {
    const byZone = zoneRank(a.zoneSlug) - zoneRank(b.zoneSlug);
    // Within a zone, catalogue order — which is the order the zone pages teach
    // the movements in, releases last.
    return byZone !== 0 ? byZone : a.order - b.order;
  });

  const covered = new Set(picked.map((exercise) => exercise.zoneSlug));
  const omitted = chosen.filter((slug) => !covered.has(slug));

  return { exercises: picked, seconds, omitted };
}

/** "8 min 20 sec". Minutes alone reads wrong under two minutes. */
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  if (minutes === 0) return `${remainder} sec`;
  if (remainder === 0) return `${minutes} min`;
  return `${minutes} min ${remainder} sec`;
}

/** The session lengths offered by the builder and the quiz. */
export const SESSION_LENGTHS = [5, 8, 12, 15];
