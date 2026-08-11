import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Github, ExternalLink } from "lucide-react";
import data from "@/data/portfolio.json";

export function Projects() {
    const { projects } = data;
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    return (
        <section id="projects" className="py-12 md:py-16 relative">
            <div className="container mx-auto px-6">
                <SectionHeading label="Projects" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div
                                className="h-full flex flex-col outline-box-hover cursor-pointer group"
                                onClick={() => setSelectedProject(project)}
                            >
                                <div className="relative h-24 border-b border-border bg-muted flex items-center justify-center overflow-hidden">
                                    <span className="text-4xl font-display font-bold text-muted-foreground/30">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <ExternalLink className="absolute top-3 right-3 w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                                </div>

                                <div className="p-5 flex flex-col flex-grow">
                                    <p className="font-mono text-xs text-muted-foreground mb-3">
                                        {project.stack.join(" · ")}
                                    </p>
                                    <h3 className="text-lg font-display font-bold mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                                        {project.description}
                                    </p>
                                    <p className="text-xs italic text-muted-foreground/90 border-l-2 border-primary/30 pl-3 mb-5">
                                        "{project.quote}"
                                    </p>

                                    <Button variant="terminal" size="sm" className="w-fit" asChild>
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex items-center gap-2"
                                        >
                                            <Github className="w-3.5 h-3.5" />
                                            Code
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Fill the grid: link to the full GitHub profile */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: projects.length * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <a
                            href={data.contact.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-full min-h-[280px] flex flex-col items-center justify-center gap-4 outline-box-hover group"
                        >
                            <Github className="w-10 h-10 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                            <p className="font-display font-bold text-lg">
                                More on GitHub <span className="text-primary">→</span>
                            </p>
                            <p className="text-sm text-muted-foreground">Explore all my repositories</p>
                        </a>
                    </motion.div>
                </div>

                {/* Project Details Modal */}
                <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-border">
                        {selectedProject && (
                            <>
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-display font-bold text-primary">
                                        {selectedProject.title}
                                    </DialogTitle>
                                    <DialogDescription className="text-base mt-2">
                                        {selectedProject.description}
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-6 py-4">
                                    <p className="font-mono text-xs text-muted-foreground">
                                        {selectedProject.stack.join(" · ")}
                                    </p>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-display font-semibold text-foreground mb-2">Overview</h4>
                                            <p className="text-muted-foreground leading-relaxed text-sm">
                                                {selectedProject.fullDescription}
                                            </p>
                                        </div>

                                        <div className="outline-box p-5">
                                            <h4 className="font-display font-semibold text-foreground mb-2">
                                                Architecture
                                            </h4>
                                            <p className="text-sm text-muted-foreground font-mono leading-relaxed">
                                                {selectedProject.architecture}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 justify-end pt-4 border-t border-border">
                                    <Button variant="terminal" asChild>
                                        <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                            <Github className="w-4 h-4" />
                                            View Code
                                        </a>
                                    </Button>
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </section>
    );
}
