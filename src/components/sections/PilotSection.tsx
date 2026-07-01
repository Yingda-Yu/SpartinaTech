"use client";

import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks";

const steps = [
  { time: "1-2 ", unitKey: "days", titleKey: "pilot1Title", bodyKey: "pilot1Body" },
  { time: "3-5 ", unitKey: "days2", titleKey: "pilot2Title", bodyKey: "pilot2Body" },
  { time: "1 ", unitKey: "week", titleKey: "pilot3Title", bodyKey: "pilot3Body" },
  { time: "2-4 ", unitKey: "weeks", titleKey: "pilot4Title", bodyKey: "pilot4Body" },
];

export function PilotSection() {
  const { t } = useI18n();
  const ref = useReveal();

  return (
    <section id="pilot" className="section pilot-section" ref={ref}>
      <div className="container">
        <div className="section-heading reveal">
          <p className="eyebrow">{t("pilotEyebrow")}</p>
          <h2>{t("pilotTitle")}</h2>
        </div>
        <div className="pilot-grid">
          {steps.map((step) => (
            <article key={step.titleKey} className="pilot-step reveal">
              <div className="step-number">{step.time.trim()}</div>
              <small>{t(step.unitKey)}</small>
              <h3>{t(step.titleKey)}</h3>
              <p>{t(step.bodyKey)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
