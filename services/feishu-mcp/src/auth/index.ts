export function authenticateBearerToken(authorizationHeader: string | null): boolean {
  if (!authorizationHeader) return false;

  const match = authorizationHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) return false;

  const providedToken = match[1];
  const expectedToken = process.env.SPARTINA_MCP_ACCESS_TOKEN;

  if (!expectedToken) return false;

  return providedToken === expectedToken;
}

export function requireBearerToken(authorizationHeader: string | null): void {
  if (!authenticateBearerToken(authorizationHeader)) {
    throw new Error("Unauthorized");
  }
}
