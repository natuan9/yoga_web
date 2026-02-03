import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
    return (
        <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)} {...props}>
            {children}
        </div>
    );
}

interface SectionProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
    variant?: "default" | "alt" | "primary";
}

export function Section({ children, className, variant = "default", ...props }: SectionProps) {
    const variants = {
        default: "bg-brand-bg",
        alt: "bg-white",
        primary: "bg-primary/10",
    };

    return (
        <section className={cn("py-16 md:py-24", variants[variant], className)} {...props}>
            {children}
        </section>
    );
}
