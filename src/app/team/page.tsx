"use client";

import { useTranslation } from "@/lib/i18n";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { TeamMemberImage } from "@/components/ui/TeamMemberImage";
import { advisors, coreTeam } from "@/lib/team-data";

export default function TeamPage() {
  const { locale, t } = useTranslation();
  const isZh = locale === "zh";

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="pt-14">
        <section className="mx-auto max-w-[1200px] px-6 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-3xl font-semibold tracking-tight text-[#0a0a0a] sm:text-4xl lg:text-5xl">
              {isZh ? "米草科技团队" : "People behind Spartina Technology"}
            </h1>
            <p className="mb-6 text-lg leading-relaxed text-[#666666]">
              {isZh
                ? "一个结合 AI 研究、工程实现、视觉设计与行业交付的小型团队。"
                : "A small AI team combining research, engineering, design, and industry delivery."}
            </p>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-[#888888]">
              {isZh
                ? "我们与顾问、伙伴和协作者一起，将想法与样本转化为可交付的 AI 产品。"
                : "We work with advisors, partners, and collaborators to turn ideas and samples into AI-ready products."}
            </p>
          </div>
        </section>

        <section className="bg-[#fafafa] py-20">
          <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
            <h2 className="mb-10 text-center text-xl font-semibold text-[#0a0a0a]">
              {isZh ? "顾问 / Advisor" : "Advisor"}
            </h2>
            <div className="mx-auto max-w-4xl">
              {advisors.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col gap-6 overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:flex-row"
                >
                  <div className="flex-shrink-0 overflow-hidden rounded-xl bg-[#f6f8f5] sm:w-48">
                    <TeamMemberImage
                      src={member.image}
                      alt={member.name.en}
                      aspectRatio="aspect-[3/4]"
                      wrapperClassName="h-64"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="mb-1 text-lg font-semibold text-[#0a0a0a]">
                      {isZh ? member.name.zh : member.name.en}
                    </h3>
                    <p className="mb-3 text-sm font-medium text-[#2f4738]">
                      {isZh ? member.role.zh : member.role.en}
                    </p>
                    <p className="mb-4 text-sm leading-relaxed text-[#666666]">
                      {isZh ? member.bio.zh : member.bio.en}
                    </p>
                    {member.links?.website && (
                      <a
                        href={member.links.website}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-fit rounded-full bg-[#f0f4f1] px-4 py-1.5 text-xs font-medium text-[#2f4738] transition-colors hover:bg-[#e0e8e4]"
                      >
                        {isZh ? "学校主页" : "University Profile"}
                      </a>
                    )}
                    {member.tags && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {(isZh ? member.tags.zh : member.tags.en).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[#f0f4f1] px-3 py-1 text-xs text-[#2f4738]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
            <h2 className="mb-10 text-center text-2xl font-semibold text-[#0a0a0a]">
              {isZh ? "团队伙伴" : "Team Partners"}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {coreTeam.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col gap-5 overflow-hidden rounded-2xl bg-[#fafafa] p-6 transition-shadow hover:shadow-md"
                >
                  <div className="overflow-hidden rounded-xl bg-[#f6f8f5]">
                    <TeamMemberImage
                      src={member.image}
                      alt={member.name.en}
                      aspectRatio="aspect-[4/5]"
                      wrapperClassName="h-72"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="mb-1 text-lg font-semibold text-[#0a0a0a]">
                      {isZh ? member.name.zh : member.name.en}
                    </h3>
                    <p className="mb-2 text-sm font-medium text-[#2f4738]">
                      {isZh ? member.role.zh : member.role.en}
                    </p>
                    <p className="mb-3 text-sm leading-relaxed text-[#666666]">
                      {isZh ? member.bio.zh : member.bio.en}
                    </p>
                    {member.tags && (
                      <div className="flex flex-wrap gap-1.5">
                        {(isZh ? member.tags.zh : member.tags.en).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[#f0f4f1] px-2.5 py-0.5 text-xs text-[#2f4738]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
