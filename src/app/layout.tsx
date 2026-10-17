import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ticketly — Events meet possibility",
  description: "Discover events and bring your own to life with Ticketly.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
