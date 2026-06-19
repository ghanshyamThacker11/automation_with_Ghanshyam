import { test, expect } from '@playwright/test';
import { connection } from '../db/dbConnection';
import fs from 'fs';

test('data-driven Playwright framework using MySQL', async ({ page }) => {

    const [userRows]: any = await connection.query(
        'SELECT * FROM users LIMIT 1'
    );

    expect(userRows.length).toBeGreaterThan(0);

    const email = userRows[0].email;
    const password = userRows[0].password;

    await page.goto('https://automationexercise.com/login');
    await page.locator('input[data-qa="login-email"]').fill(email);
    await page.locator('input[data-qa="login-password"]').fill(password);
    await page.locator('button[data-qa="login-button"]').click();

    await expect(
        page.locator('a').filter({ hasText: 'Logged in as' })
    ).toBeVisible();

    const [paymentRows]: any = await connection.query(
        'SELECT * FROM payment_details LIMIT 1'
    );

    expect(paymentRows.length).toBeGreaterThan(0);

    const payment = paymentRows[0];

    fs.writeFileSync(
        'db-data.json',
        JSON.stringify(
            {
                users: userRows.map((u: any) => ({
                    id: u.id,
                    email: u.email
                })),
                payments: paymentRows
            },
            null,
            2
        )
    );

    await page.getByText('Add to cart').nth(0).click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await page.getByRole('link', { name: 'Cart' }).click();
    await page.getByText('Proceed To Checkout').click();
    await page.getByRole('link', { name: 'Place Order' }).click();

    await page.locator('input[name="name_on_card"]')
        .fill(payment.name_on_card);

    await page.locator('input[name="card_number"]')
        .fill(payment.card_number);

    await page.getByRole('textbox', { name: 'ex.' })
        .fill(payment.cvc);

    await page.getByRole('textbox', { name: 'MM' })
        .fill(payment.expiry_month);

    await page.getByRole('textbox', { name: 'YYYY' })
        .fill(payment.expiry_year);

    await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();

    await expect(
        page.getByText('Congratulations! Your order has been confirmed!')
    ).toBeVisible();

    await page.getByRole('link', { name: 'Continue' }).click();

    await page.getByRole('link', { name: 'Logout' }).click();

    await connection.end();

});