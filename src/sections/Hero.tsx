import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HollowSquares, DotGrid } from "@/components/DecorativeMotifs";
import data from "@/data/portfolio.json";

export function Hero() {
    const { hero } = data;

    return (
        <section id="home" className="pt-32 pb-12 md:pt-36 md:pb-16 relative overflow-hidden">
            <div className="container mx-auto px-6 z-10 grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-sm text-muted-foreground mb-6"
                    >
                        <span className="text-primary">//</span> {hero.title}
                    </motion.p>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-4 leading-[1.15]">
                        <span className="text-foreground">Hi, I'm </span>
                        <span className="text-primary">{hero.name}</span>
                    </h1>

                    <h2 className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
                        {hero.subTitle}
                    </h2>

                    <p className="text-base text-muted-foreground max-w-[55ch] mb-10 leading-relaxed">
                        {hero.valueStatement}
                    </p>

                    <Button variant="terminal" size="lg" className="px-8" asChild>
                        <a href="#projects">View Projects</a>
                    </Button>
                </motion.div>

                {/* Profile Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex justify-center relative"
                >
                    <HollowSquares className="absolute -top-8 -left-8" />
                    <DotGrid className="absolute -bottom-6 -right-6" />

                    <div className="relative outline-box-hover p-3 bg-background">
                        <div className="w-72 h-80 md:w-[360px] md:h-[420px] overflow-hidden">
                            <img
                                src={data.about.image}
                                alt={hero.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>

        </section>
    );
}
