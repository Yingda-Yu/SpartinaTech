export type TeamMember = {
  id: string;
  name: {
    en: string;
    zh: string;
  };
  role: {
    en: string;
    zh: string;
  };
  bio: {
    en: string;
    zh: string;
  };
  image: string;
  fallback: string;
  tags?: {
    en: string[];
    zh: string[];
  };
  links?: {
    github?: string;
    linkedin?: string;
    website?: string;
    email?: string;
  };
};

export const advisors: TeamMember[] = [
  {
    id: "guanchao-tong",
    name: {
      en: "Dr. Guanchao Tong",
      zh: "童冠超博士",
    },
    role: {
      en: "Academic Advisor",
      zh: "学术顾问",
    },
    bio: {
      en: "Advises on research direction, academic collaboration, and industry-oriented AI applications.",
      zh: "为团队提供研究方向、学术合作与行业 AI 应用方面的指导。",
    },
    image: "/images/team/guanchao-tong.webp",
    fallback: "/images/team/guanchao-tong.jpg",
    tags: {
      en: ["Research Advisor", "AI Applications", "Academic Collaboration"],
      zh: ["研究顾问", "AI 应用", "学术合作"],
    },
  },
];

export const coreTeam: TeamMember[] = [
  {
    id: "yingda-yu",
    name: {
      en: "Yingda Yu",
      zh: "俞颖达",
    },
    role: {
      en: "Founder / Project Lead",
      zh: "创始人 / 项目负责人",
    },
    bio: {
      en: "Leads product direction, AI service design, website strategy, and cross-domain project coordination.",
      zh: "负责产品方向、AI 服务设计、网站策略与跨方向项目协调。",
    },
    image: "/images/team/yingda-yu.webp",
    fallback: "/images/team/yingda-yu.png",
    tags: {
      en: ["AI Services", "Product Direction", "Project Lead"],
      zh: ["AI 服务", "产品方向", "项目负责人"],
    },
  },
  {
    id: "jiaqi-xuan",
    name: {
      en: "Jiaqi Xuan",
      zh: "Jiaqi Xuan",
    },
    role: {
      en: "Project Partner",
      zh: "项目伙伴",
    },
    bio: {
      en: "Supports project development, content organization, and collaborative delivery.",
      zh: "参与项目开发、内容整理与协作交付。",
    },
    image: "/images/team/jiaqi-xuan.webp",
    fallback: "/images/team/jiaqi-xuan.jpg",
    tags: {
      en: ["Project Support", "Content", "Collaboration"],
      zh: ["项目支持", "内容整理", "协作"],
    },
  },
  {
    id: "shuhui-shi",
    name: {
      en: "Shuhui Shi",
      zh: "Shuhui Shi",
    },
    role: {
      en: "AI Engineering Partner",
      zh: "AI 工程伙伴",
    },
    bio: {
      en: "Supports AI workflow implementation, experiment execution, and technical development.",
      zh: "参与 AI 工作流实现、实验执行与技术开发。",
    },
    image: "/images/team/shuhui-shi.webp",
    fallback: "/images/team/shuhui-shi.jpg",
    tags: {
      en: ["AI Workflow", "Engineering", "Experiment"],
      zh: ["AI 工作流", "工程实现", "实验执行"],
    },
  },
  {
    id: "yuehan-shi",
    name: {
      en: "Yuehan Shi",
      zh: "Yuehan Shi",
    },
    role: {
      en: "Research Partner",
      zh: "研究伙伴",
    },
    bio: {
      en: "Supports research tasks, data organization, and project documentation.",
      zh: "参与研究任务、数据整理与项目文档工作。",
    },
    image: "/images/team/yuehan-shi.webp",
    fallback: "/images/team/yuehan-shi.jpg",
    tags: {
      en: ["Research", "Data", "Documentation"],
      zh: ["研究", "数据整理", "文档"],
    },
  },
  {
    id: "zhentong-ye",
    name: {
      en: "Zhentong Ye",
      zh: "Zhentong Ye",
    },
    role: {
      en: "Industry Project Partner",
      zh: "行业项目伙伴",
    },
    bio: {
      en: "Supports industry project communication, business-facing demos, and delivery coordination.",
      zh: "参与行业项目沟通、商务演示与交付协调。",
    },
    image: "/images/team/zhentong-ye.webp",
    fallback: "/images/team/zhentong-ye.jpg",
    tags: {
      en: ["Industry Project", "Demo", "Delivery"],
      zh: ["行业项目", "演示", "交付"],
    },
  },
  {
    id: "shuaiwu-dong",
    name: {
      en: "Shuaiwu Dong",
      zh: "Shuaiwu Dong",
    },
    role: {
      en: "Technical Partner",
      zh: "技术伙伴",
    },
    bio: {
      en: "Supports technical implementation, system testing, and production workflow development.",
      zh: "参与技术实现、系统测试与生产工作流开发。",
    },
    image: "/images/team/shuaiwu-dong.webp",
    fallback: "/images/team/shuaiwu-dong.png",
    tags: {
      en: ["Technical Implementation", "Testing", "Workflow"],
      zh: ["技术实现", "系统测试", "工作流"],
    },
  },
];
