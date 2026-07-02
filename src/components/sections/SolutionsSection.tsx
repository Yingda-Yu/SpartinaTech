"use client";

import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks";

const solutions = [
  { tag: "PCB / AOI", titleKey: "solution1Title", desc: "open / short / mousebite / spur / pin-hole" },
  { tag: "Steel", titleKey: "solution2Title", desc: "scratch / crack / inclusion / hole / rust" },
  { tag: "Anomaly", titleKey: "solution3Title", desc: "MVTec AD / VisA / LOCO / 3D" },
  { tag: "Battery", titleKey: "solution4Title", desc: "weld / pole piece / packaging / edge case" },
  { tag: "Glass", titleKey: "solution5Title", desc: "crack / bubble / scratch / surface damage" },
  { tag: "Semiconductor", titleKey: "solution6Title", desc: "wafer / package / assembly inspection" },
];

const deliverables = [
  { num: "01", title: "Dataset Audit Report", bodyKey: "del1" },
  { num: "02", title: "Diagnosis Dashboard", bodyKey: "del2" },
  { num: "03", title: "Enhancement Plan", bodyKey: "del3" },
  { num: "04", title: "Filtered Dataset", bodyKey: "del4" },
  { num: "05", title: "Retrained Detector", bodyKey: "del5" },
  { num: "06", title: "Benchmark Report", bodyKey: "del6" },
];

export function SolutionsSection() {
  const { t } = useI18n();
  const ref1 = useReveal();
  const ref2 = useReveal();

  return (
    <>
      <section id="solutions" className="section solutions-section" ref={ref1}>
        <div className="container">
          <div className="section-heading reveal">
            <p className="eyebrow">{t("solutionsEyebrow")}</p>
            <h2>{t("solutionsTitle")}</h2>
            <p>{t("solutionsBody")}</p>
          </div>
          <div className="solutions-grid">
            {solutions.map((s, index) => (
              <article key={s.tag} className="solution-card reveal" style={{ '--stagger': index } as React.CSSProperties}>
                <span className="tag">{s.tag}</span>
                <h3>{t(s.titleKey)}</h3>
                <p className="desc">{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="deliverables" className="section deliverables-section section-dark" ref={ref2}>
        <div className="container">
          <div className="section-heading reveal">
            <p className="eyebrow">{t("deliverablesEyebrow")}</p>
            <h2>{t("deliverablesTitle")}</h2>
            <p>{t("deliverablesBody")}</p>
          </div>
          <div className="deliverables-list">
            {deliverables.map((d, idx) => (
              <article key={d.num} className="deliverable-item reveal" style={{ '--stagger': idx } as React.CSSProperties}>
                <span className="check-icon">&#10003;</span>
                <div>
                  <strong style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' }}>{d.num}</strong>
                  <h3 style={{ fontSize: '0.92rem', fontWeight: 600, margin: '2px 0', color: '#fff' }}>{d.title}</h3>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.55 }}>{t(d.bodyKey)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
