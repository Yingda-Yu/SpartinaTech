"use client";

import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks";

const tools = [
  { num: "01", title: "Dataset Audit", bodyKey: "tool1" },
  { num: "02", title: "Data Diagnosis", bodyKey: "tool2" },
  { num: "03", title: "Enhancement Planning", bodyKey: "tool3" },
  { num: "04", title: "Synthetic Generation", bodyKey: "tool4" },
  { num: "05", title: "Quality Filtering", bodyKey: "tool5" },
  { num: "06", title: "Benchmark Report", bodyKey: "tool6" },
];

export function PlatformSection() {
  const { t } = useI18n();
  const ref = useReveal();

  return (
    <section id="platform" className="section platform-section" ref={ref}>
      <div className="container">
        <div className="section-heading reveal">
          <p className="eyebrow">{t("platformEyebrow")}</p>
          <h2>{t("platformTitle")}</h2>
          <p className="body-text">{t("platformBody")}</p>
        </div>
        <div className="tool-rail" role="list">
          {tools.map((tool) => (
            <article key={tool.num} className="tool-card reveal" role="listitem">
              <div className="tool-icon">{tool.num}</div>
              <h3>{tool.title}</h3>
              <p>{t(tool.bodyKey)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
