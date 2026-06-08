import { test, expect } from '@playwright/test';

test.skip('1. Assertions - Homepage', async ({ page }) => {
    await page.goto('https://www.naaptol.com/');

    // Page-level assertions
    await expect(page).toHaveTitle(/Online Shopping India/);
    await expect(page).toHaveURL('https://www.naaptol.com/');

    // Logo is visible
    const logos = page.locator('img[title="Online Shopping in India"]');
    await expect(logos.nth(1)).toBeVisible();


    // "Log In / Register" link exists in header
    const loginLink = page.locator('a', { hasText: 'Log In / Register' });
    await expect(loginLink).toBeVisible();
    await expect(loginLink).toBeEnabled();

    // "Become a Seller" link is present
    const sellerLink = page.getByRole('link', { name: 'Become a Seller', exact: true });
    await expect(sellerLink).toBeVisible();
    await expect(sellerLink).toContainText('Become a Seller');

    // Search input is on the page and empty by default
    const searchInput = await page.locator('#header_search_text');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toBeEnabled();
    await expect(searchInput).toHaveValue('');

    // Category nav has items
    const categoryItems = page.locator('#mainMenuContent a');
    await expect(categoryItems).not.toHaveCount(0);

    // Download App link has correct href
    const appLink = page.locator('a[href="/mobile-apps.html"]').first();

    await expect(appLink).toHaveAttribute(
        'href',
        '/mobile-apps.html'
    );
});


test('2. Soft Assertions - Homepage elements', async ({ page }) => {
    await page.goto('https://www.naaptol.com/');

    // All of these run even if one fails
    await expect.soft(page).toHaveTitle(/Online Shopping India/);
    await expect.soft(page.locator('img[title="Online Shopping in India"]').nth(1)).toBeVisible();
    await expect.soft(page.locator('a', { hasText: 'Log In / Register' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Become a Seller', exact: true })).toBeVisible();

    await expect.soft(page.locator('footer, #copyright, [class*="footer"]').first()).toBeVisible();
});


test('3. Auto Waiting - Search navigation', async ({ page }) => {
    await page.goto('https://www.naaptol.com/');

    await page.locator('#header_search_text').fill('mobile');

    await expect(page.locator('#header_search_text'))
        .toHaveValue('mobile');

});

test('4. Screenshots - Full page and element', async ({ page }) => {
    await page.goto('https://www.naaptol.com/');
    await page.waitForLoadState('domcontentloaded');

    // Full page screenshot 
    await page.screenshot({
        path: 'screenshots/naaptol-homepage-full.png',
        fullPage: true,
    });

    // View port only screenshot
    await page.screenshot({
        path: 'screenshots/naaptol-homepage-viewport.png',
        fullPage: false,
    });

    // Element-level screenshot (only the logo)
    const logo = page.locator('img[title="Online Shopping in India"]').nth(1);
    await expect(logo).toBeVisible();
    await logo.screenshot({
        path: 'screenshots/naaptol-logo.png',
    });

    // Clip screenshot - capture specific region (header area only)
    await page.screenshot({
        path: 'screenshots/naaptol-header-clip.png',
        clip: { x: 0, y: 0, width: 1280, height: 120 },
    });


    await expect(page).toHaveTitle(/Online Shopping India/);
});



test('5. Trace Viewer - Auto trace on retry (via config)', async ({ page }) => {
    await page.goto('https://www.naaptol.com/');
    await expect(page).toHaveTitle(/Online Shopping India/);
});

test.describe('6. Parallel Execution', () => {
    test.describe.configure({ mode: 'parallel' });

    test('Worker 1 - Homepage title', async ({ page }) => {
        await page.goto('https://www.naaptol.com/');
        await expect(page).toHaveTitle(/Online Shopping India/);
    });

    test('Worker 2 - Mobiles category page', async ({ page }) => {
        await page.goto('https://www.naaptol.com/shop-online/mobile-phones.html');
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL(/mobile-phones/);
    });

    test('Worker 3 - Jewellery category page', async ({ page }) => {
        await page.goto('https://www.naaptol.com/shop-online/jewellery-watches.html');
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL(/jewellery-watches/);
    });

    test('Worker 4 - Download App page', async ({ page }) => {
        await page.goto('https://www.naaptol.com/mobile-apps.html');
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL(/mobile-apps/);
    });
});
