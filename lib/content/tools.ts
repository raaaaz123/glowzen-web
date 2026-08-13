/**
 * The five free tools, one record each, as the source for `/tools/*`.
 *
 * ## Why these pages carry so much prose
 *
 * A page that is only a widget ranks for nothing and gets quoted by nobody.
 * The tool is the reason someone links to the page; the writing underneath is
 * the reason a search engine has anything to index and an assistant has
 * anything to cite. Both halves are load-bearing.
 *
 * ## Rules for writing an entry
 *
 * Tone follows `lib/content/exercises.ts` and `lib/guide.ts`: hedged,
 * specific, no promises. These pages are more dangerous than the exercise
 * pages in one particular way — a tool that produces an *output* invites the
 * reader to treat that output as a verdict. A generated routine is a starting
 * point, a streak is a record of attendance, and two photographs side by side
 * are two photographs. Say so, in `limitations`, on every tool.
 *
 * `answer` is 40–60 words and leads the page, the same as everywhere else.
 *
 * `privacyNote` is per-tool rather than shared because the honest claim
 * differs: the comparer genuinely never stores anything, while the tracker
 * writes to localStorage and the reader deserves to know which.
 */

import type { Metadata } from "next";

export type Tool = {
  slug: string;
  /** Short name for cards, nav and breadcrumbs. */
  name: string;
  /** H1 and <title> — phrased the way people search. */
  title: string;
  /** Meta description. */
  description: string;
  /** Listing subtitle on `/tools`. */
  summary: string;
  /** Answer-first opener, 40–60 words. Must stand alone. */
  answer: string;
  /** Heading above the widget itself. */
  widgetHeading: string;
  /** The explainer beneath the tool. Sections render as h2s. */
  body: { heading: string; paragraphs: string[] }[];
  /** What the tool cannot tell you. Every tool has one; none is padding. */
  limitations: string[];
  faqs: { q: string; a: string }[];
  /**
   * True when the tool sends what the reader types to a model on a server.
   *
   * This is not a badge for a feature — it is the line between the tools that
   * honour the site's on-device promise and the one that cannot. The hub
   * groups by it, the page changes its wording for it, and any future tool
   * that talks to a server has to set it. See `privacyNote`.
   */
  ai?: boolean;
  privacyNote: string;
  cta: { headline: string; body: string };
};

