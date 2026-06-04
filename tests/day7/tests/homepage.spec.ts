import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('Homepage Assertions', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.visit();
    await homePage.verifyHomepage();
});

test('Soft Assertions', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.visit();

    await expect.soft(page).toHaveTitle(/Online Shopping India/);
    await expect.soft(homePage.logo).toBeVisible();
    await expect.soft(homePage.loginLink).toBeVisible();
    await expect.soft(homePage.sellerLink).toBeVisible();
});

test('Search Box', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.visit();
    await homePage.search('mobile');
    await homePage.verifySearchValue('mobile');
});

test('Screenshots', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.visit();
    await homePage.takeScreenshots();
});

test.describe('Parallel Execution', () => {
    test.describe.configure({ mode: 'parallel' });

    test('Homepage', async ({ page }) => {
        await page.goto('https://www.naaptol.com/');
        await expect(page).toHaveTitle(/Online Shopping India/);
    });

    test('Mobiles', async ({ page }) => {
        await page.goto('https://www.naaptol.com/shop-online/mobile-phones.html');
        await expect(page).toHaveURL(/mobile-phones/);
    });

    test('Jewellery', async ({ page }) => {
        await page.goto('https://www.naaptol.com/shop-online/jewellery-watches.html');
        await expect(page).toHaveURL(/jewellery-watches/);
    });

    test('Download App', async ({ page }) => {
        await page.goto('https://www.naaptol.com/mobile-apps.html');
        await expect(page).toHaveURL(/mobile-apps/);
    });
});