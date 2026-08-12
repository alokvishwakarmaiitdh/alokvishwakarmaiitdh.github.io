import { Navbar } from "@/components/Navbar";
import { NeuralBackground } from "@/components/NeuralBackground";
import { SocialRail } from "@/components/SocialRail";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Experience } from "@/sections/Experience";
import { Projects } from "@/sections/Projects";
import { Research } from "@/sections/Research";
import { Skills } from "@/sections/Skills";
import { Contact } from "@/sections/Contact";

function App() {
  return (
    <div className="min-h-screen text-foreground">
      <NeuralBackground />
      <SocialRail />
      <Navbar />
      <main className="lg:pl-20">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Research />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

export default App;
