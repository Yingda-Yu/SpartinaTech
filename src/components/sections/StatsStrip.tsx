"use client";

import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks";

const stats = [
  { value: "6", labelKey: "statClasses" },
  { value: "153", labelKey: "statSynthetic" },
  { value: "+0.017", labelKey: "statLift" },
  { value: "1,000", labelKey: "statImages" },
];

export function StatsStrip() {
  const { t } = useI18n();
  const ref = useReveal();

  return (
    <section className="stats-strip" aria-label="Key metrics" ref={ref}>
      {stats.map((s) => (
        <div key={s.labelKey} className="stat-item reveal">
          <span className="stat-value">{s.value}</span>
          <span className="stat-label">{t(s.labelKey)}</span>
        </div>
      ))}
    </section>
  );
}
