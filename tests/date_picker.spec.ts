import { test, expect } from '@playwright/test';

test.only('Date Picker', async ({ page }) => {
    await page.goto('https://gsrtc.in/site/');
    await page.getByRole('button', { name: 'Close' }).click();
    await page.getByRole('textbox', { name: 'Select Date' }).click();

    let text = (await page.locator(".ui-datepicker-title").textContent())?.trim();
    let month = await page.locator('.ui-datepicker-month').textContent();
    console.log(month);
    let year = await page.locator('.ui-datepicker-year').textContent();
    console.log(year);
    let date = (month?.trim() ?? '') + (year?.trim() ?? '');
    while (date !== "July2026") {
        await page.locator('a[title="Next"]').click();

        month = await page.locator('.ui-datepicker-month').textContent();
        year = await page.locator('.ui-datepicker-year').textContent();

        date = (month?.trim() ?? '') + (year?.trim() ?? '');

        console.log(date);
    }
    await page.locator("#ui-datepicker-div").getByRole('link', { name: '1', exact: true }).click();
    // await page.pause();
});
