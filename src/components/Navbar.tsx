import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative overflow-hidden rounded-sm hover:bg-primary/10 transition-all duration-300"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}

const navItems = [
    { name: "Home", href: "#home" },
    { name: "About-me", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Research", href: "#research" },
    { name: "Skills", href: "#skills" },
    { name: "Contacts", href: "#contact" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            // Back in the hero: no section should be marked active
            if (window.scrollY < window.innerHeight * 0.4) {
                setActiveSection("");
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const sections = navItems
            .map((item) => document.getElementById(item.href.slice(1)))
            .filter((el): el is HTMLElement => el !== null);

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveSection(`#${entry.target.id}`);
                    }
                }
            },
            { rootMargin: "-40% 0px -55% 0px" }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                isScrolled
                    ? "bg-background border-b border-border py-3"
                    : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto px-6 lg:pl-20 flex items-center justify-between">
                {/* Brand */}
                <a
                    href="#"
                    className="text-lg font-display font-bold tracking-tight"
                    aria-label="Back to top"
                >
                    <span className="text-primary">{"<"}</span>
                    <span className="text-foreground">Alok</span>
                    <span className="text-primary">{"/>"}</span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => {
                        const isActive = activeSection === item.href;
                        return (
                            <a
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium px-4 py-2 rounded-sm hover:bg-primary/5 transition-all duration-300 relative group",
                                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <span className="text-primary">#</span>{item.name}
                                <span
                                    className={cn(
                                        "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-primary transition-all duration-300",
                                        isActive ? "w-3/4" : "w-0 group-hover:w-3/4"
                                    )}
                                />
                            </a>
                        );
                    })}
                    <div className="ml-2">
                        <ThemeToggle />
                    </div>
                </nav>

                {/* Mobile Menu Toggle */}
                <div className="flex items-center gap-3 md:hidden">
                    <ThemeToggle />
                    <button
                        className="text-foreground p-2 rounded-sm hover:bg-primary/10 transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Nav */}
                {mobileMenuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-6 flex flex-col gap-2 md:hidden">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-lg font-medium text-foreground py-3 px-4 rounded-sm hover:bg-primary/10 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="text-primary">#</span>{item.name}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
}
