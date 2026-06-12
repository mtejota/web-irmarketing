import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Manifesto from "@/components/Manifesto";
import Bento from "@/components/Bento";
import Services from "@/components/Services";
import Cases from "@/components/Cases";
import { Processo, FinalCTA, Footer, WhatsAppFab } from "@/components/Sections";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Marquee />
      <Manifesto />
      <Bento />
      <Services />
      <Cases />
      <Processo />
      <FinalCTA />
      <Footer />
      <WhatsAppFab />
    </main>
  );
}
