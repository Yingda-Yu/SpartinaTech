"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { site, contact } from "@/lib/data";

export function SiteFooter() {
  const { locale, t } = useTranslation();
  const isZh = locale === "zh";

  return (
    <footer className="border-t border-[#0a0a0a]/[0.06] bg-white py-16">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-tight text-[#0a0a0a]">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2f4738] text-white">
                S
              </span>
              {site.name}
            </div>
            <p className="text-sm leading-relaxed text-[#666666]">
              {isZh
                ? "面向数据、视觉资产、教育内容与行业工作流的 AI 服务公司。"
                : "AI services for data, visual assets, education content, and industry workflows."}
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#0a0a0a]">
              {isZh ? "解决方案" : "Solutions"}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/industrial"
                  className="text-sm text-[#666666] transition-colors hover:text-[#0a0a0a]"
                >
                  {isZh ? "工业数据增强" : "Industrial Data Enhancement"}
                </Link>
              </li>
              <li>
                <Link
                  href="/education"
                  className="text-sm text-[#666666] transition-colors hover:text-[#0a0a0a]"
                >
                  {isZh ? "AI 教育内容" : "AI Education"}
                </Link>
              </li>
              <li>
                <Link
                  href="/visual-assets"
                  className="text-sm text-[#666666] transition-colors hover:text-[#0a0a0a]"
                >
                  {isZh ? "视觉资产" : "Visual Assets"}
                </Link>
              </li>
              <li>
                <Link
                  href="/game-assets"
                  className="text-sm text-[#666666] transition-colors hover:text-[#0a0a0a]"
                >
                  {isZh ? "游戏与互动资产" : "Game & Interactive Assets"}
                </Link>
              </li>
              <li>
                <Link
                  href="/workflows"
                  className="text-sm text-[#666666] transition-colors hover:text-[#0a0a0a]"
                >
                  {isZh ? "定制工作流" : "Custom Workflows"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#0a0a0a]">
              {isZh ? "公司" : "Company"}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/team"
                  className="text-sm text-[#666666] transition-colors hover:text-[#0a0a0a]"
                >
                  {isZh ? "团队" : "Team"}
                </Link>
              </li>
              <li>
                <Link
                  href="/case-studies"
                  className="text-sm text-[#666666] transition-colors hover:text-[#0a0a0a]"
                >
                  {isZh ? "案例" : "Case Studies"}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-[#666666] transition-colors hover:text-[#0a0a0a]"
                >
                  {isZh ? "联系" : "Contact"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#0a0a0a]">
              {isZh ? "联系我们" : "Contact"}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm text-[#666666] transition-colors hover:text-[#0a0a0a]"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#666666] transition-colors hover:text-[#0a0a0a]"
                >
                  GitHub
                </a>
              </li>
              <li>
                <p className="text-sm text-[#666666]">
                  {t("contact.incubated", "Incubated by Wenzhou-Kean University")}
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#0a0a0a]/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-[#666666]">
            © {new Date().getFullYear()} {site.name} / {site.chineseName}
          </p>
          <p className="text-xs text-[#999999]">
            {t("footer.tagline", "AI services for data, vision, and industry workflows.")}
          </p>
        </div>
      </div>
    </footer>
  );
}
