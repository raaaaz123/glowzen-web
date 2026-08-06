import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LegalPage from "@/components/LegalPage";
import SupportContact from "@/components/SupportContact";
import { support } from "@/lib/support";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Help with GlowZen: permissions, reminders, progress photos, deleting your data, and how to reach a person.",
  alternates: { canonical: "/support" },
};

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <LegalPage doc={support} lead={<SupportContact />} />
      </main>
      <Footer />
    </>
  );
}
