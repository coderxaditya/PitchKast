import { About } from "@/components/steep/about/About";
import { CaseStudies } from "@/components/steep/case-studies/CaseStudies";
import { Hero } from "@/components/steep/hero/Hero";
import { Partners } from "@/components/steep/partners/Partners";
import { Services } from "@/components/steep/services/Services";
import { Navbar } from "@/components/steep/Navbar";

/**
 * The home page, mid-rebuild.
 *
 * This branch replaces the site section by section on the Steep system, and
 * the header, the landing block, the client strip, the case studies,
 * services and about have been rebuilt so far. The rest of the page — team,
 * gallery, FAQ, footer — is still in `components/` untouched and not mounted:
 * those
 * sections are written against the previous design system's tokens, which no
 * longer exist, so rendering them here would show half a page in a palette
 * that has been deleted.
 *
 * Each one goes back into this file as it is rebuilt.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Partners />
        <CaseStudies />
        <Services />
        <About />
      </main>
    </>
  );
}
