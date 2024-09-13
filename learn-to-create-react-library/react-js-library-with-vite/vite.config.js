import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  plugins: [react(), libInjectCss(),],
  build: {
    lib: {
      entry: './src/index.js', // Entry file for your library
      name: 'ReactJsLibraryWithVite', // UMD global name
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "cjs", "umd"], // Include CommonJS build
    },
    rollupOptions: {
      external: ['react', 'react-dom'], // Mark peer dependencies as external
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
