"use client";

import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks";

const priorities = [
  { level: "high", labelKey: "priorityHigh", titleKey: "priorityHighTitle", bodyKey: "priorityHighBody" },
  { level: "mid", labelKey: "priorityMid", titleKey: "priorityMidTitle", bodyKey: "priorityMidBody" },
  { level: "low", labelKey: "priorityLow", titleKey: "priorityLowTitle", bodyKey: "priorityLowBody" },
];

export function PlannerSection() {
  const { t } = useI18n();
  const ref = useReveal();

  return (
    <section id="planner" className="section section-dark planner-section" ref={ref}>
      <div className="container">
        <div className="section-heading reveal">
          <p className="eyebrow">{t("plannerEyebrow")}</p>
          <h2>{t("plannerTitle")}</h2>
          <p className="body-text">{t("plannerBody")}</p>
        </div>
        <div className="priority-grid">
          {priorities.map((p, index) => (
            <article key={p.level} className={`priority-card ${p.level} reveal`} style={{ '--stagger': index } as React.CSSProperties}>
              <h3>{t(p.labelKey)}</h3>
              <p className="priority-title">{t(p.titleKey)}</p>
              <p className="priority-desc">{t(p.bodyKey)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
