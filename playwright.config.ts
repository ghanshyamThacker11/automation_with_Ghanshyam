import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 30000,

  reporter: [
    ['html'],
    ['list']
  ],

  use: {
    headless: true,
    trace: 'on',
    viewport: {
      width: 1280,
      height: 720
    },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
});