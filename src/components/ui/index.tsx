import type { AnchorHTMLAttributes, ElementType, HTMLAttributes, ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; size?: "sm" | "md"; children: ReactNode };
export function PrimaryButton({ size = "md", className, children, ...props }: ButtonProps) {
  return <a className={cn("type-button inline-flex items-center justify-center gap-2 rounded-full bg-[var(--neon-lime)] text-[var(--background)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--neon-lime)]", size === "sm" ? "min-h-10 px-5" : "min-h-12 px-6", className)} {...props}>{children}</a>;
}
export function OutlineButton({ size = "md", className, children, ...props }: ButtonProps) {
  return <a className={cn("type-button inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] text-[var(--paper-white)] transition-colors hover:border-[var(--neon-lime)] hover:text-[var(--neon-lime)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--neon-lime)]", size === "sm" ? "min-h-10 px-5" : "min-h-12 px-6", className)} {...props}>{children}</a>;
}

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & { as?: "h1" | "h2" | "h3"; children: ReactNode };
export function SectionHeading({ as: Tag = "h2", className, children, ...props }: HeadingProps) {
  return <Tag className={cn("type-section text-4xl sm:text-5xl lg:text-6xl", className)} {...props}>{children}</Tag>;
}
export function BrushHeading({ as: Tag = "h2", className, children, ...props }: HeadingProps) {
  return <Tag className={cn("type-display", className)} {...props}>{children}</Tag>;
}
export function NeonHighlight({ as: Tag = "span", className, children, ...props }: HTMLAttributes<HTMLElement> & { as?: ElementType; children: ReactNode }) {
  return <Tag className={cn("text-[var(--neon-lime)]", className)} {...props}>{children}</Tag>;
}

type EventCardProps = { title: string; category?: string; date?: string; image?: string; href?: string; variant?: "default" | "compact"; className?: string };
export function EventCard({ title, category, date, image, href = "#featured-events", variant = "default", className }: EventCardProps) {
  return <a href={href} className={cn("group block overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card-surface)]", className)}>
    <div className={cn("relative bg-[var(--border)]", variant === "compact" ? "aspect-[16/9]" : "aspect-[4/3]")}>{image && <Image src={image} alt="" fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform group-hover:scale-105" />}</div>
    <div className="p-5">{category && <p className="type-caption mb-3 text-[var(--neon-lime)]">{category}</p>}<h3 className="text-xl font-bold">{title}</h3>{date && <p className="mt-2 text-sm text-[var(--muted-text)]">{date}</p>}</div>
  </a>;
}

type DoodleProps = HTMLAttributes<HTMLSpanElement> & { kind?: "star" | "arrow" | "spark"; size?: number };
export function DecorativeDoodle({ kind = "star", size = 64, className, ...props }: DoodleProps) {
  const paths = { star: <path d="M32 2 38 24 61 17 45 34 62 49 39 44 32 64 25 44 2 49 19 34 3 17 26 24Z" />, arrow: <path d="M4 40C18 18 36 18 56 31M43 17l14 14-16 10" />, spark: <path d="M32 3v58M3 32h58M11 11l42 42M53 11 11 53" /> };
  return <span aria-hidden="true" className={cn("inline-flex text-[var(--neon-lime)]", className)} {...props}><svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">{paths[kind]}</svg></span>;
}

type PolaroidProps = { image: string; alt: string; caption?: string; tilt?: "left" | "right" | "none"; className?: string };
export function PolaroidCard({ image, alt, caption, tilt = "none", className }: PolaroidProps) {
  return <figure className={cn("w-full max-w-xs bg-[var(--paper-white)] p-3 pb-8 text-[var(--background)] shadow-2xl", tilt === "left" && "-rotate-6", tilt === "right" && "rotate-6", className)}>
    <div className="relative aspect-[4/5] bg-[var(--border)]"><Image src={image} alt={alt} fill sizes="(max-width: 640px) 80vw, 320px" className="object-cover" /></div>
    {caption && <figcaption className="type-display pt-5 text-center text-xl">{caption}</figcaption>}
  </figure>;
}
