export const environment = {
  production: false,
  apiBaseUrl: (window as any).__env?.BACKEND_APPLICATION_BASE_URL || 'http://127.0.0.1:3003'
};


