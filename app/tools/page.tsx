import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Lock, WifiOff } from "lucide-react";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AppCta from "@/components/AppCta";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { tools, type Tool } from "@/lib/content/tools";
import { SITE_URL } from "@/lib/site";

const TITLE = "Free face yoga tools";
const DESCRIPTION =
  "Six free face yoga tools: a routine builder, a session timer, a streak tracker, a goal quiz, a progress photo comparer, and an AI plan builder. No account, and five of the six never send anything anywhere.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/tools",
    type: "website",
  },
};

const facts = [
  { icon: Lock, label: "No photo ever uploaded" },
  { icon: WifiOff, label: "No account" },
];

function ToolGrid({
  heading,
  note,
  items,
  className,
}: {
  heading: string;
  note: string;
  items: Tool[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className={className}>
      <h2 className="text-xs font-extrabold tracking-[0.12em] text-ink-muted uppercase">
        {heading}
      </h2>
      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
        {note}
      </p>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {items.map((tool) => (
          <li key={tool.slug} className="flex">
            <Link
              href={`/tools/${tool.slug}`}
              className="group flex w-full rounded-2xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <Card className="w-full transition-all group-hover:-translate-y-1 group-hover:border-rose/30 group-hover:shadow-[var(--shadow-card)]">
                <CardHeader className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-[17px] group-hover:text-rose-deep">
                      {tool.name}
                    </CardTitle>
                    <ArrowUpRight
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rose-deep"
                    />
                  </div>
                  <CardDescription>{tool.summary}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Page() {
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: TITLE,
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.title,
      url: `${SITE_URL}/tools/${tool.slug}`,
    })),
  }).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: json }}
      />
      <Nav />
      <main>
        <div className="px-5 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <Breadcrumbs trail={[{ name: "Tools", href: "/tools" }]} />

            <header className="mt-6">
              <h1 className="font-display max-w-3xl text-[2.125rem] leading-[1.08] font-bold text-balance sm:text-[3rem]">
                {TITLE}
              </h1>
              <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-soft">
                Six small tools for practising facial exercise: build a routine,
                time a hold, keep a streak, work out where to start, and put two
                progress photos side by side. None of them needs an account, and
                no photograph you load ever leaves your device. Only the last
                one — which reads a sentence you type — sends anything to a
                server at all, and it says so on its own page.
              </p>

              <ul className="mt-6 flex flex-wrap items-center gap-2">
                {facts.map((fact) => (
                  <li key={fact.label}>
                    <Badge
                      variant="outline"
                      className="gap-1.5 px-3 py-1.5 text-[13px]"
                    >
                      <fact.icon aria-hidden />
                      {fact.label}
                    </Badge>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button asChild variant="brand" size="lg">
                  <Link href="/tools/face-yoga-quiz">
                    Not sure where to start?
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/guide">Read the guide first</Link>
                </Button>
              </div>
            </header>

            <Separator className="my-10" />

            {/* Grouped by where the work happens, not by subject. It is the
                distinction a reader actually cares about, and burying the one
                server-backed tool among the others would be the quiet kind of
                dishonesty this site is written to avoid. */}
            <ToolGrid
              heading="Runs entirely in your browser"
              note="Nothing you pick, load or record is sent anywhere. No account, no server."
              items={tools.filter((tool) => !tool.ai)}
            />

            <ToolGrid
              heading="Uses a language model"
              note="Reads a sentence you type, on a server. No photograph is involved, and GlowZen keeps no copy of it."
              items={tools.filter((tool) => tool.ai)}
              className="mt-10"
            />

            <AppCta
              variant="panel"
              headline="Six browser tabs, or one app that does the lot"
              body="A builder here, a timer there, a calendar somewhere else — it works, right up until the evening you cannot be bothered to open three tabs. GlowZen is the same jobs in one place, with the movement playing on screen while it counts the hold for you."
            />

            <p className="mt-10 border-t border-border pt-7 text-sm leading-relaxed text-ink-muted">
              GlowZen is a general wellbeing and fitness app for facial
              exercise. Nothing here is medical advice, and it does not
              diagnose, treat or prevent any condition. These tools are for
              guidance and are not an assessment of anything.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
