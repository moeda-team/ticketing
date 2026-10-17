"use client";

import { useEffect } from "react";

// Animation foundation only. Phase 1 does not animate the page.
export function useGsapScrollTrigger(enabled = false) {
  useEffect(() => {
    if (!enabled) return;
    let active = true;
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (active) gsap.registerPlugin(ScrollTrigger);
    });
    return () => { active = false; };
  }, [enabled]);
}
