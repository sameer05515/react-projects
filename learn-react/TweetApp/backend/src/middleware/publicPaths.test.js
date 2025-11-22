const { isPublicPath } = require("./publicPaths");

describe("isPublicPath", () => {
  it("returns true for GET /", () => {
    expect(isPublicPath({ method: "GET", path: "/" })).toBe(true);
  });

  it("returns true for GET /health", () => {
    expect(isPublicPath({ method: "GET", path: "/health" })).toBe(true);
  });

  it("returns false for POST /health", () => {
    expect(isPublicPath({ method: "POST", path: "/health" })).toBe(false);
  });

  it("returns true for OPTIONS (CORS preflight) on any path", () => {
    expect(isPublicPath({ method: "OPTIONS", path: "/tasks" })).toBe(true);
    expect(isPublicPath({ method: "OPTIONS", path: "/api/users/login" })).toBe(true);
  });

  it("returns true for /api-docs and variants", () => {
    expect(isPublicPath({ method: "GET", path: "/api-docs" })).toBe(true);
    expect(isPublicPath({ method: "GET", path: "/api-docs/" })).toBe(true);
    expect(isPublicPath({ method: "GET", path: "/API-DOCS/anything" })).toBe(true);
  });

  it("returns true for /redoc (case insensitive)", () => {
    expect(isPublicPath({ method: "GET", path: "/redoc" })).toBe(true);
    expect(isPublicPath({ method: "GET", path: "/REDOC" })).toBe(true);
  });

  it("returns true for /api-docs-json", () => {
    expect(isPublicPath({ method: "GET", path: "/api-docs-json" })).toBe(true);
  });

  it("returns true for /help and /help/*", () => {
    expect(isPublicPath({ method: "GET", path: "/help" })).toBe(true);
    expect(isPublicPath({ method: "GET", path: "/help/anything" })).toBe(true);
  });

  it("returns true for POST /api/users/register", () => {
    expect(isPublicPath({ method: "POST", path: "/api/users/register" })).toBe(true);
    expect(isPublicPath({ method: "POST", path: "/API/USERS/REGISTER" })).toBe(true);
  });

  it("returns true for POST /api/users/login", () => {
    expect(isPublicPath({ method: "POST", path: "/api/users/login" })).toBe(true);
    expect(isPublicPath({ method: "POST", path: "/API/USERS/LOGIN" })).toBe(true);
  });

  it("returns false for GET /api/users/login (needs POST)", () => {
    expect(isPublicPath({ method: "GET", path: "/api/users/login" })).toBe(false);
  });

  it("returns false for protected API paths", () => {
    expect(isPublicPath({ method: "GET", path: "/tasks" })).toBe(false);
    expect(isPublicPath({ method: "GET", path: "/tags" })).toBe(false);
    expect(isPublicPath({ method: "GET", path: "/topics" })).toBe(false);
    expect(isPublicPath({ method: "POST", path: "/tasks" })).toBe(false);
    expect(isPublicPath({ method: "GET", path: "/api/users/123" })).toBe(false);
  });
});
