import { Github, Linkedin, Boxes } from "lucide-react";
import data from "@/data/portfolio.json";

const links = [
    { href: data.contact.github, icon: Github, label: "GitHub" },
    { href: data.contact.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: data.contact.huggingface, icon: Boxes, label: "Hugging Face" },
];

export function SocialRail() {
    return (
        <div className="hidden lg:flex fixed top-0 left-8 h-screen w-px flex-col items-center z-40 pointer-events-none">
            <div className="h-full w-px bg-border" />
            <div className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 pointer-events-auto bg-background py-4">
                {links.map(({ href, icon: Icon, label }) => (
                    <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors duration-300"
                        aria-label={label}
                    >
                        <Icon className="w-6 h-6" />
                    </a>
                ))}
            </div>
        </div>
    );
}
