import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Library build: ESM + CJS, React as peer (prop-types bundled).
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(dirname, 'src/index.js'),
      name: 'ReactjsStorybook',
      formats: ['es', 'cjs'],
      fileName: (format) =>
        format === 'es' ? 'reactjs-storybook.js' : 'reactjs-storybook.cjs',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        assetFileNames: 'reactjs-storybook.css',
      },
    },
    cssCodeSplit: false,
    copyPublicDir: false,
    emptyOutDir: true,
    outDir: 'dist',
  },
});
