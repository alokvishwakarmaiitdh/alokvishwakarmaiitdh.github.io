import { FadeInSection } from "@/components/MotionWrapper";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import data from "@/data/portfolio.json";

export function Research() {
    const { research } = data;

    return (
        <section id="research" className="py-28 relative">
            <div className="container mx-auto px-6 max-w-4xl">
                <FadeInSection>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-display font-bold mb-3 text-foreground">Research</h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
                    </div>
                </FadeInSection>

                <FadeInSection className="relative" delay={0.1}>
                    {/* Glow behind card */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/15 to-secondary/15 rounded-2xl blur-2xl opacity-60" />

                    <Card className="relative glass glow-border rounded-2xl overflow-hidden">
                        <CardHeader>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2.5 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-xl text-primary">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                                    M.Tech Thesis
                                </span>
                            </div>
                            <CardTitle className="text-xl md:text-2xl font-display leading-tight text-gradient">
                                {research.thesis.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                                {research.thesis.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {research.thesis.focus.map((item) => (
                                    <Badge key={item} className="px-3 py-1.5 text-sm bg-primary/10 text-primary border-primary/15 hover:bg-primary/15 font-medium">
                                        {item}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </FadeInSection>
            </div>
        </section>
    );
}
