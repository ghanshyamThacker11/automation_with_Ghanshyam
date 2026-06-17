import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goToHomePage() {
    await this.goto('');
  }

  async addProductToCart(index: number = 0) {
    const buttons = await this.page.getByText('Add to cart').all();
    if (buttons.length > index) {
      await buttons[index].click();
    }
  }

  async continueShopping() {
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
  }

  async goToCart() {
    await this.page.getByRole('link', { name: ' Cart' }).click();
  }
}
