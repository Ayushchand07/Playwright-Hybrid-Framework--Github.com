import { test } from '@playwright/test';
import { allure } from 'allure-playwright';

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshot = await page.screenshot();
    await allure.attachment(
      'Failure Screenshot',
      screenshot,
      'image/png'
    );
  }
});
