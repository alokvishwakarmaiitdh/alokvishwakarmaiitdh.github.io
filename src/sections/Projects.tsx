import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Github } from "lucide-react";
import data from "@/data/portfolio.json";

export function Projects() {
    const { projects } = data;
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    return (
        <section id="projects" className="py-24 bg-secondary/30">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
                    <p className="text-muted-foreground">Technical deep dives into my recent work.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card
                                className="h-full flex flex-col bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-border/50"
                                onClick={() => setSelectedProject(project)}
                            >
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                            {project.title}
                                        </CardTitle>
                                    </div>
                                    <CardDescription className="line-clamp-2 mt-2">
                                        {project.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.stack.slice(0, 3).map((tech) => (
                                            <Badge key={tech} variant="secondary" className="text-xs">
                                                {tech}
                                            </Badge>
                                        ))}
                                        {project.stack.length > 3 && (
                                            <Badge variant="secondary" className="text-xs">+{project.stack.length - 3}</Badge>
                                        )}
                                    </div>
                                    <div className="text-xs text-muted-foreground italic border-l-2 border-primary/30 pl-3">
                                        "{project.quote}"
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-0">
                                    <Button variant="ghost" className="w-full group-hover:bg-primary/10">
                                        View Details
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Project Details Modal */}
                <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        {selectedProject && (
                            <>
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                                        {selectedProject.title}
                                    </DialogTitle>
                                    <DialogDescription className="text-lg mt-2">
                                        {selectedProject.description}
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-6 py-4">
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.stack.map(tech => (
                                            <Badge key={tech} variant="outline" className="px-3 py-1">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-semibold text-foreground mb-2">Overview</h4>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {selectedProject.fullDescription}
                                            </p>
                                        </div>

                                        <div className="bg-muted/30 p-4 rounded-lg border border-border">
                                            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                                Architecture
                                            </h4>
                                            <p className="text-sm text-muted-foreground font-mono">
                                                {selectedProject.architecture}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 justify-end pt-4 border-t border-border">
                                    <Button variant="outline" asChild>
                                        <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                            <Github className="w-4 h-4" />
                                            View Code
                                        </a>
                                    </Button>
                                    {/* Add Live Demo button if URL exists in JSON later */}
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>

            </div>
        </section>
    );
}
