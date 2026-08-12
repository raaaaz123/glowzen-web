/**
 * The 18 exercises, one record each, as the source for `/exercises/[slug]`.
 *
 * Names and zone assignments come from the app's catalogue
 * (dietly_backend/app/services/glow_catalogue.py) — keep them in step. Everything
 * else here exists for the web only: the app teaches these with video, and a
 * page that just names a movement ranks for nothing and helps nobody.
 *
 * ## Rules for writing an entry
 *
 * Tone follows `lib/guide.ts`: hedged, specific, no promises. Describe the
 * movement and the muscle it works. Never claim it removes, reduces, treats or
 * prevents anything — GlowZen is a wellbeing app, not medical care, and copy
 * that overclaims fails both App Store review and the FTC's substantiation
 * rules. "Works the muscle under the jaw" is fine. "Gets rid of a double chin"
 * is not.
 *
 * `answer` is deliberately 40–60 words and leads the page. It is the paragraph
 * an AI Overview or an assistant lifts, so it has to stand alone without the
 * heading above it.
 *
 * `cta` is per-exercise on purpose. A generic "download the app" under every
 * page is noise; a line that names what the app does for *this* movement is a
 * reason to tap.
 */

export type Exercise = {
  slug: string;
  name: string;
  zoneSlug: string;
  /** Listing subtitle and the seed for the meta description. */
  summary: string;
  /** Answer-first opener, 40–60 words. Must stand alone. */
  answer: string;
  /** Plain-language anatomy. Named muscles, then what it feels like. */
  muscles: string;
  hold: string;
  reps: string;
  /** Numbered technique. Becomes HowTo schema, so each step is one action. */
  steps: string[];
  mistakes: string[];
  /** Who should skip it or ask someone first. Every entry has one. */
  caution: string;
  cta: { headline: string; body: string };
};

