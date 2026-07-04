"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { assetPath } from "@/lib/asset-path";

export function SiteHeader() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const nav = [
    { href: "/solutions", label: t("nav.solutions", "Solutions") },
    { href: "/industrial", label: t("nav.industrial", "Industrial") },
    { href: "/education", label: t("nav.education", "Education") },
    { href: "/visual-assets", label: t("nav.visualAssets", "Visual Assets") },
    { href: "/workflows", label: t("nav.workflows", "Workflows") },
    { href: "/case-studies", label: t("nav.caseStudies", "Cases") },
    { href: "/team", label: t("nav.team", "Team") },
    { href: "/contact", label: t("nav.contact", "Contact") },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#0a0a0a]/[0.06] bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-[#0a0a0a]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assetPath("/images/brand/logo-mark.png")}
            alt="Spartina Technology"
            width={28}
            height={28}
            className="h-7 w-7 flex-shrink-0 object-contain"
          />
          Spartina Technology
        </Link>

        <nav className="hidden flex-wrap items-center gap-5 text-sm text-[#666666] md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-[#0a0a0a]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle variant="light" />
          <Link
            href="/contact"
            className="hidden rounded-full bg-[#0a0a0a] px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-[#2f4738] sm:inline-flex"
          >
            {t("nav.getInTouch", "Get in touch")}
          </Link>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#666666] md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-[#0a0a0a]/[0.06] bg-white md:hidden">
          <nav className="flex flex-col py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-6 py-3 text-sm text-[#666666] transition-colors hover:bg-[#f6f8f5] hover:text-[#0a0a0a]"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
