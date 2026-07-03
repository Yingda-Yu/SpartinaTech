"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "@/lib/i18n";
import { heroBackground } from "@/lib/data";
import { getFallbackPath } from "@/lib/asset-path";

export function Hero() {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const webpSrc = heroBackground;
  const pngSrc = getFallbackPath(heroBackground);

  useEffect(() => {
    setLoaded(false);
    setFailed(false);

    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [heroBackground]);

  const handleLoad = () => {
    setLoaded(true);
    setFailed(false);
  };

  const handleError = () => {
    setFailed(true);
    setLoaded(false);
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-24 sm:px-8 lg:px-10"
    >
      {/* Background composition: real image + blur + gradient + mask + orbs + grid + noise */}
      <div className="hero-bg" aria-hidden>
        {/* Skeleton background */}
        {!loaded && !failed && (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #f5f5f2 0%, #e8e8e0 25%, #f0efe9 50%, #e8e8e0 75%, #f5f5f2 100%)",
            }}
          />
        )}
        <picture>
          <source srcSet={webpSrc} type="image/webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={pngSrc}
            alt=""
            className={`hero-bg-image transition-opacity duration-700 ${
              loaded && !failed ? "opacity-100" : "opacity-0"
            }`}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
          />
        </picture>
        <div className="hero-bg-mask" />
      </div>
      <div className="hero-bg-grid" aria-hidden />
      <div className="hero-bg-noise" aria-hidden />
      <div className="hero-bg-orb hero-bg-orb-1" aria-hidden />
      <div className="hero-bg-orb hero-bg-orb-2" aria-hidden />

      {/* Content — only slogan, subtitle, three CTAs */}
      <div className="relative z-10 mx-auto w-full max-w-[920px] text-center">
        <p
          className="mb-10 text-[11px] font-medium uppercase tracking-[0.4em] text-[#5f615f] opacity-0"
          style={{ animation: "fade-up 0.9s var(--ease-out) 0.1s forwards" }}
        >
          {t("hero.tagline", "Spartina Technology · 米草科技")}
        </p>

        <h1
          className="text-[clamp(2.6rem,8.5vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-[#0a0a0a] opacity-0"
          style={{ animation: "fade-up 1s var(--ease-out) 0.25s forwards" }}
        >
          {t("hero.titleLine1", "Generating digital products")}
          <br />
          <span className="bg-gradient-to-r from-[#2f4738] via-[#3d5a4a] to-[#2f4738] bg-clip-text text-transparent">
            {t("hero.titleLine2", "for a more beautiful real life.")}
          </span>
        </h1>

        <p
          className="mx-auto mt-8 max-w-[34rem] text-base leading-[1.65] text-[#4a4a4a] sm:text-lg opacity-0"
          style={{ animation: "fade-up 1s var(--ease-out) 0.45s forwards" }}
        >
          {t("hero.subtitle")}
        </p>

        <div
          className="mt-12 flex flex-wrap items-center justify-center gap-3 opacity-0"
          style={{ animation: "fade-up 1s var(--ease-out) 0.65s forwards" }}
        >
          <a
            href="#what-we-build"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#0a0a0a] px-7 text-sm font-semibold text-white shadow-lg shadow-black/10 transition-all duration-300 hover:bg-[#2f4738] hover:shadow-xl hover:shadow-[#2f4738]/20"
          >
            {t("hero.explore", "Explore")}
          </a>
          <a
            href="#demo-reel"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#0a0a0a]/15 bg-white/70 px-7 text-sm font-semibold text-[#0a0a0a] backdrop-blur-md transition-all duration-300 hover:border-[#0a0a0a]/25 hover:bg-white hover:shadow-md"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            {t("hero.watchDemo", "Watch Demo")}
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center rounded-full border border-[#2f4738]/30 bg-[#2f4738]/5 px-7 text-sm font-semibold text-[#2f4738] backdrop-blur-md transition-all duration-300 hover:bg-[#2f4738]/10 hover:border-[#2f4738]/40"
          >
            {t("hero.contact", "Contact")}
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0"
        style={{ animation: "fade-in 1s ease-out 1.2s forwards" }}
        aria-hidden
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-[#0a0a0a]/20 p-1.5">
          <div className="h-2 w-0.5 rounded-full bg-[#0a0a0a]/40 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
