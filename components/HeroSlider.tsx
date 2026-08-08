"use client";

import { useCallback, useEffect, useState } from "react";

export type HeroSlide = {
  image: string | null;
  title: string;
  accent: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

type HeroSliderProps = {
  slides: HeroSlide[];
  benefits: { icon: string; text: string }[];
};

const AUTOPLAY_MS = 6000;

export default function HeroSlider({ slides, benefits }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = slides.length;

  const goTo = useCallback(
    (i: number) => {
      if (count === 0) return;
      setCurrent(((i % count) + count) % count);
    },
    [count]
  );

  // Auto-advance; pauses on hover/focus, disabled for a single slide or
  // when the user prefers reduced motion.
  useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setCurrent((c) => (c + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [count, paused]);


  if (count === 0) return null;

  const slide = slides[current];

  return (
    <section
      className="hero"
      id="home"
      role="region"
      aria-roledescription="carousel"
      aria-label="Banner chính"
      aria-live="polite"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (count < 2) return;
        if (e.key === "ArrowLeft") goTo(current - 1);
        if (e.key === "ArrowRight") goTo(current + 1);
      }}
    >
      {count > 1 && (
        <div className="hero-slides">
          {slides.map((s, i) => (
            <div
              key={i}
              className={`hero-slide${i === current ? " active" : ""}`}
              aria-hidden={i !== current}
            >
              {s.image && (
                <img
                  src={s.image}
                  alt=""
                  className="hero-slide-bg"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              )}
              {s.image && <div className="hero-slide-overlay" aria-hidden="true" />}
            </div>
          ))}
        </div>
      )}

      <div className="hero-container">
        {/* key remount replays the entrance animation on every slide change */}
        <div className="hero-content hero-slide-content" key={current}>
          <h1 className="hero-title">
            {slide.title}
            {slide.accent && <span>{slide.accent}</span>}
          </h1>
          <p className="hero-description">{slide.description}</p>
          <div className="hero-buttons">
            <a href={slide.primaryHref} className="btn btn-primary">
              {slide.primaryLabel}
            </a>
            {slide.secondaryLabel && slide.secondaryHref && (
              <a href={slide.secondaryHref} className="btn btn-outline">
                {slide.secondaryLabel}
              </a>
            )}
          </div>
        </div>


        <div className="hero-benefits hero-anim hero-anim-4">
          {benefits.map((b) => (
            <div key={b.text} className="benefit-item">
              <div className="benefit-icon-wrapper" aria-hidden="true">
                <i className={b.icon} />
              </div>
              <span className="benefit-text">{b.text}</span>
            </div>
          ))}
        </div>
      </div>
      {count > 1 && (
        <div className="hero-dots" role="tablist" aria-label="Chọn slide">
          {slides.map((s, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}${s.title ? `: ${s.title}` : ""}`}
              className={`hero-dot${i === current ? " active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
