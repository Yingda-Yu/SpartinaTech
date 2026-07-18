import { getConfig } from "@/config";

interface TenantAccessTokenResponse {
  code: number;
  msg: string;
  tenant_access_token: string;
  expire: number;
}

interface SendMessageResponse {
  code: number;
  msg: string;
  data: {
    message_id: string;
  };
}

interface ChatInfoResponse {
  code: number;
  msg: string;
  data: {
    chat_id: string;
    name: string;
    avatar: string;
  };
}

let cachedToken: string | null = null;
let tokenExpiresAt: number = 0;
let tokenFetching: Promise<string | null> | null = null;

export async function getTenantAccessToken(): Promise<string> {
  const now = Date.now();

  if (cachedToken && now < tokenExpiresAt - 60000) {
    return cachedToken;
  }

  if (tokenFetching) {
    const result = await tokenFetching;
    if (result) return result;
  }

  tokenFetching = fetchToken();
  try {
    const token = await tokenFetching;
    if (!token) {
      throw new Error("Failed to fetch tenant access token");
    }
    return token;
  } finally {
    tokenFetching = null;
  }
}

async function fetchToken(): Promise<string | null> {
  const config = getConfig();

  const response = await fetch(
    `${config.FEISHU_API_BASE_URL}/open-apis/auth/v3/tenant_access_token/internal`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        app_id: config.FEISHU_APP_ID,
        app_secret: config.FEISHU_APP_SECRET,
      }),
    }
  );

  const data: TenantAccessTokenResponse = await response.json();

  if (data.code !== 0) {
    console.error("Failed to get tenant access token:", data);
    return null;
  }

  cachedToken = data.tenant_access_token;
  tokenExpiresAt = Date.now() + data.expire * 1000;

  return cachedToken;
}

export async function sendTextMessage(text: string): Promise<{ message_id: string; chat_id: string }> {
  const config = getConfig();
  const token = await getTenantAccessToken();

  const response = await fetch(
    `${config.FEISHU_API_BASE_URL}/open-apis/im/v1/messages?receive_id_type=chat_id`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        receive_id: config.FEISHU_CHAT_ID,
        msg_type: "text",
        content: JSON.stringify({
          text,
        }),
      }),
    }
  );

  const data: SendMessageResponse = await response.json();

  if (data.code !== 0) {
    throw new Error(`Feishu API error [${data.code}]: ${data.msg}`);
  }

  return {
    message_id: data.data.message_id,
    chat_id: config.FEISHU_CHAT_ID,
  };
}

export async function checkChatAccess(): Promise<{ ok: boolean; chat_id?: string; errors: string[] }> {
  const config = getConfig();
  const token = await getTenantAccessToken();
  const errors: string[] = [];

  try {
    const response = await fetch(
      `${config.FEISHU_API_BASE_URL}/open-apis/im/v1/chats/${config.FEISHU_CHAT_ID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data: ChatInfoResponse = await response.json();
    if (data.code === 0) {
      return { ok: true, chat_id: data.data.chat_id, errors };
    } else {
      errors.push(`Chat access denied: ${data.msg}`);
      return { ok: false, errors };
    }
  } catch (e) {
    errors.push(`Chat access check failed: ${e}`);
    return { ok: false, errors };
  }
}

export async function healthCheck(): Promise<{ ok: boolean; errors: string[] }> {
  const errors: string[] = [];

  try {
    await getTenantAccessToken();
  } catch (e) {
    errors.push("Failed to obtain tenant_access_token");
  }

  try {
    const chatAccessible = await checkChatAccess();
    if (!chatAccessible.ok) {
      errors.push("Cannot access target chat");
    }
  } catch (e) {
    errors.push("Failed to check chat access");
  }

  return { ok: errors.length === 0, errors };
}
