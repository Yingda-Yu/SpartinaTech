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

export type AISystemCategory =
  | "creative-generation"
  | "visual-commerce"
  | "research-systems";

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

export const site = {
  name: "Spartina Technology",
  shortName: "SpartinaTech",
  tagline:
    "Multimodal digital product generation for image, video, and AI-native commerce.",
  positioning:
    "We turn prompts, brand directions, and product concepts into shippable visual assets, digital collections, and AI production workflows.",
  primaryCta: "Start a project",
  secondaryCta: "Explore work",
};

export const heroImages = [
  {
    src: "/images/wallpapers/tennis-girl-summer-01.jpg",
    alt: "AI generated summer tennis wallpaper",
  },
  {
    src: "/images/wallpapers/green-tennis-girl-01.jpg",
    alt: "AI generated green tennis wallpaper",
  },
  {
    src: "/images/wallpapers/sunlit-marsh-01.jpg",
    alt: "AI generated sunlit visual product",
  },
];

export const metrics = [
  { value: "Image", label: "visual product drops" },
  { value: "Video", label: "campaign-ready assets" },
  { value: "AI", label: "custom generation systems" },
];

export const productModes: ProductMode[] = [
  {
    title: "Digital product drops",
    description:
      "Wallpaper, avatar, character, nail-art, and themed visual collections packaged for consumer-facing releases.",
    signals: ["Prompt direction", "Style system", "Collection packaging"],
  },
  {
    title: "Brand visual kits",
    description:
      "AI-generated campaign images, launch visuals, social assets, and product scenes aligned to a clear brand language.",
    signals: ["Brand brief", "Reference board", "Platform formats"],
  },
  {
    title: "Video asset generation",
    description:
      "Short-form visual concepts, motion directions, and generated video assets for product storytelling and social distribution.",
    signals: ["Scene plan", "Motion prompt", "Editing intent"],
  },
  {
    title: "Custom AI workflows",
    description:
      "Repeatable multimodal pipelines for teams that need controlled generation, curation, evaluation, and publishing.",
    signals: ["Dataset inputs", "Model workflow", "Quality criteria"],
  },
];

export const workflowSteps: WorkflowStep[] = [
  {
    step: "01",
    title: "Define the product format",
    description:
      "We clarify the audience, output format, visual language, and commercial goal before generating assets.",
  },
  {
    step: "02",
    title: "Generate and curate",
    description:
      "Prompts, references, and model settings are iterated into a coherent set instead of isolated one-off images.",
  },
  {
    step: "03",
    title: "Package for channels",
    description:
      "Outputs are prepared for websites, social platforms, marketplaces, campaigns, or private client delivery.",
  },
  {
    step: "04",
    title: "Systemize what works",
    description:
      "Successful directions become reusable workflows, templates, and quality checks for future drops.",
  },
];

export const aiSystemCategoryLabels: Record<AISystemCategory, string> = {
  "creative-generation": "Creative generation systems",
  "visual-commerce": "Visual commerce systems",
  "research-systems": "Research-grade AI systems",
};

export const aiSystems: AISystem[] = [
  {
    slug: "multimodal-product-generator",
    category: "creative-generation",
    systemName: "Multimodal Product Generator",
    oneLineFunction:
      "Turns brand directions, prompts, and references into curated image and video product concepts.",
    inputSignals: ["Text prompts", "Reference images", "Format constraints"],
    outputs: ["Image sets", "Video concepts", "Product-ready variations"],
    impact: ["Faster ideation", "Consistent visual language", "Reusable drops"],
    year: "2026",
  },
  {
    slug: "visual-commerce-packaging",
    category: "visual-commerce",
    systemName: "Visual Commerce Packaging Workflow",
    oneLineFunction:
      "Packages generated assets into presentation, marketplace, and social formats for digital product releases.",
    inputSignals: ["Product category", "Channel specs", "Launch narrative"],
    outputs: ["Campaign visuals", "Listing assets", "Downloadable packs"],
    impact: ["Commercial readiness", "Cleaner handoff", "Repeatable launches"],
    year: "2026",
  },
  {
    slug: "environmental-visual-intelligence",
    category: "research-systems",
    systemName: "Environmental Visual Intelligence",
    oneLineFunction:
      "Applies multimodal learning and remote sensing methods to environmental monitoring and scientific understanding.",
    inputSignals: ["Satellite imagery", "Climate data", "Task labels"],
    outputs: ["Risk maps", "Segmentation masks", "Spatial analytics"],
    impact: ["Decision support", "Research workflows", "Model evaluation"],
    year: "2024",
  },
];

export const wallpaperCollections: WallpaperCollection[] = [
  {
    id: "visual-wallpaper-drop-01",
    themeName: "Visual Wallpaper Drop 01",
    description: "Portrait 9:20 AI wallpaper set for mobile-first release.",
    items: [
      {
        id: "tennis-girl-summer",
        alt: "Wallpaper: tennis girl in summer",
        imageSrc: "/images/wallpapers/tennis-girl-summer-01.jpg",
      },
      {
        id: "green-tennis-girl",
        alt: "Wallpaper: tennis girl surrounded by greenery",
        imageSrc: "/images/wallpapers/green-tennis-girl-01.jpg",
      },
      {
        id: "sunlit-tennis",
        alt: "Wallpaper: tennis under sunlight",
        imageSrc: "/images/wallpapers/sunlit-tennis-01.jpg",
      },
      {
        id: "sunlit-basketball",
        alt: "Wallpaper: basketball court under sunlight",
        imageSrc: "/images/wallpapers/sunlit-basketball-01.jpg",
      },
      {
        id: "sunlit-marsh",
        alt: "Wallpaper: sunlit marsh scene",
        imageSrc: "/images/wallpapers/sunlit-marsh-01.jpg",
      },
      {
        id: "spring-tree-cat",
        alt: "Wallpaper: spring tree and cat",
        imageSrc: "/images/wallpapers/spring-tree-cat-01.jpg",
      },
      {
        id: "otter-character-01",
        alt: "Wallpaper: expressive otter character",
        imageSrc: "/images/wallpapers/otter-character-01.jpg",
      },
      {
        id: "otter-character-02",
        alt: "Wallpaper: expressive otter character variant",
        imageSrc: "/images/wallpapers/otter-character-02.jpg",
      },
    ],
  },
];

export const studio = {
  statement:
    "SpartinaTech is building a product studio for multimodal digital goods: generated images, video assets, curated collections, and AI workflows that help small brands and creators ship faster.",
  focusAreas: [
    "AI-native digital product design",
    "Image and video generation workflows",
    "Visual commerce and collection packaging",
    "Multimodal research systems",
  ],
  affiliation: "WKU AI Lab",
  roles: ["Research background", "Creative AI production", "Client services"],
};

export const contact = {
  email: "yuying76@gmail.com",
  github: "https://github.com/Yingda-Yu/SpartinaTech",
  links: [
    { label: "Project inquiry", href: "mailto:yuying76@gmail.com" },
  ],
};
