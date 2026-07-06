"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

export type Locale = "en" | "zh";

export const defaultLocale: Locale = "en";
export const LOCALE_STORAGE_KEY = "spartina-locale";

export type TranslationValue = string | string[] | { [key: string]: TranslationValue };

export type TranslationDict = {
  [key: string]: TranslationValue;
};

export const translations = {
  en: {
    site: {
      name: "Spartina Technology",
      chineseName: "米草科技",
      shortName: "SpartinaTech",
    },
    nav: {
      whatWeBuild: "What We Build",
      solutions: "Solutions",
      demoReel: "Demo Reel",
      visualProof: "Visual Proof",
      industrial: "Industrial",
      education: "Education",
      visualAssets: "Visual Assets",
      workflows: "Workflows",
      projects: "Projects",
      caseStudies: "Cases",
      team: "Team",
      contact: "Contact",
      gameAssets: "Game Assets",
      getInTouch: "Get in touch",
      backToHome: "Back to home",
      platform: "Platform",
      whyItMatters: "Why It Matters",
      showcase: "Showcase",
      workflow: "Workflow",
      trialPath: "Trial Path",
    },
    hero: {
      tagline: "Spartina Technology · 米草科技",
      titleLine1: "Generating digital products",
      titleLine2: "for a more beautiful real life.",
      subtitle:
        "Spartina Technology is an AI service company incubated by Wenzhou-Kean University, building data, visual assets, educational content, and industry workflows for real-world applications.",
      explore: "Explore",
      watchDemo: "Watch Demo",
      contact: "Contact",
    },
    solutions: {
      sectionEyebrow: "What We Build",
      sectionTitle: "Six service areas.",
      sectionTitleAccent: "One production system.",
      sectionSubtitle:
        "From industrial data enhancement to consumer digital products — each area ships real outputs, not just demos.",
      viewPlatform: "View platform",
      viewAll: "View all solutions",
      pageTitle: "Solutions",
      pageSubtitle: "Six AI service areas, all built on the same production system.",
      problem: "Problem",
      deliverables: "Deliverables",
      targetClients: "Ideal for",
      learnMore: "Learn more",
    },
    demoReel: {
      sectionEyebrow: "Demo Reel",
      sectionTitle: "See it in motion.",
      sectionSubtitle:
        "A preview of our capabilities across industrial data, visual assets, education content, and custom workflows.",
      reelTitle: "Spartina Technology · Demo Reel",
      reelSubtitle: "Industrial · Visual · Education · Workflow",
      coverPreview: "Cover preview",
      playing: "Demo Reel",
      clickToPlay: "Click the cover to play the demo reel.",
      videoComingSoon: "Video coming soon — cover preview shown.",
      player: {
        play: "Play",
        pause: "Pause",
        mute: "Mute",
        unmute: "Unmute",
        fullscreen: "Fullscreen",
        hd: "HD",
      },
      tags: ["Industrial", "Visual", "Education", "Workflow"],
    },
    visualProof: {
      sectionEyebrow: "Visual Proof",
      sectionTitle: "Real outputs.",
      sectionTitleAccent: "Not renders.",
      sectionSubtitle:
        "Selected work from internal demos and prototype projects. Each piece shows the input transformation behind the result.",
      transformLabel: "From → To",
    },
    projects: {
      sectionEyebrow: "Projects",
      sectionTitle: "Selected work.",
      sectionSubtitle:
        "Four projects across industrial data, education content, consumer products, and game/film concepts.",
      viewCase: "View case",
      viewAll: "View case studies",
      deliverables: "Deliverables",
      techStack: "Tech Stack",
      problem: "Problem",
      input: "Input",
      process: "Process",
      output: "Output",
      status: "Status",
      internalDemo: "Internal Demo",
      prototype: "Prototype",
      inProduction: "In Production",
    },
    contact: {
      sectionEyebrow: "Contact",
      sectionTitleLine1: "Let's build something",
      sectionTitleLine2: "that ships.",
      sectionTitleAccent: "that ships.",
      ctaTitle:
        "Bring us your samples, ideas, or production bottlenecks. We turn them into AI-ready data, visual assets, and scalable workflows.",
      primaryCta: "Contact Spartina Technology",
      secondaryCta: "Discuss a B2B Project",
      tertiaryCta: "View GitHub / Portfolio",
      remote: "Remote · Worldwide",
      pageTitle: "Contact",
      pageSubtitle: "Work with Spartina Technology",
      pageDescription: "Bring us your samples, ideas, or production bottlenecks. We help turn them into AI-ready data, visual assets, and scalable workflows.",
      incubated: "Incubated by Wenzhou-Kean University",
      emailUs: "Email us",
      inquiryTitle: "Project inquiry template",
      projectType: "Project type:",
      company: "Company / organization:",
      wantToBuild: "What you want to build:",
      samples: "Existing samples or materials:",
      timeline: "Expected timeline:",
      contactInfo: "Contact:",
    },
    footer: {
      copyright: "Spartina Technology / 米草科技",
      tagline: "AI services for data, vision, and industry workflows.",
    },
    cta: {
      title: "Want to explore a project with Spartina Technology?",
      button: "Contact us",
    },
    education: {
      pageTitle: "AI for Education",
      pageSubtitle: "AI-powered educational content at scale.",
      pageDescription: "Leveled reading, essays, illustrations, course visuals, and serialized IP content — produced consistently and efficiently.",
      problemTitle: "Why educational content production is hard",
      problemDescription: "Producing high-quality educational content at scale is slow, expensive, and hard to keep consistent across series and formats.",
      solutionTitle: "What we deliver",
      workflowTitle: "How it works",
      deliverablesTitle: "Deliverables",
      ctaTitle: "Start an education content project",
      ctaButton: "Request a demo package",
    },
    visualAssets: {
      pageTitle: "AI Visual Assets",
      pageSubtitle: "Brand-grade AI visual assets, generated as a system.",
      pageDescription: "Consistent, on-brand imagery for products, marketing, social, and packaging — generated in batches, delivered as asset packages.",
      modulesTitle: "What we can produce",
      galleryTitle: "Example outputs",
      ctaTitle: "Start a visual asset package",
      ctaButton: "Discuss your project",
    },
    caseStudies: {
      pageTitle: "Case Studies",
      pageSubtitle: "Internal demos and prototype projects that show how our AI production system works in practice.",
      pageDescription: "We build real pipelines, not just one-off demos. These projects demonstrate our approach to turning samples and ideas into deliverable AI products.",
    },
    workflows: {
      pageTitle: "Custom AI Workflows",
      pageSubtitle: "Custom AI production workflows for repeatable delivery.",
      pageDescription: "We help teams turn AI generation, data processing, review, packaging, and delivery into structured production systems.",
      whyWorkflows: "The challenge is not generating once. The challenge is generating consistently, reviewing efficiently, and delivering reliably.",
      deliveryTitle: "Delivery package",
      ctaTitle: "Build a custom AI workflow",
      ctaButton: "Contact us",
    },
    gameAssets: {
      pageTitle: "Game & Interactive Assets",
      pageEyebrow: "Game & Interactive Assets",
      heroTitle: "AI game asset pipelines for interactive content.",
      heroDescription: "From base image generation to controllable edits and answer annotation, we build structured game-ready assets for mini-games and interactive experiences.",
      viewWorkflow: "View workflow",
      seeCaseStudy: "See case study",
      discussProject: "Discuss a game project",
      problemTitle: "Why game asset production is hard",
      problemSubtitle: "Mini-games and interactive content need more than pretty pictures — they need structure, consistency, and answer data.",
      deliverablesTitle: "What we build",
      deliverablesSubtitle: "Structured assets that plug directly into game levels and product flows.",
      workflowTitle: "Pipeline",
      workflowSubtitle: "A six-step pipeline from gameplay definition to level-ready export.",
      workflowImageCaption: "Our ComfyUI pipeline runs end-to-end — from base image generation and local edits to consistency review and game-ready export.",
      internalToolTitle: "Internal pipeline & annotation tool",
      internalToolBody: "Our internal tool records answer coordinates, radius, hints, and descriptions for each difference point, turning visual outputs into level-ready game data.",
      internalToolBullet1: "A/B image pair review",
      internalToolBullet2: "Difference point coordinates",
      internalToolBullet3: "Game-ready metadata export",
      useCasesTitle: "Use cases",
      useCasesSubtitle: "Where this pipeline fits.",
      ctaTitle: "Bring us your game idea.",
      ctaBody: "Bring us your game idea, reference style, or level concept. We turn it into production-ready visual assets and structured game content.",
      ctaButton: "Discuss a game project",
    },
    language: {
      english: "EN",
      chinese: "中文",
    },
    common: {
      liveDemo: "Live Demo",
      inProduction: "In Production",
      shipping: "Shipping",
      prototype: "Prototype",
    },
    workflow: {
      sectionEyebrow: "Workflow",
      sectionTitle: "How We Deliver",
      sectionSubtitle:
        "Six steps from diagnosis to iteration ensure high-quality delivery.",
    },
  },
  zh: {
    site: {
      name: "Spartina Technology",
      chineseName: "米草科技",
      shortName: "SpartinaTech",
    },
    nav: {
      whatWeBuild: "业务",
      solutions: "解决方案",
      demoReel: "演示",
      visualProof: "成果",
      industrial: "工业",
      education: "教育",
      visualAssets: "视觉资产",
      workflows: "工作流",
      projects: "项目",
      caseStudies: "案例",
      team: "团队",
      contact: "联系",
      gameAssets: "游戏资产",
      getInTouch: "联系合作",
      backToHome: "返回首页",
      platform: "平台",
      whyItMatters: "为什么重要",
      showcase: "能力展示",
      workflow: "工作流程",
      trialPath: "试点路径",
    },
    hero: {
      tagline: "Spartina Technology · 米草科技",
      titleLine1: "生成数字产品，",
      titleLine2: "让真实生活更美好。",
      subtitle:
        "米草科技是由温州肯恩大学孵化的一家人工智能服务公司，面向真实应用场景构建数据、视觉资产、教育内容与行业工作流。",
      explore: "探索业务",
      watchDemo: "观看演示",
      contact: "联系我们",
    },
    solutions: {
      sectionEyebrow: "我们构建什么",
      sectionTitle: "六大核心服务方向，",
      sectionTitleAccent: "一套生产系统。",
      sectionSubtitle:
        "从工业数据增强到 C 端数字产品，每个方向都交付真实输出，而非仅仅是演示。",
      viewPlatform: "查看平台",
      viewAll: "查看全部解决方案",
      pageTitle: "解决方案",
      pageSubtitle: "六大 AI 服务方向，全部构建在同一套生产系统上。",
      problem: "解决的问题",
      deliverables: "交付物",
      targetClients: "适合",
      learnMore: "了解更多",
    },
    demoReel: {
      sectionEyebrow: "演示视频",
      sectionTitle: "动态展示我们的 AI 服务能力。",
      sectionSubtitle:
        "展示我们在工业数据、视觉资产、教育内容与定制工作流中的能力。",
      reelTitle: "米草科技 · 演示视频",
      reelSubtitle: "工业 · 视觉 · 教育 · 工作流",
      coverPreview: "封面预览",
      playing: "演示视频",
      clickToPlay: "点击封面播放演示视频。",
      videoComingSoon: "视频即将上线，当前为封面预览。",
      player: {
        play: "播放",
        pause: "暂停",
        mute: "静音",
        unmute: "取消静音",
        fullscreen: "全屏",
        hd: "高清",
      },
      tags: ["工业", "视觉", "教育", "工作流"],
    },
    visualProof: {
      sectionEyebrow: "视觉成果",
      sectionTitle: "真实输出，",
      sectionTitleAccent: "而非空谈。",
      sectionSubtitle:
        "选自内部演示与原型项目的成果，每一件都展示了从输入到结果的完整转换。",
      transformLabel: "从 → 到",
    },
    projects: {
      sectionEyebrow: "项目",
      sectionTitle: "精选项目。",
      sectionSubtitle:
        "四个项目覆盖工业数据、教育内容、消费级产品与游戏影视概念。",
      viewCase: "查看案例",
      viewAll: "查看项目与演示",
      deliverables: "交付物",
      techStack: "技术栈",
      problem: "问题",
      input: "输入",
      process: "流程",
      output: "输出",
      status: "状态",
      internalDemo: "内部演示",
      prototype: "原型阶段",
      inProduction: "生产中",
    },
    contact: {
      sectionEyebrow: "联系我们",
      sectionTitleLine1: "一起打造",
      sectionTitleLine2: "真正落地的产品。",
      sectionTitleAccent: "真正落地的产品。",
      ctaTitle:
        "把你的样本、想法或生产瓶颈交给我们，我们将其转化为 AI 就绪的数据、视觉资产与可扩展的工作流。",
      primaryCta: "联系米草科技",
      secondaryCta: "洽谈 B2B 合作",
      tertiaryCta: "查看 GitHub / 作品集",
      remote: "远程 · 全球协作",
      pageTitle: "联系我们",
      pageSubtitle: "与米草科技合作",
      pageDescription: "把你的样本、想法或生产瓶颈带给我们。我们帮助你将其转化为 AI 可用的数据、视觉资产与可扩展工作流。",
      incubated: "由温州肯恩大学孵化",
      emailUs: "发送邮件",
      inquiryTitle: "项目咨询模板",
      projectType: "项目方向：",
      company: "公司 / 机构：",
      wantToBuild: "希望解决的问题：",
      samples: "已有样本或材料：",
      timeline: "期望时间：",
      contactInfo: "联系方式：",
    },
    footer: {
      copyright: "Spartina Technology / 米草科技",
      tagline: "面向数据、视觉与行业工作流的 AI 服务。",
    },
    cta: {
      title: "想和米草科技一起探索一个项目？",
      button: "联系我们",
    },
    education: {
      pageTitle: "AI 教育内容生产",
      pageSubtitle: "规模化生产 AI 驱动的教育内容。",
      pageDescription: "分级阅读、小作文、插图、课程视觉与系列化 IP 内容——稳定、高效、持续交付。",
      problemTitle: "为什么教育内容生产很难",
      problemDescription: "规模化生产高质量教育内容速度慢、成本高，系列化内容难以保持一致性。",
      solutionTitle: "我们交付什么",
      workflowTitle: "工作流程",
      deliverablesTitle: "交付物",
      ctaTitle: "开启教育内容项目",
      ctaButton: "申请演示内容包",
    },
    visualAssets: {
      pageTitle: "AI 视觉资产",
      pageSubtitle: "品牌级 AI 视觉资产，以系统方式生成。",
      pageDescription: "为产品、营销、社交与包装提供一致的品牌级图像——批量生成，以资产包形式交付。",
      modulesTitle: "我们能生产什么",
      galleryTitle: "输出示例",
      ctaTitle: "开启视觉资产包",
      ctaButton: "洽谈你的项目",
    },
    caseStudies: {
      pageTitle: "项目与演示",
      pageSubtitle: "内部演示和原型项目，展示我们的 AI 生产系统如何在实践中运作。",
      pageDescription: "我们构建真正的管线，而不只是一次性 demo。这些项目展示了我们将样本和想法转化为可交付 AI 产品的方法。",
    },
    workflows: {
      pageTitle: "定制 AI 工作流",
      pageSubtitle: "为可复用交付而构建的定制 AI 生产工作流。",
      pageDescription: "我们帮助团队把 AI 生成、数据处理、质量筛选、打包交付与业务流程变成结构化生产系统。",
      whyWorkflows: "真正的挑战不是生成一次，而是持续稳定生成、高效筛选并可靠交付。",
      deliveryTitle: "交付包",
      ctaTitle: "定制一个 AI 工作流",
      ctaButton: "联系我们",
    },
    gameAssets: {
      pageTitle: "游戏与互动内容资产",
      pageEyebrow: "游戏与互动内容资产",
      heroTitle: "面向互动内容的 AI 游戏素材生产管线。",
      heroDescription: "从原图生成、可控编辑到答案标注，我们为小游戏与互动体验构建可进入产品流程的结构化游戏资产。",
      viewWorkflow: "查看流程",
      seeCaseStudy: "查看案例",
      discussProject: "讨论游戏项目",
      problemTitle: "为什么游戏素材生产很难",
      problemSubtitle: "小游戏与互动内容需要的不仅是好看的图——还需要结构、一致性与答案数据。",
      deliverablesTitle: "我们交付什么",
      deliverablesSubtitle: "可直接接入关卡与产品流程的结构化资产。",
      workflowTitle: "生产管线",
      workflowSubtitle: "从玩法定义到关卡导出的六步管线。",
      workflowImageCaption: "我们的 ComfyUI 管线端到端跑通——从原图生成、局部编辑、一致性审核到游戏素材导出。",
      internalToolTitle: "内部管线与标注工具",
      internalToolBody: "我们的内部工具可以记录每个差异点的坐标、半径、提示语与描述，将视觉输出转化为可配置的关卡数据。",
      internalToolBullet1: "A/B 成对图审核",
      internalToolBullet2: "差异点坐标记录",
      internalToolBullet3: "关卡元数据导出",
      useCasesTitle: "使用场景",
      useCasesSubtitle: "这条管线适合的场景。",
      ctaTitle: "把你的游戏想法交给我们。",
      ctaBody: "把你的游戏想法、参考风格或关卡概念交给我们。我们将其转化为可生产的视觉资产与结构化游戏内容。",
      ctaButton: "讨论游戏项目",
    },
    language: {
      english: "EN",
      chinese: "中文",
    },
    common: {
      liveDemo: "在线演示",
      inProduction: "生产中",
      shipping: "持续交付",
      prototype: "原型阶段",
    },
    workflow: {
      sectionEyebrow: "工作流程",
      sectionTitle: "我们如何交付",
      sectionSubtitle: "从诊断到迭代，六步流程确保项目高质量交付。",
    },
  },
} satisfies { [K in Locale]: TranslationDict };

// Helper to get a nested value from a translation dict using dot-notation key
export function getNestedValue(
  obj: TranslationValue | undefined,
  path: string
): string | string[] | undefined {
  const keys = path.split(".");
  let current: TranslationValue | undefined = obj;
  for (const key of keys) {
    if (current === undefined || typeof current !== "object" || Array.isArray(current)) {
      return undefined;
    }
    current = current[key];
  }
  if (typeof current === "string" || Array.isArray(current)) {
    return current;
  }
  return undefined;
}

// Translation context
interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: string, fallback?: string) => string;
  tArr: (key: string, fallback?: string[]) => string[];
}

export const LanguageContext = createContext<LanguageContextType | null>(null);

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return ctx;
}

export function useLocale(): Locale {
  const { locale } = useTranslation();
  return locale;
}
