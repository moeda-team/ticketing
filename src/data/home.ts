import { Bike, CalendarDays, Camera, ChartNoAxesCombined, CheckCheck, Flower2, Handshake, Mic2, ScanLine, ShieldCheck, Sparkles, Ticket, Users, Workflow } from "lucide-react";

export const categories = [
  { name: "Music & Concert", icon: Mic2, tone: "pink" },
  { name: "Running & Sports", icon: Bike, tone: "blue" },
  { name: "Conference & Seminar", icon: Users, tone: "amber" },
  { name: "Festival & Exhibition", icon: Sparkles, tone: "green" },
  { name: "Workshop & Class", icon: Camera, tone: "violet" },
  { name: "Community & Other", icon: Handshake, tone: "orange" },
] as const;

export const benefits = [
  { title: "For Any Event", description: "From small to large scale", icon: CalendarDays },
  { title: "All-in-One Platform", description: "Create, sell, manage", icon: Ticket },
  { title: "Reach More People", description: "Marketplace & your own page", icon: Flower2 },
  { title: "Trusted & Secure", description: "Reliable ticketing system", icon: ShieldCheck },
] as const;

export const steps = [
  { number: "01", title: "Create Your Event", description: "Set up details, schedule, location, and event page.", icon: CalendarDays },
  { number: "02", title: "Set Up Tickets", description: "Define ticket types, pricing, and quotas.", icon: Ticket },
  { number: "03", title: "Publish & Sell", description: "Share your event and reach more audiences.", icon: Workflow },
  { number: "04", title: "Manage & Check-in", description: "Track orders, attendees, and scan tickets on-site.", icon: ScanLine },
] as const;

export const platformFeatures = [
  "Flexible ticket types & pricing", "Attendee management", "Real-time analytics", "Custom registration forms", "Team collaboration", "And many more..."
] as const;

export const plans = [
  { name: "Starter", badge: "", description: "For your first event", features: ["Core event tools", "Ticket setup", "Event page"], action: "Explore Starter" },
  { name: "Pro", badge: "Popular", description: "For growing organizers", features: ["Advanced tools", "Team collaboration", "More customization"], action: "Explore Pro" },
  { name: "Custom", badge: "", description: "Tailored to your needs", features: ["Custom features", "Dedicated support", "Flexible setup"], action: "Contact Us" },
] as const;

export const dashboardNav = [
  { label: "Dashboard", icon: ChartNoAxesCombined },
  { label: "Events", icon: CalendarDays },
  { label: "Tickets", icon: Ticket },
  { label: "Orders", icon: CheckCheck },
  { label: "Attendees", icon: Users },
] as const;
