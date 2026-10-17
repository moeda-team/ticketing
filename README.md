# Ticketly landing page

A responsive Next.js App Router landing page based on the supplied visual reference. It uses TypeScript, Tailwind CSS, Lucide React, a local Knewave brush font, and a local DM Sans body font. GSAP and ScrollTrigger are installed and prepared but no animations have been added.

## Run locally

```bash
npm install
npm run dev
```

Check with `npm run lint` and `npm run build`.

## Assets and content

The single generated event photo is `public/images/concert-crowd.png`. Other image slots use the reusable `PhotoPlaceholder` component. Replace those with your own photos in `public/images` when ready. The dashboard is an illustrative HTML/CSS preview; event listings, metrics, testimonials, prices, authentication, and contact details are pending real data or flows. No production values are implied by the mockup.

The design tokens and typography are in `src/app/globals.css`. Page sections are in `src/components/home/landing-page.tsx`; structured labels and feature lists are in `src/data/home.ts`.
