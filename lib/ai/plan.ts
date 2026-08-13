/**
 * The prompt and the validation around it for the AI plan builder.
 *
 * ## The model does not write the routine
 *
 * It reads a sentence or two of free text and returns two decisions — which
 * zones, and how many minutes — plus prose explaining them. The actual routine
 * comes from `buildRoutine`, over the real catalogue, exactly as the
 * non-AI builder produces it. So the model cannot invent an exercise, cannot
 * change a hold length, and cannot put the neck release first. The worst it can
 * do is pick unhelpful zones, and every zone in the catalogue is safe to
 * suggest.
 *
 * That is the whole design. A model asked to "write a face yoga plan" will
 * happily produce five plausible-sounding movements that do not exist, with
 * confident timings, attached to claims about what they achieve. Narrowing its
 * job to a choice between seven known slugs removes that failure mode by
 * construction rather than by asking it nicely.
 *
 * ## The guardrails are legal controls, not tone
 *
 * `CONTENT-PLAN.md` sets them out and `lib/content/exercises.ts` repeats them:
 * no medical claims, no promised results, no competitor names. A model writing
 * about "a double chin" will overclaim by default — it is the most common
 * register in its training data for this subject. So the rules are stated in
 * the system prompt *and* checked on the way out, because a prompt is a request
 * and not a guarantee.
 */

import type { RoutineZone } from "@/lib/routine";
import { SESSION_LENGTHS, ZONE_ORDER } from "@/lib/routine";

/** The most free text we will read. Longer inputs are truncated, not refused. */
export const MAX_INPUT_CHARS = 600;

export type PlanChoice = {
  zones: string[];
  minutes: number;
  rationale: string;
  cautions: string[];
};

export function planSystemPrompt(zones: RoutineZone[]): string {
  const catalogue = zones
    .map((zone) => `- "${zone.slug}" — ${zone.zone}`)
    .join("\n");

  return `You help someone choose where to start with face yoga (facial exercise) on GlowZen's website. You do NOT write the routine — the site builds that from its own catalogue once you have chosen the areas. Your only job is to pick the areas, pick a session length, and explain the choice honestly.

## The areas you may choose from

${catalogue}

Use the quoted slug exactly. Never invent an area, and never name a specific exercise — you do not have the catalogue in front of you and you will get the names wrong.

## Session lengths you may choose from

${SESSION_LENGTHS.join(", ")} (minutes). Pick the one closest to the time they say they have. If they do not say, choose 8.

## How many areas

Two or three. One is acceptable if they are clearly focused on a single thing. Never more than three: the first fortnight is when people quit, and a long session is the reason.

## Rules you must not break

1. NEVER promise or imply a result. Facial exercise is a general wellbeing practice. It does not remove, reduce, treat, cure, prevent, fix, tighten or lift anything. Do not attach a timeframe to a change ("in six weeks you'll…") — that is a sales tactic, not information.
2. NEVER give medical advice or suggest anything is a diagnosis. If they mention pain, clicking, grinding, a jaw or neck condition, recent surgery, dental work, botulinum toxin or filler, or an eye condition, add a caution telling them to ask a dentist, doctor or the clinician who treated them BEFORE starting — and do not choose the area concerned if it is the affected one.
3. If they clench or grind their teeth, do not choose "jawline" as a main area. Adding deliberate load to a muscle already overworked overnight can make tension worse. Prefer release work — "eyes" (which covers the temples) and "neck".
4. NEVER name another app, brand, product, clinic or treatment by name.
5. Be hedged and specific, in the register of "honestly, it depends on the person". Never enthusiastic, never salesy, no exclamation marks, no emoji.
6. Say plainly, when it is relevant, that nothing here can see their face and that this is a starting point rather than an assessment.
7. British spelling.

## What to return

Return ONLY a JSON object, with no markdown fence, no commentary before or after:

{
  "zones": ["slug", "slug"],
  "minutes": 8,
  "rationale": "Two or three sentences explaining why these areas and this length, addressed to them as 'you'. No promises, no timeframes.",
  "cautions": ["Any caution that genuinely applies to what they said. Empty array if none genuinely applies — do not pad it."]
}`;
}

/**
 * Cautions the site raises itself, from what the reader typed.
 *
 * The prompt asks the model to flag these and it usually does — but in testing
 * it wrote "I have chosen neck rather than jawline because you grind your
 * teeth" into the rationale and returned an empty `cautions` array, which is
 * the reasoning without the instruction to go and ask a dentist. That is the
 * one thing on this page that must not depend on a model getting it right.
 *
 * So these are matched here, in code, and always shown. The wording is
 * hand-written and taken from the zone and exercise pages, which means it is
 * exempt from the overclaim filter — it is ours, not generated. Anything the
 * model adds is appended after.
 */
