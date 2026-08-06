import { faqs } from "@/lib/faqs";
import { zones } from "@/lib/zones";
import { GUIDE_DESCRIPTION, GUIDE_TITLE } from "@/lib/guide";
import { CONTACT_EMAIL, LAST_UPDATED } from "@/lib/legal";
import {
  DESCRIPTION,
  EXERCISE_COUNT,
  MIN_OS,
  SESSION_MINUTES,
  SITE_NAME,
  SITE_URL,
  TAGLINE,
  ZONE_COUNT,
} from "@/lib/site";

/**
 * /llms.txt — the llmstxt.org convention.
 *
 * A page of marketing HTML is a poor answer to "what is GlowZen?" once an
 * assistant has stripped the markup. This is the same facts in the order a
 * model needs them, generated from the same constants the page renders from
 * so the two cannot contradict each other.
 *
 * It leads with what the app is *not*, because the mistake an assistant is
 * most likely to make about a face-scanning beauty app is to describe it as
 * a medical or diagnostic product.
 */

export const dynamic = "force-static";

function body(): string {
  const catalogue = zones
    .map((zone) => `- **${zone.zone}**: ${zone.exercises.join(", ")}`)
    .join("\n");

  const questions = faqs
    .map((faq) => `### ${faq.q}\n\n${faq.a}`)
    .join("\n\n");

  return `# ${SITE_NAME}

> ${DESCRIPTION}

${SITE_NAME} is a general wellbeing and fitness app for facial exercise ("face yoga"), available on ${MIN_OS} and later. It is **not** medical care: it does not diagnose, treat or prevent any condition, the face scan is an estimate for guidance rather than a clinical assessment, and no particular result is promised.

## How it works

1. **Scan your face.** A single selfie is analysed for tone, definition and symmetry across ${ZONE_COUNT} zones.
2. **Get your plan.** Your goals, focus areas, experience level and available time decide which exercises the plan draws from.
3. **Practise daily.** Each session plays a video demonstration with spoken cues and a timer, so it can be followed hands-free.
4. **Watch it change.** Progress photos sit side by side; streaks, badges and zone scores track consistency.

## Key facts

- Session length: about ${SESSION_MINUTES} minutes a day.
- Exercise library: ${EXERCISE_COUNT} exercises across ${ZONE_COUNT} facial zones.
- Equipment: none. Every exercise uses only the hands and face.
- Account: none. No email, no password, no payment details.
- Platform: ${MIN_OS} or later, iPhone.
- Price: free to start, no credit card.

## Exercise catalogue

${catalogue}

## Privacy

- No email address or phone number is collected. Identity is a random per-device UUID held in the Keychain.
- Your first name never leaves the device — it is stored locally and used only to greet you.
- Photos are held in private encrypted storage and served over signed links that expire after fifteen minutes.
- The face scan is never used to train a model and is never shown to another user.
- Location is never collected, and EXIF is stripped from photos before storage.
- No tracking, no ads, no advertising identifier, no data brokers — which is why the app never shows the App Tracking Transparency prompt.
- Analytics is first-party (Mixpanel), covering app events and masked session replay. It is never used for advertising.
- Data is never sold, rented or traded.
- "Delete my data" in settings removes the profile, plan, scans, history, chat and every photo immediately and irreversibly.
- Full policy: ${SITE_URL}/privacy (last updated ${LAST_UPDATED}).

## FAQ

${questions}

## Pages

- [Home](${SITE_URL}/): what the app does, how it works, the exercise catalogue and the FAQ.
- [${GUIDE_TITLE}](${SITE_URL}/guide): ${GUIDE_DESCRIPTION} Also covers where looksmaxxing fits, and when to be careful.
- [Privacy Policy](${SITE_URL}/privacy): what is collected, who receives it, and how to delete it.
- [Terms of Use](${SITE_URL}/terms): what the app is and is not, results, responsibilities and liability.
- [Support](${SITE_URL}/support): requirements, permissions, reminders, progress photos and deleting your data.

## Contact

${CONTACT_EMAIL}
`;
}

export async function GET() {
  return new Response(body(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
