import { useEffect, useState } from "react";
import { Github, Linkedin, Boxes, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import data from "@/data/portfolio.json";

const navItems = [
    { name: "About", id: "about" },
    { name: "Experience", id: "experience" },
    { name: "Projects", id: "projects" },
    { name: "Research", id: "research" },
    { name: "Skills", id: "skills" },
    { name: "Contact", id: "contact" },
];

const socials = [
    { href: data.contact.github, icon: Github, label: "GitHub" },
    { href: data.contact.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: data.contact.huggingface, icon: Boxes, label: "Hugging Face" },
    { href: `mailto:${data.contact.email}`, icon: Mail, label: "Email" },
];

function useActiveSection() {
    const [active, setActive] = useState(navItems[0].id);

    useEffect(() => {
        const sections = navItems
            .map((item) => document.getElementById(item.id))
            .filter((el): el is HTMLElement => el !== null);

        let raf = 0;
        const update = () => {
            raf = 0;
            // Short trailing sections (Contact) never reach the reading line,
            // so once the page bottom is reached the last section wins.
            const atBottom =
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
            if (atBottom) {
                setActive(sections[sections.length - 1].id);
                return;
            }
            // Otherwise: the last section whose top has passed 35% of the viewport
            const line = window.innerHeight * 0.35;
            let current = sections[0].id;
            for (const section of sections) {
                if (section.getBoundingClientRect().top <= line) current = section.id;
            }
            setActive(current);
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    return active;
}

export function Sidebar() {
    const { hero, about } = data;
    const active = useActiveSection();

    return (
        <header className="pt-16 pb-6 lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[44%] lg:flex-col lg:justify-between lg:py-16 [@media(min-height:900px)]:lg:py-24">
            <div>
                <img
                    src={about.image}
                    alt={`Portrait of ${hero.name}`}
                    className="w-20 h-20 rounded-full object-cover ring-1 ring-primary/60 ring-offset-2 ring-offset-background mb-6 lg:mb-5 [@media(max-height:720px)]:lg:hidden"
                />
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                    <a href="#">{hero.name}</a>
                </h1>
                <h2 className="mt-3 text-lg sm:text-xl font-medium">
                    {hero.title}
                    <span className="text-muted-foreground font-normal"> · {hero.subTitle}</span>
                </h2>
                <p className="mt-4 max-w-sm text-muted-foreground leading-relaxed">
                    {hero.valueStatement}
                </p>

                <nav className="hidden lg:block mt-10 [@media(min-height:900px)]:mt-14" aria-label="Sections">
                    <ul className="w-max">
                        {navItems.map(({ name, id }) => {
                            const isActive = active === id;
                            return (
                                <li key={id}>
                                    <a href={`#${id}`} className="group flex items-center py-2">
                                        <span
                                            className={cn(
                                                "mr-4 h-px transition-all duration-200 motion-reduce:transition-none",
                                                isActive
                                                    ? "w-16 bg-primary"
                                                    : "w-8 bg-muted-foreground/50 group-hover:w-16 group-hover:bg-primary"
                                            )}
                                        />
                                        <span
                                            className={cn(
                                                "font-mono text-xs uppercase tracking-[0.16em] transition-colors",
                                                isActive
                                                    ? "text-foreground"
                                                    : "text-muted-foreground group-hover:text-foreground"
                                            )}
                                        >
                                            {name}
                                        </span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>

            <div className="mt-8 flex shrink-0 items-center gap-5">
                {socials.map(({ href, icon: Icon, label }) => (
                    <a
                        key={label}
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={label}
                        title={label}
                    >
                        <Icon className="w-5 h-5" />
                    </a>
                ))}
                <span className="h-5 w-px bg-border" aria-hidden="true" />
                <ThemeToggle />
            </div>
        </header>
    );
}
