import type { Locale } from "@/lib/i18n";

export type LocalizedString = { en: string; zh: string };
export type LocalizedStringArray = { en: string[]; zh: string[] };

function ls(en: string, zh: string): LocalizedString {
  return { en, zh };
}

function lsa(en: string[], zh: string[]): LocalizedStringArray {
  return { en, zh };
}

export function pickLocale<T>(obj: { en: T; zh: T }, locale: Locale): T {
  return obj[locale];
}

export type ServiceItem = {
  id: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  keyPoints: LocalizedStringArray;
  image: string;
  href?: string;
  problem?: LocalizedString;
  deliverables?: LocalizedStringArray;
  targetClients?: LocalizedStringArray;
};

export type ProjectItem = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  category: LocalizedString;
  status: LocalizedString;
  output: LocalizedString;
  deliverables: LocalizedStringArray;
  techStack: string[];
  metrics: { label: LocalizedString; value: string }[];
  image: string;
  href?: string;
  problem?: LocalizedString;
  input?: LocalizedString;
  process?: LocalizedStringArray;
};

export type VisualProofItem = {
  id: string;
  title: LocalizedString;
  category: LocalizedString;
  description: LocalizedString;
  transform: { from: LocalizedString; to: LocalizedString };
  image: string;
};

export type WorkflowStep = {
  step: string;
  title: LocalizedString;
  description: LocalizedString;
};

export type WorkflowItem = {
  id: string;
  title: LocalizedString;
  problem: LocalizedString;
  whatWeDo: LocalizedString;
  deliverables: LocalizedStringArray;
};

const assetBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function publicAsset(path: string): string {
  return `${assetBasePath}${path}`;
}

export const heroBackground = publicAsset("/images/hero/abstract-ai-motion.webp");
export const demoReelPoster = publicAsset("/images/projects/demo-reel-cover.webp");