const TRIGGERED_CAUTIONS: { pattern: RegExp; caution: string }[] = [
  {
    pattern: /\b(?:clench|clenching|grind|grinding|bruxis\w*)\b/i,
    caution:
      "You mentioned clenching or grinding. Ask a dentist before adding jaw work: putting deliberate load on a muscle that is already overworked overnight can make the tension worse rather than better. Release movements are the more sensible starting point.",
  },
  {
    pattern: /\b(?:tmj|tmd|jaw (?:click|pop|pain|ache|hurt)\w*|clicking jaw|lockjaw)\b/i,
    caution:
      "A jaw that clicks or aches is worth raising with a dentist or physiotherapist before you exercise it, not after. The jawline movements combine a head tilt with a jaw jut and are the ones most likely to aggravate an existing joint problem.",
  },
  {
    pattern: /\b(?:botox|botulinum|filler|fillers|dermal filler)\b/i,
    caution:
      "If you have had botulinum toxin or filler, ask the clinician who treated you before doing resistance or sustained-pressure work over the treated area. They know what was placed and where.",
  },
  {
    pattern: /\b(?:dental|dentist|wisdom tooth|root canal|braces|implant|extraction)\b/i,
    caution:
      "Recent dental work means keeping pressure off the area while it settles. Check with your dentist before starting the jaw and cheek movements.",
  },
  {
    pattern: /\b(?:glaucoma|cataract|lasik|eye surgery|eye infection|conjunctivitis)\b/i,
    caution:
      "Skip the eye zone entirely for now. Glaucoma, recent eye surgery and active infections are all reasons to leave the area alone, and that is a question for a doctor rather than a website.",
  },
  {
    pattern: /\b(?:neck injury|whiplash|cervical|slipped disc|herniat\w*|pinched nerve)\b/i,
    caution:
      "A diagnosed neck condition rules out the neck and jawline movements until a doctor or physiotherapist says otherwise. Stop immediately if you ever feel pinching, tingling, or anything travelling down an arm.",
  },
  {
    pattern: /\b(?:migraine|migraines)\b/i,
    caution:
      "If you get migraines, keep any pressure at the temples very light and stop if anything sharpens.",
  },
  {
    pattern: /\b(?:pain|painful|hurts?|hurting|sore|aching)\b/i,
    caution:
      "You mentioned pain. Facial exercise is not a treatment for it, and something that hurts is a reason to see a doctor or dentist rather than to work around it. If a movement hurts while you are doing it, stop.",
  },
];

/** Hand-written cautions triggered by what the reader actually typed. */
export function triggeredCautions(goals: string): string[] {
  return TRIGGERED_CAUTIONS.filter(({ pattern }) => pattern.test(goals))
    .map(({ caution }) => caution)
    .slice(0, 3);
}

/** Everything the model is allowed to pick from, for validation. */
const VALID_ZONES = new Set(ZONE_ORDER);

/**
 * Parse and validate the model's reply.
 *
 * Returns null on anything unusable, which the route treats as "fall back to
 * the deterministic plan" rather than as an error worth showing. Prose is
 * length-capped and stripped of anything that reads as a promise.
 */
export function parsePlan(raw: string): PlanChoice | null {
  const json = extractJson(raw);
  if (!json) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return null;
  }
  if (!parsed || typeof parsed !== "object") return null;

  const candidate = parsed as Record<string, unknown>;

  // Zones: known slugs only, de-duplicated, capped at three. An unknown slug is
  // dropped rather than failing the whole reply — three good picks and one
  // hallucinated one is still a usable answer.
  const zones = Array.isArray(candidate.zones)
    ? [
        ...new Set(
          candidate.zones.filter(
            (zone): zone is string =>
              typeof zone === "string" && VALID_ZONES.has(zone),
          ),
        ),
      ].slice(0, 3)
    : [];
  if (zones.length === 0) return null;

  const minutes = SESSION_LENGTHS.includes(Number(candidate.minutes))
    ? Number(candidate.minutes)
    : 8;

  const rationale = cleanProse(candidate.rationale, 600);

  const cautions = Array.isArray(candidate.cautions)
    ? candidate.cautions
        .map((caution) => cleanProse(caution, 400))
        .filter(Boolean)
        .slice(0, 4)
    : [];

  return { zones, minutes, rationale, cautions };
}

/**
 * Phrases that would put a claim on the page we do not stand behind.
 *
 * A hit drops that piece of prose entirely — the routine is still correct
 * without it, so silence is the safe failure. Being over-eager here costs a
 * paragraph; being under-eager costs an App Store review or an FTC letter.
 *
 * Only the model's own sentences are scanned, never the hand-written copy,
 * which is why patterns this blunt are workable.
 */
const OVERCLAIMS: RegExp[] = [
  /\b(?:will|can|helps?|going to)\s+(?:visibly\s+)?(?:reduce|remove|eliminate|erase|cure|fix|reverse|tighten|lift|firm|slim|sculpt|tone|smooth)\b/i,
  /\bget(?:s|ting)?\s+rid\s+of\b/i,
  /\bguarantee/i,
  /\bproven\s+to\b/i,
  /\bclinically\b/i,
  /\btreat(?:s|ing|ment)\b/i,
  /\bcures?\b/i,
  /\bin\s+(?:just\s+)?\d+\s*(?:days?|weeks?|months?)\b/i,
  /\byou(?:'ll| will)\s+(?:see|notice|have|get)\b/i,
  /\bresults?\s+(?:in|within|after)\b/i,
  /\bdiagnos(?:e|is|ed)\b/i,
];

export function readsAsOverclaim(text: string): boolean {
  return OVERCLAIMS.some((pattern) => pattern.test(text));
}

function cleanProse(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  const text = value.replace(/\s+/g, " ").trim().slice(0, max);
  if (!text) return "";
  return readsAsOverclaim(text) ? "" : text;
}

/**
 * Pull the JSON object out of a reply.
 *
 * Asking for "only JSON" gets JSON most of the time and a fenced block or a
 * sentence of preamble the rest of the time. Taking the outermost braces
 * handles both without a second round trip.
 */
function extractJson(raw: string): string | null {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  return raw.slice(start, end + 1);
}
