import { test, expect } from '@playwright/test';
import users from './data.json';

test('Login using data from JSON', async ({ page }) => {
    for (const user of users) {
        await page.goto('https://www.automationexercise.com/');
        await page.getByRole('link', { name: ' Signup / Login' }).click();
        await page.locator('[data-qa="login-email"]').fill(user.email);
        await page.locator('[data-qa="login-password"]').fill(user.password);

        await page.locator('[data-qa="login-button"]').click();

        await page.getByRole('link', { name: ' Logout' }).click();

        console.log(`Login attempted for: ${user.email}`);
    }
});