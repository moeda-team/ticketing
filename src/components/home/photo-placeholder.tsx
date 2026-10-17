import { ImageOff } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = { label?: string; className?: string; tone?: "pink" | "blue" | "amber" | "green" | "violet" | "orange" };
export function PhotoPlaceholder({ label = "Event photo", className, tone = "green" }: Props) {
  return <div className={cn("photo-placeholder", `photo-${tone}`, className)} role="img" aria-label={`${label} image placeholder`}>
    <div className="photo-placeholder__glow" /><div className="photo-placeholder__grain" />
    <span className="photo-placeholder__label"><ImageOff size={18} strokeWidth={1.5} /><span>{label}</span></span>
  </div>;
}
