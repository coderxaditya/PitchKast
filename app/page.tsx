import { CaseStudies } from "@/components/steep/case-studies/CaseStudies";
import { Hero } from "@/components/steep/hero/Hero";
import { Partners } from "@/components/steep/partners/Partners";
import { Navbar } from "@/components/steep/Navbar";

/**
 * The home page, mid-rebuild.
 *
 * This branch replaces the site section by section on the Steep system, and
 * the header, the landing block, the client strip and the case studies have
 * been rebuilt so far. The rest of the page — services, about, team, gallery,
 * FAQ, footer — is still in `components/` untouched and not mounted: those
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
      </main>
    </>
  );
}
