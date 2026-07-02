"use client";

import { useTranslation } from "@/lib/i18n";
import { workflowSteps, pickLocale } from "@/lib/data";

export function WorkflowSection() {
  const { locale, t } = useTranslation();

  return (
    <section
      id="workflow"
      className="relative overflow-hidden bg-white px-6 py-24 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-3xl">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-[#5f615f]">
            {t("workflow.sectionEyebrow", "Workflow")}
          </p>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#0a0a0a]">
            {t("workflow.sectionTitle", "How We Deliver")}
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-[1.6] text-[#666666]">
            {t("workflow.sectionSubtitle")}
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workflowSteps.map((step) => (
            <div
              key={step.step}
              className="group rounded-2xl border border-[#0a0a0a]/[0.08] bg-white p-6 shadow-sm transition-all hover:border-[#2f4738]/30 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-[#2f4738]">
                  {step.step}
                </span>
                <h3 className="text-base font-semibold text-[#0a0a0a]">
                  {pickLocale(step.title, locale)}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-[1.6] text-[#666666]">
                {pickLocale(step.description, locale)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
