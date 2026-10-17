import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Width = "default" | "wide" | "narrow";
const widths: Record<Width, string> = { default: "max-w-7xl", wide: "max-w-[1440px]", narrow: "max-w-4xl" };

export function Container({ width = "default", className, children, ...props }: HTMLAttributes<HTMLDivElement> & { width?: Width }) {
  return <div className={cn("mx-auto w-full px-5 sm:px-8 lg:px-12", widths[width], className)} {...props}>{children}</div>;
}

export function SectionWrapper({ tone = "default", className, children, ...props }: HTMLAttributes<HTMLElement> & { tone?: "default" | "surface" | "lime"; children: ReactNode }) {
  const tones = { default: "bg-[var(--background)] text-[var(--paper-white)]", surface: "bg-[var(--card-surface)] text-[var(--paper-white)]", lime: "bg-[var(--neon-lime)] text-[var(--background)]" };
  return <section className={cn("relative py-20 sm:py-28", tones[tone], className)} {...props}>{children}</section>;
}
