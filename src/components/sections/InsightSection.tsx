"use client";

import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks";

const bars = [
  { label: "Original", pct: "72%", score: "0.722", variant: "" },
  { label: "Mixed-All", pct: "69%", score: "0.698", variant: "danger" },
  { label: "Top50", pct: "71%", score: "0.715", variant: "success" },
];

export function InsightSection() {
  const { t } = useI18n();
  const ref = useReveal();

  return (
    <section className="section insight-section" ref={ref}>
      <div className="container">
        <div className="section-heading reveal">
          <p className="eyebrow">{t("findingEyebrow")}</p>
          <h2>{t("findingTitle")}</h2>
          <p className="body-text">{t("findingBody")}</p>
        </div>
        <div className="chart-container reveal">
          <div className="bar-chart">
            {bars.map((b) => (
              <div key={b.label} className="bar-group">
                <span className="bar-value">{b.score}</span>
                <div className={`bar ${b.variant === "danger" ? "secondary" : "primary"}`} style={{ height: `${parseFloat(b.pct) / 100 * 200}px` }} />
                <span className="bar-label">{b.label}</span>
              </div>
            ))}
          </div>
          <p className="body-text" style={{ marginTop: 20 }}>{t("findingCaption")}</p>
        </div>
      </div>
    </section>
  );
}
