import { Sidebar } from "@/components/Sidebar";
import { About } from "@/sections/About";
import { Experience } from "@/sections/Experience";
import { Projects } from "@/sections/Projects";
import { Research } from "@/sections/Research";
import { Skills } from "@/sections/Skills";
import { Contact } from "@/sections/Contact";

function App() {
  return (
    <div className="min-h-screen text-foreground">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="mx-auto max-w-screen-xl px-6 md:px-12 lg:px-24">
        <div className="lg:flex lg:justify-between lg:gap-12">
          <Sidebar />
          <main id="content" className="pt-8 lg:w-[52%] lg:py-24">
            <About />
            <Experience />
            <Projects />
            <Research />
            <Skills />
            <Contact />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
