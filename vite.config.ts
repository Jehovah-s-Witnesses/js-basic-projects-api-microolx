import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    clearMocks: true,
    benchmark: {},
    globalSetup: ['.vitest/localSetup.js'],
  },
});
