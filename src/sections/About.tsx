import { FadeInSection } from "@/components/MotionWrapper";
import data from "@/data/portfolio.json";

export function About() {
    const { about } = data;

    return (
        <section id="about" className="py-28 relative">
            <div className="container mx-auto px-6 max-w-4xl">
                <FadeInSection>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-display font-bold mb-3 text-foreground">
                            About Me
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
                    </div>

                    <div className="glass rounded-2xl p-8 md:p-10 glow-border transition-all duration-500">
                        <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed text-justify">
                            {about.content.map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </FadeInSection>
            </div>
        </section>
    );
}
