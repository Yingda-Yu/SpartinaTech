# Spartina Feishu MCP Service

独立的 MCP（Model Context Protocol）服务，用于连接 ChatGPT Business Workspace Agent 与飞书群。

## 功能

- 向指定飞书群发送文字消息
- MCP 工具注册与发现
- Bearer Token 认证
- 幂等性保证

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

### GET /api/healthz

服务健康检查

### GET /api/readyz

完整准备状态检查，包括：
- 环境变量验证
- 飞书 Token 获取
- 目标群访问权限

### POST /api/mcp

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

## 本地开发

```bash
cd services/feishu-mcp
npm install
npm run dev
```

## 测试

```bash
npm run typecheck
npm run test
```
