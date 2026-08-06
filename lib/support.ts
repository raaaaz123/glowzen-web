/**
 * The support page, mirrored from GlowFace/SUPPORT.md.
 *
 * App Store Connect requires a reachable support URL in the listing metadata,
 * and a reviewer follows it. It reuses `LegalDocument` because the shape is the
 * same — headings, prose, bullets — and one renderer is easier to keep looking
 * right than two.
 *
 * Every answer here names the exact screen the user has to reach. "Check your
 * settings" is not an answer; "Profile → Reminders" is.
 */

import { CONTACT_EMAIL, LAST_UPDATED } from "@/lib/legal";
import type { LegalDocument } from "@/lib/legal";
import { MIN_OS } from "@/lib/site";

export const support: LegalDocument = {
  slug: "support",
  title: "Support",
  updated: LAST_UPDATED,
  intro:
    "Everything below covers the questions we get most, and each answer names the exact screen you need. If yours isn't here, email us — the address is right underneath.",
  sections: [
    {
      heading: "What you need",
      bullets: [
        `An iPhone or iPad running ${MIN_OS} or later.`,
        "A connection for setup, your face scan, the exercise videos and syncing progress. Sessions you have already loaded keep working offline.",
        "Optional: camera access, photo library access and notifications. The app works without all three.",
      ],
      body: [
        "There is no account, no sign-in and no password. Setup, your face scan, your glow score and the first day of your programme are free. The rest of the programme needs a subscription, and the price in your own currency is shown before you buy anything.",
      ],
    },
    {
      heading: "Getting started",
      bullets: [
        "Answer the setup questions — age range, goals, focus areas, experience level and how much time you want to practise.",
        "Take a face scan, or pick an existing selfie from your library. This sets your starting scores.",
        "GlowZen builds your plan. Open the Dashboard each day and tap into the session.",
        "Add progress photos from the Progress tab whenever you want to compare.",
      ],
    },
    {
      heading: "I don't want to take a face scan. Can I skip it?",
      body: [
        "Yes. The scan only sets your starting scores. You still get a full plan and every exercise without it.",
      ],
    },
    {
      heading: "The camera or photo library isn't working",
      body: [
        "GlowZen needs permission, and iOS only asks once. Open the iOS Settings app → scroll to GlowZen → turn on Camera and Photos. If you declined earlier, this is the only place it can be turned back on.",
      ],
    },
    {
      heading: "I'm not getting my daily reminder",
      body: ["Two things to check, in this order:"],
      bullets: [
        "In GlowZen: Profile → Reminders. Confirm the daily reminder is on and set to the time you want.",
        "In the iOS Settings app: Notifications → GlowZen → Allow Notifications.",
      ],
    },
    {
      heading: "Videos won't load, or the app looks stuck",
      body: [
        "The exercise videos and your plan come from our servers. Check your connection, then close the app fully — swipe up from the app switcher — and reopen it. If it keeps happening on a good connection, that is a fault on our side and we want to know: email us with your iOS version and roughly when it happened.",
      ],
    },
    {
      heading: "My streak or progress looks wrong",
      body: [
        "Progress is tied to your device through an identifier stored in the Keychain, which survives deleting and re-downloading the app. If your plan did not come back after a reinstall, email us and describe what you're seeing before you set up again — starting over creates a new identifier and the old data becomes unreachable.",
      ],
    },
    {
      heading: "Can I change my plan after setup?",
      body: [
        "Yes. Go to Profile and retake the quiz. Your new answers rebuild the plan, and your progress photos are kept.",
      ],
    },
    {
      heading: "Can I use GlowZen on more than one device?",
      body: [
        "Not at the moment. Your plan and progress live with the device you set up on, and there is no account to sign into on a second one.",
        "A subscription is the exception, because it belongs to your Apple ID rather than to the device. Sign in with the same Apple ID on the new phone and tap Restore purchases, and it comes across — though the plan and photos do not.",
      ],
    },
    {
      heading: "What do I get without paying?",
      body: [
        "All of setup, your face scan and the glow score it produces, the full exercise library to browse, Lumi the in-app coach, and day one of your programme — which stays available for as long as you like, not just once.",
        "A subscription unlocks the rest of the programme and the features listed on the purchase screen.",
      ],
    },
    {
      heading: "How do I cancel my subscription?",
      body: [
        "On your device: Settings → tap your name → Subscriptions → GlowZen → Cancel. You can also reach it from the app: You tab → Manage subscription.",
        "No app can cancel an App Store subscription on your behalf, so this has to be done in Apple's settings. Cancelling stops the next renewal; you keep access until the period you have paid for runs out.",
        "Deleting the app, or deleting your data inside it, does not cancel a subscription. Apple will keep charging until you cancel it there.",
      ],
    },
    {
      heading: "I paid, but the app still says I'm locked",
      body: [
        "Tap Restore purchases — it is on the You tab and on every purchase screen. That re-reads the receipt from Apple and unlocks everything.",
        "If it says there is nothing to restore, check which Apple ID is signed in under Settings → your name. A subscription belongs to the Apple ID that bought it, so buying on one and using another is the usual cause.",
        `Still stuck? Email ${CONTACT_EMAIL} with the date of purchase and we will sort it out.`,
      ],
    },
    {
      heading: "I want a refund",
      body: [
        "Refunds are handled by Apple, not by us — we are not the merchant and cannot issue one. Go to reportaproblem.apple.com, sign in with the Apple ID that made the purchase, and request it there.",
        `If Apple turns it down and you think that is wrong, write to ${CONTACT_EMAIL} and we will do what we can.`,
      ],
    },
    {
      heading: "How do I delete a single progress photo?",
      body: ["Open the Progress tab, tap the photo, and delete it there."],
    },
    {
      heading: "How do I delete everything?",
      body: [
        "Profile → Delete my data → Delete everything. That removes your profile, plan, every scan, your session history, chat history, badges and every photo — from the device and from our storage. It happens immediately and cannot be undone.",
        `Deleting the app on its own does not clear what is held on our servers, so use Delete my data first if that is what you want. You can also email ${CONTACT_EMAIL} and we will delete it for you.`,
      ],
    },
    {
      heading: "Is my face data used to train AI?",
      body: [
        "No. Your scan is analysed to produce your scores and nothing else. It is never used to train a model and never shown to another user. The Privacy Policy has the full detail, including which providers touch it.",
      ],
    },
    {
      heading: "Does GlowZen track me or show ads?",
      body: [
        "No to both. There are no ads in the app, no ad networks in the build, and the advertising identifier is never read — which is why you are never asked for tracking permission. The analytics we do run are first-party and are described in the Privacy Policy.",
      ],
    },
    {
      heading: "Safety",
      body: [
        "GlowZen is a general wellbeing and fitness app. It is not medical care, it does not diagnose, treat or prevent any condition, and the scan scores are estimates rather than clinical measurements.",
        "Practise gently and stop anything that hurts. If you have a jaw, neck or skin condition, or you are recovering from a procedure, speak to a professional before starting.",
      ],
    },
    {
      heading: "Report a bug or suggest a feature",
      body: [
        `Email ${CONTACT_EMAIL} with what happened, what you expected, and the steps that led to it. Screenshots and screen recordings help a lot. We read everything.`,
      ],
    },
  ],
};
