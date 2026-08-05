import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LegalPage from "@/components/LegalPage";
import { privacy } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What GlowZen collects, why, who receives it, and how to delete it. No account, no email, no password.",
};

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <LegalPage doc={privacy} />
      </main>
      <Footer />
    </>
  );
}
