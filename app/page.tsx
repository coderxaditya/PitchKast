import { About } from "@/components/steep/about/About";
import { CaseStudies } from "@/components/steep/case-studies/CaseStudies";
import { Faq } from "@/components/steep/faq/Faq";
import { Gallery } from "@/components/steep/gallery/Gallery";
import { Hero } from "@/components/steep/hero/Hero";
import { Partners } from "@/components/steep/partners/Partners";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { Services } from "@/components/steep/services/Services";
import { Team } from "@/components/steep/team/Team";
import { Navbar } from "@/components/steep/Navbar";

/**
 * The home page, mid-rebuild.
 *
 * This branch replaces the site section by section on the Steep system, and
 * the header, the landing block, the client strip, the case studies,
 * services, about, team, gallery and the FAQ have been rebuilt so far. The
 * footer is still in `components/` untouched and not mounted: it is written
 * against the previous design system's tokens, which no longer exist, so
 * rendering it here would show a band in a palette that has been deleted.
 *
 * It goes back into this file once it is rebuilt.
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
        <CaseStudies />
        <Services />
        <About />
        <Team />
        <Gallery />
        <Faq />
      </main>
    </>
  );
}
