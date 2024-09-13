
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'), // Entry point
      name: 'MyLibrary', // UMD global variable
      fileName: (format) => `index.${format}.js`, // Output file names
    },
    rollupOptions: {
      external: [], // Add external dependencies if needed
      output: {
        globals: {
          // Add global variables for UMD if needed
        },
      },
    },
  },
});
