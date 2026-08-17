import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LegalPage from "@/components/LegalPage";
import PrivacyPromises from "@/components/Privacy";
import { privacy } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What GlowZen collects, why, who receives it, and how to delete it. No account, no email, no password.",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <LegalPage doc={privacy} />

        {/* Moved off the home page in the lean redesign. The four promises are
            the policy in plain language, so they land after the formal text
            rather than before it — a reader who came for the legal document
            gets the legal document first, and the summary is what they leave
            with. `showPolicyLink` is off: the full policy is this page. */}
        <PrivacyPromises showPolicyLink={false} />
      </main>
      <Footer />
    </>
  );
}
