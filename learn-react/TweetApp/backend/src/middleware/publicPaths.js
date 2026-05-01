/**
 * Returns true if the request is for a path that does not require auth.
 * Used so login/register and docs remain public.
 */

function isPublicPath(req) {
  const { method, path: p } = req;
  const normalizedMethod = (method || "").toUpperCase();
  const pathLower = (p || "").toLowerCase();
  const normalizedPath = pathLower.replace(/\/+$/, "") || "/";

  // CORS preflight (browser sends OPTIONS without Authorization)
  if (normalizedMethod === "OPTIONS") return true;

  // Docs and health
  if (normalizedPath === "/" && normalizedMethod === "GET") return true;
  if (normalizedPath === "/health" && normalizedMethod === "GET") return true;
  if (normalizedPath.startsWith("/api-docs")) return true;
  if (normalizedPath === "/redoc") return true;
  if (normalizedPath === "/api-docs-json") return true;
  if (normalizedPath === "/help" || normalizedPath.startsWith("/help/")) return true;

  // Auth endpoints (no token required)
  if (
    normalizedMethod === "POST" &&
    (normalizedPath === "/api/users/register" || normalizedPath === "/users/register")
  ) {
    return true;
  }
  if (
    normalizedMethod === "POST" &&
    (normalizedPath === "/api/users/login" || normalizedPath === "/users/login")
  ) {
    return true;
  }

  return false;
}

module.exports = { isPublicPath };
