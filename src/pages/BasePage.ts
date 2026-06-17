import { Page } from '@playwright/test';
import { BASE_URL } from '../config/constants';

export class BasePage {
    constructor(protected page: Page) { }

    async goto(path: string) {
        await this.page.goto(`${BASE_URL}${path}`, {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });

        await this.page.locator('body').waitFor();
    }

    async click(selector: string) {
        await this.page.locator(selector).click();
    }

    async fill(selector: string, text: string) {
        await this.page.locator(selector).fill(text);
    }

    async isVisible(selector: string) {
        return await this.page.locator(selector).isVisible();
    }

    async waitForSelector(selector: string, timeout: number = 5000) {
        await this.page.waitForSelector(selector, { timeout });
    }
}