export const solutions: ServiceItem[] = [
  {
    id: "industrial-data",
    title: ls("Industrial Data Enhancement", "工业数据增强"),
    subtitle: ls("From few samples to model-ready datasets", "从少量样本到可训练数据集"),
    description: ls(
      "Model-ready datasets for industrial inspection, defect synthesis, masks, labels, and validation workflows.",
      "面向工业视觉检测构建可训练数据集，支持缺陷生成、mask、label 与模型验证工作流。"
    ),
    keyPoints: lsa(
      ["Defect type & morphology control", "Paired mask and label output", "Dataset split and training guidance"],
      ["缺陷类型与形态控制", "成对 mask 与 label 输出", "数据集划分与训练指导"]
    ),
    image: publicAsset("/images/services/industrial-data-enhancement.webp"),
    href: "/industrial",
    problem: ls(
      "Industrial AI teams often start with too few real defect samples, making it hard to train robust inspection models.",
      "工业 AI 团队常常面临真实缺陷样本不足的问题，难以训练出鲁棒的检测模型。"
    ),
    deliverables: lsa(
      ["Augmented image sets", "Paired masks and labels", "Dataset splits", "Training guidance"],
      ["增强图像集", "配对 mask 与标签", "数据集划分", "训练指导"]
    ),
    targetClients: lsa(
      ["Manufacturers with AI inspection teams", "Quality control departments", "AI solution providers"],
      ["有 AI 检测团队的制造企业", "质量控制部门", "AI 解决方案提供商"]
    ),
  },
  {
    id: "ai-education",
    title: ls("AI for Education", "AI 教育内容"),
    subtitle: ls("Series-ready learning content at scale", "系列化学习内容，规模化生产"),
    description: ls(
      "Series-ready learning content, leveled reading materials, illustrations, and course visuals.",
      "生成系列化学习内容、分级阅读材料、插图与课程视觉资产。"
    ),
    keyPoints: lsa(
      ["Structured content pipeline", "Consistent text-image alignment", "Built for ongoing serialization"],
      ["结构化内容管线", "稳定的图文一致性", "支持持续系列化"]
    ),
    image: publicAsset("/images/services/ai-education.webp"),
    href: "/education",
    problem: ls(
      "Educational content production is slow, illustrations are expensive, and maintaining consistency across a series is difficult.",
      "教育内容生产慢、插图成本高、系列化内容难以保持一致性。"
    ),
    deliverables: lsa(
      ["Leveled reading passages", "Short essays", "Children's illustrations", "Course visuals", "IP content series"],
      ["分级阅读文章", "小作文", "儿童插图", "课程视觉", "IP 内容系列"]
    ),
    targetClients: lsa(
      ["EdTech companies", "Textbook publishers", "Education content teams", "Children's media"],
      ["教育科技公司", "教材出版社", "教育内容团队", "儿童媒体"]
    ),
  },
  {
    id: "visual-assets",
    title: ls("AI Visual Assets", "AI 视觉资产"),
    subtitle: ls("Brand-grade imagery, on demand", "按需生成品牌级图像"),
    description: ls(
      "Brand-grade imagery, product visuals, posters, packaging concepts, and social media assets.",
      "生成品牌级视觉图像、产品图、海报、包装概念与社交媒体素材。"
    ),
    keyPoints: lsa(
      ["Style-locked batch generation", "Multi-channel format export", "Deliverable asset packages"],
      ["风格锁定的批量生成", "多渠道格式导出", "可交付的资产包"]
    ),
    image: publicAsset("/images/services/ai-visual-assets.webp"),
    href: "/visual-assets",
    problem: ls(
      "Brands and marketing teams need consistent, on-brand visuals at scale, but traditional production is slow and costly.",
      "品牌和营销团队需要大规模的品牌一致视觉资产，但传统生产方式慢且成本高。"
    ),
    deliverables: lsa(
      ["Product photography", "Marketing posters", "Packaging concepts", "Social media assets", "Wallpaper collections", "IP imagery"],
      ["产品图", "营销海报", "包装概念", "社交媒体素材", "壁纸套装", "IP 图像"]
    ),
    targetClients: lsa(
      ["Brand marketing teams", "E-commerce operations", "Content agencies", "SMB product teams"],
      ["品牌营销团队", "电商运营", "内容 agency", "中小企业产品团队"]
    ),
  },
  {
    id: "game-film",
    title: ls("Game & Film Assets", "游戏与影视资产"),
    subtitle: ls("Concept exploration, faster", "更快的概念探索"),
    description: ls(
      "Concept art, characters, environments, storyboards, props, and visual development materials.",
      "生成概念图、角色、场景、分镜、道具与前期视觉开发素材。"
    ),
    keyPoints: lsa(
      ["Rapid concept iteration", "Worldview consistency", "Studio-friendly delivery"],
      ["快速概念迭代", "世界观一致性", "适配工作室的交付方式"]
    ),
    image: publicAsset("/images/services/game-film-assets.webp"),
    problem: ls(
      "Game and film pre-production needs rapid concept iteration, but traditional concept art pipelines are slow and expensive.",
      "游戏和影视前期制作需要快速概念迭代，但传统概念美术流程慢且成本高。"
    ),
    deliverables: lsa(
      ["Character concepts", "Environment designs", "Storyboard frames", "Props and weapons", "Promo visuals"],
      ["角色概念", "场景设计", "分镜帧", "道具与武器", "宣传视觉"]
    ),
    targetClients: lsa(
      ["Game studios", "Film production teams", "Animation studios", "Short drama teams"],
      ["游戏工作室", "影视制作团队", "动画工作室", "短剧团队"]
    ),
  },
  {
    id: "custom-workflow",
    title: ls("Custom AI Workflow", "定制 AI 工作流"),
    subtitle: ls("Production systems, not just prompts", "生产系统，而非单纯提示词"),
    description: ls(
      "Reusable AI production systems for generation, review, packaging, and delivery.",
      "为企业构建可复用的 AI 生产系统，覆盖生成、审核、打包与交付。"
    ),
    keyPoints: lsa(
      ["Reusable production systems", "Enterprise-grade customization", "Data automation pipelines"],
      ["可复用的生产系统", "企业级定制能力", "数据自动化管线"]
    ),
    image: publicAsset("/images/services/custom-ai-workflow.webp"),
    href: "/workflows",
    problem: ls(
      "Many teams have repetitive AI tasks but lack a production-ready system to scale them reliably.",
      "很多团队有重复性的 AI 任务，但缺乏可稳定规模化的生产级系统。"
    ),
    deliverables: lsa(
      ["Custom generation pipelines", "Review and QA workflows", "Batch processing systems", "API integrations", "Delivery automation"],
      ["定制生成管线", "审核与 QA 工作流", "批量处理系统", "API 集成", "交付自动化"]
    ),
    targetClients: lsa(
      ["Enterprise innovation teams", "Content production studios", "Data teams", "Product teams building AI features"],
      ["企业创新团队", "内容生产工作室", "数据团队", "构建 AI 功能的产品团队"]
    ),
  },
  {
    id: "consumer-products",
    title: ls("Consumer Digital Products", "C 端数字产品"),
    subtitle: ls("Visual content for end users", "面向终端用户的视觉内容"),
    description: ls(
      "Wallpapers, IP visuals, digital collections, and social content for consumer-facing product lines.",
      "面向 C 端产品线生成壁纸、IP 图像、数字图集与社交媒体内容。"
    ),
    keyPoints: lsa(
      ["Product-drop cadence", "Cross-platform output", "Subscription-ready catalogs"],
      ["产品发布节奏", "跨平台输出", "订阅就绪的内容库"]
    ),
    image: publicAsset("/images/services/consumer-digital-products.webp"),
    problem: ls(
      "Consumer-facing digital products need steady streams of fresh visual content to keep users engaged.",
      "面向 C 端的数字产品需要持续的新鲜视觉内容来保持用户参与度。"
    ),
    deliverables: lsa(
      ["Wallpaper collections", "IP visual sets", "Digital art drops", "Social content series", "Subscription catalogs"],
      ["壁纸集合", "IP 视觉集", "数字艺术发布", "社交内容系列", "订阅内容库"]
    ),
    targetClients: lsa(
      ["Consumer app teams", "IP and brand owners", "Content subscription platforms", "Social media creators"],
      ["C 端应用团队", "IP 与品牌方", "内容订阅平台", "社交媒体创作者"]
    ),
  },
];

