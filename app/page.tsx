import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import AppTour from "@/components/AppTour";
import Areas from "@/components/Areas";
import Reviews from "@/components/Reviews";
import Privacy from "@/components/Privacy";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <AppTour />
        <Areas />
        <Reviews />
        <Privacy />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
