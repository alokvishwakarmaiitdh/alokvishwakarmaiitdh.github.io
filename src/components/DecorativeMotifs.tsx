interface HollowSquaresProps {
    className?: string;
}

/** A cluster of unfilled, overlapping bordered squares — purely decorative. */
export function HollowSquares({ className = "" }: HollowSquaresProps) {
    return (
        <div className={`relative w-28 h-40 pointer-events-none hidden md:block ${className}`} aria-hidden="true">
            <div className="absolute top-0 left-0 w-28 h-28 border border-border" />
            <div className="absolute top-10 left-6 w-20 h-20 border border-primary/50" />
            <div className="absolute top-24 left-2 w-14 h-14 border border-border" />
        </div>
    );
}

interface DotGridProps {
    className?: string;
    rows?: number;
    cols?: number;
}

/** A grid of small dots — purely decorative. */
export function DotGrid({ className = "", rows = 5, cols = 5 }: DotGridProps) {
    return (
        <div
            className={`pointer-events-none hidden md:block ${className}`}
            aria-hidden="true"
            style={{
                width: `${cols * 20}px`,
                height: `${rows * 20}px`,
                backgroundImage: `radial-gradient(hsl(var(--muted-foreground) / 0.5) 1.5px, transparent 1.5px)`,
                backgroundSize: "20px 20px",
            }}
        />
    );
}
