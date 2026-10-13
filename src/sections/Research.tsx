import { SectionHeading } from "@/components/SectionHeading";
import data from "@/data/portfolio.json";

export function Research() {
    const { thesis } = data.research;

    return (
        <section id="research" className="mb-20 md:mb-28 lg:scroll-mt-24" aria-label="Research">
            <SectionHeading label="Research" />

            <article className="grid gap-2 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground pt-1">
                    M.Tech Thesis
                </p>
                <div className="min-w-0">
                    <h3 className="font-semibold leading-snug">{thesis.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed text-justify hyphens-auto">{thesis.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Focus areas">
                        {thesis.focus.map((f) => (
                            <li key={f} className="rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-[11px] text-primary">
                                {f}
                            </li>
                        ))}
                    </ul>
                </div>
            </article>
        </section>
    );
}