export const projects: ProjectItem[] = [
  {
    id: "industrial-defect-demo",
    title: ls("Industrial Defect Data Enhancement", "工业缺陷数据增强"),
    description: ls(
      "A handful of real industrial images in, a varied defect-augmented dataset out — built for AI quality-inspection model training.",
      "输入少量真实工业图像，输出多样化的缺陷增强数据集——专为 AI 质量检测模型训练打造。"
    ),
    category: ls("Industrial", "工业"),
    status: ls("Live Demo", "在线演示"),
    output: ls("Train-ready defect dataset", "可训练的缺陷数据集"),
    deliverables: lsa(
      ["Augmented images", "Defect masks", "Class labels", "Train/val split"],
      ["增强图像", "缺陷 mask", "类别标签", "训练/验证集划分"]
    ),
    techStack: ["Diffusion", "Defect modeling", "Mask synthesis", "COCO format"],
    metrics: [
      { label: ls("Input Samples", "输入样本"), value: "20+" },
      { label: ls("Generated", "生成数量"), value: "500+" },
      { label: ls("Defect Types", "缺陷类型"), value: "8+" },
    ],
    image: publicAsset("/images/projects/industrial-demo.webp"),
    href: "/industrial",
    problem: ls(
      "Training industrial defect detection models requires diverse defect samples, but real-world defect data is scarce and hard to collect.",
      "训练工业缺陷检测模型需要多样化的缺陷样本，但真实缺陷数据稀缺且难以收集。"
    ),
    input: ls(
      "20+ real industrial product images with very few defect samples.",
      "20+ 张真实工业产品图像，缺陷样本极少。"
    ),
    process: lsa(
      ["Defect morphology analysis and type classification", "Synthetic defect generation with diffusion models", "Mask and label pair generation", "Quality filtering and dataset splitting"],
      ["缺陷形态分析与类型分类", "使用扩散模型生成合成缺陷", "Mask 与 label 配对生成", "质量过滤与数据集划分"]
    ),
  },
  {
    id: "leo-mia-education",
    title: ls("Leo & Mia AI Education", "Leo & Mia AI 教育内容"),
    description: ls(
      "AI-generated English leveled reading, short essays, children's illustrations, and serialized educational content.",
      "AI 生成的英语分级阅读、短篇文章、儿童插图与系列化教育内容。"
    ),
    category: ls("Education", "教育"),
    status: ls("In Production", "生产中"),
    output: ls("Series content library", "系列内容库"),
    deliverables: lsa(
      ["Reading passages", "Illustrations", "Level sets", "Teacher notes"],
      ["阅读文章", "插图", "分级内容", "教学备注"]
    ),
    techStack: ["LLM", "Image gen", "Style lock", "Editorial review"],
    metrics: [
      { label: ls("Content Units", "内容单元"), value: "100+" },
      { label: ls("Reading Levels", "阅读等级"), value: "5" },
      { label: ls("Illustrations", "插图数量"), value: "50+" },
    ],
    image: publicAsset("/images/projects/leo-mia-education.webp"),
    problem: ls(
      "Producing consistent, high-quality educational content at scale is expensive and slow — especially illustrations and leveled reading series.",
      "规模化生产一致、高质量的教育内容成本高且速度慢——尤其是插图和分级阅读系列。"
    ),
    input: ls(
      "Educational themes, target age range, and reading level specifications.",
      "教育主题、目标年龄段和阅读等级要求。"
    ),
    process: lsa(
      ["Theme and storyline planning", "Structured content generation with LLM", "Style-consistent illustration generation", "Level matching and quality review"],
      ["主题与故事线策划", "使用 LLM 结构化生成内容", "风格一致的插图生成", "等级匹配与质量审核"]
    ),
  },
  {
    id: "visual-product-line",
    title: ls("Generative Visual Product Line", "生成式视觉产品线"),
    description: ls(
      "A consumer visual matrix — wallpapers, digital art sets, IP imagery, and social content delivered as product drops.",
      "面向消费者的视觉矩阵——壁纸、数字艺术集、IP 图像与社交内容，以产品发布的形式持续交付。"
    ),
    category: ls("Consumer", "消费级"),
    status: ls("Shipping", "持续交付"),
    output: ls("Visual product drops", "视觉产品发布"),
    deliverables: lsa(
      ["Wallpaper sets", "Art collections", "IP imagery", "Social assets"],
      ["壁纸套装", "艺术集", "IP 图像", "社交素材"]
    ),
    techStack: ["SDXL", "Upscaling", "Color grading", "Batch packaging"],
    metrics: [
      { label: ls("Product Drops", "产品发布"), value: "5+" },
      { label: ls("Visual Assets", "视觉资产"), value: "200+" },
      { label: ls("Collections", "系列数量"), value: "3" },
    ],
    image: publicAsset("/images/projects/visual-product-line.webp"),
    problem: ls(
      "Consumer-facing products need continuous visual updates to stay relevant, but traditional production can't keep up with release cadence.",
      "面向 C 端的产品需要持续的视觉更新来保持热度，但传统生产方式跟不上发布节奏。"
    ),
    input: ls(
      "Brand guidelines, theme directions, and target platform specifications.",
      "品牌规范、主题方向和目标平台规格。"
    ),
    process: lsa(
      ["Style system and theme definition", "Batch generation with style locking", "Quality review and curation", "Multi-format export and packaging"],
      ["风格系统与主题定义", "风格锁定的批量生成", "质量审核与筛选", "多格式导出与打包"]
    ),
  },
  {
    id: "game-film-concept",
    title: ls("Game & Film Concept Assets", "游戏与影视概念资产"),
    description: ls(
      "Characters, scenes, props, storyboards, and promo visuals for games, short drama, and film pre-production.",
      "为游戏、短剧与电影前期制作提供角色、场景、道具、分镜与宣传视觉。"
    ),
    category: ls("Entertainment", "娱乐"),
    status: ls("Prototype", "原型阶段"),
    output: ls("Concept asset pack", "概念资产包"),
    deliverables: lsa(
      ["Character concepts", "Scene designs", "Storyboard frames", "Promo visuals"],
      ["角色概念", "场景设计", "分镜帧", "宣传视觉"]
    ),
    techStack: ["SDXL", "ControlNet", "Style reference", "ComfyUI"],
    metrics: [
      { label: ls("Characters", "角色数量"), value: "20+" },
      { label: ls("Scenes", "场景数量"), value: "15+" },
      { label: ls("Storyboard Frames", "分镜帧数量"), value: "50+" },
    ],
    image: publicAsset("/images/projects/game-film-concept.webp"),
    problem: ls(
      "Game and film pre-production requires rapid concept iteration to find the right visual direction, but traditional pipelines are time-consuming.",
      "游戏和影视前期制作需要快速概念迭代来找到正确的视觉方向，但传统流程耗时很长。"
    ),
    input: ls(
      "Worldbuilding brief, character descriptions, and reference materials.",
      "世界观设定、角色描述和参考素材。"
    ),
    process: lsa(
      ["Worldview and style exploration", "Character concept iteration", "Environment and scene design", "Storyboard and key frame generation"],
      ["世界观与风格探索", "角色概念迭代", "场景与环境设计", "分镜与关键帧生成"]
    ),
  },
];

