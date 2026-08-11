import { Quote } from "lucide-react";

interface PullQuoteProps {
    quote: string;
    attribution: string;
    className?: string;
}

/** Not currently used on the site — kept available for a future real attributed quote. */
export function PullQuote({ quote, attribution, className = "" }: PullQuoteProps) {
    return (
        <div className={`relative outline-box p-8 md:p-10 ${className}`}>
            <Quote className="absolute -top-3 left-6 w-6 h-6 text-primary bg-background px-0.5" />
            <p className="text-lg md:text-xl font-display leading-relaxed">{quote}</p>
            <div className="mt-6 ml-auto w-fit outline-box px-4 py-2">
                <p className="text-sm text-muted-foreground">— {attribution}</p>
            </div>
        </div>
    );
}
