import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

/**
 * The lean home page: hero, three cards, proof, FAQ, CTA.
 *
 * HowItWorks, Compare, AppTour, Areas and Privacy used to sit between these.
 * They were not deleted — HowItWorks and Privacy moved to /guide and /privacy
 * respectively, and Compare and Areas were dropped here because /compare and
 * /face-yoga are those sections, in full, and Nav and Footer both already link
 * them. The page they left behind is the one this redesign is after: a hero
 * that owns the screen, then three reasons, then the ask.
 *
 * Faq stayed against that instinct, and deliberately. JsonLd emits FAQPage
 * structured data for this URL, and that markup is only eligible while the
 * questions are visible on the page it describes — moving the section without
 * moving the schema would turn a rich result into a manual action.
 */
export default function Home() {
  return (
    <>
      <JsonLd />
      <Nav />
      <main>
        <Hero />
        <Features />
        <Reviews />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
