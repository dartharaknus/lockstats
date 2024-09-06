/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { webpackStats } from 'rollup-plugin-webpack-stats';
import checker from 'vite-plugin-checker';
import { ViteImageOptimizer as imageOptimizer } from 'vite-plugin-image-optimizer';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  define: {
    'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
  },
  build: {
    outDir: 'build',
    sourcemap: !!process.env.BUILD_SOURCEMAP,
  },
  plugins: [
    imageOptimizer(),
    react(),
    svgr(),
    tsconfigPaths(),
    checker({
      typescript: true,
    }),
    process.env.BUILD_STATS ? webpackStats() : undefined,
  ],
  clearScreen: false,
  server: {
    port: 3000,
    strictPort: true,
    watch: {
      ignored: ['**/src-tauri/**'],
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      reporter: ['lcov'],
    },
  },
});
