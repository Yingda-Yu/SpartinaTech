import type { Locale } from "@/lib/i18n";

type LocalizedString = { en: string; zh: string };
type LocalizedStringArray = { en: string[]; zh: string[] };

function ls(en: string, zh: string): LocalizedString {
  return { en, zh };
}

function lsa(en: string[], zh: string[]): LocalizedStringArray {
  return { en, zh };
}

export function pickIndustrialLocale<T>(obj: { en: T; zh: T }, locale: Locale): T {
  return obj[locale];
}

const assetBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function publicAsset(path: string): string {
  return `${assetBasePath}${path}`;
}

export const industrialPage = {
  hero: {
    eyebrow: ls("Industrial Data Enhancement", "工业数据增强"),
    title: ls("Industrial Vision Data Enhancement", "工业视觉数据增强"),
    subtitle: ls(
      "From a handful of real samples to a model-ready, annotated dataset.",
      "从少量真实样本，到可训练、带标注的数据集。"
    ),
    description: ls(
      "We don't just generate more images. We diagnose what's missing, control defect type and morphology, and validate that the augmented set actually improves your model.",
      "我们不只是生成更多图片。我们诊断缺失什么，控制缺陷类型与形态，验证增强后的数据集是否真正提升模型效果。"
    ),
  },
  coverImage: publicAsset("/images/industrial/industrial-demo-cover.png"),
  whyItMatters: {
    eyebrow: ls("Why It Matters", "为什么重要"),
    title: ls("Five problems we solve.", "五个我们解决的核心问题。"),
    subtitle: ls(
      "Industrial vision teams hit the same walls. We built the platform to break through each one.",
      "工业视觉团队面临的是同样的难题。我们构建了逐一突破这些问题的平台。"
    ),
    items: [
      {
        id: "defect-scarcity",
        title: ls("Defect samples are scarce", "缺陷样本稀缺"),
        description: ls(
          "Real defects are rare on the line. Models trained on thin samples miss edge cases and leak defects into production.",
          "产线上真实缺陷极少。基于薄弱样本训练的模型会漏掉边缘情况，让缺陷流入生产。"
        ),
      },
      {
        id: "annotation-cost",
        title: ls("Annotation is expensive", "标注成本高昂"),
        description: ls(
          "Manual labeling of defect masks is slow and costly. Scaling a dataset by hand rarely fits the timeline.",
          "人工标注缺陷 mask 既慢又贵。手工扩数据集往往赶不上项目时间线。"
        ),
      },
      {
        id: "new-product-line",
        title: ls("New lines lack history", "新产线无历史数据"),
        description: ls(
          "New products and materials ship without historical data. AI models can't ramp fast enough to protect yield.",
          "新产品、新材料上线时没有历史数据。AI 模型无法快速跟上以保障良率。"
        ),
      },
      {
        id: "model-transfer",
        title: ls("Models fail on transfer", "模型跨场景失效"),
        description: ls(
          "A model that performs on line A often degrades on line B. Re-training requires data you don't yet have.",
          "A 线上表现好的模型到 B 线往往性能下降。重新训练需要你还没有的数据。"
        ),
      },
      {
        id: "boundary-validation",
        title: ls("No boundary testing", "缺少边界验证"),
        description: ls(
          "Without edge-case samples, you ship blind. Models break silently on the extremes that matter most.",
          "没有边缘案例样本，上线就是盲测。模型在最关键的极端情况上悄无声息地失效。"
        ),
      },
    ],
  },
  showcase: {
    eyebrow: ls("Platform Showcase", "平台展示"),
    title: ls("Four stages, one pipeline.", "四个阶段，一条管线。"),
    subtitle: ls(
      "Click through each stage to see the actual interface.",
      "点击每个阶段，查看真实界面。"
    ),
    stageLabel: ls("Stage", "阶段"),
  },
  // Tabbed showcase — each tab uses a real industrial image
  tabs: [
    {
      id: "dataset-audit",
      label: ls("Dataset Audit", "数据体检"),
      title: ls("Find the gaps in your dataset", "发现数据集中的缺口"),
      description: ls(
        "We profile class distribution, defect coverage, and imbalance before generating anything. You see exactly what's missing.",
        "在生成任何内容之前，我们先分析类别分布、缺陷覆盖度与样本不平衡问题。你能清楚看到缺什么。"
      ),
      image: publicAsset("/images/industrial/dataset-audit.png"),
      points: lsa(
        ["Class distribution analysis", "Defect coverage map", "Imbalance & rarity report"],
        ["类别分布分析", "缺陷覆盖度图谱", "不平衡与稀有性报告"]
      ),
    },
    {
      id: "synthetic-generation",
      label: ls("Synthetic Generation", "约束生成"),
      title: ls("Generate controlled defect variants", "生成可控的缺陷变体"),
      description: ls(
        "Diffusion-based synthesis with defect type, position, scale, and morphology control. Each output is industrially meaningful, not just visually plausible.",
        "基于扩散的合成方式，可控制缺陷类型、位置、尺度与形态。每个输出都具备工业意义，而不仅仅是视觉上说得过去。"
      ),
      image: publicAsset("/images/industrial/synthetic-generation.png"),
      points: lsa(
        ["Defect type & morphology control", "Position and scale constraints", "Style-locked to your line"],
        ["缺陷类型与形态控制", "位置与尺度约束", "与你的产线风格一致"]
      ),
    },
    {
      id: "quality-filtering",
      label: ls("Quality Filtering", "准入筛选"),
      title: ls("Filter out the noise", "过滤掉无效样本"),
      description: ls(
        "Automated and human-in-the-loop screening rejects artifacts and out-of-distribution samples before they contaminate your training set.",
        "自动化与人机协作的筛选机制，在伪影与分布外样本污染训练集之前就将其排除。"
      ),
      image: publicAsset("/images/industrial/quality-filtering.png"),
      points: lsa(
        ["Artifact detection", "Distribution drift check", "Human-in-the-loop review"],
        ["伪影检测", "分布漂移检查", "人机协作审核"]
      ),
    },
    {
      id: "benchmark-report",
      label: ls("Benchmark Report", "回测验证"),
      title: ls("Prove the lift before you ship", "上线前证明效果提升"),
      description: ls(
        "We run before/after benchmarks so you see the actual model improvement, not just image counts. Reports are delivered alongside the dataset.",
        "我们运行增强前后的基准测试，让你看到模型的实际提升，而不只是图片数量。报告随数据集一起交付。"
      ),
      image: publicAsset("/images/industrial/benchmark-report.png"),
      points: lsa(
        ["Before/after mAP comparison", "Per-class lift analysis", "Edge-case recall check"],
        ["增强前后 mAP 对比", "分类别提升分析", "边缘案例召回检查"]
      ),
    },
  ],
  // Larger feature images used elsewhere on the page
  featureImages: {
    workflowDashboard: publicAsset("/images/industrial/workflow-dashboard.png"),
    beforeAfterPackage: publicAsset("/images/industrial/before-after-package.png"),
  },
  workflowDashboard: {
    eyebrow: ls("Workflow Dashboard", "工作流仪表盘"),
    title: ls("Every step visible.", "每一步都清晰可见。"),
    description: ls(
      "Track samples, generations, filters, and benchmark lifts in a single dashboard. No black boxes — every output is traceable back to its source sample.",
      "在一个仪表盘中追踪样本、生成、筛选与基准提升。没有黑箱——每个输出都能追溯到源样本。"
    ),
    tags: lsa(
      ["Traceable", "Auditable", "Reproducible"],
      ["可追溯", "可审计", "可复现"]
    ),
  },
  beforeAfter: {
    eyebrow: ls("Model-ready Package", "可训练数据包"),
    title: ls("Before → After, in one package.", "增强前后，一包交付。"),
    description: ls(
      "Every delivery ships with images, labels, masks, train/val split, and metadata. Plus a before/after benchmark report so your team can verify the lift.",
      "每次交付都包含图像、标签、mask、训练/验证集划分与元数据。外加增强前后的基准报告，让你的团队可以验证提升效果。"
    ),
    items: lsa(
      [
        "COCO-format images + annotations",
        "Paired masks and class labels",
        "Train / validation split",
        "Before/after benchmark report",
      ],
      [
        "COCO 格式图像 + 标注",
        "配对 mask 与类别标签",
        "训练 / 验证集划分",
        "增强前后基准报告",
      ]
    ),
  },
  kpis: [
    { label: ls("Input Samples", "输入样本"), value: "20+" },
    { label: ls("Generated", "生成数量"), value: "500+" },
    { label: ls("Defect Types", "缺陷类型"), value: "8+" },
    { label: ls("Validation", "验证步骤"), value: ls("4-Step", "4 步") },
  ],
  workflowSection: {
    eyebrow: ls("Workflow", "工作流程"),
    title: ls("Six-step validation.", "六步验证流程。"),
  },
  workflow: [
    { step: "01", title: ls("Dataset Audit", "数据体检"), description: ls("Profile the gaps", "分析数据缺口") },
    { step: "02", title: ls("Defect Taxonomy", "缺陷分类"), description: ls("Define defect classes", "定义缺陷类别") },
    { step: "03", title: ls("Synthetic Generation", "约束生成"), description: ls("Controlled augmentation", "可控数据增强") },
    { step: "04", title: ls("Quality Filtering", "准入筛选"), description: ls("Reject artifacts", "排除伪影") },
    { step: "05", title: ls("Model-ready Package", "可训练数据包"), description: ls("Images + labels + masks", "图像 + 标签 + mask") },
    { step: "06", title: ls("Benchmark Report", "回测验证"), description: ls("Prove the lift", "验证效果提升") },
  ],
  trialPathSection: {
    eyebrow: ls("Trial Path", "试点路径"),
    title: ls("Start with your samples.", "从你的样本开始。"),
  },
  trialPath: [
    { step: "01", title: ls("Send samples", "发送样本"), description: ls("Upload a handful of real images", "上传少量真实图像") },
    { step: "02", title: ls("Diagnosis", "诊断分析"), description: ls("We analyze defect distribution and gaps", "我们分析缺陷分布与缺口") },
    { step: "03", title: ls("Demo augmentation", "演示增强"), description: ls("We generate augmented samples + labels", "我们生成增强样本与标签") },
    { step: "04", title: ls("Validation report", "验证报告"), description: ls("Benchmark before/after lift", "基准测试增强前后提升") },
    { step: "05", title: ls("Full project", "完整项目"), description: ls("Scale to a production dataset", "扩展为生产级数据集") },
  ],
  contact: {
    eyebrow: ls("Contact", "联系我们"),
    ctaTitle: ls(
      "Book an enterprise demo. See how AI data enhancement lifts your industrial vision inspection.",
      "预约企业演示，了解 AI 数据增强如何提升你的工业视觉检测。"
    ),
    primaryCta: ls("Book enterprise demo", "预约企业演示"),
    secondaryCta: ls("Contact Spartina Technology", "联系米草科技"),
    tertiaryCta: ls("Back to home", "返回首页"),
  },
  livePreview: ls("Live preview", "实时预览"),
  prototypeScale: ls("Prototype / Demo-scale", "原型 / 演示规模"),
  footer: ls(
    "Industrial AI data enhancement platform.",
    "工业 AI 数据增强平台。"
  ),
};
