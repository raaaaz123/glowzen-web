"use client";

import * as React from "react";
import { Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDuration, type TimerPreset } from "@/lib/routine";

type Phase = "idle" | "work" | "rest" | "done";

const CUSTOM = "custom";

/**
 * The interval timer.
 *
 * ## Why the countdown is derived from a deadline
 *
 * The obvious implementation — a one-second interval that decrements a counter
 * — drifts. `setInterval` is not paid on time under load, and browsers
 * deliberately slow timers in backgrounded tabs, so a thirty-second hold
 * counted that way can run well past thirty seconds. Here the phase gets an
 * absolute deadline when it starts and the interval only *reads the clock*, at
 * 200ms so the visible number turns over promptly. However badly the interval
 * is served, the hold still ends when it should.
 *
 * ## Why the cues are audible
 *
 * Nearly every movement in the catalogue puts both hands on the face, several
 * ask for closed eyes, and a couple have the reader looking at the ceiling.
 * A timer that has to be watched is no use in any of them. The tones are
 * synthesised rather than loaded, so there is no audio file to fetch and
 * nothing to fail on a slow connection.
 */
export default function SessionTimer({ presets }: { presets: TimerPreset[] }) {
  const [presetSlug, setPresetSlug] = React.useState(
    presets[0]?.slug ?? CUSTOM,
  );
  const [work, setWork] = React.useState(presets[0]?.work ?? 20);
  const [rest, setRest] = React.useState(presets[0]?.rest ?? 10);
  const [rounds, setRounds] = React.useState(presets[0]?.rounds ?? 3);

  const [phase, setPhase] = React.useState<Phase>("idle");
  const [round, setRound] = React.useState(1);
  const [remaining, setRemaining] = React.useState(presets[0]?.work ?? 20);
  const [running, setRunning] = React.useState(false);
  const [sound, setSound] = React.useState(true);

  const deadline = React.useRef(0);
  const audio = React.useRef<AudioContext | null>(null);
  const wakeLock = React.useRef<WakeLockSentinel | null>(null);

  const total = rounds * work + Math.max(0, rounds - 1) * rest;

  /** A short synthesised tone. Higher to start work, lower to release. */
  const tone = React.useCallback(
    (frequency: number, seconds = 0.18) => {
      if (!sound) return;
      try {
        audio.current ??= new AudioContext();
        const ctx = audio.current;
        // Safari suspends the context whenever the tab loses focus; resuming
        // is free when it is already running.
        void ctx.resume();

        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        oscillator.frequency.value = frequency;
        oscillator.type = "sine";
        // Ramped rather than switched, because an abrupt stop on a sine wave
        // clicks audibly.
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(
          0.0001,
          ctx.currentTime + seconds,
        );
        oscillator.connect(gain).connect(ctx.destination);
        oscillator.start();
        oscillator.stop(ctx.currentTime + seconds);
      } catch {
        // No audio output, a blocked context, or a browser that will not make
        // a sound without a gesture it recognises. The countdown is still on
        // screen, so this is not worth surfacing.
      }
    },
    [sound],
  );

  const releaseWakeLock = React.useCallback(() => {
    void wakeLock.current?.release().catch(() => {});
    wakeLock.current = null;
  }, []);

  const requestWakeLock = React.useCallback(async () => {
    if (!("wakeLock" in navigator)) return;
    try {
      wakeLock.current = await navigator.wakeLock.request("screen");
    } catch {
      // Refused on a background tab, on low battery, or unsupported. The
      // session runs either way; the screen may just dim.
    }
  }, []);

  // Reset whenever the configuration changes. Editing the hold length while a
  // countdown is mid-flight and having it keep going against the old number is
  // the sort of thing that quietly ruins a set.
  React.useEffect(() => {
    setRunning(false);
    setPhase("idle");
    setRound(1);
    setRemaining(work);
  }, [work, rest, rounds]);

  React.useEffect(() => {
    if (!running) return;

    const tick = () => {
      const left = Math.max(
        0,
        Math.ceil((deadline.current - Date.now()) / 1000),
      );
      setRemaining(left);
      if (left > 0) return;

      if (phase === "work") {
        if (round >= rounds) {
          setPhase("done");
          setRunning(false);
          releaseWakeLock();
          tone(523.25, 0.5);
          return;
        }
        setPhase("rest");
        deadline.current = Date.now() + rest * 1000;
        setRemaining(rest);
        tone(392);
        return;
      }

      if (phase === "rest") {
        setRound((current) => current + 1);
        setPhase("work");
        deadline.current = Date.now() + work * 1000;
        setRemaining(work);
        tone(880);
      }
    };

    const id = window.setInterval(tick, 200);
    return () => window.clearInterval(id);
  }, [running, phase, round, rounds, work, rest, tone, releaseWakeLock]);

  React.useEffect(() => releaseWakeLock, [releaseWakeLock]);

  const start = () => {
    if (phase === "idle" || phase === "done") {
      setRound(1);
      setPhase("work");
      setRemaining(work);
      deadline.current = Date.now() + work * 1000;
      tone(880);
    } else {
      // Resuming: give back exactly what was left when it was paused.
      deadline.current = Date.now() + remaining * 1000;
    }
    setRunning(true);
    void requestWakeLock();
  };

  const pause = () => {
    setRunning(false);
    releaseWakeLock();
  };

  const reset = () => {
    setRunning(false);
    setPhase("idle");
    setRound(1);
    setRemaining(work);
    releaseWakeLock();
  };

  const choosePreset = (slug: string) => {
    setPresetSlug(slug);
    const preset = presets.find((item) => item.slug === slug);
    if (!preset) return;
    setWork(preset.work);
    setRest(preset.rest);
    setRounds(preset.rounds);
  };

  const label =
    phase === "work"
      ? "Hold"
      : phase === "rest"
        ? "Release"
        : phase === "done"
          ? "Done"
          : "Ready";

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const clock =
    remaining >= 60
      ? `${minutes}:${String(seconds).padStart(2, "0")}`
      : String(remaining);

  return (
    <div>
      <Card>
        <CardContent className="p-5 sm:p-6">
          <label
            htmlFor="timer-preset"
            className="text-xs font-extrabold tracking-[0.12em] text-ink-muted uppercase"
          >
            Exercise
          </label>
          <select
            id="timer-preset"
            value={presetSlug}
            onChange={(event) => choosePreset(event.target.value)}
            className="mt-2.5 w-full rounded-xl border border-ink/12 bg-white px-4 py-2.5 text-[15px] font-semibold"
          >
            {presets.map((preset) => (
              <option key={preset.slug} value={preset.slug}>
                {preset.name}
              </option>
            ))}
            <option value={CUSTOM}>Custom timing</option>
          </select>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <Field
              id="timer-work"
              label="Hold (sec)"
              value={work}
              min={3}
              max={180}
              onChange={(value) => {
                setPresetSlug(CUSTOM);
                setWork(value);
              }}
            />
            <Field
              id="timer-rest"
              label="Rest (sec)"
              value={rest}
              min={0}
              max={120}
              onChange={(value) => {
                setPresetSlug(CUSTOM);
                setRest(value);
              }}
            />
            <Field
              id="timer-rounds"
              label="Rounds"
              value={rounds}
              min={1}
              max={20}
              onChange={(value) => {
                setPresetSlug(CUSTOM);
                setRounds(value);
              }}
            />
          </div>
        </CardContent>
      </Card>

      <div
        className={`mt-5 rounded-[var(--radius-card)] border px-6 py-10 text-center transition-colors ${
          phase === "work"
            ? "border-rose/30 bg-blush/40"
            : phase === "rest"
              ? "border-mint/40 bg-mint/8"
              : "border-ink/10 bg-white"
        }`}
      >
        <p
          className="text-xs font-extrabold tracking-[0.18em] text-ink-muted uppercase"
          aria-live="polite"
        >
          {phase === "done"
            ? `${rounds} rounds finished`
            : `${label} · round ${round} of ${rounds}`}
        </p>
        <p className="font-display mt-3 text-[4.5rem] leading-none font-bold tabular-nums sm:text-[5.5rem]">
          {clock}
        </p>
        <p className="mt-3 text-[15px] font-semibold text-ink-soft">
          {phase === "done"
            ? "Let the area go slack before you start the next exercise."
            : `Whole set: ${formatDuration(total)}`}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button
            type="button"
            variant="brand"
            size="lg"
            onClick={running ? pause : start}
          >
            {running ? (
              <Pause aria-hidden className="size-4" />
            ) : (
              <Play aria-hidden className="size-4" />
            )}
            {running ? "Pause" : phase === "idle" ? "Start" : "Resume"}
          </Button>
          <Button type="button" variant="outline" size="lg" onClick={reset}>
            <RotateCcw aria-hidden className="size-4" />
            Reset
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="lg"
            aria-pressed={sound}
            onClick={() => setSound((on) => !on)}
          >
            {sound ? (
              <Volume2 aria-hidden className="size-4" />
            ) : (
              <VolumeX aria-hidden className="size-4" />
            )}
            {sound ? "Sound on" : "Sound off"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  min,
  max,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-[11px] font-extrabold tracking-[0.1em] text-ink-muted uppercase"
      >
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        value={value}
        min={min}
        max={max}
        onChange={(event) => {
          const next = Number(event.target.value);
          // An empty field parses as 0, which would silently become a
          // zero-second hold. Clamp instead, and leave the extremes usable.
          if (Number.isNaN(next)) return;
          onChange(Math.min(max, Math.max(min, next)));
        }}
        className="mt-1.5 w-full rounded-xl border border-ink/12 bg-white px-3 py-2.5 text-[15px] font-bold tabular-nums"
      />
    </div>
  );
}
