import { api } from '../apiClient';

/**
 * Consolidated Reporting API Service
 * Handles consolidated reporting API calls
 */

export const consolidatedReportingApi = {
  /**
   * Get consolidated report
   */
  getReport: async (params?: any): Promise<any> => {
    const { data } = await api.get<any>('/consolidated-reporting', { params });
    return data;
  },
};

