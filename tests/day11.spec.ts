import { test,expect} from '@playwright/test';

test('Login using data from JSON', async ({ page }) => {
    await page.goto('https://www.automationexercise.com/');
    await page.getByRole('link', { name: ' Signup / Login' }).click();
    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').click();
    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('ghanshyamthacker3011@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('30112004');
    await page.getByRole('button', { name: 'Login' }).click();
    //expect logged in 
    await expect(page.getByRole('link', { name: ' Logout' })).toBeVisible();
    // save context storage for later use
    await page.context().storageState({ path: './data/storageState.json' });
    await page.pause();
});
// test.use({
//   storageState: './data/storageState.json'
// });
test('Product flow', async ({ page }) => {
    await page.goto('https://www.automationexercise.com/');
    await page.getByText('Add to cart').nth(0).click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await page.getByRole('link', { name: ' Cart' }).click();
    await page.getByText('Proceed To Checkout').click();
    await page.getByRole('link', { name: 'Place Order' }).click();
    await page.locator('input[name="name_on_card"]').click();
    await page.locator('input[name="name_on_card"]').fill('123');
    await page.locator('input[name="card_number"]').click();
    await page.locator('input[name="card_number"]').fill('1231');
    await page.getByRole('textbox', { name: 'ex.' }).click();
    await page.getByRole('textbox', { name: 'ex.' }).fill('231');
    await page.getByRole('textbox', { name: 'MM' }).click();
    await page.getByRole('textbox', { name: 'MM' }).fill('221');
    await page.getByRole('textbox', { name: 'YYYY' }).click();
    await page.getByRole('textbox', { name: 'YYYY' }).fill('2222');
    await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
    await page.getByRole('link', { name: 'Continue' }).click();
    // await page.getByRole('link', { name: ' Logout' }).click();
});