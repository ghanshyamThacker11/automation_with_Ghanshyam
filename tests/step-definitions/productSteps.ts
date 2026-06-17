import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { expect, Page, chromium, Browser, BrowserContext } from '@playwright/test';
import { existsSync } from 'fs';
import { ProductPage } from '../../src/pages/ProductPage';
import { CartPage } from '../../src/pages/CartPage';
import { CheckoutPage } from '../../src/pages/CheckoutPage';
import { LoginPage } from '../../src/pages/LoginPage';
import { PAYMENT_DATA, TEST_DATA } from '../../src/config/constants';

let browser: Browser;
let context: BrowserContext;
let page: Page;
let productPage: ProductPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;
let loginPage: LoginPage;

setDefaultTimeout(60 * 1000);

Before(async function() {
  const headed = process.env.HEADED === 'true';

  browser = await chromium.launch({
    headless: !headed,
    slowMo: headed ? 150 : 0
  });

  context = existsSync('./data/storageState.json')
    ? await browser.newContext({ storageState: './data/storageState.json' })
    : await browser.newContext();

  page = await context.newPage();

  productPage = new ProductPage(page);
  cartPage = new CartPage(page);
  checkoutPage = new CheckoutPage(page);
  loginPage = new LoginPage(page);
});

After(async function() {
  await page.close();
  await context.close();
  await browser.close();
});

Given('I navigate to the home page', async () => {
  await productPage.goToHomePage();
});

When('I add a product to cart', async () => {
  await productPage.addProductToCart(0);
  await productPage.continueShopping();
});

When('I proceed to checkout', async () => {
  await productPage.goToCart();
  await cartPage.proceedToCheckout();

  const placeOrderVisible = await page
    .locator("a:has-text('Place Order')")
    .isVisible()
    .catch(() => false);

  if (!placeOrderVisible) {
    const loginLink = page.getByRole('link', { name: /Signup \/ Login|Register \/ Login/ });
    if (await loginLink.isVisible().catch(() => false)) {
      await loginLink.click();
      await loginPage.login(TEST_DATA.validEmail, TEST_DATA.validPassword);
      await productPage.goToCart();
      await cartPage.proceedToCheckout();
    }
  }

  await cartPage.placeOrder();
});

When('I fill in the payment details', async () => {
  await checkoutPage.fillPaymentDetails(
    PAYMENT_DATA.nameOnCard,
    PAYMENT_DATA.cardNumber,
    PAYMENT_DATA.cvc,
    PAYMENT_DATA.expiryMonth,
    PAYMENT_DATA.expiryYear
  );
});

When('I click pay and confirm order', async () => {
  await checkoutPage.payAndConfirmOrder();
});

Then('I should see the order confirmation', async () => {
  await expect(
    page.getByText('ORDER PLACED!')
  ).toBeVisible();
});