import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, ArrowDown } from "lucide-react";
import data from "@/data/portfolio.json";

export function Hero() {
    const { hero } = data;

    return (
        <section className="min-h-screen flex flex-col justify-center pt-20 relative overflow-hidden">
            {/* Animated gradient orbs */}
            <div className="absolute top-[-10%] right-[10%] w-[450px] h-[450px] bg-primary/20 rounded-full blur-[120px] animate-float pointer-events-none" />
            <div className="absolute bottom-[0%] left-[-5%] w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[120px] animate-float-slow pointer-events-none" />
            <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] animate-float-slower pointer-events-none" />

            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="container mx-auto px-6 z-10 grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        {hero.title}
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-4 leading-[1.1]">
                        <span className="text-foreground">Hi, I'm </span>
                        <span className="text-gradient">{hero.name}</span>
                    </h1>

                    <h2 className="text-xl md:text-2xl text-muted-foreground font-light mb-6 leading-relaxed">
                        {hero.subTitle}
                    </h2>

                    <p className="text-base md:text-lg text-muted-foreground/70 max-w-[55ch] mb-10 leading-relaxed">
                        {hero.valueStatement}
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 rounded-full px-8 font-medium"
                            asChild
                        >
                            <a href="#projects">View Projects</a>
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300 rounded-full px-6"
                            asChild
                        >
                            <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                <Github className="w-4 h-4" />
                                GitHub
                            </a>
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300 rounded-full px-6"
                            asChild
                        >
                            <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                <Linkedin className="w-4 h-4" />
                                LinkedIn
                            </a>
                        </Button>
                    </div>
                </motion.div>

                {/* Profile Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex justify-center md:justify-end relative"
                >
                    {/* Gradient Ring & Glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary via-secondary to-primary blur-[80px] opacity-30 rounded-full scale-110 animate-pulse-glow" />

                    <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-[3px] bg-gradient-to-br from-primary via-secondary to-primary shadow-2xl shadow-primary/20">
                        <div className="w-full h-full rounded-full overflow-hidden bg-background relative z-10">
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
            <motion.a
                href="#about"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/50 hover:text-primary transition-colors duration-300 cursor-pointer"
            >
                <ArrowDown className="w-5 h-5 animate-bounce" />
            </motion.a>
        </section>
    );
}
