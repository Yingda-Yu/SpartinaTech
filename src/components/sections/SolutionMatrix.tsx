"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { solutions, pickLocale } from "@/lib/data";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

export function SolutionMatrix() {
  const { locale, t } = useTranslation();

  return (
    <section
      id="what-we-build"
      className="relative overflow-hidden bg-white px-6 py-28 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-3xl">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-[#5f615f]">
            {t("solutions.sectionEyebrow", "What We Build")}
          </p>
          <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#0a0a0a]">
            {t("solutions.sectionTitle", "Six service areas.")}
            <br />
            <span className="text-[#2f4738]">
              {t("solutions.sectionTitleAccent", "One production system.")}
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-[1.6] text-[#666666]">
            {t("solutions.sectionSubtitle")}
          </p>
        </div>

        <div className="mt-24 space-y-24 lg:space-y-32">
          {solutions.map((solution, index) => {
            const isImageLeft = index % 2 === 0;
            return (
              <div
                key={solution.id}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                {/* Image side */}
                <div className={isImageLeft ? "lg:order-1" : "lg:order-2"}>
                  <Link
                    href={solution.href ?? "#"}
                    className="group relative block overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] transition-shadow duration-500 hover:shadow-[var(--shadow-xl)]"
                  >
                    <ImageWithFallback
                      src={solution.image}
                      alt={pickLocale(solution.title, locale)}
                      aspectRatio="aspect-[4/3]"
                      wrapperClassName="rounded-[var(--radius-lg)]"
                      className="img-zoom"
                      priority={index < 3}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    {solution.href && (
                      <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#0a0a0a] backdrop-blur-md opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
                        {t("solutions.viewPlatform", "View platform")}
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </Link>
                </div>

                {/* Text side */}
                <div className={isImageLeft ? "lg:order-2" : "lg:order-1"}>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2f4738]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px w-12 bg-[#2f4738]/30" />
                  </div>
                  <h3 className="mt-5 text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.01em] text-[#0a0a0a]">
                    {pickLocale(solution.title, locale)}
                  </h3>
                  <p className="mt-3 text-base font-medium text-[#2f4738]">
                    {pickLocale(solution.subtitle, locale)}
                  </p>
                  <p className="mt-5 max-w-md text-[15px] leading-[1.65] text-[#666666]">
                    {pickLocale(solution.description, locale)}
                  </p>
                  <ul className="mt-7 space-y-3">
                    {pickLocale(solution.keyPoints, locale).map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm text-[#4a4a4a]"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#2f4738]"
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
