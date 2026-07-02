"use client";

import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks";

const steps = [
  { num: "1", titleKey: "loop1Title", bodyKey: "loop1Body" },
  { num: "2", titleKey: "loop2Title", bodyKey: "loop2Body" },
  { num: "3", titleKey: "loop3Title", bodyKey: "loop3Body" },
  { num: "4", titleKey: "loop4Title", bodyKey: "loop4Body" },
  { num: "5", titleKey: "loop5Title", bodyKey: "loop5Body" },
  { num: "6", titleKey: "loop6Title", bodyKey: "loop6Body" },
  { num: "7", titleKey: "loop7Title", bodyKey: "loop7Body" },
];

export function LoopSection() {
  const { t } = useI18n();
  const ref = useReveal();

  return (
    <section id="loop" className="section section-dark loop-section" ref={ref}>
      <div className="container">
        <div className="loop-grid">
          <div className="sticky-sidebar reveal">
            <div className="section-heading">
              <p className="eyebrow">{t("loopEyebrow")}</p>
              <h2>{t("loopTitle")}</h2>
              <p className="body-text">{t("loopBody")}</p>
            </div>
          </div>
          <div className="timeline">
            {steps.map((step) => (
              <div key={step.num} className="timeline-item reveal" style={{ '--stagger': steps.indexOf(step) } as React.CSSProperties}>
                <div className="timeline-dot">{step.num}</div>
                <div className="timeline-content">
                  <h3>{t(step.titleKey)}</h3>
                  <p>{t(step.bodyKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
