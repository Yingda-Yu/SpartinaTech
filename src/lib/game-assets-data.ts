import type { Locale } from "@/lib/i18n";
import type { LocalizedString, LocalizedStringArray } from "@/lib/data";

function ls(en: string, zh: string): LocalizedString {
  return { en, zh };
}

function lsa(en: string[], zh: string[]): LocalizedStringArray {
  return { en, zh };
}

export type GameProblemPoint = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
};

export type GameDeliverable = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
};

export type GameWorkflowStep = {
  step: string;
  title: LocalizedString;
  description: LocalizedString;
};

export type GameUseCase = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
};

export const gameProblemPoints: GameProblemPoint[] = [
  {
    id: "long-cycle",
    title: ls("Long production cycles", "制作周期长"),
    description: ls(
      "Game asset production is slow and expensive, especially for small teams that need to ship quickly.",
      "游戏素材制作周期长、成本高，对于需要快速上线的小团队尤其困难。"
    ),
  },
  {
    id: "batch-volume",
    title: ls("High-volume batch demand", "成批量素材需求"),
    description: ls(
      "Mini-games and casual games need large batches of consistent assets, not one-off illustrations.",
      "小游戏和休闲游戏需要大量一致的素材，而不是一次性插图。"
    ),
  },
  {
    id: "pair-consistency",
    title: ls("Spot-the-diff needs paired images", "找不同需要成对图像"),
    description: ls(
      "Spot-the-difference gameplay needs two highly consistent images with clear, controllable local differences — not two unrelated pictures.",
      "找不同玩法需要两张高度一致但局部差异清晰的图片，而不是两张无关的图片。"
    ),
  },
  {
    id: "answer-metadata",
    title: ls("Images alone are not enough", "光有图还不够"),
    description: ls(
      "Difference games also need to record difference positions, hints, and level metadata — most pipelines stop at the image.",
      "找不同游戏还需要记录差异点位置、提示语和关卡数据——多数管线只停留在图像层面。"
    ),
  },
  {
    id: "no-repeatable-pipeline",
    title: ls("No repeatable pipeline", "缺少可复用管线"),
    description: ls(
      "Small teams rarely have a repeatable production pipeline, so each new level is built from scratch.",
      "小团队缺少可重复生产的素材 pipeline，每个新关卡都要从零开始。"
    ),
  },
];

export const gameDeliverables: GameDeliverable[] = [
  {
    id: "character-concepts",
    title: ls("Character concepts", "角色概念"),
    description: ls(
      "Stylistically consistent character concepts for game protagonists, NPCs, and IP figures.",
      "风格一致的角色概念，覆盖游戏主角、NPC 与 IP 形象。"
    ),
  },
  {
    id: "scene-illustrations",
    title: ls("Scene illustrations", "场景插图"),
    description: ls(
      "Background scenes and environment illustrations locked to the game's visual worldview.",
      "锁定游戏世界观的背景场景与环境插图。"
    ),
  },
  {
    id: "prop-item-assets",
    title: ls("Prop and item assets", "道具与物件资产"),
    description: ls(
      "In-game props, items, icons, and object assets generated in a consistent style.",
      "风格一致的游戏内道具、物品、图标与物件资产。"
    ),
  },
  {
    id: "ab-image-pairs",
    title: ls("A/B image pairs", "成对差异图"),
    description: ls(
      "Paired A/B images that share composition and style but contain controlled local differences.",
      "共享构图与风格、但包含可控局部差异的 A/B 成对图像。"
    ),
  },
  {
    id: "controllable-edits",
    title: ls("Controllable local edits", "局部可控编辑"),
    description: ls(
      "Localised edits that preserve overall composition, lighting, and subject identity while changing only the target region.",
      "在保持整体构图、光影与主体一致的前提下，仅修改目标区域的局部编辑。"
    ),
  },
  {
    id: "difference-labels",
    title: ls("Difference-point labels", "差异点标注"),
    description: ls(
      "Structured labels for each difference: coordinates, radius, hint text, and description.",
      "为每个差异点生成的结构化标签：坐标、半径、提示语与描述。"
    ),
  },
  {
    id: "level-ready-package",
    title: ls("Level-ready asset packages", "可用于关卡配置的素材包"),
    description: ls(
      "A packaged bundle of images, labels, and metadata ready to drop into game level configuration.",
      "打包好的图像、标签与元数据，可直接接入游戏关卡配置。"
    ),
  },
];

