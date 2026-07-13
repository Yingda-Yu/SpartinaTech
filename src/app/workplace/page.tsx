"use client";

import { SiteFooter } from "@/components/ui/SiteFooter";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { contact } from "@/lib/data";
import { useTranslation } from "@/lib/i18n";

const workplaceSections = {
  en: [
    {
      title: "Our work model",
      body: "Team members generally work remotely and collaborate on-site in Wenzhou when projects, client meetings, product reviews, or team activities benefit from in-person participation. On-site attendance is arranged around actual collaboration needs rather than a fixed weekly schedule.",
    },
    {
      title: "Communication and collaboration",
      body: "We value clear communication, documented decisions, responsible ownership, and respect for different working schedules. Team members remain available during agreed collaboration periods and communicate changes that may affect delivery.",
    },
    {
      title: "Learning and development",
      body: "We encourage technical, product, design, and professional growth through practical projects, internal knowledge sharing, independent learning, and constructive feedback.",
    },
    {
      title: "Information security",
      body: "Team members handle company, client, and project information responsibly and follow applicable access-control, confidentiality, and data-protection requirements.",
    },
  ],
  zh: [
    {
      title: "办公模式",
      body: "团队成员通常远程工作，并在项目协作、客户会议、产品评审或团队活动适合线下开展时，于温州进行现场协作。线下安排以实际项目与协作需要为依据，目前不实行固定的每周到岗天数。",
    },
    {
      title: "沟通与协作",
      body: "我们重视清晰沟通、决策留痕、主动负责，以及对不同工作安排的尊重。团队成员应在双方约定的协作时段内保持必要的可联系状态，并及时沟通可能影响交付的变化。",
    },
    {
      title: "学习与发展",
      body: "我们鼓励团队成员通过真实项目、内部知识分享、自主学习和建设性反馈，持续提升技术、产品、设计及职业能力。",
    },
    {
      title: "信息安全",
      body: "团队成员应妥善处理公司、客户及项目相关信息，并遵守适用的访问控制、保密和数据保护要求。",
    },
  ],
};

export default function WorkplacePage() {
  const { locale } = useTranslation();
  const isZh = locale === "zh";
  const sections = isZh ? workplaceSections.zh : workplaceSections.en;

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="pt-14">
        <section className="mx-auto max-w-[1200px] px-6 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-5 inline-flex rounded-full bg-[#f0f4f1] px-4 py-1.5 text-xs font-semibold text-[#2f4738]">
              {isZh ? "灵活混合办公" : "Flexible hybrid"}
            </span>
            <h1 className="mb-6 text-3xl font-semibold tracking-tight text-[#0a0a0a] sm:text-4xl lg:text-5xl">
              {isZh ? "米草科技的工作方式" : "Workplace at Spartina Technology"}
            </h1>
            <p className="text-lg leading-relaxed text-[#666666]">
              {isZh
                ? "我们采用适合小型软件与人工智能团队的灵活混合办公模式。"
                : "A flexible hybrid model designed for a small, collaborative software and AI team."}
            </p>
          </div>
        </section>

        <section className="bg-[#fafafa] py-20">
          <div className="mx-auto grid max-w-[1200px] gap-6 px-6 sm:grid-cols-2 sm:px-8 lg:px-10">
            {sections.map((section) => (
              <article key={section.title} className="rounded-2xl bg-white p-7 shadow-sm">
                <h2 className="mb-3 text-lg font-semibold text-[#0a0a0a]">{section.title}</h2>
                <p className="text-sm leading-7 text-[#666666]">{section.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-6 py-24 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[#0a0a0a]">
                {isZh ? "工作地点" : "Work location"}
              </h2>
              <p className="text-sm leading-7 text-[#666666]">
                {isZh
                  ? "公司的注册工作地点位于中国浙江省温州市温州肯恩大学众创空间。是否可以远程协作，将根据具体岗位、项目要求及相关协议确定。"
                  : "Our registered workplace is located at the Wenzhou-Kean University Innovation and Entrepreneurship Space in Wenzhou, Zhejiang, China. Remote collaboration depends on the role, project requirements, and applicable agreements."}
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[#0a0a0a]">
                {isZh ? "政策适用范围" : "Policy scope"}
              </h2>
              <p className="text-sm leading-7 text-[#666666]">
                {isZh
                  ? "具体工作安排可能因岗位、项目、实习协议、劳动或合作协议以及运营需要而有所不同。本页面仅提供一般说明，不替代个人书面协议。"
                  : "Specific working arrangements may vary by role, project, internship, employment or cooperation agreement, and operational requirements. This page provides a general description and does not replace an individual written agreement."}
              </p>
            </div>
          </div>

          <div className="mt-16 rounded-2xl border border-[#0a0a0a]/[0.06] bg-[#f6f8f5] p-7 sm:p-8">
            <h2 className="mb-5 text-lg font-semibold text-[#0a0a0a]">
              {isZh ? "主体与联系信息" : "Legal entity and contact"}
            </h2>
            <dl className="grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="mb-1 text-[#888888]">{isZh ? "法律主体" : "Legal entity"}</dt>
                <dd className="font-medium text-[#0a0a0a]">米草科技（温州）有限责任公司</dd>
              </div>
              <div>
                <dt className="mb-1 text-[#888888]">{isZh ? "对外英文品牌" : "English brand"}</dt>
                <dd className="font-medium text-[#0a0a0a]">Spartina Technology</dd>
              </div>
              <div>
                <dt className="mb-1 text-[#888888]">{isZh ? "所在地" : "Location"}</dt>
                <dd className="font-medium text-[#0a0a0a]">
                  {isZh ? "中国浙江省温州市" : "Wenzhou, Zhejiang, China"}
                </dd>
              </div>
              <div>
                <dt className="mb-1 text-[#888888]">{isZh ? "联系邮箱" : "Contact"}</dt>
                <dd>
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-medium text-[#2f4738] transition-colors hover:text-[#0a0a0a]"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
