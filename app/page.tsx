import { About } from "@/components/about/About";
import { Partners } from "@/components/partners/Partners";
import { Services } from "@/components/services/Services";
import { Stage } from "@/components/stage/Stage";
import { Team } from "@/components/team/Team";

export default function Home() {
  return (
    <>
      <Stage />
      <Partners />
      <About />
      <Services />
      <Team />
    </>
  );
}
