"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { solutions, pickLocale, contact } from "@/lib/data";

export default function SolutionsPage() {
  const { locale, t } = useTranslation();
  const isZh = locale === "zh";

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="pt-14">
        <section className="mx-auto max-w-[1200px] px-6 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-[#5f615f]">
              {t("solutions.pageTitle", "Solutions")}
            </p>
            <h1 className="mb-6 text-3xl font-semibold tracking-tight text-[#0a0a0a] sm:text-4xl lg:text-5xl">
              {isZh ? "六大 AI 服务方向" : "Six AI service areas"}
            </h1>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-[#666666]">
              {t("solutions.pageSubtitle", "Six AI service areas, all built on the same production system.")}
            </p>
          </div>
        </section>

        <section className="bg-[#fafafa] py-24">
          <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
            <div className="space-y-20 lg:space-y-28">
              {solutions.map((solution, index) => {
                const isImageLeft = index % 2 === 0;
                return (
                  <div
                    key={solution.id}
                    className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                  >
                    <div className={isImageLeft ? "lg:order-1" : "lg:order-2"}>
                      <div className="overflow-hidden rounded-2xl shadow-sm">
                        <ImageWithFallback
                          src={solution.image}
                          alt={pickLocale(solution.title, locale)}
                          aspectRatio="aspect-[4/3]"
                        />
                      </div>
                    </div>

                    <div className={isImageLeft ? "lg:order-2" : "lg:order-1"}>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2f4738]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="h-px w-12 bg-[#2f4738]/30" />
                      </div>
                      <h2 className="mt-5 text-2xl font-semibold tracking-tight text-[#0a0a0a] sm:text-3xl">
                        {pickLocale(solution.title, locale)}
                      </h2>
                      <p className="mt-2 text-base font-medium text-[#2f4738]">
                        {pickLocale(solution.subtitle, locale)}
                      </p>
                      <p className="mt-5 text-[15px] leading-relaxed text-[#666666]">
                        {pickLocale(solution.description, locale)}
                      </p>

                      {solution.problem && (
                        <div className="mt-6">
                          <h4 className="mb-2 text-sm font-semibold text-[#0a0a0a]">
                            {t("solutions.problem", "Problem")}
                          </h4>
                          <p className="text-sm leading-relaxed text-[#666666]">
                            {pickLocale(solution.problem, locale)}
                          </p>
                        </div>
                      )}

                      {solution.deliverables && (
                        <div className="mt-6">
                          <h4 className="mb-2 text-sm font-semibold text-[#0a0a0a]">
                            {t("solutions.deliverables", "Deliverables")}
                          </h4>
                          <ul className="space-y-1.5">
                            {pickLocale(solution.deliverables, locale).map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2 text-sm text-[#4a4a4a]"
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
                      )}

                      {solution.targetClients && (
                        <div className="mt-6">
                          <h4 className="mb-2 text-sm font-semibold text-[#0a0a0a]">
                            {t("solutions.targetClients", "Ideal for")}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {pickLocale(solution.targetClients, locale).map((item) => (
                              <span
                                key={item}
                                className="rounded-full bg-[#f0f4f1] px-3 py-1 text-xs text-[#2f4738]"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {solution.href && (
                        <Link
                          href={solution.href}
                          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#2f4738]"
                        >
                          {t("solutions.learnMore", "Learn more")}
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      )}
                    </div>
                  </div>
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
