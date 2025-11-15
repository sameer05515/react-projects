import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import { libInjectCss } from "vite-plugin-lib-inject-css";

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      entryRoot: "lib",
      outDir: "dist/types",
      include: ["lib/**/*"],
    }),
  ],

  css: {
    modules: {
      scopeBehaviour: "local",
    },
  },

  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      name: "ReactTsLibrary01",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "cjs", "umd"],
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "react-dom"],
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

