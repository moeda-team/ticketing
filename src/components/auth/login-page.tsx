"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, Ticket } from "lucide-react";
import { FormEvent, useState } from "react";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <main className="login-page">
      <section className="login-showcase" aria-label="Ticketly event platform">
        <Image
          className="login-showcase__image"
          src="/images/concert-crowd.png"
          alt="Crowd enjoying a live concert"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 57vw"
        />
        <div className="login-showcase__shade" />
        <Link className="login-brand" href="/" aria-label="Back to Ticketly home">
          <span className="login-brand__mark"><Ticket size={22} strokeWidth={3} /></span>
          <span>ticketly</span>
        </Link>

        <div className="login-showcase__copy">
          <p className="login-showcase__eyebrow">Events for every passion</p>
          <h1>
            Turn <span>any event</span><br />
            into real<br />moments
          </h1>
          <p className="login-showcase__caption">
            Dari penjualan tiket, check-in, hingga laporan, semua dalam satu platform.
          </p>
        </div>

        <div className="login-showcase__perks" aria-label="Ticketly benefits">
          <span><Ticket size={20} /> Mudah dikelola</span>
          <span><span className="login-bars" aria-hidden="true">▥</span> Laporan real-time</span>
          <span><LockKeyhole size={20} /> Aman dan terpercaya</span>
        </div>
      </section>

      <section className="login-panel">
        <div className="login-card">
          <p className="login-welcome">Welcome back</p>
          <h2>Masuk ke <span>Ticketly</span></h2>
          <p className="login-intro">
            Lanjutkan untuk mengelola event, memantau penjualan tiket, dan melihat semua data Anda.
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <div className="login-field">
              <Mail size={19} aria-hidden="true" />
              <input id="email" name="email" type="email" autoComplete="email" placeholder="nama@perusahaan.com" required />
            </div>

            <div className="login-label-row">
              <label htmlFor="password">Password</label>
            </div>
            <div className="login-field">
              <LockKeyhole size={19} aria-hidden="true" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Masukkan password"
                required
              />
              <button
                className="login-password-toggle"
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
            <a className="login-forgot" href="#">Lupa password?</a>

            <button className="login-submit" type="submit">
              Masuk <ArrowRight size={21} />
            </button>
          </form>

          <div className="login-divider"><span>atau masuk dengan</span></div>
          <button className="login-google" type="button">
            <span className="google-mark" aria-hidden="true">G</span>
            Masuk dengan Google
          </button>
          <p className="login-help">Belum punya akun? <a href="mailto:admin@ticketly.id">Hubungi administrator</a></p>
        </div>
      </section>
    </main>
  );
}
