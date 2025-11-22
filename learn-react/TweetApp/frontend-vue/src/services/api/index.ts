/**
 * API Services Index
 * Central export point for all API services
 */

// Export the base API client
export { api } from '../apiClient';

// Export types (from types.ts, not apiClient)
export type { LoginRequest, RegisterRequest, LoginResponse } from './types';

// Export all API services
export * from './tweetsApi';
export * from './tasksApi';
export * from './tagsApi';
export * from './topicsApi';
export * from './linksApi';
export * from './memoryMapsApi';
export * from './interviewMgmtApi';
export * from './usersApi';
export * from './wordsApi';
export * from './pinnedItemsApi';
export * from './myResumeApi';
export * from './relatedNodesApi';
export * from './thinkTankApi';
export * from './chatGPTApi';
export * from './activitiesApi';
export * from './comparableObjectsApi';
export * from './consolidatedReportingApi';

// Export types
export * from './types';

