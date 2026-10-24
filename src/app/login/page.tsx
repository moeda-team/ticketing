import type { Metadata } from "next";
import { LoginPage } from "@/components/auth/login-page";

export const metadata: Metadata = {
  title: "Log in — Ticketly",
  description: "Masuk ke Ticketly untuk mengelola event dan penjualan tiket Anda.",
};

export default function Page() {
  return <LoginPage />;
}
