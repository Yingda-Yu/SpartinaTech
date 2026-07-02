"use client";

import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const demos = [
  {
    videoSrc: `${basePath}/assets/videos/audit-radar.mp4`,
    poster: `${basePath}/assets/posters/audit-radar.jpg`,
    eyebrow: "Dataset Doctor",
    titleKey: "demo1Title",
    bodyKey: "demo1Body",
  },
  {
    videoSrc: `${basePath}/assets/videos/synthetic-generation.mp4`,
    poster: `${basePath}/assets/posters/synthetic-generation.jpg`,
    eyebrow: "Constrained Synthesis",
    titleKey: "demo2Title",
    bodyKey: "demo2Body",
  },
  {
    videoSrc: `${basePath}/assets/videos/quality-filter.mp4`,
    poster: `${basePath}/assets/posters/quality-filter.jpg`,
    eyebrow: "A/B/C/D Gate",
    titleKey: "demo3Title",
    bodyKey: "demo3Body",
  },
  {
    videoSrc: `${basePath}/assets/videos/benchmark-loop.mp4`,
    poster: `${basePath}/assets/posters/benchmark-loop.jpg`,
    eyebrow: "Before / After",
    titleKey: "demo4Title",
    bodyKey: "demo4Body",
  },
];

export function DemoSection() {
  const { t } = useI18n();
  const ref = useReveal();

  return (
    <section id="demos" className="section demo-section" ref={ref}>
      <div className="container">
        <div className="section-heading reveal">
          <p className="eyebrow">{t("demoEyebrow")}</p>
          <h2>{t("demoTitle")}</h2>
          <p className="body-text">{t("demoBody")}</p>
        </div>
        <div className="demo-grid">
          {demos.map((d, index) => (
            <article key={d.titleKey} className="demo-card reveal" style={{ '--stagger': index } as React.CSSProperties}>
              <div className="demo-card-media" style={{ backgroundImage: `url(${d.poster})` }}>
                <video autoPlay muted loop playsInline poster={d.poster}>
                  <source src={d.videoSrc} type="video/mp4" />
                </video>
                <span className="video-placeholder-badge">VIDEO</span>
              </div>
              <div className="demo-label">
                <span className="eyebrow">{d.eyebrow}</span>
                <h3>{t(d.titleKey)}</h3>
                <p>{t(d.bodyKey)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
