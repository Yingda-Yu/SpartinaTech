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
      demoReel: "Demo Reel",
      visualProof: "Visual Proof",
      industrial: "Industrial",
      projects: "Projects",
      team: "Team",
      contact: "Contact",
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
      deliverables: "Deliverables",
      techStack: "Tech Stack",
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
    },
    footer: {
      copyright: "Spartina Technology / 米草科技",
      tagline: "AI services for data, vision, and industry workflows.",
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
      demoReel: "演示",
      visualProof: "成果",
      industrial: "工业",
      projects: "项目",
      team: "团队",
      contact: "联系",
      getInTouch: "联系我们",
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
      deliverables: "交付物",
      techStack: "技术栈",
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
    },
    footer: {
      copyright: "Spartina Technology / 米草科技",
      tagline: "面向数据、视觉与行业工作流的 AI 服务。",
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
