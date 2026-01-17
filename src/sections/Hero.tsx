import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";
import data from "@/data/portfolio.json";

export function Hero() {
    const { hero } = data;

    return (
        <section className="min-h-screen flex flex-col justify-center pt-20 relative overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 z-10 grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", staggerChildren: 0.1 }}
                >
                    <h2 className="text-primary font-semibold tracking-wide text-lg mb-2 uppercase">
                        {hero.title}
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight text-white">
                        {hero.name}
                    </h1>
                    <h3 className="text-2xl md:text-3xl text-muted-foreground font-light mb-6">
                        {hero.subTitle}
                    </h3>

                    <p className="text-lg md:text-xl text-muted-foreground/80 max-w-[60ch] mb-10 leading-relaxed">
                        {hero.valueStatement}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
                            asChild
                        >
                            <a href="#projects">View Projects</a>
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-slate-700 bg-slate-900/50 hover:border-slate-500 hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-300"
                            asChild
                        >
                            <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                <Github className="w-5 h-5" />
                                GitHub
                            </a>
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-slate-700 bg-slate-900/50 hover:border-slate-500 hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-300"
                            asChild
                        >
                            <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                <Linkedin className="w-5 h-5" />
                                LinkedIn
                            </a>
                        </Button>
                    </div>
                </motion.div>

                {/* Profile Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
                    className="flex justify-center md:justify-end relative"
                >
                    {/* Gradient Ring & Glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary via-secondary to-primary blur-[60px] opacity-40 rounded-full scale-110" />

                    <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-1 bg-gradient-to-br from-primary to-secondary shadow-2xl shadow-primary/20">
                        <div className="w-full h-full rounded-full overflow-hidden bg-background border-4 border-background relative z-10">
                            <img
                                src={data.about.image}
                                alt={hero.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground"
            >
                <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-current rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
