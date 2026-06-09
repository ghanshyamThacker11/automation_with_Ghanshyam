import { test, expect } from '@playwright/test';

test.beforeAll(async () => {
    console.log('Naaptol Test Suite Started');
});

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.naaptol.com/');
});

test.afterEach(async ({}, testInfo) => {
    console.log(`"${testInfo.title}" => ${testInfo.status}`);
});

test.afterAll(async () => {
    console.log('Naaptol Test Suite Finished');
});


test('Homepage Assertions', { tag: '@smoke' }, async ({ page }) => {
    await expect(page).toHaveTitle(/Online Shopping India/);
    await expect(page).toHaveURL('https://www.naaptol.com/');

    const logo = page.locator('img[title="Online Shopping in India"]').nth(1);
    await expect(logo).toBeVisible();

    const loginLink = page.locator('a', { hasText: 'Log In / Register' });
    await expect(loginLink).toBeVisible();
});

test('Search Box Validation', { tag: '@smoke' }, async ({ page }) => {
    const searchInput = page.locator('#header_search_text');
    await searchInput.fill('mobile');
    await expect(searchInput).toHaveValue('mobile');
});


test('Screenshot Capture', { tag: '@regression' }, async ({ page }) => {
    await page.screenshot({ path: 'screenshots/homepage.png', fullPage: true });
    await expect(page).toHaveTitle(/Online Shopping India/);
});

test('Backpack Product Flow', { tag: '@regression' }, async ({ page }) => {
    await page.locator("//a[contains(normalize-space(text()),'Footwear & Bags')]").click();

    const popupPromise = page.waitForEvent('popup');
    await page.locator("//img[@alt='Backpack']").click();
    await page.locator('//img[@alt="Scottish Club Backpack with Reflective Strip + Free Bag Protector"]').click();

    const popup = await popupPromise;
    await popup.getByRole('textbox', { name: 'Enter Pincode' }).fill('370205');
    await popup.getByRole('link', { name: 'Check' }).click();
});


 // .only  — runs ONLY this test in the file
// test.only('Login Flow Smoke Check', { tag: '@smoke' }, async ({ page }) => {
//     const loginLink = page.locator('a', { hasText: 'Log In / Register' });
//     await expect(loginLink).toBeVisible();
// });

// .skip  — known environment issue / not ready
test.skip('Payment Gateway Validation', { tag: '@sanity' }, async ({ page }) => {
    // Bug 1: Payment gateway is down for maintenance
});

// .fixme — broken test, needs fix before it can run
test.fixme('Wishlist Feature Validation', { tag: '@regression' }, async ({ page }) => {
    // Bug #42: wishlist API returns 500 intermittently
});