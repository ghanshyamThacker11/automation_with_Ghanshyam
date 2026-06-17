import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { expect, Page, chromium, Browser, BrowserContext } from '@playwright/test';
import { existsSync } from 'fs';
import { LoginPage } from '../../src/pages/LoginPage';
import { TEST_DATA } from '../../src/config/constants';

let browser: Browser;
let context: BrowserContext;
let page: Page;
let loginPage: LoginPage;

setDefaultTimeout(60 * 1000);

Before(async function () {
  const headed = process.env.HEADED === 'true';

  browser = await chromium.launch({
    headless: !headed,
    slowMo: headed ? 150 : 0
  });

  context = await browser.newContext(); 

  page = await context.newPage();
  loginPage = new LoginPage(page);
});

After(async function () {
  await page.close();
  await context.close();
  await browser.close();
});

Given('I navigate to the login page', async () => {
  await loginPage.goToLoginPage();
});

When('I enter valid email and password', async () => {
  await loginPage.login(
    TEST_DATA.validEmail,
    TEST_DATA.validPassword
  );
});

When('I click the login button', async () => {
  // Button is clicked in login() method, but can be explicit if needed
});

Then('I should be logged in successfully', async () => {
  const isLoggedIn = await loginPage.isLoggedIn();
  expect(isLoggedIn).toBe(true);

  await loginPage.saveStorageState(
    './data/storageState.json'
  );
});