/**
 * Single place for attaching Bearer auth to outgoing requests.
 * Used by axios (see src/index.js) and authenticatedFetch.
 */
import { getToken } from "./authService";

export function getBearerToken() {
  try {
    if (typeof localStorage === "undefined") return null;
    return getToken();
  } catch {
    return null;
  }
}

/**
 * Mutates and returns axios config with Authorization when a token exists.
 * @param {{ headers?: Record<string, string> }} config
 */
export function mergeAuthorizationIntoAxiosConfig(config) {
  const token = getBearerToken();
  if (!token) return config;
  if (!config.headers) {
    config.headers = {};
  }
  config.headers.Authorization = `Bearer ${token}`;
  return config;
}

/**
 * @param {HeadersInit | undefined} headersInit
 * @returns {Headers}
 */
export function mergeAuthorizationIntoFetchHeaders(headersInit) {
  const token = getBearerToken();
  const headers = new Headers(headersInit || {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
}
