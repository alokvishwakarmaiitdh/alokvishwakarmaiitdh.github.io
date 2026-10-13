import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Github, ArrowUpRight } from "lucide-react";
import data from "@/data/portfolio.json";

function StackChips({ stack }: { stack: string[] }) {
    return (
        <ul className="flex flex-wrap gap-1.5" aria-label="Technologies used">
            {stack.map((tech) => (
                <li key={tech} className="rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-[11px] text-primary">
                    {tech}
                </li>
            ))}
        </ul>
    );
}

export function Projects() {
    const { projects } = data;
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    return (
        <section id="projects" className="mb-20 md:mb-28 lg:scroll-mt-24" aria-label="Selected projects">
            <SectionHeading label="Projects" />

            <ul className="space-y-2 lg:-mx-4">
                {projects.map((project) => (
                    <li
                        key={project.id}
                        className="group relative rounded-lg p-4 transition-[background-color,box-shadow] hover:bg-card hover:shadow-[inset_0_1px_0_hsl(var(--highlight)),0_8px_24px_-12px_rgb(0_0_0/0.5)] motion-reduce:transition-none"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <h3 className="font-semibold leading-snug">
                                {/* Stretched button: the whole row opens the details */}
                                <button
                                    type="button"
                                    onClick={() => setSelectedProject(project)}
                                    className="text-left group-hover:text-primary transition-colors after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring"
                                >
                                    {project.title}
                                </button>
                            </h3>
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative z-10 shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                                aria-label={`${project.title} source on GitHub`}
                            >
                                <Github className="w-4 h-4" />
                            </a>
                        </div>
                        <p className="mt-1.5 mb-3 text-sm text-muted-foreground leading-relaxed text-justify hyphens-auto">
                            {project.description}
                        </p>
                        <StackChips stack={project.stack} />
                    </li>
                ))}
            </ul>

            <a
                href={data.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-1 font-medium text-sm hover:text-primary transition-colors"
            >
                View all repositories on GitHub
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </a>

            <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card shadow-[inset_0_1px_0_hsl(var(--highlight)),0_24px_48px_-16px_rgb(0_0_0/0.5)]">
                    {selectedProject && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold">
                                    {selectedProject.title}
                                </DialogTitle>
                                <DialogDescription className="text-base">
                                    {selectedProject.description}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-6 py-2">
                                <StackChips stack={selectedProject.stack} />

                                <div>
                                    <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">Overview</h4>
                                    <p className="text-sm leading-relaxed text-justify hyphens-auto">{selectedProject.fullDescription}</p>
                                </div>

                                <div className="rounded-md bg-muted p-4">
                                    <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">Architecture</h4>
                                    <p className="font-mono text-sm leading-relaxed">{selectedProject.architecture}</p>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4 border-t border-border">
                                <Button asChild>
                                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                                        <Github className="w-4 h-4" />
                                        View code
                                    </a>
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
}