export const tools: Tool[] = [
  {
    slug: "face-yoga-routine-builder",
    name: "Routine builder",
    title: "Face yoga routine builder",
    description:
      "Pick the areas you want to work and the time you have, and get an ordered face yoga routine drawn from an 18-exercise catalogue. Free, runs in your browser.",
    summary:
      "Choose your areas and your minutes. Get an ordered session with the timing for each movement.",
    answer:
      "This routine builder assembles a face yoga session from the areas you pick and the minutes you have. It draws on the same 18-exercise catalogue documented across this site, orders the movements the way a session should run — forehead down to neck, releases at the end — and shows what each one costs in seconds.",
    widgetHeading: "Build your routine",
    body: [
      {
        heading: "How the order is decided",
        paragraphs: [
          "The sequence is not arbitrary and it is not alphabetical. Movements run from the top of the face downward — forehead, eyes, nose, cheeks, lips, jaw, neck — because that is the order in which the areas hand off to each other. Lip work sits after the cheeks and before the jaw, since the muscles around the mouth are involved in both and working them out of sequence means fighting the movements on either side.",
          "Release movements land at the end of their zone rather than the beginning. The Neck Release Roll in particular reads like something to open with, which is exactly why people put it first and lose the point of it: there is nothing to release until there has been some work.",
        ],
      },
      {
        heading: "How long a session should be",
        paragraphs: [
          "Around eight minutes is the figure the GlowZen app is built around, and it is a practical number rather than a magic one — long enough to cover three or four areas properly, short enough to survive a Tuesday. Five minutes is a real session if you keep it to two zones. Fifteen is generous, and the risk at that length is not overwork so much as attrition: a routine you can only face on a good day is a routine you stop doing.",
          "The builder counts the working time in each movement, including the rest between rounds, because the rest is part of the exercise rather than a gap in it. What it does not count is the time you spend finding the right hand position or checking yourself in the mirror, so treat the total as the floor rather than the whole.",
        ],
      },
      {
        heading: "What to do with the result",
        paragraphs: [
          "Every movement in the routine links to its own page, with numbered steps, the muscles it works, the mistakes people make, and who should skip it. Read those before the first session rather than during it — several movements have genuine cautions attached, particularly around the jaw and the eyes, and a couple of them are worth a conversation with a dentist first.",
          "Then keep the routine still for a few weeks. Rebuilding it every session is its own form of procrastination, and consistency is the only variable in this practice that anybody has real control over.",
        ],
      },
    ],
    limitations: [
      "It knows nothing about your face. The routine reflects the areas you ticked and the time you entered, not an assessment of anything.",
      "It cannot tell you whether an exercise suits you. Several carry cautions — the jaw movements especially — and those live on the exercise pages, which is why every movement here links to one.",
      "The time is a working total. Hand position, mirror checks and reading the instructions all sit on top of it.",
      "A generated routine is a starting point, not a prescription, and no arrangement of these movements promises a particular result.",
    ],
    faqs: [
      {
        q: "How many areas should I pick?",
        a: "Two or three is the honest answer for most people starting out. Picking all seven produces a routine long enough that it competes with everything else in your evening, and the practice that gets done beats the practice that covers everything.",
      },
      {
        q: "How often should I run the routine?",
        a: "It depends on the zones in it. The jaw and cheeks suit four or five days a week, the forehead is fine with three, and the neck can take daily work. Each zone page states its own frequency, which is a better guide than a single number applied to everything.",
      },
      {
        q: "Can I change the routine later?",
        a: "Of course — but give it a few weeks first. Rearranging a routine feels like progress and usually is not, and there is no way to tell whether something is working if it changes every week.",
      },
    ],
    privacyNote:
      "The builder runs entirely in your browser. Nothing you pick is sent anywhere, and nothing is stored — reload the page and it is gone.",
    cta: {
      headline: "The routine is the easy half",
      body: "Running it in order, holding each movement long enough, on the days each zone actually wants — that is the part that quietly falls apart around week two. GlowZen keeps the plan, counts the holds out loud and shows you the movement while you do it.",
    },
  },
  {
    slug: "face-yoga-timer",
    name: "Session timer",
    title: "Face yoga timer",
    description:
      "A free interval timer for face yoga, with hold and rest cues you can hear while your hands are on your face. Pick an exercise or set your own timing.",
    summary:
      "Interval timer with audible hold and release cues. Set it and put your hands on your face.",
    answer:
      "This is an interval timer built for facial exercise: it counts a hold, calls the release, counts the rest, and moves to the next round without you touching anything. You can load the timing from any of the 18 exercises documented on this site, or set your own hold, rest and round count.",
    widgetHeading: "Set the timer",
    body: [
      {
        heading: "Why counting in your head does not work",
        paragraphs: [
          "Almost everyone shortens a hold when they count it themselves, and the effect gets worse as the hold gets harder — which is to say it gets worse exactly where the work is. A thirty-second forehead hold counted internally tends to come out around twenty. Nobody does this deliberately; it is simply what happens when the thing being counted is uncomfortable and the person counting wants it to end.",
          "The other reason is more practical. Most of these movements put both hands on your face, several want your eyes closed, and a few have you looking at the ceiling. Watching a clock is not an option in any of them, which is why the cues here are audible rather than visual.",
        ],
      },
      {
        heading: "How to use it",
        paragraphs: [
          "Pick an exercise from the list and the hold, rest and round count fill in from the catalogue — the same numbers written on that exercise's own page. Or set the three yourself if you are working from something else entirely; the timer does not care where the movement came from.",
          "Leave the sound on if you can. The point is to be able to close your eyes, keep both hands where they belong, and be told when to release rather than having to look. If you are somewhere you cannot make noise, the phase and the countdown are large enough to read from arm's length.",
        ],
      },
      {
        heading: "Rest is part of the exercise",
        paragraphs: [
          "The gap between rounds is not dead time. The Platysma Stretch is the clearest case — eight rounds of five seconds with five seconds of genuine slack between them is a different exercise from eight rounds run together, and the slack is the first thing that gets shortened when someone is counting in their head. The timer holds both halves at the length the exercise asks for.",
        ],
      },
    ],
    limitations: [
      "A timer counts time. It cannot see your hand position, your angle or whether you are doing the movement at all.",
      "The preset timings come from the exercise pages and are a sensible default, not a rule. If a hold hurts, stop before the timer says so.",
      "It does not keep a record. Nothing is saved between sessions — the streak tracker is the tool for that.",
      "Browsers throttle timers in background tabs. Keep the page in front while a session runs.",
    ],
    faqs: [
      {
        q: "How long should I hold a face yoga exercise?",
        a: "It varies by movement rather than by rule. Holds in this catalogue run from five seconds for a strong contraction like the Platysma Stretch to thirty for a light resistance hold like the Forehead Smoother. Each exercise page states its own, and this timer loads them for you.",
      },
      {
        q: "Will it keep my screen awake?",
        a: "It asks the browser to, on the browsers that allow it — which is most current mobile ones. If yours does not, the session still runs and the sound still plays; the screen may simply dim.",
      },
      {
        q: "Can I use it for something other than face yoga?",
        a: "Nothing stops you. It is a plain interval timer with a hold phase and a rest phase, and the custom settings do not check what you are doing with them.",
      },
    ],
    privacyNote:
      "Everything runs in your browser. No account, nothing uploaded, and nothing kept once you close the tab.",
    cta: {
      headline: "A timer for one exercise, or a session that runs itself",
      body: "This page times one movement at a time, which is fine for the movement you are learning. A whole session is a different job: the right exercises in the right order, each demonstrated on video, each counted aloud. That is what the app is.",
    },
  },
  {
    slug: "face-yoga-tracker",
    name: "Streak tracker",
    title: "Face yoga streak tracker",
    description:
      "A free habit calendar for facial exercise. Mark the days you practise, see your streak, and keep it on your own device — no account, nothing uploaded.",
    summary:
      "Mark the days you practise. Twelve weeks at a glance, kept on your device.",
    answer:
      "This is a habit calendar for facial exercise: tap a day to mark it done, and see the last twelve weeks at a glance along with your current streak, your longest, and the total. It is stored in your browser on this device only — no account, no sign-in, nothing uploaded anywhere.",
    widgetHeading: "Your twelve weeks",
    body: [
      {
        heading: "Why consistency is the whole thing",
        paragraphs: [
          "Facial exercise has one variable anybody genuinely controls, and it is not intensity or technique or which movements you chose. It is whether you did it. Muscle responds to repeated load over months, and nothing about a face makes that different from anywhere else on the body — three sessions a week sustained through a winter is a different proposition from a fortnight of daily enthusiasm followed by nothing.",
          "Which is why the useful record is attendance rather than effort. A calendar with marks on it answers one question honestly: have you actually been doing this. Most people's memory of how often they practised is generous by roughly a third.",
        ],
      },
      {
        heading: "How to read the grid",
        paragraphs: [
          "Each column is a week and each square a day, twelve weeks back to today. Tap any square to mark it or unmark it — including past days, since the point is an accurate record rather than a test you can fail.",
          "The current streak counts back from today, and it forgives today until the day is over: miss yesterday and the streak breaks, but a streak does not evaporate at breakfast because you have not practised yet. The longest streak stays where it is regardless.",
        ],
      },
      {
        heading: "A missed day is not a failure",
        paragraphs: [
          "The trouble with streaks is that they invert once broken. A ninety-day run ending at eighty-nine tends to end the practice as well, because the number was doing the motivating rather than the practice. Treat a break as a break. The grid keeps every mark you made before it, which is the more accurate picture of what you have done.",
          "The zones also want different frequencies — the forehead is fine with three days a week, the jaw suits four or five, the neck can take daily work. A perfect unbroken line is not the target for most routines and chasing one can mean overworking an area that wanted a rest day.",
        ],
      },
    ],
    limitations: [
      "It records that you marked a day, nothing more. It does not know what you did, how long for, or how well.",
      "It lives in this browser on this device. Clear your site data, use private browsing, or switch to your laptop and the marks are not there.",
      "There is no backup and no export. If the record matters to you, an app that syncs is the honest recommendation.",
      "A streak is a measure of attendance, not of progress, and the two are not the same thing.",
    ],
    faqs: [
      {
        q: "How many days a week should I practise face yoga?",
        a: "It depends on the area. The forehead does well on three, the cheeks and jaw on four or five, and the neck can take daily gentle work. Each zone page states its own frequency, and there is no single number that is right for the whole face.",
      },
      {
        q: "Does the tracker sync between my phone and computer?",
        a: "No. It is stored in the browser you are using, on the device you are using, and there is no account to sync with. That is the trade for it needing no sign-up, and it is worth knowing before you build up three months of marks.",
      },
      {
        q: "What happens if I miss a day?",
        a: "The current streak resets and the longest one stays. Nothing else changes, and the marks you have already made remain. Missing a day is ordinary — the practice is measured in months.",
      },
    ],
    privacyNote:
      "Your marks are saved in this browser's local storage and go nowhere else. There is no account, no server and nothing to sign in to — which also means no backup.",
    cta: {
      headline: "A calendar that lives on one device is a calendar you will lose",
      body: "Clear your browser data and three months of marks go with it, which is a poor reward for three months of practice. GlowZen keeps the streak with the sessions that earned it, on your phone, where the practice actually happens.",
    },
  },
  {
    slug: "face-yoga-quiz",
    name: "Goal quiz",
    title: "Which face yoga exercises should I do?",
    description:
      "Six questions about your goals, your time and your jaw, and a suggested set of face yoga areas to start with — plus the cautions that apply to you.",
    summary:
      "Six questions, then a suggested place to start and the cautions that apply to you.",
    answer:
      "Six questions — what brought you here, how much time you have, whether you clench your jaw, how your days are spent — and you get a suggested two or three areas to begin with, the reasoning behind each, and any cautions that apply. It is a starting point for a routine, not an assessment of your face.",
    widgetHeading: "Six questions",
    body: [
      {
        heading: "Why start with two or three areas",
        paragraphs: [
          "Seven zones is a long session and a lot to learn at once, and the first fortnight is when most people quit. Narrowing to two or three means each movement gets learned properly, the session stays short enough to survive a bad evening, and there is some chance of telling later whether anything changed — which is impossible when everything changed at once.",
          "The areas suggested here follow from what you say you want and how much time you have. They are not the only reasonable answer, and if a zone you care about does not appear, add it. Nothing here knows your face.",
        ],
      },
      {
        heading: "The jaw question is the important one",
        paragraphs: [
          "One question asks whether you clench or grind your teeth, and it changes the recommendation rather than decorating it. The jaw movements add deliberate load to muscles that are already overworked in a clencher, and the standard advice — that a tight jaw wants strengthening — has it backwards for that group. Release work is usually the better starting point, and a jaw that clicks or hurts is worth raising with a dentist before adding exercises to it rather than after.",
          "The same logic applies to recent dental work, botulinum toxin or filler. None of that means you cannot practise; it means asking the clinician who treated you, because they know what they did and this page does not.",
        ],
      },
      {
        heading: "What the answer is worth",
        paragraphs: [
          "Six questions cannot assess anything. What they can do is narrow seven zones and eighteen movements down to a place to start, and flag the two or three cautions most likely to apply to you — which is genuinely useful and is the whole claim being made.",
          "Every suggested area links to its own page, where the muscles, the frequency, the things to avoid and the exercises themselves are set out properly. Read those before starting.",
        ],
      },
    ],
    limitations: [
      "It cannot see your face. Every suggestion follows from what you typed, and a quiz has no way to check any of it.",
      "It is not an assessment, a diagnosis or a screening. If something hurts, clicks or has been bothering you, a dentist or doctor is the right stop, not this page.",
      "Different answers on a different day give different suggestions. That is a sign of how coarse six questions are, not of a change in your face.",
      "No arrangement of these exercises promises a result, and nothing at the end of this quiz should be read as one.",
    ],
    faqs: [
      {
        q: "Which face yoga exercises should a beginner start with?",
        a: "Two or three zones, four or five movements, eight minutes or so — and whichever areas you actually care about, since those are the ones you will keep showing up for. The specific movements matter far less than the fact that you can name them without looking, which is what makes a routine survive.",
      },
      {
        q: "I clench my jaw. Should I do face yoga?",
        a: "Ask a dentist first, genuinely. Adding deliberate load to a muscle already overworked overnight can make tension worse, and release movements like the Temple Smooth are usually a better starting point for clenchers than jaw strengthening.",
      },
      {
        q: "Is this quiz a face scan?",
        a: "No. Nothing here looks at a photograph — it is six multiple-choice questions and some straightforward logic. The app does offer a scan, and even that is described as an estimate for guidance rather than a clinical assessment.",
      },
    ],
    privacyNote:
      "The questions are answered and scored in your browser. No photo, no camera, no account, and nothing sent anywhere.",
    cta: {
      headline: "Six questions is a narrow view of a face",
      body: "It gets you to a starting point, which is more than most people have. The app starts from a scan of your actual face across all seven zones, then adjusts the plan as the weeks go on — and it can see whether the area you picked is the one that changed.",
    },
  },
  {
    slug: "progress-photo-comparison",
    name: "Progress photo comparer",
    title: "Progress photo comparison tool",
    description:
      "Put two progress photos side by side or under a slider, in your browser. Nothing is uploaded — the images never leave your device.",
    summary:
      "Two photos, side by side or under a slider. Nothing is uploaded, ever.",
    answer:
      "Load two photographs — an earlier one and a recent one — and compare them side by side or under a drag slider. Both images stay on your device: they are read by the browser and never uploaded, which is why this works with no account and why closing the tab is all it takes to remove them.",
    widgetHeading: "Compare two photos",
    body: [
      {
        heading: "Why the photos never leave your device",
        paragraphs: [
          "The browser can read a file you choose and display it without sending it anywhere, and that is all this page does. There is no server involved, no upload, no storage and no account — which is not a privacy feature bolted on but simply how the tool is built. Close the tab and nothing of the images remains.",
          "It is worth being specific about what that means, because \"we don't store your photos\" is a claim a lot of sites make about pictures they very much did receive. These ones are never transmitted at all.",
        ],
      },
      {
        heading: "How to take comparable photographs",
        paragraphs: [
          "This is most of the work, and it is where nearly all before-and-after photography goes wrong. Same light, same time of day, same distance, same angle, same expression, no makeup in either. Daylight from a window at the same hour beats a bathroom light, which is directly overhead and does more to a jawline than any exercise will.",
          "Take the second photo from the position the first one was taken from rather than from wherever you happen to be standing. Small changes in camera height are the single biggest source of apparent change in a face — a phone held slightly lower lengthens the jaw and shortens the neck, and that difference will swamp anything a few weeks of practice did.",
          "Leave a proper gap. Weeks, not days. Facial exercise works on muscle, and muscle does not change on a timescale a camera can catch from one week to the next.",
        ],
      },
      {
        heading: "Reading the result honestly",
        paragraphs: [
          "Two photographs are two photographs. They record how a face looked under whatever conditions applied at the moment each was taken, and those conditions include sleep, salt, hydration, the time of day, how long you had been upright, and where the light was. Any of those moves a face more visibly over 24 hours than exercise does over a month.",
          "This is also why before-and-after photographs are so easy to mislead with, including unintentionally. If you find yourself retaking the second photo until it looks better, you have stopped comparing and started producing marketing — and the person you are selling to is you.",
        ],
      },
    ],
    limitations: [
      "Nothing is measured. The tool puts two images next to each other and does no analysis of either.",
      "Lighting, camera angle, time of day and expression can each produce more apparent change than weeks of practice.",
      "Nothing is saved. Reload the page and you will pick the files again — deliberately, since saving would mean storing your photographs.",
      "A visible difference between two photographs is not evidence that an exercise caused it, and no comparison here should be read as proof of a result.",
    ],
    faqs: [
      {
        q: "Are my photos uploaded anywhere?",
        a: "No. The browser reads the files you pick and displays them locally, and no part of either image is transmitted. There is no server to receive them, which is also why there is no account and nothing to delete afterwards.",
      },
      {
        q: "How far apart should progress photos be?",
        a: "Eight to twelve weeks is a reasonable gap for facial exercise. Anything shorter mostly captures sleep, hydration and the light, all of which change a face more from one morning to the next than practice does over a fortnight.",
      },
      {
        q: "Why does my face look different in photos taken minutes apart?",
        a: "Camera height, lens distance and lighting, mostly. A phone held slightly lower or nearer changes the apparent shape of a jaw noticeably, which is why matching the position of the first photograph matters more than anything else you can control.",
      },
    ],
    privacyNote:
      "Your images are read by the browser and displayed locally. Nothing is uploaded, nothing is stored, and there is no account — reload the page and both are gone.",
    cta: {
      headline: "Matching the angle by eye is the hard part",
      body: "Same light, same distance, same height, eight weeks apart — easy to write down and difficult to reproduce from memory. GlowZen keeps your progress photos in order with a guide overlay when you take the next one, in private encrypted storage on your own device.",
    },
  },
  {
    slug: "face-yoga-plan",
    name: "AI plan builder",
    title: "AI face yoga plan builder",
    description:
      "Describe what you want to work on in your own words and get a face yoga routine from an 18-exercise catalogue, with the cautions that apply to what you said.",
    summary:
      "Describe your goals in a sentence. Get a routine, and the cautions that apply to you.",
    answer:
      "Type a sentence or two about what you want to work on, how long you have and anything to be careful of. A language model reads it and chooses which areas to start with; the routine itself is then assembled from this site's catalogue, so every movement it gives you is a real one with a page you can read.",
    widgetHeading: "Describe what you want to work on",
    ai: true,
    body: [
      {
        heading: "The model picks the areas. It does not write the routine.",
        paragraphs: [
          "This matters more than it sounds. Ask any language model to write you a face yoga plan and it will produce five plausible movements with confident timings, some of which do not exist, attached to claims about what they achieve. It is not being careless — that is simply the register this subject is written in across most of the internet, and a model writes back what it was trained on.",
          "So the model here has a much narrower job: read your sentence, choose two or three areas from a fixed list of seven, and choose a session length. The routine is then built from the real catalogue by the same code behind the ordinary routine builder. Every exercise you are given is one of the eighteen documented on this site, at the timing its own page states, in the order a session should run. The model cannot invent a movement, cannot change a hold, and cannot put the neck release first.",
        ],
      },
      {
        heading: "Why the answers are so carefully hedged",
        paragraphs: [
          "The model is instructed at length not to promise you anything, and what it writes is checked again afterwards for the language of promises — timeframes, \"gets rid of\", \"clinically\", \"results in\". Anything that trips that check is dropped from the page rather than shown to you.",
          "That is not modesty. Facial exercise is a general wellbeing practice, not a treatment, and how a face looks depends on bone, fat, skin and genetics as much as on muscle. A tool that generated encouraging promises would be more satisfying to use and would be telling you something nobody can honestly say.",
        ],
      },
      {
        heading: "This one is not private in the way the others are",
        paragraphs: [
          "Every other tool here runs entirely in your browser — the photo comparer never uploads an image, the tracker never leaves your device. This one cannot work that way, because a language model runs on a server. The sentence you type is sent to one to be interpreted.",
          "So type it the way you would type a search: what you want to work on, how long you have, anything a routine should avoid. There is no account and GlowZen keeps no copy of what you write, but it does leave your device, and no photograph is involved at any point.",
        ],
      },
    ],
    limitations: [
      "It reads your sentence, not your face. No photograph is involved and nothing here assesses anything about you.",
      "Two or three areas from a list of seven is a coarse decision. It is a starting point, and a different phrasing on a different day may well produce different areas.",
      "It is not medical advice and cannot tell you whether an exercise suits you. Pain, clicking or a diagnosed condition is a question for a dentist or doctor, not for this page.",
      "The text you type is sent to a model on a server. The other tools on this site never send anything anywhere.",
      "If the model is unreachable it falls back to a sensible default routine and says so, rather than pretending it answered.",
    ],
    faqs: [
      {
        q: "Can AI make me a face yoga routine?",
        a: "It can choose sensibly between areas if it is given a real catalogue to choose from, which is what happens here. What it should not do is write the exercises themselves — asked to do that, a model will produce movements that do not exist and timings it invented, described with a confidence the subject does not support.",
      },
      {
        q: "Is anything I type here stored?",
        a: "Not by GlowZen. There is no account, no database and nothing written to your browser either. The text is sent to a model to be read and the answer comes back — but it does leave your device, which is not true of any other tool on this site.",
      },
      {
        q: "Does it look at a photo of my face?",
        a: "No. There is no camera, no upload and no image of any kind. It reads a sentence you typed. The app does offer a face scan, and even that is described as an estimate for guidance rather than a clinical assessment.",
      },
      {
        q: "Why will it not tell me how long until I see a change?",
        a: "Because nobody can say, and a number attached to that promise is a sales tactic rather than information. How a face looks depends on bone structure, body fat, skin and genetics as well as muscle, and facial exercise works on one of those.",
      },
    ],
    privacyNote:
      "Unlike the other tools here, this one sends the sentence you type to a language model on a server in order to read it. No photo, no account, and GlowZen keeps no copy — but it does leave your device, so type it the way you would type a search.",
    cta: {
      headline: "It read one sentence. The app reads your face.",
      body: "Two or three areas from a line of text is a reasonable place to start, and it is guesswork about a face nothing here can see. GlowZen scans yours across all seven zones, builds the plan from that, and adjusts it as the weeks go on.",
    },
  },
];

/** Lookup for the tool pages. Undefined feeds `notFound()` at the route. */
export function toolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

/**
 * The metadata every tool page exports, from the record it renders.
 *
 * Each tool has its own route rather than sharing a `[tool]` segment: the five
 * widgets have no code in common, and one dynamic route would put all five in
 * a single client bundle so that every visitor to the timer downloads the
 * photo comparer. Five thin pages is the cost of that, and this keeps the
 * repeated half of them to one line.
 */
export function toolMetadata(tool: Tool): Metadata {
  const url = `/tools/${tool.slug}`;
  return {
    title: tool.title,
    description: tool.description,
    alternates: { canonical: url },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url,
      type: "website",
    },
  };
}
