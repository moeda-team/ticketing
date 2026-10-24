"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  ArrowDownRight,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Crown,
  MapPin,
  Menu,
  Search,
  Smile,
  Star,
  Ticket,
  Users,
} from "lucide-react";
import { Container } from "@/components/layout";
import {
  BrushHeading,
  DecorativeDoodle,
  OutlineButton,
  PrimaryButton,
} from "@/components/ui";
import {
  benefits,
  categories,
  dashboardNav,
  plans,
  platformFeatures,
  steps,
} from "@/data/home";
import { PhotoPlaceholder } from "./photo-placeholder";

function Brand() {
  return (
    <a href="#top" className="brand" aria-label="Ticketly home">
      <span className="brand-mark">
        <Ticket size={18} strokeWidth={3} />
      </span>
      <span>ticketly</span>
    </a>
  );
}

function Navbar() {
  return (
    <header className="site-header">
      <Container className="site-header__inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#events">Events</a>
          <a href="#platform">Solutions</a>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#footer">Resources</a>
        </nav>
        <div className="header-actions">
          <a
            className="header-search"
            href="#events"
            aria-label="Search events"
          >
            <Search size={20} />
          </a>
          <span className="header-login" aria-disabled="true">
            Log in
          </span>
          <a className="header-start" href="#pricing">
            Get Started <ArrowRight size={16} />
          </a>
        </div>
        <details className="mobile-menu">
          <summary aria-label="Open menu">
            <Menu size={23} />
          </summary>
          <nav aria-label="Mobile navigation">
            <a href="#events">Events</a>
            <a href="#platform">Solutions</a>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#footer">Resources</a>
          </nav>
        </details>
      </Container>
    </header>
  );
}

