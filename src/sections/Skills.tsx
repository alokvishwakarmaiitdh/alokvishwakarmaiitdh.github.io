import { SectionHeading } from "@/components/SectionHeading";
import data from "@/data/portfolio.json";

export function Skills() {
    const { skills } = data;

    return (
        <section id="skills" className="mb-20 md:mb-28 lg:scroll-mt-24" aria-label="Skills">
            <SectionHeading label="Skills" />

            <div className="space-y-8">
                {Object.entries(skills).map(([category, items]) => (
                    <div key={category}>
                        <h3 className="text-sm font-semibold mb-3">{category}</h3>
                        <ul className="flex flex-wrap gap-1.5">
                            {items.map((item) => (
                                <li
                                    key={item}
                                    className="rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
