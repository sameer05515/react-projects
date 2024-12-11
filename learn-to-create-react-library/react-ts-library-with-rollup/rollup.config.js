import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts', // Entry point
  output: [
    {
      file: 'dist/index.cjs.js', // CommonJS
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js', // ES Module
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(), // Exclude peer dependencies
    resolve(),          // Resolve node modules
    commonjs(),         // Convert CommonJS to ES modules
    typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: "dist", // Output declarations to 'dist'
      }),      // Support TypeScript
    terser(),           // Minify the code
  ],
  external: ['react', 'react-dom'], // Mark React as external
};
