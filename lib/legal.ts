/**
 * The legal documents, mirrored from
 * GlowFace/Views/Profile/LegalDocuments.swift.
 *
 * App Store Connect requires a *hosted* privacy policy URL, which the in-app
 * copies cannot satisfy — that is why these exist. The wording is deliberately
 * identical to the app's: two versions that drift apart are worse than one.
 * If you edit the Swift file, edit this too.
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

export const LAST_UPDATED = "29 July 2026";
export const ENTITY = "GlowZen";
export const CONTACT_EMAIL = "support@dietly.life";

export const privacy: LegalDocument = {
  slug: "privacy",
  title: "Privacy Policy",
  updated: LAST_UPDATED,
  intro:
    "GlowZen is built to need as little about you as possible. There is no account, no email and no password. This policy explains exactly what is collected, why, and how to remove it.",
  sections: [
    {
      heading: "Who we are",
      body: [
        `${ENTITY} provides the GlowZen app. If you have a question about this policy, write to ${CONTACT_EMAIL} and a person will reply.`,
      ],
    },
    {
      heading: "What we collect",
      body: [
        "Only what the app needs to build your programme and show your progress:",
      ],
      bullets: [
        "A random identifier created on your device the first time you open the app. It is not your name, your email or your Apple ID, and it cannot identify you outside GlowZen.",
        "Your answers to the setup questions: age range, gender if you choose to give one, goals, the areas you want to focus on, your experience level and how long you want to practise.",
        "Photos you take — the initial face scan and any progress photos you add later.",
        "Which sessions you finished and when, so streaks, badges and charts work.",
        "Basic technical details: app version and platform.",
      ],
    },
    {
      heading: "What we never collect",
      bullets: [
        "Your name, email address or phone number.",
        "Your location. Location tags are stripped from photos before they are stored.",
        "Payment details. The app does not take payments.",
        "Your contacts, calendar, microphone or health records.",
      ],
    },
    {
      heading: "How your photos are handled",
      body: [
        "Photos are the most sensitive thing the app touches, so they get the strictest treatment.",
        "They are stored in private encrypted storage that is not publicly readable. When the app shows you a photo it requests a temporary link that works for a few minutes and then stops working. Nobody can browse your photos, and a link that leaked would be useless shortly afterwards.",
        "Your face scan is analysed to estimate the scores you see after setup. It is not used to train any model, and it is never shown to another user.",
      ],
    },
    {
      heading: "Who else receives data",
      body: [
        "We use a small number of infrastructure providers, each only for the job named:",
      ],
      bullets: [
        "Google Firebase — stores your profile, plan and session history, and delivers notifications.",
        "Google Crashlytics — records crash diagnostics so faults can be fixed.",
        "Cloudflare R2 — stores your photos and the app's exercise videos.",
        "Amazon Web Services — generates the spoken coaching and analyses your face scan.",
      ],
    },
    {
      heading: "We do not sell your data",
      body: [
        "We do not sell, rent or trade your information. We do not use your photos for advertising, and we do not share them with anyone outside the providers above.",
      ],
    },
    {
      heading: "How long it is kept",
      body: [
        "Your data stays until you remove it. Delete a single photo from the progress tab, or use Delete my data in settings to remove your plan, history and every photo from your device and from our storage. Deletion is immediate and cannot be undone.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        `Depending on where you live you may have the right to access, correct, export or delete your data, and to object to how it is used. Because there is no account, the fastest route is Delete my data in the app. For anything else, write to ${CONTACT_EMAIL}.`,
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
      heading: "Availability",
      body: [
        "We aim to keep the service running but cannot guarantee it is always available or error free. Features may change or be withdrawn.",
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
      ],
    },
    {
      heading: "Contact",
      body: [`Questions about these terms: ${CONTACT_EMAIL}.`],
    },
  ],
};
