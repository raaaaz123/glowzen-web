"use client";

import * as React from "react";
import { Columns2, ImageUp, SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Picked = { url: string; name: string };

/**
 * Two photographs, side by side or under a slider.
 *
 * ## Nothing is uploaded, and that is structural
 *
 * `URL.createObjectURL` hands back a reference the browser resolves against
 * the file already on disk. No bytes are read into a request, there is no
 * endpoint to send them to, and the whole page is static. This is not a
 * promise about what a server does with the images — there is no server in
 * the path at all.
 *
 * The object URLs are revoked when a picture is replaced and when the page
 * goes, because they otherwise pin the file in memory for the life of the
 * document.
 *
 * ## Why `<img>` and not `next/image`
 *
 * `next/image` optimises through a server route, which is exactly what must
 * not happen here, and a `blob:` URL has no dimensions to reason about ahead
 * of time. The plain element is the correct one.
 */
export default function PhotoComparer() {
  const [before, setBefore] = React.useState<Picked | null>(null);
  const [after, setAfter] = React.useState<Picked | null>(null);
  const [mode, setMode] = React.useState<"side" | "slider">("side");
  const [position, setPosition] = React.useState(50);

  // Revoking in the cleanup means it happens both when the picture is swapped
  // and when the reader leaves — the cleanup closes over the *previous* value,
  // which is precisely the one going out of use.
  React.useEffect(
    () => () => {
      if (before) URL.revokeObjectURL(before.url);
    },
    [before],
  );
  React.useEffect(
    () => () => {
      if (after) URL.revokeObjectURL(after.url);
    },
    [after],
  );

  const both = before && after;

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Picker label="Earlier photo" picked={before} onPick={setBefore} />
        <Picker label="Recent photo" picked={after} onPick={setAfter} />
      </div>

      {both && (
        <>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button
              type="button"
              variant={mode === "side" ? "brand" : "outline"}
              size="sm"
              onClick={() => setMode("side")}
            >
              <Columns2 aria-hidden className="size-4" />
              Side by side
            </Button>
            <Button
              type="button"
              variant={mode === "slider" ? "brand" : "outline"}
              size="sm"
              onClick={() => setMode("slider")}
            >
              <SlidersHorizontal aria-hidden className="size-4" />
              Slider
            </Button>
          </div>

          {mode === "side" ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Framed src={before.url} caption="Earlier" />
              <Framed src={after.url} caption="Recent" />
            </div>
          ) : (
            <div className="mt-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-ink/10 bg-ink/4">
                <img
                  src={before.url}
                  alt="Your earlier photo"
                  className="absolute inset-0 size-full object-contain"
                />
                <div
                  className="absolute inset-0"
                  style={{ clipPath: `inset(0 0 0 ${position}%)` }}
                >
                  <img
                    src={after.url}
                    alt="Your recent photo"
                    className="absolute inset-0 size-full object-contain"
                  />
                </div>
                <div
                  aria-hidden
                  className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(27,27,46,0.25)]"
                  style={{ left: `${position}%` }}
                />
                <span className="absolute top-3 left-3 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-bold text-white">
                  Earlier
                </span>
                <span className="absolute top-3 right-3 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-bold text-white">
                  Recent
                </span>
              </div>

              {/* A real range input rather than a drag handle on the image:
                  it is keyboard-operable and screen readers announce it,
                  which a div listening for pointer events is not. */}
              <label
                htmlFor="compare-position"
                className="mt-4 block text-[11px] font-extrabold tracking-[0.1em] text-ink-muted uppercase"
              >
                Reveal
              </label>
              <input
                id="compare-position"
                type="range"
                min={0}
                max={100}
                value={position}
                onChange={(event) => setPosition(Number(event.target.value))}
                className="mt-2 w-full accent-rose"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Picker({
  label,
  picked,
  onPick,
}: {
  label: string;
  picked: Picked | null;
  onPick: (picked: Picked | null) => void;
}) {
  const id = React.useId();

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-3">
          <label
            htmlFor={id}
            className="text-[11px] font-extrabold tracking-[0.1em] text-ink-muted uppercase"
          >
            {label}
          </label>
          {picked && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onPick(null)}
            >
              <X aria-hidden className="size-4" />
              Remove
            </Button>
          )}
        </div>

        <label
          htmlFor={id}
          className="mt-2.5 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-ink/20 px-4 py-3.5 transition-colors hover:border-rose/40"
        >
          <ImageUp aria-hidden className="size-5 shrink-0 text-rose-deep" />
          <span className="min-w-0 text-[15px] font-bold">
            <span className="block truncate">
              {picked ? picked.name : "Choose a photo"}
            </span>
            <span className="block text-[13px] font-semibold text-ink-muted">
              Stays on your device
            </span>
          </span>
        </label>
        <input
          id={id}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            onPick({ url: URL.createObjectURL(file), name: file.name });
            // Clearing the input means picking the same file twice in a row
            // still fires a change event.
            event.target.value = "";
          }}
        />
      </CardContent>
    </Card>
  );
}

function Framed({ src, caption }: { src: string; caption: string }) {
  return (
    <figure>
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-ink/10 bg-ink/4">
        <img
          src={src}
          alt={`Your ${caption.toLowerCase()} photo`}
          className="absolute inset-0 size-full object-contain"
        />
      </div>
      <figcaption className="mt-2 text-[13px] font-bold text-ink-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
