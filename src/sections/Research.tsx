import { FadeInSection } from "@/components/MotionWrapper";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import data from "@/data/portfolio.json";

export function Research() {
    const { research } = data;

    return (
        <section id="research" className="py-24">
            <div className="container mx-auto px-6 max-w-4xl">
                <FadeInSection className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-xl blur-lg opacity-75" />
                    <Card className="relative bg-card/60 backdrop-blur-xl border-primary/20">
                        <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <span className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                    M.Tech Thesis
                                </span>
                            </div>
                            <CardTitle className="text-2xl md:text-3xl leading-tight">
                                {research.thesis.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                                {research.thesis.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {research.thesis.focus.map((item) => (
                                    <Badge key={item} variant="secondary" className="px-3 py-1 text-sm bg-primary/5 hover:bg-primary/10 border-primary/10">
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
