import { FadeInSection } from "@/components/MotionWrapper";
import { SectionHeading } from "@/components/SectionHeading";
import { BookOpen } from "lucide-react";
import data from "@/data/portfolio.json";

export function Research() {
    const { research } = data;

    return (
        <section id="research" className="py-12 md:py-16 relative">
            <div className="container mx-auto px-6 max-w-4xl">
                <FadeInSection>
                    <SectionHeading label="Research" />
                </FadeInSection>

                <FadeInSection delay={0.1}>
                    <div className="outline-box-hover p-6 md:p-8">
                        <div className="flex items-center gap-2 mb-3 text-muted-foreground">
                            <BookOpen className="w-4 h-4 text-primary" />
                            <span className="text-xs font-semibold tracking-widest uppercase">
                                M.Tech Thesis
                            </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-display font-bold mb-4 text-primary leading-tight">
                            {research.thesis.title}
                        </h3>
                        <p className="text-base text-muted-foreground mb-4 leading-relaxed text-justify">
                            {research.thesis.description}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {research.thesis.focus.join(", ")}
                        </p>
                    </div>
                </FadeInSection>
            </div>
        </section>
    );
}
