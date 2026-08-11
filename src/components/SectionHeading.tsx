import type { ReactNode } from "react";

interface SectionHeadingProps {
    label: string;
    right?: ReactNode;
    className?: string;
}

export function SectionHeading({ label, right, className = "" }: SectionHeadingProps) {
    return (
        <div className={`flex items-center gap-6 mb-8 ${className}`}>
            <h2 className="flex items-center gap-1 text-2xl md:text-3xl font-display font-bold whitespace-nowrap">
                <span className="text-primary">#</span>
                <span className="text-foreground">{label}</span>
            </h2>
            <span className="h-px flex-1 bg-border" />
            {right}
        </div>
    );
}
