import { test, expect } from '@playwright/test';

test('Date Picker', async ({ page }) => {
    await page.goto('https://gsrtc.in/site/');
    await page.getByRole('button', { name: 'Close' }).click();
    await page.getByRole('textbox', { name: 'Select Date' }).click();

    let text = (await page.locator(".ui-datepicker-title").textContent())?.trim();
    let month = await page.locator('.ui-datepicker-month').textContent();
    let year = await page.locator('.ui-datepicker-year').textContent();
    let date = (month?.trim() ?? '') + (year?.trim() ?? '');
    while (date !== "August2026") {
        await page.locator('a[title="Next"]').click();

        month = await page.locator('.ui-datepicker-month').textContent();
        year = await page.locator('.ui-datepicker-year').textContent();

        date = (month?.trim() ?? '') + (year?.trim() ?? '');
    }
    await page.locator("#ui-datepicker-div").getByRole('link', { name: '4', exact: true }).click();
});
