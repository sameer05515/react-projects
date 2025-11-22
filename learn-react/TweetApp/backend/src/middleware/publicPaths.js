/**
 * Returns true if the request is for a path that does not require auth.
 * Used so login/register and docs remain public.
 */

function isPublicPath(req) {
  const { method, path: p } = req;
  const pathLower = p.toLowerCase();

  // CORS preflight (browser sends OPTIONS without Authorization)
  if (method === "OPTIONS") return true;

  // Docs and health
  if (p === "/" && method === "GET") return true;
  if (p === "/health" && method === "GET") return true;
  if (pathLower.startsWith("/api-docs")) return true;
  if (pathLower === "/redoc") return true;
  if (pathLower === "/api-docs-json") return true;
  if (pathLower === "/help" || pathLower.startsWith("/help")) return true;

  // Auth endpoints (no token required)
  if (pathLower === "/api/users/register" && method === "POST") return true;
  if (pathLower === "/api/users/login" && method === "POST") return true;

  return false;
}

module.exports = { isPublicPath };