export const visualProofItems: VisualProofItem[] = [
  {
    id: "industrial-defect",
    title: ls("Industrial Defect Samples", "工业缺陷样本"),
    category: ls("Industrial", "工业"),
    description: ls(
      "Synthesized defect variants with paired masks for quality-inspection training.",
      "生成的缺陷变体及其配对 mask，用于质量检测模型训练。"
    ),
    transform: {
      from: ls("Few real samples", "少量真实样本"),
      to: ls("Augmented defect set", "增强后的缺陷集"),
    },
    image: publicAsset("/images/visual-proof/industrial-defect-samples.webp"),
  },
  {
    id: "education-illustration",
    title: ls("Education Illustration", "教育插图"),
    category: ls("Education", "教育"),
    description: ls(
      "Consistent children's illustration aligned with leveled reading passages.",
      "与分级阅读文本对齐的一致风格儿童插图。"
    ),
    transform: {
      from: ls("Reading passage", "阅读文本"),
      to: ls("Illustrated page", "插图页面"),
    },
    image: publicAsset("/images/visual-proof/education-illustration.webp"),
  },
  {
    id: "game-character",
    title: ls("Game Character Concept", "游戏角色概念"),
    category: ls("Game", "游戏"),
    description: ls(
      "Character concepts locked to a stable worldview across multiple poses and outfits.",
      "锁定稳定世界观的角色概念，覆盖多种姿势与服装。"
    ),
    transform: {
      from: ls("Character brief", "角色说明"),
      to: ls("Concept sheet", "概念图集"),
    },
    image: publicAsset("/images/visual-proof/game-character-concept.webp"),
  },
  {
    id: "film-storyboard",
    title: ls("Film Storyboard Frame", "影视分镜帧"),
    category: ls("Film", "影视"),
    description: ls(
      "Storyboard frames generated from scene descriptions for pre-production review.",
      "从场景描述生成的分镜帧，用于前期制作评审。"
    ),
    transform: {
      from: ls("Scene description", "场景描述"),
      to: ls("Storyboard frame", "分镜帧"),
    },
    image: publicAsset("/images/visual-proof/film-storyboard-frame.webp"),
  },
  {
    id: "brand-visual",
    title: ls("Brand Visual Package", "品牌视觉包"),
    category: ls("Brand", "品牌"),
    description: ls(
      "A complete brand visual kit — posters, product shots, and social assets in one style.",
      "完整的品牌视觉套件——统一风格的海报、产品图与社交素材。"
    ),
    transform: {
      from: ls("Brand brief", "品牌简介"),
      to: ls("Visual kit", "视觉套件"),
    },
    image: publicAsset("/images/visual-proof/brand-visual-package.webp"),
  },
  {
    id: "wallpaper-collection",
    title: ls("Wallpaper Collection", "壁纸集"),
    category: ls("Consumer", "C 端"),
    description: ls(
      "Mobile-first wallpaper drops shipped as a subscription-ready visual product.",
      "以移动端优先的壁纸发布，作为订阅就绪的视觉产品交付。"
    ),
    transform: {
      from: ls("Theme prompt", "主题提示词"),
      to: ls("Wallpaper drop", "壁纸发布"),
    },
    image: publicAsset("/images/visual-proof/wallpaper-collection.webp"),
  },
];

