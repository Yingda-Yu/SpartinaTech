"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { pickLocale, contact, workflows } from "@/lib/data";

export default function WorkflowsPage() {
  const { locale, t } = useTranslation();
  const isZh = locale === "zh";

  const deliveryItems = isZh
    ? [
        { title: "工作流文件", icon: "file" },
        { title: "脚本", icon: "code" },
        { title: "数据集包", icon: "database" },
        { title: "视觉资产包", icon: "image" },
        { title: "文档", icon: "doc" },
        { title: "演示页面", icon: "screen" },
        { title: "使用说明", icon: "guide" },
      ]
    : [
        { title: "Workflow files", icon: "file" },
        { title: "Scripts", icon: "code" },
        { title: "Dataset package", icon: "database" },
        { title: "Visual asset package", icon: "image" },
        { title: "Documentation", icon: "doc" },
        { title: "Demo page", icon: "screen" },
        { title: "Training / usage guide", icon: "guide" },
      ];

  const getIcon = (icon: string) => {
    switch (icon) {
      case "file":
        return <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />;
      case "code":
        return <polyline points="16 18 22 12 16 6" />;
      case "database":
        return <ellipse cx="12" cy="5" rx="9" ry="3" />;
      case "image":
        return <rect x="3" y="3" width="18" height="18" rx="2" />;
      case "doc":
        return <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />;
      case "screen":
        return <rect x="2" y="3" width="20" height="14" rx="2" />;
      case "guide":
        return <path d="M9 12l2 2 4-4" />;
      default:
        return <path d="M9 12l2 2 4-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="pt-14">
        <section className="mx-auto max-w-[1200px] px-6 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-[#5f615f]">
              {t("workflows.pageTitle", "Custom AI Workflows")}
            </p>
            <h1 className="mb-6 text-3xl font-semibold tracking-tight text-[#0a0a0a] sm:text-4xl lg:text-5xl">
              {t("workflows.pageSubtitle", "Custom AI production workflows for repeatable delivery.")}
            </h1>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-[#666666]">
              {t("workflows.pageDescription", "")}
            </p>
          </div>
        </section>

        <section className="bg-[#f6f8f5] py-20">
          <div className="mx-auto max-w-3xl px-6 text-center sm:px-8 lg:px-10">
            <p className="text-lg leading-relaxed text-[#0a0a0a]">
              {t("workflows.whyWorkflows", "")}
            </p>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2f4738]">
                {isZh ? "工作流类型" : "Workflow types"}
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-[#0a0a0a] sm:text-3xl">
                {isZh ? "五类可定制的 AI 生产工作流" : "Five types of customizable AI production workflows"}
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {workflows.map((workflow) => (
                <article
                  key={workflow.id}
                  className="rounded-2xl border border-[#e8eae7] bg-white p-6 transition-all hover:border-[#2f4738]/30 hover:shadow-sm"
                >
                  <h3 className="mb-4 text-base font-semibold text-[#0a0a0a]">
                    {pickLocale(workflow.title, locale)}
                  </h3>
                  <div className="mb-4">
                    <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[#5f615f]">
                      {t("solutions.problem", "Problem")}
                    </h4>
                    <p className="text-sm leading-relaxed text-[#666666]">
                      {pickLocale(workflow.problem, locale)}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[#5f615f]">
                      {isZh ? "我们做什么" : "What we do"}
                    </h4>
                    <p className="text-sm leading-relaxed text-[#666666]">
                      {pickLocale(workflow.whatWeDo, locale)}
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#5f615f]">
                      {t("solutions.deliverables", "Deliverables")}
                    </h4>
                    <ul className="space-y-1.5">
                      {pickLocale(workflow.deliverables, locale).map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs text-[#4a4a4a]"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#2f4738]"
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
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fafafa] py-24">
          <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2f4738]">
                {t("workflows.deliveryTitle", "Delivery package")}
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-[#0a0a0a] sm:text-3xl">
                {isZh ? "标准化交付包内容" : "Standardized delivery package contents"}
              </h2>
            </div>
            <div className="mx-auto max-w-3xl">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {deliveryItems.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-sm"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0f4f1]">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#2f4738]" fill="none" stroke="currentColor" strokeWidth="2">
                        {getIcon(item.icon)}
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-[#0a0a0a]">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
            <div className="rounded-3xl bg-[#f6f8f5] px-6 py-16 text-center sm:px-10 lg:px-16">
              <h2 className="mx-auto max-w-2xl text-2xl font-semibold text-[#0a0a0a] sm:text-3xl">
                {t("workflows.ctaTitle", "Build a custom AI workflow")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-[#666666]">
                {isZh
                  ? "告诉我们你的业务流程和交付需求，我们可以为你设计一个定制化的 AI 生产工作流。"
                  : "Tell us about your business processes and delivery requirements, and we can design a custom AI production workflow for you."}
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2f4738]"
              >
                {t("workflows.ctaButton", "Contact us")}
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
