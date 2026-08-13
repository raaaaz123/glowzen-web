"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, RotateCcw, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { inSessionOrder, type RoutineZone } from "@/lib/routine";

/**
 * Six questions to a starting point.
 *
 * ## What the scoring is and is not
 *
 * Options carry weights against zone slugs, the weights are summed, and the
 * top three win. That is the whole mechanism — there is no model here and no
 * assessment of anything, which is why the page underneath says so twice.
 *
 * The only rule with any judgement in it is the clenching one, and it moves
 * weight *away* from the jaw rather than towards it. The intuition that a
 * tight jaw wants strengthening is backwards for someone already grinding
 * their teeth all night, and the jawline movements are the ones carrying real
 * cautions in this catalogue. Anyone who answers yes there gets pointed at
 * release work and told to ask a dentist.
 *
 * `caution` strings surface verbatim in the result. Weakening one to make a
 * recommendation look cleaner is not a copy edit.
 */

type Option = {
  label: string;
  /** Zone slug to weight. */
  zones?: Record<string, number>;
  minutes?: number;
  caution?: string;
  /** Marks the answer that flips jaw work into release work. */
  clencher?: boolean;
};

type Question = { id: string; question: string; options: Option[] };

const QUESTIONS: Question[] = [
  {
    id: "goal",
    question: "What brought you to face yoga?",
    options: [
      {
        label: "A more defined jawline",
        zones: { jawline: 3, neck: 2 },
      },
      {
        label: "The eye area",
        zones: { eyes: 3, forehead: 1 },
      },
      {
        label: "A smoother forehead and brow",
        zones: { forehead: 3, nose: 1 },
      },
      {
        label: "Lifted cheeks",
        zones: { cheeks: 3, lips: 1 },
      },
      {
        label: "Letting go of tension in my face",
        zones: { forehead: 2, eyes: 2, neck: 2, nose: 1 },
      },
    ],
  },
  {
    id: "area",
    question: "Which part of your face do you notice most?",
    options: [
      { label: "Jaw and chin", zones: { jawline: 3 } },
      { label: "Under and around the eyes", zones: { eyes: 3 } },
      { label: "Forehead and between the brows", zones: { forehead: 3 } },
      { label: "Cheeks", zones: { cheeks: 3 } },
      { label: "Mouth and lips", zones: { lips: 3 } },
      { label: "Neck and under the chin", zones: { neck: 3, jawline: 1 } },
    ],
  },
  {
    id: "time",
    question: "How long can you realistically give it, most days?",
    options: [
      { label: "About 5 minutes", minutes: 5 },
      { label: "About 8 minutes", minutes: 8 },
      { label: "About 12 minutes", minutes: 12 },
      { label: "15 minutes or more", minutes: 15 },
    ],
  },
  {
    id: "clench",
    question: "Do you clench or grind your teeth?",
    options: [
      {
        label: "Yes — I know I do",
        clencher: true,
        zones: { eyes: 2, neck: 2 },
        caution:
          "You said you clench or grind. Ask a dentist before adding jaw exercises: piling deliberate load onto a muscle that is already overworked overnight can make the tension worse rather than better. Release work — the Temple Smooth in particular — is the more sensible starting point, and it is why the jaw has been weighted down in the suggestion above.",
      },
      {
        label: "Sometimes, when I am stressed",
        zones: { eyes: 1, neck: 1 },
        caution:
          "Since you clench when stressed, treat the jaw movements as the part to introduce slowly, and stop if the joint aches rather than the muscle.",
      },
      { label: "No" },
      {
        label: "I am not sure",
        caution:
          "If you wake with a tight jaw or a dull headache at the temples, that is worth mentioning to a dentist before you start adding jaw work.",
      },
    ],
  },
  {
    id: "days",
    question: "How do you spend most of your day?",
    options: [
      {
        label: "At a screen",
        zones: { forehead: 2, eyes: 2, neck: 1 },
      },
      {
        label: "Looking down at a phone a lot",
        zones: { neck: 3, jawline: 1 },
      },
      { label: "On my feet, moving around", zones: { cheeks: 1, jawline: 1 } },
      { label: "A bit of everything", zones: { forehead: 1, neck: 1 } },
    ],
  },
  {
    id: "recent",
    question: "Anything recent we should be careful around?",
    options: [
      {
        label: "Botulinum toxin or filler",
        caution:
          "Ask the clinician who treated you before doing resistance or sustained-pressure work over the treated area. They know what was placed and where; this page does not.",
      },
      {
        label: "Dental work or jaw surgery",
        caution:
          "Keep pressure off the area while it settles and check with your dentist before starting the jaw and cheek movements.",
      },
      {
        label: "An eye condition or eye surgery",
        caution:
          "Skip the eye zone entirely for now. Glaucoma, recent surgery and infections are all reasons to leave the area alone, and that is a question for a doctor rather than a website.",
      },
      { label: "None of these" },
    ],
  },
];

