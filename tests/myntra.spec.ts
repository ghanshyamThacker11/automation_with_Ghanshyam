import { test, expect } from '@playwright/test';

test.only('test', async ({ page }) => {
  await page.goto('https://www.myntra.com/');
  await page.keyboard.press('PageDown');
  await page.locator('img[src*="j8WhVhuA_343024bed6fc481ebbc8858954cab2ff"]').click();
  await page.locator('img[src*="gBicyMOv_9352979330e9422ea424e837254c5ac2"]').click();
  const page1Promise = page.waitForEvent('popup');
  const page1 = await page1Promise;
  await page1.getByText('ADD TO BAG').click();
  await page1.getByRole('link', { name: 'GO TO BAG' }).click();
});