function Scribble({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="96"
      height="55"
      viewBox="0 0 96 55"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 39c25 5 43-2 57-23M50 12l10 4-1 11M65 42c11-5 18-13 27-31"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function observeReplay(
  target: Element,
  timeline: gsap.core.Timeline,
  rootMargin = "0px 0px -12% 0px",
) {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) timeline.restart();
    else timeline.pause(0);
  }, { rootMargin });

  observer.observe(target);
  return () => observer.disconnect();
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const polaroidRefs = useRef<HTMLDivElement[]>([]);
  const entranceComplete = useRef(false);

  useLayoutEffect(() => {
    const cards = polaroidRefs.current.filter(Boolean);
    if (!cards.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!supportsHover) return;

    const originalRotations = [4, -13, 10, -8];
    const cleanups = cards.map((card, index) => {
      const rotateXTo = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3.out" });
      const rotateYTo = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3.out" });
      const cardRotation = originalRotations[index] ?? 0;

      gsap.set(card, { transformPerspective: 800, transformOrigin: "center center" });

      const onEnter = () => {
        if (!entranceComplete.current) return;
        gsap.to(card, {
          y: -18,
          scale: 1.06,
          rotation: 0,
          duration: 0.4,
          ease: "power3.out",
          zIndex: 20,
          boxShadow: "0 28px 36px rgba(0,0,0,.6), 0 0 18px rgba(215,255,67,.18)",
          overwrite: "auto",
        });
      };

      const onMove = (event: PointerEvent) => {
        if (!entranceComplete.current) return;
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        rotateYTo(x * 6);
        rotateXTo(y * -6);
      };

      const onLeave = () => {
        if (!entranceComplete.current) return;
        gsap.to(card, {
          y: 0,
          scale: 1,
          rotation: cardRotation,
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: "power3.out",
          zIndex: "auto",
          boxShadow: "0 17px 22px rgba(0,0,0,.6)",
          overwrite: "auto",
        });
      };

      card.addEventListener("pointerenter", onEnter);
      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
      return () => {
        card.removeEventListener("pointerenter", onEnter);
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
        gsap.killTweensOf(card);
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let observer: IntersectionObserver | undefined;
    const ctx = gsap.context(() => {
      entranceComplete.current = false;
      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        paused: true,
        onComplete: () => { entranceComplete.current = true; },
      });

      // Reset every entrance property before building the timeline. This keeps
      // refreshes and React Strict Mode remounts from reusing stale transforms.
      gsap.killTweensOf(hero.querySelectorAll([
        ".hero-copy",
        ".hero-art__wash",
        ".hero-art__paper--one",
        ".hero-art__paper--two",
        ".polaroid",
        ".hero-note",
        ".hero-scribble",
        ".hero-spark",
      ].join(", ")));
      gsap.set(".polaroid--main", { autoAlpha: 0, x: 0, y: -420, rotate: 12, scale: 0.88 });
      gsap.set(".polaroid--left", { autoAlpha: 0, x: -420, y: 0, rotate: -22, scale: 0.88 });
      gsap.set(".polaroid--right", { autoAlpha: 0, x: 420, y: 0, rotate: 20, scale: 0.88 });
      gsap.set(".polaroid--small", { autoAlpha: 0, x: 0, y: 420, rotate: -18, scale: 0.88 });

      timeline
        .fromTo(".hero-copy", { autoAlpha: 0, x: -70, y: 18, filter: "blur(8px)" }, { autoAlpha: 1, x: 0, y: 0, filter: "blur(0px)", duration: 0.85 }, 0)
        .fromTo(".hero-art__wash", { autoAlpha: 0, scale: 0.72, rotate: -25 }, { autoAlpha: 1, scale: 1, rotate: -12, duration: 0.9 })
        .fromTo(".hero-art__paper--one", { autoAlpha: 0, x: -120, y: 55, rotate: -12 }, { autoAlpha: 0.5, x: 0, y: 0, rotate: 14, duration: 0.75 }, "<0.08")
        .fromTo(".hero-art__paper--two", { autoAlpha: 0, x: 120, y: 65, rotate: -38 }, { autoAlpha: 0.5, x: 0, y: 0, rotate: -24, duration: 0.75 }, "<0.12")
        .fromTo(".polaroid--main", { autoAlpha: 0, x: 0, y: -420, rotate: 12, scale: 0.88 }, { autoAlpha: 1, x: 0, y: 0, rotate: 4, scale: 1, zIndex: 4, duration: 0.82, ease: "back.out(1.12)", overwrite: "auto" }, 0)
        .fromTo(".polaroid--left", { autoAlpha: 0, x: -420, y: 0, rotate: -22, scale: 0.88 }, { autoAlpha: 1, x: 0, y: 0, rotate: -13, scale: 1, zIndex: 3, duration: 0.82, ease: "back.out(1.12)", overwrite: "auto" }, 0)
        .fromTo(".polaroid--right", { autoAlpha: 0, x: 420, y: 0, rotate: 20, scale: 0.88 }, { autoAlpha: 1, x: 0, y: 0, rotate: 10, scale: 1, zIndex: 5, duration: 0.82, ease: "back.out(1.12)", overwrite: "auto" }, 0)
        .fromTo(".polaroid--small", { autoAlpha: 0, x: 0, y: 420, rotate: -18, scale: 0.88 }, { autoAlpha: 1, x: 0, y: 0, rotate: -8, scale: 1, zIndex: 3, duration: 0.78, ease: "back.out(1.1)", overwrite: "auto" }, 0)
        .fromTo(".hero-note", { autoAlpha: 0, x: 75, y: -35, rotate: 14, scale: 0.8 }, { autoAlpha: 1, x: 0, y: 0, rotate: -6, scale: 1, duration: 0.6 }, "<0.1")
        .fromTo(".hero-scribble, .hero-spark", { autoAlpha: 0, x: -50, y: 35, scale: 0.5 }, { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.55, stagger: 0.08 }, "<0.08")
        .fromTo(".hero-benefits .benefit", { autoAlpha: 0, y: 30, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.1 }, "-=0.2");

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          timeline.restart();
        } else {
          entranceComplete.current = false;
          timeline.pause(0);
        }
      });
      observer.observe(hero);
    }, hero);

    return () => {
      observer?.disconnect();
      entranceComplete.current = false;
      ctx.revert();
    };
  }, []);

  return (
      <section ref={heroRef} id="top" className="hero">
      <Container>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-kicker">
              <Crown size={32} strokeWidth={1.8} /> One platform. Every event.
            </p>
            <BrushHeading as="h1" className="hero-title">
              Turn
              <br />
              <span>any event</span>
              <br />
              into real
              <br />
              moments
            </BrushHeading>
            <span className="hero-title-star">
              <DecorativeDoodle kind="star" size={50} />
            </span>
            <p className="hero-description">
              Create, manage, sell tickets, and reach more people — from
              concerts and sports to workshops and private events.
            </p>
            <div className="hero-buttons">
              <PrimaryButton href="#pricing">
                Start Your Event <ArrowRight size={18} />
              </PrimaryButton>
              <OutlineButton href="#events">Explore Events</OutlineButton>
            </div>
          </div>
          <div className="hero-art" aria-label="Event photography collage">
            <div className="hero-art__wash" aria-hidden="true" />
            <div className="hero-art__paper hero-art__paper--one" aria-hidden="true" />
            <div className="hero-art__paper hero-art__paper--two" aria-hidden="true" />
            <div ref={(node) => { if (node) polaroidRefs.current[0] = node; }} className="polaroid polaroid--main">
              <div className="polaroid__photo">
                <Image
                  src="/images/concert-crowd.png"
                  alt="Crowd at a concert"
                  fill
                  priority
                  sizes="(max-width: 768px) 60vw, 410px"
                  className="object-cover"
                />
              </div>
              <span>Concert & live music</span>
            </div>
            <div ref={(node) => { if (node) polaroidRefs.current[1] = node; }} className="polaroid polaroid--left">
              <PhotoPlaceholder label="Running event" tone="blue" />
              <span>Running event</span>
            </div>
            <div ref={(node) => { if (node) polaroidRefs.current[2] = node; }} className="polaroid polaroid--right">
              <PhotoPlaceholder label="Seminar & conference" tone="violet" />
              <span>Seminar & conference</span>
            </div>
            <div ref={(node) => { if (node) polaroidRefs.current[3] = node; }} className="polaroid polaroid--small">
              <PhotoPlaceholder label="Festival & exhibition" tone="orange" />
              <span>Festival & exhibition</span>
            </div>
            <div className="hero-note">
              Good
              <br />
              events
              <br />
              bring
              <br />
              good
              <br />
              people <Smile size={29} />
            </div>
            <Scribble className="hero-scribble" />
            <DecorativeDoodle kind="spark" size={35} className="hero-spark" />
          </div>
        </div>
        <div className="hero-benefits">
          {benefits.map(({ title, description, icon: Icon }) => (
            <div className="benefit" key={title}>
              <Icon size={31} strokeWidth={1.8} />
              <strong>{title}</strong>
              <span>{description}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function SectionIntro({
  eyebrow,
  title,
  accent,
  description,
  className = "",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={`section-intro ${className}`}>
      <span className="eyebrow">{eyebrow}</span>
      <BrushHeading className="section-intro__title">
        {title}
        {accent && (
          <>
            <br />
            <em>{accent}</em>
          </>
        )}
      </BrushHeading>
      {description && <p>{description}</p>}
    </div>
  );
}

function Categories() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const intro = section.querySelector<HTMLElement>(".section-intro");
    const grid = section.querySelector<HTMLElement>(".category-grid");
    const cards = grid?.querySelectorAll<HTMLElement>(".category-card");
    if (!intro || !grid || !cards?.length) return;

    const introTween = gsap.fromTo(intro,
      { autoAlpha: 0, y: 28 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out", paused: true },
    );
    const cardsTween = gsap.fromTo(cards,
      { autoAlpha: 0, x: 72 },
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.72,
        stagger: 0.12,
        ease: "power3.out",
        paused: true,
        onComplete: () => gsap.set(cards, { clearProps: "transform" }),
      },
    );

    const introObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        introTween.restart();
      } else {
        introTween.pause(0);
      }
    });
    const gridObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        cardsTween.restart();
      } else {
        cardsTween.pause(0);
      }
    }, { rootMargin: "0px 0px -10% 0px" });

    introObserver.observe(section);
    gridObserver.observe(grid);
    return () => {
      introObserver.disconnect();
      gridObserver.disconnect();
      introTween.revert();
      cardsTween.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="events" className="section categories-section">
      <Container>
        <div className="categories-layout">
          <SectionIntro
            eyebrow="Explore"
            title="Events"
            accent="for every passion"
            description="Discover events that match your interests."
          />
          <div className="categories-content">
            <div className="section-top-action">
              <OutlineButton href="#featured" size="sm">
                View All Categories <ArrowRight size={16} />
              </OutlineButton>
            </div>
            <div className="category-grid">
              {categories.map(({ name, icon: Icon, tone }) => (
                <a className="category-card" href="#featured" key={name}>
                  <PhotoPlaceholder label={name} tone={tone} />
                  <div className="category-card__bottom">
                    <Icon size={17} />
                    <span>{name}</span>
                    <span className="circle-arrow">
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function DashboardMock() {
  return (
    <div className="dashboard-scene" aria-label="Ticketly dashboard preview">
      <div className="dashboard-backdrop" />
      <div className="dashboard-screen">
        <div className="dashboard-sidebar">
          <Brand />
          {dashboardNav.map(({ label, icon: Icon }, index) => (
            <div
              className={`dashboard-nav-item ${index === 0 ? "active" : ""}`}
              key={label}
            >
              <Icon size={12} />
              {label}
            </div>
          ))}
        </div>
        <div className="dashboard-main">
          <div className="dashboard-top">
            <span>Overview</span>
            <span>Demo preview</span>
          </div>
          <div className="dashboard-heading">
            <strong>Event Overview</strong>
            <span>Create Event +</span>
          </div>
          <div className="dashboard-stat-grid">
            <div>
              <small>Total Sales</small>
              <b>—</b>
              <i>Analytics preview</i>
            </div>
            <div>
              <small>Tickets Sold</small>
              <b>—</b>
              <i>Analytics preview</i>
            </div>
            <div>
              <small>Attendees</small>
              <b>—</b>
              <i>Analytics preview</i>
            </div>
          </div>
          <div className="dashboard-lower">
            <div className="dashboard-chart">
              <div className="dashboard-chart__title">
                Sales Overview <span>6 months</span>
              </div>
              <svg
                viewBox="0 0 400 110"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0 98 48 92 88 78 124 84 160 57 205 67 243 52 284 58 316 38 354 44 400 15"
                  fill="none"
                  stroke="#D7FF43"
                  strokeWidth="2"
                />
              </svg>
              <div className="chart-grid" />
            </div>
            <div className="dashboard-orders">
              <strong>Recent Orders</strong>
              <span>Order preview</span>
              <span>Order preview</span>
              <span>Order preview</span>
            </div>
          </div>
        </div>
      </div>
      <div className="phone-mock">
        <div className="phone-notch" />
        <div className="phone-photo">
          <Image
            src="/images/concert-crowd.png"
            alt="Concert ticket preview"
            fill
            sizes="120px"
            className="object-cover"
          />
        </div>
        <div className="phone-ticket">
          <Ticket size={28} />
          <div className="phone-qr" aria-hidden="true" />
          <span>
            EVENT TICKET
            <br />
            <small>Demo ticket preview</small>
          </span>
        </div>
      </div>
    </div>
  );
}

function Platform() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const art = section.querySelector<HTMLElement>(".platform-art");
    const copy = section.querySelector<HTMLElement>(".platform-copy");
    if (!art || !copy) return;

    const ctx = gsap.context(() => {
      const artTimeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } })
        .fromTo(".dashboard-screen", { autoAlpha: 0, x: -100, y: 28, scale: 0.93 }, { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.95 }, 0)
        .fromTo(".phone-mock", { autoAlpha: 0, x: -95, y: 55, scale: 0.82 }, { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.8 }, 0.2)
        .fromTo(".platform-sales-card, .platform-checkin-card", { autoAlpha: 0, y: -35, scale: 0.85 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.13, ease: "back.out(1.2)" }, 0.48)
        .fromTo(".platform-side-note, .platform-scan-note, .platform-art-note, .platform-polaroids", { autoAlpha: 0, y: 35, scale: 0.86 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.1 }, 0.55);

      const copyTimeline = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } })
        .fromTo(".platform-sticker", { autoAlpha: 0, x: 55, rotate: 3 }, { autoAlpha: 1, x: 0, rotate: -4, duration: 0.6 }, 0)
        .fromTo(".platform-title > *", { autoAlpha: 0, x: 75 }, { autoAlpha: 1, x: 0, duration: 0.65, stagger: 0.09 }, 0.12)
        .fromTo(".platform-copy > p", { autoAlpha: 0, x: 45 }, { autoAlpha: 1, x: 0, duration: 0.55 }, 0.52)
        .fromTo(".platform-copy li", { autoAlpha: 0, x: 48 }, { autoAlpha: 1, x: 0, duration: 0.46, stagger: 0.07 }, 0.6)
        .fromTo(".platform-copy > a, .platform-signoff", { autoAlpha: 0, y: 25 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.12 }, 1);

      const artObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) artTimeline.restart();
        else artTimeline.pause(0);
      }, { rootMargin: "0px 0px -12% 0px" });
      const copyObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) copyTimeline.restart();
        else copyTimeline.pause(0);
      }, { rootMargin: "0px 0px -12% 0px" });

      artObserver.observe(art);
      copyObserver.observe(copy);
      return () => {
        artObserver.disconnect();
        copyObserver.disconnect();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="platform" className="section platform-section">
      <Container width="wide">
        <div className="platform-grid">
          <div className="platform-art">
            <span className="platform-side-note">
              Powerful
              <br />
              tools for
              <br />
              unforgettable
              <br />
              events
            </span>
            <DashboardMock />
            <div className="platform-sales-card" aria-hidden="true">
              <span>▥</span>
              <div><small>Live Sales</small><strong>—</strong></div>
              <small className="platform-live-dot">Live</small>
            </div>
            <div className="platform-checkin-card" aria-hidden="true">
              <Users size={28} />
              <div><small>Check-in Success</small><strong>—</strong><small>Attendees checked in</small></div>
            </div>
            <div className="platform-art-note" aria-hidden="true">Manage<br />sell<br />grow<br />all in one place</div>
            <div className="platform-polaroids" aria-hidden="true">
              <div className="platform-mini-photo platform-mini-photo--conference"><span>Conference</span></div>
              <div className="platform-mini-photo platform-mini-photo--festival"><span>Festival</span></div>
            </div>
            <span className="platform-scan-note" aria-hidden="true">Scan<br />check-in<br />easy!</span>
          </div>
          <div id="features" className="platform-copy">
            <span className="platform-sticker">All-in-one platform</span>
            <BrushHeading className="platform-title">
              <span>Make event</span>
              <em>management</em>
              <span>Simple &</span>
              <span>powerful</span>
            </BrushHeading>
            <p>
              Everything you need from event creation to check-in, in one place.
            </p>
            <ul>
              {platformFeatures.map((feature) => (
                <li key={feature}>
                  <Check size={17} />
                  {feature}
                </li>
              ))}
            </ul>
            <PrimaryButton href="#pricing">
              Explore Features <ArrowRight size={18} />
            </PrimaryButton>
            <span className="platform-signoff">
              Your
              <br />
              event
              <br />
              your
              <br />
              style <ArrowDownRight size={30} />
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}