export const gameWorkflowSteps: GameWorkflowStep[] = [
  {
    step: "01",
    title: ls("Define gameplay and visual style", "明确玩法需求与美术风格"),
    description: ls(
      "Align on gameplay type, visual direction, and the level of difference difficulty for spot-the-difference content.",
      "明确玩法类型、视觉方向，以及找不同内容的差异难度。"
    ),
  },
  {
    step: "02",
    title: ls("Generate base image", "生成原始图像"),
    description: ls(
      "Use a ComfyUI generation pipeline to produce the base (A) image with locked style and composition.",
      "使用 ComfyUI 生成管线，产出风格与构图锁定的原始 (A) 图。"
    ),
  },
  {
    step: "03",
    title: ls("Create controlled edit", "基于原图进行局部可控编辑"),
    description: ls(
      "Apply controllable local edits to the base image to produce the paired (B) image with clear, intentional differences.",
      "对原图进行局部可控编辑，生成包含清晰、有意差异的配对 (B) 图。"
    ),
  },
  {
    step: "04",
    title: ls("Review visual consistency", "检查风格一致性与差异清晰度"),
    description: ls(
      "Review style consistency, composition alignment, and whether each difference is clearly visible and fair to the player.",
      "审核风格一致性、构图对齐，以及每个差异是否清晰、对玩家公平。"
    ),
  },
  {
    step: "05",
    title: ls("Label answer positions", "标注差异点位置"),
    description: ls(
      "Use the internal annotation tool to record each difference's coordinates, radius, hint, and description.",
      "使用内部标注工具记录每个差异点的坐标、半径、提示语与描述。"
    ),
  },
  {
    step: "06",
    title: ls("Export game-ready package", "导出可用于关卡配置的素材包"),
    description: ls(
      "Export the A/B image pair, labels, and metadata as a level-ready package that plugs into game configuration.",
      "将 A/B 图像对、标签与元数据导出为可接入游戏配置的关卡素材包。"
    ),
  },
];

export const gameUseCases: GameUseCase[] = [
  {
    id: "spot-the-difference",
    title: ls("Spot-the-difference games", "找不同游戏"),
    description: ls(
      "Produce paired A/B images with labeled answer points for spot-the-difference levels.",
      "为找不同关卡生产成对 A/B 图像与标注好的答案点。"
    ),
  },
  {
    id: "children-education",
    title: ls("Children's educational interaction", "儿童教育互动"),
    description: ls(
      "Generate engaging visual content for children's educational interactions and observation-based learning.",
      "为儿童教育互动与观察类学习生成有趣的视觉内容。"
    ),
  },
  {
    id: "observation-training",
    title: ls("Visual observation training", "视觉观察训练"),
    description: ls(
      "Build visual observation training materials with controlled difficulty and verifiable answers.",
      "构建难度可控、答案可验证的视觉观察训练素材。"
    ),
  },
  {
    id: "puzzle-casual",
    title: ls("Puzzle and casual game content", "解谜与休闲游戏内容"),
    description: ls(
      "Supply puzzle and casual games with structured, batch-produced visual assets and level data.",
      "为解谜与休闲游戏提供结构化、批量生产的视觉资产与关卡数据。"
    ),
  },
];

export function pickGameLocale<T>(obj: { en: T; zh: T }, locale: Locale): T {
  return obj[locale];
}
