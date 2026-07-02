"use client";

import { useTranslation } from "@/lib/i18n";
import { visualProofItems, pickLocale } from "@/lib/data";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

export function VisualProofSection() {
  const { locale, t } = useTranslation();

  return (
    <section
      id="visual-proof"
      className="relative overflow-hidden bg-[#faf8f4] px-6 py-28 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-3xl">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-[#5f615f]">
            {t("visualProof.sectionEyebrow", "Visual Proof")}
          </p>
          <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#0a0a0a]">
            {t("visualProof.sectionTitle", "Real outputs.")}
            <br />
            <span className="text-[#2f4738]">
              {t("visualProof.sectionTitleAccent", "Not renders.")}
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-[1.6] text-[#666666]">
            {t("visualProof.sectionSubtitle")}
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visualProofItems.map((item) => (
            <article
              key={item.id}
              className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-[#0a0a0a]/[0.06] bg-white shadow-[var(--shadow-sm)] transition-all duration-500 hover:shadow-[var(--shadow-lg)]"
            >
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={pickLocale(item.title, locale)}
                  aspectRatio="aspect-[4/5]"
                  wrapperClassName="rounded-t-[var(--radius-lg)]"
                  className="img-zoom"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#0a0a0a] backdrop-blur-md">
                    {pickLocale(item.category, locale)}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-base font-semibold text-[#0a0a0a]">
                  {pickLocale(item.title, locale)}
                </h3>
                <p className="mt-2 text-sm leading-[1.55] text-[#666666]">
                  {pickLocale(item.description, locale)}
                </p>

                <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#2f4738]/[0.04] px-3 py-2.5">
                  <span className="text-xs font-medium text-[#666666]">
                    {pickLocale(item.transform.from, locale)}
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5 flex-shrink-0 text-[#2f4738]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                  <span className="text-xs font-semibold text-[#2f4738]">
                    {pickLocale(item.transform.to, locale)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
