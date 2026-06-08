import { test } from '@playwright/test';

test('redirect', async ({ page }) => {
  await page.goto('https://www.naaptol.com/');
});