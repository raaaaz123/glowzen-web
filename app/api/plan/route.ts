import type { NextRequest } from "next/server";

import { bedrockConfigured, converseOnce } from "@/lib/ai/bedrock";
import {
  MAX_INPUT_CHARS,
  parsePlan,
  planSystemPrompt,
  triggeredCautions,
} from "@/lib/ai/plan";
import { buildRoutine } from "@/lib/routine";
import { routinePool, routineZones } from "@/lib/routine-source";

/**
 * The one server route on this site.
 *
 * Everything else is prerendered static; this exists because the AI plan
 * builder needs a model, and a model needs a credential that must never reach
 * the browser. The route takes a sentence of free text, asks Kimi which areas
 * and how long, then builds the actual routine locally from the catalogue.
 *
 * It is deliberately hard to make this fail visibly. A missing credential, a
 * model timeout, a reply that is not JSON, a reply naming areas that do not
 * exist — each falls through to the same deterministic plan the non-AI builder
 * would have produced, flagged as `source: "fallback"` so the page can say so.
 * The reader came for a routine; a stack trace is not a routine.
 */

export const runtime = "nodejs";

/** Requests per IP per hour. Generous for a person, tight for a script. */
const LIMIT = 10;
const WINDOW_MS = 60 * 60 * 1000;

/**
 * In-memory, and therefore per-instance.
 *
 * On Vercel each concurrent lambda keeps its own Map, so the real ceiling is
 * `LIMIT × instances` rather than `LIMIT`. That is a known weakness, not an
 * oversight: it stops casual hammering and idle-tab retries, which is what
 * this is for. If the endpoint ever attracts deliberate abuse, this needs to
 * move to something shared — Upstash or Vercel KV — and that is the moment to
 * do it, not before.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();

  // Cheap sweep, so the Map cannot grow without bound on a warm instance.
  if (hits.size > 500) {
    for (const [key, value] of hits) {
      if (now > value.resetAt) hits.delete(key);
    }
  }

  const current = hits.get(ip);
  if (!current || now > current.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (current.count >= LIMIT) return true;
  current.count += 1;
  return false;
}

function clientIp(request: NextRequest): string {
  // `x-forwarded-for` is a comma-separated chain; the first entry is the
  // client as the edge saw it. Spoofable in general, trustworthy enough behind
  // Vercel, and the fallback keyed to "unknown" simply shares one bucket.
  const forwarded = request.headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

/** What the page renders. The model contributes only `rationale` + `cautions`. */
function assemble(
  zoneSlugs: string[],
  minutes: number,
  rationale: string,
  cautions: string[],
  source: "ai" | "fallback",
) {
  const zones = routineZones();
  const routine = buildRoutine(routinePool(), zoneSlugs, minutes * 60);
  const name = new Map(zones.map((zone) => [zone.slug, zone.zone]));

  return Response.json({
    source,
    minutes,
    rationale,
    cautions,
    zones: zoneSlugs.map((slug) => ({ slug, zone: name.get(slug) ?? slug })),
    seconds: routine.seconds,
    omitted: routine.omitted.map((slug) => name.get(slug) ?? slug),
    exercises: routine.exercises.map((exercise) => ({
      slug: exercise.slug,
      name: exercise.name,
      zone: name.get(exercise.zoneSlug) ?? exercise.zoneSlug,
      hold: exercise.hold,
      reps: exercise.reps,
      seconds: exercise.seconds,
    })),
  });
}

/**
 * Where every failure lands: the two areas most people arrive asking about.
 *
 * Still reads the input for the one distinction that must survive the model
 * being unreachable. Handing "cheeks and jawline" to somebody who has just
 * written that they grind their teeth would be worse advice than the tool
 * gives when it is working, and a broken dependency is no excuse for it.
 */
function fallback(goals: string) {
  const clencher = /\b(?:clench|clenching|grind|grinding|bruxis\w*)\b/i.test(
    goals,
  );
  return assemble(
    clencher ? ["eyes", "neck"] : ["cheeks", "jawline"],
    8,
    "",
    triggeredCautions(goals),
    "fallback",
  );
}

export async function POST(request: NextRequest) {
  if (rateLimited(clientIp(request))) {
    return Response.json(
      {
        error:
          "That is as many plans as this tool will build in an hour. The routine builder needs no such limit and does the same job without a model.",
      },
      { status: 429 },
    );
  }

  let goals = "";
  try {
    const body = (await request.json()) as { goals?: unknown };
    if (typeof body.goals === "string") goals = body.goals.trim();
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  if (goals.length < 3) {
    return Response.json(
      { error: "Tell it a little about what you want to work on first." },
      { status: 400 },
    );
  }

  if (!bedrockConfigured()) return fallback(goals);

  try {
    const raw = await converseOnce({
      system: planSystemPrompt(routineZones()),
      // Fenced as untrusted input. The system prompt sets the rules; anything
      // in here claiming to change them is the user talking, not the operator.
      user: `Here is what the person said about what they want:\n\n"""\n${goals.slice(0, MAX_INPUT_CHARS)}\n"""\n\nReturn the JSON object only.`,
      temperature: 0.3,
    });

    const plan = parsePlan(raw);
    if (!plan) return fallback(goals);

    // Ours first, the model's after, de-duplicated. The hand-written ones are
    // the reason a caution appears at all when it matters — see
    // `triggeredCautions`.
    const cautions = [
      ...new Set([...triggeredCautions(goals), ...plan.cautions]),
    ].slice(0, 4);

    return assemble(plan.zones, plan.minutes, plan.rationale, cautions, "ai");
  } catch (error) {
    // Timeout, throttle, expired key, region outage. The reader gets a working
    // routine either way; the detail goes to the server log, not to them.
    console.error("[plan] bedrock call failed:", error);
    return fallback(goals);
  }
}
