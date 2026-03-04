import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**npm i
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
},{
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 5,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['html'],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],

    projects: [
  {
    name: 'ui',
    testMatch: /tests\/ui\/.*\.spec\.ts/,
    use: {
      ...devices['Desktop Chrome'],
      // storageState: 'auth.json',
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
      // storageState: 'auth.json', // UI only
    },
  },

  {
    name: 'Authentication',
    testMatch: /tests\/Authentication\/.*\.spec\.ts/,
    use: {
      ...devices['Desktop Chrome'],
    },
  },
]
});
