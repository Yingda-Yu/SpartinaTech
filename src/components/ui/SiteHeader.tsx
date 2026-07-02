"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useI18n } from "@/lib/i18n";
import { useHeaderScroll } from "@/hooks";
import { site } from "@/lib/data";

export function SiteHeader() {
  const { locale, t, setLocale } = useI18n();
  const scrolled = useHeaderScroll();
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    const onClose = () => setMobileOpen(false);
    document.addEventListener("click", onClose);
    return () => document.removeEventListener("click", onClose);
  }, [mobileOpen]);

  const toggleLang = useCallback(() => {
    setLocale(locale === "zh" ? "en" : "zh");
  }, [locale, setLocale]);

  return (
    <header
      ref={headerRef}
      className={`site-header${scrolled ? " scrolled" : ""}`}
    >
      {/* Brand */}
      <a className="brand" href="#top" aria-label="Spartina Technology home">
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 44 44" role="img">
            <path d="M22 3c7 8 12 16 12 24 0 8-5 14-12 14S10 35 10 27C10 19 15 11 22 3Z" />
            <path d="M22 11c4 7 6 11 6 17 0 4-2 7-6 7s-6-3-6-7c0-6 2-10 6-17Z" />
          </svg>
        </span>
        <span>
          <strong>{site.name}</strong>
          <small>Spartina Technology</small>
        </span>
      </a>

      {/* Desktop Nav */}
      <nav className="desktop-nav" aria-label="Primary navigation">
        <a className="nav-item" href="#platform">{t("navPlatform")}</a>
        <a className="nav-item" href="#solutions">{t("navSolutions")}</a>
        <a className="nav-item" href="#demos">{t("navDemos")}</a>
        <a className="nav-item" href="#deliverables">{t("navDeliverables")}</a>
        <a className="nav-item" href="#pilot">{t("navPilot")}</a>
      </nav>

      {/* Header Actions */}
      <div className="header-actions">
        <button className="lang-toggle" type="button" onClick={toggleLang} aria-label="Switch language">
          <span>中文</span>
          <i />
          <span>EN</span>
        </button>
        <a className="client-link" href="#contact">
          {t("navClient")}
        </a>
        <a className="primary-small" href="#contact">
          {t("navCTA")}
        </a>
        <button
          className="mobile-menu-btn"
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={(e) => {
            e.stopPropagation();
            setMobileOpen((prev) => !prev);
          }}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu${mobileOpen ? " open" : ""}`}
        id="mobile-menu"
        onClick={(e) => e.stopPropagation()}
      >
        <a href="#platform" onClick={() => setMobileOpen(false)}>{t("navPlatform")}</a>
        <a href="#solutions" onClick={() => setMobileOpen(false)}>{t("navSolutions")}</a>
        <a href="#demos" onClick={() => setMobileOpen(false)}>{t("navDemos")}</a>
        <a href="#deliverables" onClick={() => setMobileOpen(false)}>{t("navDeliverables")}</a>
        <a href="#pilot" onClick={() => setMobileOpen(false)}>{t("navPilot")}</a>
        <a href="#contact" onClick={() => setMobileOpen(false)}>{t("navCTA")}</a>
      </div>
    </header>
  );
}
