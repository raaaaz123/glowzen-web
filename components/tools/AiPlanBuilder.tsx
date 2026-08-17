"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock,
  Loader2,
  RotateCcw,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDuration } from "@/lib/routine";

/** Mirrors the payload assembled in `app/api/plan/route.ts`. */
type Plan = {
  source: "ai" | "fallback";
  minutes: number;
  rationale: string;
  cautions: string[];
  zones: { slug: string; zone: string }[];
  seconds: number;
  omitted: string[];
  exercises: {
    slug: string;
    name: string;
    zone: string;
    hold: string;
    reps: string;
    seconds: number;
  }[];
};

const MAX_CHARS = 600;

const EXAMPLES = [
  "I sit at a screen all day and my forehead feels tight by the evening. About 10 minutes.",
  "I want to work on my jawline but I grind my teeth at night.",
  "Five minutes in the morning, mostly around the eyes.",
];

/**
 * The only tool on this site that talks to a server.
 *
 * The route does the careful part — see `app/api/plan/route.ts` and
 * `lib/ai/plan.ts`. This component sends a sentence, renders what comes back,
 * and takes care not to lie about which of the two produced it: a plan built
 * from the fallback path is labelled as such rather than passed off as an
 * answer to what the reader actually wrote.
 */
export default function AiPlanBuilder() {
  const [goals, setGoals] = React.useState("");
  const [plan, setPlan] = React.useState<Plan | null>(null);
  const [error, setError] = React.useState("");
  const [pending, setPending] = React.useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (pending || goals.trim().length < 3) return;

    setPending(true);
    setError("");
    setPlan(null);

    try {
      const response = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goals: goals.trim() }),
      });

      const body: unknown = await response.json();
      if (!response.ok) {
        const message =
          body && typeof body === "object" && "error" in body
            ? String((body as { error: unknown }).error)
            : "Something went wrong building that plan.";
        setError(message);
        return;
      }
      setPlan(body as Plan);
    } catch {
      setError(
        "Could not reach the plan builder. The routine builder does the same job without a connection to anything.",
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <div>
      <Card>
        <CardContent className="p-5 sm:p-6">
          <form onSubmit={submit}>
            <label
              htmlFor="plan-goals"
              className="text-xs font-extrabold tracking-[0.12em] text-ink-muted uppercase"
            >
              What do you want to work on?
            </label>
            <textarea
              id="plan-goals"
              value={goals}
              onChange={(event) =>
                setGoals(event.target.value.slice(0, MAX_CHARS))
              }
              rows={4}
              maxLength={MAX_CHARS}
              placeholder="A sentence or two: the areas you care about, how long you have, and anything a routine should be careful around."
              className="mt-2.5 w-full resize-y rounded-xl border border-ink/12 bg-surface px-4 py-3 leading-relaxed"
            />

            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[13px] font-semibold text-ink-muted">
                {goals.length}/{MAX_CHARS}
              </p>
              <Button
                type="submit"
                variant="brand"
                size="lg"
                disabled={pending || goals.trim().length < 3}
              >
                {pending ? (
                  <Loader2 aria-hidden className="size-4 animate-spin" />
                ) : (
                  <Sparkles aria-hidden className="size-4" />
                )}
                {pending ? "Reading that…" : "Build my plan"}
              </Button>
            </div>
          </form>

          {!plan && !pending && (
            <div className="mt-5 border-t border-border pt-4">
              <p className="text-[11px] font-extrabold tracking-[0.1em] text-ink-muted uppercase">
                Or start from one of these
              </p>
              <ul className="mt-2.5 space-y-2">
                {EXAMPLES.map((example) => (
                  <li key={example}>
                    <button
                      type="button"
                      onClick={() => setGoals(example)}
                      className="w-full rounded-xl border border-ink/10 bg-surface px-3.5 py-2.5 text-left text-[15px] leading-snug text-ink-soft transition-colors hover:border-rose/30 hover:text-rose-deep"
                    >
                      {example}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      <div aria-live="polite">
        {error && (
          <p className="mt-4 rounded-2xl border border-champagne/45 bg-champagne/8 px-5 py-4 leading-relaxed text-ink-soft">
            {error}
          </p>
        )}

        {plan && (
          <div className="mt-6">
            {/* Said plainly rather than buried: this plan did not come from
                what they wrote, and pretending otherwise would be the easiest
                lie on the page to tell. */}
            {plan.source === "fallback" && (
              <p className="mb-4 rounded-2xl border border-champagne/45 bg-champagne/8 px-5 py-4 leading-relaxed text-ink-soft">
                The model could not be reached, so this is the standard starting
                routine rather than an answer to what you wrote — the two areas
                most people arrive asking about. It is a perfectly good place to
                begin; it just is not personal to you.
              </p>
            )}

            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
              <h3 className="font-display text-xl font-bold sm:text-2xl">
                {plan.source === "ai" ? "Where to start" : "A place to start"}
              </h3>
              <p className="flex items-center gap-2 text-[15px] font-bold text-ink-soft">
                <Clock aria-hidden className="size-4 text-rose-deep" />
                {formatDuration(plan.seconds)} · {plan.exercises.length}{" "}
                {plan.exercises.length === 1 ? "movement" : "movements"}
              </p>
            </div>

            {plan.rationale && (
              <p className="mt-3 leading-relaxed text-ink-soft">
                {plan.rationale}
              </p>
            )}

            <ul className="mt-4 flex flex-wrap gap-2">
              {plan.zones.map((zone) => (
                <li key={zone.slug}>
                  <Link href={`/face-yoga/${zone.slug}`}>
                    <Badge
                      variant="soft"
                      className="px-3 py-1.5 text-[13px] hover:underline"
                    >
                      {zone.zone}
                    </Badge>
                  </Link>
                </li>
              ))}
            </ul>

            <ol className="mt-4 space-y-3">
              {plan.exercises.map((exercise, index) => (
                <li key={exercise.slug}>
                  <Link
                    href={`/exercises/${exercise.slug}`}
                    className="group flex items-start gap-4 rounded-2xl border border-ink/10 bg-surface px-4 py-4 transition-colors hover:border-rose/30"
                  >
                    <span
                      aria-hidden
                      className="gradient-rose flex size-7 shrink-0 items-center justify-center rounded-full text-[13px] font-extrabold text-white"
                    >
                      {index + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-start justify-between gap-3">
                        <span className="font-bold group-hover:text-rose-deep">
                          {exercise.name}
                        </span>
                        <ArrowUpRight
                          aria-hidden
                          className="mt-0.5 size-4 shrink-0 text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rose-deep"
                        />
                      </span>
                      <span className="mt-1.5 flex flex-wrap items-center gap-2">
                        <Badge variant="soft" className="text-[11px]">
                          {exercise.zone}
                        </Badge>
                        <span className="text-[13px] font-semibold text-ink-muted">
                          {exercise.hold} · {exercise.reps} ·{" "}
                          {formatDuration(exercise.seconds)}
                        </span>
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>

            {plan.omitted.length > 0 && (
              <p className="mt-4 rounded-2xl border border-champagne/45 bg-champagne/8 px-5 py-4 leading-relaxed text-ink-soft">
                {plan.minutes} minutes did not stretch to{" "}
                {plan.omitted.join(" or ").toLowerCase()}. Give it a session of
                its own another day rather than rushing all of it into one.
              </p>
            )}

            {plan.cautions.length > 0 && (
              <div className="mt-4 rounded-2xl border border-champagne/45 bg-champagne/8 px-5 py-5">
                <h3 className="flex items-center gap-2 text-[13px] font-bold tracking-[0.1em] uppercase">
                  <ShieldAlert aria-hidden className="size-4" />
                  Applies to what you said
                </h3>
                <ul className="mt-3.5 space-y-3">
                  {plan.cautions.map((caution) => (
                    <li key={caution} className="leading-relaxed text-ink-soft">
                      {caution}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-5 flex flex-wrap gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setPlan(null);
                  setGoals("");
                }}
              >
                <RotateCcw aria-hidden className="size-4" />
                Start again
              </Button>
              <Button asChild variant="outline">
                <Link
                  href={`/tools/face-yoga-routine-builder?zones=${plan.zones
                    .map((zone) => zone.slug)
                    .join(",")}&minutes=${plan.minutes}`}
                >
                  Adjust it by hand
                  <ArrowUpRight aria-hidden className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
