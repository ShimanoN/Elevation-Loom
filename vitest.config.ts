import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.js',
    include: ['test/**/*.test.js', 'test/**/*.test.ts'],
    exclude: ['e2e/**', 'node_modules/**'],
  },
});
