# Spartina Feishu MCP Service

独立的 MCP（Model Context Protocol）服务，用于连接 ChatGPT Business Workspace Agent 与飞书群。

## 功能

- 向指定飞书群发送文字消息
- MCP 工具注册与发现
- Bearer Token 认证
- **幂等性（开发中）**：当前使用进程内内存存储，仅在单实例存活期间有效

## ⚠️ 重要：幂等性说明

当前幂等性实现使用 `MemoryIdempotencyStore`，仅适用于开发和测试：

- ✅ 在同一进程内重复调用相同 `idempotency_key` 会返回缓存结果
- ❌ Vercel 多实例部署时，不同实例间不共享幂等缓存
- ❌ Vercel 冷启动后缓存会清空
- ❌ **不可用于生产 Schedule 场景**

**生产就绪要求**：接入 Upstash Redis 实现分布式幂等存储（待开发）

## 部署

### Vercel

1. 在 Vercel 中创建新项目，选择 `Yingda-Yu/SpartinaTech`
2. 设置 Root Directory: `services/feishu-mcp`
3. 配置环境变量

### 环境变量

```bash
FEISHU_APP_ID=your-feishu-app-id
FEISHU_APP_SECRET=your-feishu-app-secret
FEISHU_CHAT_ID=target-chat-id
SPARTINA_MCP_ACCESS_TOKEN=your-mcp-token
```

## API

### GET /healthz

服务健康检查

### GET /readyz

完整准备状态检查，包括：
- 环境变量验证
- 飞书 Token 获取
- 目标群访问权限

### POST /mcp

MCP 协议端点

#### 认证

```bash
Authorization: Bearer <SPARTINA_MCP_ACCESS_TOKEN>
```

#### 请求示例

```json
{
  "jsonrpc": "2.0",
  "method": "feishu_send_message",
  "params": {
    "text": "Hello from MCP",
    "title": "Test Message",
    "idempotency_key": "unique-request-id"
  },
  "id": 1
}
```

## MCP Tools

### feishu_send_message

向配置的飞书群发送文字消息

**参数**：
- `text`: 消息内容（1-4000 字符）
- `title`: 可选标题
- `idempotency_key`: 幂等键（必填）

**Annotations**：
- `readOnlyHint`: false
- `destructiveHint`: false
- `idempotentHint`: true
- `openWorldHint`: true

## 本地开发

```bash
cd services/feishu-mcp
npm install
npm run dev
```

## 测试

```bash
# 类型检查
npm run typecheck

# 冒烟测试（无需凭证）
npm run smoke-test

# 端到端测试（需要填写 .env.local）
npm run test:feishu
```

## 项目结构

```
services/feishu-mcp/
├── api/              # Vercel API routes
│   ├── healthz.ts
│   ├── readyz.ts
│   └── mcp.ts
├── src/
│   ├── config/       # 环境配置与验证
│   ├── auth/         # Bearer Token 认证
│   ├── feishu/       # 飞书 API 客户端
│   ├── mcp/          # MCP 服务器（基于官方 SDK）
│   └── idempotency/  # 幂等性存储（当前为内存实现）
├── scripts/          # 测试脚本
├── .env.local        # 本地环境变量（已排除 Git）
├── .env.example      # 环境变量示例
└── vercel.json       # Vercel 配置（rewrites 路由）
```
