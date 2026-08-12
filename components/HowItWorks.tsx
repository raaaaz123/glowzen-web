import SectionHeading from "./SectionHeading";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/* Each step answers "what does this do for me", not "what does the app have".
   The mechanism is still named — it has to be, the structured data restates it
   — but it arrives after the reason to care. */
const steps = [
  {
    step: "01",
    title: "Stop guessing what your face needs",
    body: "One selfie, and you know which areas are actually worth your time — no more copying a routine built for someone else's face off the internet.",
  },
  {
    step: "02",
    title: "Get a routine that fits your life",
    body: "Tell us how much time you really have, not how much you wish you had. The plan is built to survive a bad week, because that is the week most people quit.",
  },
  {
    step: "03",
    title: "Never wonder if you are doing it right",
    body: "A video plays, a voice counts you through the hold. Hands stay on your face, eyes can close, and you stop second-guessing your form in the mirror.",
  },
  {
    step: "04",
    title: "See it, instead of hoping",
    body: "Eight weeks is a long time to go on a feeling. Your photos sit side by side, so you can look rather than wonder whether anything is happening at all.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-24 px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              From &ldquo;I should do something&rdquo; to actually doing it
            </>
          }
          lead="Most people give up because nobody told them what to do, or for how long. That is the part we take off your hands."
        />

        <ol className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => (
            <li key={item.step} className="flex">
              <Card className="w-full">
                <CardHeader>
                  <span
                    aria-hidden
                    className="gradient-rose mb-2 inline-flex size-10 items-center justify-center rounded-xl text-[13px] font-extrabold text-white"
                  >
                    {item.step}
                  </span>
                  <CardTitle className="text-[17px]">{item.title}</CardTitle>
                  <CardDescription>{item.body}</CardDescription>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
