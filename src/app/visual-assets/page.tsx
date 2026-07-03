"use client";

import { useTranslation } from "@/lib/i18n";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { pickLocale, contact, solutions, projects } from "@/lib/data";
import { assetPath } from "@/lib/asset-path";

export default function VisualAssetsPage() {
  const { locale, t } = useTranslation();
  const isZh = locale === "zh";

  const visualService = solutions.find((s) => s.id === "visual-assets");
  const visualProject = projects.find((p) => p.id === "generative-visual-product");

  const modules = isZh
    ? [
        { title: "产品图", desc: "电商、官网、目录用产品摄影级图像" },
        { title: "海报", desc: "营销活动、产品上新、节日海报" },
        { title: "包装概念", desc: "品牌包装设计概念与视觉方案" },
        { title: "社交媒体图", desc: "小红书、公众号、Instagram 等平台素材" },
        { title: "壁纸套装", desc: "手机、桌面、平板多尺寸壁纸" },
        { title: "IP 图像", desc: "品牌吉祥物、角色形象系统" },
      ]
    : [
        { title: "Product Photography", desc: "E-commerce, website, and catalog-ready product imagery" },
        { title: "Marketing Posters", desc: "Campaigns, product launches, and seasonal posters" },
        { title: "Packaging Concepts", desc: "Brand packaging design concepts and visual directions" },
        { title: "Social Media Assets", desc: "Instagram, Xiaohongshu, and platform-specific visuals" },
        { title: "Wallpaper Collections", desc: "Phone, desktop, and tablet multi-size wallpaper sets" },
        { title: "IP Imagery", desc: "Brand mascots, character systems, and IP visuals" },
      ];

  const galleryImages = [
    { src: assetPath("/images/visual-proof/brand-visual-package.webp"), title: isZh ? "品牌视觉包" : "Brand Visual Package" },
    { src: assetPath("/images/visual-proof/wallpaper-collection.webp"), title: isZh ? "壁纸套装" : "Wallpaper Collection" },
    { src: assetPath("/images/visual-proof/education-illustration.webp"), title: isZh ? "教育插图" : "Education Illustration" },
    { src: assetPath("/images/visual-proof/game-character-concept.webp"), title: isZh ? "游戏角色概念" : "Game Character Concept" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="pt-14">
        <section className="mx-auto max-w-[1200px] px-6 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-[#5f615f]">
              {t("visualAssets.pageTitle", "AI Visual Assets")}
            </p>
            <h1 className="mb-6 text-3xl font-semibold tracking-tight text-[#0a0a0a] sm:text-4xl lg:text-5xl">
              {isZh ? "品牌级 AI 视觉资产，以系统方式生成" : "Brand-grade AI visual assets, generated as a system"}
            </h1>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-[#666666]">
              {t("visualAssets.pageDescription", "")}
            </p>
          </div>
        </section>

        {visualService && (
          <section className="bg-[#fafafa] py-24">
            <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div>
                  <div className="overflow-hidden rounded-2xl shadow-sm">
                    <ImageWithFallback
                      src={visualService.image}
                      alt={pickLocale(visualService.title, locale)}
                      aspectRatio="aspect-[4/3]"
                    />
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2f4738]">
                    {isZh ? "为什么选择 AI 视觉资产" : "Why AI visual assets"}
                  </p>
                  <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[#0a0a0a] sm:text-3xl">
                    {isZh ? "风格一致，批量交付，成本可控" : "Consistent style, batch delivery, controlled cost"}
                  </h2>
                  <p className="text-base leading-relaxed text-[#666666]">
                    {pickLocale(visualService.problem!, locale)}
                  </p>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {(isZh
                      ? ["风格锁定，保持品牌一致性", "批量生成，适合上新和营销", "多格式交付，直接可用", "快速迭代，响应市场变化"]
                      : [
                          "Style-locked for brand consistency",
                          "Batch generation for launches and campaigns",
                          "Multi-format delivery, ready to use",
                          "Fast iteration, responsive to market",
                        ]
                    ).map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <svg
                          viewBox="0 0 24 24"
                          className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#2f4738]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="text-sm text-[#4a4a4a]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="py-24">
          <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2f4738]">
                {t("visualAssets.modulesTitle", "What we can produce")}
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-[#0a0a0a] sm:text-3xl">
                {isZh ? "六大类视觉资产，一套生产系统" : "Six visual asset categories, one production system"}
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {modules.map((m) => (
                <div
                  key={m.title}
                  className="rounded-2xl border border-[#e8eae7] bg-white p-6 transition-all hover:border-[#2f4738]/30 hover:shadow-sm"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0f4f1]">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#2f4738]" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-[#0a0a0a]">{m.title}</h3>
                  <p className="text-sm leading-relaxed text-[#666666]">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f6f8f5] py-24">
          <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2f4738]">
                {t("visualAssets.galleryTitle", "Example outputs")}
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-[#0a0a0a] sm:text-3xl">
                {isZh ? "部分输出样例" : "Selected output samples"}
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {galleryImages.map((img) => (
                <div key={img.src} className="group overflow-hidden rounded-2xl bg-white shadow-sm">
                  <div className="overflow-hidden">
                    <ImageWithFallback
                      src={img.src}
                      alt={img.title}
                      aspectRatio="aspect-square"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-medium text-[#0a0a0a]">{img.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {visualProject && (
          <section className="py-24">
            <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className="order-2 lg:order-1">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2f4738]">
                    {t("projects.prototype", "Prototype")}
                  </p>
                  <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[#0a0a0a] sm:text-3xl">
                    {pickLocale(visualProject.title, locale)}
                  </h2>
                  <p className="text-base leading-relaxed text-[#666666]">
                    {pickLocale(visualProject.description, locale)}
                  </p>
                  <div className="mt-6">
                    <h4 className="mb-2 text-sm font-semibold text-[#0a0a0a]">
                      {t("projects.deliverables", "Deliverables")}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {pickLocale(visualProject.deliverables, locale).slice(0, 5).map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-[#f0f4f1] px-3 py-1 text-xs text-[#2f4738]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="overflow-hidden rounded-2xl shadow-sm">
                    <ImageWithFallback
                      src={visualProject.image}
                      alt={pickLocale(visualProject.title, locale)}
                      aspectRatio="aspect-[4/3]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="bg-[#fafafa] py-24">
          <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
            <div className="rounded-3xl bg-[#f6f8f5] px-6 py-16 text-center sm:px-10 lg:px-16">
              <h2 className="mx-auto max-w-2xl text-2xl font-semibold text-[#0a0a0a] sm:text-3xl">
                {t("visualAssets.ctaTitle", "Start a visual asset package")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-[#666666]">
                {isZh
                  ? "告诉我们你的品牌方向和视觉需求，我们可以为你准备一个定制化的视觉资产方案。"
                  : "Tell us about your brand direction and visual needs, and we can prepare a custom visual asset plan."}
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2f4738]"
              >
                {t("visualAssets.ctaButton", "Discuss your project")}
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