function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let stopObserving: (() => void) | undefined;
    const ctx = gsap.context(() => {
      const copy = section.querySelector<HTMLElement>(".how-grid > div:first-child");
      const steps = section.querySelectorAll<HTMLElement>(".step");
      if (!copy || !steps.length) return;

      gsap.killTweensOf([copy, ...steps]);
      const timeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } })
        .fromTo(copy, { autoAlpha: 0, x: -70, rotate: -2 }, { autoAlpha: 1, x: 0, rotate: 0, duration: 0.75 }, 0)
        .fromTo(steps, { autoAlpha: 0, y: 70, scale: 0.9 }, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.13,
          ease: "back.out(1.15)",
        }, 0.16);

      stopObserving = observeReplay(section, timeline);
    }, section);

    return () => {
      stopObserving?.();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="how-section">
      <Container>
        <div className="how-grid">
          <div>
            <span className="eyebrow">How it works</span>
            <BrushHeading className="how-title">
              From idea
              <br />
              to sold out
            </BrushHeading>
            <p>Create your event in just a few simple steps.</p>
          </div>
          <div className="steps-grid">
            {steps.map(({ number, title, description, icon: Icon }, index) => (
              <div className="step" key={number}>
                <div className="step-icon">
                  <Icon size={24} />
                </div>
                <span className="step-number">{number}</span>
                <strong>{title}</strong>
                <p>{description}</p>
                {index < steps.length - 1 && (
                  <ArrowRight
                    className="step-arrow"
                    size={30}
                    strokeWidth={1.3}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Featured() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const filters = ["All Events", "Concert", "Running", "Conference", "Workshop", "Festival"] as const;
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All Events");
  const visibleCategories = activeFilter === "All Events"
    ? categories.slice(0, 4)
    : categories.filter(({ name }) => name.includes(activeFilter));

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let stopObserving: (() => void) | undefined;
    const ctx = gsap.context(() => {
      const intro = section.querySelector<HTMLElement>(".section-intro");
      const controls = section.querySelector<HTMLElement>(".featured-controls");
      if (!intro || !controls) return;

      gsap.killTweensOf([intro, controls]);
      const timeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } })
        .fromTo(intro, { autoAlpha: 0, x: -64 }, { autoAlpha: 1, x: 0, duration: 0.72 }, 0)
        .fromTo(controls, { autoAlpha: 0, x: 64 }, { autoAlpha: 1, x: 0, duration: 0.72 }, 0.08);

      stopObserving = observeReplay(section, timeline, "0px 0px -8% 0px");
    }, section);

    return () => {
      stopObserving?.();
      ctx.revert();
    };
  }, []);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = grid.querySelectorAll<HTMLElement>(".event-tile");
    if (!cards.length) return;

    gsap.killTweensOf(cards);
    const tween = gsap.fromTo(cards,
      { autoAlpha: 0, y: 58, rotate: (index) => index % 2 === 0 ? -2 : 2, scale: 0.94 },
      {
        autoAlpha: 1,
        y: 0,
        rotate: 0,
        scale: 1,
        duration: 0.68,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform",
      },
    );

    return () => {
      tween.revert();
    };
  }, [activeFilter]);

  return (
    <section ref={sectionRef} id="featured" className="section featured-section">
      <Container>
        <div className="featured-header">
          <SectionIntro
            eyebrow="Featured events"
            title="What's"
            accent="happening"
            description="Explore upcoming events from amazing organizers."
          />
          <div className="featured-controls">
            <div className="filter-list">
              {filters.map((filter) => (
                <button
                  type="button"
                  className={activeFilter === filter ? "active" : undefined}
                  aria-pressed={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                  key={filter}
                >
                  {filter}
                </button>
              ))}
            </div>
            <OutlineButton href="#events" size="sm">
              View All Events <ArrowRight size={16} />
            </OutlineButton>
          </div>
        </div>
        <div className="event-grid" ref={gridRef}>
          {visibleCategories.map(({ name, tone, icon: Icon }) => (
            <article className="event-tile" key={name}>
              <PhotoPlaceholder label={name} tone={tone} />
              <div className="event-tile__info">
                <div className="event-tile__date">
                  <Icon size={20} />
                  <span>
                    Date
                    <br />
                    TBA
                  </span>
                </div>
                <div>
                  <strong>{name}</strong>
                  <small>Location to be announced</small>
                </div>
              </div>
              <div className="event-tile__bottom">
                <span>Details coming soon</span>
                <span className="circle-arrow">
                  <ArrowRight size={17} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const reviews = [
    {
      name: "Dimas Setiawan",
      initials: "DS",
      quote: "Proses pembuatan undangan digitalnya sangat mudah dan hasilnya premium. Tamu juga suka bisa langsung upload foto dari acara.",
      event: "The Wedding of Aldi & Sinta",
      date: "12 Oct 2026",
      location: "Jakarta, Indonesia",
      tone: "wedding",
    },
    {
      name: "Nadia Putri",
      initials: "NP",
      quote: "Fitur photo sharing-nya benar-benar membantu mengumpulkan semua momen dari tamu. Setting-nya gampang dan support-nya responsif banget.",
      event: "Jakarta Music Festival 2026",
      date: "20 Aug 2026",
      location: "GBK, Jakarta",
      tone: "concert",
    },
    {
      name: "Rizky Maulana",
      initials: "RM",
      quote: "Sistem tiketnya rapi, proses check-in jadi lebih cepat, dan tamu sangat terbantu dengan QR. Recommended banget untuk event besar maupun kecil.",
      event: "Tech Summit Indonesia 2026",
      date: "28 Oct 2026",
      location: "ICE BSD, Tangerang",
      tone: "conference",
    },
    {
      name: "Sari Lestari",
      initials: "SL",
      quote: "Desain undangannya keren dan banyak pilihan. Timnya juga sangat membantu dari awal sampai hari acara.",
      event: "Garden Party",
      date: "15 Jun 2026",
      location: "Bandung",
      tone: "garden",
    },
  ] as const;
  const [activeReview, setActiveReview] = useState(0);
  const reviewTrackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let stopObserving: (() => void) | undefined;
    const ctx = gsap.context(() => {
      const intro = section.querySelector<HTMLElement>(".proof-intro");
      const viewAll = section.querySelector<HTMLElement>(".proof-view-all");
      const cards = section.querySelectorAll<HTMLElement>(".review-card");
      if (!intro || !viewAll || !cards.length) return;

      gsap.killTweensOf([intro, viewAll, ...cards]);
      const timeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } })
        .fromTo(intro, { autoAlpha: 0, x: -72 }, { autoAlpha: 1, x: 0, duration: 0.72 }, 0)
        .fromTo(viewAll, { autoAlpha: 0, y: -24 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.14)
        .fromTo(cards, { autoAlpha: 0, x: 110, rotate: 1.5 }, {
          autoAlpha: 1,
          x: 0,
          rotate: 0,
          duration: 0.72,
          stagger: 0.11,
        }, 0.18);

      stopObserving = observeReplay(section, timeline);
    }, section);

    return () => {
      stopObserving?.();
      ctx.revert();
    };
  }, []);

  const showReview = (index: number) => {
    const nextIndex = (index + reviews.length) % reviews.length;
    const track = reviewTrackRef.current;
    const card = track?.querySelector<HTMLElement>(".review-card");

    setActiveReview(nextIndex);
    if (track && card) {
      const gap = Number.parseFloat(getComputedStyle(track).columnGap || "0");
      track.scrollTo({ left: nextIndex * (card.offsetWidth + gap), behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} id="reviews" className="section proof-section">
      <Container>
        <a className="proof-view-all" href="#reviews">
          View all reviews <ArrowRight size={18} />
        </a>
        <div className="proof-grid">
          <div className="proof-intro">
            <SectionIntro
              eyebrow="Our community"
              title="Trusted by"
              accent="event organizers"
              description="Real stories from event organizers who have used our platform to create unforgettable experiences."
            />
            <div className="proof-navigation">
              <button type="button" onClick={() => showReview(activeReview - 1)} aria-label="Previous review">
                <ChevronLeft size={22} />
              </button>
              <button type="button" onClick={() => showReview(activeReview + 1)} aria-label="Next review">
                <ChevronRight size={22} />
              </button>
              <span>{activeReview + 1} / {reviews.length}</span>
            </div>
          </div>
          <div className="review-track" ref={reviewTrackRef}>
            {reviews.map((review) => (
              <article className="review-card" key={review.name}>
                <div className="review-card__header">
                  <span className={`review-avatar review-avatar--${review.tone}`}>{review.initials}</span>
                  <div className="review-person">
                    <strong>{review.name}</strong>
                    <span>Event Organizer</span>
                  </div>
                  <div className="review-rating" aria-label="5 out of 5 stars">
                    <span>{Array.from({ length: 5 }, (_, index) => <Star size={14} fill="currentColor" key={index} />)}</span>
                    <small>5.0</small>
                  </div>
                </div>
                <blockquote>“{review.quote}”</blockquote>
                <div className="review-event">
                  <div className={`review-event__image review-event__image--${review.tone}`} aria-hidden="true">
                    <span>{review.event}</span>
                  </div>
                  <div className="review-event__details">
                    <strong>{review.event}</strong>
                    <span><CalendarDays size={15} /> {review.date}</span>
                    <span><MapPin size={15} /> {review.location}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let stopObserving: (() => void) | undefined;
    const ctx = gsap.context(() => {
      const intro = section.querySelector<HTMLElement>(".section-intro");
      const cards = section.querySelectorAll<HTMLElement>(".pricing-card");
      if (!intro || !cards.length) return;

      gsap.killTweensOf([intro, ...cards]);
      const timeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } })
        .fromTo(intro, { autoAlpha: 0, y: 48 }, { autoAlpha: 1, y: 0, duration: 0.68 }, 0)
        .fromTo(cards, {
          autoAlpha: 0,
          y: (index) => index === 1 ? 76 : 52,
          scale: (index) => index === 1 ? 0.86 : 0.94,
          rotate: (index) => index === 0 ? -2 : index === 2 ? 2 : 0,
        }, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 0.72,
          stagger: 0.13,
          ease: "back.out(1.12)",
        }, 0.16);

      stopObserving = observeReplay(section, timeline);
    }, section);

    return () => {
      stopObserving?.();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="section pricing-section">
      <Container>
        <div className="pricing-grid">
          <SectionIntro
            eyebrow="Flexible plans"
            title="Simple pricing"
            accent="built to scale"
            description="Choose the plan that fits your needs. Contact us for current pricing."
          />
          <div className="pricing-cards">
            {plans.map(({ name, badge, description, features, action }) => (
              <div
                className={`pricing-card ${badge ? "pricing-card--featured" : ""}`}
                key={name}
              >
                {badge && <span className="pricing-badge">{badge}</span>}
                <h3>{name}</h3>
                <p className="pricing-card__price">Pricing on request</p>
                <span className="pricing-card__description">{description}</span>
                <ul>
                  {features.map((feature) => (
                    <li key={feature}>
                      <Check size={17} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#final-cta"
                  className={
                    badge
                      ? "pricing-card__button is-primary"
                      : "pricing-card__button"
                  }
                >
                  {action} <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let stopObserving: (() => void) | undefined;
    const ctx = gsap.context(() => {
      const doodle = section.querySelector<SVGElement>(".cta-strip__heading > svg");
      const heading = section.querySelector<HTMLElement>(".cta-strip h2");
      const content = section.querySelector<HTMLElement>(".cta-strip__content");
      if (!heading || !content) return;

      gsap.killTweensOf([doodle, heading, content].filter(Boolean));
      const timeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } })
        .fromTo(heading, { autoAlpha: 0, x: -90 }, { autoAlpha: 1, x: 0, duration: 0.72 }, 0)
        .fromTo(content, { autoAlpha: 0, x: 90 }, { autoAlpha: 1, x: 0, duration: 0.72 }, 0.08);

      if (doodle) {
        timeline.fromTo(doodle,
          { autoAlpha: 0, scale: 0.45, rotate: -38 },
          { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.58, ease: "back.out(1.7)" },
          0.34,
        );
      }

      stopObserving = observeReplay(section, timeline, "0px 0px -6% 0px");
    }, section);

    return () => {
      stopObserving?.();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="final-cta" className="cta-section">
      <Container>
        <div className="cta-strip">
          <div className="cta-strip__heading">
            <DecorativeDoodle kind="arrow" size={50} />
            <BrushHeading>
              Ready to launch
              <br />
              your next event?
            </BrushHeading>
          </div>
          <div className="cta-strip__content">
            <p>Bring people together and create something unforgettable.</p>
            <div className="cta-strip__actions">
              <a href="#pricing">
                Get Started <ArrowRight size={16} />
              </a>
              <span className="cta-contact" aria-disabled="true">
                Contact Us
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer id="footer" className="footer">
      <Container>
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>
              Events bring people together.
              <br />
              We make it happen.
            </p>
          </div>
          <div>
            <strong>Product</strong>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#platform">Platform</a>
          </div>
          <div>
            <strong>Solutions</strong>
            <a href="#events">Concert & Festival</a>
            <a href="#events">Running & Sports</a>
            <a href="#events">Conference</a>
            <a href="#events">Workshop</a>
          </div>
          <div>
            <strong>Resources</strong>
            <a href="#how-it-works">How it works</a>
            <a href="#featured">Explore events</a>
          </div>
          <div>
            <strong>Company</strong>
            <a href="#final-cta">Contact</a>
            <a href="#top">About</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Ticketly. All rights reserved.</span>
          <span>Built for moments that matter.</span>
        </div>
      </Container>
    </footer>
  );
}

export function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <Platform />
        <HowItWorks />
        <Featured />
        <SocialProof />
        <Pricing />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
