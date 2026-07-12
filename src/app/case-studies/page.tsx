"use client";

import { useTranslation } from "@/lib/i18n";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { pickLocale, contact, projects } from "@/lib/data";

export default function CaseStudiesPage() {
  const { locale, t } = useTranslation();
  const isZh = locale === "zh";

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="pt-14">
        <section className="mx-auto max-w-[1200px] px-6 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-[#5f615f]">
              {t("caseStudies.pageTitle", "Case Studies")}
            </p>
            <h1 className="mb-6 text-3xl font-semibold tracking-tight text-[#0a0a0a] sm:text-4xl lg:text-5xl">
              {isZh ? "内部演示与原型项目" : "Internal demos & prototype projects"}
            </h1>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-[#666666]">
              {t("caseStudies.pageDescription", "")}
            </p>
          </div>
        </section>

        <section className="bg-[#fafafa] py-24">
          <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
            <div className="space-y-20 lg:space-y-28">
              {projects.map((project, index) => {
                const isImageLeft = index % 2 === 0;
                return (
                  <article
                    key={project.id}
                    className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16"
                  >
                    <div className={isImageLeft ? "lg:order-1" : "lg:order-2"}>
                      <div className="overflow-hidden rounded-2xl shadow-sm">
                        <ImageWithFallback
                          src={project.image}
                          alt={pickLocale(project.title, locale)}
                          aspectRatio="aspect-[4/3]"
                          className={project.imageFit === "contain" ? "object-contain" : ""}
                        />
                      </div>
                    </div>

                    <div className={isImageLeft ? "lg:order-2" : "lg:order-1"}>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-[#f0f4f1] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#2f4738]">
                          {pickLocale(project.category, locale)}
                        </span>
                        <span className="rounded-full bg-[#e8eae7] px-3 py-1 text-[11px] font-medium text-[#5f615f]">
                          {pickLocale(project.status, locale)}
                        </span>
                      </div>

                      <h2 className="mt-5 text-2xl font-semibold tracking-tight text-[#0a0a0a] sm:text-3xl">
                        {pickLocale(project.title, locale)}
                      </h2>
                      <p className="mt-4 text-[15px] leading-relaxed text-[#666666]">
                        {pickLocale(project.description, locale)}
                      </p>

                      {project.problem && (
                        <div className="mt-6">
                          <h4 className="mb-2 text-sm font-semibold text-[#0a0a0a]">
                            {t("projects.problem", "Problem")}
                          </h4>
                          <p className="text-sm leading-relaxed text-[#666666]">
                            {pickLocale(project.problem, locale)}
                          </p>
                        </div>
                      )}

                      {project.input && (
                        <div className="mt-6">
                          <h4 className="mb-2 text-sm font-semibold text-[#0a0a0a]">
                            {t("projects.input", "Input")}
                          </h4>
                          <p className="text-sm leading-relaxed text-[#666666]">
                            {pickLocale(project.input, locale)}
                          </p>
                        </div>
                      )}

                      {project.process && (
                        <div className="mt-6">
                          <h4 className="mb-2 text-sm font-semibold text-[#0a0a0a]">
                            {t("projects.process", "Process")}
                          </h4>
                          <ol className="space-y-2">
                            {pickLocale(project.process, locale).map((step, i) => (
                              <li
                                key={step}
                                className="flex items-start gap-3 text-sm text-[#4a4a4a]"
                              >
                                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#f0f4f1] text-[10px] font-semibold text-[#2f4738]">
                                  {i + 1}
                                </span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}

                      <div className="mt-6">
                        <h4 className="mb-2 text-sm font-semibold text-[#0a0a0a]">
                          {t("projects.deliverables", "Deliverables")}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {pickLocale(project.deliverables, locale).map((item) => (
                            <span
                              key={item}
                              className="rounded-full bg-white px-3 py-1 text-xs text-[#2f4738] ring-1 ring-[#e8eae7]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
            <div className="rounded-3xl bg-[#f6f8f5] px-6 py-16 text-center sm:px-10 lg:px-16">
              <h2 className="mx-auto max-w-2xl text-2xl font-semibold text-[#0a0a0a] sm:text-3xl">
                {t("cta.title", "Want to explore a project with Spartina Technology?")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-[#666666]">
                {isZh
                  ? "带着你的样本、想法或生产瓶颈来找我们，我们会把它们转化为可交付的 AI 产品。"
                  : "Bring us your samples, ideas, or production bottlenecks — we turn them into deliverable AI products."}
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2f4738]"
              >
                {t("cta.button", "Contact us")}
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
