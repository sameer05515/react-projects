import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      entryRoot: "lib", // Ensure the plugin knows where your components are
      outDir: "dist/types", // Align with tsconfig declarationDir
      // skipDiagnostics: false, // Optionally enable for stricter type checks
    }),
  ],

  css: {
    modules: {
      // You can customize the behavior here, but these defaults work out of the box
      scopeBehaviour: 'local', // Use 'local' scope for CSS Modules
    },
  },

  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      name: "ReactTsLibraryWithVite", // UMD global name
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "cjs", "umd"],
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "react-dom"], // Mark peer dependencies as external
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
      },
    },
  },
});
