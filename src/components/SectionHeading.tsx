interface SectionHeadingProps {
    label: string;
}

/** Sticky label on small screens (where there is no sidebar nav), a quiet heading on desktop. */
export function SectionHeading({ label }: SectionHeadingProps) {
    return (
        <div className="sticky top-0 z-20 -mx-6 mb-6 bg-background/85 px-6 py-4 backdrop-blur md:-mx-12 md:px-12 lg:static lg:mx-0 lg:mb-8 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-foreground lg:text-muted-foreground">
                {label}
            </h2>
        </div>
    );
}
