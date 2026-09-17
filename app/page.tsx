import { About } from "@/components/steep/about/About";
import { CaseStudies } from "@/components/steep/case-studies/CaseStudies";
import { Faq } from "@/components/steep/faq/Faq";
import Footer from "@/components/steep/footer/Footer";
import { Gallery } from "@/components/steep/gallery/Gallery";
import { Hero } from "@/components/steep/hero/Hero";
import { Partners } from "@/components/steep/partners/Partners";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { Services } from "@/components/steep/services/Services";
import { Team } from "@/components/steep/team/Team";
import { Testimonials } from "@/components/steep/testimonials/Testimonials";
import { Navbar } from "@/components/steep/Navbar";

/**
 * The home page.
 *
 * Every section in reading order, all in normal document flow, rebuilt on the
 * Steep system (`design/DESIGN.md`) with steep.app as the reference.
 */
export default function Home() {
  return (
    <>
      {/* The FAQ structured data, describing only the six questions the FAQ
          section shows. It went missing when this page was rebuilt and comes
          back with the section it describes. */}
      <FaqJsonLd />
      <Navbar />
      <main>
        <Hero />
        <Partners />
        <Services />
        <CaseStudies />
        <Testimonials />
        <About />
        <Team />
        <Gallery />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
