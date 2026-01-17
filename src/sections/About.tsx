import { FadeInSection } from "@/components/MotionWrapper";
import data from "@/data/portfolio.json";

export function About() {
    const { about } = data;

    return (
        <section id="about" className="py-24 bg-card/20">
            <div className="container mx-auto px-6 max-w-4xl">
                <FadeInSection>
                    <h2 className="text-3xl font-bold mb-8 text-center text-foreground">About Me</h2>

                    <div className="space-y-6 text-lg text-muted-foreground leading-relaxed text-justify">
                        {about.content.map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        ))}
                    </div>
                </FadeInSection>
            </div>
        </section>
    );
}
