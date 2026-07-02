"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { industrialPage, pickIndustrialLocale } from "@/lib/industrial-data";
import { DarkImageWithFallback } from "@/components/ui/ImageWithFallback";
import { LanguageToggle } from "@/components/ui/LanguageToggle";

export default function IndustrialPage() {
  const { locale, t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const tab = industrialPage.tabs[activeTab];

  return (
    <div className="min-h-screen bg-[#0a100f] text-white">
      <header className="fixed top-0 z-50 w-full border-b border-[#1a2a27]/40 bg-[#0a100f]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6 sm:px-8 lg:px-10">
          <Link href="/" className="text-sm font-semibold tracking-tight text-white">
            Spartina Technology
          </Link>
          <nav className="hidden flex-wrap items-center gap-5 text-sm text-[#889993] md:flex">
            <a href="#platform" className="transition-colors hover:text-[#a5d4bc]">
              {t("nav.platform", "Platform")}
            </a>
            <a href="#why-it-matters" className="transition-colors hover:text-[#a5d4bc]">
              {t("nav.whyItMatters", "Why It Matters")}
            </a>
            <a href="#showcase" className="transition-colors hover:text-[#a5d4bc]">
              {t("nav.showcase", "Showcase")}
            </a>
            <a href="#workflow" className="transition-colors hover:text-[#a5d4bc]">
              {t("nav.workflow", "Workflow")}
            </a>
            <a href="#trial-path" className="transition-colors hover:text-[#a5d4bc]">
              {t("nav.trialPath", "Trial Path")}
            </a>
            <a href="#contact" className="transition-colors hover:text-[#a5d4bc]">
              {t("nav.contact", "Contact")}
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <LanguageToggle variant="dark" />
            <Link
              href="/"
              className="inline-flex h-9 items-center justify-center rounded-full border border-[#1a2a27] bg-[#1a2a27]/40 px-4 text-xs font-semibold text-[#a5d4bc] transition-all hover:bg-[#1a2a27]"
            >
              {t("nav.backToHome", "Back to home")}
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-14">
        {/* ============================================
            Hero — deep black-green, glowing dashboard card
            ============================================ */}
        <section
          id="platform"
          className="relative flex min-h-[calc(100svh-3.5rem)] flex-col justify-center overflow-hidden px-6 pb-20 pt-16 sm:px-8 lg:px-10"
        >
          {/* Subtle grid */}
          <div className="industrial-grid pointer-events-none absolute inset-0 -z-10 opacity-60" aria-hidden />
          {/* Glow orbs */}
          <div
            className="pointer-events-none absolute -top-20 right-0 h-[480px] w-[480px] rounded-full bg-[#2f4738]/20 blur-[120px] glow-pulse"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-[#a5d4bc]/8 blur-[120px] glow-pulse"
            style={{ animationDelay: "1.5s" }}
            aria-hidden
          />

          <div className="mx-auto max-w-[1200px]">
            <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
              <div>
                <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.3em] text-[#a5d4bc]">
                  {pickIndustrialLocale(industrialPage.hero.eyebrow, locale)}
                </p>
                <h1 className="text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
                  {pickIndustrialLocale(industrialPage.hero.title, locale)}
                </h1>
                <p className="mt-6 text-lg leading-[1.55] text-[#c0d0c8]">
                  {pickIndustrialLocale(industrialPage.hero.subtitle, locale)}
                </p>
                <p className="mt-4 max-w-lg text-base leading-[1.6] text-[#6a7a75]">
                  {pickIndustrialLocale(industrialPage.hero.description, locale)}
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <a
                    href="#trial-path"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-[#a5d4bc] px-7 text-sm font-semibold text-[#0a100f] transition-all hover:bg-[#b8e4cc] hover:shadow-lg hover:shadow-[#a5d4bc]/25"
                  >
                    {pickIndustrialLocale(industrialPage.contact.primaryCta, locale)}
                  </a>
                  <a
                    href="#showcase"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-[#1a2a27] bg-[#1a2a27]/30 px-7 text-sm font-semibold text-white transition-all hover:bg-[#1a2a27]"
                  >
                    {t("nav.showcase", "View showcase")}
                  </a>
                </div>
              </div>

              {/* Glowing dashboard cover */}
              <div className="relative">
                <div
                  className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#a5d4bc]/15 via-[#2f4738]/10 to-transparent blur-2xl"
                  aria-hidden
                />
                <div className="relative overflow-hidden rounded-2xl border border-[#1a2a27] bg-[#0f1a18] shadow-2xl">
                  <DarkImageWithFallback
                    src={industrialPage.coverImage}
                    alt={pickIndustrialLocale(industrialPage.hero.title, locale)}
                    aspectRatio="aspect-[4/3]"
                    accentColor="#a5d4bc"
                    priority
                  />
                  {/* Floating chip */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-[#0a100f]/80 px-3 py-1.5 backdrop-blur-md">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#a5d4bc] glow-pulse" />
                    <span className="text-[10px] font-medium uppercase tracking-wider text-[#a5d4bc]">
                      {pickIndustrialLocale(industrialPage.livePreview, locale)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KPI bar */}
        <section className="border-y border-[#1a2a27]/40 bg-[#0f1a18]/40 px-6 py-7 sm:px-8 lg:px-10">
          <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-6">
            {industrialPage.kpis.map((kpi, idx) => (
              <div key={idx}>
                <p className="text-2xl font-semibold tracking-tight text-white">
                  {typeof kpi.value === "string" ? kpi.value : pickIndustrialLocale(kpi.value, locale)}
                </p>
                <p className="mt-0.5 text-[11px] uppercase tracking-wider text-[#6a7a75]">
                  {pickIndustrialLocale(kpi.label, locale)}
                </p>
              </div>
            ))}
            <div className="text-[11px] uppercase tracking-wider text-[#6a7a75]">
              {pickIndustrialLocale(industrialPage.prototypeScale, locale)}
            </div>
          </div>
        </section>

        {/* ============================================
            Why It Matters — 5 pain points
            ============================================ */}
        <section
          id="why-it-matters"
          className="relative px-6 py-28 sm:px-8 lg:px-10"
        >
          <div className="mx-auto max-w-[1200px]">
            <div className="max-w-3xl">
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-[#a5d4bc]">
                {pickIndustrialLocale(industrialPage.whyItMatters.eyebrow, locale)}
              </p>
              <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
                {pickIndustrialLocale(industrialPage.whyItMatters.title, locale)}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-[1.6] text-[#889993]">
                {pickIndustrialLocale(industrialPage.whyItMatters.subtitle, locale)}
              </p>
            </div>

            <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {industrialPage.whyItMatters.items.map((item, index) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-xl border border-[#1a2a27] bg-[#0f1a18]/60 p-6 transition-all duration-500 hover:border-[#a5d4bc]/30 hover:bg-[#1a2a27]/60"
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#a5d4bc]/8 blur-2xl transition-opacity duration-500"
                    style={{ opacity: hoveredCard === item.id ? 1 : 0 }}
                  />
                  <div className="relative">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#a5d4bc]/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold text-white">
                      {pickIndustrialLocale(item.title, locale)}
                    </h3>
                    <p className="mt-3 text-sm leading-[1.6] text-[#889993]">
                      {pickIndustrialLocale(item.description, locale)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            Tabbed Showcase — interactive product demo
            ============================================ */}
        <section
          id="showcase"
          className="relative border-y border-[#1a2a27]/40 bg-[#0f1a18]/40 px-6 py-28 sm:px-8 lg:px-10"
        >
          <div className="mx-auto max-w-[1200px]">
            <div className="max-w-3xl">
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-[#a5d4bc]">
                {pickIndustrialLocale(industrialPage.showcase.eyebrow, locale)}
              </p>
              <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
                {pickIndustrialLocale(industrialPage.showcase.title, locale)}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-[1.6] text-[#889993]">
                {pickIndustrialLocale(industrialPage.showcase.subtitle, locale)}
              </p>
            </div>

            {/* Tab bar */}
            <div className="mt-12 flex flex-wrap gap-1 rounded-full border border-[#1a2a27] bg-[#0a100f]/60 p-1.5">
              {industrialPage.tabs.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(i)}
                  className={`relative flex-1 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    activeTab === i
                      ? "bg-[#a5d4bc] text-[#0a100f]"
                      : "text-[#889993] hover:text-white"
                  }`}
                >
                  {pickIndustrialLocale(t.label, locale)}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14">
              <div
                key={tab.id}
                className="relative"
                style={{ animation: "fade-in 0.5s var(--ease-out) forwards" }}
              >
                <div
                  className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[#a5d4bc]/10 to-transparent blur-2xl"
                  aria-hidden
                />
                <div className="relative overflow-hidden rounded-xl border border-[#1a2a27] bg-[#0a100f] shadow-2xl">
                  <DarkImageWithFallback
                    src={tab.image}
                    alt={pickIndustrialLocale(tab.title, locale)}
                    aspectRatio="aspect-[4/3]"
                    accentColor="#a5d4bc"
                    priority={activeTab === 0}
                  />
                  {/* Stage chip */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-[#0a100f]/80 px-3 py-1.5 backdrop-blur-md">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#a5d4bc]">
                      {pickIndustrialLocale(industrialPage.showcase.stageLabel, locale)}{" "}
                      {String(activeTab + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>

              <div
                key={tab.id + "-text"}
                className="flex flex-col justify-center"
                style={{ animation: "fade-up 0.5s var(--ease-out) 0.1s forwards" }}
              >
                <h3 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.01em]">
                  {pickIndustrialLocale(tab.title, locale)}
                </h3>
                <p className="mt-5 max-w-md text-base leading-[1.65] text-[#889993]">
                  {pickIndustrialLocale(tab.description, locale)}
                </p>
                <ul className="mt-8 space-y-3">
                  {pickIndustrialLocale(tab.points, locale).map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm text-[#c0d0c8]"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#a5d4bc]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            Workflow dashboard feature
            ============================================ */}
        <section className="relative px-6 py-28 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
              <div>
                <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-[#a5d4bc]">
                  {pickIndustrialLocale(industrialPage.workflowDashboard.eyebrow, locale)}
                </p>
                <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
                  {pickIndustrialLocale(industrialPage.workflowDashboard.title, locale)}
                </h2>
                <p className="mt-6 max-w-md text-base leading-[1.65] text-[#889993]">
                  {pickIndustrialLocale(industrialPage.workflowDashboard.description, locale)}
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {pickIndustrialLocale(industrialPage.workflowDashboard.tags, locale).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#1a2a27] bg-[#0f1a18]/60 px-3 py-1 text-xs font-medium text-[#a5d4bc]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div
                  className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#2f4738]/20 via-[#a5d4bc]/8 to-transparent blur-2xl"
                  aria-hidden
                />
                <div className="relative overflow-hidden rounded-xl border border-[#1a2a27] bg-[#0a100f] shadow-2xl">
                  <DarkImageWithFallback
                    src={industrialPage.featureImages.workflowDashboard}
                    alt={pickIndustrialLocale(industrialPage.workflowDashboard.title, locale)}
                    aspectRatio="aspect-[16/10]"
                    accentColor="#a5d4bc"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            Before / After package feature
            ============================================ */}
        <section className="relative border-t border-[#1a2a27]/40 bg-[#0f1a18]/40 px-6 py-28 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
              <div className="relative order-2 lg:order-1">
                <div
                  className="absolute -inset-4 rounded-3xl bg-gradient-to-tl from-[#a5d4bc]/10 via-transparent to-[#2f4738]/15 blur-2xl"
                  aria-hidden
                />
                <div className="relative overflow-hidden rounded-xl border border-[#1a2a27] bg-[#0a100f] shadow-2xl">
                  <DarkImageWithFallback
                    src={industrialPage.featureImages.beforeAfterPackage}
                    alt={pickIndustrialLocale(industrialPage.beforeAfter.title, locale)}
                    aspectRatio="aspect-[16/10]"
                    accentColor="#a5d4bc"
                  />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-[#a5d4bc]">
                  {pickIndustrialLocale(industrialPage.beforeAfter.eyebrow, locale)}
                </p>
                <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
                  {pickIndustrialLocale(industrialPage.beforeAfter.title, locale)}
                </h2>
                <p className="mt-6 max-w-md text-base leading-[1.65] text-[#889993]">
                  {pickIndustrialLocale(industrialPage.beforeAfter.description, locale)}
                </p>
                <ul className="mt-8 space-y-3">
                  {pickIndustrialLocale(industrialPage.beforeAfter.items, locale).map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-[#c0d0c8]"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#a5d4bc]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            Workflow steps
            ============================================ */}
        <section
          id="workflow"
          className="relative px-6 py-28 sm:px-8 lg:px-10"
        >
          <div className="mx-auto max-w-[1200px]">
            <div className="max-w-3xl">
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-[#a5d4bc]">
                {pickIndustrialLocale(industrialPage.workflowSection.eyebrow, locale)}
              </p>
              <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
                {pickIndustrialLocale(industrialPage.workflowSection.title, locale)}
              </h2>
            </div>

            <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {industrialPage.workflow.map((step, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl border border-[#1a2a27] bg-[#0f1a18]/60 p-6 transition-all duration-500 hover:border-[#a5d4bc]/30 hover:bg-[#1a2a27]/60"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-semibold tracking-tight text-[#a5d4bc]/30 transition-colors group-hover:text-[#a5d4bc]/60">
                      {step.step}
                    </span>
                    <div className="h-px w-8 bg-[#1a2a27] transition-colors group-hover:bg-[#a5d4bc]/40" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-white">
                    {pickIndustrialLocale(step.title, locale)}
                  </h3>
                  <p className="mt-1.5 text-sm text-[#6a7a75]">
                    {pickIndustrialLocale(step.description, locale)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            Trial path
            ============================================ */}
        <section
          id="trial-path"
          className="relative border-t border-[#1a2a27]/40 bg-[#0f1a18]/40 px-6 py-28 sm:px-8 lg:px-10"
        >
          <div className="mx-auto max-w-[1200px]">
            <div className="max-w-3xl">
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-[#a5d4bc]">
                {pickIndustrialLocale(industrialPage.trialPathSection.eyebrow, locale)}
              </p>
              <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
                {pickIndustrialLocale(industrialPage.trialPathSection.title, locale)}
              </h2>
            </div>

            <div className="relative mt-16">
              <div
                className="hidden absolute left-8 top-0 h-full w-px bg-gradient-to-b from-[#a5d4bc]/40 via-[#a5d4bc]/15 to-transparent md:block"
                aria-hidden
              />
              <div className="space-y-6">
                {industrialPage.trialPath.map((step, index) => (
                  <div
                    key={index}
                    className="group flex gap-6 rounded-xl border border-transparent p-4 transition-colors hover:border-[#1a2a27] hover:bg-[#0f1a18]/40 md:gap-8"
                  >
                    <div className="relative flex flex-shrink-0 items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-[#1a2a27] bg-[#0f1a18] transition-all duration-500 group-hover:border-[#a5d4bc]/40 group-hover:bg-[#1a2a27]/60">
                        <span className="text-lg font-semibold text-[#a5d4bc]">
                          {step.step}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                      <h3 className="text-base font-semibold text-white">
                        {pickIndustrialLocale(step.title, locale)}
                      </h3>
                      <p className="mt-1 text-sm text-[#6a7a75]">
                        {pickIndustrialLocale(step.description, locale)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            Contact
            ============================================ */}
        <section
          id="contact"
          className="relative overflow-hidden border-t border-[#1a2a27]/40 px-6 py-28 sm:px-8 lg:px-10"
        >
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-50"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(47,71,56,0.3), transparent 70%)",
            }}
            aria-hidden
          />
          <div className="mx-auto max-w-[800px] text-center">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-[#a5d4bc]">
              {pickIndustrialLocale(industrialPage.contact.eyebrow, locale)}
            </p>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.15] tracking-[-0.01em]">
              {pickIndustrialLocale(industrialPage.contact.ctaTitle, locale)}
            </h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#trial-path"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#a5d4bc] px-7 text-sm font-semibold text-[#0a100f] transition-all hover:bg-[#b8e4cc] hover:shadow-lg hover:shadow-[#a5d4bc]/25"
              >
                {pickIndustrialLocale(industrialPage.contact.primaryCta, locale)}
              </a>
              <a
                href="mailto:yuying76@gmail.com"
                className="inline-flex h-12 items-center justify-center rounded-full border border-[#1a2a27] bg-[#1a2a27]/40 px-7 text-sm font-semibold text-white transition-all hover:bg-[#1a2a27]"
              >
                {pickIndustrialLocale(industrialPage.contact.secondaryCta, locale)}
              </a>
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center rounded-full border border-[#1a2a27]/50 px-7 text-sm font-semibold text-[#889993] transition-all hover:border-[#1a2a27] hover:text-white"
              >
                {pickIndustrialLocale(industrialPage.contact.tertiaryCta, locale)}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#1a2a27]/40 py-10 text-center text-xs text-[#4a5a55]">
        <p>
          Copyright {new Date().getFullYear()} Spartina Technology / 米草科技 ·{" "}
          {pickIndustrialLocale(industrialPage.footer, locale)}
        </p>
      </footer>
    </div>
  );
}