export const exercises: Exercise[] = [
  // ── Forehead & brow ──────────────────────────────────────────────────────
  {
    slug: "forehead-smoother",
    name: "Forehead Smoother",
    zoneSlug: "forehead",
    summary: "Resistance work for the frontalis, the sheet of muscle that lifts your brows.",
    answer:
      "The Forehead Smoother is a resistance hold for the frontalis, the flat muscle that raises your eyebrows. You press your fingers flat across your forehead and try to lift your brows against that pressure, holding about 30 seconds. It is usually practised to build awareness of a muscle most people hold tense without noticing.",
    muscles:
      "The frontalis — a broad, thin sheet running from your brow up to your hairline. It is the muscle doing the work every time you raise your eyebrows, and for many people it stays quietly switched on all day, especially at a screen.",
    hold: "30 seconds",
    reps: "3 rounds",
    steps: [
      "Wash your hands and face. You are about to press on skin for half a minute, and working oil into it is the one way this practice can go wrong.",
      "Place the pads of all four fingers of each hand flat across your forehead, fingers horizontal, so the pressure spreads evenly.",
      "Apply light downward pressure — enough to feel it, nowhere near enough to move the skin.",
      "Try to raise your eyebrows against your fingers. The brows should barely move; the effort is what matters.",
      "Hold for 30 seconds, breathing normally. Do not hold your breath — it is the most common thing people do here.",
      "Release slowly, drop your fingers, and let your forehead go completely slack for 10 seconds before the next round.",
    ],
    mistakes: [
      "Pressing hard enough to drag the skin upward. Pressure should anchor, not pull.",
      "Letting the eyebrows actually rise. If they lift freely you are not resisting, you are just making a face.",
      "Clenching the jaw to help. Check it — the jaw should stay loose throughout.",
      "Holding your breath for the full 30 seconds, which turns a release into a strain.",
    ],
    caution:
      "If you have had botulinum toxin or filler in the forehead, ask the clinician who treated you before adding resistance work near the area. Stop if you get a headache.",
    cta: {
      headline: "Thirty seconds is longer than it feels",
      body: "Counting a hold in the mirror is the part everyone gets wrong — most people cut it short by a third. GlowZen times each hold out loud so you can keep your eyes closed and your hands where they are.",
    },
  },
  {
    slug: "brow-lift-press",
    name: "Brow Lift Press",
    zoneSlug: "forehead",
    summary: "An isometric hold that works the brow from underneath rather than across the forehead.",
    answer:
      "The Brow Lift Press works the brow from below. You rest your index fingers just under the eyebrows, press gently upward, then close your eyes and draw the brows down against that pressure. It targets the same area as the Forehead Smoother from the opposite direction, which is why the two are usually paired.",
    muscles:
      "The lower frontalis where it meets the orbicularis oculi — the ring of muscle around the eye socket. Working against an upward press recruits the downward movers, which are the ones most people never consciously use.",
    hold: "20 seconds",
    reps: "3 rounds",
    steps: [
      "Rest your index fingers horizontally just underneath your eyebrows, sitting on the bone rather than on the eyelid.",
      "Press gently upward and slightly outward, so the brows lift a few millimetres.",
      "Close your eyes slowly and try to pull your brows down against your fingers.",
      "Hold the opposition for 20 seconds. You should feel it as a steady tension across the brow, never as pinching.",
      "Open your eyes, release the press, and rest for 10 seconds.",
    ],
    mistakes: [
      "Fingers drifting onto the eyelid. Stay on the bony ridge of the brow — the eyelid is not a surface to press on.",
      "Squeezing the eyes shut hard. The lids close, the squint does not.",
      "Going too heavy. This is a few millimetres of lift, not a stretch.",
    ],
    caution:
      "Never press on the eyeball itself. Skip this if you have glaucoma, recent eye surgery, or any condition where pressure around the eye has been advised against.",
    cta: {
      headline: "This one is easy to do wrong on your own",
      body: "Fingers slide onto the eyelid within a few seconds and most people never notice. The app demonstrates the hand position on video before the timer starts, so you can check yours against it.",
    },
  },
  {
    slug: "frown-line-release",
    name: "Frown Line Release",
    zoneSlug: "forehead",
    summary: "A release, not a strengthener — the muscles between the brows are usually overworked already.",
    answer:
      "The Frown Line Release smooths the area between the eyebrows outward with light finger pressure. Unlike most face yoga movements it is not a strengthener: the corrugator muscles that pull your brows together are typically overused rather than weak, so this is about letting them go slack.",
    muscles:
      "The corrugator supercilii and procerus — the small muscles between and just above the brows that draw them together. They are the ones that fire when you concentrate, squint at a screen, or read something irritating.",
    hold: "10 slow passes",
    reps: "2 rounds",
    steps: [
      "Place your index and middle fingers of both hands together in the centre of your forehead, just above the space between your brows.",
      "Using light, flat pressure, sweep outward towards each temple in one slow pass — around three seconds per pass.",
      "Lift your fingers, return to the centre, and repeat. Do not drag back across the skin.",
      "Complete 10 passes, letting each one get slightly slower.",
      "Finish by resting two fingers on the space between your brows for a slow count of five, doing nothing at all.",
    ],
    mistakes: [
      "Sweeping back and forth. Every pass goes outward only; dragging skin in both directions is worse than doing nothing.",
      "Frowning while you do it — check in the mirror, it is remarkably common.",
      "Using a fingertip rather than the flat pad, which concentrates pressure into a point.",
    ],
    caution:
      "Use a little facial oil or moisturiser if your skin is dry, so the fingers glide rather than pull. Skip it over active breakouts, eczema or broken skin.",
    cta: {
      headline: "Most people frown while doing the frown line release",
      body: "It is the running joke of face yoga, and a mirror only catches it if you are looking. GlowZen's scan tracks tension across your brow between sessions, so you can see whether the area is actually letting go over weeks.",
    },
  },

  // ── Eyes ─────────────────────────────────────────────────────────────────
  {
    slug: "eye-circle-press",
    name: "Eye Circle Press",
    zoneSlug: "eyes",
    summary: "Light tapping around the orbital bone — the gentlest movement in the catalogue.",
    answer:
      "The Eye Circle Press is a light tapping sequence around the bone that rings your eye socket, using the ring fingers because they press the most weakly. It is the gentlest movement in the catalogue and is usually done first in an eye sequence to warm the area before anything more demanding.",
    muscles:
      "The orbicularis oculi, the ring of muscle encircling the eye. The skin over it is the thinnest on the body, which is exactly why this movement is tapping rather than pressing.",
    hold: "2 full circuits",
    reps: "2 rounds",
    steps: [
      "Use your ring fingers only. They are the weakest fingers, so they are the hardest to press too hard with — that is the entire reason for the convention.",
      "Start at the inner corner of each eye, on the bone beside the bridge of your nose.",
      "Tap lightly outward along the bone under the eye, moving in small steps to the outer corner.",
      "Continue up and around along the brow bone, back to where you started, still tapping.",
      "Complete two full circuits, taking about 15 seconds each.",
    ],
    mistakes: [
      "Tapping on the soft under-eye skin instead of the bone beneath it. Feel for the bony ridge and stay on it.",
      "Using the index finger, which presses far harder than you intend.",
      "Rushing. Fast tapping turns into patting, which drags.",
    ],
    caution:
      "Never press on the eyeball. Skip entirely if you have had recent eye surgery, glaucoma, or an eye infection — and if you wear contact lenses, take them out first.",
    cta: {
      headline: "The eye area is where light pressure matters most",
      body: "It is also where written instructions help least — \"gently\" means something different to everyone. The app shows the movement at real speed on video so you can match the pressure rather than guess at it.",
    },
  },
  {
    slug: "lower-lid-strengthener",
    name: "Lower Lid Strengthener",
    zoneSlug: "eyes",
    summary: "Isolating the lower eyelid, which is harder than it sounds.",
    answer:
      "The Lower Lid Strengthener asks you to squint using only the lower eyelid while the rest of the face stays still. You anchor the outer corners with your fingers and pulse the lower lid upward. Isolating it is genuinely difficult — most beginners recruit the whole eye for the first week.",
    muscles:
      "The lower portion of the orbicularis oculi. It is a small band of muscle that most people have never contracted deliberately, which is why the movement feels strange before it feels like anything.",
    hold: "20 pulses",
    reps: "3 rounds",
    steps: [
      "Place an index finger at the outer corner of each eye, resting on the bone, with just enough contact to feel movement.",
      "Look straight ahead at a fixed point.",
      "Pulse your lower eyelids upward, as if beginning a squint but stopping almost immediately.",
      "Keep the upper lid and the brow completely still. If the brow moves, you have recruited the wrong muscle — reset and go smaller.",
      "Complete 20 small pulses, then rest and let the eyes close for 10 seconds.",
    ],
    mistakes: [
      "Squinting with the whole eye. The upper lid should stay where it is.",
      "Raising the eyebrows, which is the body finding an easier way to do the job.",
      "Going too big. A correct pulse is a very small movement — a few millimetres at most.",
    ],
    caution:
      "Stop if your eyes feel strained or you notice twitching that persists after the session. Skip if you have had recent eye surgery or have been told to avoid pressure around the eye.",
    cta: {
      headline: "Isolating one small muscle is the hardest part",
      body: "Almost everyone recruits the brow instead for the first week and cannot tell from the inside. GlowZen's spoken cues call out the check — brow still, upper lid still — as the pulses count down.",
    },
  },
  {
    slug: "temple-smooth",
    name: "Temple Smooth",
    zoneSlug: "eyes",
    summary: "Slow circles at the temples, where screen tension and jaw clenching both show up.",
    answer:
      "The Temple Smooth is slow circular pressure at the temples using the middle and ring fingers. The temporalis muscle sits here and is one of the muscles that closes the jaw, so it takes on tension from both screen focus and clenching. This is a release movement, done at the end of a session.",
    muscles:
      "The temporalis, a fan-shaped muscle spreading above and in front of the ear. Clench your teeth with a hand on your temple and you will feel it move — that is how much of jaw tension lives here rather than in the jaw.",
    hold: "15 slow circles each direction",
    reps: "2 rounds",
    steps: [
      "Find your temples — the slight hollows between the outer corner of your eye and your hairline.",
      "Rest your middle and ring fingers there with light, flat pressure.",
      "Circle slowly backward, about two seconds per circle, moving the tissue underneath rather than sliding across the skin.",
      "Complete 15 circles, then reverse direction for 15 more.",
      "Let your jaw hang slightly open as you go. If your teeth are touching, the muscle you are working is still switched on.",
    ],
    mistakes: [
      "Sliding fingers over the skin instead of moving the tissue beneath.",
      "Keeping the teeth together, which defeats the purpose entirely.",
      "Pressing hard in the belief that more pressure releases more. It does the opposite here.",
    ],
    caution:
      "If you get frequent headaches or migraines, keep the pressure very light and stop if anything sharpens. Persistent jaw pain or clicking is worth raising with a dentist or doctor rather than working on yourself.",
    cta: {
      headline: "Best done at the end, when the jaw has already let go",
      body: "Sequence matters more than people expect — this lands differently after jaw work than before it. The app orders the movements for you so you are not deciding what comes next mid-session.",
    },
  },

  // ── Cheeks ───────────────────────────────────────────────────────────────
  {
    slug: "cheek-lifter",
    name: "Cheek Lifter",
    zoneSlug: "cheeks",
    summary: "The best-known face yoga movement, and the one most often done wrong.",
    answer:
      "The Cheek Lifter is the movement most people picture when they hear \"face yoga\". You form an O with your mouth, fold your upper lip over your teeth, then smile to lift the cheeks while your fingers rest lightly on top. It works the muscles that raise the corners of your mouth.",
    muscles:
      "The zygomaticus major and minor, which run from the cheekbone to the corner of the mouth, plus the levator muscles beneath them. These are the muscles that lift when you smile genuinely.",
    hold: "20 seconds",
    reps: "3 rounds",
    steps: [
      "Open your mouth into an O shape and fold your upper lip in over your top teeth.",
      "Smile to lift your cheek muscles upward. You should feel the cheeks rise while the lip stays folded.",
      "Place your index fingers lightly on the top of each cheek, at the highest point you can feel moving.",
      "Release the cheek muscles, then lift them again against the light weight of your fingers.",
      "Repeat that lift-and-release 10 times, then hold the lift for a final 20 seconds.",
    ],
    mistakes: [
      "Pressing down hard with the fingers. They rest there as a reference point, not as resistance.",
      "Letting the upper lip unfold, which turns it into an ordinary smile.",
      "Squinting. The eyes stay soft — if they are creasing, you are lifting from the wrong place.",
      "Doing it fast. Ten slow lifts beat thirty quick ones.",
    ],
    caution:
      "If you get cramping in the cheek, stop and let the muscle rest — it is small and tires faster than you expect. Ease off if you have had recent dental work.",
    cta: {
      headline: "The one everybody has seen and few do correctly",
      body: "The upper lip unfolds, the fingers press too hard, the eyes squint — three faults, all invisible without a reference. GlowZen plays the movement beside a timer so you can check yourself against it every round.",
    },
  },
  {
    slug: "cheek-puff-pass",
    name: "Cheek Puff Pass",
    zoneSlug: "cheeks",
    summary: "Passing air between the cheeks — simple, and surprisingly tiring.",
    answer:
      "The Cheek Puff Pass involves filling one cheek with air and slowly passing it to the other, back and forth. It works the buccinator, the muscle that forms the wall of your cheek. It looks trivial and is genuinely tiring within about 30 seconds.",
    muscles:
      "The buccinator, a flat muscle deep in the cheek that presses the cheek against the teeth. It is the muscle you use to whistle, to blow up a balloon, and to keep food from pooling in your cheek while chewing.",
    hold: "30 seconds of passing",
    reps: "3 rounds",
    steps: [
      "Close your lips and take a comfortable breath of air into your mouth. There is no need to fill it completely.",
      "Push all the air into your right cheek and hold for three seconds.",
      "Pass it slowly across to your left cheek. The pass itself should take about two seconds, not happen instantly.",
      "Hold three seconds, then pass back.",
      "Continue for 30 seconds, then release the air slowly through slightly parted lips rather than in one burst.",
    ],
    mistakes: [
      "Overfilling until there is real pressure. Comfortable is the target, not maximum.",
      "Snapping the air across quickly, which skips the work entirely — the slow pass is the exercise.",
      "Puffing the air out in one go at the end.",
      "Holding your breath through the nose while you do it.",
    ],
    caution:
      "Do not do this with sustained high pressure. If you have any history of sinus problems, ear pressure issues, or have recently had dental surgery, keep the volume of air low or skip it.",
    cta: {
      headline: "Thirty seconds of this is longer than it sounds",
      body: "The cheek tires fast and the natural response is to speed up the passes, which removes the work. A spoken three-second count keeps the rhythm honest — that is what the app is doing while your mouth is full of air.",
    },
  },
  {
    slug: "smile-smoother",
    name: "Smile Smoother",
    zoneSlug: "cheeks",
    summary: "Alternating a wide smile with a tight purse, working two opposing muscle groups.",
    answer:
      "The Smile Smoother alternates a wide, closed-lip smile with a tight forward purse. Switching between the two works opposing muscle groups in sequence — the ones that pull the mouth wide, then the ring that closes it. It is usually placed between cheek and lip work because it bridges both.",
    muscles:
      "The zygomaticus and risorius pulling wide, against the orbicularis oris — the ring of muscle around the mouth — pulling closed and forward.",
    hold: "5 seconds each position",
    reps: "10 alternations",
    steps: [
      "Keep your lips together and smile as wide as you comfortably can, drawing the corners out towards your ears.",
      "Hold for five seconds. The lips stay closed throughout — this is not a teeth-showing smile.",
      "Release, then purse your lips forward into a tight pucker as if about to whistle.",
      "Hold that for five seconds.",
      "Alternate between the two for 10 full rounds, moving deliberately between positions rather than snapping.",
    ],
    mistakes: [
      "Letting the lips part during the smile, which loses the tension.",
      "Rushing the transition. The change between positions is part of the movement.",
      "Squinting or raising the brows to help — the work is below the nose only.",
    ],
    caution:
      "Ease off if you feel any clicking or discomfort in the jaw joint. If you have had lip filler, ask your clinician before adding sustained pursing.",
    cta: {
      headline: "Ten rounds without losing count",
      body: "Alternating movements are where people lose their place — you are two positions in and no longer sure whether that was round four or six. The app counts them so you can keep your eyes on the mirror.",
    },
  },

  // ── Lips ─────────────────────────────────────────────────────────────────
  {
    slug: "lip-plump-press",
    name: "Lip Plump Press",
    zoneSlug: "lips",
    summary: "Resistance work for the ring of muscle around the mouth.",
    answer:
      "The Lip Plump Press is a resistance hold for the orbicularis oris, the ring of muscle surrounding your mouth. You press your lips together firmly while an index finger resists just below the lower lip. It is short — about 15 seconds a round — because the muscle is small and tires quickly.",
    muscles:
      "The orbicularis oris. It has no bony attachment at either end, which makes it unusual, and it is the muscle doing the work whenever you close your lips, whistle, or drink through a straw.",
    hold: "15 seconds",
    reps: "3 rounds",
    steps: [
      "Press your lips together firmly, but without rolling them inward or clenching your teeth behind them.",
      "Place your index finger horizontally just below your lower lip, on the soft area above the chin.",
      "Press gently upward with the finger while your lips press down against it.",
      "Hold the opposition for 15 seconds, breathing through your nose.",
      "Release slowly and let the mouth go completely slack for 10 seconds.",
    ],
    mistakes: [
      "Clenching the jaw. The teeth should stay slightly apart behind the lips.",
      "Rolling the lips inward over the teeth, which changes the muscle being worked.",
      "Pressing so hard with the finger that the lower lip is pushed out of position.",
    ],
    caution:
      "If you have lip filler, ask the clinician who placed it before doing sustained pressure work on the area. Skip over cold sores or broken skin.",
    cta: {
      headline: "Fifteen seconds, three times, in the right order",
      body: "Lip work belongs after the cheeks and before the jaw — out of order it fights the sequence around it. The app builds the running order from the areas you picked, so you are not assembling it yourself.",
    },
  },
  {
    slug: "lip-line-smoother",
    name: "Lip Line Smoother",
    zoneSlug: "lips",
    summary: "Outward smoothing across the fine vertical lines above the top lip.",
    answer:
      "The Lip Line Smoother uses light outward strokes across the area above the top lip, where fine vertical lines form. Like the Frown Line Release it is a release rather than a strengthener — the muscle here is usually contracted rather than slack, so the aim is to let it lengthen.",
    muscles:
      "The upper fibres of the orbicularis oris, running vertically above the lip. Repeated pursing — through a straw, a cigarette, or simple habit — keeps them short.",
    hold: "10 passes per side",
    reps: "2 rounds",
    steps: [
      "Apply a little facial oil or balm to the area first. This movement should glide, and dry skin will drag.",
      "Rest your index and middle fingers in the centre, just above your top lip.",
      "Stroke outward towards the corner of the mouth in one slow pass, roughly two seconds.",
      "Lift, return to centre, repeat. Ten passes on one side, then ten on the other.",
      "Finish with your lips relaxed and slightly parted for a count of ten.",
    ],
    mistakes: [
      "Working on dry skin, which pulls rather than glides.",
      "Stroking in both directions instead of lifting and returning.",
      "Pursing the lips while smoothing them, which is self-defeating.",
    ],
    caution:
      "Keep pressure light — the skin here is thin and mobile. Avoid entirely over cold sores, which spread through contact.",
    cta: {
      headline: "This one needs the right pressure, not the right words",
      body: "\"Light\" reads the same to everyone and means something different in practice. Watching the movement at real speed settles it in about five seconds, which is what the video demos in the app are for.",
    },
  },

  // ── Jawline ──────────────────────────────────────────────────────────────
  {
    slug: "jawline-sculptor",
    name: "Jawline Sculptor",
    zoneSlug: "jawline",
    summary: "A tilt-and-jut hold along the jaw — the most requested movement in the catalogue.",
    answer:
      "The Jawline Sculptor combines a head tilt with a forward jut of the lower jaw, held for around 10 seconds per side. It works the muscles along the jaw and the front of the neck together. It is the most requested movement in the catalogue and also one of the easiest to overdo.",
    muscles:
      "The platysma across the front of the neck, plus the muscles that protrude the lower jaw. You should feel a distinct stretch along the underside of the jaw, not a squeeze at the joint.",
    hold: "10 seconds per side",
    reps: "3 rounds each side",
    steps: [
      "Sit or stand with your shoulders down and back. Posture matters here more than in any other movement.",
      "Tilt your head back to about 45 degrees — partway, not all the way.",
      "Turn your head slightly to the right.",
      "Push your lower jaw forward until you feel a stretch along the underside of your jaw on that side.",
      "Hold for 10 seconds, breathing steadily, then return to centre before switching sides.",
    ],
    mistakes: [
      "Dropping the head all the way back. Forty-five degrees is the target; further compresses the neck.",
      "Letting the shoulders rise towards the ears as you tilt.",
      "Clenching the teeth instead of protruding the jaw — these are different actions and only one is the exercise.",
      "Holding through pain in the jaw joint. Stretch along the underside is right; pressure at the hinge is not.",
    ],
    caution:
      "Skip this if you have TMJ problems, jaw clicking, or any neck injury or condition affecting the cervical spine. The combination of a tilt and a jut is more load than it looks, and this is the movement most likely to aggravate an existing jaw issue. If in doubt, ask a dentist or physiotherapist first.",
    cta: {
      headline: "The one people overdo",
      body: "Forty-five degrees becomes ninety after a few rounds when nobody is counting, and the neck takes the difference. GlowZen calls the angle out loud each round and holds the timing, so form does not drift as the session goes on.",
    },
  },
  {
    slug: "chin-lift-hold",
    name: "Chin Lift Hold",
    zoneSlug: "jawline",
    summary: "A held stretch through the front of the neck and under the chin.",
    answer:
      "The Chin Lift Hold is a sustained stretch through the front of the neck. You tilt your head back partway, push the lower lip forward over the top, and hold for around 10 seconds. It is gentler than the Jawline Sculptor and is often used as the way into jaw work.",
    muscles:
      "The suprahyoid group under the chin, plus the upper platysma. The stretch should be felt broadly across the front of the throat rather than sharply anywhere.",
    hold: "10 seconds",
    reps: "5 rounds",
    steps: [
      "Sit upright with your shoulders relaxed and down.",
      "Tilt your head back to roughly 45 degrees, keeping the movement in the neck rather than arching the upper back.",
      "Push your lower lip forward and up over your top lip, as if reaching for the ceiling with it.",
      "Hold for 10 seconds. You should feel a broad stretch under the chin and along the throat.",
      "Return your head to neutral slowly, rest for five seconds, and repeat.",
    ],
    mistakes: [
      "Arching the whole back instead of tilting the head.",
      "Tipping the head so far back that the throat feels compressed rather than stretched.",
      "Rushing back to neutral. Come up slowly — this is where people get lightheaded.",
    ],
    caution:
      "Stop if you feel dizzy or lightheaded at any point, and come out of the position slowly. Skip if you have neck problems, high blood pressure that is not well controlled, or have been advised against extending the neck backwards.",
    cta: {
      headline: "Five rounds, coming up slowly each time",
      body: "The dizziness catches people on round four, usually because they sat up fast. A paced count between rounds is a small thing that makes the difference, and it is one less thing to manage yourself.",
    },
  },
  {
    slug: "fish-face-pull",
    name: "Fish Face Pull",
    zoneSlug: "jawline",
    summary: "Cheeks drawn in, then a smile held against them.",
    answer:
      "The Fish Face Pull is the movement everyone recognises: you suck your cheeks inward against your teeth, then try to smile while holding them there. Adding the smile is what makes it work — sucking the cheeks in alone is only half the exercise, which is the usual mistake.",
    muscles:
      "The buccinator drawing inward, worked against the zygomaticus trying to pull the mouth wide. Two opposing groups active at once, which is why 10 seconds is enough.",
    hold: "10 seconds",
    reps: "5 rounds",
    steps: [
      "Suck your cheeks inward so they press against your back teeth, and purse your lips.",
      "Hold that shape and now try to smile — the corners of your mouth pulling outward while the cheeks stay drawn in.",
      "Hold the opposition for 10 seconds. It should feel like a genuine effort quickly.",
      "Release everything at once and let the face go slack for five seconds.",
      "Repeat five times.",
    ],
    mistakes: [
      "Skipping the smile, which removes the resistance and leaves you pulling a face.",
      "Biting the inside of the cheeks. Draw them in against the teeth, do not clamp down on them.",
      "Holding past the point where the cheeks start cramping.",
    ],
    caution:
      "Stop immediately if you bite the inside of your cheek — it is easy to do and the sore spot will keep you from practising for days. Skip if you have TMJ pain or recent dental work.",
    cta: {
      headline: "The smile is the half everyone skips",
      body: "Without it there is no resistance and the movement does very little, but nothing tells you that while you are doing it. GlowZen cues the second half out loud, right at the point people forget it.",
    },
  },

  // ── Neck ─────────────────────────────────────────────────────────────────
  {
    slug: "neck-toner",
    name: "Neck Toner",
    zoneSlug: "neck",
    summary: "A tongue-press and swallow that engages the deep muscles of the throat.",
    answer:
      "The Neck Toner combines pressing the tongue flat against the roof of the mouth with a deliberate swallow, head tilted back slightly. Involving the tongue is what reaches the deeper muscles of the throat — without it you are only stretching skin.",
    muscles:
      "The suprahyoid and infrahyoid groups running between the jaw, the hyoid bone and the collarbone. These are swallowing muscles, which is why a swallow is built into the movement.",
    hold: "5 swallows",
    reps: "3 rounds",
    steps: [
      "Sit upright with shoulders down. Tilt your head back only slightly — around 20 degrees, far less than the jaw movements.",
      "Press the flat of your tongue firmly against the roof of your mouth and keep it there.",
      "Keeping that pressure, swallow deliberately. You should feel the floor of the mouth engage.",
      "Relax the tongue for three seconds, then repeat.",
      "Complete five swallows, then lower your head slowly to neutral.",
    ],
    mistakes: [
      "Tilting the head back too far — this movement needs much less extension than the jaw work.",
      "Swallowing without maintaining the tongue press, which skips the working part.",
      "Trying to swallow with a completely dry mouth. Have water nearby.",
    ],
    caution:
      "Have a sip of water first — repeated dry swallowing is uncomfortable and can make you cough. Skip if you have difficulty swallowing, or any diagnosed condition affecting it, and raise that with a doctor rather than exercising through it.",
    cta: {
      headline: "Only a slight tilt here, unlike the jaw work",
      body: "Coming straight from jaw exercises, people carry the 45-degree angle over and tip too far. The app changes the cue between movements so the angle resets when the exercise does.",
    },
  },
  {
    slug: "platysma-stretch",
    name: "Platysma Stretch",
    zoneSlug: "neck",
    summary: "Deliberately tensing the visible cords of the neck, then releasing them.",
    answer:
      "The Platysma Stretch asks you to pull the corners of your mouth firmly down and back until the vertical cords stand out on your neck, hold briefly, then release. It is a contract-and-release movement for the broad sheet of muscle covering the front of the neck.",
    muscles:
      "The platysma — a wide, thin sheet running from the jaw down over the collarbone. It is the muscle that shows as vertical cords when someone grimaces hard.",
    hold: "5 seconds",
    reps: "8 rounds",
    steps: [
      "Sit or stand tall with your head in neutral. No tilt is needed for this one.",
      "Pull the corners of your mouth down and slightly back, as if making an exaggerated grimace.",
      "Increase the effort until you can see or feel the vertical cords stand out on your neck.",
      "Hold for five seconds, breathing normally.",
      "Release completely and let the neck go slack for five seconds before the next round.",
    ],
    mistakes: [
      "Tilting the head back, which is not part of this movement.",
      "Holding much longer than five seconds. This is a strong contraction and the rest between rounds is doing real work.",
      "Raising the shoulders as you contract.",
      "Clenching the teeth — the jaw stays loose while the neck works.",
    ],
    caution:
      "This is a strong contraction. Keep to the five-second holds rather than pushing longer, and stop if you feel any strain in the throat. Skip if you have a neck injury or recent neck surgery.",
    cta: {
      headline: "The rest between rounds is part of the exercise",
      body: "Eight rounds with five seconds of genuine slack between them beats eight rounds run together, and the slack is what gets shortened when you are counting in your head. The app holds both halves of the timing.",
    },
  },
  {
    slug: "neck-release-roll",
    name: "Neck Release Roll",
    zoneSlug: "neck",
    summary: "Slow half-circles to finish a session — never full rotations.",
    answer:
      "The Neck Release Roll is a slow half-circle: ear towards one shoulder, chin down across the chest, ear towards the other shoulder, and back. Half-circles only — full rotations take the neck backwards under load, which is not something to do casually. It is the standard way to close a session.",
    muscles:
      "The sternocleidomastoid running from behind the ear to the collarbone, and the upper trapezius across the top of the shoulders. Both take on tension from screens and phones.",
    hold: "6 slow half-circles",
    reps: "2 rounds",
    steps: [
      "Sit tall with your shoulders down and your arms relaxed.",
      "Tilt your right ear towards your right shoulder without lifting the shoulder to meet it.",
      "Roll your chin slowly down and across your chest to the left, taking about four seconds.",
      "Continue until your left ear is towards your left shoulder, then reverse the path back.",
      "Complete six slow half-circles, then finish with the head in neutral and the jaw loose.",
    ],
    mistakes: [
      "Rolling the head all the way backwards. Front half only — this matters.",
      "Lifting the shoulder to meet the ear rather than lowering the ear to the shoulder.",
      "Going quickly. Four seconds across the chest is the pace; anything faster is not a release.",
    ],
    caution:
      "Never take the head into a full backward rotation. Stop if you feel pinching, tingling or anything travelling down an arm, and see a doctor rather than working around it. Skip if you have any diagnosed neck condition.",
    cta: {
      headline: "The last movement of a session, not a warm-up",
      body: "It reads like something to open with, which is why people put it first and lose the point of it. GlowZen sequences it where it belongs — after the work, when there is something to release.",
    },
  },

  // ── Nose ─────────────────────────────────────────────────────────────────
  {
    slug: "nose-tension-release",
    name: "Nose Tension Release",
    zoneSlug: "nose",
    summary: "Small circles along the bridge, for tension people rarely notice holding.",
    answer:
      "The Nose Tension Release is small circular pressure along the bridge of the nose and across the muscle between the brows. Nobody thinks of the nose as a place they hold tension, which is precisely why it goes unnoticed — squinting at a screen involves it constantly.",
    muscles:
      "The procerus between the brows and the nasalis across the bridge. Both fire when you squint, wrinkle your nose, or concentrate on something too small to read.",
    hold: "10 circles per position",
    reps: "2 rounds",
    steps: [
      "Pinch the bridge of your nose lightly between thumb and index finger, high up, near the inner corners of the eyes.",
      "Make 10 small, slow circles, moving the tissue rather than sliding over it.",
      "Move down a centimetre and repeat 10 circles.",
      "Release the pinch and use two fingertips to make 10 circles on the flat area between your eyebrows.",
      "Finish by resting two fingers there, doing nothing, for a slow count of five.",
    ],
    mistakes: [
      "Pinching hard enough to restrict breathing. This is light contact throughout.",
      "Sliding the fingers down the nose instead of circling in place.",
      "Wrinkling the nose while you work on it — the same trap as frowning through the frown line release.",
    ],
    caution:
      "Skip if you have a sinus infection, a recent nose injury, or have had rhinoplasty or nose filler without checking with the clinician who treated you first.",
    cta: {
      headline: "The one-exercise zone, and easy to forget",
      body: "It is the only movement for the nose, so it drops out of a self-made routine almost immediately. A plan that includes it puts it in front of you on the days it belongs.",
    },
  },
];

/** Lookup for the exercise page. Undefined feeds `notFound()` at the route. */
export function exerciseBySlug(slug: string): Exercise | undefined {
  return exercises.find((exercise) => exercise.slug === slug);
}

/** The exercises belonging to one zone, in catalogue order. */
export function exercisesForZone(zoneSlug: string): Exercise[] {
  return exercises.filter((exercise) => exercise.zoneSlug === zoneSlug);
}
