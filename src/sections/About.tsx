import { SectionHeading } from "@/components/SectionHeading";
import data from "@/data/portfolio.json";

export function About() {
    const { about, experience } = data;

    const facts = [
        { label: "Role", value: `${experience[0].role} @ ${experience[0].company}` },
        { label: "Education", value: "M.Tech, IIT Dharwad" },
        { label: "Focus", value: "Agentic LLM workflows, RAG pipelines, Computer Vision" },
    ];

    return (
        <section id="about" className="mb-20 md:mb-28 lg:scroll-mt-24" aria-label="About me">
            <SectionHeading label="About" />

            <p className="text-muted-foreground leading-relaxed text-justify hyphens-auto">
                {about.content.join(" ")}
            </p>

            <dl className="mt-8 grid gap-3 text-sm">
                {facts.map(({ label, value }) => (
                    <div key={label} className="grid grid-cols-[6.5rem_1fr] gap-4">
                        <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground pt-0.5">{label}</dt>
                        <dd className="text-foreground">{value}</dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}
