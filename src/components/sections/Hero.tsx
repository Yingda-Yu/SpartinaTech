"use client";

import { useI18n } from "@/lib/i18n";
import { useReveal, useParallax } from "@/hooks";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const videos = [
  {
    src: `${basePath}/assets/videos/audit-radar.mp4`,
    poster: `${basePath}/assets/posters/audit-radar.jpg`,
    num: "01",
    title: "Dataset Audit",
    labelKey: "heroVideo1",
    large: true,
    parallax: "-0.04",
  },
  {
    src: `${basePath}/assets/videos/synthetic-generation.mp4`,
    poster: `${basePath}/assets/posters/synthetic-generation.jpg`,
    num: "02",
    title: "Synthetic Generation",
    labelKey: "heroVideo2",
    large: false,
    parallax: "0.035",
  },
  {
    src: `${basePath}/assets/videos/quality-filter.mp4`,
    poster: `${basePath}/assets/posters/quality-filter.jpg`,
    num: "03",
    title: "Quality Filtering",
    labelKey: "heroVideo3",
    large: false,
    parallax: "-0.025",
  },
  {
    src: `${basePath}/assets/videos/benchmark-loop.mp4`,
    poster: `${basePath}/assets/posters/benchmark-loop.jpg`,
    num: "04",
    title: "Benchmark Report",
    labelKey: "heroVideo4",
    wide: true,
    parallax: "0.045",
  },
];

export function Hero() {
  const { t } = useI18n();
  const ref = useReveal();
  useParallax();

  return (
    <section id="top" className="hero" ref={ref}>
      {/* Background: orbs + grid-noise */}
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />
      <div className="grid-noise" aria-hidden="true" />

      {/* Left: hero copy */}
      <div className="hero-copy reveal">
        <p className="eyebrow">{t("heroEyebrow")}</p>
        <h1>{t("heroTitle")}</h1>
        <p className="hero-subtitle">{t("heroSubtitle")}</p>
        <p className="hero-body">{t("heroBody")}</p>
        <div className="hero-actions">
          <a className="button-primary" href="#contact">
            {t("heroCTA1")}
          </a>
          <a className="button-ghost" href="#loop">
            {t("heroCTA2")}
          </a>
        </div>
        <div className="hero-note">
          <span>Build Better Data</span>
          <span className="hero-note-sep">/</span>
          <span>Better Inspection</span>
        </div>
      </div>

      {/* Right: video wall grid */}
      <div className="hero-studio reveal" aria-label="Video demo wall">
        {videos.map((v) => (
          <article
            key={v.num}
            className="studio-card"
            data-parallax={v.parallax}
          >
            <div
              className="studio-card-media"
              style={{ backgroundImage: `url(${v.poster})` }}
            >
              <video autoPlay muted loop playsInline poster={v.poster}>
                <source src={v.src} type="video/mp4" />
              </video>
              <span className="video-placeholder-badge">VIDEO</span>
            </div>
            <div className="card-label">
              <span>{v.num}</span>
              <strong>{v.title}</strong>
              <small>{t(v.labelKey)}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