export const workflowSteps: WorkflowStep[] = [
  {
    step: "01",
    title: ls("Diagnose", "诊断"),
    description: ls(
      "Understand industry, goals, data, visual style, and delivery standards.",
      "了解行业、目标、数据、视觉风格与交付标准。"
    ),
  },
  {
    step: "02",
    title: ls("Prototype", "原型"),
    description: ls(
      "A short-cycle demo: small-sample data augmentation, style exploration, or asset samples.",
      "短周期演示：小样本数据增强、风格探索或资产样例。"
    ),
  },
  {
    step: "03",
    title: ls("Generate", "生成"),
    description: ls(
      "Batch-generate images, data, annotations, content, or assets with consistent style.",
      "批量生成风格一致的图像、数据、标注、内容或资产。"
    ),
  },
  {
    step: "04",
    title: ls("Review", "审核"),
    description: ls(
      "Human screening, quality control, semantic consistency, and business-rule validation.",
      "人工筛选、质量控制、语义一致性与业务规则验证。"
    ),
  },
  {
    step: "05",
    title: ls("Package", "打包"),
    description: ls(
      "Deliver dataset, visual asset, content, or workflow packages ready for production.",
      "交付可直接投入生产的数据集、视觉资产、内容或工作流包。"
    ),
  },
  {
    step: "06",
    title: ls("Iterate", "迭代"),
    description: ls(
      "Refine based on feedback into a reusable AI production pipeline.",
      "根据反馈持续优化，形成可复用的 AI 生产管线。"
    ),
  },
];

