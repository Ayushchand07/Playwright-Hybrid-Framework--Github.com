import { defineConfig, devices } from '@playwright/test';

import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });


export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    //storageState: 'auth.json',
  },

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 5,

  reporter: [
    ['list'],
    ['html'],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],


    projects: [
  {
    name: 'ui',
    testMatch: /tests\/ui\/.*\.spec\.ts/,
    use: {
      ...devices['Desktop Chrome'],
      storageState: 'auth.json',
    },
  },
  {
    name: 'api',
    testMatch: /tests\/api\/.*\.spec\.ts/,
    use: {
      ...devices['Desktop Chrome'],
    },
  },
  {
    name: 'hybrid',
    testMatch: /tests\/hybrid\/.*\.spec\.ts/,
    use: {
      ...devices['Desktop Chrome'],
      storageState: 'auth.json', // UI only
    },
  },
]
});
