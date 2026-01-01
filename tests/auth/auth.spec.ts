import { chromium, FullConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch({
    headless: false, // MUST be false
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to GitHub login
  await page.goto('https://github.com/login');

  // Fill username & password
  await page.fill('#login_field', process.env.ADMIN_NAME!);
  await page.fill('#password', process.env.PASSWORD!);

  // 🔴 VERY IMPORTANT
  // If GitHub shows OTP / verification
  // 👉 YOU handle it MANUALLY
  // 👉 Do NOT automate it

  // Wait until logged in homepage
  await page.waitForTimeout(60000);
  await page.waitForURL('https://github.com/**', {
    timeout: 120000, // give yourself time
  });

  // Save authenticated state
  await context.storageState({ path: 'auth.json' });

  await browser.close();
}

export default globalSetup;
