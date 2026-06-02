import { test, expect } from '@playwright/test';

test('Alert ', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.accept();
    });
    await page.click('text=Click for JS Alert');
    const result = await page.locator('#result').textContent();
    expect(result).toBe('You successfully clicked an alert');

    await page.pause();
});