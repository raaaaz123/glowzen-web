/**
 * The bridge between the content catalogues and the browser tools.
 *
 * Import this from a server component only. It pulls in the full exercise and
 * zone catalogues — every step, caution and CTA — and hands back the handful
 * of fields a widget needs. Importing it from a `"use client"` module would
 * put all of that prose in the client bundle to render a list of names.
 */

import {
  exerciseSeconds,
  exercises,
  type Exercise,
} from "@/lib/content/exercises";
import { zones } from "@/lib/zones";
import {
  inSessionOrder,
  type RoutineExercise,
  type RoutineZone,
  type TimerPreset,
} from "@/lib/routine";

export function toRoutineExercise(
  exercise: Exercise,
  order: number,
): RoutineExercise {
  return {
    slug: exercise.slug,
    name: exercise.name,
    zoneSlug: exercise.zoneSlug,
    hold: exercise.hold,
    reps: exercise.reps,
    seconds: exerciseSeconds(exercise),
    order,
  };
}

/** The whole catalogue, trimmed, in catalogue order. */
export function routinePool(): RoutineExercise[] {
  return exercises.map(toRoutineExercise);
}

/** The zones a session runs through, in session order rather than catalogue. */
export function routineZones(): RoutineZone[] {
  return inSessionOrder(zones.map(({ slug, zone }) => ({ slug, zone })));
}

/** One preset per exercise for the timer, keeping the phase lengths. */
export function timerPresets(): TimerPreset[] {
  return exercises.map((exercise) => ({
    slug: exercise.slug,
    name: exercise.name,
    zoneSlug: exercise.zoneSlug,
    ...exercise.timing,
  }));
}
