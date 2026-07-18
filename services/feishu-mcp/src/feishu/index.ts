import { sanitizeConfig } from "@/config";

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

interface UploadResponse {
  code: number;
  msg: string;
  data: {
    file_token: string;
  };
}

let cachedToken: string | null = null;
let tokenExpiresAt: number = 0;
let tokenFetching: Promise<string | null> | null = null;

const BLOCKED_HOSTS = [
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "10.",
  "172.16.",
  "172.17.",
  "172.18.",
  "172.19.",
  "172.20.",
  "172.21.",
  "172.22.",
  "172.23.",
  "172.24.",
  "172.25.",
  "172.26.",
  "172.27.",
  "172.28.",
  "172.29.",
  "172.30.",
  "172.31.",
  "192.168.",
  "169.254.",
  "fe80:",
  "::1",
  "metadata.google.internal",
  "169.254.169.254",
];

const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".zip", ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx"];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

function validateUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();

    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return false;
    }

    for (const blocked of BLOCKED_HOSTS) {
      if (hostname === blocked || hostname.startsWith(blocked)) {
        return false;
      }
    }

    return true;
  } catch {
    return false;
  }
}

function validateExtension(filename: string): boolean {
  const ext = filename.toLowerCase().substring(filename.lastIndexOf("."));
  return ALLOWED_EXTENSIONS.includes(ext);
}

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
  const config = sanitizeConfig();

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
    console.error("Failed to get tenant access token:", data.msg);
    return null;
  }

  cachedToken = data.tenant_access_token;
  tokenExpiresAt = Date.now() + data.expire * 1000;

  return cachedToken;
}

export async function sendTextMessage(text: string): Promise<{ message_id: string; chat_id: string }> {
  const config = sanitizeConfig();
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

export async function uploadImage(url: string): Promise<string> {
  if (!validateUrl(url)) {
    throw new Error("URL is not allowed");
  }

  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  if (arrayBuffer.byteLength > MAX_FILE_SIZE) {
    throw new Error("File size exceeds limit");
  }

  const contentType = response.headers.get("content-type") || "image/png";
  const filename = url.substring(url.lastIndexOf("/") + 1) || "image.png";

  if (!validateExtension(filename)) {
    throw new Error("File extension not allowed");
  }

  const config = sanitizeConfig();
  const token = await getTenantAccessToken();

  const formData = new FormData();
  formData.append("image_type", "message");
  formData.append("image", new Blob([arrayBuffer], { type: contentType }), filename);

  const uploadResponse = await fetch(
    `${config.FEISHU_API_BASE_URL}/open-apis/im/v1/images`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const data: UploadResponse = await uploadResponse.json();

  if (data.code !== 0) {
    throw new Error(`Feishu upload error [${data.code}]: ${data.msg}`);
  }

  return data.data.file_token;
}

export async function uploadFile(url: string): Promise<string> {
  if (!validateUrl(url)) {
    throw new Error("URL is not allowed");
  }

  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) {
    throw new Error(`Failed to download file: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  if (arrayBuffer.byteLength > MAX_FILE_SIZE) {
    throw new Error("File size exceeds limit");
  }

  const contentType = response.headers.get("content-type") || "application/octet-stream";
  const filename = url.substring(url.lastIndexOf("/") + 1) || "file.dat";

  if (!validateExtension(filename)) {
    throw new Error("File extension not allowed");
  }

  const config = sanitizeConfig();
  const token = await getTenantAccessToken();

  const formData = new FormData();
  formData.append("file_type", "message");
  formData.append("file", new Blob([arrayBuffer], { type: contentType }), filename);

  const uploadResponse = await fetch(
    `${config.FEISHU_API_BASE_URL}/open-apis/im/v1/files`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const data: UploadResponse = await uploadResponse.json();

  if (data.code !== 0) {
    throw new Error(`Feishu upload error [${data.code}]: ${data.msg}`);
  }

  return data.data.file_token;
}

export async function sendImageMessage(imageUrl: string, title?: string): Promise<{ message_id: string; chat_id: string }> {
  const fileToken = await uploadImage(imageUrl);
  const config = sanitizeConfig();
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
        msg_type: "image",
        content: JSON.stringify({
          image_key: fileToken,
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

export async function sendFileMessage(fileUrl: string, title?: string): Promise<{ message_id: string; chat_id: string }> {
  const fileToken = await uploadFile(fileUrl);
  const config = sanitizeConfig();
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
        msg_type: "file",
        content: JSON.stringify({
          file_key: fileToken,
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
  const config = sanitizeConfig();
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
    errors.push(`Chat access check failed: ${e instanceof Error ? e.message : String(e)}`);
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
      errors.push(...chatAccessible.errors);
    }
  } catch (e) {
    errors.push("Failed to check chat access");
  }

  return { ok: errors.length === 0, errors };
}
