import { FadeInSection } from "@/components/MotionWrapper";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Mail, Boxes } from "lucide-react";
import data from "@/data/portfolio.json";

export function Contact() {
    const { contact, hero } = data;

    const socials = [
        { href: contact.github, icon: Github, label: "GitHub" },
        { href: contact.linkedin, icon: Linkedin, label: "LinkedIn" },
        { href: contact.huggingface, icon: Boxes, label: "Hugging Face" },
    ];

    const mailtoHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}&su=${encodeURIComponent("Collaboration Inquiry")}&body=${encodeURIComponent("Hi Alok,\n\nI would like to discuss a potential collaboration.\n\nBest regards,")}`;

    return (
        <section id="contact" className="py-12 md:py-16 relative">
            <div className="container mx-auto px-6 max-w-5xl">
                <FadeInSection>
                    <SectionHeading label="Contacts" />

                    <div className="grid md:grid-cols-2 gap-10 items-start">
                        <div>
                            <p className="text-base text-muted-foreground mb-8 leading-relaxed max-w-[45ch]">
                                I'm always open to discussing new AI projects, research collaborations, or engineering challenges.
                            </p>
                            <Button variant="terminal" size="lg" className="px-8" asChild>
                                <a
                                    href={mailtoHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Send an email to Alok regarding collaboration (opens in Gmail)"
                                >
                                    <Mail className="mr-2 h-4 w-4" />
                                    Send Message
                                </a>
                            </Button>
                        </div>

                        <div className="outline-box p-6">
                            <p className="font-display font-bold mb-4">Message me here</p>
                            <div className="space-y-3">
                                <a
                                    href={mailtoHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <Mail className="w-4 h-4" />
                                    {contact.email}
                                </a>
                                {socials.map(({ href, icon: Icon, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        <Icon className="w-4 h-4" />
                                        {label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </FadeInSection>

                <Separator className="mt-16 mb-8" />

                <FadeInSection>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <p className="font-display font-bold">
                                <span className="text-primary">{"<"}</span>
                                {hero.name}
                                <span className="text-primary">{"/>"}</span>
                                <span className="text-muted-foreground font-normal ml-2 text-sm">{contact.email}</span>
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">{hero.subTitle}</p>
                        </div>

                        <div className="flex flex-col items-center md:items-end gap-3">
                            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Media</p>
                            <div className="flex gap-4">
                                {socials.map(({ href, icon: Icon, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                        aria-label={label}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <p className="text-center text-xs text-muted-foreground/70 mt-10">
                        © {new Date().getFullYear()} {hero.name}. Built with React & Vite.
                    </p>
                </FadeInSection>
            </div>
        </section>
    );
}
