import { motion } from "framer-motion";
import data from "@/data/portfolio.json";

export function Skills() {
    const { skills } = data;

    return (
        <section id="skills" className="py-28 relative">
            {/* Background accent */}
            <div className="absolute top-[30%] left-[-5%] w-[350px] h-[350px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-display font-bold mb-3">Technical Arsenal</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4" />
                    <p className="text-muted-foreground text-base max-w-2xl mx-auto">
                        A comprehensive toolkit for building scalable AI solutions.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {Object.entries(skills).map(([category, items], index) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="glass glow-border rounded-xl p-6 hover:-translate-y-1 transition-all duration-500 group"
                        >
                            <h3 className="text-base font-display font-semibold mb-5 text-foreground/90 pb-3 border-b border-white/[0.06] group-hover:text-gradient transition-all duration-300">
                                {category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {items.map((skill, skillIdx) => (
                                    <motion.span
                                        key={skill}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.08 + skillIdx * 0.03 }}
                                        className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-primary/8 text-primary/80 hover:bg-primary/15 hover:text-primary border border-primary/10 hover:border-primary/25 transition-all duration-300 cursor-default"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
