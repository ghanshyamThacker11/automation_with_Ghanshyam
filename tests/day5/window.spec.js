import { test, expect } from '@playwright/test';

test.only('test', async ({ browser }) => {
    const context = await browser.newContext();
    
    const page = await context.newPage();
    
    await page.goto('https://www.myntra.com/');
    await page.locator('#desktop-header-cnt').getByRole('link', { name: 'Men', exact: true }).hover();
    await page.getByRole('link', { name: 'Casual Trousers' }).click();

    const page1Promise = context.waitForEvent('page');

    await page.getByRole('link', {
        name: 'FABRIPPLE Men Cotton Classic Mid-Rise Loose Fit Cargos Trousers FABRIPPLE Men'
    }).click();

    const page1 = await page1Promise;

    await page1.waitForLoadState();
    await page1.close();

    await page.waitForTimeout(2000);
    
    await context.close();
});