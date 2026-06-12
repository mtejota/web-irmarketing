import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Cases from "@/components/Cases";
import { Stats, Processo, FinalCTA, Footer, WhatsAppFab } from "@/components/Sections";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Stats />
      <Cases />
      <Processo />
      <FinalCTA />
      <Footer />
      <WhatsAppFab />
    </main>
  );
}
