"use client";

import { useTranslation } from "@/lib/i18n";
import { contact } from "@/lib/data";

export function Contact() {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#0a0a0a] px-6 py-32 sm:px-8 lg:px-10"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 25% 30%, rgba(47,71,56,0.35), transparent 60%), radial-gradient(ellipse 45% 35% at 80% 75%, rgba(211,121,66,0.18), transparent 60%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 30%, transparent 80%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="max-w-3xl">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-[#a5d4bc]">
            {t("contact.sectionEyebrow", "Contact")}
          </p>
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white">
            {t("contact.sectionTitleLine1", "Let's build something")}
            <br />
            <span className="bg-gradient-to-r from-[#a5d4bc] via-[#c0d0c8] to-[#a5d4bc] bg-clip-text text-transparent">
              {t("contact.sectionTitleAccent", "that ships.")}
            </span>
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-[1.6] text-[#999999]">
            {t("contact.ctaTitle")}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-[#0a0a0a] transition-all duration-300 hover:bg-[#a5d4bc] hover:shadow-lg hover:shadow-[#a5d4bc]/20"
            >
              {t("contact.primaryCta", "Contact Spartina Technology")}
            </a>
            <a
              href={`mailto:${contact.email}?subject=B2B%20Project%20Inquiry`}
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {t("contact.secondaryCta", "Discuss a B2B Project")}
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-transparent px-7 text-sm font-semibold text-white/80 transition-colors hover:border-white/30 hover:text-white"
            >
              {t("contact.tertiaryCta", "View GitHub / Portfolio")}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-8 text-sm text-[#666666]">
            <a
              href={`mailto:${contact.email}`}
              className="transition-colors hover:text-white"
            >
              {contact.email}
            </a>
            <span className="hidden h-3 w-px bg-white/10 sm:block" />
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              GitHub
            </a>
            <span className="hidden h-3 w-px bg-white/10 sm:block" />
            <span>{t("contact.remote", "Remote · Worldwide")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
