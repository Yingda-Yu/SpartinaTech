"use client";

import { useState, useCallback } from "react";
import { contact } from "@/lib/data";
import { Section } from "@/components/ui/Section";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = contact.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return (
    <section
      id="contact"
      className="relative w-full border-t border-white/[0.06] bg-black scroll-mt-20"
    >
      {/* subtle top gradient glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-40 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(16,185,129,0.04),transparent)]" />

      <Section className="scroll-mt-0 !border-0 !bg-transparent !py-20 md:!py-28">
        {/* Section Label */}
        <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[#00ff88]">
          CONTACT
        </p>

        {/* Heading */}
        <h2 className="mt-4 max-w-3xl text-[clamp(2rem,4vw,3.2rem)] leading-[1.15] tracking-tight text-white font-semibold">
          准备好构建更好的数据资产了吗？
        </h2>

        {/* Description */}
        <p className="mt-4 max-w-2xl text-[15px] leading-[1.75] text-[#b6bbc2]">
          无论您需要合成缺陷数据、模型增强，还是完整的数据闭环管线 —
          我们期待与您交流。
        </p>

        {/* CTA Row */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Email — Emerald Accent Button */}
          <button
            onClick={copyEmail}
            className="group inline-flex h-11 items-center gap-2.5 rounded-full bg-emerald-400 px-6 text-[14px] font-semibold text-[#0a0a0a] transition-all duration-200 hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-400/25 active:scale-[0.98]"
          >
            <svg
              className="h-4 w-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5a2.25 2.25 0 0 0-2.25 2.25m19.5 0-8.954 5.74a1.5 1.5 0 0 1-1.593 0L2.25 6.75"
              />
            </svg>
            <span>{contact.email}</span>
            <span className="ml-1 inline-flex items-center rounded-md bg-black/10 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide transition-colors group-hover:bg-black/15">
              {copied ? "Copied!" : "Copy"}
            </span>
          </button>

          {/* GitHub — Border Button */}
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-11 items-center gap-2.5 rounded-full border border-white/[0.12] px-6 text-[14px] font-medium text-white/70 transition-all duration-200 hover:border-white/25 hover:bg-white/[0.05] hover:text-white"
          >
            <svg
              className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-px"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>
        </div>

        {/* Contact Links with green dot */}
        {contact.links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {contact.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group inline-flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-[13px] text-[#b6bbc2] transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-white/80"
              >
                <span className="relative inline-block h-1.5 w-1.5 shrink-0">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-50" />
                  <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-[#00ff88]" />
                </span>
                {link.label}
              </a>
            ))}
          </div>
        )}
      </Section>
    </section>
  );
}
