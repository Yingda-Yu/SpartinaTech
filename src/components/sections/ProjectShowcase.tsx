"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { projects, pickLocale } from "@/lib/data";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

export function ProjectShowcase() {
  const { locale, t } = useTranslation();

  const statusStyles: Record<string, string> = {
    "Live Demo": "bg-[#2f4738] text-white",
    "在线演示": "bg-[#2f4738] text-white",
    "In Production": "bg-[#d37942] text-white",
    "生产中": "bg-[#d37942] text-white",
    "Shipping": "bg-[#88b04b] text-white",
    "持续交付": "bg-[#88b04b] text-white",
    "Prototype": "bg-[#0a0a0a]/10 text-[#0a0a0a]",
    "原型阶段": "bg-[#0a0a0a]/10 text-[#0a0a0a]",
  };

  const getStatusStyle = (statusText: string) => {
    return statusStyles[statusText] ?? "bg-[#0a0a0a]/10 text-[#0a0a0a]";
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-white px-6 py-28 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-[#5f615f]">
              {t("projects.sectionEyebrow", "Projects")}
            </p>
            <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#0a0a0a]">
              {t("projects.sectionTitle", "Selected work.")}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-[1.6] text-[#666666]">
              {t("projects.sectionSubtitle")}
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {projects.map((project) => {
            const statusText = pickLocale(project.status, locale);
            return (
              <article
                key={project.id}
                className="group relative flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[#0a0a0a]/[0.06] bg-white shadow-[var(--shadow-sm)] transition-all duration-500 hover:shadow-[var(--shadow-xl)]"
              >
                <Link
                  href={project.href ?? "#projects"}
                  className="relative block overflow-hidden"
                >
                  <ImageWithFallback
                    src={project.image}
                    alt={pickLocale(project.title, locale)}
                    aspectRatio="aspect-[16/10]"
                    wrapperClassName="rounded-t-[var(--radius-lg)]"
                    className="img-zoom"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${getStatusStyle(statusText)}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
                      {statusText}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#0a0a0a] backdrop-blur-md">
                      {pickLocale(project.category, locale)}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-xs text-white">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                      <span className="font-medium">{pickLocale(project.output, locale)}</span>
                    </div>
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold leading-tight text-[#0a0a0a]">
                    {pickLocale(project.title, locale)}
                  </h3>
                  <p className="mt-2 text-sm leading-[1.6] text-[#666666]">
                    {pickLocale(project.description, locale)}
                  </p>

                  <div className="mt-5 grid grid-cols-3 gap-4 border-y border-[#0a0a0a]/[0.06] py-4">
                    {project.metrics.map((metric) => (
                      <div key={pickLocale(metric.label, locale)} className="flex flex-col">
                        <span className="text-xl font-semibold tracking-tight text-[#0a0a0a]">
                          {metric.value}
                        </span>
                        <span className="mt-0.5 text-[11px] text-[#666666]">
                          {pickLocale(metric.label, locale)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div>
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#5f615f]">
                        {t("projects.deliverables", "Deliverables")}
                      </p>
                      <ul className="space-y-1.5">
                        {pickLocale(project.deliverables, locale).map((d) => (
                          <li key={d} className="flex items-center gap-2 text-xs text-[#4a4a4a]">
                            <span className="h-1 w-1 rounded-full bg-[#2f4738]" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#5f615f]">
                        {t("projects.techStack", "Tech Stack")}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md bg-[#0a0a0a]/[0.04] px-2 py-1 text-[11px] font-medium text-[#4a4a4a]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {project.href && (
                    <div className="mt-6 pt-2">
                      <Link
                        href={project.href}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#2f4738] transition-colors hover:text-[#1f3024]"
                      >
                        {t("projects.viewCase", "View case")}
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
