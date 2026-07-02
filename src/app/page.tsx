"use client";

import { SiteHeader } from "@/components/ui/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { PlatformSection } from "@/components/sections/PlatformSection";
import { LoopSection } from "@/components/sections/LoopSection";
import { DemoSection } from "@/components/sections/DemoSection";
import { InsightSection } from "@/components/sections/InsightSection";
import { PlannerSection } from "@/components/sections/PlannerSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { PilotSection } from "@/components/sections/PilotSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { site } from "@/lib/data";
import { useVideoAutoplay } from "@/hooks";

function Footer() {
  const { t } = useI18n();
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="brand" style={{ color: "#fff" }}>
            <strong>{site.name}</strong>
          </div>
          <p>Industrial Vision Dataset Intelligence + Data Enhancement Platform</p>
        </div>
        <div className="footer-col">
          <h4>Platform</h4>
          <ul>
            <li><a className="footer-link" href="#platform">Dataset Audit</a></li>
            <li><a className="footer-link" href="#loop">Enhancement Loop</a></li>
            <li><a className="footer-link" href="#demos">Video Demos</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Solutions</h4>
          <ul>
            <li><a className="footer-link" href="#solutions">PCB / AOI</a></li>
            <li><a className="footer-link" href="#solutions">Steel Surface</a></li>
            <li><a className="footer-link" href="#solutions">Anomaly Detection</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a className="footer-link" href="#contact">{t("contactCTA1")}</a></li>
            <li><a className="footer-link" href="#pilot">{t("navPilot")}</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; 2025 {site.name}. All rights reserved.</span>
        <a className="footer-link" href="#top">{t("backTop")}</a>
      </div>
    </footer>
  );
}

function PageContent() {
  useVideoAutoplay();
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <main id="main">
        <Hero />
        <StatsStrip />
        <PlatformSection />
        <LoopSection />
        <DemoSection />
        <InsightSection />
        <PlannerSection />
        <SolutionsSection />
        <PilotSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <I18nProvider>
      <PageContent />
    </I18nProvider>
  );
}
