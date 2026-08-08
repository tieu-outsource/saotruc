"use client";

import { useEffect } from "react";

/**
 * Global scroll-reveal driver.
 * Observes every `[data-reveal]` element and adds the `.revealed` class once
 * it enters the viewport. A MutationObserver rescan picks up elements added
 * later (e.g. after client-side navigation).
 */
export default function ScrollReveal() {
  useEffect(() => {
    let io: IntersectionObserver | null = null;
    let mo: MutationObserver | null = null;
    const pending = new Set<Element>();

    const scan = () => {
      document
        .querySelectorAll("[data-reveal]:not(.revealed)")
        .forEach((el) => {
          if (!pending.has(el)) {
            pending.add(el);
            io?.observe(el);
          }
        });
    };

    io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            pending.delete(entry.target);
            io?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    scan();
    return () => {
      io?.disconnect();
      mo?.disconnect();
    };
  }, []);

  return (
    <noscript>
      <style>{`[data-reveal]{opacity:1 !important}`}</style>
    </noscript>
  );
}
