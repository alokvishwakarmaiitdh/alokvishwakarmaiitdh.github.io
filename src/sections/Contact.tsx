import { FadeInSection } from "@/components/MotionWrapper";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Boxes } from "lucide-react";
import data from "@/data/portfolio.json";

export function Contact() {
    const { contact } = data;

    return (
        <section id="contact" className="py-24">
            <div className="container mx-auto px-6 max-w-4xl">
                <FadeInSection className="bg-gradient-to-br from-secondary/10 to-primary/5 border border-primary/20 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Collaborate?</h2>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        I'm always open to discussing new AI projects, research collaborations, or engineering challenges.
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                        <Button size="lg" className="w-full md:w-auto text-lg px-8 py-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300" asChild>
                            <a
                                href={`mailto:${contact.email}?subject=${encodeURIComponent("Collaboration Inquiry")}&body=${encodeURIComponent("Hi Alok,\n\nI would like to discuss a potential collaboration.\n\nBest regards,")}`}
                                aria-label="Send an email to Alok regarding collaboration"
                            >
                                <Mail className="mr-2 h-5 w-5" />
                                Send Message
                            </a>
                        </Button>

                        <div className="flex gap-4 justify-center">
                            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full hover:border-primary/50 transition-colors" asChild>
                                <a href={contact.github} target="_blank" rel="noopener noreferrer">
                                    <Github className="h-6 w-6" />
                                </a>
                            </Button>
                            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full hover:border-primary/50 transition-colors" asChild>
                                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                                    <Linkedin className="h-6 w-6" />
                                </a>
                            </Button>
                            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full hover:border-primary/50 transition-colors" asChild>
                                <a href={contact.huggingface} target="_blank" rel="noopener noreferrer">
                                    <Boxes className="h-6 w-6" />
                                    <span className="sr-only">Hugging Face</span>
                                </a>
                            </Button>
                        </div>
                    </div>

                    <div className="mt-24 text-sm text-muted-foreground">
                        <p>© {new Date().getFullYear()} {data.hero.name}. Built with React & Vite.</p>
                    </div>
                </FadeInSection>
            </div>
        </section>
    );
}
