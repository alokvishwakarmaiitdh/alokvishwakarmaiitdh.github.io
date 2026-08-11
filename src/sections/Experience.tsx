import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { Separator } from "@/components/ui/separator";
import data from "@/data/portfolio.json";

// Matches standalone metrics (75%, 13×, <50ms, $0.015–0.04, 50+) but not
// digits embedded in product names like GPT-4o or Qwen-235B.
const METRIC_RE = /((?<![\w-])[~<>≈]?\s?\$?\d[\d,.]*(?:\s?[–—-]\s?\$?\d[\d,.]*)?\s?(?:×|%|ms|s|\+)?(?![\w-]))/g;

function Highlight({ text }: { text: string }) {
    return (
        <>
            {text.split(METRIC_RE).map((part, i) =>
                i % 2 === 1 ? (
                    <span key={i} className="font-semibold text-primary">{part}</span>
                ) : (
                    part
                )
            )}
        </>
    );
}

function BulletList({ items, limit = 2, className = "" }: { items: string[]; limit?: number; className?: string }) {
    const [expanded, setExpanded] = useState(false);
    const visible = expanded ? items : items.slice(0, limit);
    const hidden = items.length - limit;

    return (
        <>
            <ul className={className}>
                {visible.map((bullet, idx) => (
                    <li key={idx}><Highlight text={bullet} /></li>
                ))}
            </ul>
            {hidden > 0 && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="mt-2 text-xs font-medium text-primary/80 hover:text-primary transition-colors"
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
        <section id="experience" className="py-12 md:py-16 relative">
            <div className="container mx-auto px-6 max-w-4xl">
                <SectionHeading label="Experience" />

                <div className="relative ml-4 md:ml-12 space-y-10">
                    {/* Timeline line */}
                    <div className="absolute top-0 bottom-0 left-0 w-px bg-border" />

                    {experience.map((job, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                            className="relative pl-8 md:pl-12"
                        >
                            {/* Timeline marker */}
                            <div className="absolute top-1 left-[-6px] w-3 h-3 border-2 border-primary bg-background z-10" />

                            <div className="outline-box-hover p-5 md:p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
                                    <h3 className="text-lg font-display font-bold text-foreground">
                                        {job.role}
                                    </h3>
                                    <span className="text-xs text-muted-foreground w-fit">
                                        {job.duration}
                                    </span>
                                </div>
                                <p className="text-sm text-primary/80 font-medium mb-4">
                                    {job.company}
                                </p>

                                {job.highlights && (
                                    <div className="mb-6">
                                        <BulletList
                                            items={job.highlights}
                                            limit={3}
                                            className="list-disc list-outside ml-5 space-y-2 text-sm text-muted-foreground text-justify"
                                        />
                                    </div>
                                )}

                                {job.subProjects && (
                                    <div className="flex flex-col gap-3 mb-4">
                                        {job.subProjects.map((sub, idx) => (
                                            <div key={idx} className="outline-box-hover p-4">
                                                <h4 className="font-display font-semibold text-sm mb-1 text-foreground/90">{sub.name}</h4>
                                                {sub.details && <p className="text-xs text-muted-foreground mb-2">{sub.details}</p>}
                                                {sub.bullets && (
                                                    <BulletList
                                                        items={sub.bullets}
                                                        limit={2}
                                                        className="list-disc list-outside ml-4 space-y-1.5 text-sm text-muted-foreground text-justify"
                                                    />
                                                )}
                                                {sub.subSections && (
                                                    <div className="flex flex-col gap-3 mt-2">
                                                        {sub.subSections.map((section, sIdx) => (
                                                            <div key={sIdx} className="border-l-2 border-border pl-3">
                                                                <p className="text-xs font-semibold text-foreground/70 mb-1">{section.name}</p>
                                                                {section.bullets && (
                                                                    <BulletList
                                                                        items={section.bullets}
                                                                        limit={2}
                                                                        className="list-disc list-outside ml-4 space-y-1.5 text-sm text-muted-foreground text-justify"
                                                                    />
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {job.quote && (
                                    <>
                                        <Separator className="my-4" />
                                        <div className="border-l-2 border-primary/40 pl-4">
                                            <p className="italic text-muted-foreground text-sm">
                                                "{job.quote}"
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
