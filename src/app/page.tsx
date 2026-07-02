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
          <div className="footer-social">
            <a href="https://github.com/Yingda-Yu/SpartinaTech" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="mailto:hello@spartina.ai" aria-label="Email">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
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
        <div className="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><a className="footer-link" href="#loop">Documentation</a></li>
            <li><a className="footer-link" href="#demos">Case Studies</a></li>
            <li><a className="footer-link" href="#insight">API Reference</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; 2025 {site.name}. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '16px' }}>
          <a className="footer-link" href="#top">{t("backTop")}</a>
          <a className="footer-link" href="mailto:hello@spartina.ai">hello@spartina.ai</a>
        </div>
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
