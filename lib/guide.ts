/**
 * The /guide article.
 *
 * This exists for search and for assistants. A three-page marketing site has
 * almost no surface to rank for "face yoga at home", "face scan", "face score"
 * or "looksmaxxing" — those are questions, and the answer has to be on the page
 * before Google or an LLM can quote it. Meta keywords cannot do this job;
 * Google stopped reading them in 2009.
 *
 * Tone follows the rest of the site: hedged, no promises, and explicit that
 * this is not medical advice. Copy that overclaims would fail both the App
 * Store review and the FTC's substantiation rules.
 */

import { zones } from "@/lib/zones";
import { exercisesForZone } from "@/lib/content/exercises";
import { EXERCISE_COUNT, SESSION_MINUTES, ZONE_COUNT } from "@/lib/site";

export type GuideSection = {
  id: string;
  heading: string;
  body: string[];
  bullets?: string[];
};

export const GUIDE_TITLE = "Face yoga at home: a beginner's guide";

export const GUIDE_DESCRIPTION =
  "What face yoga is, how to practise it at home with no equipment, what a face scan and face score actually measure, and how often to train each area of your face.";

export const guideSections: GuideSection[] = [
  {
    id: "what",
    heading: "What face yoga actually is",
    body: [
      "Face yoga — also called facial exercise or facial fitness — is a set of repeated movements and holds that work the muscles of the face and neck. There are more than forty of them, and like any other muscle they respond to being used.",
      "A session is closer to stretching than to a workout. You press, hold, resist and release with your hands, usually for thirty to sixty seconds per movement. Nothing is inserted, injected or applied. It is free, and the only equipment is your own hands.",
    ],
  },
  {
    id: "does-it-work",
    heading: "Does it work?",
    body: [
      "Honestly: it depends on the person, and change is gradual. Facial exercise is a general wellbeing practice, not a medical treatment, and nobody can promise you a specific outcome from it — anyone who does is selling something.",
      "What can be said is that the practice is low risk, costs nothing, and people who stick with it usually report the change in tension and definition before they see anything in a photo. Treat a timeframe as guidance rather than a commitment, and judge it on how your face feels as much as how it looks.",
    ],
  },
  {
    id: "at-home",
    heading: "How to start at home",
    body: [
      "You need a mirror, clean hands and about " +
        SESSION_MINUTES +
        " minutes. That is the whole setup.",
    ],
    bullets: [
      "Wash your hands and your face first — you will be touching your skin a lot, and pressing oil and dirt into it is the one way this practice can backfire.",
      "Warm up with gentle circles at the jaw and temples for thirty seconds.",
      "Work one area at a time rather than jumping around. Two or three movements per area is plenty at the start.",
      "Use a mirror until the movement is familiar. Most beginners recruit the wrong muscle for the first week.",
      "Keep the pressure light. This should never hurt, and dragging the skin is worse than doing nothing.",
      "Finish with slow neck rolls to release what you have just tensed.",
    ],
  },
  {
    id: "zones",
    heading: `The ${ZONE_COUNT} zones, and what each one trains`,
    body: [
      `Almost every face yoga routine divides the face into zones, because the muscles group that way. These are the ${ZONE_COUNT} GlowZen uses, and the ${EXERCISE_COUNT} exercises that sit under them.`,
    ],
    bullets: zones.map(
      (zone) =>
        `${zone.zone} — ${exercisesForZone(zone.slug)
          .map((exercise) => exercise.name)
          .join(", ")}.`,
    ),
  },
  {
    id: "scan",
    heading: "What a face scan and face score actually measure",
    body: [
      "A face scan analyses a single photo for tone, definition and symmetry, and turns that into a score per zone. It is a starting reference, not a diagnosis and not a judgement of how you look.",
      "Two things worth knowing before you trust any score. First, lighting and angle move the result more than most people expect — compare photos taken the same way, in the same place, at the same time of day, or you are measuring the light rather than your face. Second, a score is an estimate produced by a model; it is useful as a baseline to measure change against, and close to meaningless as an absolute number.",
      "The privacy question matters more than the score. A face scan is biometric-adjacent data. Before you upload one anywhere, check where the photo is stored, whether it is used to train a model, and whether you can delete it. If those three answers are not easy to find, that is your answer.",
    ],
  },
  {
    id: "how-often",
    heading: "How often, and for how long",
    body: [
      `Daily is better than long. A short ${SESSION_MINUTES}-minute session most days beats an hour at the weekend, for the same reason it does with any other muscle group — frequency drives adaptation, and a face is easy to overwork.`,
      "Give it eight to twelve weeks before you decide whether it is doing anything, and take a photo at the start so you have something honest to compare against. Memory is a poor baseline.",
    ],
  },
  {
    id: "looksmaxxing",
    heading: "Where looksmaxxing fits",
    body: [
      "Looksmaxxing is the internet's word for deliberately working on your appearance, and it covers everything from sleeping properly to surgery. Facial exercise sits at the gentlest end of that range: reversible, free, and impossible to get badly wrong if you keep the pressure light.",
      "Most of what circulates under that label is not gentle, and some of it — mewing claims about bone remodelling in adults, hard chewing devices, unregulated products — ranges from unproven to genuinely risky. Facial exercise makes no claim on your bone structure. It works on muscle and tension, which is the part that actually responds.",
    ],
  },
  {
    id: "safety",
    heading: "When to be careful",
    body: [
      "Practise gently and ease off anything uncomfortable. If you have a jaw, neck or skin condition, or you are recovering from a procedure, check with a professional before you start.",
      "Facial exercise is not medical care and does not diagnose, treat or prevent any condition. If something hurts, stop — soreness in the face is a signal, not a sign of progress.",
    ],
  },
];