export default function GoalQuiz({ zones }: { zones: RoutineZone[] }) {
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<(number | null)[]>(
    QUESTIONS.map(() => null),
  );

  const done = step >= QUESTIONS.length;

  const choose = (index: number) => {
    setAnswers((current) => {
      const next = [...current];
      next[step] = index;
      return next;
    });
    setStep((current) => current + 1);
  };

  const restart = () => {
    setAnswers(QUESTIONS.map(() => null));
    setStep(0);
  };

  if (!done) {
    const question = QUESTIONS[step];
    return (
      <Card>
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-extrabold tracking-[0.12em] text-ink-muted uppercase">
              Question {step + 1} of {QUESTIONS.length}
            </p>
            {step > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setStep((current) => current - 1)}
              >
                <ArrowLeft aria-hidden className="size-4" />
                Back
              </Button>
            )}
          </div>

          <div
            aria-hidden
            className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink/8"
          >
            <div
              className="gradient-rose h-full rounded-full transition-all"
              style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
            />
          </div>

          <h3 className="font-display mt-5 text-xl font-bold text-balance sm:text-2xl">
            {question.question}
          </h3>

          <ul className="mt-5 space-y-2.5">
            {question.options.map((option, index) => (
              <li key={option.label}>
                <button
                  type="button"
                  onClick={() => choose(index)}
                  className={`w-full rounded-2xl border px-4 py-3.5 text-left text-[15px] font-bold transition-colors ${
                    answers[step] === index
                      ? "border-rose bg-blush/50 text-rose-deep"
                      : "border-ink/10 bg-white hover:border-rose/30 hover:text-rose-deep"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  }

  const result = score(answers, zones);

  return (
    <div>
      <Card>
        <CardContent className="p-5 sm:p-6">
          <p className="text-xs font-extrabold tracking-[0.12em] text-ink-muted uppercase">
            A place to start
          </p>
          <h3 className="font-display mt-3 text-xl font-bold text-balance sm:text-2xl">
            {result.zones.length === 1
              ? "One area, about "
              : `${result.zones.length} areas, about `}
            {result.minutes} minutes a day
          </h3>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Based on what you picked — not on your face, which nothing here can
            see. Start with these, learn the movements properly, and add
            another area once the first ones are habit.
          </p>

          <ul className="mt-5 space-y-2.5">
            {result.zones.map((zone) => (
              <li key={zone.slug}>
                <Link
                  href={`/face-yoga/${zone.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-white px-4 py-3.5 transition-colors hover:border-rose/30"
                >
                  <span className="font-bold group-hover:text-rose-deep">
                    {zone.zone}
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 shrink-0 text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rose-deep"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="brand" size="lg">
              <Link
                href={`/tools/face-yoga-routine-builder?zones=${result.zones
                  .map((zone) => zone.slug)
                  .join(",")}&minutes=${result.minutes}`}
              >
                Build the routine
                <ArrowUpRight aria-hidden className="size-4" />
              </Link>
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={restart}>
              <RotateCcw aria-hidden className="size-4" />
              Start again
            </Button>
          </div>
        </CardContent>
      </Card>

      {result.cautions.length > 0 && (
        <div className="mt-4 rounded-2xl border border-champagne/45 bg-champagne/8 px-5 py-5">
          <h3 className="flex items-center gap-2 text-[13px] font-bold tracking-[0.1em] uppercase">
            <ShieldAlert aria-hidden className="size-4" />
            Applies to you
          </h3>
          <ul className="mt-3.5 space-y-3">
            {result.cautions.map((caution) => (
              <li key={caution} className="leading-relaxed text-ink-soft">
                {caution}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function score(answers: (number | null)[], zones: RoutineZone[]) {
  const weights = new Map<string, number>();
  const cautions: string[] = [];
  let minutes = 8;
  let clencher = false;

  answers.forEach((answer, index) => {
    if (answer === null) return;
    const option = QUESTIONS[index].options[answer];
    if (!option) return;

    for (const [slug, weight] of Object.entries(option.zones ?? {})) {
      weights.set(slug, (weights.get(slug) ?? 0) + weight);
    }
    if (option.minutes) minutes = option.minutes;
    if (option.caution) cautions.push(option.caution);
    if (option.clencher) clencher = true;
  });

  // A confirmed clencher gets pushed towards release work: the jaw movements
  // add load to a muscle that is already being overworked overnight.
  if (clencher) {
    weights.set("jawline", (weights.get("jawline") ?? 0) - 3);
  }

  // Five minutes will not cover three areas honestly, so narrow rather than
  // hand back a routine that cannot fit in the time the reader just gave.
  const wanted = minutes <= 5 ? 2 : 3;

  const ranked = [...weights.entries()]
    .filter(([, weight]) => weight > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, wanted)
    .map(([slug]) => slug);

  // Everyone leaves with something. If the answers cancelled out — which takes
  // some doing — fall back to the two areas most people arrive asking about.
  const chosen = ranked.length ? ranked : ["jawline", "cheeks"];

  return {
    zones: inSessionOrder(
      zones.filter((zone) => chosen.includes(zone.slug)),
    ),
    minutes,
    cautions,
  };
}
