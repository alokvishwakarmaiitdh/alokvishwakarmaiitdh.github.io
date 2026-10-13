import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import data from "@/data/portfolio.json";

// Matches standalone metrics (75%, 13×, <50ms, $0.015–0.04, 50+) but not
// digits embedded in product names like GPT-4o or Qwen-235B.
const METRIC_RE = /((?<![\w-])[~<>≈]?\s?\$?\d[\d,.]*(?:\s?[–—-]\s?\$?\d[\d,.]*)?\s?(?:×|%|ms|s|\+)?(?![\w-]))/g;

function Highlight({ text }: { text: string }) {
    return (
        <>
            {text.split(METRIC_RE).map((part, i) =>
                i % 2 === 1 ? (
                    <span key={i} className="font-medium text-foreground">{part}</span>
                ) : (
                    part
                )
            )}
        </>
    );
}

function BulletList({ items, limit = 2 }: { items: string[]; limit?: number }) {
    const [expanded, setExpanded] = useState(false);
    const visible = expanded ? items : items.slice(0, limit);
    const hidden = items.length - limit;

    return (
        <>
            <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-muted-foreground leading-relaxed marker:text-border text-justify hyphens-auto">
                {visible.map((bullet, idx) => (
                    <li key={idx}><Highlight text={bullet} /></li>
                ))}
            </ul>
            {hidden > 0 && (
                <button
                    type="button"
                    onClick={() => setExpanded(!expanded)}
                    aria-expanded={expanded}
                    className="mt-2 font-mono text-xs text-primary hover:underline underline-offset-4"
                >
                    {expanded ? "Show less" : `Show ${hidden} more`}
                </button>
            )}
        </>
    );
}

interface SubSection {
    name: string;
    bullets?: string[];
}

interface SubProject {
    name: string;
    details?: string;
    bullets?: string[];
    subSections?: SubSection[];
}

interface Job {
    role: string;
    company: string;
    duration: string;
    highlights?: string[];
    subProjects?: SubProject[];
    quote?: string;
}

export function Experience() {
    const experience = data.experience as Job[];

    return (
        <section id="experience" className="mb-20 md:mb-28 lg:scroll-mt-24" aria-label="Work experience">
            <SectionHeading label="Experience" />

            <ol className="space-y-14">
                {experience.map((job, index) => (
                    <li key={index} className="grid gap-2 sm:grid-cols-[8rem_1fr] sm:gap-6">
                        <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground pt-1">
                            {job.duration}
                        </p>

                        <div className="min-w-0">
                            <h3 className="font-semibold leading-snug">
                                {job.role}
                                <span className="text-muted-foreground font-normal"> · {job.company}</span>
                            </h3>

                            {job.highlights && (
                                <div className="mt-3">
                                    <BulletList items={job.highlights} limit={3} />
                                </div>
                            )}

                            {job.subProjects && (
                                <div className="mt-5 space-y-6">
                                    {job.subProjects.map((sub, idx) => (
                                        <div key={idx}>
                                            <h4 className="text-sm font-semibold text-primary">{sub.name}</h4>
                                            {sub.details && <p className="mt-1 text-sm text-muted-foreground text-justify hyphens-auto">{sub.details}</p>}
                                            {sub.bullets && (
                                                <div className="mt-2">
                                                    <BulletList items={sub.bullets} />
                                                </div>
                                            )}
                                            {sub.subSections && (
                                                <div className="mt-3 space-y-4">
                                                    {sub.subSections.map((section, sIdx) => (
                                                        <div key={sIdx}>
                                                            <p className="text-sm font-medium text-foreground mb-1.5">{section.name}</p>
                                                            {section.bullets && <BulletList items={section.bullets} />}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {job.quote && (
                                <p className="mt-5 border-l-2 border-border pl-4 italic text-sm text-muted-foreground">
                                    "{job.quote}"
                                </p>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
}
