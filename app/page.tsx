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

export default function Home() {
  return (
    <>
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
