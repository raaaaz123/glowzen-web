"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Repeat2, Timer } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Exercise } from "@/lib/content/exercises";

export type BrowserZone = { slug: string; zone: string };

/**
 * The zone filter for `/exercises`.
 *
 * ## Why "All" is the default tab, and why that is not a styling choice
 *
 * Radix does not render an inactive `TabsContent`, so whatever the default tab
 * is, that is the only content in the server-rendered HTML. This page exists to
 * be crawled — its whole purpose is to rank and be quoted — so the default has
 * to be the tab containing every exercise. Change the default to a zone and 17
 * of the 18 exercises silently vanish from the HTML a crawler sees.
 *
 * The same reasoning rules out rendering all eight panels with `forceMount`:
 * that puts the full catalogue in the DOM twice, once under "All" and again
 * under its zone, which is duplicate content on a single URL.
 *
 * Filtering happens over one array, so no card is ever declared twice.
 */
export default function ExerciseBrowser({
  exercises,
  zones,
}: {
  exercises: Exercise[];
  zones: BrowserZone[];
}) {
  const zoneName = React.useMemo(
    () => new Map(zones.map((zone) => [zone.slug, zone.zone])),
    [zones],
  );

  return (
    <Tabs defaultValue="all">
      <TabsList aria-label="Filter exercises by area">
        <TabsTrigger value="all">
          All
          <Badge
            variant="soft"
            className="ml-0.5 px-1.5 py-0 text-[11px] tabular-nums"
          >
            {exercises.length}
          </Badge>
        </TabsTrigger>
        {zones.map((zone) => (
          <TabsTrigger key={zone.slug} value={zone.slug}>
            {zone.zone}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="all">
        <Grid
          exercises={exercises}
          zoneName={zoneName}
          showZone
        />
      </TabsContent>

      {zones.map((zone) => (
        <TabsContent key={zone.slug} value={zone.slug}>
          <Grid
            exercises={exercises.filter(
              (exercise) => exercise.zoneSlug === zone.slug,
            )}
            zoneName={zoneName}
          />
          <p className="mt-6">
            <Link
              href={`/face-yoga/${zone.slug}`}
              className="text-[15px] font-bold text-rose-deep hover:underline"
            >
              How to train the {zone.zone.toLowerCase()} →
            </Link>
          </p>
        </TabsContent>
      ))}
    </Tabs>
  );
}

function Grid({
  exercises,
  zoneName,
  showZone = false,
}: {
  exercises: Exercise[];
  zoneName: Map<string, string>;
  showZone?: boolean;
}) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {exercises.map((exercise) => (
        <li key={exercise.slug} className="flex">
          <Link
            href={`/exercises/${exercise.slug}`}
            className="group flex w-full rounded-2xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <Card className="w-full transition-all group-hover:-translate-y-1 group-hover:border-rose/30 group-hover:shadow-[var(--shadow-card)]">
              <CardHeader className="flex-1">
                {showZone && (
                  <Badge
                    variant="soft"
                    className="mb-1 self-start text-[11px] tracking-wide uppercase"
                  >
                    {zoneName.get(exercise.zoneSlug)}
                  </Badge>
                )}
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-[17px] group-hover:text-rose-deep">
                    {exercise.name}
                  </CardTitle>
                  <ArrowUpRight
                    aria-hidden
                    className="mt-0.5 size-4 shrink-0 text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rose-deep"
                  />
                </div>
                <CardDescription>{exercise.summary}</CardDescription>
              </CardHeader>
              <CardFooter className="flex-wrap gap-2">
                <Badge variant="outline">
                  <Timer aria-hidden />
                  {exercise.hold}
                </Badge>
                <Badge variant="outline">
                  <Repeat2 aria-hidden />
                  {exercise.reps}
                </Badge>
              </CardFooter>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
}
