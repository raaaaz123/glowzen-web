/**
 * The exercise catalogue and the source for `/face-yoga/[zone]`.
 *
 * Zone names come straight from the app's catalogue
 * (dietly_backend/app/services/glow_catalogue.py) — keep them in step. The
 * exercises that belong to each zone are not repeated here: they live in
 * `lib/content/exercises.ts` and are looked up by `zoneSlug`, so a zone and its
 * exercises cannot drift apart.
 *
 * `tint` is presentation, but it rides along with the row it decorates so the
 * catalogue stays one list rather than a list plus a parallel lookup table.
 *
 * Writing rules are the same as the exercises file: hedged, specific, no
 * promises, nothing that reads as a treatment claim. See the header comment
 * there before adding a zone.
 */

import { exercisesForZone } from "@/lib/content/exercises";

export type Zone = {
  slug: string;
  /** Display name, as the app's catalogue spells it. */
  zone: string;
  tint: string;
  /** H1 and <title> for the zone page — phrased the way people search. */
  title: string;
  description: string;
  /** Answer-first opener, 40–60 words. Must stand alone. */
  answer: string;
  intro: string[];
  muscles: string;
  frequency: string;
  avoid: string[];
  faqs: { q: string; a: string }[];
  cta: { headline: string; body: string };
};

