import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private signupLoginLink = "a:has-text(' Signup / Login')";
  private loginForm = "form:has-text('Login')";

  constructor(page: Page) {
    super(page);
  }

  async goToLoginPage() {
    await this.goto('');
    await this.page.getByRole('link', { name: ' Signup / Login' }).click();
  }

  async login(email: string, password: string) {
    await this.page.locator(this.loginForm).getByPlaceholder('Email Address').fill(email);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async isLoggedIn() {
    return await this.page.getByRole('link', { name: ' Logout' }).isVisible();
  }

  async saveStorageState(path: string) {
    await this.page.context().storageState({ path });
  }
}
