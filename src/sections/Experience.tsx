import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import data from "@/data/portfolio.json";

export function Experience() {
    const { experience } = data;

    return (
        <section id="experience" className="py-24">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-3xl font-bold mb-4">Work Experience</h2>
                    <p className="text-muted-foreground">My professional journey in building AI systems.</p>
                </motion.div>

                <div className="relative border-l border-border ml-4 md:ml-12 space-y-12">
                    {experience.map((job, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative pl-8 md:pl-12"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute top-0 left-[-5px] w-2.5 h-2.5 bg-primary rounded-full ring-4 ring-background z-10" />

                            <Card className="mb-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                                <CardHeader>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                        <CardTitle className="text-xl font-bold text-foreground">
                                            {job.role}
                                        </CardTitle>
                                        <Badge variant="secondary" className="w-fit">{job.duration}</Badge>
                                    </div>
                                    <CardDescription className="text-base text-primary/80 font-medium">
                                        {job.company}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {job.highlights && (
                                        <ul className="list-disc list-outside ml-5 space-y-2 text-muted-foreground mb-6">
                                            {job.highlights.map((point, idx) => (
                                                <li key={idx}>{point}</li>
                                            ))}
                                        </ul>
                                    )}

                                    {job.subProjects && (
                                        <div className="grid gap-4 md:grid-cols-2 mb-6">
                                            {job.subProjects.map((sub, idx) => (
                                                <Card key={idx} className="bg-muted/30 border-none">
                                                    <CardContent className="p-4">
                                                        <h4 className="font-semibold mb-1 text-sm">{sub.name}</h4>
                                                        <p className="text-xs text-muted-foreground">{sub.details}</p>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    )}

                                    {job.quote && (
                                        <>
                                            <Separator className="my-4" />
                                            <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
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
