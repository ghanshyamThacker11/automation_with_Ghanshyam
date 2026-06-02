import { test } from '@playwright/test';

test('redirect', async ({ page }) => {
  await page.goto('https://www.flipkart.com');
  await page.locator('[data-group="men"]').hover(); 
});