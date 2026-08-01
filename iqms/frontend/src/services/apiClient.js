import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * In-memory access-token store. Deliberately not persisted to
 * localStorage/sessionStorage to reduce XSS-driven token theft surface;
 * the refresh token instead lives in an httpOnly cookie set by the backend
 * during Phase 2 (see /api/auth/login, /api/auth/refresh).
 */
let accessToken = null;

export function setAccessToken(token) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // sends the httpOnly refresh-token cookie
  headers: { 'Content-Type': 'application/json' },
});

// Attach the current access token to every outgoing request.
apiClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let refreshPromise = null;

/**
 * On a 401, attempts exactly one silent refresh via /api/auth/refresh and
 * retries the original request. Concurrent 401s share a single in-flight
 * refresh call rather than each triggering their own. Full implementation
 * of /api/auth/refresh lands in Phase 2; this interceptor is wired ahead of
 * time so no request-layer changes are needed once it ships.
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isRefreshCall = originalRequest?.url?.includes('/auth/refresh');

    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshCall) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = apiClient
            .post('/auth/refresh')
            .finally(() => {
              refreshPromise = null;
            });
        }
        const { data } = await refreshPromise;
        setAccessToken(data.data.accessToken);
        return apiClient(originalRequest);
      } catch (refreshError) {
        setAccessToken(null);
        window.location.assign('/login');
        return Promise.reject(refreshError);
      }
    }

    // A failed refresh call (e.g. no session yet, on initial app load) is
    // reported back to the caller (AuthContext's bootstrap effect) without
    // forcing a redirect — there's no "original request" worth retrying,
    // and redirecting here would bounce a never-logged-in visitor to
    // /login on every single page load.
    return Promise.reject(error);
  },
);

export default apiClient;
