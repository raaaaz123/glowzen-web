import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import SectionHeading from "./SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { zones } from "@/lib/zones";
import { exercisesForZone } from "@/lib/content/exercises";

export default function Areas() {
  return (
    <section id="areas" className="scroll-mt-24 px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Where it bothers you"
          title="Start with the part you notice in photos"
          lead="Everyone has one. The jaw that softened, the brow that never quite relaxes, the eyes that read tired on a good night's sleep. Your plan is built around yours, not around an average face."
        />

        {/* Each card links through to its zone page. This block is the home
            page's main path into the content pages, so the links matter as
            much to crawlers as they do to readers. */}
        <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {zones.map((zone) => {
            const zoneExercises = exercisesForZone(zone.slug);
            return (
              <Card key={zone.slug} className="overflow-hidden">
                <div
                  className={`flex items-center justify-between gap-3 bg-gradient-to-br ${zone.tint} px-5 py-4`}
                >
                  <h3 className="text-lg font-bold">
                    <Link
                      href={`/face-yoga/${zone.slug}`}
                      className="hover:underline"
                    >
                      {zone.zone}
                    </Link>
                  </h3>
                  <Badge variant="outline" className="bg-white/70">
                    {zoneExercises.length}
                  </Badge>
                </div>

                <CardContent className="flex-1 pt-4">
                  <ul className="space-y-2">
                    {zoneExercises.map((exercise) => (
                      <li key={exercise.slug}>
                        <Link
                          href={`/exercises/${exercise.slug}`}
                          className="flex items-center gap-2.5 text-[15px] font-semibold text-ink-soft hover:text-rose-deep hover:underline"
                        >
                          <span
                            aria-hidden
                            className="size-1.5 shrink-0 rounded-full bg-rose"
                          />
                          {exercise.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Link
                    href={`/face-yoga/${zone.slug}`}
                    className="inline-flex items-center gap-1 text-[15px] font-bold text-rose-deep hover:underline"
                  >
                    How to train this area
                    <ArrowUpRight aria-hidden className="size-4" />
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
