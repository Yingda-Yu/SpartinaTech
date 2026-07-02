"use client";

import { useTranslation } from "@/lib/i18n";

type Variant = "light" | "dark";

interface LanguageToggleProps {
  variant?: Variant;
}

export function LanguageToggle({ variant = "light" }: LanguageToggleProps) {
  const { locale, toggleLocale, t } = useTranslation();
  const isEn = locale === "en";

  const baseStyles =
    "relative inline-flex items-center rounded-full px-1 py-1 text-xs font-semibold transition-all duration-300";

  const variantStyles =
    variant === "light"
      ? "bg-[#0a0a0a]/5 text-[#666666] hover:bg-[#0a0a0a]/10"
      : "bg-white/5 text-white/50 hover:bg-white/10 border border-white/10";

  const pillBase =
    "absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-out";

  const pillVariant =
    variant === "light"
      ? "bg-[#0a0a0a] text-white shadow-sm"
      : "bg-[#a5d4bc] text-[#0a100f] shadow-lg shadow-[#a5d4bc]/20";

  // Pill position: left for EN, right for 中文
  const pillStyle = isEn
    ? { left: "4px", right: "50%" }
    : { left: "50%", right: "4px" };

  return (
    <button
      onClick={toggleLocale}
      className={`${baseStyles} ${variantStyles} min-w-[84px]`}
      aria-label="Toggle language"
      title={isEn ? "切换到中文" : "Switch to English"}
    >
      {/* Animated pill */}
      <span
        className={`${pillBase} ${pillVariant}`}
        style={pillStyle}
        aria-hidden
      />

      <span className="relative z-10 flex w-10 items-center justify-center py-1">
        {t("language.english", "EN")}
      </span>
      <span
        className={`relative z-10 h-3 w-px ${
          variant === "light" ? "bg-[#0a0a0a]/10" : "bg-white/10"
        }`}
        aria-hidden
      />
      <span className="relative z-10 flex w-10 items-center justify-center py-1">
        {t("language.chinese", "中")}
      </span>
    </button>
  );
}
