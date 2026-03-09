import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import data from "@/data/portfolio.json";

interface SubProject {
    name: string;
    details?: string;
    bullets?: string[];
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
        <section id="experience" className="py-28 relative">
            {/* Background accent */}
            <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-3xl font-display font-bold mb-3">Work Experience</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4" />
                    <p className="text-muted-foreground">My professional journey in building AI systems.</p>
                </motion.div>

                <div className="relative ml-4 md:ml-12 space-y-10">
                    {/* Timeline line with gradient */}
                    <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-primary/50 via-secondary/30 to-transparent" />

                    {experience.map((job, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                            className="relative pl-8 md:pl-12"
                        >
                            {/* Timeline Dot with glow */}
                            <div className="absolute top-1 left-[-5px] w-2.5 h-2.5 bg-primary rounded-full ring-4 ring-background z-10 shadow-lg shadow-primary/50" />

                            <Card className="glass glow-border rounded-xl hover:shadow-xl transition-all duration-500 group">
                                <CardHeader className="pb-3">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
                                        <CardTitle className="text-lg font-display font-bold text-foreground group-hover:text-gradient transition-colors">
                                            {job.role}
                                        </CardTitle>
                                        <Badge className="w-fit bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 font-medium text-xs">
                                            {job.duration}
                                        </Badge>
                                    </div>
                                    <CardDescription className="text-sm text-primary/70 font-medium">
                                        {job.company}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {job.highlights && (
                                        <ul className="list-disc list-outside ml-5 space-y-2 text-sm text-muted-foreground mb-6">
                                            {job.highlights.map((point, idx) => (
                                                <li key={idx}>{point}</li>
                                            ))}
                                        </ul>
                                    )}

                                    {job.subProjects && (
                                        <div className="flex flex-col gap-3 mb-4">
                                            {job.subProjects.map((sub, idx) => (
                                                <div key={idx} className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-4 hover:border-primary/20 transition-colors duration-300">
                                                    <h4 className="font-display font-semibold text-sm mb-1 text-foreground/90">{sub.name}</h4>
                                                    {sub.details && <p className="text-xs text-muted-foreground mb-2">{sub.details}</p>}
                                                    {sub.bullets && (
                                                        <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-muted-foreground/80">
                                                            {sub.bullets.map((bullet, bIdx) => (
                                                                <li key={bIdx}>{bullet}</li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {job.quote && (
                                        <>
                                            <Separator className="my-4 bg-white/[0.06]" />
                                            <div className="bg-primary/5 p-4 rounded-xl border-l-4 border-primary/40">
                                                <p className="italic text-muted-foreground text-sm">
                                                    "{job.quote}"
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
