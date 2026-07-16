# SpartinaTech 自动图片生成系统

> 基于 OpenAI gpt-image-1 + GitHub Actions + Feishu 的全自动图片生成与分发方案。
> 适用于米草科技（SpartinaTech）网站素材的定时自动生产。

本系统通过 **GitHub Actions** 定时调用 **OpenAI 图片生成 API**（`gpt-image-1`），
批量生成网站所需的图片素材，打包成 ZIP 后投递到 **飞书群**，
同时可推送至 SpartinaTech 网站（Next.js 16）的 `/api/auto-images` 接收端点。

---

## 目录

1. [架构总览](#架构总览)
2. [功能特性](#功能特性)
3. [前置条件](#前置条件)
4. [快速开始](#快速开始)
5. [配置项说明](#配置项说明)
6. [成本估算](#成本估算)
7. [集成 ChatGPT 业务智能体](#集成-chatgpt-业务智能体)
8. [文件结构](#文件结构)
9. [自定义指南](#自定义指南)
10. [故障排查](#故障排查)

---

## 架构总览

```
 ┌──────────────────────────────────────────────────────────────────────┐
 │                        SpartinaTech 自动图片生成系统                   │
 └──────────────────────────────────────────────────────────────────────┘

  ┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
  │  GitHub Actions │         │   OpenAI API     │         │   飞书群 (Feishu) │
  │  (定时调度)      │  ①调用  │  gpt-image-1     │  ⑤推送  │  米草科技有限公司群 │
  │  cron / 手动触发 │────────▶│  批量生成图片     │         │  卡片+下载链接    │
  └────────┬────────┘         └────────┬─────────┘         └─────────────────┘
           │                           │                            ▲
           │ ②返回 base64              │ ③打包 ZIP                   │
           ▼                           ▼                            │
  ┌─────────────────┐         ┌──────────────────┐                  │
  │  本地/Runner     │         │  GitHub Artifacts │  ④上传 ZIP      │
  │  生成脚本         │────────▶│  / Release 资产   │──────────────────┘
  │  (Node.js)       │         └────────┬─────────┘
  └─────────────────┘                  │ ⑥POST 元数据
                                        ▼
                               ┌──────────────────┐
                               │  SpartinaTech    │
                               │  Next.js 16 站点   │
                               │  /api/auto-images │
                               └──────────────────┘

  ┌──────────────────────────────────────────────────────────────────┐
  │  可选：ChatGPT 业务智能体 (MCP)                                    │
  │  通过 GitHub Actions API 触发 workflow_dispatch                   │
  │  → 按需生成图片（非定时）                                          │
  └──────────────────────────────────────────────────────────────────┘
```

**数据流说明：**

| 步骤 | 说明 |
|------|------|
| ① | GitHub Actions 在 cron 时间点（或手动触发）运行生成脚本 |
| ② | 脚本调用 OpenAI `gpt-image-1` API，获取 base64 图片 |
| ③ | 脚本将图片打包为 ZIP，上传至 GitHub Artifacts / Release |
| ④ | 获取 ZIP 下载链接 |
| ⑤ | 通过飞书自定义机器人 Webhook 推送卡片消息（含下载链接）到群聊 |
| ⑥ | 同时 POST 批次元数据到 SpartinaTech 网站的 `/api/auto-images` 接收端点 |

---

## 功能特性

- **全自动定时生成**：GitHub Actions cron 调度，无需服务器常驻
- **高质量图片**：默认使用 OpenAI `gpt-image-1`（最佳质量），可切换 `dall-e-2` / `dall-e-3`
- **批量生产**：单批次默认生成 30 张图片，可配置
- **飞书投递**：自动推送卡片消息（含图片标题、数量、ZIP 下载链接）到飞书群
- **网站接收端点**：Next.js 16 API Route (`/api/auto-images`) 接收并存储批次元数据
- **Bearer 鉴权**：API 端点使用 `AUTOMATIC_IMAGES_TOKEN` 进行 Bearer Token 认证
- **速率限制**：每 IP 每分钟最多 60 次请求（内存计数器）
- **CORS 支持**：允许跨域请求，方便外部工具调用
- **ChatGPT 集成**：支持通过 MCP 连接器让 ChatGPT 业务智能体按需触发生成
- **成本可控**：GitHub Actions 公开仓库免费；OpenAI 按张计费

---

## 前置条件

| 条件 | 说明 |
|------|------|
| **Node.js 22+** | GitHub Actions Runner 自带，本地测试需自行安装 |
| **OpenAI API Key** | 需开通图片生成权限，获取地址：https://platform.openai.com/api-keys |
| **飞书群** | 用于接收图片投递通知（米草科技有限公司群） |
| **GitHub 仓库** | 公开仓库可免费使用 Actions（推荐），私有仓库每月有免费额度 |
| **Vercel 账号**（可选） | 用于部署 SpartinaTech Next.js 站点（Hobby 计划免费） |

---

## 快速开始

### 方式一：GitHub Actions（推荐）

这是最简单的部署方式，无需本地环境，全部在云端完成。

**步骤 1：克隆仓库并推送到 GitHub**

```bash
git clone <your-repo-url> spartinatech-auto-images
cd spartinatech-auto-images
git push origin main
```

**步骤 2：配置仓库 Secrets**

进入 GitHub 仓库页面：`Settings → Secrets and variables → Actions → New repository secret`

依次添加以下 Secrets：

| Secret 名称 | 值 | 必填 |
|---|---|---|
| `OPENAI_API_KEY` | 你的 OpenAI API Key（`sk-...`） | 是 |
| `FEISHU_WEBHOOK_URL` | 飞书自定义机器人 Webhook 地址 | 是 |
| `FEISHU_APP_ID` | 飞书应用 App ID（上传 ZIP 时需要） | 否 |
| `FEISHU_APP_SECRET` | 飞书应用 App Secret | 否 |
| `FEISHU_CHAT_ID` | 目标群聊 ID（`oc_...`） | 是 |
| `AUTOMATIC_IMAGES_TOKEN` | API 端点鉴权 Token（自定义字符串） | 是 |
| `SITE_URL` | 网站地址（如 `https://spartina.tech`） | 否 |

**步骤 3：添加 Workflow 文件**

将以下文件放入 `.github/workflows/` 目录：

- `auto-images-cron.yml` — 定时生成（默认每小时执行一次）
- `chatgpt-trigger.yml` — ChatGPT 手动触发用

**步骤 4：验证运行**

进入 `Actions` 页面，手动触发 `auto-images-cron` workflow，查看日志确认：
- OpenAI API 调用成功
- ZIP 打包成功
- 飞书消息推送成功

完成！系统将按 cron 计划自动运行。

---

### 方式二：本地测试

适合开发调试阶段。

```bash
# 1. 克隆仓库
git clone <your-repo-url> spartinatech-auto-images
cd spartinatech-auto-images

# 2. 安装依赖
npm install

# 3. 复制环境变量模板并填写
cp .env.example .env
# 编辑 .env，填入你的 OPENAI_API_KEY、FEISHU_WEBHOOK_URL 等

# 4. 运行生成脚本
npx tsx scripts/generate-images.ts

# 5.（可选）启动 Next.js 开发服务器测试 API 接收端点
npm run dev
# 然后用 curl 测试：
curl -X POST http://localhost:3000/api/auto-images \
  -H "Authorization: Bearer $AUTOMATIC_IMAGES_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"batchId":"test-001","category":"test","images":[{"filename":"1.png","title":"测试图"}]}'
```

---

## 配置项说明

所有配置通过环境变量管理，模板见 [`.env.example`](./.env.example)。

| 环境变量 | 说明 | 默认值 | 必填 |
|---|---|---|---|
| `OPENAI_API_KEY` | OpenAI API 密钥 | — | 是 |
| `OPENAI_IMAGE_MODEL` | 图片生成模型：`gpt-image-1` / `dall-e-2` / `dall-e-3` | `gpt-image-1` | 否 |
| `IMAGE_COUNT` | 每批次生成图片数量 | `30` | 否 |
| `OPENAI_IMAGE_SIZE` | 图片尺寸：`1024x1024` / `1024x1536` / `1536x1024` | `1024x1024` | 否 |
| `FEISHU_WEBHOOK_URL` | 飞书自定义机器人 Webhook 地址 | — | 是* |
| `FEISHU_APP_ID` | 飞书应用 App ID（Mode B 上传 ZIP） | — | 否 |
| `FEISHU_APP_SECRET` | 飞书应用 App Secret | — | 否 |
| `FEISHU_CHAT_ID` | 目标飞书群聊 ID | — | 是* |
| `SITE_URL` | SpartinaTech 网站地址 | `https://spartina.tech` | 否 |
| `AUTOMATIC_IMAGES_TOKEN` | API 端点 Bearer 鉴权 Token | — | 是 |

> \* 飞书投递至少需要 `FEISHU_WEBHOOK_URL`（Mode A）或 `FEISHU_APP_ID` + `FEISHU_APP_SECRET` + `FEISHU_CHAT_ID`（Mode B）其中之一。

---

## 成本估算

### OpenAI 图片生成费用

| 模型 | 单张价格 | 每批次（30张） | 每小时（1批次） | 每天（24批次） |
|---|---|---|---|---|
| `gpt-image-1` | $0.04 ~ $0.19 | $1.20 ~ $5.70 | $1.20 ~ $5.70 | $28.80 ~ $136.80 |
| `dall-e-3` | $0.04 ~ $0.12 | $1.20 ~ $3.60 | $1.20 ~ $3.60 | $28.80 ~ $86.40 |
| `dall-e-2` | $0.016 | $0.48 | $0.48 | $11.52 |

> 价格随图片尺寸和质量等级浮动，详见 [OpenAI 定价页](https://openai.com/api/pricing/)。

### 基础设施费用

| 服务 | 费用 | 说明 |
|---|---|---|
| **GitHub Actions** | 免费 | 公开仓库无限分钟；私有仓库每月 2000 分钟免费 |
| **Vercel** | 免费 | Hobby 计划足够；本方案不需要 Vercel Cron（调度由 GitHub Actions 完成） |
| **飞书 API** | 免费 | 自定义机器人 Webhook 和基础 API 均免费 |

### 推荐成本控制策略

- **开发测试**：使用 `dall-e-2`（最便宜，$0.016/张），`IMAGE_COUNT=5`
- **正式生产**：使用 `gpt-image-1`（最佳质量），`IMAGE_COUNT=30`，每小时一批
- **降频运行**：将 cron 从每小时改为每 3 或 6 小时，成本按比例下降

---

## 集成 ChatGPT 业务智能体

除了定时 cron 调度，还可以让 **ChatGPT 业务智能体** 通过 MCP 连接器按需触发图片生成。

### 原理

ChatGPT 业务智能体通过 **MCP（Model Context Protocol）** 连接器调用 GitHub Actions 的 `workflow_dispatch` API，手动触发指定 workflow，实现「对话式按需生成图片」。

```
用户: "帮我生成一批科技感的产品配图"
  │
  ▼
ChatGPT 业务智能体
  │  MCP 调用
  ▼
GitHub Actions API (workflow_dispatch)
  │
  ▼
chatgpt-trigger.yml workflow 运行
  │
  ▼
OpenAI 生成 → 飞书投递
```

### 配置步骤

**步骤 1：创建 `chatgpt-trigger.yml` Workflow**

在 `.github/workflows/chatgpt-trigger.yml` 中定义可由 `workflow_dispatch` 触发的工作流，支持通过 `inputs` 传入自定义参数（如 `category`、`prompt`、`count`）：

```yaml
name: ChatGPT Triggered Image Generation

on:
  workflow_dispatch:
    inputs:
      category:
        description: '图片分类（如：产品/团队/科技感）'
        required: true
        default: 'tech'
      prompt:
        description: '自定义提示词（留空则使用分类默认提示词）'
        required: false
        default: ''
      count:
        description: '生成数量'
        required: false
        default: '10'

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - name: Generate images
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          FEISHU_WEBHOOK_URL: ${{ secrets.FEISHU_WEBHOOK_URL }}
          FEISHU_CHAT_ID: ${{ secrets.FEISHU_CHAT_ID }}
          IMAGE_COUNT: ${{ inputs.count }}
          CATEGORY: ${{ inputs.category }}
          CUSTOM_PROMPT: ${{ inputs.prompt }}
        run: npx tsx scripts/generate-images.ts
```

**步骤 2：创建 GitHub Personal Access Token**

进入 `Settings → Developer settings → Personal access tokens → Fine-grained tokens`，创建一个具有以下权限的 Token：
- `Actions: Write`（用于触发 workflow_dispatch）
- `Contents: Read`

**步骤 3：在 ChatGPT 中配置 MCP 连接器**

在 ChatGPT 业务智能体设置中，添加一个 MCP 连接器，指向一个能调用 GitHub Actions API 的 MCP Server。该 Server 需提供一个工具（如 `trigger_image_generation`），内部执行：

```bash
curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${GITHUB_PAT}" \
  https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/chatgpt-trigger.yml/dispatches \
  -d '{"ref":"main","inputs":{"category":"产品","count":"10"}}'
```

**步骤 4：使用**

在 ChatGPT 对话中直接说：「生成一批科技感配图，20 张」，智能体会自动触发 workflow 并返回结果。

---

## 文件结构

```
spartinatech-auto-images/
├── .github/
│   └── workflows/
│       ├── auto-images-cron.yml      # 定时生成（每小时）
│       └── chatgpt-trigger.yml       # ChatGPT 手动触发
├── scripts/
│   ├── generate-images.ts            # 图片生成主脚本
│   ├── pack-zip.ts                   # 打包 ZIP 工具
│   └── feishu-notify.ts              # 飞书通知工具
├── src/
│   └── app/
│       └── api/
│           └── auto-images/
│               └── route.ts          # API 接收端点（POST/GET）
├── prompts/
│   ├── tech.json                     # 科技感提示词集
│   ├── product.json                  # 产品配图提示词集
│   └── team.json                     # 团队文化提示词集
├── .env.example                      # 环境变量模板
├── .gitignore
├── next.config.ts                    # Next.js 16 配置
├── package.json
├── tsconfig.json
└── README.md                         # 本文件
```

---

## 自定义指南

### 1. 修改提示词

在 `prompts/` 目录下创建或编辑 JSON 文件，格式如下：

```json
{
  "category": "tech",
  "prompts": [
    "A futuristic abstract neural network visualization, deep blue and cyan, 4K",
    "Minimalist circuit board pattern, gold traces on dark background",
    "Holographic data streams flowing through dark space, cinematic"
  ]
}
```

脚本会随机从对应分类中选取 `IMAGE_COUNT` 条提示词进行生成。

### 2. 修改生成分类

编辑 `scripts/generate-images.ts` 中的 `CATEGORIES` 常量：

```typescript
const CATEGORIES = ['tech', 'product', 'team', 'innovation'] as const;
```

每个分类对应 `prompts/` 下的一个 JSON 文件。

### 3. 修改定时计划

编辑 `.github/workflows/auto-images-cron.yml` 中的 `cron` 表达式：

```yaml
on:
  schedule:
    # 每小时整点运行（UTC 时间）
    - cron: '0 * * * *'
    # 改为每 3 小时：
    # - cron: '0 */3 * * *'
    # 改为每天早上 9 点（北京时间 = UTC 01:00）：
    # - cron: '0 1 * * *'
```

> 注意：GitHub Actions cron 使用 **UTC 时区**。北京时间 = UTC + 8。

### 4. 修改图片尺寸

在 `.env` 中设置 `OPENAI_IMAGE_SIZE`：

| 尺寸 | 用途 |
|---|---|
| `1024x1024` | 正方形，通用配图 |
| `1024x1536` | 竖版，适合移动端 / 海报 |
| `1536x1024` | 横版，适合 Banner / 头图 |

### 5. 修改飞书投递目标

更换 `FEISHU_CHAT_ID` 为新的群聊 ID，或更换 `FEISHU_WEBHOOK_URL` 为新机器人的 Webhook。

---

## 故障排查

### Q: OpenAI API 调用报 401 / 429 错误

- **401 Unauthorized**：检查 `OPENAI_API_KEY` 是否正确，是否已开通图片生成权限
- **429 Too Many Requests**：触发速率限制。降低 `IMAGE_COUNT`，或在脚本中加入请求间隔（如每次调用后 `sleep(1000)`）

### Q: 飞书消息未收到

- 检查 `FEISHU_WEBHOOK_URL` 是否正确，机器人是否仍在群中
- 检查 GitHub Actions 日志中 Feishu 请求的响应码
- 确认机器人未被群管理员禁用

### Q: `/api/auto-images` 返回 401

- 请求头需包含 `Authorization: Bearer <AUTOMATIC_IMAGES_TOKEN>`
- 确认服务端环境变量 `AUTOMATIC_IMAGES_TOKEN` 已正确设置
- 注意：若服务端未配置该环境变量，端点会 **拒绝所有请求**（fail closed）

### Q: `/api/auto-images` 返回 429

- 触发速率限制（每 IP 每分钟 60 次）。等待 1 分钟后重试
- 该限制基于内存计数器，服务重启后会重置

### Q: GitHub Actions 未按时运行

- GitHub Actions 的 cron 调度可能有 **数分钟到数十分钟** 的延迟（高负载时）
- 公开仓库的 cron 调度优先级更高，建议使用公开仓库
- 检查 workflow 文件的 `on.schedule` 语法是否正确
- 确认 workflow 文件位于 `.github/workflows/` 目录且在默认分支上

### Q: 内存存储数据丢失

- 当前 `/api/auto-images` 使用内存 Map 存储，**服务重启 / 重新部署后数据会丢失**
- 这是 Demo 实现。生产环境请升级为：
  - **Vercel Blob**：存储图片文件
  - **Vercel KV**（基于 Upstash Redis）：存储批次元数据
  - 或使用 **Upstash Redis** 直接接入

### Q: 如何查看已生成的图片

- **飞书群**：查看机器人推送的卡片消息，点击下载链接获取 ZIP
- **GitHub Artifacts**：在 Actions 运行页面的 Artifacts 区域下载
- **API 查询**：`GET /api/auto-images?limit=10` 查看最近批次元数据

---

> SpartinaTech · 米草科技 | 自动图片生成系统
