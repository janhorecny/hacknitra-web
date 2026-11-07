import { Hero, Nav } from "@/components/Top";
import { Audience, Cta, Demo, Footer, Problem, Process, Proof, Solution } from "@/components/Sections";
import { FieldObserver } from "@/components/ui";

export default function Home() {
  return (
    <>
      <FieldObserver />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Process />
        <Audience />
        <Proof />
        <Demo />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
