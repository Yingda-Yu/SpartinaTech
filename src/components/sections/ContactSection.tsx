"use client";

import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks";

export function ContactSection() {
  const { t } = useI18n();
  const ref = useReveal();

  return (
    <section id="contact" className="section section-dark contact-section" ref={ref}>
      <div className="container">
        <div className="contact-card reveal">
          <p className="eyebrow">{t("contactEyebrow")}</p>
          <h2>{t("contactTitle")}</h2>
          <p className="body-text">{t("contactBody")}</p>
          <div className="contact-actions">
            <a
              className="button-primary"
              href="mailto:hello@spartina.ai?subject=Industrial%20Vision%20Data%20Enhancement%20Demo"
            >
              {t("contactCTA1")}
            </a>
            <a className="button-ghost" href="#demos">
              {t("contactCTA2")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
