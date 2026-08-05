import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LegalPage from "@/components/LegalPage";
import { terms } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that cover your use of the GlowZen app.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <LegalPage doc={terms} />
      </main>
      <Footer />
    </>
  );
}
