import { Page, Locator } from '@playwright/test';

export class BasePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(url: string) {
        await this.page.goto(url);
    }
    
    async click(selector: string) {
        await this.page.locator(selector).click();
    }

    async selectOption(selector: string, value: string) {
        await this.page.locator(selector).selectOption({ label: value } as any);
    }
}