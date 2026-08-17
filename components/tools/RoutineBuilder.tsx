"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Clock, Copy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  buildRoutine,
  formatDuration,
  SESSION_LENGTHS,
  type RoutineExercise,
  type RoutineZone,
} from "@/lib/routine";

/**
 * The routine builder widget.
 *
 * The catalogue arrives trimmed from the server (`lib/routine-source.ts`) and
 * the arrangement happens in `lib/routine.ts`, so this file is only selection
 * state and markup.
 *
 * Zone selections and the chosen length come from the URL when they are there
 * — the quiz ends by linking here with `?zones=jawline,neck&minutes=8`, and a
 * result the reader can act on immediately beats one that asks them to answer
 * the same questions twice.
 *
 * Read once on mount from `window.location`, deliberately, rather than through
 * `useSearchParams`: this page is otherwise fully static, and the hook would
 * pull it into a Suspense boundary to support a query string that only ever
 * arrives with the first paint.
 */
export default function RoutineBuilder({
  pool,
  zones,
}: {
  pool: RoutineExercise[];
  zones: RoutineZone[];
}) {
  const [selected, setSelected] = React.useState<string[]>([
    "jawline",
    "cheeks",
  ]);
  const [minutes, setMinutes] = React.useState(8);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const zoneParam = params.get("zones");
    if (zoneParam) {
      const known = new Set(zones.map((zone) => zone.slug));
      const asked = zoneParam.split(",").filter((slug) => known.has(slug));
      if (asked.length) setSelected(asked);
    }

    const minutesParam = Number(params.get("minutes"));
    if (SESSION_LENGTHS.includes(minutesParam)) setMinutes(minutesParam);
  }, [zones]);

  const routine = React.useMemo(
    () => buildRoutine(pool, selected, minutes * 60),
    [pool, selected, minutes],
  );

  const zoneName = React.useMemo(
    () => new Map(zones.map((zone) => [zone.slug, zone.zone])),
    [zones],
  );

  const toggle = (slug: string) => {
    setCopied(false);
    setSelected((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug],
    );
  };

  const copy = async () => {
    const lines = routine.exercises.map(
      (exercise, index) =>
        `${index + 1}. ${exercise.name} — ${exercise.hold}, ${exercise.reps}`,
    );
    const text = [
      `Face yoga routine (${formatDuration(routine.seconds)})`,
      ...lines,
      "",
      "Built with https://glowzen.app/tools/face-yoga-routine-builder",
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard access can be refused outright — an insecure context, a
      // permission policy, or a browser that simply says no. The routine is
      // on the screen either way, so there is nothing worth interrupting the
      // reader about.
    }
  };

  return (
    <div>
      <Card>
        <CardContent className="p-5 sm:p-6">
          <fieldset>
            <legend className="text-xs font-extrabold tracking-[0.12em] text-ink-muted uppercase">
              Areas to work
            </legend>
            <div className="mt-3.5 flex flex-wrap gap-2">
              {zones.map((zone) => {
                const on = selected.includes(zone.slug);
                return (
                  <label
                    key={zone.slug}
                    className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-[15px] font-bold transition-colors ${
                      on
                        ? "border-rose bg-blush/50 text-rose-deep"
                        : "border-ink/10 bg-surface hover:border-rose/30"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={on}
                      onChange={() => toggle(zone.slug)}
                    />
                    <span
                      aria-hidden
                      className={`flex size-4 items-center justify-center rounded-[5px] border ${
                        on ? "border-rose bg-rose text-white" : "border-ink/25"
                      }`}
                    >
                      {on && <Check className="size-3" strokeWidth={3.5} />}
                    </span>
                    {zone.zone}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-xs font-extrabold tracking-[0.12em] text-ink-muted uppercase">
              Time you have
            </legend>
            <div className="mt-3.5 flex flex-wrap gap-2">
              {SESSION_LENGTHS.map((length) => {
                const on = minutes === length;
                return (
                  <label
                    key={length}
                    className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-[15px] font-bold transition-colors ${
                      on
                        ? "border-rose bg-blush/50 text-rose-deep"
                        : "border-ink/10 bg-surface hover:border-rose/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="session-length"
                      className="sr-only"
                      checked={on}
                      onChange={() => {
                        setCopied(false);
                        setMinutes(length);
                      }}
                    />
                    {length} minutes
                  </label>
                );
              })}
            </div>
          </fieldset>
        </CardContent>
      </Card>

      <div aria-live="polite">
        {selected.length === 0 ? (
          <p className="mt-5 rounded-2xl border border-ink/10 bg-surface px-5 py-6 text-center leading-relaxed text-ink-soft">
            Pick at least one area above. Two or three is a sensible session;
            all seven is a long evening.
          </p>
        ) : (
          <div className="mt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
              <h3 className="font-display text-xl font-bold sm:text-2xl">
                Your routine
              </h3>
              <p className="flex items-center gap-2 text-[15px] font-bold text-ink-soft">
                <Clock aria-hidden className="size-4 text-rose-deep" />
                {formatDuration(routine.seconds)} ·{" "}
                {routine.exercises.length}{" "}
                {routine.exercises.length === 1 ? "movement" : "movements"}
              </p>
            </div>

            <ol className="mt-4 space-y-3">
              {routine.exercises.map((exercise, index) => (
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
                          {zoneName.get(exercise.zoneSlug)}
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

            {routine.omitted.length > 0 && (
              <p className="mt-4 rounded-2xl border border-champagne/45 bg-champagne/8 px-5 py-4 leading-relaxed text-ink-soft">
                {minutes} minutes did not stretch to{" "}
                {new Intl.ListFormat("en", {
                  style: "long",
                  type: "conjunction",
                }).format(
                  routine.omitted.map(
                    (slug) => zoneName.get(slug)?.toLowerCase() ?? slug,
                  ),
                )}
                . Add a few minutes, or drop an area and give it a session of
                its own another day.
              </p>
            )}

            <div className="mt-5 flex flex-wrap gap-3">
              <Button type="button" variant="outline" onClick={copy}>
                {copied ? (
                  <Check aria-hidden className="size-4" />
                ) : (
                  <Copy aria-hidden className="size-4" />
                )}
                {copied ? "Copied" : "Copy routine"}
              </Button>
              <Button asChild variant="outline">
                <Link href="/tools/face-yoga-timer">
                  Time it
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
