import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

export function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>(() =>
        document.documentElement.classList.contains("light") ? "light" : "dark"
    );

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        try {
            localStorage.setItem("theme", theme);
        } catch {
            // Storage unavailable (private mode); the theme still applies for this visit
        }
    }, [theme]);

    const next = theme === "light" ? "dark" : "light";

    return (
        <button
            type="button"
            onClick={() => setTheme(next)}
            className="text-muted-foreground hover:text-foreground transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Switch to ${next} theme`}
        >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
    );
}
