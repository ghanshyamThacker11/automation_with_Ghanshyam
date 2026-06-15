import { test, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import { testData } from '../../data/test-fixtures';

let home: HomePage;

test.beforeEach(async ({ page }) => {
  home = new HomePage(page);
  await home.open(testData.baseUrl);
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    await page.screenshot({
      path: `test-results/${testInfo.title.replace(/\s+/g, '_')}.png`,
      fullPage: true,
    });
  }
});

test('Product flow', async ({ page }) => {
  await home.openShoppingCategories();
  await home.hoverMobiles();
  await home.clickSmartphones();
  await home.setSortBy(testData.sortOption);

  const popup = await home.openProductPopup(testData.productName);

  await popup.getByRole('link', { name: testData.colorOption }).click();
  await popup.getByRole('link', { name: 'Click here to Buy' }).click();
  await popup.getByRole('button', { name: 'Close' }).click();

  await popup.close();
});