export const zones: Zone[] = [
  {
    slug: "forehead",
    zone: "Forehead & brow",
    tint: "from-rose-light/15 to-rose/10",
    title: "Face yoga for the forehead and brow",
    description:
      "Three forehead and brow exercises, what the frontalis and corrugator muscles do, how often to practise, and when to leave the area alone.",
    answer:
      "Face yoga for the forehead works the frontalis, the flat sheet of muscle that raises your eyebrows, and releases the corrugators between the brows. Most forehead work is release rather than strengthening, because these muscles are typically overused — they stay switched on through screen work and concentration without anyone noticing.",
    intro: [
      "The forehead is the area people most often want to work on and the area where the lightest touch is needed. The muscle here is broad and thin, the skin over it moves easily, and the failure mode is not doing too little — it is pressing too hard and dragging skin that has nothing underneath to protect it.",
      "It is also the clearest example of why face yoga is not simply exercise. The frontalis is rarely weak. In most people it is doing too much, and the corrugators between the brows are doing far too much. Two of the three movements here are about persuading a muscle to stop working rather than getting it to work harder.",
    ],
    muscles:
      "The frontalis runs from the brow to the hairline and raises the eyebrows. The corrugator supercilii and procerus sit between and above the brows and pull them together — the muscles behind a frown. Everything in this zone involves one of those three.",
    frequency:
      "Three to four times a week is plenty for the forehead, and it does not benefit from daily work the way the jaw or neck can. The release movements can be done more often — there is no meaningful limit on smoothing the brow area gently at the end of a screen day.",
    avoid: [
      "Pressing hard enough to move the skin rather than anchor it. The skin here has very little underneath it.",
      "Working the area with dry fingers on dry skin. Use a little oil or moisturiser for any smoothing movement.",
      "Adding resistance work if you have had botulinum toxin or filler in the forehead without asking the clinician who treated you.",
      "Continuing through a headache. Stop and come back another day.",
    ],
    faqs: [
      {
        q: "Can face yoga get rid of forehead lines?",
        a: "No one can promise that, and anyone who does is selling something. Facial exercise is a general wellbeing practice rather than a treatment, and lines have several causes — sun exposure, genetics, how skin ages, and habitual expression among them. What people who practise consistently tend to report first is a change in how much tension they are holding in the area, which is a different thing from a change in a photograph.",
      },
      {
        q: "Should I strengthen or relax my forehead?",
        a: "For most people, mostly relax. The frontalis is rarely a weak muscle — it is usually a muscle that never fully switches off. That is why two of the three movements in this zone are releases and only one is resistance work.",
      },
      {
        q: "How long before I notice anything?",
        a: "Treat any timeframe as guidance rather than a commitment. People generally notice the area feeling less tight before they notice anything visual, often within the first couple of weeks, and that is the honest thing to expect first.",
      },
    ],
    cta: {
      headline: "Knowing the movement is the easy half",
      body: "Remembering that the forehead wants three sessions a week while the jaw wants more — and which of these are releases rather than strengtheners — is the part that falls apart by week two. GlowZen builds the week around the areas you picked so the balance holds itself.",
    },
  },
  {
    slug: "eyes",
    zone: "Eyes",
    tint: "from-orchid/15 to-orchid/5",
    title: "Face yoga for the eye area",
    description:
      "Three eye-area exercises, why the skin here changes the rules, isolating the lower lid, and the conditions that mean you should skip this zone.",
    answer:
      "Face yoga for the eyes works the orbicularis oculi, the ring of muscle surrounding each eye socket. The skin over it is the thinnest on the body, so the movements are tapping and small isolated pulses rather than pressure. This is the zone where doing less is genuinely better than doing more.",
    intro: [
      "Every rule about light pressure that applies elsewhere on the face applies double here. The skin around the eye is the thinnest anywhere on the body, there is very little fat beneath it, and it sits directly over bone in some places and over the eye itself in others. The convention of using the ring finger exists for exactly this reason: it is the weakest finger, so it is the hardest one to press too hard with.",
      "The other thing that makes this zone distinctive is how difficult isolation is. Asking someone to contract only the lower eyelid is asking for a movement most people have never made deliberately. Recruiting the brow or the whole eye instead is not a sign of doing badly — it is what nearly everyone does for the first week.",
    ],
    muscles:
      "The orbicularis oculi, a ring of muscle encircling the eye and running through both eyelids. It closes the eye, and its lower portion is what lifts when you squint. Nearby, the temporalis at the temple takes on tension from screen focus and jaw clenching alike.",
    frequency:
      "Daily is fine for the eye zone because the movements are so light, but keep the sessions short — two or three minutes. This is not an area that rewards long sessions, and eye strain is a real limit.",
    avoid: [
      "Any pressure on the eyeball itself. Movements stay on the bone around the socket.",
      "Practising with contact lenses in. Take them out first.",
      "The whole zone if you have glaucoma, have had recent eye surgery, or have an eye infection.",
      "Continuing if you notice twitching that persists after a session.",
    ],
    faqs: [
      {
        q: "Is face yoga safe around the eyes?",
        a: "The movements in this zone are designed to be, provided the pressure stays light and stays on the bone rather than on the eyeball or the soft under-eye skin. That said, there are real reasons to skip it entirely — glaucoma, recent eye surgery, an active infection — and those are worth checking with a doctor rather than working around.",
      },
      {
        q: "Can face yoga help with under-eye bags?",
        a: "Nothing here treats them, and it would be dishonest to say otherwise. Under-eye puffiness has many causes including sleep, salt, allergies, fluid retention and inherited anatomy, and most of those are not muscular at all. Facial exercise works on muscle, so it is a poor tool for something that is often not a muscle problem.",
      },
      {
        q: "Why can't I move only my lower eyelid?",
        a: "Because almost nobody can at first. It is a small muscle most people have never contracted deliberately, and the body solves the problem by recruiting the brow instead. It usually takes about a week of short attempts before the isolation starts to appear.",
      },
    ],
    cta: {
      headline: "\"Gently\" is the hardest instruction to follow from text",
      body: "It is the whole game in this zone, and it means something different to everyone reading it. Watching the movement at real speed settles the question in about five seconds — that is what the video demos in GlowZen are for.",
    },
  },
  {
    slug: "cheeks",
    zone: "Cheeks",
    tint: "from-coral/15 to-coral/5",
    title: "Face yoga for the cheeks",
    description:
      "Three cheek exercises including the Cheek Lifter, what the zygomaticus and buccinator do, and the mistakes that make cheek work do nothing.",
    answer:
      "Face yoga for the cheeks works two different muscle groups: the zygomaticus muscles that lift the corners of the mouth, and the buccinator that forms the wall of the cheek. Cheek movements are the most recognisable in face yoga and the most commonly performed incorrectly, usually by pressing too hard with the fingers.",
    intro: [
      "This is the zone people picture when they hear the phrase \"face yoga\" — the Cheek Lifter has been photographed more than any other movement in the practice. It is also the zone where technique errors are most likely to make the work pointless rather than harmful, which is a better problem to have than the neck's, but still a problem.",
      "Cheek muscles are small and tire faster than people expect. Cramping partway through a round is normal and is a signal to stop that round, not to push through it. Ten slow repetitions done properly are worth more than thirty rushed ones, and rushing is the standard response to a muscle starting to burn.",
    ],
    muscles:
      "The zygomaticus major and minor run from the cheekbone to the corner of the mouth and lift when you smile genuinely. The buccinator sits deeper, forming the wall of the cheek — it is the whistling and balloon-blowing muscle. The risorius pulls the mouth wide.",
    frequency:
      "Four to five times a week suits the cheeks well. They respond to consistency more than volume, and because the muscles are small, a short daily session is more useful than a long twice-weekly one.",
    avoid: [
      "Pressing down hard with the fingers during the Cheek Lifter. They are a reference point, not resistance.",
      "Pushing through cramp. Stop the round and let the muscle rest.",
      "Squinting to help the lift. If the eyes are creasing, the work has moved to the wrong place.",
      "Sustained pressure work soon after dental surgery or filler without asking your clinician.",
    ],
    faqs: [
      {
        q: "Does the Cheek Lifter actually do anything?",
        a: "It works the muscles that lift the corners of the mouth, which is a real and measurable thing for a muscle to do. Whether that produces a change you can see in a photograph depends on the person, and change is gradual — treat anyone offering a timeframe with suspicion. What is fair to say is that it costs nothing and carries very little risk.",
      },
      {
        q: "Why do my cheeks cramp?",
        a: "Because they are small muscles being asked to hold a contraction they are not used to. Cramping is common in the first couple of weeks and is a reason to end that round early, not a sign of doing something wrong.",
      },
      {
        q: "Can face yoga lift sagging cheeks?",
        a: "Facial exercise works on muscle, and how full or lifted a cheek looks also depends on fat pads, bone and skin, none of which exercise changes. It is honest to say the practice targets one contributing factor out of several, and dishonest to imply it addresses the whole picture.",
      },
    ],
    cta: {
      headline: "Three faults, all invisible without a reference",
      body: "The upper lip unfolds, the fingers press too hard, the eyes squint — and none of it is obvious while you are doing it. GlowZen plays the movement next to a timer so you can check your version against it each round.",
    },
  },
  {
    slug: "lips",
    zone: "Lips",
    tint: "from-rose/15 to-blush/30",
    title: "Face yoga for the lips and mouth",
    description:
      "Two mouth exercises, what the orbicularis oris does, why one is a strengthener and the other a release, and when to skip them.",
    answer:
      "Face yoga for the lips works the orbicularis oris, the ring of muscle around the mouth. It is unusual among muscles in having no bony attachment at either end. One of the two movements here is resistance work and the other is a release for the fine vertical lines above the top lip — different jobs, different technique.",
    intro: [
      "This is the smallest zone in the catalogue, with two movements, and that is appropriate rather than an omission. The muscle around the mouth is used constantly through speaking, eating and expression, so it needs less deliberate work than areas that go untouched all day.",
      "The pairing is deliberate: one movement adds load, the other takes it away. The muscle above the top lip tends to be short in people who purse often — through a straw, a habit, or years of a cigarette — so smoothing it outward serves a different purpose from pressing against resistance, and doing only one of the two misses half the zone.",
    ],
    muscles:
      "The orbicularis oris encircles the mouth and closes the lips. Its upper fibres run vertically above the top lip and shorten with repeated pursing. The surrounding muscles that pull the mouth wide belong to the cheek zone but interact with everything here.",
    frequency:
      "Three times a week is enough. This is a small area, it recovers quickly, and there is little to gain from daily work.",
    avoid: [
      "Working over a cold sore. They spread through contact and this zone is exactly where that matters.",
      "Smoothing on dry skin — always use a little oil or balm above the lip.",
      "Clenching the jaw during the resistance hold. The teeth stay slightly apart.",
      "Sustained pressure work if you have lip filler, without asking the clinician who placed it.",
    ],
    faqs: [
      {
        q: "Can face yoga make lips look fuller?",
        a: "Not in the way a filler does, and it would be misleading to suggest otherwise. Exercise works on the muscle around the mouth rather than on lip volume, which is tissue. Anyone promising a plumping effect from an exercise is overstating what muscle work can do.",
      },
      {
        q: "What about the vertical lines above my top lip?",
        a: "The Lip Line Smoother is a release for that area rather than a treatment for the lines themselves. Those lines have several causes — sun, skin ageing, genetics and repeated pursing among them — and only the last of those is muscular. Keeping the muscle from staying short addresses one contributing factor, not the whole thing.",
      },
      {
        q: "Only two exercises — is that not too few?",
        a: "The mouth gets used all day through talking and eating, so it needs less deliberate work than areas that are never consciously moved. Two is proportionate to how much this zone is already doing.",
      },
    ],
    cta: {
      headline: "Order matters more here than people expect",
      body: "Lip work belongs after the cheeks and before the jaw; run out of order it fights the sequence around it. GlowZen assembles the running order from the areas you picked, so you are not deciding it mid-session.",
    },
  },
  {
    slug: "jawline",
    zone: "Jawline",
    tint: "from-champagne/25 to-champagne/5",
    title: "Face yoga for the jawline",
    description:
      "Three jawline exercises, the muscles involved, why this zone carries the most real risk, and who should skip it entirely.",
    answer:
      "Face yoga for the jawline works the platysma across the front of the neck together with the muscles that move the lower jaw. It is the most requested area in the practice and the one carrying the most genuine risk: the movements combine neck extension with jaw effort, which can aggravate an existing jaw or neck problem.",
    intro: [
      "Jawline definition is what brings most people to face yoga in the first place. It deserves a straight answer: how defined a jawline looks depends on bone structure, body fat, skin and genetics as well as muscle, and exercise only touches one of those. That does not make the work pointless. It does mean the honest version of this page cannot promise you a jawline.",
      "This is also the one zone where the safety notes are not boilerplate. The Jawline Sculptor asks for a 45-degree head tilt plus a forward jaw jut held under tension, and it is the movement most likely to aggravate a jaw joint problem or a neck condition. If you have clicking, pain, or a diagnosed issue in either, this is the zone to ask a professional about before starting rather than after.",
    ],
    muscles:
      "The platysma sheets across the front of the neck from the jaw to below the collarbone. The masseter closes the jaw and is among the strongest muscles in the body for its size. The suprahyoid group under the chin lifts the hyoid bone during swallowing.",
    frequency:
      "Four to five times a week, with at least one full rest day. The jaw muscles are strong and used constantly, and adding daily deliberate load on top of a clenching habit is how people make tension worse rather than better.",
    avoid: [
      "The whole zone if you have TMJ problems, jaw clicking, or a neck injury — check with a dentist or physiotherapist first.",
      "Tilting the head past 45 degrees. Further compresses the neck instead of stretching the front of it.",
      "Clenching the teeth in place of protruding the jaw. Different actions; only one is the exercise.",
      "Working through pain at the jaw hinge. Stretch under the jaw is right, pressure at the joint is not.",
    ],
    faqs: [
      {
        q: "Can face yoga give me a sharper jawline?",
        a: "It works the muscles along the jaw and the front of the neck, which is one of several things determining how a jawline looks — bone structure, body fat and skin are the others, and exercise does not change those. People who practise consistently often report the area feeling firmer before anything shows in a photo. No one can promise you a specific outcome, and a timeframe attached to that promise is a sales tactic.",
      },
      {
        q: "Will face yoga help a double chin?",
        a: "The area under the chin is mostly fat and skin over muscle, and exercise addresses the muscle layer only. It is fair to say these movements work the muscles beneath; it is not fair to say they remove what sits on top. Anyone claiming a spot-reduction effect is describing something exercise does not do anywhere on the body.",
      },
      {
        q: "I clench my jaw at night. Should I still do this?",
        a: "Ask a dentist first. Adding deliberate load to a muscle already overworked overnight can make tension worse, and jaw clenching is worth addressing properly rather than exercising around. The Temple Smooth in the eye zone is a release rather than a strengthener and is often more useful for clenchers.",
      },
    ],
    cta: {
      headline: "Forty-five degrees becomes ninety when nobody is counting",
      body: "Form drifts as a session goes on and the neck takes the difference — which is exactly the risk in this zone. GlowZen calls the angle out each round and holds the timing, so the last round looks like the first.",
    },
  },
  {
    slug: "neck",
    zone: "Neck",
    tint: "from-mint/15 to-mint/5",
    title: "Face yoga for the neck",
    description:
      "Three neck exercises, the platysma and the swallowing muscles, why half-circles only, and the symptoms that mean stop.",
    answer:
      "Face yoga for the neck works the platysma — the broad sheet of muscle covering the front of the throat — along with the deeper swallowing muscles. It is the zone most often skipped and arguably the one that matters most, since the neck shows change readily and takes on tension from phones and screens all day.",
    intro: [
      "The neck is the area people leave out of a self-made routine, usually because the face is what they were looking at in the mirror. It is a strange omission: the neck is directly continuous with the jaw, holds tension from every hour spent looking down at a phone, and is where several of the jaw movements are actually felt.",
      "It also has the clearest hard rule in the whole practice. Neck rolls go through the front half only. A full rotation takes the head backwards under its own weight, which is not something to do casually, and the fact that it is a common gym warm-up does not make it a good idea here.",
    ],
    muscles:
      "The platysma runs from the jaw down over the collarbone as a broad, thin sheet. The sternocleidomastoid runs from behind the ear to the collarbone and turns the head. The suprahyoid and infrahyoid groups sit between the jaw, hyoid bone and collarbone and drive swallowing.",
    frequency:
      "Daily is reasonable for the neck, particularly the release movement, and there is a good case for doing that one at the end of any long day at a desk regardless of whether it is a session day.",
    avoid: [
      "Full backward neck rotations. Front half only, always.",
      "Continuing if you feel pinching, tingling, or anything travelling down an arm — that needs a doctor, not a modification.",
      "Sitting up quickly after head-back positions. This is where people get lightheaded.",
      "The zone entirely if you have a diagnosed neck condition or recent neck surgery.",
    ],
    faqs: [
      {
        q: "Can face yoga tighten neck skin?",
        a: "Exercise works on muscle, and skin laxity is a separate matter involving collagen, elasticity and age. The muscle underneath can be worked; the skin over it is not something a movement changes. Claims about tightening skin through exercise overstate what is happening.",
      },
      {
        q: "Why only half-circles?",
        a: "Because a full rotation carries the head backwards under its own weight, compressing the back of the neck. The front-half version gets the release without that, and there is no benefit in the back half worth the risk.",
      },
      {
        q: "Does 'tech neck' respond to this?",
        a: "The tension that builds from looking down at a phone is muscular, so gentle release work is a reasonable thing to do about it. The underlying cause is how long you spend in the position, though, and no amount of release work substitutes for changing that.",
      },
    ],
    cta: {
      headline: "The zone people leave out",
      body: "It is the first thing dropped from a routine you assemble yourself, and it is continuous with the jawline everyone actually wants to work on. A plan that includes it puts it in front of you on the days it belongs.",
    },
  },
  {
    slug: "nose",
    zone: "Nose",
    tint: "from-orchid/10 to-blush/25",
    title: "Face yoga for the nose",
    description:
      "One release movement for the bridge of the nose, what face yoga can and cannot do here, and why this zone has a single exercise.",
    answer:
      "Face yoga for the nose is a single release movement: small circles along the bridge and across the muscle between the brows. It is worth being blunt about scope — facial exercise cannot change the shape of a nose, which is bone and cartilage. This zone is about tension, not shape.",
    intro: [
      "One exercise is the honest size of this zone. There are pages elsewhere on the internet promising nose slimming, nose straightening and nose reshaping through exercise. A nose is bone and cartilage, and no movement changes either. Anything claiming otherwise is either mistaken or selling something.",
      "What is left is real but modest. The procerus and nasalis fire every time you squint, wrinkle your nose or concentrate on something too small to read, and most people hold tension there without ever registering it. Releasing that is a small, genuine benefit, and it sits in a sequence naturally because it borders the brow area worked just before it.",
    ],
    muscles:
      "The procerus sits between the brows at the top of the nose and pulls the brow down. The nasalis runs across the bridge and flares or compresses the nostrils. Both are involved in squinting.",
    frequency:
      "Two to three times a week, usually attached to the end of a forehead session since the two areas are adjacent and the movements overlap.",
    avoid: [
      "Pinching hard enough to restrict breathing. Light contact only.",
      "The zone entirely during a sinus infection or after a recent nose injury.",
      "Working the area after rhinoplasty or nose filler without asking the clinician who treated you.",
      "Wrinkling the nose while working on it — the same trap as frowning through a frown line release.",
    ],
    faqs: [
      {
        q: "Can face yoga slim or reshape my nose?",
        a: "No. The nose is bone and cartilage, and no facial exercise changes either. This is the clearest example of a claim made widely online that is simply not true, and it is worth saying plainly rather than hedging.",
      },
      {
        q: "Then what is this exercise for?",
        a: "Tension. The muscles across the bridge and between the brows fire constantly during squinting and concentration, and most people never notice holding them. Releasing that is a modest but real thing, and it is all this movement claims.",
      },
      {
        q: "Why is there only one?",
        a: "Because one is what the area honestly supports. Padding the zone out to three movements to make it look substantial would mean inventing work that does not need doing.",
      },
    ],
    cta: {
      headline: "One movement is easy to forget",
      body: "It is the only exercise in the zone, so it drops out of a self-assembled routine almost immediately — usually within the first week. GlowZen keeps it in the rotation on the days it belongs.",
    },
  },
];

/** Lookup for the zone page. Undefined feeds `notFound()` at the route. */
export function zoneBySlug(slug: string): Zone | undefined {
  return zones.find((zone) => zone.slug === slug);
}

/** Zone paired with its exercises — the shape most callers actually want. */
export function zonesWithExercises() {
  return zones.map((zone) => ({
    ...zone,
    exercises: exercisesForZone(zone.slug),
  }));
}
