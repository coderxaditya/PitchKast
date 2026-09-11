import { About } from "@/components/about/About";
import { CaseStudies } from "@/components/case-studies/CaseStudies";
import Footer from "@/components/footer/Footer";
import { Faq } from "@/components/faq/Faq";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { Gallery } from "@/components/gallery/Gallery";
import { Hero } from "@/components/hero/Hero";
import { Services } from "@/components/services/Services";
import { Team } from "@/components/team/Team";
import { Partners } from "@/components/partners/Partners";
import { Navbar } from "@/components/site/Navbar";

/**
 * The home page.
 *
 * Sections in reading order, all in normal document flow. The FAQ structured
 * data describes the six questions that section renders, and nothing else.
 */
export default function Home() {
  return (
    <>
      <FaqJsonLd />
      <Navbar />
      <main>
        <Hero />
        <Partners />
        <CaseStudies />
        <Services />
        <About />
        <Team />
        <Gallery />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
