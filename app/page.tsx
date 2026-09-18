import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { About } from "@/components/monad/about/About";
import { Announcement } from "@/components/monad/Announcement";
import { ClientCircle } from "@/components/monad/ClientCircle";
import { CaseStudies } from "@/components/monad/case-studies/CaseStudies";
import { Closing } from "@/components/monad/Closing";
import { Faq } from "@/components/monad/faq/Faq";
import { Footer } from "@/components/monad/footer/Footer";
import { Gallery } from "@/components/monad/gallery/Gallery";
import { Interactions } from "@/components/monad/Interactions";
import { Hero } from "@/components/monad/hero/Hero";
import { LogoStrip } from "@/components/monad/LogoStrip";
import { Navbar } from "@/components/monad/Navbar";
import { Reach } from "@/components/monad/reach/Reach";
import { Services } from "@/components/monad/services/Services";
import { Team } from "@/components/monad/team/Team";
import { Testimonials } from "@/components/monad/testimonials/Testimonials";

/**
 * The home page, rebuilt on the Monad system (`newLanding/DESIGN.md`) with
 * monad.com as the reference. Every section in reading order, in the order
 * the navbar lists them.
 */
export default function Home() {
  return (
    <>
      <FaqJsonLd />
      <Announcement />
      <Navbar />
      <main>
        <Hero />
        <LogoStrip />
        <Services />
        <Reach />
        <ClientCircle />
        <CaseStudies />
        <Testimonials />
        <About />
        <Team />
        <Gallery />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <Interactions />
    </>
  );
}
