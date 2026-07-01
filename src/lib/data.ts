// ─── Types ───────────────────────────────────────────────────────────────────

export type ProductMode = {
  title: string;
  description: string;
  signals: string[];
};

export type WorkflowStep = {
  step: string;
  title: string;
  description: string;
};

export type AISystemCategory = "diagnosis" | "generation" | "validation";

export type AISystem = {
  slug: string;
  category: AISystemCategory;
  systemName: string;
  oneLineFunction: string;
  inputSignals: string[];
  outputs: string[];
  impact: string[];
  year: string;
};

export type WallpaperItem = {
  id: string;
  alt: string;
  imageSrc?: string;
};

export type WallpaperCollection = {
  id: string;
  themeName: string;
  description: string;
  items: WallpaperItem[];
};

export type Locale = "en" | "zh";

// ─── Site metadata ──────────────────────────────────────────────────────────

export const site = {
  name: "米草科技",
  shortName: "米草科技",
  tagline: "面向企业工业视觉检测的数据诊断、增强规划与模型验证平台",
  primaryCta: "预约演示",
  secondaryCta: "了解更多",
};

// ─── Legacy i18n (kept for backward compatibility) ──────────────────────────
// Most translations have been migrated to src/lib/i18n.ts.
// This export is preserved so that any component still importing `i18n` from
// data.ts continues to compile. New components should use `useI18n()` instead.

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    site_name: "Spartina Technology",
    site_shortName: "SpartinaTech",
    site_tagline: "Industrial Vision Data Enhancement Platform",
    site_positioning:
      "When your visual inspection model underperforms, the problem is rarely the model itself. The real bottleneck is often: too little data, biased data, dirty data, and no data feedback loop.",
    site_primaryCta: "Book a Demo",
    site_secondaryCta: "Learn More",

    metric_0_value: "6",
    metric_0_label: "Defect Categories",
    metric_1_value: "153",
    metric_1_label: "Synthetic Augmented Samples",
    metric_2_value: "+0.017",
    metric_2_label: "Post-Filter Relative Gain Over Full Mix",

    mode_0_title: "Dataset Audit",
    mode_0_description:
      "Read enterprise datasets to inspect annotations, categories, quantities, and anomalies — a full health check of your training data.",
    mode_0_signal_0: "Annotation validation",
    mode_0_signal_1: "Category coverage analysis",
    mode_0_signal_2: "Anomaly detection",

    mode_1_title: "Data Diagnosis",
    mode_1_description:
      "Identify distribution shifts, coverage gaps, duplicate samples, and low-quality entries that silently degrade model performance.",
    mode_1_signal_0: "Distribution shift detection",
    mode_1_signal_1: "Coverage gap analysis",
    mode_1_signal_2: "Low-quality sample identification",

    mode_2_title: "Enhancement Planning",
    mode_2_description:
      "Output a prioritized plan specifying which categories, locations, sizes, and quantities to supplement — never blind bulk generation.",
    mode_2_signal_0: "Category-level priority ranking",
    mode_2_signal_1: "Location & size targeting",
    mode_2_signal_2: "Quantity optimization",

    mode_3_title: "Synthetic Generation",
    mode_3_description:
      "Generate defect samples on plan — targeted, constraint-driven synthesis instead of uncontrolled batch image production.",
    mode_3_signal_0: "Constraint-based generation",
    mode_3_signal_1: "Defect-specific synthesis",
    mode_3_signal_2: "Domain-adapted realism",

    mode_4_title: "Quality Filtering",
    mode_4_description:
      "Automatically grade each synthetic sample A/B/C/D and only let high-value data enter the training pipeline.",
    mode_4_signal_0: "A/B/C/D auto-grading",
    mode_4_signal_1: "Admission gate mechanism",
    mode_4_signal_2: "High-value sample retention",

    mode_5_title: "Benchmark Report",
    mode_5_description:
      "Retrain detection models and output a Before/After benchmark to prove the value of every data enhancement decision.",
    mode_5_signal_0: "Before/After comparison",
    mode_5_signal_1: "Quantified accuracy gain",
    mode_5_signal_2: "Confidence-backed deployment",

    step_0_title: "Dataset Audit",
    step_0_description:
      "Ingest enterprise datasets and perform a comprehensive health check on annotations, categories, quantities, and anomalies.",
    step_1_title: "Data Diagnosis",
    step_1_description:
      "Diagnose distribution shifts, coverage gaps, duplicates, and low-quality samples that silently hurt model performance.",
    step_2_title: "Enhancement Planning",
    step_2_description:
      "Generate a prioritized plan: which categories, locations, sizes, and quantities to supplement — targeted, not blind.",
    step_3_title: "Synthetic Generation",
    step_3_description:
      "Synthesize defect images according to plan — constraint-driven generation rather than uncontrolled bulk output.",
    step_4_title: "Quality Filtering",
    step_4_description:
      "Auto-grade samples A/B/C/D and only admit high-value data into the training set.",
    step_5_title: "Benchmark Report",
    step_5_description:
      "Retrain detection models and deliver a Before/After validation report proving data enhancement impact.",

    cat_diagnosis: "Diagnosis Systems",
    cat_generation: "Synthetic Generation Systems",
    cat_validation: "Validation & Report Systems",

    biz_problem_0: "Scarce defect samples",
    biz_problem_1: "High annotation costs",
    biz_problem_2: "Hard-to-train long-tail categories",
    biz_problem_3: "Insufficient edge-case coverage",

    deliverable_0_title: "Dataset Audit Report",
    deliverable_0_desc: "Comprehensive dataset health check report",
    deliverable_1_title: "Diagnosis Dashboard",
    deliverable_1_desc: "Visual analytics dashboard for data diagnosis",
    deliverable_2_title: "Enhancement Plan",
    deliverable_2_desc: "Category / location / size generation plan",
    deliverable_3_title: "Filtered Dataset",
    deliverable_3_desc: "A/B-grade augmented dataset",
    deliverable_4_title: "Retrained Detector",
    deliverable_4_desc: "Enhanced detection model after retraining",
    deliverable_5_title: "Benchmark Report",
    deliverable_5_desc: "Before/After validation report",

    industry_0: "PCB / AOI",
    industry_0_tag: "Demo Available",
    industry_1: "Steel Surface",
    industry_1_detail: "Scratches / Dents / Rust",
    industry_2: "Textiles",
    industry_2_detail: "Holes / Color Variation / Stains",
    industry_3: "Glass / Panels",
    industry_3_detail: "Cracks / Bubbles / Scratches",
    industry_4: "Battery Manufacturing",
    industry_4_detail: "Electrode / Solder Joints / Appearance Defects",

    studio_statement:
      "Enterprises don\u2019t know where their industrial vision data falls short, what to supplement, or which synthetic data actually works. Our platform closes the loop: Dataset Audit \u2192 Problem Diagnosis \u2192 Enhancement Planning \u2192 Synthetic Generation \u2192 Quality Filtering \u2192 Retrain Validation \u2192 Enterprise Report",
    studio_focus_0: "Industrial vision data audit & diagnosis",
    studio_focus_1: "Synthetic defect data generation",
    studio_focus_2: "Quality filtering & admission mechanisms",
    studio_focus_3: "Model benchmark validation & comparison reports",
    studio_affiliation: "Spartina Technology R&D",
    studio_role_0: "Industrial AI research",
    studio_role_1: "Enterprise deployment & integration",
    studio_role_2: "Technical consulting & training",

    contact_email_label: "Business inquiry",
  },
  zh: {
    site_name: "米草科技",
    site_shortName: "米草科技",
    site_tagline:
      "面向企业工业视觉检测的数据诊断、增强规划与模型验证平台",
    site_positioning:
      "企业视觉模型效果不好，很多时候不是模型不够强。真正的瓶颈往往是：数据少、数据偏、数据脏、数据没有闭环。",
    site_primaryCta: "预约演示",
    site_secondaryCta: "了解更多",

    metric_0_value: "6",
    metric_0_label: "缺陷类别",
    metric_1_value: "153",
    metric_1_label: "合成增强样本",
    metric_2_value: "+0.017",
    metric_2_label: "过滤后相对全量混入提升",

    mode_0_title: "数据体检",
    mode_0_description:
      "读取企业数据集，检查标注、类别、数量、异常——为训练数据做一次全面健康体检。",
    mode_0_signal_0: "标注验证",
    mode_0_signal_1: "类别覆盖分析",
    mode_0_signal_2: "异常检测",

    mode_1_title: "数据诊断",
    mode_1_description:
      "发现分布偏移、覆盖缺口、重复样本与低质量数据——这些问题悄然侵蚀模型性能。",
    mode_1_signal_0: "分布偏移检测",
    mode_1_signal_1: "覆盖缺口分析",
    mode_1_signal_2: "低质量样本识别",

    mode_2_title: "增强规划",
    mode_2_description:
      "输出需要补充的类别、位置、尺寸、数量和优先级——精准增强，不是盲目批量出图。",
    mode_2_signal_0: "类别级优先级排序",
    mode_2_signal_1: "位置与尺寸定向生成",
    mode_2_signal_2: "数量优化策略",

    mode_3_title: "合成生成",
    mode_3_description:
      "按计划生成缺陷样本——基于约束的精准合成，不是无控制的批量出图。",
    mode_3_signal_0: "约束驱动生成",
    mode_3_signal_1: "缺陷类别精准合成",
    mode_3_signal_2: "领域自适应真实感",

    mode_4_title: "质量筛选",
    mode_4_description:
      "自动筛选 A/B/C/D 等级，只让高价值样本进入训练管线。",
    mode_4_signal_0: "A/B/C/D 自动评级",
    mode_4_signal_1: "准入门槛机制",
    mode_4_signal_2: "高价值样本保留",

    mode_5_title: "基准验证",
    mode_5_description:
      "回训检测模型，输出 Before/After 验证报告，证明每一次数据增强决策的价值。",
    mode_5_signal_0: "Before/After 对比",
    mode_5_signal_1: "可量化准确率提升",
    mode_5_signal_2: "有信心保障的部署",

    step_0_title: "数据体检",
    step_0_description:
      "读取企业数据集，对标注、类别、数量、异常进行全面健康检查。",
    step_1_title: "数据诊断",
    step_1_description:
      "发现分布偏移、覆盖缺口、重复样本和低质量数据，这些问题悄然侵蚀模型性能。",
    step_2_title: "增强规划",
    step_2_description:
      "输出需要补充的类别、位置、尺寸、数量和优先级——精准增强，不是盲目批量。",
    step_3_title: "合成生成",
    step_3_description:
      "按计划生成缺陷样本——基于约束的精准合成，而非无控制的批量出图。",
    step_4_title: "质量筛选",
    step_4_description:
      "自动评级 A/B/C/D，只让高价值数据进入训练集。",
    step_5_title: "基准验证",
    step_5_description:
      "回训检测模型，输出 Before/After 验证报告，证明数据增强效果。",

    cat_diagnosis: "数据诊断系统",
    cat_generation: "合成生成系统",
    cat_validation: "验证报告系统",

    biz_problem_0: "缺陷样本稀缺",
    biz_problem_1: "标注成本高",
    biz_problem_2: "长尾类别难训练",
    biz_problem_3: "边缘场景覆盖不足",

    deliverable_0_title: "Dataset Audit Report",
    deliverable_0_desc: "数据集健康体检",
    deliverable_1_title: "Diagnosis Dashboard",
    deliverable_1_desc: "可视化诊断大屏",
    deliverable_2_title: "Enhancement Plan",
    deliverable_2_desc: "类别/位置/尺寸生成计划",
    deliverable_3_title: "Filtered Dataset",
    deliverable_3_desc: "A/B级增强数据集",
    deliverable_4_title: "Retrained Detector",
    deliverable_4_desc: "增强后检测模型",
    deliverable_5_title: "Benchmark Report",
    deliverable_5_desc: "Before/After验证报告",

    industry_0: "PCB / AOI",
    industry_0_tag: "已完成Demo",
    industry_1: "钢材表面",
    industry_1_detail: "划痕/凹坑/锈蚀",
    industry_2: "纺织品",
    industry_2_detail: "破洞/色差/污渍",
    industry_3: "玻璃/面板",
    industry_3_detail: "裂纹/气泡/划痕",
    industry_4: "电池制造",
    industry_4_detail: "极片/焊点/外观缺陷",

    studio_statement:
      "企业不知道自己的工业视觉数据哪里不足、该补什么、哪些合成数据真正有效。我们的平台闭环：数据体检 → 问题诊断 → 增强规划 → 合成生成 → 质量筛选 → 回训验证 → 企业报告",
    studio_focus_0: "工业视觉数据体检与诊断",
    studio_focus_1: "合成缺陷数据生成",
    studio_focus_2: "质量筛选与准入机制",
    studio_focus_3: "模型基准验证与对比报告",
    studio_affiliation: "米草科技 R&D",
    studio_role_0: "工业AI研究",
    studio_role_1: "企业部署与集成",
    studio_role_2: "技术咨询与培训",

    contact_email_label: "商务咨询",
  },
};

/** @deprecated Use `translations` from i18n.ts or `useI18n().t()` instead. */
export const i18n = translations;

// ─── Asset helper ───────────────────────────────────────────────────────────

const assetBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function publicAsset(path: string): string {
  return `${assetBasePath}${path}`;
}
