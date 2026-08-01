import apiClient, { setAccessToken } from './apiClient';

/**
 * Thin wrapper around the /api/auth/* endpoints. Each call unwraps the
 * standard { success, data, message } envelope and, for the flows that
 * issue tokens, stores the access token in memory via setAccessToken.
 */
export const authService = {
  async register(payload) {
    const { data } = await apiClient.post('/auth/register', payload);
    setAccessToken(data.data.accessToken);
    return data.data;
  },

  async login(payload) {
    const { data } = await apiClient.post('/auth/login', payload);
    setAccessToken(data.data.accessToken);
    return data.data;
  },

  async refresh() {
    const { data } = await apiClient.post('/auth/refresh');
    setAccessToken(data.data.accessToken);
    return data.data;
  },

  async logout() {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      setAccessToken(null);
    }
  },

  async forgotPassword(email) {
    const { data } = await apiClient.post('/auth/forgot-password', { email });
    return data.message;
  },

  async resetPassword(token, newPassword) {
    const { data } = await apiClient.post('/auth/reset-password', { token, newPassword });
    return data.message;
  },

  async getCurrentUser() {
    const { data } = await apiClient.get('/users/me');
    return data.data;
  },
};
