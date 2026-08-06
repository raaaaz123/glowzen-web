/**
 * The legal documents, mirrored from
 * GlowFace/Views/Profile/LegalDocuments.swift.
 *
 * App Store Connect requires a *hosted* privacy policy URL, which the in-app
 * copies cannot satisfy — that is why these exist. The wording is deliberately
 * identical to the app's: two versions that drift apart are worse than one.
 * If you edit the Swift file, edit this too.
 *
 * Every claim below is checkable against the code. Where a provider is named,
 * it is named because a request actually reaches it; where a field is said to
 * stay on the device, no call site sends it. A policy that describes a
 * different app is the one thing worse than no policy.
 */

export type LegalSection = {
  heading: string;
  body?: string[];
  bullets?: string[];
};

export type LegalDocument = {
  slug: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export const LAST_UPDATED = "7 August 2026";
/** The same date for machines (sitemap lastModified). Keep the two in step. */
export const LAST_UPDATED_ISO = "2026-08-07";
export const ENTITY = "GlowZen";
export const CONTACT_EMAIL = "rexatechin@gmail.com";
/** Quoted in all three documents, so it lives in one place. */
export const REPLY_WINDOW = "2 business days";

export const privacy: LegalDocument = {
  slug: "privacy",
  title: "Privacy Policy",
  updated: LAST_UPDATED,
  intro:
    "GlowZen has no account, no sign-in and no password. This policy lists every piece of data the app handles, where each piece goes, and how to remove it. It describes the app as it is built, not as an intention.",
  sections: [
    {
      heading: "Who we are",
      body: [
        `${ENTITY} provides the GlowZen app for iPhone and iPad. If you have a question about this policy, write to ${CONTACT_EMAIL} and a person will reply, usually within ${REPLY_WINDOW}.`,
      ],
    },
    {
      heading: "How you are identified",
      body: [
        "The first time you open the app it generates a random identifier — a UUID — and stores it in the device Keychain, marked so it stays on that device and is never carried into an iCloud backup restored onto another one. Every request to our server carries that identifier instead of a login.",
        "It is not your Apple ID, not your email, and not an advertising identifier. It means nothing outside GlowZen and cannot be used to recognise you in any other app or on any website. Deleting your data discards it, and the next launch mints a new one.",
        "If you subscribe, the app keeps a second random identifier for billing alone. It exists because a subscription is a contract between you and Apple that we cannot cancel: if it were discarded along with everything else, you would keep being charged while the app treated you as a non-subscriber. So this one does travel in an encrypted backup to a replacement phone, and it survives deleting your data. It is only ever used to ask our payments provider whether a subscription is active, and it is not attached to your plan, your scans or your photos.",
      ],
    },
    {
      heading: "What never leaves your device",
      bullets: [
        "Your first name. It is kept in the app's own storage and used to greet you. It is never sent to our servers or to any third party. The analytics record only whether you entered a name or skipped the question — never what it was.",
        "The date you signed the commitment.",
        "Your daily reminder. Reminders are scheduled by iOS on the device itself. The app registers no push token, and no server sends you notifications.",
      ],
    },
    {
      heading: "What is sent to our servers",
      body: [
        "Only what the app needs to build your programme and show your progress:",
      ],
      bullets: [
        "Your setup answers: age range, gender if you choose to give one, your goals, the areas you want to focus on, your experience level, how long you want to practise, and whether reminders are on.",
        "The three answers setup asks about you rather than about your training: what brought you to the app, what you have already tried, and what usually stops you keeping something up. They do not change which exercises you are given — they change how your plan is described back to you, and they let Lumi coach the person rather than the schedule.",
        "Your face scan, if you take one — the photo itself and the scores produced from it.",
        "Progress photos you add, and the short note you can attach to each.",
        "Which sessions you finished and when, plus streaks and badges earned.",
        "Messages you send to Lumi, the in-app coach, and the audio if you dictate one instead of typing it.",
        "How you heard about GlowZen, if you answer that question.",
        "App version and platform.",
      ],
    },
    {
      heading: "What we never collect",
      bullets: [
        "Your email address or phone number. There is nowhere in the app to enter either.",
        "Your location. Location tags and all other EXIF metadata are stripped from every photo before it is stored.",
        "The advertising identifier (IDFA). The app does not link Apple's AdSupport framework at all.",
        "Payment details. GlowZen offers subscriptions, but the transaction happens entirely inside Apple's App Store — your card number, billing address and Apple ID never reach us, and there is nowhere in the app to type them.",
        "Your contacts, calendar or health records. The app does not use HealthKit, and the microphone is used only for a message you deliberately dictate.",
      ],
    },
    {
      heading: "Tracking and advertising",
      body: [
        "GlowZen does not track you. It contains no advertising, no ad networks and no attribution SDKs, it never reads the advertising identifier, it does not share data with data brokers, and it does not combine anything it holds with data from other companies for advertising purposes.",
        "That is why you never see the App Tracking Transparency prompt: that permission exists to authorise tracking, and there is none here to authorise.",
      ],
    },
    {
      heading: "How your photos are handled",
      body: [
        "Photos are the most sensitive thing the app touches, so they get the strictest treatment.",
        "On the way in, every image is decoded and re-encoded, which discards EXIF — including the GPS coordinates phone cameras routinely attach. They are then written to a private bucket that is never publicly readable and is kept separate from the bucket holding the app's exercise videos. Scan images are encrypted at rest.",
        "When the app shows you a photo it requests a signed link that stops working after fifteen minutes. Nobody can browse your photos, and a link that leaked would be useless shortly afterwards.",
        "Your face scan is analysed to estimate the scores you see after setup. It is not used to train any model, and it is never shown to another user.",
      ],
    },
    {
      heading: "Who else receives data",
      body: [
        "We use a small number of infrastructure providers, each only for the job named. Each processes data on our instructions, and none is permitted to use it for its own advertising:",
      ],
      bullets: [
        "Google Firebase (Firestore) — stores your profile, plan, scan scores, session history, badges and Lumi chat history.",
        "Google Firebase Crashlytics — records crash diagnostics so faults can be fixed.",
        "Cloudflare R2 — stores your progress photos privately, and serves the app's exercise videos and coaching audio.",
        "Amazon Web Services — Bedrock analyses your face scan and generates Lumi's replies, Polly generates the spoken coaching, and S3 stores scan images.",
        "Google Gemini API — transcribes your voice message if you dictate to Lumi instead of typing.",
        "Mixpanel — product analytics and session replay, described next.",
        "RevenueCat — manages subscriptions. It receives the billing identifier described above, your device and app version, and the receipt Apple issues for a purchase. It does not receive your name, your photos, your scans or your plan.",
        "Apple — takes the payment, holds the card details, and issues the receipt. Apple is the merchant for every purchase; we are not.",
      ],
    },
    {
      heading: "Subscriptions and payments",
      body: [
        "Buying a subscription happens in Apple's own purchase sheet. We never see your card, and no payment detail is stored on our servers or on your device by us.",
        "What we can see is whether a subscription is currently active, which plan it is, when it renews or lapses, and the country of the App Store it was bought in. That comes to us through RevenueCat, which reads Apple's receipt on our behalf so the app knows what to unlock. It is tied to the billing identifier, not to your name or your face.",
        "Cancelling is done in Apple's settings, not here — no app can cancel a subscription for you. Refunds are handled by Apple under their terms.",
      ],
    },
    {
      heading: "Analytics and session replay",
      body: [
        "We use Mixpanel to see where the app works and where people get stuck. It receives named events — onboarding step reached, session started, session completed, progress photo added, reminder toggled and so on — each carrying the random device identifier, the app version and the platform, plus profile attributes: goals, daily minutes, experience level, age range and gender. Mixpanel's automatic event collection is switched off, so nothing is sent beyond the events the app defines for itself.",
        "Since the app started offering subscriptions, that list also includes which purchase screen you were shown, which plan you tapped, and whether a purchase completed, was cancelled or failed — plus a flag on your profile recording whether you currently subscribe. These carry the product identifier and never a price you paid, a card, or anything Apple sends us.",
        "Session replay records the screens you interact with, so a confusing flow can be watched rather than guessed at. Recordings upload over Wi-Fi only. Images, text, web views and maps are masked by default, and every screen that shows a face, your name or your chat is additionally marked sensitive, so it is masked before anything leaves the device. Recording stops the moment you delete your data.",
        "This is first-party analytics: it is used to improve GlowZen, it is not combined with data from other companies, and it is not used for advertising.",
      ],
    },
    {
      heading: "We do not sell your data",
      body: [
        "We do not sell, rent or trade your information. We do not use your photos for advertising, and we do not share them with anyone outside the providers above.",
      ],
    },
    {
      heading: "Where it is processed",
      body: [
        "Our providers operate in several countries, including the United States, so your data may be processed outside the country you live in. Where the law requires a transfer mechanism, we rely on those providers' standard contractual clauses.",
      ],
    },
    {
      heading: "Why we are allowed to hold it",
      body: [
        "If you are in the UK or the EU: we process your setup answers, scan, photos and session history to provide the app you asked for, and we process analytics and crash diagnostics on the basis of our legitimate interest in it working properly. Camera access, photo library access and notifications are requested separately by iOS and are used only if you agree.",
      ],
    },
    {
      heading: "How long it is kept",
      body: [
        "Your data stays until you remove it. Delete a single photo from the Progress tab, or use Profile → Delete my data to remove your profile, plan, every scan, your session history, chat history, badges and every photo — from the device and from our storage. Photos are deleted first, and if that step fails nothing else is removed, so images are never stranded behind a deleted account. Deletion is immediate and cannot be undone.",
        `Deleting the app on its own does not remove what is held on our servers, so use Delete my data first if that is what you want. Analytics events already recorded are keyed to the random identifier and are not removed by that button — email ${CONTACT_EMAIL} and we will delete the analytics profile too.`,
      ],
    },
    {
      heading: "Your rights",
      body: [
        `Depending on where you live you may have the right to access, correct, export or delete your data, and to object to how it is used. Because there is no account, the fastest route is Delete my data in the app. For anything else, write to ${CONTACT_EMAIL} and we will reply within ${REPLY_WINDOW}. You also have the right to complain to your local data protection authority.`,
      ],
    },
    {
      heading: "Children",
      body: [
        "GlowZen is not intended for children under 13, and we do not knowingly collect data from them. If you believe a child has used the app, contact us and we will remove the data.",
      ],
    },
    {
      heading: "Changes",
      body: [
        "If this policy changes in a way that affects you, the updated version will appear here and the date at the top will change.",
      ],
    },
  ],
};

export const terms: LegalDocument = {
  slug: "terms",
  title: "Terms of Use",
  updated: LAST_UPDATED,
  intro:
    "These terms cover your use of the GlowZen app. Using the app means you accept them.",
  sections: [
    {
      heading: "What GlowZen is",
      body: [
        "GlowZen is a general wellbeing and fitness app for facial exercise. It builds a routine from your answers and guides you through it with demonstrations and spoken cues.",
        "There is no account and no password. Setting up, taking your face scan, seeing your glow score and practising the first day of your programme are free and stay free. The rest of the programme, and the other features listed on the purchase screen, need a subscription.",
      ],
    },
    {
      heading: "Subscriptions, billing and cancellation",
      body: [
        "GlowZen sells auto-renewing subscriptions of different lengths. The plans available to you, and the exact price in your own currency, are shown on the purchase screen before you buy anything — prices differ by country and can change, so they are not repeated here.",
        "Payment is charged to your Apple ID account when you confirm the purchase. A subscription renews automatically for the same period at the same price unless you turn auto-renewal off at least 24 hours before the current period ends. Apple charges the renewal within the 24 hours before the period ends.",
        "You can manage your subscription and turn auto-renewal off at any time in Account Settings on your device, or through the link in the app's You tab. Deleting the app, or deleting your data inside it, does not cancel anything — only Apple can do that.",
        "Apple is the merchant for every purchase. Refunds are Apple's to give under their terms, and we cannot issue one on their behalf. Any unused part of a free period, if one is offered, is forfeited when you buy a subscription.",
        "If a discounted price is offered with a countdown, the countdown is real: when it runs out that price genuinely stops being available on that screen.",
      ],
    },
    {
      heading: "What it is not",
      body: [
        "GlowZen is not medical care and does not diagnose, treat or prevent any condition. The face scan gives an estimate for guidance, not a clinical assessment, and the scores are indicative rather than measurements.",
        "Practise gently and ease off anything uncomfortable. If you have a jaw, neck or skin condition, or you are recovering from a procedure, check with a professional first.",
      ],
    },
    {
      heading: "Lumi, the in-app coach",
      body: [
        "Lumi's replies are generated by an AI model. They can be wrong, and they are general guidance about the app and about facial exercise — not medical, dental or dermatological advice. Do not rely on them for a decision that needs a professional.",
      ],
    },
    {
      heading: "Results",
      body: [
        "Facial exercise affects people differently and change is gradual. We do not promise any particular result, and any timeframes in the app are general guidance rather than a commitment.",
      ],
    },
    {
      heading: "Your responsibilities",
      bullets: [
        "Use the app for your own personal, non-commercial practice.",
        "Don't copy, resell or redistribute the exercise content, videos or audio.",
        "Don't attempt to break, overload or reverse engineer the service.",
        "Only upload photos of yourself.",
        "You must be at least 13 to use GlowZen.",
      ],
    },
    {
      heading: "Your content",
      body: [
        "Your photos remain yours. You give us permission only to store and process them so the app can work — showing them back to you, and analysing your scan to produce your results. That permission ends when you delete them.",
      ],
    },
    {
      heading: "Our content",
      body: [
        `The exercises, videos, audio, artwork and software are owned by ${ENTITY} or its licensors and are protected by copyright. Your licence to use them is personal, limited and revocable.`,
      ],
    },
    {
      heading: "Your device is your account",
      body: [
        "Your plan, progress and photos are tied to the device you set up on, through an identifier held in that device's Keychain. They do not follow you to a second device, and if that identifier is lost — after a factory reset with no restore, for instance — we have no way to recover what was attached to it.",
        "A subscription is the exception, because it belongs to your Apple ID rather than to us. Sign in with the same Apple ID and use Restore Purchases, in the You tab or on any purchase screen, and your subscription comes back — even on a new phone, and even after deleting your data.",
      ],
    },
    {
      heading: "Availability",
      body: [
        "We aim to keep the service running but cannot guarantee it is always available or error free. Setup, your face scan, the exercise videos and syncing all need a connection. Features may change or be withdrawn.",
      ],
    },
    {
      heading: "Liability",
      body: [
        `To the extent the law allows, ${ENTITY} is not liable for indirect or consequential loss arising from your use of the app. Nothing here limits liability that cannot lawfully be limited, including for death or personal injury caused by negligence.`,
      ],
    },
    {
      heading: "Ending your use",
      body: [
        "You can stop at any time by deleting your data in settings and removing the app. We may suspend access if the app is being misused.",
        "If you subscribe, cancel separately in Account Settings on your device. Deleting your data erases what we hold; it does not end a subscription, and Apple will keep charging until you cancel it there.",
      ],
    },
    {
      heading: "Apple",
      body: [
        "GlowZen is distributed through the App Store. Apple is not a party to these terms, and support for the app is our responsibility rather than Apple's. These terms are between you and us.",
      ],
    },
    {
      heading: "Contact",
      body: [`Questions about these terms: ${CONTACT_EMAIL}.`],
    },
  ],
};
