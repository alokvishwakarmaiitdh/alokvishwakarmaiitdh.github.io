import { FadeInSection } from "@/components/MotionWrapper";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Boxes } from "lucide-react";
import data from "@/data/portfolio.json";

export function Contact() {
    const { contact } = data;

    return (
        <section id="contact" className="py-28 relative">
            {/* Background accent */}
            <div className="absolute bottom-[20%] right-[-5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-4xl">
                <FadeInSection className="relative">
                    {/* Glow behind card */}
                    <div className="absolute -inset-2 bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 rounded-[2rem] blur-2xl opacity-60" />

                    <div className="relative glass rounded-3xl p-8 md:p-14 text-center glow-border">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
                            Ready to <span className="text-gradient">Collaborate</span>?
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6" />
                        <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                            I'm always open to discussing new AI projects, research collaborations, or engineering challenges.
                        </p>

                        <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
                            <Button
                                size="lg"
                                className="w-full md:w-auto text-base px-8 py-6 bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 rounded-full font-medium"
                                asChild
                            >
                                <a
                                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}&su=${encodeURIComponent("Collaboration Inquiry")}&body=${encodeURIComponent("Hi Alok,\n\nI would like to discuss a potential collaboration.\n\nBest regards,")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Send an email to Alok regarding collaboration (opens in Gmail)"
                                >
                                    <Mail className="mr-2 h-5 w-5" />
                                    Send Message
                                </a>
                            </Button>

                            <div className="flex gap-3 justify-center">
                                {[
                                    { href: contact.github, icon: Github, label: "GitHub" },
                                    { href: contact.linkedin, icon: Linkedin, label: "LinkedIn" },
                                    { href: contact.huggingface, icon: Boxes, label: "Hugging Face" },
                                ].map(({ href, icon: Icon, label }) => (
                                    <Button
                                        key={label}
                                        variant="outline"
                                        size="icon"
                                        className="h-12 w-12 rounded-full border-white/10 bg-white/[0.03] hover:bg-primary/10 hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300"
                                        asChild
                                    >
                                        <a href={href} target="_blank" rel="noopener noreferrer">
                                            <Icon className="h-5 w-5" />
                                            <span className="sr-only">{label}</span>
                                        </a>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-20 text-xs text-muted-foreground/50">
                            <p>© {new Date().getFullYear()} {data.hero.name}. Built with React & Vite.</p>
                        </div>
                    </div>
                </FadeInSection>
            </div>
        </section>
    );
}
