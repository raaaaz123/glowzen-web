/**
 * The `/compare/[slug]` pages.
 *
 * ## Modality, never brand
 *
 * Every comparison here is face yoga against a *category of thing* — an
 * injectable, a tool, a technique. Never against a named product or a rival
 * app. `app/layout.tsx` documents why: using another company's mark to catch
 * its traffic is trademark infringement, and App Store review rejects metadata
 * that names competing apps. A page called "GlowZen vs <competitor>" would put
 * the listing at risk for traffic we can get without it.
 *
 * ## Writing rules
 *
 * These pages carry more legal weight than any others on the site, because
 * several of the alternatives are medical or dental treatments.
 *
 *  - Describe, never diagnose or prescribe. "A clinician injects it" is fine.
 *    "You should have it instead" is not, in either direction.
 *  - Do not disparage. Saying a licensed medical treatment does not work would
 *    be both false and reckless. State what each thing does and let the reader
 *    choose.
 *  - `chooseOther` must be real. A comparison page where the answer is always
 *    "face yoga" is an advert, and it reads like one — an assistant will quote
 *    the page that concedes something, and so will a person.
 *  - No efficacy claims for face yoga that the rest of the site does not make.
 *    See the header of `lib/content/exercises.ts`.
 */

export type Comparison = {
  slug: string;
  /** The thing being compared against, as a noun phrase: "gua sha". */
  alternative: string;
  title: string;
  description: string;
  /** Answer-first opener, 40–60 words. Must stand alone. */
  answer: string;
  intro: string[];
  /** The at-a-glance table. Keep `attribute` short — it is a column header. */
  table: { attribute: string; faceYoga: string; other: string }[];
  chooseFaceYoga: string[];
  chooseOther: string[];
  /** The honest bottom line. Never "face yoga wins". */
  verdict: string;
  faqs: { q: string; a: string }[];
  cta: { headline: string; body: string };
};

