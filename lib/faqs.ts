/**
 * The FAQ, shared by the on-page section, the FAQPage structured data and
 * llms.txt.
 *
 * It lives here rather than in the component because Google requires the
 * marked-up answer to match the visible one exactly. One list means they
 * cannot disagree.
 */

export type Faq = {
  q: string;
  a: string;
};

export const faqs: Faq[] = [
  {
    q: "Does facial exercise actually work?",
    a: "Facial exercise affects people differently and change is gradual. GlowZen is a general wellbeing and fitness app — it doesn't promise a particular result, and any timeframes in the app are guidance rather than a commitment.",
  },
  {
    q: "How long does a session take?",
    a: "Around eight minutes. Sessions are built from your available time, so a shorter commitment gives you a shorter routine rather than a rushed one.",
  },
  {
    q: "Do I need any equipment?",
    a: "No. Every exercise uses only your hands and your face, so you can practise anywhere with no products, tools or procedures.",
  },
  {
    q: "What happens to my face scan?",
    a: "It is analysed once to estimate the zone scores you see after setup, then stored in private encrypted storage. It is never used to train a model and never shown to another user.",
  },
  {
    q: "Is it safe?",
    a: "Practise gently and ease off anything uncomfortable. If you have a jaw, neck or skin condition, or you are recovering from a procedure, check with a professional first. GlowZen is not medical care and does not diagnose or treat any condition.",
  },
  {
    q: "Can I delete everything?",
    a: "Yes. Delete my data in settings removes your plan, history and every photo from the device and from our storage. It's immediate and can't be undone.",
  },
];
