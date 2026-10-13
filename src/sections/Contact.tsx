import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import data from "@/data/portfolio.json";

export function Contact() {
    const { contact, hero } = data;

    const composeHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}`;

    return (
        <section id="contact" className="lg:scroll-mt-24" aria-label="Contact">
            <SectionHeading label="Contact" />

            <p className="text-muted-foreground leading-relaxed max-w-[50ch]">
                I'm always open to discussing new AI projects, research collaborations, or engineering challenges.
            </p>

            <Button asChild className="mt-6">
                <a
                    href={composeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Say hello to Alok by email (opens in Gmail)"
                >
                    <Mail className="w-4 h-4" />
                    Say hello
                </a>
            </Button>

            <footer className="mt-24 pb-16 lg:pb-0 text-xs text-muted-foreground">
                © {new Date().getFullYear()} {hero.name}. Built with React, Vite and Tailwind CSS.
            </footer>
        </section>
    );
}
