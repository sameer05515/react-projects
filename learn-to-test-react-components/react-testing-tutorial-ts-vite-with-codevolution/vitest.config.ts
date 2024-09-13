/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  test:{
    globals: false,
    environment:"jsdom",
    css:true,
    setupFiles: './vitest.setup.ts',
  }
})
