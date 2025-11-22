/**
 * Fetch wrapper that attaches Bearer token from localStorage when present.
 * Use this for all backend API calls so auth is sent consistently.
 * Avoids importing authService here to prevent circular dependencies in Redux slices.
 */

import { clearToken } from "./authService";
import { mergeAuthorizationIntoFetchHeaders } from "./authRequest";

/**
 * Same as fetch(url, options) but merges Authorization: Bearer <token> into headers when token exists.
 * On 401 response, clears token and redirects to /login so user can sign in again.
 * @param {string} url
 * @param {RequestInit} [options]
 * @returns {Promise<Response>}
 */
export function authenticatedFetch(url, options = {}) {
  const headers = mergeAuthorizationIntoFetchHeaders(options.headers);
  return fetch(url, { ...options, headers }).then((response) => {
    if (response.status === 401) {
      clearToken();
      const loginPath = "/login";
      if (typeof window !== "undefined" && window.location.pathname !== loginPath) {
        window.location.href = loginPath;
      }
    }
    return response;
  });
}

export default authenticatedFetch;
