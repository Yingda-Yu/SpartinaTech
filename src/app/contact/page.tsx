"use client";

import { useTranslation } from "@/lib/i18n";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { contact } from "@/lib/data";

export default function ContactPage() {
  const { locale, t } = useTranslation();
  const isZh = locale === "zh";

  const inquiryCards = [
    {
      id: "industrial",
      title: ls("Industrial data enhancement", "工业数据增强"),
      suitable: ls(
        "Manufacturing, industrial automation, quality inspection teams",
        "制造业、工业自动化、质量检测团队"
      ),
      input: ls(
        "Real product images, defect samples, inspection requirements",
        "真实产品图像、缺陷样本、检测要求"
      ),
      deliverable: ls(
        "Augmented dataset with masks and labels, ready for model training",
        "增强数据集（含 mask 和标签），可直接用于模型训练"
      ),
    },
    {
      id: "education",
      title: ls("AI education content", "AI 教育内容"),
      suitable: ls(
        "EdTech companies, textbook publishers, education content teams",
        "教育科技公司、教材出版社、教育内容团队"
      ),
      input: ls(
        "Themes, target age range, reading level requirements",
        "主题、目标年龄段、阅读等级要求"
      ),
      deliverable: ls(
        "Leveled reading, essays, illustrations, and course visuals",
        "分级阅读、小作文、插图与课程视觉内容"
      ),
    },
    {
      id: "visual-assets",
      title: ls("Visual asset production", "视觉资产生产"),
      suitable: ls(
        "Brands, e-commerce, marketing teams, SMBs",
        "品牌、电商、营销团队、中小企业"
      ),
      input: ls(
        "Brand guidelines, product samples, style references",
        "品牌规范、产品样本、风格参考"
      ),
      deliverable: ls(
        "Product shots, posters, packaging concepts, social assets",
        "产品图、海报、包装概念、社交素材"
      ),
    },
    {
      id: "workflows",
      title: ls("Custom AI workflow", "定制 AI 工作流"),
      suitable: ls(
        "Engineering teams, product teams, internal tooling",
        "工程团队、产品团队、内部工具"
      ),
      input: ls(
        "Business processes, delivery requirements, existing systems",
        "业务流程、交付要求、现有系统"
      ),
      deliverable: ls(
        "Production workflows, scripts, dashboards, documentation",
        "生产工作流、脚本、看板、文档"
      ),
    },
  ];

  function ls(en: string, zh: string) {
    return { en, zh };
  }

  function pickLocale<T>(obj: { en: T; zh: T }) {
    return obj[locale];
  }

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="pt-14">
        <section className="mx-auto max-w-[1200px] px-6 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-[#5f615f]">
              {t("contact.pageTitle", "Contact")}
            </p>
            <h1 className="mb-6 text-3xl font-semibold tracking-tight text-[#0a0a0a] sm:text-4xl lg:text-5xl">
              {t("contact.pageSubtitle", "Work with Spartina Technology")}
            </h1>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-[#666666]">
              {t("contact.pageDescription", "")}
            </p>
          </div>
        </section>

        <section className="bg-[#fafafa] py-24">
          <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2f4738]">
                {isZh ? "合作方向" : "Project inquiry"}
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-[#0a0a0a] sm:text-3xl">
                {isZh ? "我们可以合作的方向" : "How we can work together"}
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {inquiryCards.map((card) => (
                <article
                  key={card.id}
                  className="rounded-2xl border border-[#e8eae7] bg-white p-6 transition-all hover:border-[#2f4738]/30 hover:shadow-sm"
                >
                  <h3 className="mb-4 text-lg font-semibold text-[#0a0a0a]">
                    {pickLocale(card.title)}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[#5f615f]">
                        {isZh ? "适合" : "Suitable for"}
                      </h4>
                      <p className="text-sm leading-relaxed text-[#666666]">
                        {pickLocale(card.suitable)}
                      </p>
                    </div>
                    <div>
                      <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[#5f615f]">
                        {isZh ? "你可以提供" : "What you can provide"}
                      </h4>
                      <p className="text-sm leading-relaxed text-[#666666]">
                        {pickLocale(card.input)}
                      </p>
                    </div>
                    <div>
                      <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[#5f615f]">
                        {isZh ? "我们可以交付" : "What we can deliver"}
                      </h4>
                      <p className="text-sm leading-relaxed text-[#666666]">
                        {pickLocale(card.deliverable)}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2f4738]">
                {isZh ? "联系方式" : "Contact methods"}
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-[#0a0a0a] sm:text-3xl">
                {isZh ? "如何联系我们" : "How to reach us"}
              </h2>
            </div>
            <div className="mx-auto max-w-2xl">
              <div className="rounded-2xl border border-[#e8eae7] bg-[#fafafa] p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#2f4738]" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-base font-medium text-[#0a0a0a] transition-colors hover:text-[#2f4738]"
                    >
                      {contact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#2f4738]" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 20v-4a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v4" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M21 20v-4a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                    <a
                      href={contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium text-[#0a0a0a] transition-colors hover:text-[#2f4738]"
                    >
                      GitHub
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#2f4738]" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12,6 12,12 16,14" />
                      </svg>
                    </div>
                    <span className="text-base text-[#666666]">
                      {t("contact.remote", "Remote · Worldwide")}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#2f4738]" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <span className="text-base text-[#666666]">
                      {t("contact.incubated", "Incubated by Wenzhou-Kean University")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f6f8f5] py-24">
          <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2f4738]">
                {t("contact.inquiryTitle", "Project inquiry template")}
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-[#0a0a0a] sm:text-3xl">
                {isZh ? "合作咨询模板" : "Use this template for your inquiry"}
              </h2>
              <p className="mt-4 text-sm text-[#666666]">
                {isZh
                  ? "复制以下模板，填写信息后发送邮件给我们。"
                  : "Copy this template, fill in your details, and email us."}
              </p>
            </div>
            <div className="mx-auto max-w-2xl">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <pre className="overflow-x-auto text-sm leading-relaxed text-[#4a4a4a]">
                  <code>
                    {t("contact.projectType", "Project type:")}
                    {"\n"}
                    {t("contact.company", "Company / organization:")}
                    {"\n"}
                    {t("contact.wantToBuild", "What you want to build:")}
                    {"\n"}
                    {t("contact.samples", "Existing samples or materials:")}
                    {"\n"}
                    {t("contact.timeline", "Expected timeline:")}
                    {"\n"}
                    {t("contact.contactInfo", "Contact:")}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
            <div className="rounded-3xl bg-[#fafafa] px-6 py-16 text-center sm:px-10 lg:px-16">
              <h2 className="mx-auto max-w-2xl text-2xl font-semibold text-[#0a0a0a] sm:text-3xl">
                {isZh
                  ? "准备好开始你的项目了吗？"
                  : "Ready to start your project?"}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-[#666666]">
                {isZh
                  ? "发送邮件给我们，描述你的项目方向和需求，我们会尽快回复。"
                  : "Send us an email describing your project direction and requirements. We'll get back to you promptly."}
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2f4738]"
              >
                {t("contact.emailUs", "Email us")}
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
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
