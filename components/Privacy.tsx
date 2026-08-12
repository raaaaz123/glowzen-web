import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

import SectionHeading from "./SectionHeading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const promises = [
  {
    title: "No account, ever",
    body: "No email, no password, no sign-in screen. Your device generates a random identifier and that is the whole of your identity.",
  },
  {
    title: "Photos stay private",
    body: "Progress photos live in private encrypted storage. The app fetches them through links that expire after minutes, so nothing is publicly browsable.",
  },
  {
    title: "Nothing is sold",
    body: "We don't sell, rent or trade your data, and your photos are never used for advertising or to train a model.",
  },
  {
    title: "Delete it in one tap",
    body: "Delete my data removes your plan, history and every photo — from the device and from our storage — immediately.",
  },
];

export default function Privacy() {
  return (
    <section className="px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[var(--radius-hero)] border border-border bg-white/70 p-6 backdrop-blur-sm sm:p-12">
          <SectionHeading
            eyebrow="Your face, your data"
            title="Built to know as little about you as possible"
            lead="You should not have to trade your face for a routine. No account, no email, nothing sold — and one button that deletes the lot."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {promises.map((promise) => (
              <Card key={promise.title} className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2.5 text-[17px]">
                    <span
                      aria-hidden
                      className="gradient-rose inline-flex size-6 shrink-0 items-center justify-center rounded-full text-white"
                    >
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    {promise.title}
                  </CardTitle>
                  <CardDescription className="pl-[2.15rem]">
                    {promise.body}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Button asChild variant="link" className="mt-8 px-0">
            <Link href="/privacy">
              Read the full privacy policy
              <ArrowUpRight aria-hidden className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
