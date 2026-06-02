import { test, expect } from '@playwright/test';

test('Iframe ', async ({ page }) => {
    await page.goto('https://checkout.stripe.dev/checkout');
    const frame = page.locator('iframe').nth(1).contentFrame();

    await frame.getByRole('textbox', { name: 'Email' })
        .fill('ghanshyam@gmail.com');

    await frame.getByRole('textbox', { name: 'Full name' })
        .fill('Ghanshyam Thacker');

    await frame.getByLabel('Country or region')
        .selectOption('Ireland');

    await page.waitForTimeout(3000);
});