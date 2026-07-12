"use client";

import { useTranslation } from "@/lib/i18n";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { pickLocale, contact, solutions, projects } from "@/lib/data";

export default function EducationPage() {
  const { locale, t } = useTranslation();
  const isZh = locale === "zh";

  const educationService = solutions.find((s) => s.id === "ai-education");
  const leoMiaProject = projects.find((p) => p.id === "leo-mia-education");

  const workflowSteps = isZh
    ? [
        { title: "主题策划", desc: "确定内容主题、年龄段与学习目标" },
        { title: "文案生成", desc: "生成分级阅读、小作文、课程文案" },
        { title: "插图生成", desc: "风格一致的系列化插图与角色设计" },
        { title: "分级整理", desc: "按语言难度和年龄段分级整理" },
        { title: "多平台发布", desc: "适配图书、App、公众号等多格式" },
      ]
    : [
        { title: "Topic Planning", desc: "Define themes, age groups, and learning objectives" },
        { title: "Copy Generation", desc: "Leveled reading passages, essays, and course text" },
        { title: "Illustration", desc: "Style-consistent series illustrations and character design" },
        { title: "Leveling", desc: "Organize by language proficiency and age groups" },
        { title: "Multi-channel", desc: "Adapt for books, apps, social, and more" },
      ];

  const solutionItems = isZh
    ? [
        { title: "分级阅读", desc: "按 CEFR/蓝思等标准生成分级文章" },
        { title: "小作文", desc: "各种主题和难度的英文短文" },
        { title: "课程插图", desc: "与内容高度匹配的教学用图" },
        { title: "儿童 IP", desc: "稳定的角色形象与世界观" },
        { title: "系列化内容", desc: "可长期更新的内容系列" },
      ]
    : [
        { title: "Leveled Reading", desc: "Passages graded by CEFR / Lexile standards" },
        { title: "Short Essays", desc: "English essays across topics and difficulty levels" },
        { title: "Course Illustrations", desc: "Content-aligned educational visuals" },
        { title: "Children's IP", desc: "Consistent characters and world-building" },
        { title: "Serialized Content", desc: "Long-form series ready for ongoing updates" },
      ];

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="pt-14">
        <section className="mx-auto max-w-[1200px] px-6 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-[#5f615f]">
              {t("education.pageTitle", "AI for Education")}
            </p>
            <h1 className="mb-6 text-3xl font-semibold tracking-tight text-[#0a0a0a] sm:text-4xl lg:text-5xl">
              {isZh ? "规模化生产 AI 驱动的教育内容" : "AI-powered educational content at scale"}
            </h1>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-[#666666]">
              {t("education.pageDescription", "")}
            </p>
          </div>
        </section>

        {educationService && (
          <section className="bg-[#fafafa] py-24">
            <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className="order-2 lg:order-1">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2f4738]">
                    {t("education.problemTitle", "Why educational content production is hard")}
                  </p>
                  <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[#0a0a0a] sm:text-3xl">
                    {isZh ? "传统生产方式跟不上需求" : "Traditional production can't keep up"}
                  </h2>
                  <p className="text-base leading-relaxed text-[#666666]">
                    {pickLocale(educationService.problem!, locale)}
                  </p>
                  <div className="mt-8 space-y-3">
                    {(isZh
                      ? ["生产周期长，更新慢", "插画成本高，风格难统一", "图文一致性难保证", "系列化内容维护困难"]
                      : [
                          "Long production cycles, slow updates",
                          "High illustration costs, inconsistent styles",
                          "Text-image alignment is hard to guarantee",
                          "Serialized content is difficult to maintain",
                        ]
                    ).map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2f4738]" />
                        <p className="text-sm text-[#4a4a4a]">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="overflow-hidden rounded-2xl shadow-sm">
                    <ImageWithFallback
                      src={educationService.image}
                      alt={pickLocale(educationService.title, locale)}
                      aspectRatio="aspect-[4/3]"
                    />
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
                {t("education.solutionTitle", "What we deliver")}
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-[#0a0a0a] sm:text-3xl">
                {isZh ? "一套完整的教育内容生产方案" : "A complete educational content pipeline"}
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {solutionItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#e8eae7] bg-white p-6 transition-all hover:border-[#2f4738]/30 hover:shadow-sm"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0f4f1]">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#2f4738]" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-[#0a0a0a]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[#666666]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f6f8f5] py-24">
          <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2f4738]">
                {t("education.workflowTitle", "How it works")}
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-[#0a0a0a] sm:text-3xl">
                {isZh ? "五步内容生产工作流" : "Five-step content production workflow"}
              </h2>
            </div>
            <div className="relative">
              <div className="absolute left-8 top-0 hidden h-full w-px bg-[#2f4738]/20 lg:block" />
              <div className="space-y-6 lg:space-y-8">
                {workflowSteps.map((step, index) => (
                  <div key={step.title} className="relative flex gap-6">
                    <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-[#e8eae7]">
                      <span className="text-lg font-semibold text-[#2f4738]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex items-center rounded-2xl bg-white px-6 py-5 shadow-sm ring-1 ring-[#e8eae7]">
                      <div>
                        <h3 className="text-base font-semibold text-[#0a0a0a]">{step.title}</h3>
                        <p className="mt-1 text-sm text-[#666666]">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {educationService && (
          <section className="py-24">
            <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
              <div className="mx-auto mb-14 max-w-2xl text-center">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2f4738]">
                  {t("education.deliverablesTitle", "Deliverables")}
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-[#0a0a0a] sm:text-3xl">
                  {isZh ? "以可交付资产包的形式交付" : "Delivered as ready-to-use asset packages"}
                </h2>
              </div>
              <div className="mx-auto max-w-3xl">
                <div className="grid gap-3 sm:grid-cols-2">
                  {pickLocale(educationService.deliverables!, locale).map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl bg-[#fafafa] px-5 py-4"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0 text-[#2f4738]" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-sm font-medium text-[#0a0a0a]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {leoMiaProject && (
          <section className="bg-[#fafafa] py-24">
            <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div>
                  <div className="overflow-hidden rounded-2xl shadow-sm">
                    <ImageWithFallback
                      src={leoMiaProject.image}
                      alt={pickLocale(leoMiaProject.title, locale)}
                      aspectRatio="aspect-[4/3]"
                    />
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2f4738]">
                    {t("projects.internalDemo", "Internal Demo")}
                  </p>
                  <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[#0a0a0a] sm:text-3xl">
                    {pickLocale(leoMiaProject.title, locale)}
                  </h2>
                  <p className="text-base leading-relaxed text-[#666666]">
                    {pickLocale(leoMiaProject.description, locale)}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {pickLocale(leoMiaProject.deliverables, locale).slice(0, 4).map((item) => (
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
            </div>
          </section>
        )}

        <section className="py-24">
          <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
            <div className="rounded-3xl bg-[#f6f8f5] px-6 py-16 text-center sm:px-10 lg:px-16">
              <h2 className="mx-auto max-w-2xl text-2xl font-semibold text-[#0a0a0a] sm:text-3xl">
                {t("education.ctaTitle", "Start an education content project")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-[#666666]">
                {isZh
                  ? "告诉我们你的内容方向和目标，我们可以为你准备一个定制化的演示内容包。"
                  : "Tell us about your content direction and goals, and we can prepare a custom demo package."}
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2f4738]"
              >
                {t("education.ctaButton", "Request a demo package")}
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
