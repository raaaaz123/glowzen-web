"use client";

import * as React from "react";
import { Flame, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const STORAGE_KEY = "glowzen:practice-days:v1";
const WEEKS = 12;
const DAY_MS = 86_400_000;

/**
 * The habit calendar.
 *
 * Three things here look fussier than they need to and are not:
 *
 * **Dates are local, and formatted by hand.** `toISOString()` converts to UTC
 * first, so for anyone west of Greenwich an evening session lands on
 * tomorrow's square and for anyone east of it an early morning lands on
 * yesterday's. The key is the local calendar date — what the reader means by
 * "today" — so it is assembled from the local getters.
 *
 * **Day arithmetic goes through the date constructor, never `+ 86400000`.**
 * Adding a fixed day of milliseconds across a daylight-saving boundary lands
 * at 23:00 the previous day, which silently duplicates or skips a square twice
 * a year. `new Date(y, m, d + n)` normalises properly. Where whole-day
 * *distances* are needed instead — streak runs — the keys are converted to
 * integer day numbers through `Date.UTC`, which has no such boundaries.
 *
 * **The grid is built after mount, not during render.** It depends on today's
 * date and on localStorage, neither of which the server can know; rendering
 * either during the first pass means the server's markup and the browser's
 * disagreeing, which React reports as a hydration error.
 */
export default function StreakTracker() {
  const [days, setDays] = React.useState<Set<string>>(new Set());
  const [grid, setGrid] = React.useState<Grid | null>(null);

  React.useEffect(() => {
    setGrid(buildGrid());
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = stored ? JSON.parse(stored) : [];
      if (Array.isArray(parsed)) {
        setDays(
          new Set(parsed.filter((day): day is string => typeof day === "string")),
        );
      }
    } catch {
      // Corrupt JSON, or storage blocked outright in private mode. An empty
      // grid is a better outcome than a page that will not render.
    }
  }, []);

  const persist = (next: Set<string>) => {
    setDays(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
    } catch {
      // Storage full or refused. The marks still work for this visit, there is
      // no useful action for the reader to take, and the page states plainly
      // that none of this is backed up.
    }
  };

  const toggle = (key: string) => {
    const next = new Set(days);
    if (!next.delete(key)) next.add(key);
    persist(next);
  };

  const clear = () => {
    if (!window.confirm("Clear every mark? This cannot be undone.")) return;
    persist(new Set());
  };

  const stats = React.useMemo(
    () => summarise(days, grid?.todayKey),
    [days, grid?.todayKey],
  );
  const markedToday = Boolean(grid && days.has(grid.todayKey));

  return (
    <div>
      <Card>
        <CardContent className="p-5 sm:p-6">
          <div className="grid grid-cols-3 gap-4">
            <Stat
              label="Current streak"
              value={stats.current}
              suffix={stats.current === 1 ? "day" : "days"}
              accent
            />
            <Stat
              label="Longest"
              value={stats.longest}
              suffix={stats.longest === 1 ? "day" : "days"}
            />
            <Stat
              label="Marked in 12 weeks"
              value={stats.recent}
              suffix={stats.recent === 1 ? "day" : "days"}
            />
          </div>

          <div className="mt-7 overflow-x-auto pb-1">
            <div className="flex gap-1.5">
              {grid
                ? grid.weeks.map((week) => (
                    <div key={week[0].key} className="flex flex-col gap-1.5">
                      {week.map((day) => {
                        const marked = days.has(day.key);
                        return (
                          <button
                            key={day.key}
                            type="button"
                            disabled={day.future}
                            onClick={() => toggle(day.key)}
                            aria-pressed={marked}
                            title={day.label}
                            className={`size-6 rounded-[7px] border transition-colors sm:size-7 ${
                              day.future
                                ? "cursor-default border-transparent bg-white/5"
                                : marked
                                  ? "gradient-rose border-transparent"
                                  : "border-ink/10 bg-surface hover:border-rose/40"
                            } ${
                              day.key === grid.todayKey
                                ? "ring-2 ring-rose-deep ring-offset-2"
                                : ""
                            }`}
                          >
                            <span className="sr-only">
                              {day.label}
                              {marked ? " — practised" : " — not marked"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ))
                : // The pre-mount shape, so the card does not jump height when
                  // the real grid arrives a frame later.
                  Array.from({ length: WEEKS }, (_, week) => (
                    <div key={week} className="flex flex-col gap-1.5">
                      {Array.from({ length: 7 }, (_, day) => (
                        <span
                          key={day}
                          aria-hidden
                          className="block size-6 rounded-[7px] border border-ink/10 bg-surface sm:size-7"
                        />
                      ))}
                    </div>
                  ))}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[13px] font-semibold text-ink-muted">
              Twelve weeks. Today is ringed — tap any square to mark it.
            </p>
            {days.size > 0 && (
              <Button type="button" variant="ghost" size="sm" onClick={clear}>
                <Trash2 aria-hidden className="size-4" />
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-4">
        <Button
          type="button"
          variant={markedToday ? "outline" : "brand"}
          size="lg"
          disabled={!grid}
          onClick={() => grid && toggle(grid.todayKey)}
        >
          <Flame aria-hidden className="size-4" />
          {markedToday ? "Unmark today" : "I practised today"}
        </Button>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  suffix,
  accent = false,
}: {
  label: string;
  value: number;
  suffix: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p className="text-[11px] font-extrabold tracking-[0.1em] text-ink-muted uppercase">
        {label}
      </p>
      <p
        className={`font-display mt-1 text-[1.75rem] leading-none font-bold tabular-nums ${
          accent ? "text-rose-deep" : ""
        }`}
      >
        {value}
        <span className="ml-1.5 text-[13px] font-bold text-ink-muted">
          {suffix}
        </span>
      </p>
    </div>
  );
}

type GridDay = { key: string; label: string; future: boolean };
type Grid = { weeks: GridDay[][]; todayKey: string };

/** Local calendar date as `YYYY-MM-DD`. */
function keyOf(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/** A key as a whole-day number, for distances. UTC, so DST cannot reach it. */
function dayNumber(key: string): number {
  const [year, month, day] = key.split("-").map(Number);
  return Date.UTC(year, month - 1, day) / DAY_MS;
}

/**
 * Twelve columns of seven days, ending in the week that contains today.
 *
 * Weeks run Monday to Sunday, so the last column usually holds days that have
 * not happened yet. Those render disabled rather than being dropped, which
 * keeps the grid rectangular instead of ending in a ragged edge.
 */
function buildGrid(): Grid {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // getDay() is 0 for Sunday; shift so Monday is 0.
  const offsetToMonday = (today.getDay() + 6) % 7;
  const start = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - offsetToMonday - (WEEKS - 1) * 7,
  );

  const formatter = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const weeks: GridDay[][] = [];
  for (let week = 0; week < WEEKS; week += 1) {
    const column: GridDay[] = [];
    for (let day = 0; day < 7; day += 1) {
      const date = new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate() + week * 7 + day,
      );
      column.push({
        key: keyOf(date),
        label: formatter.format(date),
        future: date.getTime() > today.getTime(),
      });
    }
    weeks.push(column);
  }

  return { weeks, todayKey: keyOf(today) };
}

/**
 * Current streak, longest streak, and how many of the last 12 weeks are marked.
 *
 * The current streak forgives today until the day is over: missing yesterday
 * breaks it, but not having practised yet at nine in the morning does not. A
 * streak that evaporates at breakfast is a bad reading of the same data.
 */
function summarise(days: Set<string>, todayKey: string | undefined) {
  if (!todayKey) return { current: 0, longest: 0, recent: 0 };

  const marked = new Set([...days].map(dayNumber));
  const today = dayNumber(todayKey);

  let current = 0;
  let cursor = marked.has(today) ? today : today - 1;
  while (marked.has(cursor)) {
    current += 1;
    cursor -= 1;
  }

  let longest = 0;
  let run = 0;
  let previous: number | null = null;
  for (const day of [...marked].sort((a, b) => a - b)) {
    run = previous !== null && day - previous === 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
    previous = day;
  }

  const earliest = today - (WEEKS * 7 - 1);
  const recent = [...marked].filter((day) => day >= earliest).length;

  return { current, longest, recent };
}
