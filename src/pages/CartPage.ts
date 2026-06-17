import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async proceedToCheckout() {
    await this.page.getByText('Proceed To Checkout').click();
  }

  async placeOrder() {
    await this.page.waitForSelector("a:has-text('Place Order')", { timeout: 15000 });
    await this.page.locator("a:has-text('Place Order')").click();
  }
}
