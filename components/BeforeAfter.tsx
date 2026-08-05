"use client";

import Image from "next/image";
import { useCallback, useId, useRef, useState } from "react";

/**
 * Before/after reveal.
 *
 * Position is driven by pointer events on the frame rather than by a
 * transparent range input stretched over it: the input's invisible thumb
 * swallows clicks near itself and jumps to its own track geometry, so a click
 * on the far side of the image lands on the wrong value. The range input is
 * still here, visually hidden, because it is what gives keyboard users arrow
 * control and what a screen reader announces.
 */
export default function BeforeAfter({
  before = "/before.png",
  after = "/after.png",
  className = "",
}: {
  before?: string;
  after?: string;
  className?: string;
}) {
  const [position, setPosition] = useState(52);
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const positionFromEvent = useCallback((clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const { left, width } = frame.getBoundingClientRect();
    const next = ((clientX - left) / width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  return (
    <figure className={className}>
      <div
        ref={frameRef}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          setDragging(true);
          positionFromEvent(event.clientX);
        }}
        onPointerMove={(event) => {
          if (dragging) positionFromEvent(event.clientX);
        }}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        className="relative aspect-3/4 w-full cursor-ew-resize touch-none overflow-hidden rounded-[var(--radius-hero)] border border-white/70 shadow-[var(--shadow-lift)] select-none"
      >
        {/* After sits underneath; the before layer clips away to reveal it. */}
        <Image
          src={after}
          alt="A face after following a facial exercise routine"
          fill
          sizes="(max-width: 1024px) 90vw, 460px"
          className="pointer-events-none object-cover"
          priority
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={before}
            alt="The same face before the routine"
            fill
            sizes="(max-width: 1024px) 90vw, 460px"
            className="object-cover"
            priority
          />
        </div>

        <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-ink/55 px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase backdrop-blur-sm">
          Before
        </span>
        <span className="pointer-events-none absolute top-4 right-4 rounded-full bg-rose-deep/85 px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase backdrop-blur-sm">
          After
        </span>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/90 shadow-[0_0_14px_rgba(0,0,0,0.3)]"
          style={{ left: `${position}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-rose-deep shadow-lg ring-1 ring-black/5">
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
              <path
                d="M8 5 4 10l4 5M12 5l4 5-4 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>

      <label htmlFor={id} className="sr-only">
        Reveal the before and after images
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(position)}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-valuetext={`${Math.round(position)}% before`}
        className="sr-only"
      />

      {/* Non-negotiable: these are generated images, not a customer's results. */}
      <figcaption className="mt-4 text-center text-xs leading-relaxed font-semibold text-ink-muted">
        Illustration only — not a customer photo.
        <br />
        Individual results vary and are not guaranteed.
      </figcaption>
    </figure>
  );
}