export const workflows: WorkflowItem[] = [
  {
    id: "image-generation",
    title: ls("Image generation workflow", "图像生成工作流"),
    problem: ls(
      "Teams need consistent brand imagery across campaigns, but generating on demand is unpredictable and time-consuming.",
      "团队需要在多个营销活动中保持一致的品牌视觉，但按需生成不可预测且耗时。"
    ),
    whatWeDo: ls(
      "Build style-locked generation pipelines with controlled output parameters, quality filtering, and multi-format export.",
      "构建风格锁定的生成管线，包含可控输出参数、质量筛选和多格式导出。"
    ),
    deliverables: lsa(
      ["Style reference documents", "Generation scripts", "Quality filter workflows", "Export pipelines"],
      ["风格参考文档", "生成脚本", "质量筛选工作流", "导出管线"]
    ),
  },
  {
    id: "dataset-enhancement",
    title: ls("Dataset enhancement workflow", "数据增强工作流"),
    problem: ls(
      "AI teams often lack enough training data, but manual data collection is slow and expensive.",
      "AI 团队常常缺乏足够的训练数据，但手动数据收集速度慢且成本高。"
    ),
    whatWeDo: ls(
      "Create synthetic data generation pipelines with controlled variation, paired labels, and validation workflows.",
      "创建合成数据生成管线，包含可控变异、配对标签和验证工作流。"
    ),
    deliverables: lsa(
      ["Synthetic data generator", "Label/mask pairing", "Validation workflows", "Dataset packaging"],
      ["合成数据生成器", "标签/mask 配对", "验证工作流", "数据集打包"]
    ),
  },
  {
    id: "education-content",
    title: ls("Education content workflow", "教育内容生产工作流"),
    problem: ls(
      "Educational content needs serialization, consistency, and leveled difficulty, but manual production can't scale.",
      "教育内容需要系列化、一致性和分级难度，但手动生产无法规模化。"
    ),
    whatWeDo: ls(
      "Build structured pipelines for content generation, illustration, leveling, and multi-platform publishing.",
      "构建结构化管线，支持内容生成、插图、分级和多平台发布。"
    ),
    deliverables: lsa(
      ["Content generation pipeline", "Illustration workflow", "Leveling engine", "Multi-format export"],
      ["内容生成管线", "插图工作流", "分级引擎", "多格式导出"]
    ),
  },
  {
    id: "visual-asset-packaging",
    title: ls("Visual asset packaging workflow", "视觉资产打包工作流"),
    problem: ls(
      "Brands need asset packages for launches, but coordinating design teams and format requirements is complex.",
      "品牌在发布时需要资产包，但协调设计团队和格式要求很复杂。"
    ),
    whatWeDo: ls(
      "Create end-to-end workflows that generate, review, package, and deliver visual asset collections.",
      "创建端到端工作流，支持生成、审核、打包和交付视觉资产集合。"
    ),
    deliverables: lsa(
      ["Asset generation scripts", "Review dashboards", "Packaging workflows", "Delivery pipelines"],
      ["资产生成脚本", "审核看板", "打包工作流", "交付管线"]
    ),
  },
  {
    id: "internal-demo",
    title: ls("Internal demo / dashboard workflow", "内部演示与看板工作流"),
    problem: ls(
      "Showing AI capabilities to stakeholders requires polished demos, but building them takes engineering resources.",
      "向利益相关者展示 AI 能力需要精美的演示，但构建演示需要大量工程资源。"
    ),
    whatWeDo: ls(
      "Build lightweight demo pages and dashboards that showcase AI capabilities with real-time interaction.",
      "构建轻量级演示页面和看板，支持实时交互展示 AI 能力。"
    ),
    deliverables: lsa(
      ["Demo page", "Interactive dashboard", "API integration", "Documentation"],
      ["演示页面", "交互看板", "API 集成", "文档"]
    ),
  },
];

