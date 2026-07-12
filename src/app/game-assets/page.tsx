"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { assetPath } from "@/lib/asset-path";
import {
  gameProblemPoints,
  gameDeliverables,
  gameWorkflowSteps,
  gameUseCases,
  pickGameLocale,
} from "@/lib/game-assets-data";

export default function GameAssetsPage() {
  const { locale, t } = useTranslation();
  const isZh = locale === "zh";

  const heroImage = assetPath("/images/game-assets/game-interactive-assets-hero.webp");
  const pipelineImage = assetPath("/images/game-assets/comfyui-content-pipeline.webp");
  const annotationImage = assetPath("/images/game-assets/spot-difference-annotation.webp");

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="pt-14">
        {/* Hero */}
        <section className="mx-auto max-w-[1200px] px-6 py-24 sm:px-8 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-[#5f615f]">
                {t("gameAssets.pageEyebrow", "Game & Interactive Assets")}
              </p>
              <h1 className="mb-6 text-3xl font-semibold leading-[1.1] tracking-tight text-[#0a0a0a] sm:text-4xl lg:text-5xl">
                {t("gameAssets.heroTitle", "")}
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-[#666666]">
                {t("gameAssets.heroDescription", "")}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  href="#workflow"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#2f4738]"
                >
                  {t("gameAssets.viewWorkflow", "View workflow")}
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-2 rounded-full border border-[#e8eae7] bg-white px-5 py-2.5 text-xs font-semibold text-[#0a0a0a] transition-all hover:border-[#2f4738]/30 hover:bg-[#f6f8f5]"
                >
                  {t("gameAssets.seeCaseStudy", "See case study")}
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-[#e8eae7] bg-white px-5 py-2.5 text-xs font-semibold text-[#0a0a0a] transition-all hover:border-[#2f4738]/30 hover:bg-[#f6f8f5]"
                >
                  {t("gameAssets.discussProject", "Discuss a game project")}
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-[24px] bg-[#f6f8f5] shadow-sm">
              <ImageWithFallback
                src={heroImage}
                alt={isZh ? "游戏与互动内容资产总览" : "Game & Interactive Assets overview"}
                aspectRatio="aspect-[4/3]"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="bg-[#fafafa] py-24">
          <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2f4738]">
                {t("gameAssets.problemTitle", "Why game asset production is hard")}
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-[#0a0a0a] sm:text-3xl">
                {t("gameAssets.problemSubtitle", "")}
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {gameProblemPoints.map((point) => (
                <article
                  key={point.id}
                  className="rounded-2xl border border-[#e8eae7] bg-white p-6 transition-all hover:border-[#2f4738]/30 hover:shadow-sm"
                >
                  <h3 className="mb-2 text-base font-semibold text-[#0a0a0a]">
                    {pickGameLocale(point.title, locale)}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#666666]">
                    {pickGameLocale(point.description, locale)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Deliverables */}
        <section className="py-24">
          <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2f4738]">
                {t("gameAssets.deliverablesTitle", "What we build")}
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-[#0a0a0a] sm:text-3xl">
                {t("gameAssets.deliverablesSubtitle", "")}
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {gameDeliverables.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-[#e8eae7] bg-white p-6 transition-all hover:border-[#2f4738]/30 hover:shadow-sm"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0f4f1]">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#2f4738]" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-[#0a0a0a]">
                    {pickGameLocale(item.title, locale)}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#666666]">
                    {pickGameLocale(item.description, locale)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section id="workflow" className="bg-[#fafafa] py-24">
          <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2f4738]">
                {t("gameAssets.workflowTitle", "Pipeline")}
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-[#0a0a0a] sm:text-3xl">
                {t("gameAssets.workflowSubtitle", "")}
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {gameWorkflowSteps.map((step) => (
                <article
                  key={step.step}
                  className="relative rounded-2xl border border-[#e8eae7] bg-white p-6 transition-all hover:border-[#2f4738]/30 hover:shadow-sm"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0a0a0a] text-xs font-semibold text-white">
                      {step.step}
                    </span>
                    <div className="h-px flex-1 bg-[#e8eae7]" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-[#0a0a0a]">
                    {pickGameLocale(step.title, locale)}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#666666]">
                    {pickGameLocale(step.description, locale)}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-14">
              <div className="overflow-hidden rounded-[24px] bg-white shadow-sm ring-1 ring-[#e8eae7]">
                <ImageWithFallback
                  src={pipelineImage}
                  alt={isZh ? "ComfyUI 内容生成管线" : "ComfyUI content pipeline"}
                  aspectRatio="aspect-[16/9]"
                  className="object-contain"
                />
              </div>
              <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-[#666666]">
                {t("gameAssets.workflowImageCaption", "")}
              </p>
            </div>
          </div>
        </section>

        {/* Internal tool / pipeline */}
        <section className="py-24">
          <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2f4738]">
                  {isZh ? "ComfyUI + 自研标注" : "ComfyUI + custom annotation"}
                </p>
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[#0a0a0a] sm:text-3xl">
                  {t("gameAssets.internalToolTitle", "")}
                </h2>
                <p className="text-base leading-relaxed text-[#666666]">
                  {t("gameAssets.internalToolBody", "")}
                </p>
                <ul className="mt-6 space-y-3">
                  {[t("gameAssets.internalToolBullet1", ""), t("gameAssets.internalToolBullet2", ""), t("gameAssets.internalToolBullet3", "")].map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-sm text-[#4a4a4a]">
                      <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#2f4738]" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="overflow-hidden rounded-[24px] bg-[#f6f8f5] shadow-sm">
                <ImageWithFallback
                  src={annotationImage}
                  alt={isZh ? "找不同标注工具" : "Spot-the-difference annotation tool"}
                  aspectRatio="aspect-[4/3]"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="bg-[#fafafa] py-24">
          <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2f4738]">
                {t("gameAssets.useCasesTitle", "Use cases")}
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-[#0a0a0a] sm:text-3xl">
                {t("gameAssets.useCasesSubtitle", "")}
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {gameUseCases.map((useCase) => (
                <article
                  key={useCase.id}
                  className="rounded-2xl border border-[#e8eae7] bg-white p-6 transition-all hover:border-[#2f4738]/30 hover:shadow-sm"
                >
                  <h3 className="mb-2 text-base font-semibold text-[#0a0a0a]">
                    {pickGameLocale(useCase.title, locale)}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#666666]">
                    {pickGameLocale(useCase.description, locale)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
            <div className="rounded-3xl bg-[#f6f8f5] px-6 py-16 text-center sm:px-10 lg:px-16">
              <h2 className="mx-auto max-w-2xl text-2xl font-semibold text-[#0a0a0a] sm:text-3xl">
                {t("gameAssets.ctaTitle", "")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-[#666666]">
                {t("gameAssets.ctaBody", "")}
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2f4738]"
              >
                {t("gameAssets.ctaButton", "Discuss a game project")}
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
