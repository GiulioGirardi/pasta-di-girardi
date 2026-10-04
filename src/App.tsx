import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { WhatsAppFab } from './components/layout/WhatsAppFab';
import { Faq } from './components/sections/Faq';
import { Gallery } from './components/sections/Gallery';
import { Hero } from './components/sections/Hero';
import { Highlights } from './components/sections/Highlights';
import { MadeInHouse } from './components/sections/MadeInHouse';
import { Menu } from './components/sections/Menu';
import { PastaBuilder } from './components/sections/PastaBuilder';
import { Reservation } from './components/sections/Reservation';
import { Takeaway } from './components/sections/Takeaway';
import { Testimonials } from './components/sections/Testimonials';

export function App() {
  return (
    <>
      <a
        href="#conteudo"
        className="fixed top-3 left-3 z-50 -translate-y-24 rounded-full bg-castanho-900 px-5 py-3 font-semibold text-creme-50 transition-transform focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <Highlights />
        <Menu />
        <PastaBuilder />
        <MadeInHouse />
        <Gallery />
        <Testimonials />
        <Reservation />
        <Takeaway />
        <Faq />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