export const contact = {
  email: "yuyingda76@gmail.com",
  github: "https://github.com/Yingda-Yu",
};

export const site = {
  name: "Spartina Technology",
  chineseName: "米草科技",
  shortName: "SpartinaTech",
};

export const wallpaperCollections = [
  {
    id: "visual-wallpaper-drop-01",
    themeName: { en: "Visual Wallpaper Drop 01", zh: "视觉壁纸系列 01" },
    description: {
      en: "Portrait 9:20 AI wallpaper set for mobile-first release.",
      zh: "竖版 9:20 AI 壁纸套装，面向移动端发布。",
    },
    items: [
      { id: "tennis-girl-summer", alt: ls("Tennis girl in summer", "夏日网球少女"), imageSrc: publicAsset("/images/wallpapers/tennis-girl-summer-01.jpg") },
      { id: "green-tennis-girl", alt: ls("Tennis girl surrounded by greenery", "绿植环绕的网球少女"), imageSrc: publicAsset("/images/wallpapers/green-tennis-girl-01.jpg") },
      { id: "sunlit-tennis", alt: ls("Tennis under sunlight", "阳光下的网球"), imageSrc: publicAsset("/images/wallpapers/sunlit-tennis-01.jpg") },
      { id: "sunlit-basketball", alt: ls("Basketball court under sunlight", "阳光下的篮球场"), imageSrc: publicAsset("/images/wallpapers/sunlit-basketball-01.jpg") },
      { id: "sunlit-marsh", alt: ls("Sunlit marsh scene", "阳光湿地场景"), imageSrc: publicAsset("/images/wallpapers/sunlit-marsh-01.jpg") },
      { id: "spring-tree-cat", alt: ls("Spring tree and cat", "春天的树与猫"), imageSrc: publicAsset("/images/wallpapers/spring-tree-cat-01.jpg") },
      { id: "otter-character-01", alt: ls("Expressive otter character", "表情丰富的水獭角色"), imageSrc: publicAsset("/images/wallpapers/otter-character-01.jpg") },
      { id: "otter-character-02", alt: ls("Expressive otter character variant", "表情丰富的水獭角色变体"), imageSrc: publicAsset("/images/wallpapers/otter-character-02.jpg") },
    ],
  },
];

export const videoAssets = {
  demoReel: publicAsset("/videos/demo-reel.mp4"),
  industrialDemo: publicAsset("/videos/industrial-demo.mp4"),
  demoReelPoster: publicAsset("/images/projects/demo-reel-cover.webp"),
};
