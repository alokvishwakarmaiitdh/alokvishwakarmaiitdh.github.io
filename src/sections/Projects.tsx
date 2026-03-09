import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Github, ExternalLink } from "lucide-react";
import data from "@/data/portfolio.json";

export function Projects() {
    const { projects } = data;
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    return (
        <section id="projects" className="py-28 relative">
            {/* Background accent */}
            <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-14 text-center"
                >
                    <h2 className="text-3xl font-display font-bold mb-3">Featured Projects</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4" />
                    <p className="text-muted-foreground">Technical deep dives into my recent work.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Card
                                className="h-full flex flex-col glass glow-border rounded-xl cursor-pointer group hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
                                onClick={() => setSelectedProject(project)}
                            >
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg font-display group-hover:text-gradient transition-colors duration-300">
                                            {project.title}
                                        </CardTitle>
                                        <ExternalLink className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                                    </div>
                                    <CardDescription className="line-clamp-2 mt-2 text-sm">
                                        {project.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <div className="flex flex-wrap gap-1.5 mb-5">
                                        {project.stack.slice(0, 3).map((tech) => (
                                            <Badge key={tech} className="text-xs bg-primary/10 text-primary/80 border-primary/10 hover:bg-primary/15 font-normal">
                                                {tech}
                                            </Badge>
                                        ))}
                                        {project.stack.length > 3 && (
                                            <Badge className="text-xs bg-white/5 text-muted-foreground border-white/10 font-normal">
                                                +{project.stack.length - 3}
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="text-xs text-muted-foreground/60 italic border-l-2 border-primary/20 pl-3">
                                        "{project.quote}"
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-0">
                                    <Button variant="ghost" className="w-full rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 text-sm transition-all duration-300">
                                        View Details →
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Project Details Modal */}
                <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass border-white/10">
                        {selectedProject && (
                            <>
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-display font-bold text-gradient">
                                        {selectedProject.title}
                                    </DialogTitle>
                                    <DialogDescription className="text-base mt-2">
                                        {selectedProject.description}
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-6 py-4">
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.stack.map(tech => (
                                            <Badge key={tech} className="px-3 py-1 bg-primary/10 text-primary border-primary/20">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-display font-semibold text-foreground mb-2">Overview</h4>
                                            <p className="text-muted-foreground leading-relaxed text-sm">
                                                {selectedProject.fullDescription}
                                            </p>
                                        </div>

                                        <div className="bg-white/[0.02] p-5 rounded-xl border border-white/[0.06]">
                                            <h4 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                                                Architecture
                                            </h4>
                                            <p className="text-sm text-muted-foreground font-mono leading-relaxed">
                                                {selectedProject.architecture}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 justify-end pt-4 border-t border-white/[0.06]">
                                    <Button className="bg-gradient-to-r from-primary to-secondary text-white rounded-full px-6 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300" asChild>
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
