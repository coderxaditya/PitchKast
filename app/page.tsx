import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { About } from "@/components/about/About";
import { CaseStudies } from "@/components/case-studies/CaseStudies";
import { Gallery } from "@/components/gallery/Gallery";
import { Partners } from "@/components/partners/Partners";
import { Services } from "@/components/services/Services";
import { Stage } from "@/components/stage/Stage";
import { Team } from "@/components/team/Team";
import { Faq } from "@/components/faq/Faq";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      {/* Homepage only. The root layout carries the Organization and WebSite
          graph for every route; this one describes what *this* page answers,
          so it does not belong on /gallery or /privacy. */}
      <FaqJsonLd />
      <Stage />
      <Partners />
      <About />
      <CaseStudies />
      <Services />
      <Team />
      <Gallery />
      <Faq />
      <Footer />
    </>
  );
}
