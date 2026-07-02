"use client";

import { useTranslation } from "@/lib/i18n";
import { site } from "@/lib/data";

export function SiteFooter() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-[#0a0a0a]/[0.06] bg-white py-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-6 sm:flex-row sm:px-8 lg:px-10">
        <p className="text-xs text-[#666666]">
          © {new Date().getFullYear()} {site.name} / {site.chineseName}
        </p>
        <p className="text-xs text-[#999999]">
          {t("footer.tagline", "AI services for data, vision, and industry workflows.")}
        </p>
      </div>
    </footer>
  );
}
