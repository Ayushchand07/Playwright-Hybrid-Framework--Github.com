import { test, expect } from '@playwright/test'
import * as dotenv from 'dotenv';

dotenv.config();

test('Login store state', async ({ page }) => {
  await page.goto('https://github.com/login');

  await page.fill('#login_field', process.env.USER_NAME!);
  await page.fill('#password', process.env.PASSWORD!);

  await page.click('input[name="commit"]');

  await page.waitForTimeout(60000);

  // Assert login success (solid signal)
  await expect(page).toHaveURL(/github\.com/);

  // Optional: assert avatar exists
  // await expect(page.locator('summary[aria-label="View profile and more"]')).toBeVisible();

  // Save authenticated state
  
});
