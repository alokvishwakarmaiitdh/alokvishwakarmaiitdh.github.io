import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { HollowSquares, DotGrid } from "@/components/DecorativeMotifs";
import data from "@/data/portfolio.json";

export function Skills() {
    const { skills } = data;

    return (
        <section id="skills" className="py-12 md:py-16 relative">
            <div className="container mx-auto px-6">
                <SectionHeading label="Skills" />

                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Decorative column, like the reference */}
                    <div className="relative hidden lg:block">
                        <DotGrid className="absolute top-2 left-4" rows={5} cols={5} />
                        <HollowSquares className="absolute top-36 left-24" />
                        <DotGrid className="absolute top-64 left-2" rows={4} cols={6} />
                    </div>

                    <div className="lg:col-span-2 columns-1 sm:columns-2 gap-5">
                        {Object.entries(skills).map(([category, items], index) => (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="break-inside-avoid mb-5 outline-box-hover p-5"
                            >
                                <h3 className="text-sm font-display font-bold mb-3 text-foreground">
                                    {category}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                                    {items.join(", ")}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
