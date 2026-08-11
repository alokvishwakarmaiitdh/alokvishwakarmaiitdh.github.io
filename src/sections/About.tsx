import { FadeInSection } from "@/components/MotionWrapper";
import { SectionHeading } from "@/components/SectionHeading";
import data from "@/data/portfolio.json";

export function About() {
    const { about } = data;

    return (
        <section id="about" className="py-12 md:py-16 relative">
            <div className="container mx-auto px-6 max-w-4xl">
                <FadeInSection>
                    <SectionHeading label="About-me" />

                    <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed text-justify">
                        {about.content.map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        ))}
                    </div>

                    <div className="outline-box p-5 mt-8 space-y-2 text-sm">
                        <p>
                            <span className="text-primary">role:</span>{" "}
                            <span className="text-muted-foreground">{data.experience[0].role} @ {data.experience[0].company}</span>
                        </p>
                        <p>
                            <span className="text-primary">education:</span>{" "}
                            <span className="text-muted-foreground">M.Tech, IIT Dharwad</span>
                        </p>
                        <p>
                            <span className="text-primary">focus:</span>{" "}
                            <span className="text-muted-foreground">Agentic LLM workflows, RAG pipelines, Computer Vision</span>
                        </p>
                    </div>
                </FadeInSection>
            </div>
        </section>
    );
}