export const comparisons: Comparison[] = [
  {
    slug: "face-yoga-vs-botox",
    alternative: "botulinum toxin",
    title: "Face yoga vs botulinum toxin: how they differ",
    description:
      "What facial exercise and botulinum toxin each do, why their mechanisms are opposites, cost and commitment compared, and who each one suits.",
    answer:
      "Face yoga and botulinum toxin work on the same muscles in opposite directions. Exercise asks a muscle to contract more; the injection temporarily stops it contracting. One is a free daily practice, the other a prescription medical treatment given by a licensed clinician and repeated every few months.",
    intro: [
      "This is the comparison people arrive at with their mind half made up, so it is worth being straight about the mechanisms before anything else. Botulinum toxin is a prescription medicine. A clinician injects a small quantity into a specific muscle, and that muscle stops contracting for roughly three to four months. Lines formed by that contraction soften because the movement causing them has paused.",
      "Facial exercise does the reverse. It asks muscles to work — contract, hold, release — on the theory that a muscle that is used holds tone better than one that is not. For a line caused by repeated expression, these two approaches genuinely pull against each other, and no amount of marketing makes them complementary in that specific spot.",
      "That does not make either one wrong. It makes them different tools, and it means the honest version of this page cannot tell you which to pick. What it can do is set out what each involves so you can have a better conversation with a clinician, or decide that a free daily practice is where you would rather start.",
    ],
    table: [
      {
        attribute: "What it does",
        faceYoga: "Asks the muscle to contract and release",
        other: "Temporarily stops the muscle contracting",
      },
      {
        attribute: "Who administers it",
        faceYoga: "You, with your own hands",
        other: "A licensed medical clinician, on prescription",
      },
      {
        attribute: "Invasiveness",
        faceYoga: "None — nothing is injected or applied",
        other: "Injection into the muscle",
      },
      {
        attribute: "Cost",
        faceYoga: "Free. An app is optional",
        other: "Per session, repeated indefinitely",
      },
      {
        attribute: "Commitment",
        faceYoga: "Minutes a day, ongoing",
        other: "A repeat appointment every 3–4 months",
      },
      {
        attribute: "Reversibility",
        faceYoga: "Stop and nothing has been changed",
        other: "Wears off; cannot be undone sooner",
      },
      {
        attribute: "Main risks",
        faceYoga: "Dragging skin, overworking a tense muscle",
        other: "Medical — discuss with the clinician treating you",
      },
    ],
    chooseFaceYoga: [
      "You want to start today, for nothing, with no appointment.",
      "You would rather not have a medical procedure for a cosmetic reason.",
      "Tension is as much your concern as appearance — release work targets that directly.",
      "You are not chasing a specific deadline.",
    ],
    chooseOther: [
      "You want a defined, predictable change to a specific line, and soon.",
      "You have already tried exercise for the area and it did not do what you hoped.",
      "You are comfortable with a medical treatment and its costs, repeated indefinitely.",
      "A clinician has discussed it with you and you are happy with the plan.",
    ],
    verdict:
      "These are not competitors so much as different categories of decision. One is a habit, the other a medical treatment. Plenty of people do both, and plenty of clinicians have no objection — though if you have had toxin in an area, ask the person who treated you before adding resistance work near it. If you want the honest summary: exercise is the lower-risk, lower-cost, slower, less certain option, and it is the only one of the two you can start this evening.",
    faqs: [
      {
        q: "Can face yoga replace botulinum toxin?",
        a: "They do different things, so 'replace' is the wrong frame. Exercise works a muscle; the injection pauses one. If your goal is a specific line softened predictably within weeks, exercise is not an equivalent route. If your goal is a low-risk daily practice you control, it is not a lesser one either.",
      },
      {
        q: "Does facial exercise make lines worse?",
        a: "This gets asked a lot, and the honest answer is that it depends on the movement. Repeated hard contraction of an already-overused muscle is not obviously helpful, which is exactly why the movements for the forehead and between the brows in this catalogue are releases rather than strengtheners. Keeping the pressure light and not dragging the skin matters more than which exercise you pick.",
      },
      {
        q: "Can I do face yoga if I have had toxin or filler?",
        a: "Ask the clinician who treated you, before you start. That is not a formality — they know what was placed, where, and how recently, and none of that is something a website can assess. Every exercise page on this site carries the same note.",
      },
    ],
    cta: {
      headline: "The one you can try tonight, for nothing",
      body: "Whatever you decide about anything clinical, a daily practice costs nothing to test. GlowZen scans your face once, builds a routine from what it finds, and counts you through it — so the trial is a fair one rather than a fortnight of guessing.",
    },
  },

  {
    slug: "face-yoga-vs-gua-sha",
    alternative: "gua sha",
    title: "Face yoga vs gua sha: which is which",
    description:
      "Face yoga trains muscle, gua sha moves fluid across the surface. What each involves, how they differ, and why plenty of people do both.",
    answer:
      "Face yoga works the muscles of the face through contraction and release. Gua sha strokes a smooth stone across the skin, working the surface and the fluid beneath it rather than muscle strength. They are different layers of the same face, which is why they combine more comfortably than most pairs on this page.",
    intro: [
      "These two get confused constantly, partly because both are manual, free after any tool cost, and often taught by the same people. The distinction is depth. Gua sha is a surface practice — a smooth-edged stone drawn along the skin with oil, working outward along the jaw, the cheekbone, the brow. Face yoga is muscular: contract, hold, resist, release.",
      "The other real difference is effort. Gua sha is passive and pleasant; you can do it half-asleep. Face yoga is work, and a cheek muscle asked to hold a contraction for twenty seconds will let you know about it. That difference decides which one people actually keep doing more often than any argument about mechanism does.",
    ],
    table: [
      {
        attribute: "What it works on",
        faceYoga: "Muscle — contraction and release",
        other: "Skin surface and the fluid beneath it",
      },
      {
        attribute: "Equipment",
        faceYoga: "None. Hands only",
        other: "A stone or tool, plus facial oil",
      },
      {
        attribute: "Effort",
        faceYoga: "Active — it is exercise",
        other: "Passive and relaxing",
      },
      {
        attribute: "Typical session",
        faceYoga: "About 8 minutes",
        other: "5–10 minutes",
      },
      {
        attribute: "Cost",
        faceYoga: "Free",
        other: "One-off tool, plus oil",
      },
      {
        attribute: "Main risks",
        faceYoga: "Overworking a tense muscle",
        other: "Dragging or bruising skin; too much pressure",
      },
      {
        attribute: "Best known for",
        faceYoga: "Tone and tension",
        other: "Morning puffiness and a wind-down ritual",
      },
    ],
    chooseFaceYoga: [
      "You want to work the muscle rather than the surface.",
      "You would rather own nothing and start immediately.",
      "Jaw and neck tension is part of what brought you here.",
      "You are willing to put in actual effort most days.",
    ],
    chooseOther: [
      "Mornings are your problem and puffiness is the specific complaint.",
      "You want something restful rather than something effortful.",
      "You already have an oil-and-tool skincare routine to attach it to.",
      "You are recovering from something that makes muscular effort unappealing.",
    ],
    verdict:
      "This is the one pairing on this page where 'do both' is the obvious answer rather than a dodge. They work different layers and neither interferes with the other. If you are choosing only one, choose by temperament: gua sha is a ritual, face yoga is a workout, and the one you will still be doing in eight weeks is the better one for you regardless of mechanism.",
    faqs: [
      {
        q: "Can I do gua sha and face yoga together?",
        a: "Yes, and the usual order is exercise first, gua sha after — the stone work makes a reasonable wind-down once the muscular effort is done. There is no interaction to worry about; they operate on different layers.",
      },
      {
        q: "Does gua sha do anything for muscle tone?",
        a: "Not in the way exercise does. It is a surface practice, and its usual claims are about fluid, circulation and relaxation rather than muscular tone. If tone is your goal, it is not the tool for it.",
      },
      {
        q: "Which is better for a puffy face in the morning?",
        a: "Gua sha is the more common choice for that specific complaint, and honestly the more sensible starting point. Morning puffiness is largely a fluid matter, and fluid is not something muscular exercise addresses directly.",
      },
    ],
    cta: {
      headline: "If you already gua sha, this is the other half",
      body: "You are working the surface already. GlowZen covers the layer underneath — which muscles are worth your time, in what order, held for how long — in about eight minutes a day, with a video and a spoken count.",
    },
  },

  {
    slug: "face-yoga-vs-microcurrent",
    alternative: "microcurrent devices",
    title: "Face yoga vs microcurrent devices",
    description:
      "A hands-only practice against a device you buy. What microcurrent is, what it costs, how the commitments differ, and who each suits.",
    answer:
      "Microcurrent devices pass a low-level electrical current through the face, intended to stimulate the muscle without you doing the work. Face yoga asks you to do that work yourself. The practical difference is money and effort traded against each other: a device costs money and little effort, exercise costs effort and no money.",
    intro: [
      "Microcurrent is the category that most directly promises what face yoga asks you to earn. The pitch is straightforward — the device does the contracting, you hold it against your skin and watch something else. That is a genuinely appealing trade, and the reason the category sells.",
      "The honest caveats are cost and consistency. Devices in this category are not cheap, they are usually used with a conductive gel that runs out, and most of them ask for several sessions a week indefinitely — so the commitment does not actually disappear, it just changes shape. A device left in a drawer performs exactly as well as an exercise routine you stopped doing.",
    ],
    table: [
      {
        attribute: "Who does the work",
        faceYoga: "You",
        other: "The device, applied by you",
      },
      {
        attribute: "Up-front cost",
        faceYoga: "None",
        other: "Substantial, plus ongoing gel",
      },
      {
        attribute: "Ongoing cost",
        faceYoga: "None",
        other: "Conductive gel, and replacement over time",
      },
      {
        attribute: "Effort per session",
        faceYoga: "Real muscular effort",
        other: "Low — hold and glide",
      },
      {
        attribute: "Portability",
        faceYoga: "Nothing to carry or charge",
        other: "A device to pack and charge",
      },
      {
        attribute: "Who should check first",
        faceYoga: "Anyone with a jaw or neck condition",
        other: "Anyone with a pacemaker, implanted device, epilepsy or who is pregnant — read the manufacturer's contraindications",
      },
      {
        attribute: "Reversibility",
        faceYoga: "Stop and nothing has changed",
        other: "Stop and nothing has changed",
      },
    ],
    chooseFaceYoga: [
      "You want to spend nothing to find out whether any of this suits you.",
      "You travel, and one more device to charge is one too many.",
      "The contraindications for electrical devices apply to you.",
      "You would rather learn what your own muscles are doing.",
    ],
    chooseOther: [
      "You know you will not sustain an active daily practice, honestly.",
      "You would rather spend money than effort, and the budget is there.",
      "You already own one and it is sitting unused.",
      "You want something you can do while watching something else.",
    ],
    verdict:
      "The trade is money for effort, and only you know which you have more of. What is worth saying plainly is that both fail the same way — through disuse. Before spending on a device, it is reasonable to test whether a facial routine of any kind survives contact with your actual week, and the free option is the cheaper experiment.",
    faqs: [
      {
        q: "Does microcurrent work better than face yoga?",
        a: "The published evidence for facial appearance is limited on both sides, and anyone claiming a decisive answer is going beyond what is known. The difference you can be sure of is the practical one: one costs money and little effort, the other effort and no money.",
      },
      {
        q: "Can I use both?",
        a: "People do. There is no obvious conflict, though it doubles the time commitment, and the routine that gets abandoned is usually the doubled one. If you are starting out, pick one and give it a proper run.",
      },
      {
        q: "Is microcurrent safe?",
        a: "It is a regulated consumer device category with real contraindications — pacemakers and other implanted electrical devices among them. That is a question for the manufacturer's instructions and your doctor, not for a face yoga website.",
      },
    ],
    cta: {
      headline: "Test the habit before you buy the hardware",
      body: "The thing worth knowing before spending on any device is whether a daily facial routine survives your actual week. GlowZen is the free version of that experiment — a plan built for your face, eight minutes, counted out loud.",
    },
  },

  {
    slug: "face-yoga-vs-facial-massage",
    alternative: "facial massage",
    title: "Face yoga vs facial massage: the difference",
    description:
      "The pair people confuse most. One trains muscle, the other releases it — what each involves, and how to tell which you actually want.",
    answer:
      "Facial massage relaxes and releases; face yoga trains. Massage uses stroking and kneading to ease tension and move fluid, while face yoga asks muscles to contract against resistance and hold. They are frequently taught together, which is why the two get treated as the same practice when they are close to opposites.",
    intro: [
      "Of every pair on this page, these two are mixed up the most — often by people teaching them. Both are done with the hands, both cost nothing, and both get filed under 'face yoga' on the internet. The difference is what you are asking the muscle to do: massage asks it to let go, exercise asks it to work.",
      "Neither is more advanced than the other. In fact several movements in this catalogue are massage in everything but name — the Frown Line Release and the Temple Smooth are releases, and are there precisely because the muscles they cover are usually overworked rather than weak. A sensible routine contains both, which is the real reason the categories blur.",
    ],
    table: [
      {
        attribute: "What it asks of the muscle",
        faceYoga: "Contract and hold",
        other: "Release and lengthen",
      },
      {
        attribute: "Sensation",
        faceYoga: "Effort, sometimes burning",
        other: "Relaxing",
      },
      {
        attribute: "Equipment",
        faceYoga: "Hands only",
        other: "Hands, usually with oil or balm",
      },
      {
        attribute: "Best for",
        faceYoga: "Tone, and building awareness of a muscle",
        other: "Tension, tightness, wind-down",
      },
      {
        attribute: "Cost",
        faceYoga: "Free",
        other: "Free at home; per session with a therapist",
      },
      {
        attribute: "Main risks",
        faceYoga: "Overworking an already-tense muscle",
        other: "Dragging skin when done dry or hard",
      },
      {
        attribute: "Time of day",
        faceYoga: "Any",
        other: "Often evening, as a wind-down",
      },
    ],
    chooseFaceYoga: [
      "Tone and definition are what you are after.",
      "You want structure — an order, a count, a plan.",
      "You are prepared for it to feel like effort.",
    ],
    chooseOther: [
      "You hold visible tension and unwinding it is the whole goal.",
      "You clench or grind, where adding muscular load can make things worse.",
      "You want something soothing at the end of a day, not another task.",
      "You are in a period where one more thing to be disciplined about is not realistic.",
    ],
    verdict:
      "Most people asking this question want some of both and do not know it. If you clench your jaw, hold tension in your brow, or arrived here because your face feels tight rather than because of how it looks, start with release work — and consider raising persistent clenching with a dentist rather than exercising around it. If you want tone, the exercise half is the part doing that job.",
    faqs: [
      {
        q: "Is face yoga just facial massage with a better name?",
        a: "No, though a good routine contains both. Massage releases; exercise loads. The confusion is understandable because most face yoga routines — including this one — open or close with release work.",
      },
      {
        q: "Which should I do if I clench my jaw?",
        a: "Lean towards release, and raise the clenching with a dentist. Adding deliberate load to a muscle that is already overworked overnight can make tension worse, which is why the jawline zone on this site carries that warning explicitly.",
      },
      {
        q: "Can massage tone the face?",
        a: "Not in the sense exercise means by 'tone'. It works on tension, circulation and how the tissue feels rather than on the muscle's capacity to hold a contraction.",
      },
    ],
    cta: {
      headline: "A routine that knows which movements are which",
      body: "The mistake is treating every movement as a strengthener. Some areas need releasing and some need loading, and getting that backwards is why people plateau. GlowZen sorts them for you and puts them in an order that makes sense.",
    },
  },

  {
    slug: "face-yoga-vs-mewing",
    alternative: "mewing",
    title: "Face yoga vs mewing: what each actually claims",
    description:
      "Mewing is a tongue-posture habit with contested evidence; face yoga is muscular exercise. What each claims, what is actually known, and the safety notes.",
    answer:
      "Mewing means holding the tongue flat against the roof of the mouth as a constant posture, on the claim that it influences jaw and facial structure. Face yoga is deliberate muscular exercise done in sessions. The key difference is what they claim to change: mewing makes structural claims, face yoga does not.",
    intro: [
      "Mewing is the most popular thing on this page and the one with the weakest evidence behind its central claim. The practice itself is simple and harmless — rest your tongue flat against the palate, keep your lips together and teeth lightly touching, and maintain it as a default posture rather than an exercise.",
      "The claim attached to it is the problem. Mewing is widely promoted as reshaping the jaw and cheekbones in adults, and that is a structural claim about bone. It is not accepted by the orthodontic mainstream, the supporting evidence for adults is thin, and the strongest versions of the claim online are made by people selling something. That is worth knowing before you commit years to a posture habit expecting a structural outcome.",
      "It is also worth being fair to it. Tongue posture is a real subject in orthodontics, particularly in children, and holding your tongue and jaw in a less collapsed position is not a bad thing to do. The gap between 'reasonable postural habit' and 'this will restructure your face' is where the trouble is.",
    ],
    table: [
      {
        attribute: "What it is",
        faceYoga: "Exercise done in sessions",
        other: "A constant resting posture",
      },
      {
        attribute: "What it claims to change",
        faceYoga: "Muscle tone and tension",
        other: "Jaw and facial structure",
      },
      {
        attribute: "Time commitment",
        faceYoga: "About 8 minutes a day",
        other: "All day, indefinitely",
      },
      {
        attribute: "Evidence for the core claim",
        faceYoga: "Limited; claims kept modest",
        other: "Contested; not accepted by mainstream orthodontics for adults",
      },
      {
        attribute: "Cost",
        faceYoga: "Free",
        other: "Free",
      },
      {
        attribute: "Main risks",
        faceYoga: "Overworking a tense muscle",
        other: "Jaw strain from forcing it; dental issues if teeth are pushed",
      },
      {
        attribute: "Who to ask first",
        faceYoga: "A dentist, if you have jaw problems",
        other: "A dentist or orthodontist, before committing",
      },
    ],
    chooseFaceYoga: [
      "You want a practice with a defined start, end and count.",
      "You would rather work on tone and tension than chase a structural change.",
      "You want claims that match what is actually known.",
    ],
    chooseOther: [
      "Better resting tongue and jaw posture is a goal in itself for you.",
      "An orthodontist has raised tongue posture with you specifically.",
      "You want something requiring no session time at all.",
    ],
    verdict:
      "These are not really alternatives — one is a posture, the other is exercise, and holding your tongue up does not stop you doing a cheek lift. The useful thing this page can do is separate the reasonable part of mewing from the oversold part. Resting your tongue on your palate is fine. Expecting it to restructure an adult face is a much bigger claim than the evidence supports, and if you have any jaw or bite concern, that is a conversation for a dentist rather than a forum.",
    faqs: [
      {
        q: "Does mewing actually work?",
        a: "For adult facial structure, the claim is contested and not accepted by mainstream orthodontics, and the evidence base is thin. Tongue posture itself is a real topic in dentistry, particularly for children. Treat confident promises about adult jawlines with suspicion, especially from anyone selling a programme.",
      },
      {
        q: "Can I do both?",
        a: "Yes — there is no conflict. One is a resting posture and the other is a set of timed movements. If anything they occupy completely different parts of your day.",
      },
      {
        q: "Is mewing safe?",
        a: "The gentle version is generally harmless. Forcing it hard, pushing against the teeth, or straining the jaw is not, and people have reported jaw discomfort and dental concerns from aggressive versions. If you have a bite issue, braces or jaw pain, ask a dentist first.",
      },
    ],
    cta: {
      headline: "Movements with a count, not a lifelong posture",
      body: "If the appeal of mewing was doing something about your jaw, the jawline zone here is the version with a defined start and finish — three movements, timed, with the safety notes that area genuinely needs.",
    },
  },

  {
    slug: "face-yoga-vs-jaw-exercisers",
    alternative: "jaw exercisers",
    title: "Face yoga vs jaw exercisers: read the safety notes first",
    description:
      "Silicone chewing devices against hands-only jaw work. What jaw exercisers load, why dentists raise concerns, and how the risks compare.",
    answer:
      "Jaw exercisers are silicone devices you bite repeatedly to load the masseter, the muscle that closes the jaw. Face yoga works the same area with your hands and no resistance device. This is the comparison where the risk difference is largest: the masseter is already among the strongest muscles in the body, and dentists regularly raise concerns about deliberately overloading it.",
    intro: [
      "This is the one page on the site where the safety section matters more than the comparison. Jaw exercisers — silicone balls or tabs you chew against — apply real resistance to the masseter, and unlike everything else on this site they add substantial load to a muscle most people already overuse.",
      "Two things get raised repeatedly by dentists about this category. The first is temporomandibular joint strain: the jaw joint is not a simple hinge, and hammering it with repetitive resistance is a plausible way to aggravate it. The second is that a well-trained masseter gets bigger, and masseter hypertrophy widens the lower face — which is the opposite of what most people buying one of these is hoping for.",
      "None of that is a reason to be dramatic about it, and plenty of people use them without incident. It is a reason to say plainly that this is the highest-risk item compared anywhere on this site, and that a dentist is the right person to ask before starting.",
    ],
    table: [
      {
        attribute: "Resistance",
        faceYoga: "Your own hands, light",
        other: "A device, substantial and repetitive",
      },
      {
        attribute: "Main muscle loaded",
        faceYoga: "Platysma and jaw movers, lightly",
        other: "Masseter, heavily",
      },
      {
        attribute: "Cost",
        faceYoga: "Free",
        other: "A device, replaced as it wears",
      },
      {
        attribute: "TMJ risk",
        faceYoga: "Low, and the jaw zone carries warnings",
        other: "A recognised concern — ask a dentist",
      },
      {
        attribute: "If you clench or grind",
        faceYoga: "Use release work; ask a dentist",
        other: "Commonly advised against — ask a dentist",
      },
      {
        attribute: "Possible unwanted outcome",
        faceYoga: "Overworking a tense muscle",
        other: "Masseter hypertrophy — a wider lower face",
      },
      {
        attribute: "Reversibility",
        faceYoga: "Stop and nothing has changed",
        other: "Muscle size reduces with disuse, but slowly",
      },
    ],
    chooseFaceYoga: [
      "You clench, grind, or have any jaw clicking or pain.",
      "A narrower-looking lower face is what you were hoping for.",
      "You would rather not load a joint that already works all day.",
      "You want to spend nothing.",
    ],
    chooseOther: [
      "A dentist or physiotherapist has specifically recommended resistance jaw work to you.",
      "You are training for something where jaw strength genuinely matters.",
      "You understand and accept the hypertrophy trade-off and want it.",
    ],
    verdict:
      "This is the only comparison on the site where the recommendation leans clearly, and it leans on safety rather than effectiveness. If you have any jaw symptom at all — clicking, pain, morning tightness, a known grinding habit — a chewing device is the wrong place to start, and a dentist is the right person to ask. If you have none of those and still want one, go in knowing that a bigger masseter is the likely result of training it, and decide whether that is what you wanted.",
    faqs: [
      {
        q: "Do jaw exercisers give you a sharper jawline?",
        a: "They train the masseter, and a trained muscle tends to get larger. A larger masseter widens the lower face rather than narrowing it — which is why this is often the opposite of what buyers expect. How defined a jawline looks also depends on bone and body fat, neither of which chewing changes.",
      },
      {
        q: "Are they safe if I grind my teeth?",
        a: "That is exactly the case where dentists most often advise against them, and it is a question for your dentist rather than a website. Grinding already overloads the muscle overnight; adding deliberate resistance work on top is not an obviously good idea.",
      },
      {
        q: "Is face yoga safer for the jaw?",
        a: "It applies far less load, but it is not risk-free — the Jawline Sculptor combines a head tilt with a jaw jut and is the movement most likely to aggravate an existing problem. The jawline zone on this site says to skip it entirely if you have TMJ issues.",
      },
    ],
    cta: {
      headline: "Jaw work with the warnings attached",
      body: "The jawline area is the most requested and the one carrying the most real risk. GlowZen holds the angles and timing so form does not drift as a session goes on — and the exercises that are not right for a sore jaw stay out of your plan.",
    },
  },

  {
    slug: "face-yoga-vs-facial-taping",
    alternative: "facial taping",
    title: "Face yoga vs facial taping: temporary against ongoing",
    description:
      "Face tape holds skin in place while you sleep; face yoga works the muscle underneath. What each does, how long the effect lasts, and the skin risks.",
    answer:
      "Facial taping means sticking tape to the face — usually overnight — to hold skin flat and stop expression lines creasing. Face yoga works the muscle beneath the skin over weeks. Tape is a temporary, physical hold that ends when you remove it; exercise is a slow practice that does not disappear the same morning.",
    intro: [
      "Taping is the most straightforwardly mechanical thing on this page. Tape holds skin where it is placed. While it is on, the skin cannot crease in that spot, and people use it overnight for exactly that reason — sleep creasing is real, particularly for side sleepers.",
      "What it does not do is change anything underneath. Remove the tape and the skin returns to what it was, minus whatever creasing was prevented in those hours. Framed as an overnight measure, that is a fair and modest proposition. Framed as a treatment, it is overselling a piece of adhesive.",
      "The risk here is the skin rather than the muscle. Adhesive on facial skin every night, removed each morning, is a real irritation risk — more so on sensitive skin, and considerably more so alongside retinoids, acids or anything else that thins the barrier.",
    ],
    table: [
      {
        attribute: "What it acts on",
        faceYoga: "Muscle beneath the skin",
        other: "Skin surface, held in place",
      },
      {
        attribute: "How long it lasts",
        faceYoga: "Built slowly, not lost overnight",
        other: "Until you take the tape off",
      },
      {
        attribute: "When you do it",
        faceYoga: "About 8 minutes, any time",
        other: "Overnight, or for a set period",
      },
      {
        attribute: "Cost",
        faceYoga: "Free",
        other: "Ongoing — tape is consumable",
      },
      {
        attribute: "Main risks",
        faceYoga: "Overworking a tense muscle",
        other: "Adhesive irritation, and worse with actives",
      },
      {
        attribute: "Visible while doing it",
        faceYoga: "No",
        other: "Yes — it is tape on your face",
      },
      {
        attribute: "Reversibility",
        faceYoga: "Stop and nothing has changed",
        other: "Immediate — remove it",
      },
    ],
    chooseFaceYoga: [
      "You want something that is not undone the moment you stop.",
      "Your skin is sensitive, or you use retinoids or acids.",
      "You would rather work the layer underneath.",
      "Sleeping with tape on your face is not going to happen.",
    ],
    chooseOther: [
      "Sleep creasing is your specific complaint and you sleep on your side.",
      "You want something for one particular night rather than a practice.",
      "You have tolerant skin and no actives in your routine.",
    ],
    verdict:
      "These barely overlap. Tape is a short-term physical measure for a short-term physical problem, and it is honest about that if nobody oversells it. Exercise is a slow practice on a different layer. If sleep creasing is genuinely your issue, changing sleep position or pillowcase is worth trying before adhesive — and if you use retinoids or acids, ask whoever manages your skincare before taping over them nightly.",
    faqs: [
      {
        q: "Does face tape prevent wrinkles?",
        a: "It can stop skin creasing in a particular spot while it is on, which is a modest and real thing. Lines have several causes — sun exposure, how skin ages, genetics and habitual expression — and holding skin still overnight addresses one contributor for those hours only.",
      },
      {
        q: "Is it safe to tape every night?",
        a: "Nightly adhesive on facial skin is a real irritation risk, especially on sensitive skin or alongside retinoids and acids. Anyone using active skincare should check with whoever advises them on it before making this a habit.",
      },
      {
        q: "Can I do both?",
        a: "There is no conflict — they work at different times on different layers. Just keep exercise off skin that is irritated from adhesive, which is the same rule that applies over breakouts or broken skin.",
      },
    ],
    cta: {
      headline: "Something that is still there when the tape comes off",
      body: "Tape is undone the moment you remove it, by design. GlowZen is the slower half — a plan built around your face from a single scan, eight minutes a day, with progress photos so you can see whether anything is actually shifting.",
    },
  },
];

/** Lookup for the comparison page. Undefined feeds `notFound()` at the route. */
export function comparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((comparison) => comparison.slug === slug);
}
